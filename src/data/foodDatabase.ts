
export interface Measure {
  label: string;
  amount: number; // Quantidade na unidade base (g ou ml)
}

export interface FoodDbItem {
  name: string;
  qty: string; // Texto display padrão
  baseQty: number; // Quantidade numérica base para o cálculo (ex: 100)
  baseUnit: string; // Unidade (g, ml, un)
  kcal: number; // Calorias referentes à baseQty
  protein: number;
  carbs: number;
  fats: number;
  measures?: Measure[]; // Opções de medidas caseiras
}

export interface FoodCategory {
  id: string;
  name: string;
  items: FoodDbItem[];
}

export interface Macros {
  protein: number;
  carbs: number;
  fats: number;
}

// Helper para gerar medidas genéricas se não houver específicas
const getGenericMeasures = (baseQty: number, unit: string): Measure[] => {
  if (unit === 'g' || unit === 'ml') {
    return [
      { label: `Meia porção (${baseQty/2}${unit})`, amount: baseQty / 2 },
      { label: `Porção padrão (${baseQty}${unit})`, amount: baseQty },
      { label: `Porção grande (${baseQty * 1.5}${unit})`, amount: baseQty * 1.5 },
      { label: `Porção dupla (${baseQty * 2}${unit})`, amount: baseQty * 2 },
    ];
  }
  return [
    { label: '1/2 unidade', amount: 0.5 },
    { label: '1 unidade', amount: 1 },
    { label: '2 unidades', amount: 2 }
  ];
};

