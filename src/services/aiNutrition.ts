import { GoogleGenAI, Type } from "@google/genai";
import { Patient, MealPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface PatientWithCustomCalories extends Patient {
  customCalories?: number;
}

const ACTIVITY_FACTORS = {
  'sedentary': 1.2,
  'moderate': 1.375,
  'active': 1.55
};

const cleanJsonText = (text: string) => {
  let clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
  const firstOpen = clean.indexOf('{');
  const lastClose = clean.lastIndexOf('}');
  if (firstOpen !== -1 && lastClose !== -1) {
    clean = clean.substring(firstOpen, lastClose + 1);
  }
  return clean;
};

const calculateCalories = (patient: Patient) => {
  let bmr = 0;
  if (patient.gender === 'male') {
    bmr = (10 * patient.weight) + (6.25 * patient.height) - (5 * patient.age) + 5;
  } else {
    bmr = (10 * patient.weight) + (6.25 * patient.height) - (5 * patient.age) - 161;
  }
  const activityFactor = ACTIVITY_FACTORS[patient.activityLevel] || 1.2;
  const tdee = Math.round(bmr * activityFactor);
  let target = tdee;
  let strategy = "Manutenção Energética";
  const goalLower = patient.goal.toLowerCase();

  if (goalLower.includes('perda') || goalLower.includes('emagrecimento') || goalLower.includes('definição')) {
    const deficit = 500;
    target = tdee - deficit;
    if (target < bmr) target = Math.max(bmr, tdee - 300); 
    strategy = `Déficit Calórico`;
  } else if (goalLower.includes('ganho') || goalLower.includes('hipertrofia')) {
    target = tdee + 300;
    strategy = "Superávit Calórico";
  }
  return { bmr: Math.round(bmr), tdee, target: Math.round(target), strategy };
};

export const generateMealPlanWithAI = async (patient: PatientWithCustomCalories): Promise<MealPlan | null> => {
  const modelId = "gemini-2.5-flash"; 
  const nutritionalCalc = calculateCalories(patient);
  const finalTargetCalories = patient.customCalories || nutritionalCalc.target;
  const calculationExplanation = patient.customCalories 
    ? `Valor definido manualmente.` 
    : `Cálculo Base: TMB = ${nutritionalCalc.bmr} kcal | VET = ${nutritionalCalc.tdee} kcal.`;

  const prompt = `
    Atue como um Nutricionista Clínico e Esportivo Sênior.
    Monte um plano alimentar.
    DADOS: Nome: ${patient.name} (${patient.age} anos, ${patient.gender}). Peso: ${patient.weight}kg. Altura: ${patient.height}cm. Objetivo: ${patient.goal}.
    ${calculationExplanation}
    META CALÓRICA: ${finalTargetCalories} Kcal (+/- 50kcal).
    RESPOSTA: Apenas JSON puro. Estrutura: totalCalories (number), macros (obj), meals (array), generalAdvice (string).
    IMPORTANTE: Campo "substitutions" obrigatório em cada item (array de strings).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalCalories: { type: Type.NUMBER },
            macros: { type: Type.OBJECT, properties: { protein: { type: Type.NUMBER }, carbs: { type: Type.NUMBER }, fats: { type: Type.NUMBER } } },
            meals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  time: { type: Type.STRING },
                  items: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        quantity: { type: Type.STRING },
                        calories: { type: Type.NUMBER },
                        substitutions: { type: Type.ARRAY, items: { type: Type.STRING } }
                      }
                    }
                  }
                }
              }
            },
            generalAdvice: { type: Type.STRING },
            shoppingList: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    if (response.text) {
      const cleanText = cleanJsonText(response.text);
      const data = JSON.parse(cleanText);
      return {
        id: Date.now().toString(),
        patientId: patient.id,
        createdAt: new Date().toISOString(),
        totalCalories: data.totalCalories,
        macros: data.macros || { protein: 0, carbs: 0, fats: 0 },
        meals: data.meals || [],
        shoppingList: data.shoppingList || [],
        generalAdvice: data.generalAdvice || "Siga o plano."
      };
    }
    return null;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

export const analyzeLabResults = async (examsText: string, patient: Patient): Promise<string> => {
  const modelId = "gemini-2.5-flash"; 
  const prompt = `
    Atue como Nutricionista Funcional. Analise estes exames de ${patient.name} (${patient.age} anos, ${patient.goal}).
    EXAMES: "${examsText}"
    Retorne uma análise em Markdown com Resumo, Pontos de Atenção e Sugestões.
  `;
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: { temperature: 0.4 }
    });
    return response.text || "Sem resposta.";
  } catch (error) {
    return "Erro ao conectar com a IA.";
  }
};