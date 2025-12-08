
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
    id: 'diabetes',
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
    id: 'gestacao',
    title: 'Gestação Saudável',
    description: 'Nutrição fetal e prevenção de intercorrências.',
    intro: 'A nutrição na gestação visa garantir o desenvolvimento adequado do bebê e a saúde da mãe, prevenindo diabetes gestacional, pré-eclâmpsia e ganho de peso excessivo.',
    recommendations: [
      'Não é necessário "comer por dois", mas sim comer com o dobro de qualidade.',
      'Fracione a dieta para evitar náuseas e azia.',
      'Garanta a segurança alimentar: carnes bem passadas e vegetais higienizados com hipoclorito.',
      'Hidrate-se constantemente (formação do líquido amniótico e volume sanguíneo).'
    ],
    foodsToPrefer: [
      'Fontes de Ácido Fólico (vegetais verde-escuros, feijões)',
      'Fontes de Ferro (carnes, leguminosas + Vitamina C)',
      'Fontes de Cálcio (laticínios pasteurizados, gergelim)',
      'Peixes cozidos ricos em ômega-3',
      'Fibras para evitar constipação'
    ],
    foodsToAvoid: [
      'Peixe cru, carne mal passada, ovo com gema mole (risco de contaminação)',
      'Queijos não pasteurizados (Brie, Camembert)',
      'Bebidas alcoólicas (tolerância zero)',
      'Excesso de cafeína (>200mg/dia)',
      'Adoçantes artificiais (ciclamato, sacarina)'
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
      'Não treine em jejum prolongado se o objetivo for máximo rendimento (salvo estratégias específicas).',
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
  },
  {
    id: 'hipertensao',
    title: 'Hipertensão Arterial (Pressão Alta)',
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
    id: 'esteatose',
    title: 'Esteatose Hepática (Gordura no Fígado)',
    description: 'Recuperação hepática e controle de frutose.',
    intro: 'A esteatose não alcoólica está intimamente ligada à resistência à insulina e obesidade visceral. O objetivo é reduzir a carga de frutose, carboidratos refinados e inflamação.',
    recommendations: [
      'Elimine totalmente o álcool até a recuperação do fígado.',
      'Reduza o consumo de frutose industrial (xarope de milho) e sucos concentrados.',
      'Perca peso de forma gradual (perdas muito rápidas podem sobrecarregar o fígado).',
      'Aumente o consumo de gorduras boas e antioxidantes.'
    ],
    foodsToPrefer: [
      'Vegetais crucíferos (brócolis, couve-flor, couve)',
      'Ovos (fonte de colina)',
      'Café sem açúcar (protetor hepático)',
      'Peixes gordos (sardinha, salmão)',
      'Azeite de oliva e abacate'
    ],
    foodsToAvoid: [
      'Bebidas alcoólicas',
      'Sucos de fruta coados/concentrados',
      'Refrigerantes e doces',
      'Farinha branca e produtos de padaria',
      'Óleos vegetais refinados (soja, milho, canola)'
    ]
  },
  {
    id: 'hipotireoidismo',
    title: 'Hipotireoidismo',
    description: 'Suporte metabólico e nutrientes tireoidianos.',
    intro: 'A dieta visa fornecer nutrientes essenciais para a conversão do hormônio T4 em T3 e evitar alimentos que atrapalhem a absorção da medicação ou a função da glândula.',
    recommendations: [
      'Tome a medicação em jejum e aguarde pelo menos 30-60min para comer.',
      'Garanta a ingestão de Selênio, Zinco e Iodo.',
      'Controle o estresse, pois o cortisol elevado atrapalha a tireoide.',
      'Cozinhe vegetais bociogênicos (crucíferas) antes de consumir.'
    ],
    foodsToPrefer: [
      'Castanha do Pará (1 a 2 unidades por dia - Selênio)',
      'Peixes e algas marinhas (Iodo)',
      'Ostras, carnes e sementes de abóbora (Zinco)',
      'Frutas ricas em antioxidantes',
      'Grãos integrais (se não houver sensibilidade)'
    ],
    foodsToAvoid: [
      'Soja e derivados em excesso (pode inibir a tireoide)',
      'Crucíferas CRUAS em grande quantidade (brócolis, couve, repolho)',
      'Excesso de glúten (frequentemente associado a tireoidite de Hashimoto)',
      'Açúcar refinado (inflamação)',
      'Café próximo ao horário da medicação'
    ]
  },
  {
    id: 'vegetarianismo',
    title: 'Vegetarianismo / Veganismo',
    description: 'Dieta Plant-Based balanceada.',
    intro: 'O foco é garantir o aporte proteico através de combinações vegetais e monitorar nutrientes críticos como Vitamina B12, Ferro e Cálcio.',
    recommendations: [
      'Faça a combinação de cereais + leguminosas (ex: arroz com feijão) para obter todos os aminoácidos.',
      'Consuma sempre uma fonte de Vitamina C junto com fontes de ferro vegetal.',
      'Deixe leguminosas de molho por 12h (remolho) para reduzir fitatos e melhorar absorção.',
      'Monitore a B12 e suplemente se necessário.'
    ],
    foodsToPrefer: [
      'Leguminosas (lentilha, grão de bico, feijões, soja)',
      'Tofu e Tempê',
      'Sementes (abóbora, girassol, chia, linhaça)',
      'Vegetais verde-escuros (Cálcio e Ferro)',
      'Levedura nutricional (Nutritional Yeast)'
    ],
    foodsToAvoid: [
      'Excesso de carboidratos refinados (dieta baseada só em massas)',
      'Produtos ultraprocessados "veganos" (hambúrgueres de caixa, salsichas vegetais)',
      'Laticínios e ovos (se for vegano estrito)',
      'Tomar café/chá junto com as refeições principais (atrapalha o ferro)'
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
    id: 'gota',
    title: 'Hiperuricemia (Ácido Úrico / Gota)',
    description: 'Redução de purinas e controle de frutose.',
    intro: 'O objetivo é reduzir os níveis de ácido úrico no sangue, evitando alimentos ricos em purinas e frutose, que aumentam sua produção ou diminuem sua excreção renal.',
    recommendations: [
      'Beba muita água (mínimo 3L/dia) para ajudar na excreção.',
      'Evite jejuns prolongados, pois podem aumentar o ácido úrico.',
      'Mantenha o peso saudável, mas evite dietas extremamente restritivas.',
      'A Vitamina C ajuda na eliminação do ácido úrico.'
    ],
    foodsToPrefer: [
      'Laticínios desnatados (ajudam a reduzir o ácido úrico)',
      'Ovos (fonte proteica segura)',
      'Cereja e frutas vermelhas (anti-inflamatórias)',
      'Vitamina C (limão, laranja, acerola)',
      'Café (consumo moderado pode ser protetor)'
    ],
    foodsToAvoid: [
      'Bebidas alcoólicas (especialmente cerveja)',
      'Vísceras e miúdos (fígado, rim, coração)',
      'Frutos do mar e peixes oleosos em crise (sardinha, anchova)',
      'Carne vermelha em excesso',
      'Xarope de milho rico em frutose (refrigerantes)'
    ]
  },
  {
    id: 'anemia',
    title: 'Anemia Ferropriva',
    description: 'Aumento da absorção de Ferro.',
    intro: 'Foco no aumento da ingestão de ferro heme (origem animal) e não-heme (vegetal), sempre associado a fatores que aumentam sua absorção.',
    recommendations: [
      'Sempre consuma uma fonte de Vitamina C junto com alimentos ricos em ferro.',
      'Evite fontes de cálcio e taninos junto com as refeições principais.',
      'Cozinhe em panelas de ferro, se possível.',
      'Trate a causa base (fluxo menstrual intenso, má absorção, etc).'
    ],
    foodsToPrefer: [
      'Carnes vermelhas e fígado (moderação)',
      'Feijões e lentilhas (deixar de molho por 12h)',
      'Vegetais verde-escuros (couve, espinafre)',
      'Frutas cítricas na sobremesa (laranja, abacaxi, acerola)',
      'Melaço de cana'
    ],
    foodsToAvoid: [
      'Leite e derivados (cálcio) junto com almoço/jantar',
      'Café, chá preto, mate e chocolate logo após as refeições (taninos/cafeína)',
      'Antiácidos (diminuem a absorção)',
      'Farelo de trigo cru em excesso (fitatos)'
    ]
  },
  {
    id: 'renal',
    title: 'Doença Renal Crônica (Conservador)',
    description: 'Proteção renal e controle de eletrólitos.',
    intro: 'Para pacientes renais não-dialíticos, o objetivo é retardar a progressão da doença controlando a ingestão de proteínas, sódio e, em estágios avançados, potássio e fósforo.',
    recommendations: [
      'Controle rigoroso da ingestão proteica (evitar excessos de carnes).',
      'Evite o uso de sal light (rico em potássio) e excesso de sal comum.',
      'Evite carambola (tóxica para renais).',
      'Monitore exames de potássio e fósforo para ajustes específicos.'
    ],
    foodsToPrefer: [
      'Proteínas de alto valor biológico em quantidades moderadas (ovo, peixe)',
      'Arroz, macarrão, azeite (fontes energéticas com pouca proteína)',
      'Frutas e vegetais com baixo potássio (maçã, pera, chuchu) se houver restrição',
      'Temperos naturais (sem sal)'
    ],
    foodsToAvoid: [
      'Embutidos e alimentos em conserva (excesso de sódio e aditivos)',
      'Refrigerantes à base de cola (fósforo)',
      'Carambola',
      'Excesso de carnes vermelhas',
      'Produtos industrializados com aditivos de fósforo'
    ]
  },
  {
    id: 'sarcopenia',
    title: 'Sarcopenia (Saúde do Idoso)',
    description: 'Manutenção de massa muscular na terceira idade.',
    intro: 'A perda de massa muscular em idosos aumenta o risco de quedas e mortalidade. A nutrição foca em superar a resistência anabólica típica do envelhecimento.',
    recommendations: [
      'Aumente o aporte de proteínas em todas as refeições (25-30g por refeição).',
      'Suplemente Vitamina D se houver deficiência (essencial para força muscular).',
      'Mantenha-se ativo (exercícios de resistência/força).',
      'Cuide da saúde bucal para garantir boa mastigação.'
    ],
    foodsToPrefer: [
      'Carnes de fácil mastigação (moída, desfiada), ovos, peixes',
      'Whey Protein (ótima digestibilidade para idosos)',
      'Leite e derivados (proteína + cálcio)',
      'Azeite de oliva e abacate (calorias saudáveis)',
      'Frutas variadas'
    ],
    foodsToAvoid: [
      'Sopas ralas sem proteína (baixa densidade nutricional)',
      'Excesso de chá com torrada (pobre em nutrientes)',
      'Alimentos muito duros ou secos (dificuldade de deglutição)',
      'Jejuns prolongados involuntários'
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
    id: 'enxaqueca',
    title: 'Enxaqueca',
    description: 'Identificação e exclusão de gatilhos alimentares.',
    intro: 'Certos alimentos contêm substâncias (tiramina, histamina, glutamato) que podem desencadear crises de enxaqueca em pessoas sensíveis. A hidratação também é fundamental.',
    recommendations: [
      'Mantenha rotina alimentar (não pule refeições).',
      'Hidrate-se bem ao longo do dia.',
      'Evite excesso de cafeína (efeito rebote) e álcool.',
      'Observe reações após consumo de alimentos fermentados ou curados.'
    ],
    foodsToPrefer: [
      'Alimentos frescos e naturais',
      'Gengibre (anti-inflamatório)',
      'Peixes ricos em ômega-3',
      'Sementes de abóbora e girassol (Magnésio)',
      'Água e chás de ervas (hortelã, camomila)'
    ],
    foodsToAvoid: [
      'Queijos envelhecidos/curados (Tiramina)',
      'Vinho tinto e cerveja',
      'Chocolate (para alguns pacientes)',
      'Glutamato monossódico (temperos prontos, comida chinesa)',
      'Embutidos (nitritos)'
    ]
  },
  {
    id: 'candidiese',
    title: 'Candidíase de Repetição',
    description: 'Controle de fungos e imunidade.',
    intro: 'O objetivo é "matar a fome" do fungo reduzindo açúcares simples e fermentados, além de fortalecer a imunidade e a barreira intestinal.',
    recommendations: [
      'Corte radicalmente açúcar, doces e farinhas brancas.',
      'Evite alimentos fermentados (cerveja, vinhos, pães de fermentação longa) na fase aguda.',
      'Use roupas íntimas de algodão e controle o estresse.',
      'Consuma antifúngicos naturais.'
    ],
    foodsToPrefer: [
      'Alho e cebola (antifúngicos naturais)',
      'Óleo de coco (ácido caprílico)',
      'Orégano e alecrim',
      'Vegetais com baixo amido',
      'Iogurte natural (probióticos)'
    ],
    foodsToAvoid: [
      'Açúcar de qualquer tipo',
      'Bebidas alcoólicas',
      'Frutas muito doces ou secas em excesso',
      'Queijos com fungo (gorgonzola, brie)',
      'Cogumelos (na fase aguda)'
    ]
  },
  {
    id: 'diverticulose',
    title: 'Diverticulose (Prevenção de Crises)',
    description: 'Saúde intestinal e fibras.',
    intro: 'Na fase assintomática (sem dor), o objetivo é evitar a constipação e inflamação dos divertículos através de uma dieta rica em fibras e água. Na crise (diverticulite), a conduta muda para dieta líquida/branda.',
    recommendations: [
      'Aumente progressivamente as fibras para 25-30g/dia.',
      'Beba muita água para as fibras não causarem constipação.',
      'Mastigue muito bem os alimentos.',
      'Sementes pequenas (tomate, kiwi, gergelim) não são mais proibidas, mas observe tolerância individual.'
    ],
    foodsToPrefer: [
      'Cereais integrais, aveia, psyllium',
      'Frutas com casca e bagaço',
      'Vegetais cozidos e crus',
      'Iogurtes e probióticos',
      'Água (fundamental)'
    ],
    foodsToAvoid: [
      'Alimentos refinados que prendem o intestino',
      'Carne vermelha em excesso (inflamatória)',
      'Excesso de açúcar e gorduras saturadas',
      'Laxantes estimulantes sem orientação'
    ]
  },
  {
    id: 'osteoporose',
    title: 'Osteoporose e Saúde Óssea',
    description: 'Aporte de Cálcio, Vitamina D e Magnésio.',
    intro: 'A nutrição visa prevenir a perda de massa óssea e risco de fraturas, garantindo a ingestão e absorção adequada de minerais essenciais.',
    recommendations: [
      'Exponha-se ao sol regularmente (Vitamina D) ou suplemente se necessário.',
      'Evite excesso de cafeína e sal, pois aumentam a excreção de cálcio.',
      'Mantenha aporte proteico adequado para estrutura óssea.',
      'Pratique exercícios de força.'
    ],
    foodsToPrefer: [
      'Laticínios (leite, iogurte, queijos)',
      'Vegetais verde-escuros (couve, brócolis, rúcula)',
      'Gergelim e Tahine',
      'Sardinha (com espinha)',
      'Ovos (Vitamina K2 e D)'
    ],
    foodsToAvoid: [
      'Refrigerantes (excesso de fósforo desequilibra o cálcio)',
      'Excesso de sal',
      'Excesso de álcool',
      'Excesso de café (mais de 3 xícaras/dia)',
      'Fibras em excesso (farelos) junto com fontes de cálcio'
    ]
  },
  {
    id: 'endometriose',
    title: 'Endometriose',
    description: 'Modulação hormonal e anti-inflamatória.',
    intro: 'A endometriose é uma doença inflamatória estrogênio-dependente. A dieta foca em reduzir a inflamação, melhorar a imunidade e auxiliar o fígado na eliminação do excesso de estrogênio.',
    recommendations: [
      'Adote uma dieta predominantemente anti-inflamatória.',
      'Reduza a exposição a disruptores endócrinos (plásticos, agrotóxicos).',
      'Controle o consumo de carne vermelha e gorduras saturadas.',
      'Aumente o consumo de fibras para auxiliar na excreção hormonal.'
    ],
    foodsToPrefer: [
      'Vegetais crucíferos (brócolis, couve-flor) - ajudam no detox de estrogênio',
      'Peixes ricos em ômega-3 (anti-inflamatório)',
      'Frutas vermelhas e cítricas (antioxidantes)',
      'Cúrcuma e Gengibre',
      'Sementes de linhaça e chia'
    ],
    foodsToAvoid: [
      'Carne vermelha em excesso',
      'Gorduras trans e frituras',
      'Álcool e Cafeína em excesso',
      'Açúcar e farinhas refinadas',
      'Laticínios e Glúten (se houver piora dos sintomas inflamatórios)'
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
    id: 'obstipacao',
    title: 'Constipação Intestinal (Intestino Preso)',
    description: 'Aumento de fibras e hidratação.',
    intro: 'Para o bom funcionamento intestinal, é necessário o "trípe": Fibras + Água + Atividade Física. Apenas aumentar fibras sem beber água pode piorar o quadro.',
    recommendations: [
      'Beba pelo menos 35ml de água por kg de peso ao dia.',
      'Tente estabelecer um horário fixo para ir ao banheiro.',
      'Consuma frutas com casca e bagaço sempre que possível.',
      'Use azeite de oliva cru sobre o almoço e jantar.'
    ],
    foodsToPrefer: [
      'Mamão, ameixa preta, laranja com bagaço',
      'Aveia, granola, psyllium',
      'Folhas cruas (alface, rúcula, couve)',
      'Sementes (chia, linhaça hidratada)',
      'Iogurte natural (probióticos)'
    ],
    foodsToAvoid: [
      'Farinhas refinadas em excesso (pão branco, bolacha água e sal)',
      'Banana maçã',
      'Goiaba (se prender o intestino)',
      'Maçã sem casca',
      'Líquidos açucarados em excesso'
    ]
  },
  {
    id: 'lactose',
    title: 'Intolerância à Lactose',
    description: 'Gestão de laticínios e enzimas.',
    intro: 'A incapacidade de digerir o açúcar do leite exige a exclusão ou redução de lactose, dependendo do grau de tolerância individual.',
    recommendations: [
      'Identifique seu grau de tolerância (alguns toleram queijos curados/iogurtes).',
      'Leia rótulos atentamente (soro de leite, leite em pó).',
      'Busque fontes alternativas de cálcio.',
      'Use a enzima lactase sob orientação se for consumir lácteos esporadicamente.'
    ],
    foodsToPrefer: [
      'Leites vegetais (amêndoa, coco, arroz, castanha)',
      'Produtos "Zero Lactose" (com enzima adicionada)',
      'Queijos duros/maturados (parmesão, provolone) - têm menos lactose',
      'Vegetais verde-escuros e gergelim (Cálcio)',
      'Iogurtes fermentados (bactérias consomem parte da lactose)'
    ],
    foodsToAvoid: [
      'Leite de vaca integral/desnatado tradicional',
      'Leite condensado e creme de leite tradicional',
      'Queijos frescos (minas frescal, ricota, cottage) - ricos em lactose',
      'Sorvetes à base de leite',
      'Molhos brancos com leite comum'
    ]
  },
  {
    id: 'gluten',
    title: 'Sensibilidade ao Glúten / Celíaca',
    description: 'Isenção de proteínas do trigo, centeio e cevada.',
    intro: 'Para celíacos, a exclusão deve ser total (risco de contaminação cruzada). Para sensibilidade não-celíaca, a redução visa melhora de sintomas inflamatórios e digestivos.',
    recommendations: [
      'Atenção total à contaminação cruzada (utensílios, torradeiras) se for Celíaco.',
      'Leia rótulos: "Contém Glúten" é obrigatório.',
      'Cuidado com molho shoyu, cerveja e malte.',
      'Prefira alimentos naturalmente sem glúten em vez de processados "gluten-free" cheios de amido.'
    ],
    foodsToPrefer: [
      'Arroz, milho, batata, mandioca, inhame',
      'Quinoa, trigo sarraceno, amaranto',
      'Tapioca e polvilho',
      'Frutas, verduras, carnes e ovos',
      'Farinha de amêndoas, coco ou arroz'
    ],
    foodsToAvoid: [
      'Trigo (pães, bolos, massas tradicionais)',
      'Centeio e Cevada (cerveja, malte)',
      'Aveia (se não for certificada sem glúten)',
      'Molho Shoyu tradicional (contém trigo)',
      'Produtos empanados'
    ]
  }
];