export const FoodDatabase: FoodCategory[] = [
  {
    id: 'beverage',
    name: 'Bebidas, Cafés & Sucos',
    items: [
      { 
        name: 'Café Preto (Sem açúcar)', qty: '100ml', baseQty: 100, baseUnit: 'ml', kcal: 2, protein: 0.0, carbs: 0.3, fats: 0.0,
        measures: [
          { label: '1 xícara café (50ml)', amount: 50 },
          { label: '1 xícara chá (150ml)', amount: 150 },
          { label: '1 caneca (250ml)', amount: 250 }
        ]
      },
      { 
        name: 'Café com Açúcar (Padrão)', qty: '50ml', baseQty: 50, baseUnit: 'ml', kcal: 25, protein: 0.0, carbs: 6.0, fats: 0.0,
        measures: [
          { label: '1 xícara café (50ml)', amount: 50 },
          { label: '1 copo americano (150ml)', amount: 150 }
        ]
      },
      { 
        name: 'Café com Leite (Sem açúcar)', qty: '150ml', baseQty: 150, baseUnit: 'ml', kcal: 65, protein: 3.5, carbs: 5.0, fats: 3.5,
        measures: [
          { label: '1 xícara chá (150ml)', amount: 150 },
          { label: '1 copo americano (200ml)', amount: 200 }
        ]
      },
      { 
        name: 'Suco de Laranja (Natural)', qty: '200ml', baseQty: 200, baseUnit: 'ml', kcal: 90, protein: 1.5, carbs: 21.0, fats: 0.4,
        measures: [
          { label: '1 copo pequeno (150ml)', amount: 150 },
          { label: '1 copo médio (200ml)', amount: 200 },
          { label: '1 copo grande (300ml)', amount: 300 }
        ]
      },
      { 
        name: 'Suco de Uva Integral', qty: '200ml', baseQty: 200, baseUnit: 'ml', kcal: 120, protein: 1.0, carbs: 30.0, fats: 0.0,
        measures: [
          { label: '1 copo médio (200ml)', amount: 200 },
          { label: '1 taça (150ml)', amount: 150 }
        ]
      },
      { 
        name: 'Suco Verde (Detox)', qty: '200ml', baseQty: 200, baseUnit: 'ml', kcal: 60, protein: 1.0, carbs: 10.0, fats: 0.0,
        measures: [
          { label: '1 copo (200ml)', amount: 200 },
          { label: '1 copo grande (300ml)', amount: 300 }
        ]
      },
      { 
        name: 'Água de Coco', qty: '200ml', baseQty: 200, baseUnit: 'ml', kcal: 40, protein: 0.0, carbs: 10.0, fats: 0.0,
        measures: [
          { label: '1 copo (200ml)', amount: 200 },
          { label: '1 garrafinha (330ml)', amount: 330 },
          { label: '1 coco inteiro (400ml)', amount: 400 }
        ]
      },
      { 
        name: 'Chá (Ervas/Infusão)', qty: '200ml', baseQty: 200, baseUnit: 'ml', kcal: 0, protein: 0.0, carbs: 0.0, fats: 0.0,
        measures: [
          { label: '1 xícara (200ml)', amount: 200 },
          { label: '1 caneca (300ml)', amount: 300 }
        ]
      }
    ]
  },
  {
    id: 'bakery',
    name: 'Pães, Biscoitos & Matinais',
    items: [
      { name: 'Pão Francês', qty: '50g (1 unidade)', baseQty: 50, baseUnit: 'g', kcal: 135, protein: 4.7, carbs: 28.5, fats: 0.5,
        measures: [
            { label: '1/2 unidade (25g)', amount: 25 },
            { label: '1 unidade (50g)', amount: 50 },
            { label: '1 e 1/2 unidade (75g)', amount: 75 },
            { label: '2 unidades (100g)', amount: 100 }
        ]
      },
      { name: 'Pão de Forma Integral', qty: '50g (2 fatias)', baseQty: 50, baseUnit: 'g', kcal: 120, protein: 6.0, carbs: 22.0, fats: 1.5,
         measures: [
            { label: '1 fatia (25g)', amount: 25 },
            { label: '2 fatias (50g)', amount: 50 },
            { label: '3 fatias (75g)', amount: 75 },
            { label: '4 fatias (100g)', amount: 100 }
        ]
      },
      { name: 'Pão Sírio / Rap10', qty: '50g (1 unidade)', baseQty: 50, baseUnit: 'g', kcal: 140, protein: 4.5, carbs: 29.0, fats: 1.0,
        measures: [
            { label: '1 unidade (50g)', amount: 50 },
            { label: '2 unidades (100g)', amount: 100 }
        ]
      },
      { name: 'Pão de Queijo', qty: '50g (1 unidade média)', baseQty: 50, baseUnit: 'g', kcal: 180, protein: 3.0, carbs: 15.0, fats: 12.0,
        measures: [
            { label: '1 unidade pequena/coquetel (20g)', amount: 20 },
            { label: '1 unidade média (50g)', amount: 50 },
            { label: '1 unidade grande (80g)', amount: 80 }
        ]
      },
      { name: 'Torrada Industrializada', qty: '30g (3 unidades)', baseQty: 30, baseUnit: 'g', kcal: 110, protein: 3.5, carbs: 20.0, fats: 2.0,
        measures: [
            { label: '1 unidade (10g)', amount: 10 },
            { label: '2 unidades (20g)', amount: 20 },
            { label: '3 unidades (30g)', amount: 30 },
            { label: '4 unidades (40g)', amount: 40 }
        ]
      },
      { name: 'Biscoito Cream Cracker', qty: '30g (5 unidades)', baseQty: 30, baseUnit: 'g', kcal: 130, protein: 3.0, carbs: 20.0, fats: 4.5,
        measures: [
            { label: '1 unidade (6g)', amount: 6 },
            { label: '3 unidades (18g)', amount: 18 },
            { label: '5 unidades (30g)', amount: 30 }
        ]
      },
      { name: 'Biscoito Maisena', qty: '30g (6 unidades)', baseQty: 30, baseUnit: 'g', kcal: 130, protein: 2.5, carbs: 22.0, fats: 3.5,
        measures: [
            { label: '1 unidade (5g)', amount: 5 },
            { label: '6 unidades (30g)', amount: 30 }
        ]
      },
      { name: 'Biscoito de Arroz', qty: '30g (3 unidades)', baseQty: 30, baseUnit: 'g', kcal: 110, protein: 2.0, carbs: 24.0, fats: 0.5,
        measures: [
            { label: '1 unidade (10g)', amount: 10 },
            { label: '2 unidades (20g)', amount: 20 },
            { label: '3 unidades (30g)', amount: 30 }
        ]
      },
      { name: 'Bolo Simples (Fubá/Laranja)', qty: '60g (1 fatia)', baseQty: 60, baseUnit: 'g', kcal: 200, protein: 3.0, carbs: 32.0, fats: 7.0,
        measures: [
            { label: '1 fatia fina (40g)', amount: 40 },
            { label: '1 fatia média (60g)', amount: 60 },
            { label: '1 fatia grossa (100g)', amount: 100 }
        ]
      }
    ]
  },
  {
    id: 'carb',
    name: 'Cereais, Raízes & Tubérculos',
    items: [
      { 
        name: 'Arroz Branco Cozido', qty: '100g (4 col. sopa)', baseQty: 100, baseUnit: 'g', kcal: 128, protein: 2.5, carbs: 28.1, fats: 0.2,
        measures: [
          { label: '2 col. sopa (50g)', amount: 50 },
          { label: '4 col. sopa (100g)', amount: 100 },
          { label: '6 col. sopa cheias (150g)', amount: 150 },
          { label: '8 col. sopa cheias (200g)', amount: 200 },
          { label: '1 escumadeira cheia (150g)', amount: 150 },
          { label: '300g (Extra)', amount: 300 }
        ]
      },
      { 
        name: 'Arroz Integral Cozido', qty: '100g (4 col. sopa)', baseQty: 100, baseUnit: 'g', kcal: 124, protein: 2.6, carbs: 25.8, fats: 1.0,
        measures: [
          { label: '2 col. sopa (50g)', amount: 50 },
          { label: '4 col. sopa (100g)', amount: 100 },
          { label: '6 col. sopa cheias (150g)', amount: 150 },
          { label: '8 col. sopa cheias (200g)', amount: 200 },
          { label: '1 escumadeira (150g)', amount: 150 }
        ]
      },
      { name: 'Batata Inglesa Cozida', qty: '100g (1/2 média)', baseQty: 100, baseUnit: 'g', kcal: 86, protein: 1.7, carbs: 20.1, fats: 0.1,
        measures: [
          { label: '1/2 unidade média (100g)', amount: 100 },
          { label: '1 unidade pequena (80g)', amount: 80 },
          { label: '1 unidade média (150g)', amount: 150 },
          { label: '2 unidades médias (300g)', amount: 300 }
        ]
      },
      { name: 'Batata Inglesa Assada/Airfryer', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 110, protein: 2.0, carbs: 25.0, fats: 0.5,
        measures: [
          { label: '100g', amount: 100 },
          { label: '150g', amount: 150 },
          { label: '200g', amount: 200 }
        ]
      },
      { name: 'Purê de Batata', qty: '100g (2 col. servir)', baseQty: 100, baseUnit: 'g', kcal: 110, protein: 2.0, carbs: 17.0, fats: 4.0,
        measures: [
          { label: '1 col. servir (50g)', amount: 50 },
          { label: '2 col. servir (100g)', amount: 100 },
          { label: '3 col. servir (150g)', amount: 150 },
          { label: '4 col. servir (200g)', amount: 200 }
        ]
      },
      { name: 'Batata Doce Cozida', qty: '100g (1 pequena)', baseQty: 100, baseUnit: 'g', kcal: 112, protein: 2.0, carbs: 26.0, fats: 0.1,
        measures: [
            { label: '1 fatia média (50g)', amount: 50 },
            { label: '1 unidade pequena (100g)', amount: 100 },
            { label: '1 unidade média (150g)', amount: 150 },
            { label: '200g', amount: 200 }
        ]
      },
      { name: 'Batata Baroa (Mandioquinha)', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 80, protein: 0.9, carbs: 18.9, fats: 0.2,
        measures: [
            { label: '2 col. sopa (60g)', amount: 60 },
            { label: '4 col. sopa (120g)', amount: 120 },
            { label: '6 col. sopa (180g)', amount: 180 },
            { label: '100g', amount: 100 }
        ]
      },
      { name: 'Inhame Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 118, protein: 1.5, carbs: 27.0, fats: 0.2,
        measures: [
            { label: '1 unidade pequena (80g)', amount: 80 },
            { label: '2 col. sopa cheias (100g)', amount: 100 },
            { label: '4 col. sopa cheias (200g)', amount: 200 }
        ]
      },
      { name: 'Mandioca / Aipim Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 125, protein: 0.6, carbs: 30.0, fats: 0.3,
        measures: [
            { label: '1 pedaço pequeno (50g)', amount: 50 },
            { label: '2 pedaços / 100g', amount: 100 },
            { label: '3 pedaços / 150g', amount: 150 }
        ]
      },
      { name: 'Macarrão Cozido (Semola)', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 157, protein: 5.8, carbs: 30.0, fats: 0.9,
        measures: [
            { label: '1 pegador (80g)', amount: 80 },
            { label: '1 e 1/2 pegador (120g)', amount: 120 },
            { label: '1 prato raso (180g)', amount: 180 },
            { label: '2 pegadores (160g)', amount: 160 },
            { label: '250g (Prato fundo)', amount: 250 }
        ]
      },
      { name: 'Macarrão Integral Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 124, protein: 5.3, carbs: 26.5, fats: 0.6,
        measures: [
            { label: '1 pegador (80g)', amount: 80 },
            { label: '1 prato raso (180g)', amount: 180 },
            { label: '250g', amount: 250 }
        ]
      },
      { name: 'Aveia em Flocos', qty: '30g (2 col. sopa)', baseQty: 30, baseUnit: 'g', kcal: 115, protein: 4.3, carbs: 17.0, fats: 2.2,
        measures: [
            { label: '1 col. sopa (15g)', amount: 15 },
            { label: '2 col. sopa (30g)', amount: 30 },
            { label: '3 col. sopa (45g)', amount: 45 },
            { label: '4 col. sopa (60g)', amount: 60 },
            { label: '6 col. sopa (90g)', amount: 90 },
            { label: '8 col. sopa (120g)', amount: 120 }
        ]
      },
      { name: 'Granola (Média)', qty: '40g (1/2 xícara)', baseQty: 40, baseUnit: 'g', kcal: 160, protein: 4.0, carbs: 28.0, fats: 4.0,
        measures: [
            { label: '1 col. sopa (15g)', amount: 15 },
            { label: '2 col. sopa (30g)', amount: 30 },
            { label: '3 col. sopa (45g)', amount: 45 },
            { label: '4 col. sopa (60g)', amount: 60 },
            { label: '1/2 xícara (40g)', amount: 40 }
        ]
      },
      { name: 'Tapioca (Goma)', qty: '40g (2 col. sopa)', baseQty: 40, baseUnit: 'g', kcal: 98, protein: 0.0, carbs: 24.0, fats: 0.0,
        measures: [
            { label: '1 col. sopa (20g)', amount: 20 },
            { label: '2 col. sopa (40g)', amount: 40 },
            { label: '3 col. sopa (60g)', amount: 60 },
            { label: '4 col. sopa (80g)', amount: 80 }
        ]
      },
      { name: 'Cuscuz de Milho', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 112, protein: 2.2, carbs: 25.3, fats: 0.7,
        measures: [
            { label: '1 fatia pequena (50g)', amount: 50 },
            { label: '1 fatia média (100g)', amount: 100 },
            { label: '1 prato sobremesa (150g)', amount: 150 },
            { label: '1 prato fundo (250g)', amount: 250 }
        ]
      },
      { name: 'Milho Verde (Lata)', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 80, protein: 3.0, carbs: 17.0, fats: 1.0,
        measures: [
            { label: '1 col. sopa (20g)', amount: 20 },
            { label: '3 col. sopa (60g)', amount: 60 },
            { label: '5 col. sopa (100g)', amount: 100 },
            { label: '8 col. sopa (160g)', amount: 160 }
        ]
      },
      { name: 'Farinha de Mandioca', qty: '30g (2 col. sopa)', baseQty: 30, baseUnit: 'g', kcal: 100, protein: 0.5, carbs: 25.0, fats: 0.0,
        measures: [
            { label: '1 col. sopa rasa (15g)', amount: 15 },
            { label: '1 col. sopa cheia (20g)', amount: 20 },
            { label: '2 col. sopa (30g)', amount: 30 },
            { label: '3 col. sopa (45g)', amount: 45 },
            { label: '4 col. sopa (60g)', amount: 60 }
        ]
      },
      { name: 'Pipoca (Estourada s/ óleo)', qty: '20g (2 xíc)', baseQty: 20, baseUnit: 'g', kcal: 78, protein: 2.4, carbs: 15.0, fats: 0.8,
        measures: [
            { label: '1 xícara chá (10g)', amount: 10 },
            { label: '2 xícaras chá (20g)', amount: 20 },
            { label: '1 saco pipoca cinema (50g)', amount: 50 }
        ]
      }
    ]
  },
  {
    id: 'prot',
    name: 'Carnes, Ovos & Peixes',
    items: [
      { name: 'Peito de Frango Grelhado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 165, protein: 31.0, carbs: 0.0, fats: 3.6,
        measures: [
            { label: '2 col. sopa picado (50g)', amount: 50 },
            { label: '1 filé pequeno (80g)', amount: 80 },
            { label: '1 filé médio (100g)', amount: 100 },
            { label: '1 filé grande (150g)', amount: 150 },
            { label: '200g (Porção Grande)', amount: 200 }
        ]
      },
      { name: 'Peito de Frango Desfiado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 160, protein: 30.0, carbs: 0.0, fats: 3.2,
        measures: [
            { label: '2 col. sopa (50g)', amount: 50 },
            { label: '4 col. sopa (100g)', amount: 100 },
            { label: '6 col. sopa (150g)', amount: 150 },
            { label: '8 col. sopa (200g)', amount: 200 }
        ]
      },
      { name: 'Sobrecoxa de Frango Assada', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 230, protein: 24.0, carbs: 0.0, fats: 14.0,
        measures: [
            { label: '1 unidade pequena (80g)', amount: 80 },
            { label: '1 unidade média (120g)', amount: 120 }
        ]
      },
      { name: 'Patinho Moído (Cozido)', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 220, protein: 32.0, carbs: 0.0, fats: 9.0,
        measures: [
            { label: '2 col. sopa (50g)', amount: 50 },
            { label: '4 col. sopa (100g)', amount: 100 },
            { label: '6 col. sopa (150g)', amount: 150 },
            { label: '8 col. sopa (200g)', amount: 200 },
            { label: '1 concha média (150g)', amount: 150 }
        ]
      },
      { name: 'Alcatra Grelhada (s/ gordura)', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 200, protein: 30.0, carbs: 0.0, fats: 8.0,
        measures: [
            { label: '1 bife pequeno (80g)', amount: 80 },
            { label: '1 bife médio (120g)', amount: 120 },
            { label: '1 bife grande (150g)', amount: 150 }
        ]
      },
      { name: 'Músculo Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 195, protein: 31.0, carbs: 0.0, fats: 7.0,
        measures: [
            { label: '3 pedaços médios (100g)', amount: 100 }
        ]
      },
      { name: 'Lombo Suíno Assado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 210, protein: 28.0, carbs: 0.0, fats: 10.0,
        measures: [
            { label: '1 fatia (50g)', amount: 50 },
            { label: '2 fatias (100g)', amount: 100 }
        ]
      },
      { name: 'Carne Seca (Cozida)', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 180, protein: 30.0, carbs: 0.0, fats: 5.0,
        measures: [
            { label: '2 col. sopa (50g)', amount: 50 },
            { label: '4 col. sopa (100g)', amount: 100 },
            { label: '6 col. sopa (150g)', amount: 150 }
        ]
      },
      { name: 'Fígado Bovino Grelhado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 220, protein: 29.0, carbs: 4.0, fats: 9.0,
        measures: [
            { label: '1 bife pequeno (80g)', amount: 80 },
            { label: '1 bife médio (120g)', amount: 120 }
        ]
      },
      { name: 'Filé de Tilápia Grelhado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 120, protein: 24.0, carbs: 0.0, fats: 2.5,
        measures: [
            { label: '1 filé pequeno (80g)', amount: 80 },
            { label: '1 filé médio (120g)', amount: 120 },
            { label: '1 filé grande (150g)', amount: 150 },
            { label: '2 filés (200g)', amount: 200 }
        ]
      },
      { name: 'Salmão Grelhado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 200, protein: 22.0, carbs: 0.0, fats: 12.0,
        measures: [
            { label: '1 posta pequena (100g)', amount: 100 },
            { label: '1 posta média (150g)', amount: 150 }
        ]
      },
      { name: 'Atum (Lata em água)', qty: '60g (1/2 lata)', baseQty: 60, baseUnit: 'g', kcal: 70, protein: 16.0, carbs: 0.0, fats: 0.5,
        measures: [
            { label: '1 col. sopa (20g)', amount: 20 },
            { label: '1/2 lata (60g)', amount: 60 },
            { label: '1 lata inteira (120g)', amount: 120 }
        ]
      },
      { name: 'Sardinha (Lata)', qty: '60g (2 un)', baseQty: 60, baseUnit: 'g', kcal: 90, protein: 12.0, carbs: 0.0, fats: 4.0,
        measures: [
            { label: '1 unidade (30g)', amount: 30 },
            { label: '2 unidades (60g)', amount: 60 },
            { label: '1 lata (120g)', amount: 120 }
        ]
      },
      { name: 'Camarão Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 90, protein: 20.0, carbs: 0.0, fats: 1.0,
        measures: [
            { label: '10 unidades pequenas', amount: 50 },
            { label: '1 porção média', amount: 100 },
            { label: '1 porção grande', amount: 200 }
        ]
      },
      { name: 'Ovo de Galinha Cozido', qty: '50g (1 unidade)', baseQty: 50, baseUnit: 'g', kcal: 78, protein: 6.3, carbs: 0.6, fats: 5.3,
        measures: [
            { label: '1 unidade', amount: 50 },
            { label: '2 unidades', amount: 100 },
            { label: '3 unidades', amount: 150 },
            { label: '4 unidades', amount: 200 },
            { label: '5 unidades', amount: 250 },
            { label: '6 unidades', amount: 300 }
        ]
      },
      { name: 'Ovo Frito/Mexido (Azeite)', qty: '50g (1 unidade)', baseQty: 50, baseUnit: 'g', kcal: 95, protein: 6.3, carbs: 0.6, fats: 7.5,
        measures: [
            { label: '1 unidade', amount: 50 },
            { label: '2 unidades', amount: 100 },
            { label: '3 unidades', amount: 150 },
            { label: '4 unidades', amount: 200 }
        ]
      },
      { name: 'Clara de Ovo Cozida', qty: '35g (1 unidade)', baseQty: 35, baseUnit: 'g', kcal: 17, protein: 3.6, carbs: 0.2, fats: 0.1,
        measures: [
            { label: '1 clara', amount: 35 },
            { label: '2 claras', amount: 70 },
            { label: '3 claras', amount: 105 },
            { label: '4 claras', amount: 140 },
            { label: '6 claras', amount: 210 },
            { label: 'Pasteurizada (100ml)', amount: 100 }
        ]
      },
      { name: 'Whey Protein (Concentrado)', qty: '30g', baseQty: 30, baseUnit: 'g', kcal: 120, protein: 24.0, carbs: 3.0, fats: 1.5,
        measures: [
            { label: '1/2 scoop (15g)', amount: 15 },
            { label: '1 scoop (30g)', amount: 30 },
            { label: '1.5 scoops (45g)', amount: 45 },
            { label: '2 scoops (60g)', amount: 60 }
        ]
      }
    ]
  },
  {
    id: 'leg',
    name: 'Leguminosas',
    items: [
      { name: 'Feijão Carioca Cozido', qty: '100g (1 concha)', baseQty: 100, baseUnit: 'g', kcal: 76, protein: 4.8, carbs: 13.6, fats: 0.5,
        measures: [
            { label: '2 col. sopa (40g)', amount: 40 },
            { label: '4 col. sopa (80g)', amount: 80 },
            { label: '6 col. sopa (120g)', amount: 120 },
            { label: '8 col. sopa (160g)', amount: 160 },
            { label: '1/2 concha (50g)', amount: 50 },
            { label: '1 concha média (100g)', amount: 100 },
            { label: '1 concha grande (150g)', amount: 150 },
            { label: '2 conchas (200g)', amount: 200 }
        ]
      },
      { name: 'Feijão Preto Cozido', qty: '100g (1 concha)', baseQty: 100, baseUnit: 'g', kcal: 77, protein: 4.5, carbs: 14.0, fats: 0.5,
        measures: [
            { label: '2 col. sopa (40g)', amount: 40 },
            { label: '4 col. sopa (80g)', amount: 80 },
            { label: '6 col. sopa (120g)', amount: 120 },
            { label: '8 col. sopa (160g)', amount: 160 },
            { label: '1 concha média (100g)', amount: 100 },
            { label: '1 concha grande (150g)', amount: 150 }
        ]
      },
      { name: 'Lentilha Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 116, protein: 9.0, carbs: 20.0, fats: 0.4,
        measures: [
            { label: '2 col. sopa (40g)', amount: 40 },
            { label: '4 col. sopa (80g)', amount: 80 },
            { label: '6 col. sopa (120g)', amount: 120 },
            { label: '8 col. sopa (160g)', amount: 160 },
            { label: '1 concha (100g)', amount: 100 },
            { label: '150g', amount: 150 }
        ]
      },
      { name: 'Grão de Bico Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 164, protein: 8.9, carbs: 27.0, fats: 2.6,
        measures: [
            { label: '2 col. sopa (40g)', amount: 40 },
            { label: '4 col. sopa (80g)', amount: 80 },
            { label: '6 col. sopa (120g)', amount: 120 },
            { label: '8 col. sopa (160g)', amount: 160 },
            { label: '1 concha (100g)', amount: 100 }
        ]
      },
      { name: 'Ervilha Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 80, protein: 5.0, carbs: 14.0, fats: 0.5,
        measures: [
            { label: '3 col. sopa (60g)', amount: 60 },
            { label: '5 col. sopa (100g)', amount: 100 },
            { label: '8 col. sopa (160g)', amount: 160 }
        ]
      }
    ]
  },
  {
    id: 'dairy',
    name: 'Leites & Laticínios',
    items: [
      { name: 'Leite Desnatado', qty: '200ml (1 copo)', baseQty: 200, baseUnit: 'ml', kcal: 70, protein: 6.0, carbs: 10.0, fats: 0.0,
        measures: [
            { label: '1/2 copo (100ml)', amount: 100 },
            { label: '1 copo americano (150ml)', amount: 150 },
            { label: '1 copo grande (250ml)', amount: 250 },
            { label: '2 copos (400ml)', amount: 400 }
        ]
      },
      { name: 'Leite Integral', qty: '200ml (1 copo)', baseQty: 200, baseUnit: 'ml', kcal: 120, protein: 6.0, carbs: 9.0, fats: 6.0,
        measures: [
            { label: '100ml', amount: 100 },
            { label: '200ml', amount: 200 },
            { label: '300ml', amount: 300 }
        ]
      },
      { name: 'Iogurte Natural Desnatado', qty: '160g', baseQty: 160, baseUnit: 'g', kcal: 70, protein: 6.5, carbs: 9.0, fats: 0.0,
         measures: [
            { label: '1/2 pote (80g)', amount: 80 },
            { label: '1 pote (160g)', amount: 160 },
            { label: '2 potes (320g)', amount: 320 }
         ]
      },
      { name: 'Iogurte Grego Zero', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 55, protein: 10.0, carbs: 4.0, fats: 0.0,
         measures: [
            { label: '1 unidade (100g)', amount: 100 }
         ]
      },
      { name: 'Queijo Minas Frescal', qty: '40g (1 fatia)', baseQty: 40, baseUnit: 'g', kcal: 95, protein: 6.0, carbs: 1.0, fats: 7.0,
        measures: [
            { label: '1 fatia fina (20g)', amount: 20 },
            { label: '1 fatia média (40g)', amount: 40 },
            { label: '2 fatias (80g)', amount: 80 }
        ]
      },
      { name: 'Queijo Muçarela', qty: '30g (1 fatia)', baseQty: 30, baseUnit: 'g', kcal: 95, protein: 7.0, carbs: 1.0, fats: 7.0,
        measures: [
            { label: '1 fatia (30g)', amount: 30 },
            { label: '2 fatias (60g)', amount: 60 }
        ]
      },
      { name: 'Queijo Cottage', qty: '50g (2 col. sopa)', baseQty: 50, baseUnit: 'g', kcal: 50, protein: 6.0, carbs: 1.5, fats: 2.0,
        measures: [
            { label: '1 col. sopa (25g)', amount: 25 },
            { label: '2 col. sopa (50g)', amount: 50 },
            { label: '3 col. sopa (75g)', amount: 75 }
        ]
      },
      { name: 'Requeijão Light', qty: '30g (1 col. sopa)', baseQty: 30, baseUnit: 'g', kcal: 55, protein: 3.0, carbs: 1.0, fats: 4.0,
        measures: [
            { label: '1 col. sopa (30g)', amount: 30 },
            { label: '1 col. sobremesa (15g)', amount: 15 }
        ]
      },
      { name: 'Ricota', qty: '50g', baseQty: 50, baseUnit: 'g', kcal: 70, protein: 5.5, carbs: 2.0, fats: 4.0,
        measures: [
            { label: '1 fatia grande (50g)', amount: 50 }
        ]
      }
    ]
  },
  {
    id: 'fruit',
    name: 'Frutas',
    items: [
      { name: 'Banana Prata', qty: '60g (1 média)', baseQty: 60, baseUnit: 'g', kcal: 58, protein: 0.7, carbs: 15.0, fats: 0.1,
        measures: [
            { label: '1 pequena (40g)', amount: 40 },
            { label: '1 média (60g)', amount: 60 },
            { label: '1 grande (80g)', amount: 80 }
        ]
      },
      { name: 'Banana Nanica', qty: '80g (1 média)', baseQty: 80, baseUnit: 'g', kcal: 75, protein: 1.0, carbs: 20.0, fats: 0.1,
        measures: [
            { label: '1 média (80g)', amount: 80 },
            { label: '1 grande (100g)', amount: 100 }
        ]
      },
      { name: 'Maçã Fuji/Gala', qty: '130g (1 média)', baseQty: 130, baseUnit: 'g', kcal: 70, protein: 0.3, carbs: 18.0, fats: 0.2,
        measures: [
            { label: '1 pequena (100g)', amount: 100 },
            { label: '1 média (130g)', amount: 130 },
            { label: '1 grande (160g)', amount: 160 }
        ]
      },
      { name: 'Pera', qty: '130g (1 média)', baseQty: 130, baseUnit: 'g', kcal: 70, protein: 0.5, carbs: 18.0, fats: 0.1,
         measures: [
            { label: '1 média (130g)', amount: 130 }
        ]
      },
      { name: 'Abacaxi', qty: '100g (1 fatia)', baseQty: 100, baseUnit: 'g', kcal: 50, protein: 0.5, carbs: 13.0, fats: 0.1,
         measures: [
            { label: '1 fatia fina (70g)', amount: 70 },
            { label: '1 fatia média (100g)', amount: 100 },
            { label: '2 fatias (200g)', amount: 200 }
        ]
      },
      { name: 'Mamão Papaia', qty: '140g (1/2 un)', baseQty: 140, baseUnit: 'g', kcal: 60, protein: 0.8, carbs: 15.0, fats: 0.2,
         measures: [
            { label: '1/2 unidade (140g)', amount: 140 },
            { label: '1 unidade (280g)', amount: 280 }
        ]
      },
      { name: 'Mamão Formosa', qty: '150g (1 fatia)', baseQty: 150, baseUnit: 'g', kcal: 68, protein: 0.9, carbs: 17.0, fats: 0.2,
         measures: [
            { label: '1 fatia picada (150g)', amount: 150 }
        ]
      },
      { name: 'Abacate', qty: '50g', baseQty: 50, baseUnit: 'g', kcal: 80, protein: 1.0, carbs: 4.0, fats: 7.5,
         measures: [
            { label: '1 col. sopa cheia (30g)', amount: 30 },
            { label: '2 col. sopa (50g)', amount: 50 },
            { label: '4 col. sopa / 100g', amount: 100 }
        ]
      },
      { name: 'Morangos', qty: '150g', baseQty: 150, baseUnit: 'g', kcal: 45, protein: 1.0, carbs: 10.0, fats: 0.5,
         measures: [
            { label: '5 unidades (75g)', amount: 75 },
            { label: '10 unidades (150g)', amount: 150 },
            { label: '1 caixa (250g)', amount: 250 }
        ]
      },
      { name: 'Melancia', qty: '200g (1 fatia)', baseQty: 200, baseUnit: 'g', kcal: 60, protein: 1.2, carbs: 15.0, fats: 0.0,
         measures: [
            { label: '1 fatia média (200g)', amount: 200 },
            { label: '1 fatia grande (300g)', amount: 300 }
        ]
      },
      { name: 'Melão', qty: '200g (1 fatia)', baseQty: 200, baseUnit: 'g', kcal: 60, protein: 1.0, carbs: 14.0, fats: 0.0,
         measures: [
            { label: '1 fatia grande (200g)', amount: 200 }
        ]
      },
      { name: 'Uva', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 70, protein: 0.6, carbs: 17.0, fats: 0.1,
         measures: [
            { label: '10 unidades (80g)', amount: 80 },
            { label: '15 unidades (120g)', amount: 120 }
        ]
      },
      { name: 'Manga (Tommy/Palmer)', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 65, protein: 0.5, carbs: 17.0, fats: 0.2,
         measures: [
            { label: '1/2 manga pequena (100g)', amount: 100 },
            { label: '1 manga inteira (200g)', amount: 200 }
        ]
      },
      { name: 'Kiwi', qty: '70g (1 un)', baseQty: 70, baseUnit: 'g', kcal: 42, protein: 0.8, carbs: 10.0, fats: 0.4,
         measures: [
            { label: '1 unidade (70g)', amount: 70 },
            { label: '2 unidades (140g)', amount: 140 }
        ]
      },
      { name: 'Laranja', qty: '130g (1 un)', baseQty: 130, baseUnit: 'g', kcal: 62, protein: 1.2, carbs: 15.0, fats: 0.1,
         measures: [
            { label: '1 unidade média (130g)', amount: 130 }
        ]
      },
      { name: 'Mexerica / Tangerina', qty: '130g (1 un)', baseQty: 130, baseUnit: 'g', kcal: 50, protein: 0.8, carbs: 13.0, fats: 0.2,
         measures: [
            { label: '1 unidade média (130g)', amount: 130 }
        ]
      },
      { name: 'Goiaba', qty: '120g (1 un)', baseQty: 120, baseUnit: 'g', kcal: 65, protein: 1.0, carbs: 15.0, fats: 0.5,
         measures: [
            { label: '1 unidade (120g)', amount: 120 }
        ]
      },
      { name: 'Ameixa Fresca', qty: '50g (1 un)', baseQty: 50, baseUnit: 'g', kcal: 25, protein: 0.4, carbs: 6.0, fats: 0.0,
         measures: [
            { label: '1 unidade (50g)', amount: 50 },
            { label: '2 unidades (100g)', amount: 100 }
        ]
      }
    ]
  },
  {
    id: 'veg',
    name: 'Vegetais & Saladas',
    items: [
      { name: 'Alface / Folhas', qty: 'Prato Cheio', baseQty: 50, baseUnit: 'g', kcal: 10, protein: 1.0, carbs: 2.0, fats: 0.0,
        measures: [
            { label: '1/2 prato (25g)', amount: 25 },
            { label: '1 prato cheio (50g)', amount: 50 }
        ]
      },
      { name: 'Brócolis Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 35, protein: 2.8, carbs: 7.0, fats: 0.4,
        measures: [
            { label: '1 xícara (80g)', amount: 80 },
            { label: '1 prato sobremesa (150g)', amount: 150 }
        ]
      },
      { name: 'Couve-flor Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 25, protein: 2.0, carbs: 5.0, fats: 0.3,
        measures: [
            { label: '1 xícara (80g)', amount: 80 },
            { label: '100g', amount: 100 }
        ]
      },
      { name: 'Couve Refogada', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 90, protein: 4.0, carbs: 10.0, fats: 4.5,
        measures: [
            { label: '2 col. sopa (50g)', amount: 50 },
            { label: '4 col. sopa (100g)', amount: 100 },
            { label: '6 col. sopa (150g)', amount: 150 },
            { label: '8 col. sopa (200g)', amount: 200 }
        ]
      },
      { name: 'Espinafre Refogado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 65, protein: 3.0, carbs: 4.0, fats: 4.0,
        measures: [
            { label: '2 col. sopa (60g)', amount: 60 },
            { label: '4 col. sopa (100g)', amount: 100 },
            { label: '6 col. sopa (150g)', amount: 150 },
            { label: '8 col. sopa (200g)', amount: 200 }
        ]
      },
      { name: 'Cenoura Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 35, protein: 0.8, carbs: 8.0, fats: 0.2,
        measures: [
            { label: '2 col. sopa (40g)', amount: 40 },
            { label: '4 col. sopa (80g)', amount: 80 },
            { label: '6 col. sopa (120g)', amount: 120 },
            { label: '8 col. sopa (160g)', amount: 160 },
            { label: '100g', amount: 100 }
        ]
      },
      { name: 'Beterraba Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 43, protein: 1.6, carbs: 9.6, fats: 0.2,
        measures: [
            { label: '2 col. sopa (40g)', amount: 40 },
            { label: '4 col. sopa (80g)', amount: 80 },
            { label: '6 col. sopa (120g)', amount: 120 },
            { label: '8 col. sopa (160g)', amount: 160 },
            { label: '100g', amount: 100 }
        ]
      },
      { name: 'Tomate', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 20, protein: 1.0, carbs: 4.0, fats: 0.0,
         measures: [
            { label: '1 unidade (100g)', amount: 100 },
            { label: '2 fatias (30g)', amount: 30 }
        ]
      },
      { name: 'Pepino', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 15, protein: 0.7, carbs: 3.0, fats: 0.0,
         measures: [
            { label: '1/2 unidade (100g)', amount: 100 }
        ]
      },
      { name: 'Abobrinha Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 20, protein: 1.2, carbs: 4.0, fats: 0.1,
         measures: [
            { label: '1 col. servir (60g)', amount: 60 },
            { label: '100g', amount: 100 }
        ]
      },
      { name: 'Chuchu Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 20, protein: 0.5, carbs: 5.0, fats: 0.0,
         measures: [
            { label: '2 col. sopa (60g)', amount: 60 },
            { label: '4 col. sopa (120g)', amount: 120 },
            { label: '6 col. sopa (180g)', amount: 180 },
            { label: '8 col. sopa (240g)', amount: 240 },
            { label: '100g', amount: 100 }
        ]
      },
      { name: 'Vagem Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 35, protein: 1.8, carbs: 7.0, fats: 0.2,
         measures: [
            { label: '2 col. sopa (50g)', amount: 50 },
            { label: '4 col. sopa (100g)', amount: 100 },
            { label: '6 col. sopa (150g)', amount: 150 },
            { label: '8 col. sopa (200g)', amount: 200 },
            { label: '100g', amount: 100 }
        ]
      },
      { name: 'Quiabo Refogado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 70, protein: 2.0, carbs: 8.0, fats: 4.0,
         measures: [
            { label: '2 col. sopa (50g)', amount: 50 },
            { label: '4 col. sopa (100g)', amount: 100 },
            { label: '6 col. sopa (150g)', amount: 150 },
            { label: '8 col. sopa (200g)', amount: 200 },
            { label: '100g', amount: 100 }
        ]
      },
      { name: 'Abóbora Cabotiá Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 40, protein: 1.0, carbs: 10.0, fats: 0.1,
         measures: [
            { label: '1 col. servir (60g)', amount: 60 },
            { label: '2 col. servir (120g)', amount: 120 }
        ]
      }
    ]
  },
  {
    id: 'fat',
    name: 'Gorduras, Óleos & Sementes',
    items: [
      { name: 'Azeite de Oliva', qty: '10ml (1 col. sopa)', baseQty: 10, baseUnit: 'ml', kcal: 88, protein: 0.0, carbs: 0.0, fats: 10.0,
        measures: [
            { label: '1 fio (2ml)', amount: 2 },
            { label: '1 col. chá (5ml)', amount: 5 },
            { label: '1 col. sopa (10ml)', amount: 10 },
            { label: '2 col. sopa (20ml)', amount: 20 }
        ]
      },
      { name: 'Manteiga', qty: '5g (1 ponta faca)', baseQty: 5, baseUnit: 'g', kcal: 37, protein: 0.0, carbs: 0.0, fats: 4.1,
         measures: [
            { label: '1 ponta de faca (5g)', amount: 5 },
            { label: '1 col. chá cheia (10g)', amount: 10 }
        ]
      },
      { name: 'Pasta de Amendoim', qty: '15g (1 col. sopa)', baseQty: 15, baseUnit: 'g', kcal: 90, protein: 4.0, carbs: 3.0, fats: 7.5,
         measures: [
            { label: '1 col. sobremesa (10g)', amount: 10 },
            { label: '1 col. sopa (15g)', amount: 15 },
            { label: '2 col. sopa (30g)', amount: 30 }
        ]
      },
      { name: 'Castanha do Pará', qty: '10g (2 un)', baseQty: 10, baseUnit: 'g', kcal: 65, protein: 1.4, carbs: 1.2, fats: 6.6,
         measures: [
            { label: '1 unidade (5g)', amount: 5 },
            { label: '2 unidades (10g)', amount: 10 }
        ]
      },
      { name: 'Castanha de Caju', qty: '10g (5 un)', baseQty: 10, baseUnit: 'g', kcal: 58, protein: 1.8, carbs: 3.0, fats: 4.6,
         measures: [
            { label: '5 unidades', amount: 10 },
            { label: '10 unidades', amount: 20 }
        ]
      },
      { name: 'Nozes', qty: '15g', baseQty: 15, baseUnit: 'g', kcal: 100, protein: 2.0, carbs: 2.0, fats: 10.0,
         measures: [
            { label: '2 unidades inteiras', amount: 10 },
            { label: '3 unidades inteiras', amount: 15 }
        ]
      },
      { name: 'Semente de Chia', qty: '15g (1 col. sopa)', baseQty: 15, baseUnit: 'g', kcal: 73, protein: 2.5, carbs: 6.0, fats: 4.6,
         measures: [
            { label: '1 col. sobremesa (10g)', amount: 10 },
            { label: '1 col. sopa (15g)', amount: 15 }
        ]
      }
    ]
  },
  {
    id: 'sugar',
    name: 'Doces & Acompanhamentos',
    items: [
      { name: 'Mel de Abelha', qty: '15g (1 col. sopa)', baseQty: 15, baseUnit: 'g', kcal: 45, protein: 0.0, carbs: 12.0, fats: 0.0,
        measures: [
            { label: '1 col. chá (5g)', amount: 5 },
            { label: '1 col. sopa (15g)', amount: 15 }
        ]
      },
      { name: 'Doce de Leite', qty: '20g (1 col. sopa)', baseQty: 20, baseUnit: 'g', kcal: 65, protein: 1.5, carbs: 11.0, fats: 1.5,
        measures: [
            { label: '1 col. sopa rasa (20g)', amount: 20 },
            { label: '1 col. sopa cheia (30g)', amount: 30 }
        ]
      },
      { name: 'Geleia de Frutas (Normal)', qty: '20g (1 col. sopa)', baseQty: 20, baseUnit: 'g', kcal: 50, protein: 0.0, carbs: 13.0, fats: 0.0,
        measures: [
            { label: '1 col. sopa (20g)', amount: 20 }
        ]
      },
      { name: 'Geleia de Frutas (Sem açúcar)', qty: '20g', baseQty: 20, baseUnit: 'g', kcal: 10, protein: 0.0, carbs: 2.5, fats: 0.0,
        measures: [
            { label: '1 col. sopa (20g)', amount: 20 }
        ]
      },
      { name: 'Chocolate 70% Cacau', qty: '20g', baseQty: 20, baseUnit: 'g', kcal: 110, protein: 1.5, carbs: 7.0, fats: 8.0,
        measures: [
            { label: '1 quadradinho (5g)', amount: 5 },
            { label: '2 quadradinhos (10g)', amount: 10 },
            { label: '4 quadradinhos (20g)', amount: 20 }
        ]
      }
    ]
  }
];

