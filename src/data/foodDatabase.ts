
export interface Measure {
  label: string;
  amount: number;
}

export interface FoodDbItem {
  name: string;
  qty: string;
  baseQty: number;
  baseUnit: string;
  kcal: number;
  protein: number;
  carbs: number;
  fats: number;
  measures?: Measure[];
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
      { name: 'Café Preto (Sem açúcar)', qty: '100ml', baseQty: 100, baseUnit: 'ml', kcal: 2, protein: 0.0, carbs: 0.3, fats: 0.0, measures: [{ label: '1 xícara café (50ml)', amount: 50 }, { label: '1 xícara chá (150ml)', amount: 150 }] },
      { name: 'Suco de Laranja (Natural)', qty: '200ml', baseQty: 200, baseUnit: 'ml', kcal: 90, protein: 1.5, carbs: 21.0, fats: 0.4 },
      { name: 'Suco de Uva Integral', qty: '200ml', baseQty: 200, baseUnit: 'ml', kcal: 120, protein: 1.0, carbs: 30.0, fats: 0.0 },
      { name: 'Água de Coco', qty: '200ml', baseQty: 200, baseUnit: 'ml', kcal: 40, protein: 0.0, carbs: 10.0, fats: 0.0 }
    ]
  },
  {
    id: 'carb',
    name: 'Cereais, Raízes & Tubérculos',
    items: [
      { name: 'Arroz Branco Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 128, protein: 2.5, carbs: 28.1, fats: 0.2 },
      { name: 'Arroz Integral Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 124, protein: 2.6, carbs: 25.8, fats: 1.0 },
      { name: 'Batata Doce Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 112, protein: 2.0, carbs: 26.0, fats: 0.1 },
      { name: 'Aveia em Flocos', qty: '30g', baseQty: 30, baseUnit: 'g', kcal: 115, protein: 4.3, carbs: 17.0, fats: 2.2 },
      { name: 'Pão Francês', qty: '50g', baseQty: 50, baseUnit: 'g', kcal: 135, protein: 4.7, carbs: 28.5, fats: 0.5 }
    ]
  },
  {
    id: 'prot',
    name: 'Carnes, Ovos & Peixes',
    items: [
      { name: 'Peito de Frango Grelhado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 165, protein: 31.0, carbs: 0.0, fats: 3.6 },
      { name: 'Patinho Moído (Cozido)', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 220, protein: 32.0, carbs: 0.0, fats: 9.0 },
      { name: 'Ovo de Galinha Cozido', qty: '50g', baseQty: 50, baseUnit: 'g', kcal: 78, protein: 6.3, carbs: 0.6, fats: 5.3 },
      { name: 'Filé de Tilápia Grelhado', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 120, protein: 24.0, carbs: 0.0, fats: 2.5 },
      { name: 'Whey Protein', qty: '30g', baseQty: 30, baseUnit: 'g', kcal: 120, protein: 24.0, carbs: 3.0, fats: 1.5 }
    ]
  },
  {
    id: 'leg',
    name: 'Leguminosas',
    items: [
      { name: 'Feijão Carioca Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 76, protein: 4.8, carbs: 13.6, fats: 0.5 },
      { name: 'Feijão Preto Cozido', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 77, protein: 4.5, carbs: 14.0, fats: 0.5 },
      { name: 'Lentilha Cozida', qty: '100g', baseQty: 100, baseUnit: 'g', kcal: 116, protein: 9.0, carbs: 20.0, fats: 0.4 }
    ]
  },
  {
    id: 'fruit',
    name: 'Frutas',
    items: [
      { name: 'Banana Prata', qty: '60g', baseQty: 60, baseUnit: 'g', kcal: 58, protein: 0.7, carbs: 15.0, fats: 0.1 },
      { name: 'Maçã Fuji', qty: '130g', baseQty: 130, baseUnit: 'g', kcal: 70, protein: 0.3, carbs: 18.0, fats: 0.2 },
      { name: 'Mamão Papaia', qty: '140g', baseQty: 140, baseUnit: 'g', kcal: 60, protein: 0.8, carbs: 15.0, fats: 0.2 }
    ]
  },
  {
    id: 'fat',
    name: 'Gorduras & Oleaginosas',
    items: [
      { name: 'Azeite de Oliva', qty: '10ml', baseQty: 10, baseUnit: 'ml', kcal: 88, protein: 0.0, carbs: 0.0, fats: 10.0 },
      { name: 'Castanha do Pará', qty: '10g', baseQty: 10, baseUnit: 'g', kcal: 65, protein: 1.4, carbs: 1.2, fats: 6.6 },
      { name: 'Pasta de Amendoim', qty: '15g', baseQty: 15, baseUnit: 'g', kcal: 90, protein: 4.0, carbs: 3.0, fats: 7.5 }
    ]
  }
];

export const findFoodByName = (name: string): FoodDbItem | undefined => {
    if (!name) return undefined;
    const normalizedSearch = name.toLowerCase().trim();
    let found = FoodDatabase.flatMap(c => c.items).find(i => i.name.toLowerCase() === normalizedSearch);
    if (found) return found;
    found = FoodDatabase.flatMap(c => c.items).find(i => i.name.toLowerCase().includes(normalizedSearch));
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

export const calculateSmartSubstitutions = (foodName: string, targetCalories: number): string[] => {
    const dbItem = findFoodByName(foodName);
    if (!dbItem) return [];
    const category = FoodDatabase.find(cat => cat.items.includes(dbItem));
    if (!category) return [];
    const refCalories = targetCalories > 10 ? targetCalories : dbItem.kcal;

    return category.items
        .filter(item => item.name !== dbItem.name)
        .slice(0, 3)
        .map(item => {
            const amountNeeded = (refCalories * item.baseQty) / item.kcal;
            let roundedAmount = Math.round(amountNeeded);
            return `${item.name} (${roundedAmount}${item.baseUnit})`;
        });
};
