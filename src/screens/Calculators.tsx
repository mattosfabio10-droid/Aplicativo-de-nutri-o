
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import Layout from '../components/Layout';
import { Button, Input, Select } from '../components/UI';

const Calculators: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateIMC = () => {
    const h = Number(height) / 100;
    const imc = Number(weight) / (h * h);
    setResult(imc.toFixed(2));
  };

  return (
    <Layout title="Calculadoras">
      <div className="max-w-md mx-auto bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h3 className="text-white font-bold mb-4 flex gap-2"><Calculator /> IMC</h3>
        <Input label="Peso (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
        <Input label="Altura (cm)" type="number" value={height} onChange={e => setHeight(e.target.value)} />
        <Button onClick={calculateIMC}>Calcular</Button>
        {result && <div className="mt-4 text-center text-2xl text-white font-bold">{result}</div>}
      </div>
    </Layout>
  );
};

export default Calculators;
