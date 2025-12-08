
import { Meal, Macros } from '../types';

export interface MealPlanTemplate {
  id: string;
  name: string;
  description: string;
  goal: string;
  totalCalories: number;
  macros: Macros;
  meals: Meal[];
  generalAdvice: string;
}

export const MealPlanTemplates: MealPlanTemplate[] = [
  // --- TEMPLATES POR CALORIA (MANTIDOS) ---
  {
    id: 'vlc_1000',
    name: 'VLCD - 1000 Kcal',
    description: 'Dieta de muito baixa caloria. Foco em volume vegetal.',
    goal: 'Perda Rápida',
    totalCalories: 1000,
    macros: { protein: 90, carbs: 80, fats: 35 },
    generalAdvice: "Atenção: Dieta restritiva. Priorize folhas verdes à vontade para saciedade. Beba muita água.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Ovo Cozido', quantity: '1 unidade', calories: 78 },
          { name: 'Mamão Papaia', quantity: '1/2 unidade', calories: 60 },
          { name: 'Café Preto', quantity: '1 xícara', calories: 0 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada de Folhas', quantity: 'Prato Cheio', calories: 20 },
          { name: 'Peito de Frango Grelhado', quantity: '100g', calories: 165 },
          { name: 'Legumes no Vapor (Brócolis)', quantity: '1 xícara', calories: 35 },
          { name: 'Arroz Integral', quantity: '2 col. sopa', calories: 50 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural Desnatado', quantity: '1 pote', calories: 70 },
          { name: 'Morangos', quantity: '5 unidades', calories: 25 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Sopa de Legumes com Carne Magra', quantity: '1 prato fundo', calories: 200 },
          { name: 'Fio de Azeite', quantity: '1 col. chá', calories: 45 }
        ]
      }
    ]
  },
  {
    id: 'cal_1100',
    name: '1100 Kcal - Déficit Agressivo',
    description: 'Leve aumento de proteína em relação à VLCD.',
    goal: 'Perda de Peso',
    totalCalories: 1100,
    macros: { protein: 100, carbs: 90, fats: 38 },
    generalAdvice: "Mantenha o foco na hidratação.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160 },
          { name: 'Melão', quantity: '1 fatia média', calories: 60 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada Verde', quantity: 'À vontade', calories: 20 },
          { name: 'Filé de Tilápia', quantity: '120g', calories: 140 },
          { name: 'Batata Doce Cozida', quantity: '100g', calories: 112 },
          { name: 'Azeite', quantity: '1 col. chá', calories: 45 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Whey Protein (com água)', quantity: '1 dose', calories: 120 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete de Legumes (2 ovos)', quantity: '1 unidade', calories: 180 },
          { name: 'Salada de Tomate', quantity: '1 pires', calories: 30 }
        ]
      }
    ]
  },
  {
    id: 'cal_1200',
    name: '1200 Kcal - Padrão Feminino',
    description: 'Dieta base para emagrecimento feminino padrão.',
    goal: 'Perda de Peso',
    totalCalories: 1200,
    macros: { protein: 105, carbs: 100, fats: 42 },
    generalAdvice: "Fracione bem as refeições para não sentir fome.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Pão Integral', quantity: '1 fatia', calories: 60 },
          { name: 'Ovo Mexido', quantity: '1 unidade', calories: 80 },
          { name: 'Café com Leite Desn.', quantity: '1 xícara', calories: 60 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz Integral', quantity: '3 col. sopa', calories: 75 },
          { name: 'Feijão', quantity: '1/2 concha', calories: 45 },
          { name: 'Frango Grelhado', quantity: '100g', calories: 165 },
          { name: 'Legumes', quantity: '1 pires', calories: 40 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Fruta (Maçã)', quantity: '1 unidade', calories: 70 },
          { name: 'Iogurte Natural', quantity: '1 pote', calories: 70 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Salada Completa com Atum', quantity: '1 prato', calories: 250 },
          { name: 'Azeite', quantity: '1 col. sobremesa', calories: 45 }
        ]
      }
    ]
  },
  {
    id: 'cal_1300',
    name: '1300 Kcal - Déficit Moderado',
    description: 'Equilíbrio e saciedade para perda consistente.',
    goal: 'Perda de Peso',
    totalCalories: 1300,
    macros: { protein: 110, carbs: 120, fats: 45 },
    generalAdvice: "Inclui lanches estratégicos.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:30',
        items: [
          { name: 'Tapioca Pequena', quantity: '2 col. sopa goma', calories: 100 },
          { name: 'Ovo Mexido', quantity: '2 unidades', calories: 160 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '3 col. sopa', calories: 75 },
          { name: 'Feijão', quantity: '1 concha pequena', calories: 70 },
          { name: 'Carne Magra', quantity: '100g', calories: 180 },
          { name: 'Vegetais', quantity: 'À vontade', calories: 30 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Banana com Aveia', quantity: '1 un + 1 col. sopa', calories: 100 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Filé de Frango', quantity: '120g', calories: 190 },
          { name: 'Abóbora Assada', quantity: '100g', calories: 60 },
          { name: 'Salada', quantity: '1 pires', calories: 20 }
        ]
      }
    ]
  },
  {
    id: 'cal_1400',
    name: '1400 Kcal - Reeducação',
    description: 'Ideal para início de reeducação alimentar.',
    goal: 'Manutenção/Perda',
    totalCalories: 1400,
    macros: { protein: 115, carbs: 140, fats: 48 },
    generalAdvice: "Variedade é a chave.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Pão Francês s/ miolo', quantity: '1 un', calories: 100 },
          { name: 'Queijo Minas', quantity: '2 fatias', calories: 100 },
          { name: 'Café com Leite', quantity: '1 xícara', calories: 60 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz', quantity: '4 col. sopa', calories: 100 },
          { name: 'Feijão', quantity: '1 concha', calories: 90 },
          { name: 'Frango Grelhado', quantity: '120g', calories: 190 },
          { name: 'Salada', quantity: '1/2 prato', calories: 30 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte com Fruta', quantity: '1 pote + 1/2 fruta', calories: 120 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete (2 ovos)', quantity: '1 unidade', calories: 180 },
          { name: 'Salada Variada', quantity: '1 prato', calories: 40 },
          { name: 'Azeite', quantity: '1 col. sobremesa', calories: 45 }
        ]
      }
    ]
  },
  {
    id: 'cal_1500',
    name: '1500 Kcal - Metabolismo Médio',
    description: 'Ponto de partida para a maioria das mulheres ativas.',
    goal: 'Manutenção',
    totalCalories: 1500,
    macros: { protein: 120, carbs: 150, fats: 50 },
    generalAdvice: "Bom volume de comida com controle de gorduras.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:30',
        items: [
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160 },
          { name: 'Pão Integral', quantity: '1 fatia', calories: 60 },
          { name: 'Fruta', quantity: '1 unidade', calories: 70 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '4 col. sopa', calories: 100 },
          { name: 'Feijão', quantity: '1 concha', calories: 90 },
          { name: 'Carne Magra', quantity: '120g', calories: 200 },
          { name: 'Legumes', quantity: '1 pires', calories: 50 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sanduíche Natural', quantity: '1/2 unidade', calories: 150 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Peixe Grelhado', quantity: '150g', calories: 180 },
          { name: 'Batata Cozida', quantity: '100g', calories: 90 },
          { name: 'Salada e Azeite', quantity: 'À vontade + 1 col. chá', calories: 60 }
        ]
      }
    ]
  },
  {
    id: 'cal_1600',
    name: '1600 Kcal - Déficit Masc / Manut. Fem',
    description: 'Dieta confortável para emagrecimento masculino ou manutenção feminina.',
    goal: 'Flexível',
    totalCalories: 1600,
    macros: { protein: 130, carbs: 160, fats: 55 },
    generalAdvice: "Permite maior variedade de carboidratos.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Pão Francês', quantity: '1 unidade', calories: 135 },
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160 },
          { name: 'Queijo', quantity: '1 fatia', calories: 50 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz', quantity: '5 col. sopa', calories: 125 },
          { name: 'Feijão', quantity: '1 concha', calories: 90 },
          { name: 'Frango', quantity: '130g', calories: 210 },
          { name: 'Legumes', quantity: '1 pires', calories: 50 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte + Granola', quantity: '1 pote + 2 col. sopa', calories: 160 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Patrolinha/Carne Moída', quantity: '120g', calories: 200 },
          { name: 'Purê de Batata', quantity: '2 col. servir', calories: 120 },
          { name: 'Salada', quantity: '1 pires', calories: 20 }
        ]
      }
    ]
  },
  {
    id: 'cal_1700',
    name: '1700 Kcal - Padrão Masculino',
    description: 'Déficit calórico moderado para homens.',
    goal: 'Perda de Peso',
    totalCalories: 1700,
    macros: { protein: 140, carbs: 170, fats: 60 },
    generalAdvice: "Aumente a intensidade do treino.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:30',
        items: [
          { name: 'Tapioca com Queijo e Ovos', quantity: '1 média (2 ovos)', calories: 300 },
          { name: 'Café', quantity: '1 xícara', calories: 0 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '6 col. sopa', calories: 150 },
          { name: 'Feijão', quantity: '1 concha cheia', calories: 100 },
          { name: 'Carne Bovina', quantity: '120g', calories: 220 },
          { name: 'Salada e Azeite', quantity: '1 prato', calories: 60 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Banana + Pasta de Amendoim', quantity: '1 un + 1 col. sopa', calories: 160 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Frango Grelhado', quantity: '150g', calories: 240 },
          { name: 'Batata Doce', quantity: '150g', calories: 170 },
          { name: 'Brócolis', quantity: '1 xícara', calories: 35 }
        ]
      }
    ]
  },
  {
    id: 'cal_1800',
    name: '1800 Kcal - Manutenção Ativa',
    description: 'Mulheres ativas ou homens sedentários.',
    goal: 'Manutenção',
    totalCalories: 1800,
    macros: { protein: 145, carbs: 190, fats: 65 },
    generalAdvice: "Energia suficiente para treinos moderados.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Pão com Ovos e Queijo', quantity: '2 fatias + 2 ovos', calories: 350 },
          { name: 'Fruta', quantity: '1 porção', calories: 70 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz', quantity: '150g', calories: 190 },
          { name: 'Feijão', quantity: '1 concha', calories: 90 },
          { name: 'Carne/Frango', quantity: '130g', calories: 220 },
          { name: 'Salada com Azeite', quantity: '1 prato', calories: 80 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Proteico + Aveia', quantity: '1 un + 2 col. sopa', calories: 180 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Peixe ou Frango', quantity: '150g', calories: 240 },
          { name: 'Purê de Mandioquinha', quantity: '150g', calories: 150 },
          { name: 'Legumes', quantity: '1 pires', calories: 50 }
        ]
      }
    ]
  },
  {
    id: 'cal_1900',
    name: '1900 Kcal - Performance Leve',
    description: 'Início de superávit ou manutenção masculina.',
    goal: 'Performance',
    totalCalories: 1900,
    macros: { protein: 155, carbs: 210, fats: 70 },
    generalAdvice: "Refeições mais volumosas.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:00',
        items: [
          { name: 'Crepioca (2 ovos + 30g goma)', quantity: '1 grande', calories: 250 },
          { name: 'Recheio Frango/Queijo', quantity: '2 col. sopa', calories: 100 },
          { name: 'Suco de Laranja', quantity: '1 copo', calories: 90 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '200g', calories: 250 },
          { name: 'Feijão', quantity: '1 concha', calories: 90 },
          { name: 'Carne Vermelha', quantity: '130g', calories: 240 },
          { name: 'Salada', quantity: '1/2 prato', calories: 30 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sanduíche Natural', quantity: '1 unidade', calories: 250 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Macarrão com Carne Moída', quantity: '1 prato raso', calories: 350 },
          { name: 'Salada', quantity: '1 pires', calories: 20 }
        ]
      }
    ]
  },
  {
    id: 'cal_2000',
    name: '2000 Kcal - Hipertrofia / Atleta',
    description: 'Dieta normativa para homens ativos ou ganho de massa.',
    goal: 'Hipertrofia',
    totalCalories: 2000,
    macros: { protein: 165, carbs: 240, fats: 75 },
    generalAdvice: "Não pule refeições. Proteína em todas as etapas.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:00',
        items: [
          { name: 'Pão Francês', quantity: '2 unidades', calories: 270 },
          { name: 'Ovos Mexidos', quantity: '3 ovos', calories: 240 },
          { name: 'Fruta', quantity: '1 unidade', calories: 70 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '200g', calories: 250 },
          { name: 'Feijão', quantity: '1 concha cheia', calories: 120 },
          { name: 'Carne/Frango', quantity: '150g', calories: 260 },
          { name: 'Azeite', quantity: '1 col. sobremesa', calories: 45 }
        ]
      },
      {
        id: '3', name: 'Pré-Treino', time: '16:00',
        items: [
          { name: 'Banana + Aveia + Mel', quantity: 'Bowl', calories: 200 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Batata Inglesa', quantity: '250g', calories: 220 },
          { name: 'Carne Magra', quantity: '150g', calories: 250 },
          { name: 'Legumes', quantity: '1 xícara', calories: 50 }
        ]
      }
    ]
  },

  // --- NOVAS DOENÇAS ADICIONADAS ---
  {
    id: 'gastrite_refluxo',
    name: 'Gastrite & Refluxo (DRGE)',
    description: 'Dieta de fácil digestão, baixo volume e sem irritantes gástricos.',
    goal: 'Saúde Digestiva',
    totalCalories: 1500,
    macros: { protein: 100, carbs: 180, fats: 40 },
    generalAdvice: "Coma devagar. Não beba líquidos com as refeições. Evite café, chocolate, pimenta, frituras e deitar logo após comer.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:30',
        items: [
          { name: 'Chá de Camomila', quantity: '1 xícara', calories: 0 },
          { name: 'Torradas (Pão Francês amanhecido/tostado)', quantity: '2 fatias', calories: 120 },
          { name: 'Queijo Branco Magro (Cottage/Ricota)', quantity: '2 col. sopa', calories: 60 },
          { name: 'Mamão Papaia', quantity: '1/2 unidade', calories: 60 }
        ]
      },
      {
        id: '2', name: 'Lanche da Manhã', time: '10:00',
        items: [
          { name: 'Banana Prata ou Maçã Cozida', quantity: '1 unidade', calories: 70 }
        ]
      },
      {
        id: '3', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Branco (Bem cozido)', quantity: '4 col. sopa', calories: 110 },
          { name: 'Frango Desfiado ou Grelhado (sem pele/sem fritura)', quantity: '120g', calories: 190 },
          { name: 'Cenoura e Chuchu Cozidos', quantity: '1 prato sobremesa', calories: 50 },
          { name: 'Caldo de Feijão (Apenas o caldo)', quantity: '1 concha', calories: 40 }
        ]
      },
      {
        id: '4', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Biscoito de Arroz ou Maria', quantity: '4 unidades', calories: 100 },
          { name: 'Água de Coco', quantity: '1 copo', calories: 40 }
        ]
      },
      {
        id: '5', name: 'Jantar (Leve - 3h antes de dormir)', time: '19:30',
        items: [
          { name: 'Sopa de Legumes com Frango', quantity: '1 prato fundo', calories: 200 },
          { name: 'Batata Cozida', quantity: '1 unidade média', calories: 86 }
        ]
      }
    ]
  },
  {
    id: 'esteatose_hepatica',
    name: 'Esteatose Hepática (Fígado)',
    description: 'Baixa frutose, sem álcool, rico em colina e antioxidantes.',
    goal: 'Saúde Hepática',
    totalCalories: 1400,
    macros: { protein: 110, carbs: 130, fats: 50 },
    generalAdvice: "Zero álcool. Evite sucos de fruta concentrados e açúcar. Aumente consumo de brócolis e ovos (colina).",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Café sem açúcar', quantity: '1 xícara', calories: 5 },
          { name: 'Ovos Mexidos (Colina)', quantity: '2 unidades', calories: 160 },
          { name: 'Melão (Baixa frutose)', quantity: '1 fatia', calories: 50 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada de Rúcula (Amargos ajudam o fígado)', quantity: '1/2 prato', calories: 15 },
          { name: 'Peixe ou Frango', quantity: '120g', calories: 180 },
          { name: 'Arroz Integral', quantity: '3 col. sopa', calories: 75 },
          { name: 'Brócolis e Couve-flor', quantity: '1 xícara', calories: 40 },
          { name: 'Azeite de Oliva', quantity: '1 col. sobremesa', calories: 45 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural', quantity: '1 pote', calories: 70 },
          { name: 'Sementes de Chia', quantity: '1 col. sopa', calories: 55 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete de Espinafre', quantity: '2 ovos', calories: 180 },
          { name: 'Salada de Tomate', quantity: '1 pires', calories: 30 },
          { name: 'Abacate', quantity: '2 col. sopa', calories: 60 }
        ]
      }
    ]
  },
  {
    id: 'hipotireoidismo_hashimoto',
    name: 'Hipotireoidismo & Hashimoto',
    description: 'Rico em Selênio, Zinco e Iodo. Controle de glúten e bociogênicos.',
    goal: 'Metabolismo',
    totalCalories: 1500,
    macros: { protein: 100, carbs: 150, fats: 55 },
    generalAdvice: "Aguarde 30min após o remédio para comer. Cozinhe sempre brócolis/couve (não comer cru). Consuma castanha do pará diariamente.",
    meals: [
      {
        id: '1', name: 'Café da Manhã (30min após Levo)', time: '08:00',
        items: [
          { name: 'Mingau de Aveia com Frutas', quantity: '1 bowl', calories: 250 },
          { name: 'Castanha do Pará (Selênio)', quantity: '2 unidades', calories: 60 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Peixe (Iodo)', quantity: '120g', calories: 180 },
          { name: 'Quinoa ou Arroz Integral', quantity: '4 col. sopa', calories: 100 },
          { name: 'Cenoura e Vagem Cozidos', quantity: '1 pires', calories: 50 },
          { name: 'Feijão', quantity: '1 concha', calories: 90 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sementes de Abóbora (Zinco)', quantity: '1 col. sopa', calories: 50 },
          { name: 'Fruta Cítrica (Kiwi/Laranja)', quantity: '1 unidade', calories: 60 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Frango Grelhado', quantity: '100g', calories: 165 },
          { name: 'Purê de Abóbora', quantity: '3 col. sopa', calories: 80 },
          { name: 'Couve Refogada (Cozida!)', quantity: '1 pires', calories: 60 }
        ]
      }
    ]
  },
  {
    id: 'acido_urico_gota',
    name: 'Ácido Úrico / Gota',
    description: 'Pobre em purinas, frutose e álcool. Rico em laticínios magros e Vit C.',
    goal: 'Saúde Renal',
    totalCalories: 1600,
    macros: { protein: 90, carbs: 200, fats: 50 },
    generalAdvice: "Beba 3L de água. Evite: Cerveja, Vísceras, Frutos do Mar, Caldos de carne, Refrigerantes. Use laticínios magros.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Leite Desnatado (Uricosúrico)', quantity: '1 copo', calories: 70 },
          { name: 'Pão Integral', quantity: '2 fatias', calories: 120 },
          { name: 'Queijo Branco', quantity: '1 fatia', calories: 50 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz e Feijão (Moderado)', quantity: '4 col. arroz + 1/2 concha feijão', calories: 150 },
          { name: 'Ovos Cozidos (Seguro)', quantity: '2 unidades', calories: 155 },
          { name: 'Salada Crua', quantity: '1/2 prato', calories: 30 },
          { name: 'Laranja/Acerola (Vit C)', quantity: '1 unidade', calories: 60 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural', quantity: '1 pote', calories: 70 },
          { name: 'Cerejas ou Morangos (Anti-inflamatório)', quantity: '10 unidades', calories: 50 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Macarrão com Legumes', quantity: '1 prato raso', calories: 250 },
          { name: 'Peito de Frango (Sem pele)', quantity: '100g', calories: 165 }
        ]
      }
    ]
  },
  {
    id: 'constipacao_fibras',
    name: 'Constipação (Intestino Preso)',
    description: 'Laxativo natural: Alto teor de fibras insolúveis, água e gorduras boas.',
    goal: 'Saúde Intestinal',
    totalCalories: 1700,
    macros: { protein: 100, carbs: 200, fats: 60 },
    generalAdvice: "Fórmula mágica: Fibra + Água + Gordura. Consuma mamão, ameixa, azeite cru e beba 3L de água.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Mamão com Aveia/Psyllium', quantity: '1/2 papaia + 1 col. sopa', calories: 90 },
          { name: 'Iogurte Natural (Probiótico)', quantity: '1 pote', calories: 70 },
          { name: 'Ovos mexidos', quantity: '1 unidade', calories: 80 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Salada de Folhas (Crua)', quantity: '1 prato cheio', calories: 30 },
          { name: 'Azeite de Oliva (Cru - Importante)', quantity: '1 col. sobremesa', calories: 45 },
          { name: 'Arroz Integral', quantity: '4 col. sopa', calories: 100 },
          { name: 'Feijão (Rico em fibra)', quantity: '1 concha cheia', calories: 100 },
          { name: 'Carne/Frango', quantity: '100g', calories: 180 },
          { name: 'Laranja com bagaço', quantity: '1 unidade', calories: 60 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Ameixa Preta Seca', quantity: '3 unidades', calories: 60 },
          { name: 'Castanhas/Nozes (Gordura boa)', quantity: '30g', calories: 180 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Abóbora Cabotiá com Casca', quantity: '3 pedaços', calories: 80 },
          { name: 'Frango Grelhado', quantity: '100g', calories: 165 },
          { name: 'Couve Refogada', quantity: '1 pires', calories: 60 }
        ]
      }
    ]
  },
  {
    id: 'sarcopenia_idoso',
    name: 'Sarcopenia (Idosos)',
    description: 'Alto fracionamento proteico para manutenção muscular em idosos.',
    goal: 'Manutenção Muscular',
    totalCalories: 1600,
    macros: { protein: 130, carbs: 170, fats: 50 },
    generalAdvice: "Proteína em TODAS as refeições (min 20g). Exercício de força é essencial. Textura adaptada se houver disfagia.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Leite com Whey Protein ou Leite em Pó', quantity: '1 copo reforçado', calories: 150 },
          { name: 'Pão macio com Queijo', quantity: '1 unidade', calories: 180 },
          { name: 'Mamão amassado', quantity: '1 fatia', calories: 50 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Carne Moída ou Desfiada (Fácil mastigação)', quantity: '120g', calories: 220 },
          { name: 'Purê de Batata/Mandioca', quantity: '3 col. servir', calories: 150 },
          { name: 'Feijão (Caldo grosso)', quantity: '1 concha', calories: 90 },
          { name: 'Legumes bem cozidos', quantity: '1 pires', calories: 40 }
        ]
      },
      {
        id: '3', name: 'Lanche da Tarde', time: '15:30',
        items: [
          { name: 'Mingau de Aveia com Ovos/Claras (Salgar ou Doce)', quantity: '1 prato', calories: 200 },
          { name: 'Ou: Iogurte Proteico', quantity: '1 unidade', calories: 120 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '19:30',
        items: [
          { name: 'Omelete (2 ovos) com Queijo', quantity: '1 unidade', calories: 220 },
          { name: 'Sopa de Legumes batida ou pedaços', quantity: '1 prato', calories: 100 }
        ]
      }
    ]
  },

  // --- EXISTENTES (Mantidos abaixo) ---
  {
    id: 'diabetes_lowcarb',
    name: 'Diabetes & Resistência à Insulina',
    description: 'Estratégia Low Carb moderada focada em carga glicêmica baixa.',
    goal: 'Diabetes',
    totalCalories: 1600,
    macros: { protein: 120, carbs: 80, fats: 85 },
    generalAdvice: "Mantenha horários regulares. Consuma as fibras antes dos carboidratos nas refeições principais. Hidratação constante.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:30',
        items: [
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160 },
          { name: 'Queijo Minas Curado', quantity: '30g (2 fatias)', calories: 110 },
          { name: 'Café sem açúcar', quantity: '1 xícara', calories: 5 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Salada de Folhas Verdes', quantity: 'Prato cheio', calories: 20 },
          { name: 'Azeite de Oliva', quantity: '1 col. sobremesa', calories: 45 },
          { name: 'Brócolis no Vapor', quantity: '1 xícara', calories: 35 },
          { name: 'Peito de Frango Grelhado', quantity: '120g', calories: 195 },
          { name: 'Feijão Preto (somente grãos)', quantity: '2 col. sopa', calories: 40 }
        ]
      },
      {
        id: '3', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Iogurte Natural', quantity: '1 pote (170g)', calories: 90 },
          { name: 'Sementes de Chia', quantity: '1 col. sopa', calories: 55 },
          { name: 'Morangos', quantity: '5 unidades', calories: 25 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete (2 ovos + espinafre)', quantity: '1 unidade', calories: 180 },
          { name: 'Salada de Tomate e Pepino', quantity: '1 pires', calories: 30 },
          { name: 'Abacate', quantity: '2 col. sopa', calories: 60 }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:30',
        items: [
          { name: 'Chá de Camomila', quantity: '1 xícara', calories: 0 },
          { name: 'Castanha do Pará', quantity: '2 unidades', calories: 60 }
        ]
      }
    ]
  },
  {
    id: 'colesterol_cardio',
    name: 'Cardioprotetor (Colesterol Alto)',
    description: 'Rico em fibras solúveis (aveia), gorduras insaturadas e baixo em saturadas.',
    goal: 'Dislipidemia',
    totalCalories: 1750,
    macros: { protein: 100, carbs: 200, fats: 60 },
    generalAdvice: "Foco total na redução de gorduras animais e aumento de fibras (aveia, frutas com casca). Evite frituras.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Mingau de Aveia (Leite desn. + Farelo de Aveia)', quantity: '1 tigela média', calories: 220 },
          { name: 'Maçã com Casca', quantity: '1 unidade média', calories: 70 },
          { name: 'Canela em pó', quantity: 'a gosto', calories: 0 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Integral', quantity: '4 col. sopa', calories: 100 },
          { name: 'Feijão Carioca', quantity: '1 concha', calories: 90 },
          { name: 'Peixe Grelhado (Tilápia/Sardinha)', quantity: '120g', calories: 150 },
          { name: 'Cenoura e Vagem cozidos', quantity: '1 pires', calories: 45 },
          { name: 'Laranja (sobremesa)', quantity: '1 unidade', calories: 60 }
        ]
      },
      {
        id: '3', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Mamão Papaia', quantity: '1/2 unidade', calories: 60 },
          { name: 'Farelo de Aveia', quantity: '1 col. sopa', calories: 35 },
          { name: 'Nozes', quantity: '3 unidades', calories: 80 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '19:30',
        items: [
          { name: 'Salada de Grão de Bico com Atum', quantity: '1 prato fundo', calories: 280 },
          { name: 'Azeite de Oliva Extra Virgem', quantity: '1 col. sobremesa (cru)', calories: 45 },
          { name: 'Folhas Verdes', quantity: 'à vontade', calories: 15 }
        ]
      }
    ]
  },
  {
    id: 'anemia_ferro',
    name: 'Combate à Anemia Ferropriva',
    description: 'Combinação estratégica de Ferro Heme + Vitamina C.',
    goal: 'Saúde Geral',
    totalCalories: 1900,
    macros: { protein: 110, carbs: 240, fats: 65 },
    generalAdvice: "Sempre consuma a fruta cítrica junto com o almoço/jantar. Evite café/laticínios 1h após as refeições principais.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:30',
        items: [
          { name: 'Suco Verde (Couve + Laranja)', quantity: '1 copo (300ml)', calories: 110 },
          { name: 'Pão Integral', quantity: '2 fatias', calories: 120 },
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Carne Bovina (Patinho/Músculo)', quantity: '120g', calories: 220 },
          { name: 'Feijão Preto (com caldo)', quantity: '1 concha e meia', calories: 140 },
          { name: 'Arroz Branco ou Integral', quantity: '4 col. sopa', calories: 110 },
          { name: 'Couve Refogada', quantity: '3 col. sopa', calories: 50 },
          { name: 'Abacaxi (sobremesa - Vitamina C)', quantity: '2 fatias', calories: 80 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sanduíche de Pasta de Homus', quantity: '1 und', calories: 200 },
          { name: 'Suco de Acerola', quantity: '1 copo', calories: 60 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Iscas de Fígado Acebolado (1x semana) ou Frango', quantity: '100g', calories: 180 },
          { name: 'Purê de Abóbora', quantity: '3 col. servir', calories: 120 },
          { name: 'Lentilha Cozida', quantity: '3 col. sopa', calories: 80 },
          { name: 'Mexerica (sobremesa)', quantity: '1 unidade', calories: 50 }
        ]
      }
    ]
  },
  {
    id: 'hipertrofia_masc',
    name: 'Hipertrofia Padrão (Masculino)',
    description: 'Alto teor proteico e superávit calórico moderado.',
    goal: 'Ganho de Peso',
    totalCalories: 2600,
    macros: { protein: 180, carbs: 320, fats: 75 },
    generalAdvice: "Consistência é chave. Não pule refeições pré/pós treino. Beba pelo menos 3L de água.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:00',
        items: [
          { name: 'Pão Francês', quantity: '2 unidades', calories: 270 },
          { name: 'Ovos Mexidos', quantity: '3 unidades', calories: 240 },
          { name: 'Queijo Minas', quantity: '2 fatias', calories: 100 },
          { name: 'Banana Prata', quantity: '1 unidade', calories: 70 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Branco', quantity: '200g (6 col. sopa)', calories: 260 },
          { name: 'Feijão', quantity: '1 concha cheia', calories: 100 },
          { name: 'Peito de Frango Grelhado', quantity: '150g', calories: 240 },
          { name: 'Salada Variada', quantity: 'à vontade', calories: 30 },
          { name: 'Azeite de Oliva', quantity: '1 col. sopa', calories: 90 }
        ]
      },
      {
        id: '3', name: 'Pré-Treino', time: '16:00',
        items: [
          { name: 'Banana amassada com Aveia', quantity: '2 bananas + 30g aveia', calories: 250 },
          { name: 'Doce de Leite', quantity: '1 col. sopa (opcional)', calories: 60 }
        ]
      },
      {
        id: '4', name: 'Pós-Treino (Jantar)', time: '20:00',
        items: [
          { name: 'Batata Inglesa Cozida', quantity: '300g', calories: 260 },
          { name: 'Carne Moída (Patinho)', quantity: '150g', calories: 330 },
          { name: 'Legumes Cozidos', quantity: '1 xícara', calories: 50 }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '23:00',
        items: [
          { name: 'Iogurte Natural ou Whey', quantity: '1 porção', calories: 120 },
          { name: 'Pasta de Amendoim', quantity: '1 col. sopa', calories: 90 }
        ]
      }
    ]
  },
  {
    id: 'emagrecimento_fem',
    name: 'Emagrecimento (1400 kcal)',
    description: 'Déficit calórico com alto volume de vegetais e proteínas.',
    goal: 'Perda de Peso',
    totalCalories: 1400,
    macros: { protein: 110, carbs: 130, fats: 50 },
    generalAdvice: "Foco na saciedade: coma devagar e beba água antes das refeições. Evite beliscar fora dos horários.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Mamão Papaia', quantity: '1/2 unidade', calories: 60 },
          { name: 'Ovos Cozidos/Mexidos', quantity: '2 unidades', calories: 155 },
          { name: 'Café preto', quantity: '1 xícara', calories: 0 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada de Folhas + Tomate', quantity: '1/2 prato', calories: 25 },
          { name: 'Legumes Cozidos (Vagem/Cenoura)', quantity: '1 pires', calories: 40 },
          { name: 'Arroz Integral', quantity: '3 col. sopa', calories: 75 },
          { name: 'Feijão', quantity: '1/2 concha', calories: 45 },
          { name: 'Filé de Frango', quantity: '120g', calories: 190 }
        ]
      },
      {
        id: '3', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Iogurte Natural Desnatado', quantity: '1 pote', calories: 70 },
          { name: 'Morango picado', quantity: '1 xícara', calories: 45 },
          { name: 'Farelo de Aveia', quantity: '1 col. sobremesa', calories: 30 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Sopa de Legumes com Frango', quantity: '1 prato fundo', calories: 250 },
          { name: 'ou: Omelete de 2 ovos com salada', quantity: '1 unidade', calories: 250 }
        ]
      },
      {
        id: '5', name: 'Ceia (Opcional)', time: '22:00',
        items: [
          { name: 'Chá de Melissa', quantity: '1 xícara', calories: 0 },
          { name: 'Kiwi', quantity: '1 unidade', calories: 45 }
        ]
      }
    ]
  },
  {
    id: 'vegetariano_ovolacto',
    name: 'Vegetariano Ovolactovegetariano',
    description: 'Dieta sem carnes, com ovos, laticínios e foco em ferro vegetal.',
    goal: 'Manutenção',
    totalCalories: 1800,
    macros: { protein: 95, carbs: 220, fats: 60 },
    generalAdvice: "Atenção à ingestão de Vitamina C junto com feijões e folhas escuras para melhorar absorção do ferro. Monitore a B12.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160 },
          { name: 'Pão Integral', quantity: '2 fatias', calories: 120 },
          { name: 'Mamão com Chia', quantity: '1 fatia + 1 col. sopa', calories: 90 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Integral', quantity: '4 col. sopa', calories: 100 },
          { name: 'Feijão Preto (Concha cheia)', quantity: '1 concha', calories: 90 },
          { name: 'Omelete de Espinafre ou Queijo Coalho', quantity: '1 unidade/fatia', calories: 180 },
          { name: 'Couve Refogada (Ferro)', quantity: '1 pires', calories: 60 },
          { name: 'Laranja (Sobremesa)', quantity: '1 unidade', calories: 60 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural com Mel', quantity: '1 pote + 1 fio de mel', calories: 110 },
          { name: 'Castanha de Caju', quantity: '5 unidades', calories: 60 },
          { name: 'Banana', quantity: '1 unidade', calories: 70 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Lentilha Cozida', quantity: '4 col. sopa', calories: 100 },
          { name: 'Purê de Abóbora', quantity: '3 col. sopa', calories: 80 },
          { name: 'Brócolis e Cenoura', quantity: '1 prato sobremesa', calories: 50 },
          { name: 'Ovo cozido', quantity: '1 unidade', calories: 78 }
        ]
      }
    ]
  },
  {
    id: 'low_fodmap',
    name: 'Low FODMAP (SII / Gases)',
    description: 'Protocolo de exclusão de alimentos fermentáveis (4 semanas).',
    goal: 'Saúde Intestinal',
    totalCalories: 1600,
    macros: { protein: 110, carbs: 180, fats: 50 },
    generalAdvice: "Evite: Alho, cebola, feijões, trigo, leite (lactose) e frutas como maçã/pera. Use cebolinha (parte verde) para temperar.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:30',
        items: [
          { name: 'Pão sem Glúten ou Tapioca', quantity: '1 unidade', calories: 150 },
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160 },
          { name: 'Melão ou Mamão (Frutas permitidas)', quantity: '1 fatia', calories: 60 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Branco', quantity: '4 col. sopa', calories: 110 },
          { name: 'Frango Grelhado (Temperado com sal e ervas)', quantity: '120g', calories: 190 },
          { name: 'Cenoura e Abobrinha (Cozidos)', quantity: '1 pires', calories: 45 },
          { name: 'Azeite de Oliva', quantity: '1 col. sobremesa', calories: 45 },
          { name: 'Não consumir feijão nesta fase', quantity: '-', calories: 0 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Banana Prata (Não muito madura)', quantity: '1 unidade', calories: 70 },
          { name: 'Leite Zero Lactose ou Vegetal', quantity: '1 copo', calories: 80 },
          { name: 'Nozes (max 3 unidades)', quantity: '3 unidades', calories: 80 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Batata Inglesa Cozida', quantity: '2 unidades pequenas', calories: 140 },
          { name: 'Peixe ou Frango', quantity: '100g', calories: 150 },
          { name: 'Espinafre e Tomate', quantity: '1 pires', calories: 30 }
        ]
      }
    ]
  },
  {
    id: 'dash_hipertensao',
    name: 'DASH (Hipertensão)',
    description: 'Foco em potássio, cálcio e baixo sódio para controle da pressão.',
    goal: 'Hipertensão',
    totalCalories: 1700,
    macros: { protein: 100, carbs: 220, fats: 50 },
    generalAdvice: "Evite sal de adição, embutidos e temperos prontos. Abuse de frutas, verduras e laticínios magros.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:30',
        items: [
          { name: 'Leite Desnatado (Cálcio)', quantity: '1 copo (200ml)', calories: 70 },
          { name: 'Banana (Potássio)', quantity: '1 unidade', calories: 70 },
          { name: 'Aveia', quantity: '2 col. sopa', calories: 60 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada Crua Variada (Muito volume)', quantity: '1/2 prato', calories: 30 },
          { name: 'Peixe Assado ou Grelhado', quantity: '120g', calories: 180 },
          { name: 'Batata Doce ou Inhame', quantity: '2 pedaços', calories: 120 },
          { name: 'Feijão (Pouco sal)', quantity: '1 concha', calories: 90 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '15:30',
        items: [
          { name: 'Iogurte Natural Desnatado', quantity: '1 pote', calories: 70 },
          { name: 'Melão', quantity: '1 fatia grande', calories: 60 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '19:30',
        items: [
          { name: 'Sopa de Legumes (Sem caldo Knorr)', quantity: '1 prato fundo', calories: 150 },
          { name: 'Frango Desfiado na sopa', quantity: '3 col. sopa', calories: 100 },
          { name: 'Torrada Integral (sem sal)', quantity: '2 unidades', calories: 70 }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:00',
        items: [
          { name: 'Água de Coco (Potássio)', quantity: '1 copo', calories: 40 }
        ]
      }
    ]
  },
  {
    id: 'sopa_anti_inflamatoria',
    name: 'SOP & Endometriose (Anti-inflamatório)',
    description: 'Baixo índice glicêmico, sem glúten e rico em antioxidantes.',
    goal: 'Anti-inflamatória',
    totalCalories: 1500,
    macros: { protein: 100, carbs: 120, fats: 65 },
    generalAdvice: "Evite potes plásticos (BPA). Priorize cúrcuma, gengibre e ômega-3. Evite açúcar e farinha branca.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Suco Verde (Couve, Limão, Gengibre)', quantity: '1 copo', calories: 60 },
          { name: 'Ovos Mexidos com Cúrcuma', quantity: '2 ovos', calories: 160 },
          { name: 'Morangos', quantity: '1 xícara', calories: 45 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Salada de Rúcula e Tomate', quantity: '1/2 prato', calories: 25 },
          { name: 'Sardinha ou Salmão (Ômega 3)', quantity: '100g', calories: 180 },
          { name: 'Quinoa ou Arroz Negro', quantity: '3 col. sopa', calories: 80 },
          { name: 'Brócolis (Detox)', quantity: '1 xícara', calories: 35 },
          { name: 'Azeite Extra Virgem', quantity: '1 col. sobremesa', calories: 45 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Abacate', quantity: '3 col. sopa', calories: 90 },
          { name: 'Sementes de Abóbora', quantity: '1 col. sopa', calories: 50 },
          { name: 'Chá de Hortelã', quantity: '1 xícara', calories: 0 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Creme de Abóbora com Gengibre', quantity: '1 prato fundo', calories: 180 },
          { name: 'Frango Desfiado', quantity: '3 col. sopa', calories: 100 }
        ]
      }
    ]
  },
  {
    id: 'cetogenica_std',
    name: 'Dieta Cetogênica (Standard)',
    description: 'Indução de cetose: Alta gordura, proteína moderada, carbo mínimo (<30g).',
    goal: 'Perda de Peso Rápida',
    totalCalories: 1600,
    macros: { protein: 90, carbs: 25, fats: 125 },
    generalAdvice: "Beba muita água e reponha sal (sódio) moderadamente. Evite raízes, grãos, frutas doces e açúcar.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Ovos Mexidos com Bacon', quantity: '2 ovos + 1 fatia bacon', calories: 220 },
          { name: 'Café com Óleo de Coco', quantity: '1 xícara + 1 col. chá', calories: 40 }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Sobre-coxa de Frango com pele', quantity: '1 unidade média', calories: 230 },
          { name: 'Brócolis e Couve-flor (Low carb)', quantity: '1 xícara', calories: 40 },
          { name: 'Azeite de Oliva (bastante)', quantity: '1 col. sopa cheia', calories: 110 },
          { name: 'Salada de Folhas Verdes', quantity: 'À vontade', calories: 15 }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Castanhas do Pará/Caju', quantity: '30g (um punhado)', calories: 180 },
          { name: 'Queijo Parmesão ou Provolone', quantity: '30g (cubos)', calories: 120 }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete Recheado (Queijo e Presunto)', quantity: '2 ovos + recheio', calories: 280 },
          { name: 'Abacate', quantity: '2 col. sopa', calories: 90 },
          { name: 'Salada de Alface', quantity: '1 prato', calories: 10 }
        ]
      }
    ]
  }
];
