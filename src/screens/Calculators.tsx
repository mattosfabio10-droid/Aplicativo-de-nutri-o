
import React, { useState, useEffect } from 'react';
import { Calculator, Flame, Droplet, TrendingUp, Activity, Dumbbell, PieChart, Zap, CheckCircle, Download, FileText, X, Check } from 'lucide-react';
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
import { Button, Input, Select } from '../components/UI';
import { useApp } from '../context/AppContext';

const getBase64ImageFromURL = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (error) => {
      console.warn("Erro ao carregar imagem para PDF", error);
      reject(error);
    };
  });
};

const Calculators: React.FC = () => {
  const { currentPatient, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'metabolism' | 'macros' | 'bmi' | 'hydration' | 'supplements'>('metabolism');
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfSections, setPdfSections] = useState<string[]>(['metabolism', 'macros', 'bmi', 'hydration', 'supplements']);

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityFactor, setActivityFactor] = useState('1.2');

  const [macroCalories, setMacroCalories] = useState('2000');
  const [ratioProt, setRatioProt] = useState('30');
  const [ratioCarb, setRatioCarb] = useState('40');
  const [ratioFat, setRatioFat] = useState('30');

  const [resultBMR, setResultBMR] = useState<number | null>(null);
  const [resultTDEE, setResultTDEE] = useState<number | null>(null);
  const [resultBMI, setResultBMI] = useState<number | null>(null);
  const [resultIdealWeight, setResultIdealWeight] = useState<{ min: number, max: number } | null>(null);
  const [resultWater, setResultWater] = useState<number | null>(null);
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

    let bmr = 0;
    if (gender === 'male') {
      bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
    } else {
      bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
    }

    setResultBMR(Math.round(bmr));
    setResultTDEE(Math.round(bmr * factor));
    setMacroCalories(Math.round(bmr * factor).toString());
  };

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h) return;

    const bmi = w / ((h / 100) * (h / 100));
    setResultBMI(parseFloat(bmi.toFixed(2)));

    const minW = 18.5 * ((h / 100) * (h / 100));
    const maxW = 24.9 * ((h / 100) * (h / 100));
    setResultIdealWeight({ min: parseFloat(minW.toFixed(1)), max: parseFloat(maxW.toFixed(1)) });
  };

  const calculateHydration = () => {
    const w = parseFloat(weight);
    if (!w) return;
    setResultWater(Math.round(w * 35));
  };

  const calculateSupplements = () => {
      const w = parseFloat(weight);
      if (!w) return;
      setSupplements({
          creatine: parseFloat((w * 0.07).toFixed(1)),
          betaAlanine: '3.2g - 6.4g',
          caffeine: `${Math.round(w * 3)}mg - ${Math.round(w * 6)}mg`
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

  const totalRatio = Number(ratioProt) + Number(ratioCarb) + Number(ratioFat);
  const cals = Number(macroCalories);
  const gramsProt = Math.round((cals * (Number(ratioProt)/100)) / 4);
  const gramsCarb = Math.round((cals * (Number(ratioCarb)/100)) / 4);
  const gramsFat = Math.round((cals * (Number(ratioFat)/100)) / 9);

  const togglePdfSection = (section: string) => {
      if (pdfSections.includes(section)) {
          setPdfSections(prev => prev.filter(s => s !== section));
      } else {
          setPdfSections(prev => [...prev, section]);
      }
  };

  const handleExportPDF = async () => {
      const doc = new jsPDF();
      const primaryColor = [166, 206, 113];
      const contentWidth = 180;
      
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 35, 'F');
      
      try {
          const logoUrl = "https://i.imgur.com/JrGn2f5.png"; 
          const logoData = await getBase64ImageFromURL(logoUrl);
          doc.addImage(logoData, 'PNG', 10, 2, 30, 30);
      } catch (e) {}

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("RELATÓRIO NUTRICIONAL", 105, 18, { align: "center" });
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      if (currentPatient) {
          doc.text(`Paciente: ${currentPatient.name}`, 105, 26, { align: "center" });
      }
      doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 105, 31, { align: "center" });

      let y = 50;

      if (pdfSections.includes('metabolism') && resultBMR) {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
          doc.text("Taxa Metabólica", 15, y);
          doc.line(15, y + 2, 195, y + 2);
          y += 10;
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
          doc.text(`• Metabolismo Basal (TMB): ${resultBMR} kcal`, 20, y);
          y += 6;
          doc.text(`• Gasto Energético Total (VET): ${resultTDEE} kcal`, 20, y);
          y += 15;
      }

      if (pdfSections.includes('macros')) {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
          doc.text("Distribuição de Macronutrientes", 15, y);
          doc.line(15, y + 2, 195, y + 2);
          y += 10;
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
          doc.text(`Meta Calórica: ${macroCalories} kcal`, 20, y);
          y += 8;
          doc.text(`• Proteína: ${gramsProt}g (${ratioProt}%)`, 20, y);
          y += 6;
          doc.text(`• Carboidrato: ${gramsCarb}g (${ratioCarb}%)`, 20, y);
          y += 6;
          doc.text(`• Gordura: ${gramsFat}g (${ratioFat}%)`, 20, y);
          y += 15;
      }

      if (pdfSections.includes('bmi') && resultBMI) {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
          doc.text("Índice de Massa Corporal (IMC)", 15, y);
          doc.line(15, y + 2, 195, y + 2);
          y += 10;
          const status = getBMIStatus(resultBMI);
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
          doc.text(`• IMC Atual: ${resultBMI} kg/m²`, 20, y);
          y += 6;
          doc.text(`• Classificação: ${status.label}`, 20, y);
          y += 6;
          if (resultIdealWeight) {
              doc.text(`• Faixa de Peso Ideal: ${resultIdealWeight.min}kg a ${resultIdealWeight.max}kg`, 20, y);
          }
          y += 15;
      }

      if (pdfSections.includes('hydration') && resultWater) {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
          doc.text("Hidratação", 15, y);
          doc.line(15, y + 2, 195, y + 2);
          y += 10;
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
          doc.text(`• Meta Hídrica Diária: ${(resultWater/1000).toFixed(2)} Litros`, 20, y);
          y += 15;
      }

      if (pdfSections.includes('supplements') && supplements) {
          if (y > 240) { doc.addPage(); y = 20; }
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
          doc.text("Sugestão de Suplementação", 15, y);
          doc.line(15, y + 2, 195, y + 2);
          y += 10;
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
          doc.text(`• Creatina: ${supplements.creatine}g / dia (Uso contínuo)`, 20, y);
          y += 6;
          doc.text(`• Beta-Alanina: ${supplements.betaAlanine} / dia`, 20, y);
          y += 6;
          doc.text(`• Cafeína: ${supplements.caffeine} (Pré-treino)`, 20, y);
      }

      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Nutricionista: ${currentUser?.name || "Dr. Fábio Mattos"} - CRN: ${currentUser?.crn || "33174"}`, 105, pageHeight - 10, { align: "center" });

      doc.save(`Relatorio_Nutricional_${currentPatient?.name.replace(/\s+/g, '_') || 'Calculo'}.pdf`);
      setShowPdfModal(false);
  };

  return (
    <Layout title="Calculadoras Nutricionais" showBack>
      <div className="flex justify-between items-center mb-6">
          <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800 overflow-x-auto max-w-[calc(100%-140px)]">
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

          <Button onClick={() => setShowPdfModal(true)} className="!w-auto px-4 flex items-center gap-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white shadow-lg">
             <FileText size={18} /> <span className="hidden sm:inline">Relatório PDF</span>
          </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                </div>
            )}

            {activeTab === 'hydration' && (
                <div className="animate-fade-in space-y-4">
                    <div className="bg-blue-900/10 border border-blue-900/30 p-8 rounded-xl flex flex-col items-center justify-center text-center">
                        <div className="bg-blue-500/20 p-4 rounded-full mb-4 text-blue-400">
                            <Droplet size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Meta Hídrica Diária</h3>
                        <div className="text-5xl font-bold text-blue-100 mb-2">
                            {resultWater ? (resultWater / 1000).toFixed(2) : '--'} <span className="text-2xl font-normal text-blue-400">Litros</span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'supplements' && (
                <div className="animate-fade-in space-y-4">
                    <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-white font-bold flex items-center gap-2"><Dumbbell size={18} className="text-purple-400"/> Creatina</h4>
                            <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">Uso Crônico</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{supplements ? `${supplements.creatine}g` : '--'} <span className="text-sm font-normal text-gray-500">/dia</span></div>
                    </div>
                </div>
            )}
        </div>
      </div>

      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
           <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950/50 rounded-t-2xl">
                 <h3 className="text-white font-bold flex items-center gap-2">
                    <FileText size={18} className="text-primary"/> Gerar Relatório PDF
                 </h3>
                 <button onClick={() => setShowPdfModal(false)} className="text-gray-500 hover:text-white"><X size={20}/></button>
              </div>
              <div className="p-6">
                 <p className="text-sm text-gray-400 mb-4">Selecione quais seções deseja incluir no relatório:</p>
                 <div className="space-y-3">
                    {['metabolism', 'macros', 'bmi', 'hydration', 'supplements'].map(section => (
                        <label key={section} className="flex items-center gap-3 p-3 bg-black/40 rounded-lg border border-gray-800 cursor-pointer hover:border-gray-600 transition-colors">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${pdfSections.includes(section) ? 'bg-primary border-primary' : 'border-gray-600'}`}>
                                {pdfSections.includes(section) && <Check size={14} className="text-black" />}
                            </div>
                            <input type="checkbox" className="hidden" checked={pdfSections.includes(section)} onChange={() => togglePdfSection(section)} />
                            <span className="text-sm text-gray-200 font-medium capitalize">{section}</span>
                        </label>
                    ))}
                 </div>
                 <Button onClick={handleExportPDF} className="mt-6 flex items-center gap-2">
                    <Download size={18} /> Baixar PDF
                 </Button>
              </div>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default Calculators;
