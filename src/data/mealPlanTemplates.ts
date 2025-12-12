
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
  {
    id: 'cal_1600',
    name: '1600 Kcal - Padrão',
    description: 'Dieta balanceada para manutenção ou leve perda.',
    goal: 'Manutenção',
    totalCalories: 1600,
    macros: { protein: 120, carbs: 160, fats: 53 },
    generalAdvice: "Mantenha a hidratação.",
    meals: [
      { id: '1', name: 'Café da Manhã', time: '08:00', items: [{ name: 'Pão Integral', quantity: '2 fatias', calories: 120 }, { name: 'Ovo Mexido', quantity: '2 unidades', calories: 160 }] },
      { id: '2', name: 'Almoço', time: '12:00', items: [{ name: 'Arroz', quantity: '100g', calories: 130 }, { name: 'Feijão', quantity: '1 concha', calories: 80 }, { name: 'Frango', quantity: '120g', calories: 190 }] }
    ]
  }
];
