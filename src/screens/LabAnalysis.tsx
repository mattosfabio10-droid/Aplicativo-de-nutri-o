
import React, { useState } from 'react';
import { FlaskConical, Sparkles } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '../components/UI';
import { useApp } from '../context/AppContext';
import { analyzeLabResults } from '../services/aiNutrition';

const LabAnalysis: React.FC = () => {
  const { currentPatient } = useApp();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input || !currentPatient) return;
    setLoading(true);
    setResult(await analyzeLabResults(input, currentPatient));
    setLoading(false);
  };

  if (!currentPatient) return <Layout title="Laboratório">Selecione um paciente.</Layout>;

  return (
    <Layout title="Análise de Exames (IA)" showBack>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
         <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col">
            <textarea className="flex-1 bg-black border border-gray-700 rounded-lg p-4 text-gray-300 resize-none mb-4" placeholder="Cole os resultados aqui..." value={input} onChange={e => setInput(e.target.value)} />
            <Button onClick={handleAnalyze} disabled={loading}>{loading ? 'Analisando...' : 'Interpretar com IA'}</Button>
         </div>
         <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 overflow-y-auto">
            {result ? <div className="prose prose-invert prose-sm whitespace-pre-line text-gray-300">{result}</div> : <div className="h-full flex items-center justify-center text-gray-600 flex-col"><FlaskConical size={48} /><p>O resultado aparecerá aqui.</p></div>}
         </div>
      </div>
    </Layout>
  );
};

export default LabAnalysis;
