
import React, { useState, useEffect } from 'react';
import { Calculator, Flame, Droplet, TrendingUp, Activity, Dumbbell, PieChart, Zap } from 'lucide-react';
import Layout from '../components/Layout';
import { Button, Input, Select } from '../components/UI';
import { useApp } from '../context/AppContext';

const Calculators: React.FC = () => {
  const { currentPatient } = useApp();
  const [activeTab, setActiveTab] = useState<'metabolism' | 'macros' | 'bmi' | 'hydration' | 'supplements'>('metabolism');

  // Input States (Shared)
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityFactor, setActivityFactor] = useState('1.2');

  // Macros State
  const [macroCalories, setMacroCalories] = useState('2000');
  const [ratioProt, setRatioProt] = useState('30');
  const [ratioCarb, setRatioCarb] = useState('40');
  const [ratioFat, setRatioFat] = useState('30');

  // Result States
  const [resultBMR, setResultBMR] = useState<number | null>(null);
  const [resultTDEE, setResultTDEE] = useState<number | null>(null);
  const [resultBMI, setResultBMI] = useState<number | null>(null);
  const [resultIdealWeight, setResultIdealWeight] = useState<{ min: number, max: number } | null>(null);
  const [resultWater, setResultWater] = useState<number | null>(null);
  
  // Supplements
  const [supplements, setSupplements] = useState<{ creatine: number, betaAlanine: string, caffeine: string } | null>(null);

  useEffect(() => {
    if (currentPatient) {
      setWeight(currentPatient.weight > 0 ? currentPatient.weight.toString() : '');
      setHeight(currentPatient.height > 0 ? currentPatient.height.toString() : '');
      setAge(currentPatient.age > 0 ? currentPatient.age.toString() : '');
      setGender(currentPatient.gender);
      const factorMap: Record<string, string> = {
        'sedentary': '1.2',
        'moderate': '1.375',
        'active': '1.55'
      };
      setActivityFactor(factorMap[currentPatient.activityLevel] || '1.2');
    }
  }, [currentPatient]);

  const calculateMetabolism = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const factor = parseFloat(activityFactor);

    if (!w || !h || !a) return;

    // Mifflin-St Jeor
    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
    } else {
      bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
    }

    setResultBMR(Math.round(bmr));
    setResultTDEE(Math.round(bmr * factor));
    setMacroCalories(Math.round(bmr * factor).toString()); // Auto-fill macros
  };

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h) return;

    const bmi = w / ((h / 100) * (h / 100));
    setResultBMI(parseFloat(bmi.toFixed(2)));

    // Peso Ideal (IMC 18.5 a 24.9)
    const minW = 18.5 * ((h / 100) * (h / 100));
    const maxW = 24.9 * ((h / 100) * (h / 100));
    setResultIdealWeight({ min: parseFloat(minW.toFixed(1)), max: parseFloat(maxW.toFixed(1)) });
  };

  const calculateHydration = () => {
    const w = parseFloat(weight);
    if (!w) return;
    setResultWater(Math.round(w * 35)); // 35ml/kg Standard
  };

  const calculateSupplements = () => {
      const w = parseFloat(weight);
      if (!w) return;
      setSupplements({
          creatine: parseFloat((w * 0.07).toFixed(1)), // 0.07g/kg standard saturação leve
          betaAlanine: '3.2g - 6.4g',
          caffeine: `${Math.round(w * 3)}mg - ${Math.round(w * 6)}mg` // 3-6mg/kg
      });
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo do Peso', color: 'text-blue-400', bg: 'bg-blue-900/20' };
    if (bmi < 24.9) return { label: 'Eutrofia (Normal)', color: 'text-green-400', bg: 'bg-green-900/20' };
    if (bmi < 29.9) return { label: 'Sobrepeso', color: 'text-yellow-400', bg: 'bg-yellow-900/20' };
    if (bmi < 34.9) return { label: 'Obesidade Grau I', color: 'text-orange-400', bg: 'bg-orange-900/20' };
    if (bmi < 39.9) return { label: 'Obesidade Grau II', color: 'text-red-400', bg: 'bg-red-900/20' };
    return { label: 'Obesidade Grau III', color: 'text-red-600', bg: 'bg-red-900/30' };
  };

  // Macros Calculation
  const totalRatio = Number(ratioProt) + Number(ratioCarb) + Number(ratioFat);
  const cals = Number(macroCalories);
  const gramsProt = Math.round((cals * (Number(ratioProt)/100)) / 4);
  const gramsCarb = Math.round((cals * (Number(ratioCarb)/100)) / 4);
  const gramsFat = Math.round((cals * (Number(ratioFat)/100)) / 9);

  return (
    <Layout title="Calculadoras Nutricionais" showBack>
      
      {/* Tabs */}
      <div className="flex bg-gray-900 p-1 rounded-xl mb-6 border border-gray-800 overflow-x-auto">
        {[
            { id: 'metabolism', label: 'Metabolismo', icon: <Flame size={18} /> },
            { id: 'macros', label: 'Macros', icon: <PieChart size={18} /> },
            { id: 'bmi', label: 'IMC & Peso', icon: <Activity size={18} /> },
            { id: 'hydration', label: 'Hidratação', icon: <Droplet size={18} /> },
            { id: 'supplements', label: 'Suplementos', icon: <Zap size={18} /> },
        ].map(tab => (
            <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 text-xs md:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
                {tab.icon} {tab.label}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Input Form (Adaptive) */}
        <div className="lg:col-span-1 bg-gray-900 border border-gray-800 p-6 rounded-xl h-fit">
           <div className="flex items-center gap-2 mb-6 text-primary">
              <Calculator size={20} />
              <h3 className="font-bold uppercase text-sm tracking-wider">
                  {activeTab === 'macros' ? 'Definição de Meta' : 'Dados Biométricos'}
              </h3>
           </div>
           
           <div className="space-y-4">
              {activeTab === 'macros' ? (
                  <>
                    <Input label="Meta Calórica (Kcal)" type="number" value={macroCalories} onChange={e => setMacroCalories(e.target.value)} />
                    <div className="space-y-4 pt-2">
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-red-400 font-bold">Proteína (%)</span>
                                <span className="text-white">{ratioProt}%</span>
                            </div>
                            <input type="range" min="10" max="60" value={ratioProt} onChange={e => setRatioProt(e.target.value)} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-400" />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-blue-400 font-bold">Carboidrato (%)</span>
                                <span className="text-white">{ratioCarb}%</span>
                            </div>
                            <input type="range" min="10" max="80" value={ratioCarb} onChange={e => setRatioCarb(e.target.value)} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-400" />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-yellow-400 font-bold">Gordura (%)</span>
                                <span className="text-white">{ratioFat}%</span>
                            </div>
                            <input type="range" min="10" max="60" value={ratioFat} onChange={e => setRatioFat(e.target.value)} className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400" />
                        </div>
                        <div className={`text-xs text-center font-bold p-2 rounded ${totalRatio === 100 ? 'text-green-400 bg-green-900/20' : 'text-red-400 bg-red-900/20'}`}>
                            Total: {totalRatio}% {totalRatio !== 100 && '(Ajuste para 100%)'}
                        </div>
                    </div>
                  </>
              ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Peso (kg)" type="number" value={weight} onChange={e => setWeight(e.target.value)} />
                        <Input label="Altura (cm)" type="number" value={height} onChange={e => setHeight(e.target.value)} />
                    </div>
                    {activeTab === 'metabolism' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Idade" type="number" value={age} onChange={e => setAge(e.target.value)} />
                                <Select label="Sexo" value={gender} onChange={e => setGender(e.target.value as any)}>
                                    <option value="male">Masculino</option>
                                    <option value="female">Feminino</option>
                                </Select>
                            </div>
                            <Select label="Nível de Atividade" value={activityFactor} onChange={e => setActivityFactor(e.target.value)}>
                                <option value="1.2">Sedentário (Pouco/Nenhum)</option>
                                <option value="1.375">Leve (1-3 dias/sem)</option>
                                <option value="1.55">Moderado (3-5 dias/sem)</option>
                                <option value="1.725">Intenso (6-7 dias/sem)</option>
                                <option value="1.9">Muito Intenso (Atleta)</option>
                            </Select>
                        </>
                    )}
                    <Button onClick={() => {
                        if (activeTab === 'metabolism') calculateMetabolism();
                        if (activeTab === 'bmi') calculateBMI();
                        if (activeTab === 'hydration') calculateHydration();
                        if (activeTab === 'supplements') calculateSupplements();
                    }}>
                        Calcular
                    </Button>
                  </>
              )}
           </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'metabolism' && (
                <div className="animate-fade-in space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                            <span className="text-gray-500 text-xs font-bold uppercase mb-2">Metabolismo Basal (TMB)</span>
                            <div className="text-4xl font-bold text-white mb-1">
                                {resultBMR ? resultBMR : '--'} <span className="text-sm font-normal text-gray-400">kcal</span>
                            </div>
                            <span className="text-gray-600 text-xs">Gasto em repouso absoluto</span>
                        </div>

                        <div className="bg-gray-900 border border-primary/30 p-6 rounded-xl flex flex-col items-center justify-center relative overflow-hidden shadow-lg shadow-primary/5">
                            <span className="text-primary text-xs font-bold uppercase mb-2">Gasto Energético Total (VET)</span>
                            <div className="text-4xl font-bold text-white mb-1">
                                {resultTDEE ? resultTDEE : '--'} <span className="text-sm font-normal text-gray-400">kcal</span>
                            </div>
                            <span className="text-gray-400 text-xs">Necessidade para manter peso</span>
                        </div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-gray-800 text-center text-sm text-gray-400">
                        Cálculo baseado na fórmula de <strong>Mifflin-St Jeor</strong>, considerada padrão ouro para indivíduos não-obesos.
                    </div>
                </div>
            )}

            {activeTab === 'macros' && (
                <div className="animate-fade-in space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-xl text-center">
                            <h4 className="text-red-400 font-bold text-sm uppercase mb-2">Proteína</h4>
                            <p className="text-3xl font-bold text-white">{gramsProt}g</p>
                            <p className="text-xs text-gray-500 mt-1">{ratioProt}%</p>
                        </div>
                        <div className="bg-blue-900/10 border border-blue-900/30 p-6 rounded-xl text-center">
                            <h4 className="text-blue-400 font-bold text-sm uppercase mb-2">Carboidrato</h4>
                            <p className="text-3xl font-bold text-white">{gramsCarb}g</p>
                            <p className="text-xs text-gray-500 mt-1">{ratioCarb}%</p>
                        </div>
                        <div className="bg-yellow-900/10 border border-yellow-900/30 p-6 rounded-xl text-center">
                            <h4 className="text-yellow-400 font-bold text-sm uppercase mb-2">Gordura</h4>
                            <p className="text-3xl font-bold text-white">{gramsFat}g</p>
                            <p className="text-xs text-gray-500 mt-1">{ratioFat}%</p>
                        </div>
                    </div>
                    
                    {weight && (
                        <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 flex justify-between px-8">
                            <div className="text-center">
                                <span className="block text-xs text-gray-500">Proteína/kg</span>
                                <span className="text-white font-bold">{(gramsProt / parseFloat(weight)).toFixed(1)} g/kg</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-xs text-gray-500">Gordura/kg</span>
                                <span className="text-white font-bold">{(gramsFat / parseFloat(weight)).toFixed(1)} g/kg</span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'bmi' && (
                <div className="animate-fade-in space-y-6">
                    <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl flex flex-col items-center justify-center">
                        <span className="text-gray-500 text-sm font-bold uppercase mb-2">Índice de Massa Corporal</span>
                        <div className="text-6xl font-bold text-white mb-4">
                            {resultBMI ? resultBMI : '--'}
                        </div>
                        {resultBMI && (
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${getBMIStatus(resultBMI).bg} ${getBMIStatus(resultBMI).color}`}>
                                {getBMIStatus(resultBMI).label}
                            </span>
                        )}
                    </div>

                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <TrendingUp size={18} className="text-green-400" /> Faixa de Peso Ideal (IMC 18.5 - 24.9)
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/40 p-4 rounded-lg text-center border border-gray-800">
                                <span className="block text-xs text-gray-500 uppercase">Mínimo</span>
                                <span className="text-xl font-bold text-white">{resultIdealWeight ? `${resultIdealWeight.min} kg` : '--'}</span>
                            </div>
                            <div className="bg-black/40 p-4 rounded-lg text-center border border-gray-800">
                                <span className="block text-xs text-gray-500 uppercase">Máximo</span>
                                <span className="text-xl font-bold text-white">{resultIdealWeight ? `${resultIdealWeight.max} kg` : '--'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'hydration' && (
                <div className="animate-fade-in">
                    <div className="bg-blue-900/10 border border-blue-900/30 p-8 rounded-xl flex flex-col items-center justify-center text-center">
                        <div className="bg-blue-500/20 p-4 rounded-full mb-4 text-blue-400">
                            <Droplet size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Meta Hídrica Diária</h3>
                        <div className="text-5xl font-bold text-blue-100 mb-2">
                            {resultWater ? (resultWater / 1000).toFixed(2) : '--'} <span className="text-2xl font-normal text-blue-400">Litros</span>
                        </div>
                        <span className="text-sm text-blue-300">
                            ~ {resultWater ? Math.ceil(resultWater / 250) : '--'} copos de 250ml
                        </span>
                    </div>
                </div>
            )}

            {activeTab === 'supplements' && (
                <div className="animate-fade-in space-y-4">
                    <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-white font-bold flex items-center gap-2"><Dumbbell size={18} className="text-purple-400"/> Creatina Monohidratada</h4>
                            <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">Uso Crônico</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{supplements ? `${supplements.creatine}g` : '--'} <span className="text-sm font-normal text-gray-500">/dia</span></div>
                        <p className="text-xs text-gray-500">Baseado em 0.07g/kg. Tomar todos os dias.</p>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-white font-bold flex items-center gap-2"><Zap size={18} className="text-yellow-400"/> Cafeína (Pré-treino)</h4>
                            <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">Uso Agudo</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{supplements ? supplements.caffeine : '--'}</div>
                        <p className="text-xs text-gray-500">Faixa de 3 a 6mg/kg. Testar tolerância individual.</p>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-white font-bold flex items-center gap-2"><Activity size={18} className="text-green-400"/> Beta-Alanina</h4>
                            <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">Uso Crônico</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{supplements ? supplements.betaAlanine : '--'} <span className="text-sm font-normal text-gray-500">/dia</span></div>
                        <p className="text-xs text-gray-500">Dividir em doses de 2g para evitar parestesia (coceira).</p>
                    </div>
                </div>
            )}

        </div>
      </div>
    </Layout>
  );
};

export default Calculators;
