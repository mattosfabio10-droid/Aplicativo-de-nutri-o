
import { GoogleGenAI, Type } from "@google/genai";
import { Patient, MealPlan } from "../types";

// Note: In a real environment, never expose keys on the client.
// We are using process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Extendendo o tipo Patient apenas localmente para aceitar o campo opcional de calorias manuais
interface PatientWithCustomCalories extends Patient {
  customCalories?: number;
}

// Fatores de atividade mais conservadores para evitar superestimação
const ACTIVITY_FACTORS = {
  'sedentary': 1.2,      // Pouco ou nenhum exercício
  'moderate': 1.375,     // Exercício leve/moderado 1-3 dias/semana
  'active': 1.55         // Exercício moderado/intenso 3-5 dias/semana
};

/**
 * Helper para limpar o JSON caso a IA retorne Markdown ou texto antes/depois
 */
const cleanJsonText = (text: string) => {
  // Remove markdown blocks
  let clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
  
  // Encontra o primeiro '{' e o último '}' para garantir que pegamos apenas o JSON
  const firstOpen = clean.indexOf('{');
  const lastClose = clean.lastIndexOf('}');
  
  if (firstOpen !== -1 && lastClose !== -1) {
    clean = clean.substring(firstOpen, lastClose + 1);
  }
  
  return clean;
};

/**
 * Calcula a necessidade calórica baseada em evidência científica (Mifflin-St Jeor)
 */
const calculateCalories = (patient: Patient): { bmr: number; tdee: number; target: number; strategy: string } => {
  // 1. Cálculo da Taxa Metabólica Basal (TMB) - Mifflin-St Jeor
  let bmr = 0;
  if (patient.gender === 'male') {
    bmr = (10 * patient.weight) + (6.25 * patient.height) - (5 * patient.age) + 5;
  } else {
    bmr = (10 * patient.weight) + (6.25 * patient.height) - (5 * patient.age) - 161;
  }

  // 2. Cálculo do Gasto Energético Total (VET/TDEE)
  const activityFactor = ACTIVITY_FACTORS[patient.activityLevel] || 1.2;
  const tdee = Math.round(bmr * activityFactor);

  // 3. Definição da Meta baseada no Objetivo
  let target = tdee;
  let strategy = "Manutenção Energética";

  const goalLower = patient.goal.toLowerCase();

  if (goalLower.includes('perda') || goalLower.includes('emagrecimento') || goalLower.includes('definição')) {
    // Déficit calórico padrão de 500kcal ou ajuste seguro para não ficar muito abaixo da basal
    const deficit = 500;
    target = tdee - deficit;
    
    // Segurança: Nunca baixar muito além da TMB (Basal) sem supervisão estrita
    if (target < bmr) {
        target = Math.max(bmr, tdee - 300); 
    }
    strategy = `Déficit Calórico (VET - ${tdee - target}kcal) para Emagrecimento`;
  
  } else if (goalLower.includes('ganho') || goalLower.includes('hipertrofia')) {
    target = tdee + 300; // Superávit conservador
    strategy = "Superávit Calórico Moderado para Hipertrofia";
  }

  return { bmr: Math.round(bmr), tdee, target: Math.round(target), strategy };
};

