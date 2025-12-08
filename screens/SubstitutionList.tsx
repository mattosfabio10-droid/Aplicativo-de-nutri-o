
import React, { useState } from 'react';
import { Search, Info, Book, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import Layout from '../components/Layout';
import { Input } from '../components/UI';

interface FoodItem {
  name: string;
  qty: string;
}

interface Category {
  id: string;
  name: string;
  items: FoodItem[];
  caloriesRef?: string; // Referência calórica média para o grupo
}

// Baseado em listas de substituição padrão (TACO/SBD)
const foodDatabase: Category[] = [
  { 
    id: 'carb', 
    name: 'Amiláceos (Carboidratos)', 
    caloriesRef: '~150 kcal (porção média)',
    items: [
      { name: 'Arroz Integral Cozido', qty: '100g (4 col. sopa cheias)' },
      { name: 'Arroz Branco Cozido', qty: '100g (4 col. sopa cheias)' },
      { name: 'Arroz 7 Grãos', qty: '80g (3 col. sopa)' },
      { name: 'Macarrão Integral Cozido', qty: '80g (1 pegador pequeno)' },
      { name: 'Macarrão de Sêmola Cozido', qty: '80g (1 pegador pequeno)' },
      { name: 'Batata Inglesa Cozida/Assada', qty: '140g (1 e ½ unidade média)' },
      { name: 'Batata Doce Cozida', qty: '100g (1 unidade pequena)' },
      { name: 'Batata Baroa (Mandioquinha)', qty: '120g (3 col. servir)' },
      { name: 'Mandioca / Aipim Cozido', qty: '80g (1 pedaço médio)' },
      { name: 'Inhame / Cará Cozido', qty: '100g (2 col. sopa cheias)' },
      { name: 'Milho Verde (Espiga)', qty: '1 unidade grande (100g grão)' },
      { name: 'Milho Verde (Enlatado)', qty: '5 col. sopa (100g)' },
      { name: 'Aveia em Flocos', qty: '30g (2 col. sopa cheias)' },
      { name: 'Farelo de Aveia', qty: '30g (2 col. sopa)' },
      { name: 'Granola (Sem açúcar)', qty: '30g (2 col. sopa)' },
      { name: 'Pão Francês', qty: '1 unidade (50g) sem miolo' },
      { name: 'Pão de Forma Integral', qty: '2 fatias (50g)' },
      { name: 'Pão Sírio / Rap10', qty: '1 unidade média' },
      { name: 'Tapioca (Goma hidratada)', qty: '60g (3 col. sopa cheias)' },
      { name: 'Cuscuz de Milho (Cozido)', qty: '100g (1 fatia média)' },
      { name: 'Pipoca (Sem óleo)', qty: '3 xícaras de chá (estourada)' },
      { name: 'Farinha de Mandioca', qty: '30g (2 col. sopa)' },
      { name: 'Farinha de Aveia', qty: '30g (2 col. sopa)' },
      { name: 'Purê de Batata', qty: '120g (3 col. servir)' }
    ] 
  },
  { 
    id: 'prot', 
    name: 'Proteínas / Carnes / Ovos', 
    caloriesRef: '~120-150 kcal (porção média)',
    items: [
      { name: 'Frango (Peito Grelhado/Cozido)', qty: '100g (1 filé médio)' },
      { name: 'Frango Desfiado', qty: '100g (4 col. sopa cheias)' },
      { name: 'Sobrecoxa de Frango (Sem pele)', qty: '1 unidade pequena (80g)' },
      { name: 'Carne Bovina Magra (Patinho)', qty: '90g (1 bife pequeno)' },
      { name: 'Carne Moída (Patinho/Músculo)', qty: '90g (4 col. sopa)' },
      { name: 'Alcatra Grelhada (sem gordura)', qty: '80g (1 bife pequeno)' },
      { name: 'Filé Mignon (Sem gordura)', qty: '90g (1 bife pequeno)' },
      { name: 'Peixe Branco (Tilápia/Merluza)', qty: '130g (1 filé grande)' },
      { name: 'Salmão / Atum (Grelhado)', qty: '80g (1 posta pequena)' },
      { name: 'Atum Sólido (Lata em água)', qty: '1 lata drenada (120g)' },
      { name: 'Sardinha (Lata em óleo - drenada)', qty: '2 unidades (60g)' },
      { name: 'Ovo de Galinha (Cozido/Poché)', qty: '2 unidades grandes' },
      { name: 'Clara de Ovo', qty: '5 unidades' },
      { name: 'Lombo Suíno (Magro/Assado)', qty: '90g (2 fatias finas)' },
      { name: 'Carne Seca (Dessalgada/Cozida)', qty: '60g (3 col. sopa)' },
      { name: 'Fígado Bovino Grelhado', qty: '90g (1 bife)' },
      { name: 'Queijo Minas Frescal', qty: '50g (2 fatias médias)' },
      { name: 'Queijo Cottage', qty: '4 col. sopa (80g)' },
      { name: 'Ricota', qty: '70g (1 fatia grossa)' },
      { name: 'Tofu (Queijo de soja)', qty: '120g (1 fatia grande)' }
    ] 
  },
  { 
    id: 'leg', 
    name: 'Leguminosas (Grãos)', 
    caloriesRef: '~60-70 kcal (porção média)',
    items: [
      { name: 'Feijão Preto (50% Caldo / 50% Grão)', qty: '1 concha pequena (80g)' },
      { name: 'Feijão Carioca', qty: '1 concha pequena (80g)' },
      { name: 'Feijão Branco / Fradinho', qty: '1 concha pequena' },
      { name: 'Lentilha Cozida', qty: '3 col. sopa cheias' },
      { name: 'Grão de Bico Cozido', qty: '3 col. sopa cheias' },
      { name: 'Ervilha Seca Cozida', qty: '4 col. sopa' },
      { name: 'Soja em Grãos Cozida', qty: '3 col. sopa (60g)' },
      { name: 'Edamame', qty: '80g' }
    ] 
  },
  { 
    id: 'fruit', 
    name: 'Frutas', 
    caloriesRef: '~60-70 kcal (porção média)',
    items: [
      { name: 'Abacaxi', qty: '2 fatias finas (120g)' },
      { name: 'Banana Prata', qty: '1 unidade pequena (60g)' },
      { name: 'Banana Nanica', qty: '1/2 unidade (50g)' },
      { name: 'Maçã (Fuji/Gala)', qty: '1 unidade média (100g)' },
      { name: 'Pêra', qty: '1 unidade média' },
      { name: 'Mamão Papaia', qty: '1/2 banda (140g)' },
      { name: 'Mamão Formosa', qty: '1 fatia média (160g)' },
      { name: 'Laranja (Pera/Bahia)', qty: '1 unidade média' },
      { name: 'Mexerica / Tangerina', qty: '1 unidade grande' },
      { name: 'Morangos', qty: '10 unidades grandes (250g)' },
      { name: 'Uva (Rubi/Itália)', qty: '12 bagos médios' },
      { name: 'Uva (Niágara/Sem semente)', qty: '15 bagos pequenos' },
      { name: 'Melancia', qty: '1 fatia média (250g)' },
      { name: 'Melão', qty: '1 fatia grande (250g)' },
      { name: 'Manga (Tommy/Palmer)', qty: '1/2 unidade pequena (100g)' },
      { name: 'Kiwi', qty: '2 unidades médias' },
      { name: 'Goiaba', qty: '1 unidade média' },
      { name: 'Pêssego', qty: '2 unidades pequenas' },
      { name: 'Ameixa Fresca', qty: '3 unidades médias' },
      { name: 'Caqui', qty: '1/2 unidade' },
      { name: 'Caju', qty: '2 unidades médias' },
      { name: 'Abacate', qty: '2 col. sopa rasas (40g) - Atenção à gordura' }
    ] 
  },
  { 
    id: 'veg_a', 
    name: 'Hortaliças A (Livre/Baixa Cal)', 
    caloriesRef: 'Calorias desprezíveis',
    items: [
      { name: 'Alface (Todas)', qty: 'À vontade' },
      { name: 'Rúcula / Agrião', qty: 'À vontade' },
      { name: 'Espinafre (Cru)', qty: 'À vontade' },
      { name: 'Couve (Crua)', qty: 'À vontade' },
      { name: 'Repolho (Roxo/Branco)', qty: 'À vontade' },
      { name: 'Acelga', qty: 'À vontade' },
      { name: 'Pepino', qty: 'À vontade' },
      { name: 'Tomate', qty: 'À vontade' },
      { name: 'Rabanete', qty: 'À vontade' },
      { name: 'Aipo / Salsão', qty: 'À vontade' },
      { name: 'Abobrinha (Verde)', qty: 'À vontade' },
      { name: 'Berinjela', qty: 'À vontade' },
      { name: 'Pimentão', qty: 'À vontade' },
      { name: 'Brócolis / Couve-flor', qty: 'À vontade (Preferir vapor)' },
      { name: 'Palmito', qty: 'À vontade' },
      { name: 'Cogumelos (Champignon/Shimeji)', qty: 'À vontade' }
    ] 
  },
  { 
    id: 'veg_b', 
    name: 'Hortaliças B (Controlado)', 
    caloriesRef: '~35-40 kcal (porção média)',
    items: [
      { name: 'Abóbora Cabotiá / Moranga', qty: '3 col. sopa (80g)' },
      { name: 'Cenoura (Cozida)', qty: '4 col. sopa picada (80g)' },
      { name: 'Beterraba (Cozida)', qty: '3 col. sopa picada (70g)' },
      { name: 'Vagem Cozida', qty: '4 col. sopa cheias' },
      { name: 'Quiabo Refogado', qty: '4 col. sopa cheias' },
      { name: 'Ervilha Torta', qty: '6 unidades' },
      { name: 'Chuchu (Cozido)', qty: '4 col. sopa cheias' },
      { name: 'Couve-Flor Gratinada', qty: '3 col. sopa' }
    ] 
  },
  { 
    id: 'fat', 
    name: 'Gorduras & Oleaginosas', 
    caloriesRef: '~45-70 kcal (porção)',
    items: [
      { name: 'Azeite de Oliva Extra Virgem', qty: '1 col. sobremesa (5ml)' },
      { name: 'Castanha do Pará', qty: '2 unidades médias' },
      { name: 'Castanha de Caju (Torrada s/ sal)', qty: '5 unidades' },
      { name: 'Nozes', qty: '3 metades' },
      { name: 'Amêndoas', qty: '6 unidades' },
      { name: 'Pasta de Amendoim (Integral)', qty: '1 col. sopa rasa' },
      { name: 'Manteiga / Ghee', qty: '1 ponta de faca (5g)' },
      { name: 'Coco Seco', qty: '1 pedaço pequeno (20g)' },
      { name: 'Semente de Chia / Linhaça', qty: '1 col. sopa rasa' },
      { name: 'Gergelim', qty: '1 col. sopa rasa' }
    ] 
  },
  { 
    id: 'dairy', 
    name: 'Leites e Derivados', 
    caloriesRef: '~70-100 kcal (porção)',
    items: [
      { name: 'Leite de Vaca Desnatado', qty: '200ml (1 copo americano)' },
      { name: 'Leite Semi-desnatado', qty: '150ml' },
      { name: 'Leite em Pó Desnatado', qty: '2 col. sopa' },
      { name: 'Iogurte Natural Desnatado', qty: '1 unidade (160g)' },
      { name: 'Iogurte Grego Zero', qty: '1 unidade (100g)' },
      { name: 'Coalhada Seca', qty: '1 col. sopa cheia' },
      { name: 'Bebida Vegetal (Amêndoa/Castanha - s/ açúcar)', qty: '200ml' },
      { name: 'Whey Protein (Isolado/Concentrado)', qty: '20g (aprox. 1 scoop - verificar rótulo)' }
    ] 
  }
];

const SubstitutionList: React.FC = () => {
  const [activeTab, setActiveTab] = useState(foodDatabase[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const activeCategory = foodDatabase.find(c => c.id === activeTab);
  
  // Search Logic
  const filteredCategories = searchTerm 
    ? foodDatabase.map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      })).filter(cat => cat.items.length > 0)
    : [];

  return (
    <Layout title="Lista de Substituição Profissional" showBack>
      
      {/* Help / Instructions Section */}
      <div className="mb-6">
        <button 
          onClick={() => setShowHelp(!showHelp)}
          className="w-full flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl hover:bg-gray-800 transition-colors"
        >
           <div className="flex items-center gap-3">
              <Book size={20} className="text-primary" />
              <div className="text-left">
                 <h3 className="font-bold text-white text-sm">Como usar a lista de substituição?</h3>
                 <p className="text-xs text-gray-400">Clique para ver regras importantes</p>
              </div>
           </div>
           {showHelp ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
        </button>

        {showHelp && (
          <div className="mt-2 bg-gray-950/50 border border-gray-800 rounded-xl p-5 animate-slide-in">
             <div className="grid gap-4">
                <div className="flex gap-3">
                   <div className="mt-1"><AlertTriangle size={18} className="text-yellow-400" /></div>
                   <div>
                      <h4 className="font-bold text-white text-sm mb-1">1. Respeite o Grupo Alimentar</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                         Troque carboidrato por carboidrato, proteína por proteína. 
                         <br/><span className="text-red-400">Errado:</span> Trocar 100g de Frango por 100g de Arroz.
                         <br/><span className="text-green-400">Certo:</span> Trocar 100g de Arroz por 100g de Batata.
                      </p>
                   </div>
                </div>
                
                <div className="flex gap-3">
                   <div className="mt-1"><Scale size={18} className="text-blue-400" /></div>
                   <div>
                      <h4 className="font-bold text-white text-sm mb-1">2. Quantidade é tudo</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                         Alimentos têm densidades calóricas diferentes. Esta lista já calcula as equivalências.
                         <br/>Ex: 1 Pão Francês (50g) equivale a 4 colheres de arroz (100g), não a 50g de arroz.
                      </p>
                   </div>
                </div>

                <div className="flex gap-3">
                   <div className="mt-1"><CheckCircle size={18} className="text-primary" /></div>
                   <div>
                      <h4 className="font-bold text-white text-sm mb-1">3. Modo de Preparo</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                         Dê preferência a cozidos, assados, grelhados ou no vapor. Frituras ou molhos gordurosos alteram completamente a caloria do alimento e invalidam a substituição.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
        <Input 
          placeholder="Buscar alimento (ex: batata, frango)..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="!pl-10 !mb-0"
        />
      </div>

      {!searchTerm ? (
        <>
          {/* Categories Slider */}
          <div className="mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide -mx-4 px-4">
            <div className="flex gap-2">
              {foodDatabase.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === cat.id 
                      ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-105' 
                      : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* List Content */}
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl font-bold flex items-center gap-2">
                <span className="w-2 h-6 bg-primary rounded-full inline-block"></span>
                {activeCategory?.name}
              </h3>
              {activeCategory?.caloriesRef && (
                 <span className="text-[10px] bg-gray-800 px-2 py-1 rounded border border-gray-700 text-gray-400">
                    Ref: {activeCategory.caloriesRef}
                 </span>
              )}
            </div>
            
            <div className="grid gap-3">
              {activeCategory?.items.map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors group">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-primary transition-colors"></div>
                     <span className="text-gray-200 font-medium text-sm md:text-base">{item.name}</span>
                  </div>
                  <span className="text-primary font-bold text-xs md:text-sm bg-primary/10 px-3 py-1.5 rounded-md mt-2 md:mt-0 inline-block text-center md:text-right border border-primary/20">
                    {item.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Search Results */
        <div className="animate-fade-in space-y-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(cat => (
              <div key={cat.id}>
                 <h4 className="text-primary font-bold uppercase text-xs mb-3 tracking-wider flex items-center gap-2">
                    {cat.name} 
                    <span className="text-gray-600 font-normal normal-case">- {cat.caloriesRef}</span>
                 </h4>
                 <div className="grid gap-3">
                    {cat.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
                        <span className="text-gray-200 font-medium">{item.name}</span>
                        <span className="text-primary font-bold text-sm mt-1 md:mt-0">{item.qty}</span>
                      </div>
                    ))}
                 </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500 flex flex-col items-center">
              <Info size={40} className="mb-2 opacity-20" />
              <p>Nenhum alimento encontrado para "{searchTerm}"</p>
              <p className="text-xs mt-1">Tente buscar pelo nome genérico (ex: "pão" ao invés de "francês")</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default SubstitutionList;
