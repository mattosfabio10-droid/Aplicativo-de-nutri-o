
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
  // =================================================================
  // CATEGORIA: CALORIAS (ESCALA)
  // =================================================================
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
          { name: 'Ovo Cozido', quantity: '1 unidade', calories: 78, substitutions: ['1 fatia de Queijo Minas', '2 Claras', '1 col. sopa de Patê de Atum'] },
          { name: 'Mamão Papaia', quantity: '1/2 unidade', calories: 60, substitutions: ['1 fatia de Melão', '10 Morangos', '1 Kiwi'] },
          { name: 'Café Preto', quantity: '1 xícara', calories: 0, substitutions: ['Chá Verde', 'Chá de Hibisco', 'Água com limão'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada de Folhas', quantity: 'Prato Cheio', calories: 20, substitutions: ['Rúcula e Agrião', 'Couve crua picada', 'Repolho ralado'] },
          { name: 'Peito de Frango Grelhado', quantity: '100g', calories: 165, substitutions: ['120g de Tilápia', '2 Ovos cozidos', '100g de Patinho moído'] },
          { name: 'Legumes no Vapor (Brócolis)', quantity: '1 xícara', calories: 35, substitutions: ['Couve-flor', 'Abobrinha', 'Vagem'] },
          { name: 'Arroz Integral', quantity: '2 col. sopa', calories: 50, substitutions: ['50g de Batata Doce', '2 col. sopa de Quinoa', '50g de Mandioca'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural Desnatado', quantity: '1 pote', calories: 70, substitutions: ['1 fatia de Ricota', '200ml Leite Desnatado', '1 Ovo'] },
          { name: 'Morangos', quantity: '5 unidades', calories: 25, substitutions: ['1 fatia de Kiwi', '1 fatia fina de Abacaxi', '1 Ameixa'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Sopa de Legumes com Carne Magra', quantity: '1 prato fundo', calories: 200, substitutions: ['Omelete de 2 ovos com espinafre', 'Salada com Atum (água)'] },
          { name: 'Fio de Azeite', quantity: '1 col. chá', calories: 45, substitutions: ['6 Amêndoas', '1 noz', '1/4 de abacate'] }
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
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160, substitutions: ['2 fatias de Queijo Minas', '80g de Frango desfiado', '120g de Tofu'] },
          { name: 'Melão', quantity: '1 fatia média', calories: 60, substitutions: ['10 Morangos', '1 fatia de Mamão', '1 Pêssego'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada Verde', quantity: 'À vontade', calories: 20, substitutions: ['Mix de folhas', 'Legumes crus'] },
          { name: 'Filé de Tilápia', quantity: '120g', calories: 140, substitutions: ['100g de Peito de Frango', '2 Ovos cozidos'] },
          { name: 'Batata Doce Cozida', quantity: '100g', calories: 112, substitutions: ['80g de Mandioca', '3 col. sopa de Arroz Integral'] },
          { name: 'Azeite', quantity: '1 col. chá', calories: 45, substitutions: ['3 Castanhas de Caju', '1 col. sobremesa de Sementes'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Whey Protein (com água)', quantity: '1 dose', calories: 120, substitutions: ['1 Iogurte Proteico', '2 Claras de ovo cozidas', '1 fatia de Queijo'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete de Legumes (2 ovos)', quantity: '1 unidade', calories: 180, substitutions: ['100g de Frango desfiado com Abobrinha', 'Salada de Atum'] },
          { name: 'Salada de Tomate', quantity: '1 pires', calories: 30, substitutions: ['Pepino', 'Palmito'] }
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
          { name: 'Pão Integral', quantity: '1 fatia', calories: 60, substitutions: ['2 torradas integrais', '1 Tapioca pequena (20g)', '1/2 Pão Francês sem miolo'] },
          { name: 'Ovo Mexido', quantity: '1 unidade', calories: 80, substitutions: ['1 fatia de Queijo Minas', '2 col. sopa de Atum'] },
          { name: 'Café com Leite Desn.', quantity: '1 xícara', calories: 60, substitutions: ['Iogurte Natural (1/2 pote)', 'Leite de Amêndoas'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz Integral', quantity: '3 col. sopa', calories: 75, substitutions: ['1 batata pequena', '3 col. sopa Quinoa', '80g Mandioca'] },
          { name: 'Feijão', quantity: '1/2 concha', calories: 45, substitutions: ['Lentilha', 'Grão de Bico'] },
          { name: 'Frango Grelhado', quantity: '100g', calories: 165, substitutions: ['Peixe Assado', 'Carne Moída Magra', 'Omelete (2 ovos)'] },
          { name: 'Legumes', quantity: '1 pires', calories: 40, substitutions: ['Salada crua à vontade', 'Legumes assados'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Fruta (Maçã)', quantity: '1 unidade', calories: 70, substitutions: ['Pera', '1 fatia de Melão', '1 Kiwi'] },
          { name: 'Iogurte Natural', quantity: '1 pote', calories: 70, substitutions: ['1 fatia de Queijo Branco', '200ml Água de Coco'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Salada Completa com Atum', quantity: '1 prato', calories: 250, substitutions: ['Sopa de Legumes com Frango', 'Wrap de Couve com Frango'] },
          { name: 'Azeite', quantity: '1 col. sobremesa', calories: 45, substitutions: ['1/4 de Abacate', '1 col. sobremesa de Sementes'] }
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
          { name: 'Tapioca Pequena', quantity: '2 col. sopa goma', calories: 100, substitutions: ['1 fatia de Pão Integral', '50g de Cuscuz'] },
          { name: 'Ovo Mexido', quantity: '2 unidades', calories: 160, substitutions: ['2 fatias de Queijo Minas', 'Frango desfiado'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '3 col. sopa', calories: 75, substitutions: ['100g de Batata', '3 col. sopa de Quinoa'] },
          { name: 'Feijão', quantity: '1 concha pequena', calories: 70, substitutions: ['Lentilha', 'Ervilha'] },
          { name: 'Carne Magra', quantity: '100g', calories: 180, substitutions: ['Frango Grelhado', 'Peixe Assado', '2 Ovos'] },
          { name: 'Vegetais', quantity: 'À vontade', calories: 30, substitutions: ['Salada Crua', 'Legumes no vapor'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Banana com Aveia', quantity: '1 un + 1 col. sopa', calories: 100, substitutions: ['Iogurte com Granola', 'Salada de Frutas'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Filé de Frango', quantity: '120g', calories: 190, substitutions: ['Peixe Grelhado', 'Carne Moída'] },
          { name: 'Abóbora Assada', quantity: '100g', calories: 60, substitutions: ['Cenoura cozida', 'Chuchu refogado'] },
          { name: 'Salada', quantity: '1 pires', calories: 20, substitutions: ['Folhas verdes', 'Tomate e Pepino'] }
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
          { name: 'Pão Francês s/ miolo', quantity: '1 un', calories: 100, substitutions: ['2 fatias Pão Integral', '3 torradas'] },
          { name: 'Queijo Minas', quantity: '2 fatias', calories: 100, substitutions: ['Ovo mexido', 'Requeijão Light'] },
          { name: 'Café com Leite', quantity: '1 xícara', calories: 60, substitutions: ['Iogurte', 'Leite com Cacau'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz', quantity: '4 col. sopa', calories: 100, substitutions: ['150g Batata', '100g Macarrão'] },
          { name: 'Feijão', quantity: '1 concha', calories: 90, substitutions: ['Lentilha', 'Grão de Bico'] },
          { name: 'Frango Grelhado', quantity: '120g', calories: 190, substitutions: ['Carne Bovina Magra', 'Peixe'] },
          { name: 'Salada', quantity: '1/2 prato', calories: 30, substitutions: ['Legumes cozidos'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte com Fruta', quantity: '1 pote + 1/2 fruta', calories: 120, substitutions: ['Vitamina de fruta', 'Mingau de Aveia pequeno'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete (2 ovos)', quantity: '1 unidade', calories: 180, substitutions: ['Frango desfiado', 'Atum (1 lata)'] },
          { name: 'Salada Variada', quantity: '1 prato', calories: 40, substitutions: ['Sopa de Legumes'] },
          { name: 'Azeite', quantity: '1 col. sobremesa', calories: 45, substitutions: ['Castanhas', 'Abacate'] }
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
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160, substitutions: ['2 fatias de Queijo Minas', 'Frango desfiado (80g)'] },
          { name: 'Pão Integral', quantity: '1 fatia', calories: 60, substitutions: ['2 torradas', '1/2 pão francês s/ miolo'] },
          { name: 'Fruta', quantity: '1 unidade', calories: 70, substitutions: ['1 fatia de Mamão', '1/2 xícara de Morangos'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '4 col. sopa', calories: 100, substitutions: ['100g Batata Inglesa', '100g Macarrão Integral'] },
          { name: 'Feijão', quantity: '1 concha', calories: 90, substitutions: ['Lentilha', 'Ervilha'] },
          { name: 'Carne Magra', quantity: '120g', calories: 200, substitutions: ['120g Frango', '140g Peixe', '3 Ovos'] },
          { name: 'Legumes', quantity: '1 pires', calories: 50, substitutions: ['Salada de folhas', 'Vegetais no vapor'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sanduíche Natural', quantity: '1/2 unidade', calories: 150, substitutions: ['Iogurte + Granola', 'Banana + Aveia'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Peixe Grelhado', quantity: '150g', calories: 180, substitutions: ['Frango Grelhado', 'Omelete de 3 Claras + 1 Gema'] },
          { name: 'Batata Cozida', quantity: '100g', calories: 90, substitutions: ['Purê de Abóbora', 'Arroz (3 col. sopa)'] },
          { name: 'Salada e Azeite', quantity: 'À vontade + 1 col. chá', calories: 60, substitutions: ['Legumes refogados'] }
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
          { name: 'Pão Francês', quantity: '1 unidade', calories: 135, substitutions: ['Tapioca', 'Cuscuz'] },
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160, substitutions: ['Frango desfiado', 'Queijo Quente'] },
          { name: 'Queijo', quantity: '1 fatia', calories: 50, substitutions: ['Requeijão', 'Manteiga'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz', quantity: '5 col. sopa', calories: 125, substitutions: ['200g Batata', '150g Macarrão'] },
          { name: 'Feijão', quantity: '1 concha', calories: 90, substitutions: ['Lentilha', 'Grão de Bico'] },
          { name: 'Frango', quantity: '130g', calories: 210, substitutions: ['Carne Bovina', 'Peixe'] },
          { name: 'Legumes', quantity: '1 pires', calories: 50, substitutions: ['Salada Variada'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte + Granola', quantity: '1 pote + 2 col. sopa', calories: 160, substitutions: ['Fruta + Aveia', 'Pão de Queijo (2 un)'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Patrolinha/Carne Moída', quantity: '120g', calories: 200, substitutions: ['Frango desfiado', 'Omelete'] },
          { name: 'Purê de Batata', quantity: '2 col. servir', calories: 120, substitutions: ['Arroz', 'Aipim'] },
          { name: 'Salada', quantity: '1 pires', calories: 20, substitutions: ['Legumes cozidos'] }
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
          { name: 'Tapioca com Queijo e Ovos', quantity: '1 média (2 ovos)', calories: 300, substitutions: ['Pão com Ovo e Queijo', 'Cuscuz com Ovo'] },
          { name: 'Café', quantity: '1 xícara', calories: 0, substitutions: ['Chá', 'Água'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '6 col. sopa', calories: 150, substitutions: ['250g Batata', '200g Macarrão'] },
          { name: 'Feijão', quantity: '1 concha cheia', calories: 100, substitutions: ['Lentilha', 'Feijão Branco'] },
          { name: 'Carne Bovina', quantity: '120g', calories: 220, substitutions: ['Frango', 'Peixe'] },
          { name: 'Salada e Azeite', quantity: '1 prato', calories: 60, substitutions: ['Legumes na manteiga'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Banana + Pasta de Amendoim', quantity: '1 un + 1 col. sopa', calories: 160, substitutions: ['Iogurte + Castanhas', 'Whey + Fruta'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Frango Grelhado', quantity: '150g', calories: 240, substitutions: ['Carne Moída', 'Peixe'] },
          { name: 'Batata Doce', quantity: '150g', calories: 170, substitutions: ['Arroz', 'Macarrão'] },
          { name: 'Brócolis', quantity: '1 xícara', calories: 35, substitutions: ['Couve', 'Salada'] }
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
          { name: 'Pão com Ovos e Queijo', quantity: '2 fatias + 2 ovos', calories: 350, substitutions: ['Tapioca com Frango e Queijo', 'Crepioca (2 ovos + 30g goma)'] },
          { name: 'Fruta', quantity: '1 porção', calories: 70, substitutions: ['Suco Verde', '1 Banana'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz', quantity: '150g', calories: 190, substitutions: ['200g Batata', '150g Macarrão'] },
          { name: 'Feijão', quantity: '1 concha', calories: 90, substitutions: ['Grão de Bico', 'Lentilha'] },
          { name: 'Carne/Frango', quantity: '130g', calories: 220, substitutions: ['Peixe Grelhado', 'Lombo Suíno'] },
          { name: 'Salada com Azeite', quantity: '1 prato', calories: 80, substitutions: ['Legumes na manteiga'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Proteico + Aveia', quantity: '1 un + 2 col. sopa', calories: 180, substitutions: ['Whey Protein + Fruta', '2 ovos cozidos'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Peixe ou Frango', quantity: '150g', calories: 240, substitutions: ['Carne Moída', 'Omelete Recheado'] },
          { name: 'Purê de Mandioquinha', quantity: '150g', calories: 150, substitutions: ['Batata Doce Assada', 'Milho Cozido'] },
          { name: 'Legumes', quantity: '1 pires', calories: 50, substitutions: ['Salada Verde'] }
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
          { name: 'Crepioca (2 ovos + 30g goma)', quantity: '1 grande', calories: 250, substitutions: ['Pão com Ovos', 'Tapioca com Frango'] },
          { name: 'Recheio Frango/Queijo', quantity: '2 col. sopa', calories: 100, substitutions: ['Atum', 'Carne moida'] },
          { name: 'Suco de Laranja', quantity: '1 copo', calories: 90, substitutions: ['Fruta inteira', 'Vitamina'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '200g', calories: 250, substitutions: ['300g Batata', '250g Macarrão'] },
          { name: 'Feijão', quantity: '1 concha', calories: 90, substitutions: ['Lentilha', 'Grão de Bico'] },
          { name: 'Carne Vermelha', quantity: '130g', calories: 240, substitutions: ['Frango', 'Peixe'] },
          { name: 'Salada', quantity: '1/2 prato', calories: 30, substitutions: ['Legumes cozidos'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sanduíche Natural', quantity: '1 unidade', calories: 250, substitutions: ['Iogurte+Aveia+Whey', 'Omelete+Pão'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Macarrão com Carne Moída', quantity: '1 prato raso', calories: 350, substitutions: ['Arroz+Frango', 'Batata+Peixe'] },
          { name: 'Salada', quantity: '1 pires', calories: 20, substitutions: ['Legumes'] }
        ]
      }
    ]
  },
  {
    id: 'cal_2000',
    name: '2000 Kcal - Hipertrofia / Atleta',
    description: 'Dieta normativa para homens ativos ou ganho de massa leve.',
    goal: 'Hipertrofia',
    totalCalories: 2000,
    macros: { protein: 165, carbs: 240, fats: 75 },
    generalAdvice: "Não pule refeições. Tente comer a cada 3-4 horas para manter o balanço nitrogenado positivo.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '07:00',
        items: [
          { name: 'Pão Francês', quantity: '2 unidades', calories: 270, substitutions: ['4 fatias Pão de Forma', 'Tapioca Grande (80g goma)', 'Cuscuz (2 fatias)'] },
          { name: 'Ovos Mexidos', quantity: '3 ovos', calories: 240, substitutions: ['100g Frango Desfiado + Queijo', '1.5 scoop Whey + Leite', 'Atum (1 lata)'] },
          { name: 'Fruta', quantity: '1 unidade', calories: 70, substitutions: ['1 Banana', '1 Maçã', '1 Pera'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '200g (escumadeira cheia)', calories: 250, substitutions: ['250g Batata', '200g Macarrão', '200g Mandioca'] },
          { name: 'Feijão', quantity: '1 concha cheia', calories: 120, substitutions: ['Lentilha', 'Grão de Bico', 'Feijão Branco'] },
          { name: 'Carne/Frango', quantity: '150g', calories: 260, substitutions: ['Peixe Grelhado', 'Lombo Suíno', 'Carne Seca'] },
          { name: 'Azeite', quantity: '1 col. sobremesa', calories: 45, substitutions: ['Abacate na salada', 'Sementes', '5 azeitonas'] }
        ]
      },
      {
        id: '3', name: 'Pré-Treino', time: '16:00',
        items: [
          { name: 'Banana + Aveia + Mel', quantity: 'Bowl', calories: 200, substitutions: ['2 fatias Pão + Geleia', 'Açaí pequeno', 'Batata Doce + Frango'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Batata Inglesa', quantity: '250g', calories: 220, substitutions: ['Arroz (150g)', 'Macarrão (150g)', 'Aipim (150g)'] },
          { name: 'Carne Magra', quantity: '150g', calories: 250, substitutions: ['Frango Grelhado', '3 Ovos', 'Peixe'] },
          { name: 'Legumes', quantity: '1 xícara', calories: 50, substitutions: ['Salada Variada', 'Couve refogada'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '23:00',
        items: [
          { name: 'Iogurte ou Leite', quantity: '1 porção', calories: 100, substitutions: ['Whey Protein', 'Queijo Cottage', '2 claras de ovo'] }
        ]
      }
    ]
  },
  {
    id: 'hipertrofia_3000',
    name: 'Bulking Agressivo (3000 kcal)',
    description: 'Alto volume de carboidratos para ganho de peso em ectomorfos ou atletas.',
    goal: 'Hipertrofia Máxima',
    totalCalories: 3000,
    macros: { protein: 200, carbs: 400, fats: 70 },
    generalAdvice: "Coma mesmo sem fome. Use refeições líquidas (shakes) para bater as calorias se necessário.",
    meals: [
      {
        id: '1', name: 'Desjejum', time: '07:00',
        items: [
          { name: 'Ovos inteiros', quantity: '4 unidades', calories: 310, substitutions: ['150g Frango desfiado', '2 scoops Whey + Leite'] },
          { name: 'Pão Francês', quantity: '3 unidades', calories: 400, substitutions: ['6 fatias Pão de Forma', '120g Tapioca', '300g Cuscuz'] },
          { name: 'Suco de Uva Integral', quantity: '1 copo (300ml)', calories: 180, substitutions: ['Suco de Laranja', '2 Bananas', '400ml Leite Integral'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz Branco', quantity: '300g (2 escumadeiras)', calories: 380, substitutions: ['400g Batata', '300g Macarrão', '300g Mandioca'] },
          { name: 'Feijão', quantity: '2 conchas', calories: 180, substitutions: ['Lentilha', 'Grão de Bico', 'Feijão Tropeiro (cuidado gordura)'] },
          { name: 'Carne Vermelha Magra', quantity: '150g', calories: 280, substitutions: ['Coxa/Sobrecoxa Frango', 'Salmão', 'Bisteca Suína'] },
          { name: 'Azeite', quantity: '1 col. sopa', calories: 90, substitutions: ['Abacate', 'Nozes', 'Manteiga'] },
          { name: 'Salada', quantity: 'à vontade', calories: 30, substitutions: ['Legumes cozidos', 'Vinagrete'] }
        ]
      },
      {
        id: '3', name: 'Pré-Treino', time: '16:00',
        items: [
          { name: 'Banana Prata', quantity: '3 unidades', calories: 210, substitutions: ['400ml Açaí', '150g Hipercalórico', '300g Batata Doce'] },
          { name: 'Aveia em Flocos', quantity: '4 col. sopa', calories: 120, substitutions: ['Granola', 'Farinha de Arroz', 'Pasta de Amendoim'] },
          { name: 'Mel', quantity: '2 col. sopa', calories: 120, substitutions: ['Doce de Leite', 'Geleia', 'Melaço'] }
        ]
      },
      {
        id: '4', name: 'Pós-Treino', time: '18:00',
        items: [
          { name: 'Whey Protein', quantity: '2 scoops', calories: 240, substitutions: ['Albumina', '150g Frango', '6 Claras de Ovo'] },
          { name: 'Maltodextrina/Dextrose', quantity: '40g', calories: 160, substitutions: ['2 Bananas', 'Pão Branco (2 fatias)', 'Suco de Uva'] }
        ]
      },
      {
        id: '5', name: 'Jantar', time: '21:00',
        items: [
          { name: 'Macarrão Cozido', quantity: '250g', calories: 350, substitutions: ['300g Batata', '200g Arroz', 'Purê de Batata (300g)'] },
          { name: 'Frango Grelhado', quantity: '150g', calories: 240, substitutions: ['Carne Moída', 'Peixe', 'Omelete de 3 ovos'] },
          { name: 'Azeite', quantity: '1 col. sobremesa', calories: 45, substitutions: ['Manteiga', 'Gema de ovo extra', 'Queijo Ralado'] }
        ]
      }
    ]
  },

  // =================================================================
  // CATEGORIA: ESTRATÉGIAS ESPECÍFICAS
  // =================================================================
  {
    id: 'jejum_intermitente',
    name: 'Jejum Intermitente (16:8)',
    description: 'Protocolo LeanGains: 16h de jejum e janela de 8h de alimentação (ex: 12h às 20h).',
    goal: 'Definição / Saúde',
    totalCalories: 1600,
    macros: { protein: 140, carbs: 120, fats: 60 },
    generalAdvice: "Durante o jejum: Apenas água, café sem açúcar e chás. A primeira refeição deve ser rica em proteínas.",
    meals: [
      {
        id: '1', name: 'Quebra de Jejum (Almoço)', time: '12:00',
        items: [
          { name: 'Salada de Folhas e Vegetais', quantity: 'Prato Cheio', calories: 40, substitutions: ['Legumes no vapor', 'Sopa de legumes'] },
          { name: 'Carne Bovina ou Frango', quantity: '150g', calories: 250, substitutions: ['3 Ovos + 2 Claras', 'Peixe Assado', 'Lombo Suíno'] },
          { name: 'Arroz Integral ou Tubérculos', quantity: '150g', calories: 180, substitutions: ['Batata Doce', 'Mandioca', 'Abóbora'] },
          { name: 'Azeite de Oliva', quantity: '1 col. sopa', calories: 90, substitutions: ['Abacate', 'Castanhas', 'Sementes de abóbora'] }
        ]
      },
      {
        id: '2', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Iogurte Natural + Whey', quantity: '1 misturado', calories: 180, substitutions: ['Omelete de 2 ovos', 'Atum com Cottage', 'Queijo Quente (pão low carb)'] },
          { name: 'Fruta', quantity: '1 unidade', calories: 70, substitutions: ['Morangos', 'Melão', 'Kiwi'] }
        ]
      },
      {
        id: '3', name: 'Jantar (Última Refeição)', time: '20:00',
        items: [
          { name: 'Omelete (3 ovos)', quantity: '1 unidade', calories: 240, substitutions: ['Frango Grelhado (150g)', 'Peixe (180g)', 'Carne Moída (120g)'] },
          { name: 'Vegetais Low Carb (Brócolis/Couve)', quantity: '1 prato', calories: 50, substitutions: ['Espinafre', 'Abobrinha', 'Couve-flor'] },
          { name: 'Abacate', quantity: '3 col. sopa', calories: 100, substitutions: ['Azeite', 'Coco seco', 'Queijo Parmesão'] }
        ]
      }
    ]
  },
  {
    id: 'vegano_estrito',
    name: 'Vegano Estrito (Plant Based)',
    description: '100% Vegetal. Foco em leguminosas e cereais para perfil de aminoácidos completo.',
    goal: 'Saúde / Ética',
    totalCalories: 1700,
    macros: { protein: 80, carbs: 220, fats: 55 },
    generalAdvice: "Deixe leguminosas de molho por 12h. Consuma Vitamina C (limão/laranja) com o almoço e jantar para absorver o ferro.",
    meals: [
      {
        id: '1', name: 'Café da Manhã', time: '08:00',
        items: [
          { name: 'Tofu Mexido com Cúrcuma', quantity: '150g', calories: 120, substitutions: ['Mingau de Aveia com Proteína Vegana', 'Homus com Pão Integral'] },
          { name: 'Pão Integral', quantity: '2 fatias', calories: 120, substitutions: ['Tapioca', 'Cuscuz de Milho'] },
          { name: 'Café com Leite de Soja', quantity: '1 xícara', calories: 40, substitutions: ['Leite de Amêndoas', 'Chá', 'Suco Verde'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Integral', quantity: '4 col. sopa', calories: 100, substitutions: ['Quinoa', 'Batata', 'Mandioca'] },
          { name: 'Feijão, Lentilha ou Grão de Bico', quantity: '2 conchas', calories: 180, substitutions: ['Ervilha', 'Soja em grãos', 'Favas'] },
          { name: 'Hambúrguer de Plantas (Caseiro)', quantity: '1 unidade', calories: 150, substitutions: ['Tempê', 'Proteína de Soja texturizada', 'Falafel assado'] },
          { name: 'Vegetais Escuros (Couve/Brócolis)', quantity: '1 prato', calories: 50, substitutions: ['Espinafre', 'Mostarda', 'Rúcula'] },
          { name: 'Laranja (Sobremesa)', quantity: '1 unidade', calories: 60, substitutions: ['Abacaxi', 'Acerola', 'Kiwi'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Vitamina (Leite Vegetal + Banana + Proteína)', quantity: '300ml', calories: 200, substitutions: ['Pasta de Amendoim com Maçã', 'Iogurte de Coco', 'Mix de Castanhas'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Sopa de Lentilha com Legumes', quantity: '1 prato fundo', calories: 200, substitutions: ['Salada de Grão de Bico', 'Tofu Grelhado com Legumes'] },
          { name: 'Sementes de Abóbora', quantity: '1 col. sopa', calories: 50, substitutions: ['Sementes de Girassol', 'Gergelim', 'Nozes'] }
        ]
      }
    ]
  },

  // =================================================================
  // CATEGORIA: CLÍNICA E DOENÇAS CRÔNICAS
  // =================================================================
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
          { name: 'Chá de Camomila', quantity: '1 xícara', calories: 0, substitutions: ['Chá de Erva Doce', 'Leite Desnatado (se tolerar)', 'Água de Coco'] },
          { name: 'Torradas (Pão Francês amanhecido/tostado)', quantity: '2 fatias', calories: 120, substitutions: ['Biscoito de Arroz', 'Bolacha de Água e Sal', 'Pão Sírio Tostado'] },
          { name: 'Queijo Branco Magro (Cottage/Ricota)', quantity: '2 col. sopa', calories: 60, substitutions: ['Ovo cozido (bem cozido)', 'Requeijão Light', 'Peito de Peru'] },
          { name: 'Mamão Papaia', quantity: '1/2 unidade', calories: 60, substitutions: ['Banana Prata', 'Maçã cozida sem casca', 'Pera cozida'] }
        ]
      },
      {
        id: '2', name: 'Lanche da Manhã', time: '10:00',
        items: [
          { name: 'Banana Prata ou Maçã Cozida', quantity: '1 unidade', calories: 70, substitutions: ['Pera sem casca', 'Gelatina diet', 'Água de Coco'] }
        ]
      },
      {
        id: '3', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Branco (Bem cozido)', quantity: '4 col. sopa', calories: 110, substitutions: ['Purê de Batata', 'Macarrão bem cozido', 'Polenta mole'] },
          { name: 'Frango Desfiado ou Grelhado', quantity: '120g', calories: 190, substitutions: ['Peixe Assado', 'Carne Moída magra', 'Omelete não frito'] },
          { name: 'Cenoura e Chuchu Cozidos', quantity: '1 prato sobremesa', calories: 50, substitutions: ['Abobrinha cozida', 'Beterraba cozida', 'Abóbora'] },
          { name: 'Caldo de Feijão (Apenas o caldo)', quantity: '1 concha', calories: 40, substitutions: ['Lentilha peneirada', 'Não consumir grãos inteiros', 'Creme de legumes'] }
        ]
      },
      {
        id: '4', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Biscoito de Arroz ou Maria', quantity: '4 unidades', calories: 100, substitutions: ['Torrada', 'Banana amassada com aveia', 'Gelatina'] },
          { name: 'Água de Coco', quantity: '1 copo', calories: 40, substitutions: ['Chá de Espinheira Santa', 'Suco de Melão', 'Suco de Pera'] }
        ]
      },
      {
        id: '5', name: 'Jantar (Leve - 3h antes de dormir)', time: '19:30',
        items: [
          { name: 'Sopa de Legumes com Frango', quantity: '1 prato fundo', calories: 200, substitutions: ['Creme de Abóbora com Frango', 'Peixe grelhado com Purê', 'Canja de Galinha'] },
          { name: 'Torrada', quantity: '1 unidade', calories: 35, substitutions: ['1 col. de arroz bem cozido', '1 batata pequena'] }
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
          { name: 'Café sem açúcar', quantity: '1 xícara', calories: 5, substitutions: ['Chá de Boldo', 'Chá Verde', 'Água com Limão'] },
          { name: 'Ovos Mexidos (Colina)', quantity: '2 unidades', calories: 160, substitutions: ['Queijo Cottage', 'Atum', 'Tofu'] },
          { name: 'Melão (Baixa frutose)', quantity: '1 fatia', calories: 50, substitutions: ['Morango', 'Abacate', 'Coco fresco'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada de Rúcula (Amargos ajudam o fígado)', quantity: '1/2 prato', calories: 15, substitutions: ['Agrião', 'Radicchio', 'Almeirão'] },
          { name: 'Peixe ou Frango', quantity: '120g', calories: 180, substitutions: ['Sardinha', 'Carne Magra', 'Ovos'] },
          { name: 'Arroz Integral', quantity: '3 col. sopa', calories: 75, substitutions: ['Quinoa', 'Grão de Bico', 'Batata Doce'] },
          { name: 'Brócolis e Couve-flor', quantity: '1 xícara', calories: 40, substitutions: ['Couve de Bruxelas', 'Repolho', 'Alcachofra'] },
          { name: 'Azeite de Oliva', quantity: '1 col. sobremesa', calories: 45, substitutions: ['Óleo de Abacate', 'Sementes de girassol', 'Nozes'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural', quantity: '1 pote', calories: 70, substitutions: ['Kefir', 'Coalhada Seca', 'Leite fermentado'] },
          { name: 'Sementes de Chia', quantity: '1 col. sopa', calories: 55, substitutions: ['Linhaça', 'Nozes', 'Castanhas'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete de Espinafre', quantity: '2 ovos', calories: 180, substitutions: ['Tofu grelhado', 'Frango desfiado', 'Sopa de Legumes'] },
          { name: 'Salada de Tomate', quantity: '1 pires', calories: 30, substitutions: ['Pepino', 'Vagem', 'Abobrinha'] },
          { name: 'Abacate', quantity: '2 col. sopa', calories: 60, substitutions: ['Azeite', 'Coco seco', 'Castanhas'] }
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
          { name: 'Mingau de Aveia com Frutas', quantity: '1 bowl', calories: 250, substitutions: ['Iogurte com Granola', 'Pão sem Glúten com Ovo', 'Tapioca com Chia'] },
          { name: 'Castanha do Pará (Selênio)', quantity: '2 unidades', calories: 60, substitutions: ['Nozes', 'Amêndoas', 'Semente de Girassol'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Peixe (Iodo)', quantity: '120g', calories: 180, substitutions: ['Frango', 'Carne Magra', 'Ovos'] },
          { name: 'Quinoa ou Arroz Integral', quantity: '4 col. sopa', calories: 100, substitutions: ['Batata Doce', 'Mandioca', 'Arroz Negro'] },
          { name: 'Cenoura e Vagem Cozidos', quantity: '1 pires', calories: 50, substitutions: ['Abobrinha', 'Chuchu', 'Beterraba'] },
          { name: 'Feijão', quantity: '1 concha', calories: 90, substitutions: ['Lentilha', 'Grão de Bico', 'Ervilha'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sementes de Abóbora (Zinco)', quantity: '1 col. sopa', calories: 50, substitutions: ['Sementes de Girassol', 'Pasta de Amendoim', 'Castanhas'] },
          { name: 'Fruta Cítrica (Kiwi/Laranja)', quantity: '1 unidade', calories: 60, substitutions: ['Morango', 'Goiaba', 'Tangerina'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Frango Grelhado', quantity: '100g', calories: 165, substitutions: ['Peixe', 'Omelete', 'Tofu'] },
          { name: 'Purê de Abóbora', quantity: '3 col. sopa', calories: 80, substitutions: ['Batata Baroa', 'Inhame', 'Mandioca'] },
          { name: 'Couve Refogada (Cozida!)', quantity: '1 pires', calories: 60, substitutions: ['Espinafre cozido', 'Acelga refogada', 'Brócolis cozido'] }
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
          { name: 'Leite Desnatado (Uricosúrico)', quantity: '1 copo', calories: 70, substitutions: ['Iogurte Desnatado', 'Queijo Cottage', 'Ricota'] },
          { name: 'Pão Integral', quantity: '2 fatias', calories: 120, substitutions: ['Tapioca', 'Aveia', 'Cuscuz'] },
          { name: 'Queijo Branco', quantity: '1 fatia', calories: 50, substitutions: ['Ricota', 'Requeijão Light', 'Ovo cozido'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz e Feijão (Moderado)', quantity: '4 col. arroz + 1/2 concha feijão', calories: 150, substitutions: ['Macarrão com Legumes', 'Batata e Lentilha'] },
          { name: 'Ovos Cozidos (Seguro)', quantity: '2 unidades', calories: 155, substitutions: ['Frango (Peito)', 'Queijo Quente', 'Tofu'] },
          { name: 'Salada Crua', quantity: '1/2 prato', calories: 30, substitutions: ['Legumes cozidos', 'Sopa de legumes'] },
          { name: 'Laranja/Acerola (Vit C)', quantity: '1 unidade', calories: 60, substitutions: ['Abacaxi', 'Limão (suco)', 'Kiwi'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural', quantity: '1 pote', calories: 70, substitutions: ['Leite', 'Queijo Branco', 'Coalhada'] },
          { name: 'Cerejas ou Morangos (Anti-inflamatório)', quantity: '10 unidades', calories: 50, substitutions: ['Mirtilos', 'Framboesas', 'Amoras'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Macarrão com Legumes', quantity: '1 prato raso', calories: 250, substitutions: ['Sopa de Legumes', 'Omelete com Queijo', 'Risoto de vegetais'] },
          { name: 'Peito de Frango (Sem pele)', quantity: '100g', calories: 165, substitutions: ['Ovos', 'Tofu', 'Queijo branco'] }
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
          { name: 'Mamão com Aveia/Psyllium', quantity: '1/2 papaia + 1 col. sopa', calories: 90, substitutions: ['Ameixa seca + Iogurte', 'Laranja com bagaço + Granola', 'Abacate + Chia'] },
          { name: 'Iogurte Natural (Probiótico)', quantity: '1 pote', calories: 70, substitutions: ['Kefir', 'Coalhada', 'Leite fermentado'] },
          { name: 'Ovos mexidos', quantity: '1 unidade', calories: 80, substitutions: ['Queijo Branco', 'Tofu', 'Requeijão'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Salada de Folhas (Crua)', quantity: '1 prato cheio', calories: 30, substitutions: ['Repolho cru', 'Couve crua (se tolerar)', 'Rúcula'] },
          { name: 'Azeite de Oliva (Cru - Importante)', quantity: '1 col. sobremesa', calories: 45, substitutions: ['Óleo de Abacate', 'Sementes de Linhaça', 'Abacate'] },
          { name: 'Arroz Integral', quantity: '4 col. sopa', calories: 100, substitutions: ['Quinoa', 'Milho', 'Batata com casca'] },
          { name: 'Feijão (Rico em fibra)', quantity: '1 concha cheia', calories: 100, substitutions: ['Lentilha', 'Grão de Bico', 'Ervilha'] },
          { name: 'Carne/Frango', quantity: '100g', calories: 180, substitutions: ['Peixe', 'Ovos', 'Carne Moida'] },
          { name: 'Laranja com bagaço', quantity: '1 unidade', calories: 60, substitutions: ['Tangerina', 'Abacaxi (com miolo)', 'Manga'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Ameixa Preta Seca', quantity: '3 unidades', calories: 60, substitutions: ['Damasco seco', 'Uva passa', 'Tâmara'] },
          { name: 'Castanhas/Nozes (Gordura boa)', quantity: '30g', calories: 180, substitutions: ['Amêndoas', 'Pasta de Amendoim', 'Coco seco'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Abóbora Cabotiá com Casca', quantity: '3 pedaços', calories: 80, substitutions: ['Batata Doce com casca', 'Inhame', 'Mandioca'] },
          { name: 'Frango Grelhado', quantity: '100g', calories: 165, substitutions: ['Peixe', 'Omelete', 'Carne Magra'] },
          { name: 'Couve Refogada', quantity: '1 pires', calories: 60, substitutions: ['Brócolis', 'Espinafre', 'Quiabo'] }
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
          { name: 'Leite com Whey Protein ou Leite em Pó', quantity: '1 copo reforçado', calories: 150, substitutions: ['Iogurte Proteico', 'Vitamina de Fruta com Albumina', 'Mingau com Clara de ovo'] },
          { name: 'Pão macio com Queijo', quantity: '1 unidade', calories: 180, substitutions: ['Mingau de Aveia', 'Bisnaguinha com Requeijão', 'Pão de leite'] },
          { name: 'Mamão amassado', quantity: '1 fatia', calories: 50, substitutions: ['Banana amassada', 'Pera raspada', 'Purê de maçã'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Carne Moída ou Desfiada (Fácil mastigação)', quantity: '120g', calories: 220, substitutions: ['Frango desfiado', 'Peixe (sem espinha)', 'Omelete macio'] },
          { name: 'Purê de Batata/Mandioca', quantity: '3 col. servir', calories: 150, substitutions: ['Polenta mole', 'Arroz bem cozido', 'Purê de abóbora'] },
          { name: 'Feijão (Caldo grosso)', quantity: '1 concha', calories: 90, substitutions: ['Caldo de Lentilha', 'Creme de Ervilha', 'Sopa de feijão'] },
          { name: 'Legumes bem cozidos', quantity: '1 pires', calories: 40, substitutions: ['Abóbora', 'Cenoura cozida', 'Chuchu'] }
        ]
      },
      {
        id: '3', name: 'Lanche da Tarde', time: '15:30',
        items: [
          { name: 'Mingau de Aveia com Ovos/Claras (Salgar ou Doce)', quantity: '1 prato', calories: 200, substitutions: ['Suplemento Nutricional (Ensure/Nutren)', 'Vitamina com Whey', 'Panqueca de banana'] },
          { name: 'Ou: Iogurte Proteico', quantity: '1 unidade', calories: 120, substitutions: ['Queijo Polenguinho', 'Gelatina com Whey', 'Leite fermentado'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '19:30',
        items: [
          { name: 'Omelete (2 ovos) com Queijo', quantity: '1 unidade', calories: 220, substitutions: ['Sopa Creme de Carne', 'Torta de Liquidificador (Frango)', 'Peixe ensopado'] },
          { name: 'Sopa de Legumes batida ou pedaços', quantity: '1 prato', calories: 100, substitutions: ['Canja de Galinha', 'Creme de Abóbora', 'Caldo verde com couve'] }
        ]
      }
    ]
  },
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
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160, substitutions: ['Queijo Coalho assado', 'Crepioca (1 ovo + 10g tapioca)', 'Omelete de queijo'] },
          { name: 'Queijo Minas Curado', quantity: '30g (2 fatias)', calories: 110, substitutions: ['Parmesão', 'Provolone', 'Meia cura'] },
          { name: 'Café sem açúcar', quantity: '1 xícara', calories: 5, substitutions: ['Chá de Canela', 'Chá Mate', 'Água com limão'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Salada de Folhas Verdes', quantity: 'Prato cheio', calories: 20, substitutions: ['Mix de folhas', 'Repolho cru', 'Rúcula'] },
          { name: 'Azeite de Oliva', quantity: '1 col. sobremesa', calories: 45, substitutions: ['Abacate', 'Azeitonas', 'Castanhas'] },
          { name: 'Brócolis no Vapor', quantity: '1 xícara', calories: 35, substitutions: ['Couve-flor', 'Abobrinha', 'Vagem'] },
          { name: 'Peito de Frango Grelhado', quantity: '120g', calories: 195, substitutions: ['Carne Bovina', 'Peixe Gordo', 'Porco'] },
          { name: 'Feijão Preto (somente grãos)', quantity: '2 col. sopa', calories: 40, substitutions: ['Lentilha', 'Grão de Bico', 'Não consumir'] }
        ]
      },
      {
        id: '3', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Iogurte Natural', quantity: '1 pote (170g)', calories: 90, substitutions: ['Kefir', 'Coalhada', 'Queijo branco'] },
          { name: 'Sementes de Chia', quantity: '1 col. sopa', calories: 55, substitutions: ['Linhaça', 'Psyllium', 'Semente de Girassol'] },
          { name: 'Morangos', quantity: '5 unidades', calories: 25, substitutions: ['Coco Seco', 'Mirtilos', 'Amoras'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete (2 ovos + espinafre)', quantity: '1 unidade', calories: 180, substitutions: ['Sopa de Legumes Low Carb', 'Peixe Assado', 'Frango desfiado com abobrinha'] },
          { name: 'Salada de Tomate e Pepino', quantity: '1 pires', calories: 30, substitutions: ['Berinjela Assada', 'Quiabo', 'Vagem'] },
          { name: 'Abacate', quantity: '2 col. sopa', calories: 60, substitutions: ['Castanhas', 'Azeite', 'Coco'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:30',
        items: [
          { name: 'Chá de Camomila', quantity: '1 xícara', calories: 0, substitutions: ['Chá de Melissa', 'Mulungu'] },
          { name: 'Castanha do Pará', quantity: '2 unidades', calories: 60, substitutions: ['5 Amêndoas', '1 pedaço de Queijo', 'Nozes'] }
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
          { name: 'Mingau de Aveia (Leite desn. + Farelo de Aveia)', quantity: '1 tigela média', calories: 220, substitutions: ['Iogurte com Granola s/ açúcar', 'Pão Integral com Queijo Cottage', 'Vitamina de fruta com aveia'] },
          { name: 'Maçã com Casca', quantity: '1 unidade média', calories: 70, substitutions: ['Pera', 'Laranja com bagaço', 'Mamão'] },
          { name: 'Canela em pó', quantity: 'a gosto', calories: 0, substitutions: ['Cacau em pó', 'Gengibre'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Integral', quantity: '4 col. sopa', calories: 100, substitutions: ['Quinoa', 'Milho', 'Trigo em grão'] },
          { name: 'Feijão Carioca', quantity: '1 concha', calories: 90, substitutions: ['Soja', 'Lentilha', 'Grão de Bico'] },
          { name: 'Peixe Grelhado (Tilápia/Sardinha)', quantity: '120g', calories: 150, substitutions: ['Peito de Frango', 'Atum', 'Claras de ovo'] },
          { name: 'Cenoura e Vagem cozidos', quantity: '1 pires', calories: 45, substitutions: ['Berinjela e Abobrinha', 'Beterraba crua', 'Quiabo'] },
          { name: 'Laranja (sobremesa)', quantity: '1 unidade', calories: 60, substitutions: ['Mexerica', 'Abacaxi', 'Melancia'] }
        ]
      },
      {
        id: '3', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Mamão Papaia', quantity: '1/2 unidade', calories: 60, substitutions: ['Banana', 'Melão', 'Ameixa'] },
          { name: 'Farelo de Aveia', quantity: '1 col. sopa', calories: 35, substitutions: ['Psyllium', 'Linhaça', 'Chia'] },
          { name: 'Nozes', quantity: '3 unidades', calories: 80, substitutions: ['Castanhas', 'Amêndoas (sem sal)', 'Pistache'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '19:30',
        items: [
          { name: 'Salada de Grão de Bico com Atum', quantity: '1 prato fundo', calories: 280, substitutions: ['Sanduíche de Pão Integral com Frango', 'Sopa de Legumes e Aveia', 'Peixe com salada'] },
          { name: 'Azeite de Oliva Extra Virgem', quantity: '1 col. sobremesa (cru)', calories: 45, substitutions: ['1/4 Abacate', 'Óleo de Linhaça', 'Sementes'] },
          { name: 'Folhas Verdes', quantity: 'à vontade', calories: 15, substitutions: ['Tomate e Pepino', 'Rúcula', 'Agrião'] }
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
          { name: 'Suco Verde (Couve + Laranja)', quantity: '1 copo (300ml)', calories: 110, substitutions: ['Suco de Abacaxi com Hortelã', 'Vitamina de Acerola', 'Suco de Caju'] },
          { name: 'Pão Integral', quantity: '2 fatias', calories: 120, substitutions: ['Tapioca com chia', 'Cuscuz', 'Batata Doce'] },
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160, substitutions: ['Patê de Atum', 'Frango desfiado', 'Humus'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Carne Bovina (Patinho/Músculo)', quantity: '120g', calories: 220, substitutions: ['Fígado bovino (1x semana)', 'Sobrecoxa de frango', 'Moela'] },
          { name: 'Feijão Preto (com caldo)', quantity: '1 concha e meia', calories: 140, substitutions: ['Lentilha', 'Feijão Carioca', 'Feijão Branco'] },
          { name: 'Arroz Branco ou Integral', quantity: '4 col. sopa', calories: 110, substitutions: ['Batata', 'Mandioca', 'Macarrão'] },
          { name: 'Couve Refogada', quantity: '3 col. sopa', calories: 50, substitutions: ['Espinafre', 'Brócolis', 'Agrião'] },
          { name: 'Abacaxi (sobremesa - Vitamina C)', quantity: '2 fatias', calories: 80, substitutions: ['Laranja', 'Tangerina', 'Morango'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sanduíche de Pasta de Homus', quantity: '1 und', calories: 200, substitutions: ['Pão com Ovo', 'Iogurte com Aveia', 'Vitamina'] },
          { name: 'Suco de Acerola', quantity: '1 copo', calories: 60, substitutions: ['Suco de Caju', 'Goiaba', 'Laranja'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Iscas de Fígado Acebolado (1x semana) ou Frango', quantity: '100g', calories: 180, substitutions: ['Carne Moída', 'Omelete com Espinafre', 'Peixe'] },
          { name: 'Purê de Abóbora', quantity: '3 col. servir', calories: 120, substitutions: ['Batata Doce', 'Inhame', 'Mandioca'] },
          { name: 'Lentilha Cozida', quantity: '3 col. sopa', calories: 80, substitutions: ['Feijão', 'Grão de Bico', 'Ervilha'] },
          { name: 'Mexerica (sobremesa)', quantity: '1 unidade', calories: 50, substitutions: ['Kiwi', 'Manga', 'Goiaba'] }
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
          { name: 'Pão Francês', quantity: '2 unidades', calories: 270, substitutions: ['4 fatias Pão de Forma', 'Tapioca Grande', 'Cuscuz'] },
          { name: 'Ovos Mexidos', quantity: '3 unidades', calories: 240, substitutions: ['120g Frango desfiado', '1.5 scoop Whey'] },
          { name: 'Queijo Minas', quantity: '2 fatias', calories: 100, substitutions: ['Requeijão', 'Presunto magro', 'Cottage'] },
          { name: 'Banana Prata', quantity: '1 unidade', calories: 70, substitutions: ['Maçã', 'Suco de Laranja', 'Pera'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Branco', quantity: '200g (6 col. sopa)', calories: 260, substitutions: ['300g Batata', '250g Macarrão', '200g Mandioca'] },
          { name: 'Feijão', quantity: '1 concha cheia', calories: 100, substitutions: ['Lentilha', 'Grão de Bico', 'Feijão Branco'] },
          { name: 'Peito de Frango Grelhado', quantity: '150g', calories: 240, substitutions: ['Carne Bovina Magra', 'Peixe', 'Lombo Suíno'] },
          { name: 'Salada Variada', quantity: 'à vontade', calories: 30, substitutions: ['Legumes cozidos', 'Vinagrete'] },
          { name: 'Azeite de Oliva', quantity: '1 col. sopa', calories: 90, substitutions: ['Abacate', 'Nozes', 'Manteiga'] }
        ]
      },
      {
        id: '3', name: 'Pré-Treino', time: '16:00',
        items: [
          { name: 'Banana amassada com Aveia', quantity: '2 bananas + 30g aveia', calories: 250, substitutions: ['Açaí com Granola', 'Sanduíche de Pasta de Amendoim', 'Batata Doce com Frango'] },
          { name: 'Doce de Leite', quantity: '1 col. sopa (opcional)', calories: 60, substitutions: ['Mel', 'Geleia', 'Melaço'] }
        ]
      },
      {
        id: '4', name: 'Pós-Treino (Jantar)', time: '20:00',
        items: [
          { name: 'Batata Inglesa Cozida', quantity: '300g', calories: 260, substitutions: ['Arroz Branco', 'Macarrão', 'Mandioca'] },
          { name: 'Carne Moída (Patinho)', quantity: '150g', calories: 330, substitutions: ['Frango', 'Peixe', 'Omelete de 4 ovos'] },
          { name: 'Legumes Cozidos', quantity: '1 xícara', calories: 50, substitutions: ['Salada', 'Sopa de Legumes'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '23:00',
        items: [
          { name: 'Iogurte Natural ou Whey', quantity: '1 porção', calories: 120, substitutions: ['Leite', 'Queijo Cottage', 'Claras de ovo'] },
          { name: 'Pasta de Amendoim', quantity: '1 col. sopa', calories: 90, substitutions: ['Castanhas', 'Abacate', 'Coco'] }
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
          { name: 'Mamão Papaia', quantity: '1/2 unidade', calories: 60, substitutions: ['Melão', 'Morangos', 'Kiwi'] },
          { name: 'Ovos Cozidos/Mexidos', quantity: '2 unidades', calories: 155, substitutions: ['Queijo Minas (2 fatias)', 'Frango desfiado', 'Tofu'] },
          { name: 'Café preto', quantity: '1 xícara', calories: 0, substitutions: ['Chá', 'Água com limão'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada de Folhas + Tomate', quantity: '1/2 prato', calories: 25, substitutions: ['Legumes crus variados', 'Salada de repolho', 'Rúcula'] },
          { name: 'Legumes Cozidos (Vagem/Cenoura)', quantity: '1 pires', calories: 40, substitutions: ['Abobrinha', 'Brócolis', 'Couve-flor'] },
          { name: 'Arroz Integral', quantity: '3 col. sopa', calories: 75, substitutions: ['Batata Doce', 'Quinoa', 'Mandioca'] },
          { name: 'Feijão', quantity: '1/2 concha', calories: 45, substitutions: ['Lentilha', 'Grão de Bico', 'Ervilha'] },
          { name: 'Filé de Frango', quantity: '120g', calories: 190, substitutions: ['Peixe', 'Carne Magra', 'Omelete'] }
        ]
      },
      {
        id: '3', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Iogurte Natural Desnatado', quantity: '1 pote', calories: 70, substitutions: ['Leite Desnatado', 'Queijo Cottage', 'Coalhada'] },
          { name: 'Morango picado', quantity: '1 xícara', calories: 45, substitutions: ['Maçã pequena', 'Pera', 'Ameixa'] },
          { name: 'Farelo de Aveia', quantity: '1 col. sobremesa', calories: 30, substitutions: ['Chia', 'Linhaça', 'Psyllium'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Sopa de Legumes com Frango', quantity: '1 prato fundo', calories: 250, substitutions: ['Salada com Atum', 'Peixe com Purê de Abóbora', 'Frango com legumes'] },
          { name: 'ou: Omelete de 2 ovos com salada', quantity: '1 unidade', calories: 250, substitutions: ['Crepioca pequena', 'Sanduíche aberto'] }
        ]
      },
      {
        id: '5', name: 'Ceia (Opcional)', time: '22:00',
        items: [
          { name: 'Chá de Melissa', quantity: '1 xícara', calories: 0, substitutions: ['Chá de Camomila', 'Chá de Mulungu'] },
          { name: 'Kiwi', quantity: '1 unidade', calories: 45, substitutions: ['Morangos', 'Fatia de Melão'] }
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
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160, substitutions: ['Queijo Quente', 'Iogurte com Granola', 'Panqueca de banana'] },
          { name: 'Pão Integral', quantity: '2 fatias', calories: 120, substitutions: ['Tapioca', 'Cuscuz', 'Aveia'] },
          { name: 'Mamão com Chia', quantity: '1 fatia + 1 col. sopa', calories: 90, substitutions: ['Banana com Aveia', 'Salada de Frutas', 'Iogurte com fruta'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Integral', quantity: '4 col. sopa', calories: 100, substitutions: ['Quinoa', 'Batata', 'Macarrão Integral'] },
          { name: 'Feijão Preto (Concha cheia)', quantity: '1 concha', calories: 90, substitutions: ['Lentilha', 'Grão de Bico', 'Soja'] },
          { name: 'Omelete de Espinafre ou Queijo Coalho', quantity: '1 unidade/fatia', calories: 180, substitutions: ['2 Ovos Cozidos', 'Hambúrguer de Soja', 'Tofu grelhado'] },
          { name: 'Couve Refogada (Ferro)', quantity: '1 pires', calories: 60, substitutions: ['Brócolis', 'Espinafre', 'Rúcula'] },
          { name: 'Laranja (Sobremesa)', quantity: '1 unidade', calories: 60, substitutions: ['Abacaxi', 'Acerola', 'Kiwi'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural com Mel', quantity: '1 pote + 1 fio de mel', calories: 110, substitutions: ['Vitamina de Banana', 'Sanduíche de Queijo', 'Mingau'] },
          { name: 'Castanha de Caju', quantity: '5 unidades', calories: 60, substitutions: ['Nozes', 'Amêndoas', 'Amendoim'] },
          { name: 'Banana', quantity: '1 unidade', calories: 70, substitutions: ['Maçã', 'Pera', 'Goiaba'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Lentilha Cozida', quantity: '4 col. sopa', calories: 100, substitutions: ['Feijão Branco', 'Ervilha', 'Grão de Bico'] },
          { name: 'Purê de Abóbora', quantity: '3 col. sopa', calories: 80, substitutions: ['Batata Doce', 'Inhame', 'Mandioca'] },
          { name: 'Brócolis e Cenoura', quantity: '1 prato sobremesa', calories: 50, substitutions: ['Sopa de Legumes', 'Salada crua', 'Abobrinha'] },
          { name: 'Ovo cozido', quantity: '1 unidade', calories: 78, substitutions: ['Queijo Cottage', 'Ricota temperada', 'Queijo branco'] }
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
          { name: 'Pão sem Glúten ou Tapioca', quantity: '1 unidade', calories: 150, substitutions: ['Biscoito de Arroz', 'Pão de Milho', 'Cuscuz'] },
          { name: 'Ovos Mexidos', quantity: '2 unidades', calories: 160, substitutions: ['Queijo sem lactose', 'Tofu firme', 'Presunto'] },
          { name: 'Melão ou Mamão (Frutas permitidas)', quantity: '1 fatia', calories: 60, substitutions: ['Morango', 'Kiwi', 'Banana verde'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz Branco', quantity: '4 col. sopa', calories: 110, substitutions: ['Batata Inglesa', 'Polenta', 'Quinoa'] },
          { name: 'Frango Grelhado (Temperado com sal e ervas)', quantity: '120g', calories: 190, substitutions: ['Peixe', 'Carne Bovina', 'Ovos'] },
          { name: 'Cenoura e Abobrinha (Cozidos)', quantity: '1 pires', calories: 45, substitutions: ['Chuchu', 'Espinafre', 'Tomate'] },
          { name: 'Azeite de Oliva', quantity: '1 col. sobremesa', calories: 45, substitutions: ['Óleo de coco', 'Manteiga'] },
          { name: 'Não consumir feijão nesta fase', quantity: '-', calories: 0, substitutions: [] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Banana Prata (Não muito madura)', quantity: '1 unidade', calories: 70, substitutions: ['Laranja', 'Tangerina', 'Uvas'] },
          { name: 'Leite Zero Lactose ou Vegetal', quantity: '1 copo', calories: 80, substitutions: ['Iogurte Zero Lactose', 'Queijo Curado', 'Chá'] },
          { name: 'Nozes (max 3 unidades)', quantity: '3 unidades', calories: 80, substitutions: ['Sementes de Abóbora', 'Amendoim'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Batata Inglesa Cozida', quantity: '2 unidades pequenas', calories: 140, substitutions: ['Purê de Mandioquinha', 'Arroz', 'Inhame'] },
          { name: 'Peixe ou Frango', quantity: '100g', calories: 150, substitutions: ['Ovos', 'Carne Moída', 'Tofu'] },
          { name: 'Espinafre e Tomate', quantity: '1 pires', calories: 30, substitutions: ['Vagem', 'Berinjela', 'Cenoura'] }
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
          { name: 'Leite Desnatado (Cálcio)', quantity: '1 copo (200ml)', calories: 70, substitutions: ['Iogurte Desnatado', 'Queijo Branco sem sal'] },
          { name: 'Banana (Potássio)', quantity: '1 unidade', calories: 70, substitutions: ['Melão', 'Mamão', 'Abacate'] },
          { name: 'Aveia', quantity: '2 col. sopa', calories: 60, substitutions: ['Granola sem açúcar', 'Chia', 'Linhaça'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada Crua Variada (Muito volume)', quantity: '1/2 prato', calories: 30, substitutions: ['Legumes no vapor', 'Sopa de Legumes', 'Legumes assados'] },
          { name: 'Peixe Assado ou Grelhado', quantity: '120g', calories: 180, substitutions: ['Frango sem pele', 'Lombo magro', 'Ovos'] },
          { name: 'Batata Doce ou Inhame', quantity: '2 pedaços', calories: 120, substitutions: ['Arroz Integral', 'Feijão', 'Grão de Bico'] },
          { name: 'Feijão (Pouco sal)', quantity: '1 concha', calories: 90, substitutions: ['Lentilha', 'Ervilha', 'Fava'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '15:30',
        items: [
          { name: 'Iogurte Natural Desnatado', quantity: '1 pote', calories: 70, substitutions: ['Leite', 'Queijo Ricota', 'Coalhada'] },
          { name: 'Melão', quantity: '1 fatia grande', calories: 60, substitutions: ['Melancia', 'Laranja', 'Pera'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '19:30',
        items: [
          { name: 'Sopa de Legumes (Sem caldo Knorr)', quantity: '1 prato fundo', calories: 150, substitutions: ['Salada completa', 'Legumes refogados', 'Creme de abóbora'] },
          { name: 'Frango Desfiado na sopa', quantity: '3 col. sopa', calories: 100, substitutions: ['Carne moída magra', 'Ovo cozido', 'Tofu'] },
          { name: 'Torrada Integral (sem sal)', quantity: '2 unidades', calories: 70, substitutions: ['Milho cozido', 'Batata pequena', 'Arroz'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:00',
        items: [
          { name: 'Água de Coco (Potássio)', quantity: '1 copo', calories: 40, substitutions: ['Chá de Erva Cidreira', '1 Fruta', 'Leite morno'] }
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
          { name: 'Suco Verde (Couve, Limão, Gengibre)', quantity: '1 copo', calories: 60, substitutions: ['Chá de Cúrcuma', 'Shot de Limão e Própolis', 'Suco de aipo'] },
          { name: 'Ovos Mexidos com Cúrcuma', quantity: '2 ovos', calories: 160, substitutions: ['Tofu mexido', 'Abacate com sementes', 'Frango desfiado'] },
          { name: 'Morangos', quantity: '1 xícara', calories: 45, substitutions: ['Mirtilos', 'Amoras', 'Kiwi'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Salada de Rúcula e Tomate', quantity: '1/2 prato', calories: 25, substitutions: ['Agrião', 'Espinafre', 'Brócolis'] },
          { name: 'Sardinha ou Salmão (Ômega 3)', quantity: '100g', calories: 180, substitutions: ['Frango orgânico', 'Ovos caipiras', 'Atum'] },
          { name: 'Quinoa ou Arroz Negro', quantity: '3 col. sopa', calories: 80, substitutions: ['Batata Doce', 'Inhame', 'Grão de Bico'] },
          { name: 'Brócolis (Detox)', quantity: '1 xícara', calories: 35, substitutions: ['Couve-flor', 'Couve de Bruxelas', 'Repolho'] },
          { name: 'Azeite Extra Virgem', quantity: '1 col. sobremesa', calories: 45, substitutions: ['Sementes de Linhaça', 'Abacate', 'Nozes'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Abacate', quantity: '3 col. sopa', calories: 90, substitutions: ['Coco seco', 'Castanhas', 'Azeite'] },
          { name: 'Sementes de Abóbora', quantity: '1 col. sopa', calories: 50, substitutions: ['Sementes de Girassol', 'Chia', 'Linhaça'] },
          { name: 'Chá de Hortelã', quantity: '1 xícara', calories: 0, substitutions: ['Chá Verde', 'Chá de Gengibre'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Creme de Abóbora com Gengibre', quantity: '1 prato fundo', calories: 180, substitutions: ['Sopa de Legumes', 'Peixe com salada', 'Frango com legumes'] },
          { name: 'Frango Desfiado', quantity: '3 col. sopa', calories: 100, substitutions: ['Ovo cozido', 'Tofu', 'Peixe'] }
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
          { name: 'Ovos Mexidos com Bacon', quantity: '2 ovos + 1 fatia bacon', calories: 220, substitutions: ['Omelete de Queijo', 'Abacate com Ovos', 'Café com manteiga'] },
          { name: 'Café com Óleo de Coco', quantity: '1 xícara + 1 col. chá', calories: 40, substitutions: ['Café com Creme de Leite', 'Chá', 'Água'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Sobre-coxa de Frango com pele', quantity: '1 unidade média', calories: 230, substitutions: ['Costela Bovina', 'Cupim', 'Salmão'] },
          { name: 'Brócolis e Couve-flor (Low carb)', quantity: '1 xícara', calories: 40, substitutions: ['Espinafre', 'Abobrinha', 'Repolho'] },
          { name: 'Azeite de Oliva (bastante)', quantity: '1 col. sopa cheia', calories: 110, substitutions: ['Manteiga', 'Banha de Porco', 'Maionese caseira'] },
          { name: 'Salada de Folhas Verdes', quantity: 'À vontade', calories: 15, substitutions: ['Pepino', 'Rabanete', 'Acelga'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Castanhas do Pará/Caju', quantity: '30g (um punhado)', calories: 180, substitutions: ['Nozes', 'Amêndoas', 'Macadâmia'] },
          { name: 'Queijo Parmesão ou Provolone', quantity: '30g (cubos)', calories: 120, substitutions: ['Salame', 'Ovo de Codorna', 'Azeitonas'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete Recheado (Queijo e Presunto)', quantity: '2 ovos + recheio', calories: 280, substitutions: ['Carne Moída com Azeitona', 'Peixe com crosta de castanha', 'Frango com pele'] },
          { name: 'Abacate', quantity: '2 col. sopa', calories: 90, substitutions: ['Coco seco', 'Maionese caseira', 'Creme de leite'] },
          { name: 'Salada de Alface', quantity: '1 prato', calories: 10, substitutions: ['Rúcula', 'Agrião', 'Chicória'] }
        ]
      }
    ]
  }
];
