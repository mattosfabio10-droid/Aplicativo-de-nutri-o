
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
          { name: 'Ovo Cozido', quantity: '1 unidade (50g)', calories: 78, substitutions: ['1 fatia de Queijo Minas', '2 Claras', '1 col. sopa de Patê de Atum'] },
          { name: 'Mamão Papaia', quantity: '1/2 unidade (140g)', calories: 60, substitutions: ['1 fatia de Melão', '10 Morangos', '1 Kiwi'] },
          { name: 'Café Preto', quantity: '1 xícara (150ml)', calories: 0, substitutions: ['Chá Verde', 'Chá de Hibisco', 'Água com limão'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Salada de Folhas', quantity: 'Prato Cheio (50g)', calories: 20, substitutions: ['Rúcula e Agrião', 'Couve crua picada', 'Repolho ralado'] },
          { name: 'Peito de Frango Grelhado', quantity: '100g (1 filé médio)', calories: 165, substitutions: ['120g de Tilápia', '2 Ovos cozidos', '100g de Patinho moído'] },
          { name: 'Legumes no Vapor (Brócolis)', quantity: '1 xícara (80g)', calories: 35, substitutions: ['Couve-flor', 'Abobrinha', 'Vagem'] },
          { name: 'Arroz Integral', quantity: '2 col. sopa (50g)', calories: 50, substitutions: ['50g de Batata Doce', '2 col. sopa de Quinoa', '50g de Mandioca'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural Desnatado', quantity: '1 pote (160g)', calories: 70, substitutions: ['1 fatia de Ricota', '200ml Leite Desnatado', '1 Ovo'] },
          { name: 'Morangos', quantity: '5 unidades (75g)', calories: 25, substitutions: ['1 fatia de Kiwi', '1 fatia fina de Abacaxi', '1 Ameixa'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Sopa de Legumes com Carne Magra', quantity: '1 prato fundo (300ml)', calories: 200, substitutions: ['Omelete de 2 ovos com espinafre', 'Salada com Atum (água)'] },
          { name: 'Fio de Azeite', quantity: '1 col. chá (5ml)', calories: 45, substitutions: ['6 Amêndoas', '1 noz', '1/4 de abacate'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:30',
        items: [
          { name: 'Chá de Camomila', quantity: '1 xícara (200ml)', calories: 0, substitutions: ['Chá de Melissa', 'Chá de Mulungu'] },
          { name: 'Gelatina Zero', quantity: '1 taça (100ml)', calories: 10, substitutions: ['Chá de Erva Doce'] }
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
          { name: 'Pão Integral', quantity: '1 fatia (25g)', calories: 60, substitutions: ['2 torradas integrais', '1 Tapioca pequena (20g)', '1/2 Pão Francês sem miolo'] },
          { name: 'Ovo Mexido', quantity: '1 unidade (50g)', calories: 80, substitutions: ['1 fatia de Queijo Minas', '2 col. sopa de Atum'] },
          { name: 'Café com Leite Desn.', quantity: '1 xícara (150ml)', calories: 60, substitutions: ['Iogurte Natural (1/2 pote)', 'Leite de Amêndoas'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz Integral', quantity: '3 col. sopa (75g)', calories: 75, substitutions: ['1 batata pequena', '3 col. sopa Quinoa', '80g Mandioca'] },
          { name: 'Feijão', quantity: '1/2 concha (70g)', calories: 45, substitutions: ['Lentilha', 'Grão de Bico'] },
          { name: 'Frango Grelhado', quantity: '100g (1 filé médio)', calories: 165, substitutions: ['Peixe Assado', 'Carne Moída Magra', 'Omelete (2 ovos)'] },
          { name: 'Legumes', quantity: '1 pires (100g)', calories: 40, substitutions: ['Salada crua à vontade', 'Legumes assados'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Fruta (Maçã)', quantity: '1 unidade média (130g)', calories: 70, substitutions: ['Pera', '1 fatia de Melão', '1 Kiwi'] },
          { name: 'Iogurte Natural', quantity: '1 pote (160g)', calories: 70, substitutions: ['1 fatia de Queijo Branco', '200ml Água de Coco'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Salada Completa com Atum', quantity: '1 prato cheio', calories: 250, substitutions: ['Sopa de Legumes com Frango', 'Wrap de Couve com Frango'] },
          { name: 'Azeite', quantity: '1 col. sobremesa (5ml)', calories: 45, substitutions: ['1/4 de Abacate', '1 col. sobremesa de Sementes'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:30',
        items: [
          { name: 'Chá de Erva Cidreira', quantity: '1 xícara (200ml)', calories: 0, substitutions: ['Chá de Camomila'] },
          { name: 'Castanha do Pará', quantity: '1 unidade (5g)', calories: 30, substitutions: ['2 Nozes', '3 Amêndoas'] }
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
          { name: 'Pão Francês s/ miolo', quantity: '1 unidade (50g)', calories: 100, substitutions: ['2 fatias Pão Integral', '3 torradas'] },
          { name: 'Queijo Minas', quantity: '2 fatias finas (30g)', calories: 100, substitutions: ['Ovo mexido', 'Requeijão Light'] },
          { name: 'Café com Leite', quantity: '1 xícara (150ml)', calories: 60, substitutions: ['Iogurte', 'Leite com Cacau'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz', quantity: '4 col. sopa (100g)', calories: 100, substitutions: ['150g Batata', '100g Macarrão'] },
          { name: 'Feijão', quantity: '1 concha (100g)', calories: 90, substitutions: ['Lentilha', 'Grão de Bico'] },
          { name: 'Frango Grelhado', quantity: '120g (1 filé grande)', calories: 190, substitutions: ['Carne Bovina Magra', 'Peixe'] },
          { name: 'Salada', quantity: '1/2 prato (80g)', calories: 30, substitutions: ['Legumes cozidos'] }
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
          { name: 'Salada Variada', quantity: '1 prato cheio', calories: 40, substitutions: ['Sopa de Legumes'] },
          { name: 'Azeite', quantity: '1 col. sobremesa (5ml)', calories: 45, substitutions: ['Castanhas', 'Abacate'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:30',
        items: [
          { name: 'Fruta Leve (Pera/Maçã)', quantity: '1 unidade pequena', calories: 60, substitutions: ['1 fatia de Melão', '1 Kiwi'] }
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
          { name: 'Pão Francês', quantity: '1 unidade (50g)', calories: 135, substitutions: ['Tapioca', 'Cuscuz'] },
          { name: 'Ovos Mexidos', quantity: '2 unidades (100g)', calories: 160, substitutions: ['Frango desfiado', 'Queijo Quente'] },
          { name: 'Queijo', quantity: '1 fatia (20g)', calories: 50, substitutions: ['Requeijão', 'Manteiga'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz', quantity: '5 col. sopa (125g)', calories: 125, substitutions: ['200g Batata', '150g Macarrão'] },
          { name: 'Feijão', quantity: '1 concha (100g)', calories: 90, substitutions: ['Lentilha', 'Grão de Bico'] },
          { name: 'Frango', quantity: '130g (1 filé grande)', calories: 210, substitutions: ['Carne Bovina', 'Peixe'] },
          { name: 'Legumes', quantity: '1 pires (100g)', calories: 50, substitutions: ['Salada Variada'] }
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
          { name: 'Patrolinha/Carne Moída', quantity: '120g (4 col. sopa)', calories: 200, substitutions: ['Frango desfiado', 'Omelete'] },
          { name: 'Purê de Batata', quantity: '2 col. servir (100g)', calories: 120, substitutions: ['Arroz', 'Aipim'] },
          { name: 'Salada', quantity: '1 pires', calories: 20, substitutions: ['Legumes cozidos'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:30',
        items: [
          { name: 'Iogurte Natural', quantity: '1/2 pote (80g)', calories: 40, substitutions: ['Leite morno (100ml)', '1 fatia de queijo'] },
          { name: 'Aveia', quantity: '1 col. sopa (15g)', calories: 50, substitutions: ['Chia', 'Linhaça'] }
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
          { name: 'Fruta', quantity: '1 porção média', calories: 70, substitutions: ['Suco Verde', '1 Banana'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz', quantity: '150g (6 col. sopa)', calories: 190, substitutions: ['200g Batata', '150g Macarrão'] },
          { name: 'Feijão', quantity: '1 concha (100g)', calories: 90, substitutions: ['Grão de Bico', 'Lentilha'] },
          { name: 'Carne/Frango', quantity: '130g (1 filé grande)', calories: 220, substitutions: ['Peixe Grelhado', 'Lombo Suíno'] },
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
          { name: 'Peixe ou Frango', quantity: '150g (1 filé grande)', calories: 240, substitutions: ['Carne Moída', 'Omelete Recheado'] },
          { name: 'Purê de Mandioquinha', quantity: '150g (3 col. servir)', calories: 150, substitutions: ['Batata Doce Assada', 'Milho Cozido'] },
          { name: 'Legumes', quantity: '1 pires', calories: 50, substitutions: ['Salada Verde'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:30',
        items: [
          { name: 'Abacate', quantity: '2 col. sopa (40g)', calories: 60, substitutions: ['Coco seco (20g)', 'Castanhas (3 un)'] }
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
          { name: 'Pão Francês', quantity: '2 unidades (100g)', calories: 270, substitutions: ['4 fatias Pão de Forma', 'Tapioca Grande (80g goma)', 'Cuscuz (2 fatias)'] },
          { name: 'Ovos Mexidos', quantity: '3 ovos', calories: 240, substitutions: ['100g Frango Desfiado + Queijo', '1.5 scoop Whey + Leite', 'Atum (1 lata)'] },
          { name: 'Fruta', quantity: '1 unidade média', calories: 70, substitutions: ['1 Banana', '1 Maçã', '1 Pera'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Arroz', quantity: '200g (escumadeira cheia)', calories: 250, substitutions: ['250g Batata', '200g Macarrão', '200g Mandioca'] },
          { name: 'Feijão', quantity: '1 concha cheia (140g)', calories: 120, substitutions: ['Lentilha', 'Grão de Bico', 'Feijão Branco'] },
          { name: 'Carne/Frango', quantity: '150g (1 filé grande)', calories: 260, substitutions: ['Peixe Grelhado', 'Lombo Suíno', 'Carne Seca'] },
          { name: 'Azeite', quantity: '1 col. sobremesa (5ml)', calories: 45, substitutions: ['Abacate na salada', 'Sementes', '5 azeitonas'] }
        ]
      },
      {
        id: '3', name: 'Pré-Treino', time: '16:00',
        items: [
          { name: 'Banana + Aveia + Mel', quantity: '1 banana + 2 col. aveia', calories: 200, substitutions: ['2 fatias Pão + Geleia', 'Açaí pequeno', 'Batata Doce + Frango'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Batata Inglesa', quantity: '250g (2 médias)', calories: 220, substitutions: ['Arroz (150g)', 'Macarrão (150g)', 'Aipim (150g)'] },
          { name: 'Carne Magra', quantity: '150g (1 filé grande)', calories: 250, substitutions: ['Frango Grelhado', '3 Ovos', 'Peixe'] },
          { name: 'Legumes', quantity: '1 xícara (100g)', calories: 50, substitutions: ['Salada Variada', 'Couve refogada'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '23:00',
        items: [
          { name: 'Iogurte ou Leite', quantity: '1 porção (200ml)', calories: 100, substitutions: ['Whey Protein', 'Queijo Cottage', '2 claras de ovo'] }
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
          { name: 'Pão Francês', quantity: '3 unidades (150g)', calories: 400, substitutions: ['6 fatias Pão de Forma', '120g Tapioca', '300g Cuscuz'] },
          { name: 'Suco de Uva Integral', quantity: '1 copo (300ml)', calories: 180, substitutions: ['Suco de Laranja', '2 Bananas', '400ml Leite Integral'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:00',
        items: [
          { name: 'Arroz Branco', quantity: '300g (2 escumadeiras)', calories: 380, substitutions: ['400g Batata', '300g Macarrão', '300g Mandioca'] },
          { name: 'Feijão', quantity: '2 conchas (200g)', calories: 180, substitutions: ['Lentilha', 'Grão de Bico', 'Feijão Tropeiro (cuidado gordura)'] },
          { name: 'Carne Vermelha Magra', quantity: '150g (1 bife grande)', calories: 280, substitutions: ['Coxa/Sobrecoxa Frango', 'Salmão', 'Bisteca Suína'] },
          { name: 'Azeite', quantity: '1 col. sopa (13ml)', calories: 90, substitutions: ['Abacate', 'Nozes', 'Manteiga'] },
          { name: 'Salada', quantity: 'à vontade', calories: 30, substitutions: ['Legumes cozidos', 'Vinagrete'] }
        ]
      },
      {
        id: '3', name: 'Pré-Treino', time: '16:00',
        items: [
          { name: 'Banana Prata', quantity: '3 unidades', calories: 210, substitutions: ['400ml Açaí', '150g Hipercalórico', '300g Batata Doce'] },
          { name: 'Aveia em Flocos', quantity: '4 col. sopa (60g)', calories: 120, substitutions: ['Granola', 'Farinha de Arroz', 'Pasta de Amendoim'] },
          { name: 'Mel', quantity: '2 col. sopa', calories: 120, substitutions: ['Doce de Leite', 'Geleia', 'Melaço'] }
        ]
      },
      {
        id: '4', name: 'Pós-Treino', time: '18:00',
        items: [
          { name: 'Whey Protein', quantity: '2 scoops (60g)', calories: 240, substitutions: ['Albumina', '150g Frango', '6 Claras de Ovo'] },
          { name: 'Maltodextrina/Dextrose', quantity: '40g', calories: 160, substitutions: ['2 Bananas', 'Pão Branco (2 fatias)', 'Suco de Uva'] }
        ]
      },
      {
        id: '5', name: 'Jantar', time: '21:00',
        items: [
          { name: 'Macarrão Cozido', quantity: '250g (Prato fundo)', calories: 350, substitutions: ['300g Batata', '200g Arroz', 'Purê de Batata (300g)'] },
          { name: 'Frango Grelhado', quantity: '150g', calories: 240, substitutions: ['Carne Moída', 'Peixe', 'Omelete de 3 ovos'] },
          { name: 'Azeite', quantity: '1 col. sobremesa', calories: 45, substitutions: ['Manteiga', 'Gema de ovo extra', 'Queijo Ralado'] }
        ]
      },
      {
        id: '6', name: 'Ceia', time: '23:00',
        items: [
          { name: 'Pasta de Amendoim', quantity: '2 col. sopa (30g)', calories: 180, substitutions: ['Abacate', 'Mix de Castanhas', 'Coco Seco'] },
          { name: 'Iogurte Natural', quantity: '1 pote (170g)', calories: 100, substitutions: ['Leite', 'Kefir'] }
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
          { name: 'Chá de Camomila', quantity: '1 xícara (200ml)', calories: 0, substitutions: ['Chá de Erva Doce', 'Leite Desnatado (se tolerar)', 'Água de Coco'] },
          { name: 'Torradas (Pão Francês amanhecido/tostado)', quantity: '2 fatias (50g)', calories: 120, substitutions: ['Biscoito de Arroz', 'Bolacha de Água e Sal', 'Pão Sírio Tostado'] },
          { name: 'Queijo Branco Magro (Cottage/Ricota)', quantity: '2 col. sopa (30g)', calories: 60, substitutions: ['Ovo cozido (bem cozido)', 'Requeijão Light', 'Peito de Peru'] },
          { name: 'Mamão Papaia', quantity: '1/2 unidade (140g)', calories: 60, substitutions: ['Banana Prata', 'Maçã cozida sem casca', 'Pera cozida'] }
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
          { name: 'Arroz Branco (Bem cozido)', quantity: '4 col. sopa (100g)', calories: 110, substitutions: ['Purê de Batata', 'Macarrão bem cozido', 'Polenta mole'] },
          { name: 'Frango Desfiado ou Grelhado', quantity: '120g (1 filé)', calories: 190, substitutions: ['Peixe Assado', 'Carne Moída magra', 'Omelete não frito'] },
          { name: 'Cenoura e Chuchu Cozidos', quantity: '1 prato sobremesa (150g)', calories: 50, substitutions: ['Abobrinha cozida', 'Beterraba cozida', 'Abóbora'] },
          { name: 'Caldo de Feijão (Apenas o caldo)', quantity: '1 concha', calories: 40, substitutions: ['Lentilha peneirada', 'Não consumir grãos inteiros', 'Creme de legumes'] }
        ]
      },
      {
        id: '4', name: 'Lanche da Tarde', time: '16:00',
        items: [
          { name: 'Biscoito de Arroz ou Maria', quantity: '4 unidades', calories: 100, substitutions: ['Torrada', 'Banana amassada com aveia', 'Gelatina'] },
          { name: 'Água de Coco', quantity: '1 copo (200ml)', calories: 40, substitutions: ['Chá de Espinheira Santa', 'Suco de Melão', 'Suco de Pera'] }
        ]
      },
      {
        id: '5', name: 'Jantar (Leve - 3h antes de dormir)', time: '19:30',
        items: [
          { name: 'Sopa de Legumes com Frango', quantity: '1 prato fundo (300ml)', calories: 200, substitutions: ['Creme de Abóbora com Frango', 'Peixe grelhado com Purê', 'Canja de Galinha'] },
          { name: 'Torrada', quantity: '1 unidade', calories: 35, substitutions: ['1 col. de arroz bem cozido', '1 batata pequena'] }
        ]
      },
      {
        id: '6', name: 'Ceia', time: '22:00',
        items: [
          { name: 'Chá de Erva Doce', quantity: '1 xícara', calories: 0, substitutions: ['Chá de Camomila'] }
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
          { name: 'Peixe ou Frango', quantity: '120g (1 filé grande)', calories: 180, substitutions: ['Sardinha', 'Carne Magra', 'Ovos'] },
          { name: 'Arroz Integral', quantity: '3 col. sopa (75g)', calories: 75, substitutions: ['Quinoa', 'Grão de Bico', 'Batata Doce'] },
          { name: 'Brócolis e Couve-flor', quantity: '1 xícara (100g)', calories: 40, substitutions: ['Couve de Bruxelas', 'Repolho', 'Alcachofra'] },
          { name: 'Azeite de Oliva', quantity: '1 col. sobremesa (5ml)', calories: 45, substitutions: ['Óleo de Abacate', 'Sementes de girassol', 'Nozes'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Iogurte Natural', quantity: '1 pote (160g)', calories: 70, substitutions: ['Kefir', 'Coalhada Seca', 'Leite fermentado'] },
          { name: 'Sementes de Chia', quantity: '1 col. sopa (10g)', calories: 55, substitutions: ['Linhaça', 'Nozes', 'Castanhas'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Omelete de Espinafre', quantity: '2 ovos', calories: 180, substitutions: ['Tofu grelhado', 'Frango desfiado', 'Sopa de Legumes'] },
          { name: 'Salada de Tomate', quantity: '1 pires', calories: 30, substitutions: ['Pepino', 'Vagem', 'Abobrinha'] },
          { name: 'Abacate', quantity: '2 col. sopa (40g)', calories: 60, substitutions: ['Azeite', 'Coco seco', 'Castanhas'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:00',
        items: [
          { name: 'Chá de Boldo ou Alcachofra', quantity: '1 xícara', calories: 0, substitutions: ['Água com limão'] }
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
          { name: 'Mingau de Aveia com Frutas', quantity: '1 bowl pequeno', calories: 250, substitutions: ['Iogurte com Granola', 'Pão sem Glúten com Ovo', 'Tapioca com Chia'] },
          { name: 'Castanha do Pará (Selênio)', quantity: '2 unidades', calories: 60, substitutions: ['Nozes', 'Amêndoas', 'Semente de Girassol'] }
        ]
      },
      {
        id: '2', name: 'Almoço', time: '12:30',
        items: [
          { name: 'Peixe (Iodo)', quantity: '120g (1 filé)', calories: 180, substitutions: ['Frango', 'Carne Magra', 'Ovos'] },
          { name: 'Quinoa ou Arroz Integral', quantity: '4 col. sopa (100g)', calories: 100, substitutions: ['Batata Doce', 'Mandioca', 'Arroz Negro'] },
          { name: 'Cenoura e Vagem Cozidos', quantity: '1 pires (100g)', calories: 50, substitutions: ['Abobrinha', 'Chuchu', 'Beterraba'] },
          { name: 'Feijão', quantity: '1 concha (100g)', calories: 90, substitutions: ['Lentilha', 'Grão de Bico', 'Ervilha'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sementes de Abóbora (Zinco)', quantity: '1 col. sopa (10g)', calories: 50, substitutions: ['Sementes de Girassol', 'Pasta de Amendoim', 'Castanhas'] },
          { name: 'Fruta Cítrica (Kiwi/Laranja)', quantity: '1 unidade', calories: 60, substitutions: ['Morango', 'Goiaba', 'Tangerina'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Frango Grelhado', quantity: '100g (1 filé médio)', calories: 165, substitutions: ['Peixe', 'Omelete', 'Tofu'] },
          { name: 'Purê de Abóbora', quantity: '3 col. sopa (90g)', calories: 80, substitutions: ['Batata Baroa', 'Inhame', 'Mandioca'] },
          { name: 'Couve Refogada (Cozida!)', quantity: '1 pires', calories: 60, substitutions: ['Espinafre cozido', 'Acelga refogada', 'Brócolis cozido'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:00',
        items: [
          { name: 'Kiwi', quantity: '1 unidade', calories: 45, substitutions: ['Morangos', 'Ameixa'] }
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
          { name: 'Peito de Frango Grelhado', quantity: '120g (1 filé grande)', calories: 195, substitutions: ['Carne Bovina', 'Peixe Gordo', 'Porco'] },
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
          { name: 'Abacate', quantity: '2 col. sopa (40g)', calories: 60, substitutions: ['Castanhas', 'Azeite', 'Coco'] }
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
          { name: 'Arroz Integral', quantity: '4 col. sopa (100g)', calories: 100, substitutions: ['Quinoa', 'Milho', 'Trigo em grão'] },
          { name: 'Feijão Carioca', quantity: '1 concha (100g)', calories: 90, substitutions: ['Soja', 'Lentilha', 'Grão de Bico'] },
          { name: 'Peixe Grelhado (Tilápia/Sardinha)', quantity: '120g (1 filé grande)', calories: 150, substitutions: ['Peito de Frango', 'Atum', 'Claras de ovo'] },
          { name: 'Cenoura e Vagem cozidos', quantity: '1 pires (100g)', calories: 45, substitutions: ['Berinjela e Abobrinha', 'Beterraba crua', 'Quiabo'] },
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
      },
      {
        id: '5', name: 'Ceia', time: '22:00',
        items: [
          { name: 'Chá Verde (se tolerar) ou Hibisco', quantity: '1 xícara', calories: 0, substitutions: ['Chá de Casca de Abacaxi'] },
          { name: 'Abacate', quantity: '1 col. sopa (20g)', calories: 40, substitutions: ['1 noz', '2 amêndoas'] }
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
          { name: 'Carne Bovina (Patinho/Músculo)', quantity: '120g (1 bife médio)', calories: 220, substitutions: ['Fígado bovino (1x semana)', 'Sobrecoxa de frango', 'Moela'] },
          { name: 'Feijão Preto (com caldo)', quantity: '1 concha e meia', calories: 140, substitutions: ['Lentilha', 'Feijão Carioca', 'Feijão Branco'] },
          { name: 'Arroz Branco ou Integral', quantity: '4 col. sopa (100g)', calories: 110, substitutions: ['Batata', 'Mandioca', 'Macarrão'] },
          { name: 'Couve Refogada', quantity: '3 col. sopa (70g)', calories: 50, substitutions: ['Espinafre', 'Brócolis', 'Agrião'] },
          { name: 'Abacaxi (sobremesa - Vitamina C)', quantity: '2 fatias', calories: 80, substitutions: ['Laranja', 'Tangerina', 'Morango'] }
        ]
      },
      {
        id: '3', name: 'Lanche', time: '16:00',
        items: [
          { name: 'Sanduíche de Pasta de Homus', quantity: '1 und', calories: 200, substitutions: ['Pão com Ovo', 'Iogurte com Aveia', 'Vitamina'] },
          { name: 'Suco de Acerola', quantity: '1 copo (200ml)', calories: 60, substitutions: ['Suco de Caju', 'Goiaba', 'Laranja'] }
        ]
      },
      {
        id: '4', name: 'Jantar', time: '20:00',
        items: [
          { name: 'Iscas de Fígado Acebolado (1x semana) ou Frango', quantity: '100g', calories: 180, substitutions: ['Carne Moída', 'Omelete com Espinafre', 'Peixe'] },
          { name: 'Purê de Abóbora', quantity: '3 col. servir (150g)', calories: 120, substitutions: ['Batata Doce', 'Inhame', 'Mandioca'] },
          { name: 'Lentilha Cozida', quantity: '3 col. sopa (75g)', calories: 80, substitutions: ['Feijão', 'Grão de Bico', 'Ervilha'] },
          { name: 'Mexerica (sobremesa)', quantity: '1 unidade', calories: 50, substitutions: ['Kiwi', 'Manga', 'Goiaba'] }
        ]
      },
      {
        id: '5', name: 'Ceia', time: '22:00',
        items: [
          { name: 'Ameixa Seca', quantity: '3 unidades', calories: 60, substitutions: ['Damasco', 'Uva Passa'] }
        ]
      }
    ]
  }
];
