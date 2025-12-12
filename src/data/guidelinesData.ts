
export interface Guideline {
  id: string;
  title: string;
  description: string;
  intro: string;
  recommendations: string[];
  foodsToPrefer: string[];
  foodsToAvoid: string[];
}

export const GuidelinesDatabase: Guideline[] = [
  {
    id: 'dm2',
    title: 'Diabetes Mellitus Tipo 2',
    description: 'Controle glicêmico e redução da resistência à insulina.',
    intro: 'O objetivo nutricional no Diabetes Tipo 2 é manter a glicemia estável, melhorando a sensibilidade à insulina.',
    recommendations: [
      'Fracione as refeições em volumes menores.',
      'Nunca pule o café da manhã.',
      'Aumente o consumo de fibras.',
      'Associe sempre um carboidrato a uma proteína ou gordura boa.'
    ],
    foodsToPrefer: ['Cereais integrais', 'Leguminosas', 'Verduras', 'Carnes magras'],
    foodsToAvoid: ['Açúcar refinado', 'Doces', 'Refrigerantes', 'Farinha branca']
  },
  {
    id: 'hipertensao',
    title: 'Hipertensão Arterial',
    description: 'Estratégia DASH e redução de sódio.',
    intro: 'Foco na redução de sódio e aumento de potássio, magnésio e cálcio.',
    recommendations: [
      'Reduza o sal de adição.',
      'Evite alimentos industrializados ricos em sódio.',
      'Consuma mais frutas e vegetais.'
    ],
    foodsToPrefer: ['Frutas', 'Verduras', 'Leites desnatados', 'Peixes'],
    foodsToAvoid: ['Embutidos', 'Temperos prontos', 'Enlatados', 'Salgadinhos']
  }
];