// --- Funções Auxiliares de Cálculo Inteligente ---

export const findFoodByName = (name: string): FoodDbItem | undefined => {
    if (!name) return undefined;
    const normalizedSearch = name.toLowerCase().trim();
    
    // 1. Exact Match
    let found = FoodDatabase.flatMap(c => c.items).find(i => i.name.toLowerCase() === normalizedSearch);
    if (found) return found;

    // 2. Starts With
    found = FoodDatabase.flatMap(c => c.items).find(i => i.name.toLowerCase().startsWith(normalizedSearch));
    if (found) return found;

    // 3. Contains (Search term inside DB Name) e.g. Search "Frango" -> Found "Peito de Frango"
    found = FoodDatabase.flatMap(c => c.items).find(i => i.name.toLowerCase().includes(normalizedSearch));
    if (found) return found;

    // 4. Reverse Contains (DB Name inside Search term) e.g. Search "Arroz Branco Cozido 100g" -> Found "Arroz Branco"
    found = FoodDatabase.flatMap(c => c.items).find(i => normalizedSearch.includes(i.name.toLowerCase()));
    
    return found;
};

export const getSmartMeasures = (food: FoodDbItem): Measure[] => {
    if (food.measures && food.measures.length > 0) return food.measures;
    return getGenericMeasures(food.baseQty, food.baseUnit);
};

