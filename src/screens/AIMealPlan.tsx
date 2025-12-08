import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { generateMealPlanWithAI } from '../services/aiNutrition';
import { Button } from '../components/UI';

const AIMealPlan: React.FC = () => {
  const { currentPatient } = useApp();
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const handleGenerate = async () => {
    if (!currentPatient) return;
    setLoading(true);
    try {
        const result = await generateMealPlanWithAI(currentPatient);
        setPlan(result);
    } catch (e) { alert("Erro na IA. Verifique a chave API."); }
    setLoading(false);
  };

  if (!currentPatient) return <Layout title="IA">Selecione paciente.</Layout>;

  return (
    <Layout title="Gerador de Dieta IA" showBack>
       {!plan ? (
           <div className="text-center py-10">
               <h2 className="text-2xl font-bold text-white mb-4">Gerar Plano para {currentPatient.name}</h2>
               <Button onClick={handleGenerate} disabled={loading} className="max-w-xs mx-auto">
                   {loading ? 'Criando...' : 'Gerar com IA'} <Sparkles size={18} />
               </Button>
           </div>
       ) : (
           <div className="space-y-6">
               <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                   <h3 className="text-xl font-bold text-white mb-2">Plano Gerado ({plan.totalCalories} kcal)</h3>
                   <div className="space-y-4">
                       {plan.meals.map((meal: any) => (
                           <div key={meal.id} className="border-b border-gray-800 pb-2">
                               <h4 className="text-primary font-bold">{meal.name} - {meal.time}</h4>
                               <ul className="text-sm text-gray-300 pl-4 list-disc">
                                   {meal.items.map((item: any, i: number) => (
                                       <li key={i}>{item.name} ({item.quantity})</li>
                                   ))}
                               </ul>
                           </div>
                       ))}
                   </div>
               </div>
               <Button variant="ghost" onClick={() => setPlan(null)}>Voltar</Button>
           </div>
       )}
    </Layout>
  );
};
export default AIMealPlan;