export const generateMealPlanWithAI = async (patient: PatientWithCustomCalories): Promise<MealPlan | null> => {
  const modelId = "gemini-2.5-flash"; 

  // Realiza o cálculo matemático ANTES de chamar a IA
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

    DIRETRIZES DE MACRONUTRIENTES (Científico):
    1. Proteína: Ajuste para ${patient.goal.toLowerCase().includes('perda') ? '2.0g a 2.5g/kg (Proteção de massa magra)' : '1.6g a 2.0g/kg'}.
    2. Gordura: Mantenha entre 0.8g e 1.0g/kg.
    3. Carboidrato: O restante das calorias.
    
    FONTES DE ALIMENTOS (Baseado na tabela TACO/TBCA - Brasil):
    - Priorize comida de verdade: Arroz, feijão, batata, frango, ovos, frutas, aveia.
    - Evite suplementos se não solicitado.

    ESTRUTURA DA RESPOSTA (JSON estrito):
    - Responda APENAS o JSON puro. Sem textos introdutórios, sem explicações.
    - Gere 5 a 6 refeições.
    - Defina horários sugeridos (HH:MM) lógicos para cada refeição.
    - Inclua o campo "calories" em cada item individualmente (estimado).
    - Quantidades em GRAMAS (peso cozido para carboidratos) e MEDIDAS CASEIRAS.
    - IMPORTANTE: O campo "substitutions" é OBRIGATÓRIO. Forneça 2 a 3 opções de troca calórica equivalente para CADA alimento (ex: Frango -> Peixe ou Ovos).
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2, // Temperatura baixa para garantir adesão ao JSON
        topK: 32,
        topP: 0.9,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalCalories: { type: Type.NUMBER, description: "Soma exata das calorias do plano gerado" },
            macros: {
                type: Type.OBJECT,
                description: "Macronutrientes totais",
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
                  time: { type: Type.STRING, description: "Horário sugerido no formato HH:MM" },
                  items: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        quantity: { type: Type.STRING, description: "Ex: 100g (4 colheres de sopa)" },
                        calories: { type: Type.NUMBER, description: "Calorias estimadas deste item" },
                        substitutions: { 
                            type: Type.ARRAY, 
                            items: { type: Type.STRING },
                            description: "Lista obrigatória de 2-3 alimentos equivalentes para substituição." 
                        }
                      }
                    }
                  }
                }
              }
            },
            generalAdvice: { type: Type.STRING, description: "Texto curto com orientações finais." },
            shoppingList: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    if (response.text) {
      const cleanText = cleanJsonText(response.text);
      const data = JSON.parse(cleanText);
      
      const finalPlan: MealPlan = {
        id: Date.now().toString(),
        patientId: patient.id,
        createdAt: new Date().toISOString(),
        totalCalories: data.totalCalories,
        macros: data.macros || { protein: 0, carbs: 0, fats: 0 },
        meals: data.meals || [],
        shoppingList: data.shoppingList || [],
        generalAdvice: data.generalAdvice || "Siga o plano com consistência."
      };
      
      return finalPlan;
    }
    return null;

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

/**
 * Analisa resultados de exames laboratoriais colados pelo usuário
 */
export const analyzeLabResults = async (examsText: string, patient: Patient): Promise<string> => {
  const modelId = "gemini-2.5-flash"; 

  const prompt = `
    Atue como um Nutricionista Funcional Especialista em Bioquímica.
    Analise os seguintes resultados de exames laboratoriais do paciente ${patient.name} (${patient.age} anos, ${patient.gender}, objetivo: ${patient.goal}).

    TEXTO DOS EXAMES:
    "${examsText}"

    DIRETRIZES DE ANÁLISE:
    1. Identifique os marcadores principais presentes no texto.
    2. Não use apenas os "Valores de Referência do Laboratório". Use parâmetros ideais da Nutrição Funcional (ex: Ferritina ideal > 70, não > 10).
    3. Identifique correlações (ex: Homocisteína alta + B12 baixa).
    4. Sugira intervenções nutricionais e suplementares específicas.
    
    ESTRUTURA DA RESPOSTA (Markdown):
    - **Resumo Geral**: Visão geral do estado metabólico.
    - **Pontos de Atenção**: Marcadores alterados ou fora do ideal funcional.
    - **Correlações**: Conexões entre diferentes exames.
    - **Conduta Nutricional**: O que comer mais/menos.
    - **Sugestão de Suplementação**: (Com aviso de que é apenas sugestão).

    Aviso Legal: Inicie dizendo que esta é uma análise baseada em evidências nutricionais e não substitui diagnóstico médico.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        temperature: 0.4,
        topK: 32,
        topP: 0.9,
      }
    });

    return response.text || "Não foi possível gerar a análise. Tente novamente.";

  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Erro ao conectar com a IA. Verifique sua chave de API.";
  }
};