export const calculateCaloriesForMeasure = (food: FoodDbItem, amount: number): number => {
    return Math.round((amount / food.baseQty) * food.kcal);
};

export const calculateMacrosForMeasure = (food: FoodDbItem, amount: number): Macros => {
    const ratio = amount / food.baseQty;
    return {
        protein: parseFloat((food.protein * ratio).toFixed(1)),
        carbs: parseFloat((food.carbs * ratio).toFixed(1)),
        fats: parseFloat((food.fats * ratio).toFixed(1))
    };
};

/**
 * Gera substituições equivalentes em calorias
 * @param foodName Nome do alimento original
 * @param targetCalories Calorias alvo
 */
export const calculateSmartSubstitutions = (foodName: string, targetCalories: number): string[] => {
    // 1. Identify the food item in the database
    const dbItem = findFoodByName(foodName);
    if (!dbItem) return [];

    // 2. Find its category
    const category = FoodDatabase.find(cat => cat.items.includes(dbItem));
    if (!category) return [];

    // 3. Filter other items in the same category
    // If targetCalories is 0 or very low, assume standard serving size calories of the dbItem
    const refCalories = targetCalories > 10 ? targetCalories : dbItem.kcal;

    return category.items
        .filter(item => item.name !== dbItem.name) // Exclude self
        .slice(0, 3) // Limit to 3 suggestions
        .map(item => {
            // Rule of three: (RefCalories * BaseQty) / ItemKcal = AmountNeeded
            const amountNeeded = (refCalories * item.baseQty) / item.kcal;
            
            // Rounding logic for cleaner numbers
            let roundedAmount = Math.round(amountNeeded);
            
            // Generate a friendly measure string
            let measureText = `${roundedAmount}${item.baseUnit}`;
            
            if (item.measures) {
                // Find closer household measure
                const closestMeasure = item.measures.reduce((prev, curr) => {
                    return (Math.abs(curr.amount - roundedAmount) < Math.abs(prev.amount - roundedAmount) ? curr : prev);
                });
                
                // If it's close enough (within 25%), use the label
                if (Math.abs(closestMeasure.amount - roundedAmount) < (roundedAmount * 0.25)) {
                     // Extract just the measure name part (e.g. "1 col. sopa")
                     const labelPart = closestMeasure.label.split('(')[0].trim(); 
                     measureText = labelPart; 
                }
            }
            
            return `${item.name} (${measureText})`;
        });
};
