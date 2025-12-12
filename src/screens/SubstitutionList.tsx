
import React, { useState } from 'react';
import { Search, Book, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';
import { Input } from '../components/UI';

interface FoodItem { name: string; qty: string; }
interface Category { id: string; name: string; items: FoodItem[]; caloriesRef?: string; }

const foodDatabase: Category[] = [
  { id: 'carb', name: 'Carboidratos', items: [{ name: 'Arroz', qty: '100g' }, { name: 'Batata', qty: '100g' }] },
  { id: 'prot', name: 'Proteínas', items: [{ name: 'Frango', qty: '100g' }, { name: 'Ovo', qty: '2 un' }] }
];

const SubstitutionList: React.FC = () => {
  const [activeTab, setActiveTab] = useState(foodDatabase[0].id);
  const activeCategory = foodDatabase.find(c => c.id === activeTab);

  return (
    <Layout title="Lista de Substituição" showBack>
      <div className="flex gap-2 mb-6">
        {foodDatabase.map(cat => <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`px-4 py-2 rounded-lg ${activeTab === cat.id ? 'bg-primary text-black' : 'bg-gray-900 text-white'}`}>{cat.name}</button>)}
      </div>
      <div className="space-y-2">
        {activeCategory?.items.map((item, idx) => (
            <div key={idx} className="flex justify-between p-4 bg-gray-900 rounded-lg"><span>{item.name}</span><span className="text-primary">{item.qty}</span></div>
        ))}
      </div>
    </Layout>
  );
};

export default SubstitutionList;
