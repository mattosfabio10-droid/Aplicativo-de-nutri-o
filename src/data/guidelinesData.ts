
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
    id: 'dm1',
    title: 'Diabetes Mellitus Tipo 1',
    description: 'Contagem de carboidratos e insulinoterapia.',
    intro: 'No DM1, o pâncreas não produz insulina. O foco nutricional é o equilíbrio entre a ingestão de carboidratos e a dose de insulina administrada, além da prevenção de hipoglicemias e complicações vasculares.',
    recommendations: [
      'Aprenda a realizar a Contagem de Carboidratos para ajustar a insulina prandial.',
      'Tenha sempre um carboidrato de rápida absorção (sachê de mel, bala, suco) para correção de hipoglicemias (<70mg/dL).',
      'Mantenha horários de refeições regulares para facilitar o controle glicêmico.',
      'Monitore a glicemia antes e 2 horas após as refeições.'
    ],
    foodsToPrefer: [
      'Carboidratos complexos (baixo índice glicêmico) para manutenção',
      'Fibras (ajudam a estabilizar a curva glicêmica)',
      'Proteínas magras e gorduras boas',
      'Adoçantes naturais (Stévia, Eritritol) se necessário',
      'Vegetais em abundância'
    ],
    foodsToAvoid: [
      'Bebidas açucaradas (exceto na hipoglicemia)',
      'Doces concentrados sem cobertura de insulina adequada',
      'Excesso de gordura saturada (risco cardiovascular aumentado)',
      'Álcool em jejum (risco de hipoglicemia tardia)',
      'Produtos "diet" ultraprocessados sem leitura de rótulo'
    ]
  },
  {
    id: 'dm2',
    title: 'Diabetes Mellitus Tipo 2',
    description: 'Controle glicêmico e redução da resistência à insulina.',
    intro: 'O objetivo nutricional no Diabetes Tipo 2 é manter a glicemia estável, melhorando a sensibilidade à insulina através da perda de peso e qualidade da dieta, evitando picos de açúcar no sangue.',
    recommendations: [
      'Fracione as refeições em volumes menores, a cada 3 ou 4 horas.',
      'Nunca pule o café da manhã.',
      'Aumente o consumo de fibras (verduras cruas, bagaço de frutas, aveia, linhaça).',
      'Associe sempre um carboidrato a uma proteína ou gordura boa para reduzir o índice glicêmico da refeição.'
    ],
    foodsToPrefer: [
      'Cereais integrais (arroz integral, aveia, quinoa)',
      'Leguminosas (feijão, lentilha, grão de bico)',
      'Verduras de folha escura',
      'Frutas com casca ou bagaço (maçã, pera, laranja)',
      'Carnes magras e peixes',
      'Gorduras boas (azeite, abacate, castanhas)'
    ],
    foodsToAvoid: [
      'Açúcar refinado, mel, melado, rapadura',
      'Doces em geral, bolos recheados, chocolates ao leite',
      'Refrigerantes e sucos de caixinha',
      'Farinha branca refinada em excesso',
      'Bebidas alcoólicas em excesso'
    ]
  },
  {
    id: 'hipertensao',
    title: 'Hipertensão Arterial',
    description: 'Estratégia DASH e redução de sódio.',
    intro: 'A dieta para hipertensão foca na redução do consumo de sódio e aumento de alimentos ricos em potássio, magnésio e cálcio, favorecendo o relaxamento dos vasos sanguíneos.',
    recommendations: [
      'Reduza o sal de adição. Utilize ervas naturais para temperar (orégano, manjericão, alecrim, cúrcuma).',
      'Evite deixar o saleiro à mesa.',
      'Leia os rótulos: evite alimentos com alto teor de sódio.',
      'Mantenha o peso corporal adequado.'
    ],
    foodsToPrefer: [
      'Frutas e verduras frescas (fontes de potássio)',
      'Leites e derivados desnatados (fontes de cálcio)',
      'Peixes ricos em ômega-3 (sardinha, atum, salmão)',
      'Grãos integrais',
      'Alho e cebola (ajudam na vasodilatação)'
    ],
    foodsToAvoid: [
      'Embutidos (presunto, salame, mortadela, salsicha)',
      'Temperos prontos (cubos de carne, sachês, shoyu comum)',
      'Enlatados e conservas',
      'Salgadinhos de pacote e bolachas salgadas',
      'Queijos muito amarelos e salgados (parmesão, provolone)'
    ]
  },
  {
    id: 'dislipidemia',
    title: 'Dislipidemia (Colesterol Alto)',
    description: 'Controle de LDL e triglicerídeos.',
    intro: 'O foco é reduzir a ingestão de gorduras saturadas e trans, aumentando o consumo de gorduras insaturadas (boas) e fibras solúveis que ajudam a "varrer" o colesterol.',
    recommendations: [
      'Prefira preparações grelhadas, assadas ou cozidas. Evite frituras.',
      'Retire a gordura aparente das carnes e a pele do frango antes do cozimento.',
      'Aumente o consumo de aveia, pois a beta-glucana ajuda a reduzir o colesterol.',
      'Pratique atividade física regularmente.'
    ],
    foodsToPrefer: [
      'Aveia, linhaça, chia',
      'Azeite de oliva extra virgem (cru)',
      'Peixes de águas profundas',
      'Abacate',
      'Frutas vermelhas e roxas (antioxidantes)',
      'Soja e derivados'
    ],
    foodsToAvoid: [
      'Gordura hidrogenada (biscoitos recheados, sorvetes de massa)',
      'Carnes gordas (cupim, costela, picanha)',
      'Pele de frango',
      'Frituras de imersão',
      'Manteiga e margarina em excesso',
      'Leite integral e queijos amarelos'
    ]
  },
  {
    id: 'sop',
    title: 'Síndrome do Ovário Policístico (SOP)',
    description: 'Controle de insulina e inflamação.',
    intro: 'A SOP é uma desordem endócrina frequentemente ligada à resistência à insulina. O tratamento nutricional é focado em manter a insulina baixa e reduzir a inflamação crônica.',
    recommendations: [
      'Adote uma dieta de baixo índice glicêmico.',
      'Consuma boas fontes de inositol.',
      'Gerencie o estresse e o sono.',
      'Evite jejuns prolongados se houver estresse adrenal elevado.'
    ],
    foodsToPrefer: [
      'Vegetais folhosos e legumes fibrosos',
      'Frutas vermelhas e cítricas (baixo açúcar)',
      'Proteínas magras em todas as refeições',
      'Chá de hortelã (pode ajudar a reduzir andrógenos)',
      'Sementes (ciclo das sementes: linhaça, abóbora, girassol, gergelim)'
    ],
    foodsToAvoid: [
      'Laticínios (se houver acne ou inflamação)',
      'Carboidratos simples e refinados',
      'Açúcar e doces',
      'Gorduras trans e óleos inflamatórios',
      'Alimentos processados'
    ]
  },
  {
    id: 'sii',
    title: 'Síndrome do Intestino Irritável (SII/FODMAPs)',
    description: 'Controle de fermentação (Low FODMAP).',
    intro: 'A estratégia envolve reduzir temporariamente alimentos altamente fermentáveis (FODMAPs) que causam gases, dor e alteração do hábito intestinal.',
    recommendations: [
      'Siga a fase restritiva por 4 a 6 semanas e depois reintroduza grupos alimentares.',
      'Evite excesso de glúten e lactose se notar sensibilidade.',
      'Mastigue muito bem os alimentos.',
      'Cuidado com adoçantes do tipo polióis (xilitol, sorbitol).'
    ],
    foodsToPrefer: [
      'Arroz, batata, quinoa, tapioca',
      'Banana, uva, morango, maracujá',
      'Cenoura, chuchu, espinafre, tomate',
      'Carnes, peixes, ovos',
      'Leites sem lactose ou vegetais'
    ],
    foodsToAvoid: [
      'Trigo, centeio, cevada em excesso',
      'Feijões e lentilhas (se não demolhados corretamente)',
      'Maçã, pera, melancia, pêssego',
      'Alho e cebola (grandes quantidades)',
      'Mel e xarope de milho'
    ]
  },
  {
    id: 'gastrite',
    title: 'Gastrite e Refluxo (DRGE)',
    description: 'Proteção da mucosa gástrica.',
    intro: 'A alimentação deve ser leve, fracionada e de fácil digestão, evitando alimentos que irritem a mucosa do estômago ou estimulem a produção excessiva de ácido.',
    recommendations: [
      'Coma devagar e mastigue bem os alimentos.',
      'Não fique longos períodos em jejum.',
      'Evite beber líquidos durante as refeições (espere 30min).',
      'Não se deite logo após comer (aguarde 2 horas).'
    ],
    foodsToPrefer: [
      'Legumes cozidos (cenoura, chuchu, abobrinha)',
      'Frutas não ácidas (mamão, banana, maçã, pera)',
      'Carnes magras desfiadas ou moídas',
      'Chás calmantes (camomila, espinheira santa, melissa)',
      'Gengibre (anti-inflamatório natural)'
    ],
    foodsToAvoid: [
      'Cafeína (café, chá preto, mate, refrigerantes cola)',
      'Pimenta e condimentos fortes',
      'Frituras e alimentos muito gordurosos',
      'Frutas ácidas (limão, laranja, abacaxi) se houver dor',
      'Chocolate',
      'Bebidas alcoólicas e gasosas'
    ]
  },
  {
    id: 'hipertrofia',
    title: 'Hipertrofia Muscular',
    description: 'Ganho de massa magra e performance.',
    intro: 'Para construir músculos, o corpo precisa de estímulo (treino), substrato (proteínas e calorias) e recuperação (sono). A dieta geralmente envolve um superávit calórico leve e alta ingestão proteica.',
    recommendations: [
      'Distribua a proteína ao longo do dia (4 a 5 refeições com 20-30g de proteína).',
      'Consuma carboidratos complexos no pré-treino para energia.',
      'Não treine em jejum prolongado se o objetivo for máximo rendimento.',
      'Beba água: músculo desidratado não cresce e cataboliza.'
    ],
    foodsToPrefer: [
      'Ovos, frango, carnes magras, peixes',
      'Arroz, batata, macarrão, aveia (fontes de energia)',
      'Whey Protein e Creatina (conforme prescrição)',
      'Frutas variadas (micronutrientes)',
      'Azeite e castanhas (densidade calórica saudável)'
    ],
    foodsToAvoid: [
      'Álcool (inibe a síntese proteica e reduz testosterona)',
      'Pular refeições (risco de catabolismo)',
      'Açúcar em excesso (ganho de gordura visceral)',
      'Alimentos ultraprocessados com calorias vazias',
      'Baixa ingestão de água'
    ]
  }
];
