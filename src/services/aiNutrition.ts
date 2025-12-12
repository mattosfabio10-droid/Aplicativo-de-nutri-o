
import { GoogleGenAI, Type } from "@google/genai";
import { Patient, MealPlan } from "../types";

const getApiKey = (): string => {
  try {
    // Tenta pegar do Vite (Padrão Netlify/Vite)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
  } catch (e) {}
  
  try {
    // Fallback seguro para Node/Sistema
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {}

  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

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
    if (target < bmr) {
        target = Math.max(bmr, tdee - 300); 
    }
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
    ? `Valor definido manualmente pelo nutricionista.` 
    : `Cálculo Base: TMB (Mifflin) = ${nutritionalCalc.bmr} kcal | VET = ${nutritionalCalc.tdee} kcal. Estratégia aplicada: ${nutritionalCalc.strategy}.`;

  const prompt = `
    Atue como um Nutricionista Clínico e Esportivo Sênior.
    Sua tarefa é MONTAR um plano alimentar para atingir a meta calórica EXATA calculada abaixo.

    DADOS DO PACIENTE:
    - Nome: ${patient.name} (${patient.age} anos, ${patient.gender === 'male' ? 'Homem' : 'Mulher'})
    - Peso: ${patient.weight}kg | Altura: ${patient.height}cm
    - Objetivo: ${patient.goal.toUpperCase()}
    - Preferências/Restrições: ${patient.preferences || 'Nenhuma'}
    
    ORDEM DE CÁLCULO (JÁ REALIZADA):
    ${calculationExplanation}
    
    META CALÓRICA FINAL DO PLANO: ${finalTargetCalories} Kcal (+/- 50kcal de tolerância)

    ESTRUTURA DA RESPOSTA (JSON estrito):
    - Responda APENAS o JSON puro. Sem textos introdutórios.
    - Gere 5 a 6 refeições.
    - Defina horários sugeridos (HH:MM).
    - IMPORTANTE: O campo "substitutions" é OBRIGATÓRIO (array de strings).
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
            totalCalories: { type: Type.NUMBER, description: "Soma exata das calorias" },
            macros: {
                type: Type.OBJECT,
                properties: {
                    protein: { type: Type.NUMBER },
                    carbs: { type: Type.NUMBER },
                    fats: { type: Type.NUMBER }
                }
            },
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
                        substitutions: { 
                            type: Type.ARRAY, 
                            items: { type: Type.STRING }
                        }
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
        generalAdvice: data.generalAdvice || "Siga o plano com consistência.",
        goal: patient.goal
      };
    }
    return null;

  } catch (error) {
    console.error("AI Generation Error:", error);
    return null; 
  }
};

export const analyzeLabResults = async (examsText: string, patient: Patient): Promise<string> => {
  const modelId = "gemini-2.5-flash"; 

  const prompt = `
    Atue como um Nutricionista Funcional.
    Analise os seguintes exames do paciente ${patient.name} (${patient.age} anos, ${patient.gender}, objetivo: ${patient.goal}).

    TEXTO DOS EXAMES:
    "${examsText}"

    Retorne uma análise em Markdown com Resumo, Pontos de Atenção e Sugestões Nutricionais.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        temperature: 0.4,
      }
    });

    return response.text || "Não foi possível gerar a análise.";

  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Erro ao conectar com a IA. Verifique sua chave de API.";
  }
};
