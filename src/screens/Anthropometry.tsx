
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Calculator, Ruler, Activity, Save, Scale, AlertCircle, Edit2 } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { AnthropometryRecord, Patient } from '../types';
import { Button, Input } from '../components/UI';

const Anthropometry: React.FC = () => {
  const { currentPatient, setCurrentPatient, refreshPatients } = useApp();
  const [data, setData] = useState<AnthropometryRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'circ' | 'folds'>('basic');
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [newEntry, setNewEntry] = useState<Partial<AnthropometryRecord>>({
    date: new Date().toISOString().split('T')[0]
  });

  // Real-time Calculations State
  const [calcBMI, setCalcBMI] = useState(0);
  const [calcBF, setCalcBF] = useState(0);
  const [calcRCQ, setCalcRCQ] = useState(0); // Relação Cintura-Quadril

  useEffect(() => {
    if (currentPatient) {
      const records = StorageService.getAnthropometry(currentPatient.id);
      setData(records);
      // Pre-fill height from patient profile if available only if creating new
      if (!showForm && !isEditing) {
        setNewEntry(prev => ({ 
            ...prev, 
            height: currentPatient.height || 0,
            weight: currentPatient.weight || 0
        }));
      }
    }
  }, [currentPatient, showForm, isEditing]);

  // Effect to calculate metrics whenever inputs change
  useEffect(() => {
    if (!newEntry.weight || !newEntry.height) return;

    // BMI
    const h = newEntry.height / 100;
    const bmi = newEntry.weight / (h * h);
    setCalcBMI(parseFloat(bmi.toFixed(2)));

    // RCQ
    if (newEntry.waist && newEntry.hip) {
        setCalcRCQ(parseFloat((newEntry.waist / newEntry.hip).toFixed(2)));
    }

    // Body Fat (Pollock 4 folds estimative)
    if (newEntry.triceps && newEntry.suprailiac && newEntry.abdominal) {
        let sum = Number(newEntry.triceps) + Number(newEntry.suprailiac) + Number(newEntry.abdominal) + (Number(newEntry.subscapular) || 0);
        let density = 0;
        const age = currentPatient?.age || 30;
        
        if (currentPatient?.gender === 'male') {
             // Jackson & Pollock 3 sites formula adapted
             density = 1.10938 - (0.0008267 * sum) + (0.0000016 * sum * sum) - (0.0002574 * age);
        } else {
             density = 1.0994921 - (0.0009929 * sum) + (0.0000023 * sum * sum) - (0.0001392 * age);
        }
        
        const bf = ((4.95 / density) - 4.5) * 100;
        if (bf > 0 && bf < 70) setCalcBF(parseFloat(bf.toFixed(1)));
    } else {
        // Reset calcBF if folds are removed, unless manual BF is entered which is handled in UI
        if (!newEntry.bodyFat) setCalcBF(0);
    }

  }, [newEntry, currentPatient]);

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo do Peso', color: 'text-blue-400', bg: 'bg-blue-900/20' };
    if (bmi < 24.9) return { label: 'Eutrofia (Normal)', color: 'text-green-400', bg: 'bg-green-900/20' };
    if (bmi < 29.9) return { label: 'Sobrepeso', color: 'text-yellow-400', bg: 'bg-yellow-900/20' };
    return { label: 'Obesidade', color: 'text-red-400', bg: 'bg-red-900/20' };
  };

  const handleEdit = (record: AnthropometryRecord) => {
      // Converter data dd/mm/yyyy para yyyy-mm-dd para o input date funcionar
      const [day, month, year] = record.date.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      setNewEntry({
          ...record,
          date: formattedDate
      });
      setIsEditing(true);
      setShowForm(true);
      setActiveTab('basic');
  };

  const handleCancel = () => {
      setShowForm(false);
      setIsEditing(false);
      setNewEntry({ date: new Date().toISOString().split('T')[0] });
  };

  const handleSave = () => {
    if (currentPatient && newEntry.weight && newEntry.height) {
      // Manter o ID se estiver editando, senão gera um novo no service se for undefined
      const record: AnthropometryRecord = {
        id: newEntry.id || Date.now().toString(),
        date: newEntry.date ? new Date(newEntry.date).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR'),
        weight: Number(newEntry.weight),
        height: Number(newEntry.height),
        bmi: calcBMI,
        
        waist: Number(newEntry.waist) || 0,
        abdomen: Number(newEntry.abdomen) || 0,
        hip: Number(newEntry.hip) || 0,
        armRight: Number(newEntry.armRight) || 0,
        thighRight: Number(newEntry.thighRight) || 0,
        calfRight: Number(newEntry.calfRight) || 0,
        
        triceps: Number(newEntry.triceps) || 0,
        subscapular: Number(newEntry.subscapular) || 0,
        suprailiac: Number(newEntry.suprailiac) || 0,
        abdominal: Number(newEntry.abdominal) || 0,
        
        bodyFat: calcBF || Number(newEntry.bodyFat) || 0,
      };

      // 1. Save or Update record
      StorageService.saveAnthropometry(currentPatient.id, record);

      // 2. Update Patient Profile (Current Stats) only if it's the most recent record or a new one
      // Simple logic: Always update current stats to the one just saved for convenience
      const updatedPatient: Patient = {
        ...currentPatient,
        weight: record.weight,
        height: record.height,
        waist: record.waist
      };
      StorageService.savePatient(updatedPatient);
      setCurrentPatient(updatedPatient);
      refreshPatients();

      handleCancel(); // Close form and reset
    } else {
        alert("Preencha ao menos Peso e Altura.");
    }
  };

  if (!currentPatient) return <Layout title="Antropometria">Selecione um paciente.</Layout>;

  // Get latest metrics
  const lastRecord = data.length > 0 ? data[data.length - 1] : null;
  const currentBMI = lastRecord ? lastRecord.bmi : 0;
  const bmiStatus = getBMIStatus(currentBMI);

  return (
    <Layout title="Avaliação Antropométrica" showBack>
      
      {/* Top Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        
        {/* Weight Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between relative overflow-hidden">
            <div className="absolute right-0 top-0 p-10 bg-primary/5 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>
            <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Peso Atual</span>
                <div className="text-2xl font-bold text-white mt-1">{currentPatient.weight > 0 ? currentPatient.weight : '--'} <span className="text-sm font-normal text-gray-400">kg</span></div>
            </div>
            <div className="bg-gray-800 p-2.5 rounded-lg text-primary"><Scale size={20} /></div>
        </div>

        {/* BMI Card */}
        <div className={`border border-gray-800 rounded-xl p-4 flex flex-col justify-center relative overflow-hidden ${currentBMI > 0 ? bmiStatus.bg : 'bg-gray-900'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">IMC</span>
                    <div className="text-2xl font-bold text-white mt-1">{currentBMI > 0 ? currentBMI : '--'}</div>
                </div>
                {currentBMI > 0 && <span className={`text-[10px] px-2 py-1 rounded border border-current font-bold ${bmiStatus.color}`}>{bmiStatus.label}</span>}
            </div>
        </div>

        {/* Body Fat Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
            <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">% Gordura</span>
                <div className="text-2xl font-bold text-white mt-1">{lastRecord?.bodyFat ? lastRecord.bodyFat : '--'} <span className="text-sm font-normal text-gray-400">%</span></div>
            </div>
            <div className="bg-gray-800 p-2.5 rounded-lg text-green-400"><Activity size={20} /></div>
        </div>

        {/* Waist Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between">
            <div>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Cintura</span>
                <div className="text-2xl font-bold text-white mt-1">{lastRecord?.waist ? lastRecord.waist : '--'} <span className="text-sm font-normal text-gray-400">cm</span></div>
            </div>
            <div className="bg-gray-800 p-2.5 rounded-lg text-yellow-400"><Ruler size={20} /></div>
        </div>
      </div>

      {showForm ? (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden animate-fade-in mb-8 shadow-2xl">
           <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <Calculator size={18} className="text-primary" />
                <h4 className="text-white font-bold text-sm uppercase tracking-wide">
                    {isEditing ? 'Editar Avaliação' : 'Nova Avaliação'}
                </h4>
             </div>
             <div className="flex items-center gap-4 text-xs font-mono">
                 {calcBMI > 0 && <span className="text-gray-300">IMC: <strong className="text-white">{calcBMI}</strong></span>}
                 {calcRCQ > 0 && <span className="text-gray-300">RCQ: <strong className={calcRCQ > 0.9 ? "text-red-400" : "text-green-400"}>{calcRCQ}</strong></span>}
                 {calcBF > 0 && <span className="text-gray-300">Gordura: <strong className="text-primary">{calcBF}%</strong></span>}
             </div>
           </div>

           {/* Tabs */}
           <div className="flex border-b border-gray-800 bg-black/20">
             <button onClick={() => setActiveTab('basic')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'basic' ? 'text-primary border-b-2 border-primary bg-gray-800/50' : 'text-gray-500 hover:text-gray-300'}`}>1. Dados Gerais</button>
             <button onClick={() => setActiveTab('circ')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'circ' ? 'text-primary border-b-2 border-primary bg-gray-800/50' : 'text-gray-500 hover:text-gray-300'}`}>2. Perímetros</button>
             <button onClick={() => setActiveTab('folds')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'folds' ? 'text-primary border-b-2 border-primary bg-gray-800/50' : 'text-gray-500 hover:text-gray-300'}`}>3. Dobras Cutâneas</button>
           </div>

           <div className="p-6">
              {activeTab === 'basic' && (
                <div className="space-y-4 animate-fade-in">
                  <Input type="date" label="Data da Avaliação" value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} className="max-w-xs" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input type="number" label="Peso (kg) *" value={newEntry.weight || ''} onChange={e => setNewEntry({...newEntry, weight: Number(e.target.value)})} autoFocus />
                    <Input type="number" label="Altura (cm) *" value={newEntry.height || ''} onChange={e => setNewEntry({...newEntry, height: Number(e.target.value)})} placeholder="Ex: 175" />
                  </div>
                  <div className="bg-blue-900/10 border border-blue-900/30 p-3 rounded-lg flex items-start gap-2">
                     <AlertCircle size={16} className="text-blue-400 mt-0.5" />
                     <p className="text-xs text-blue-200">Preencha Peso e Altura para cálculo automático do IMC. O % de Gordura pode ser inserido manualmente abaixo ou calculado via dobras.</p>
                  </div>
                  <Input type="number" label="% Gordura (Manual)" value={newEntry.bodyFat || (calcBF > 0 ? calcBF : '')} onChange={e => setNewEntry({...newEntry, bodyFat: Number(e.target.value)})} className="max-w-xs" />
                </div>
              )}

              {activeTab === 'circ' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
                  <Input type="number" label="Cintura (cm)" value={newEntry.waist || ''} onChange={e => setNewEntry({...newEntry, waist: Number(e.target.value)})} />
                  <Input type="number" label="Abdômen (cm)" value={newEntry.abdomen || ''} onChange={e => setNewEntry({...newEntry, abdomen: Number(e.target.value)})} />
                  <Input type="number" label="Quadril (cm)" value={newEntry.hip || ''} onChange={e => setNewEntry({...newEntry, hip: Number(e.target.value)})} />
                  <div className="col-span-full h-px bg-gray-800 my-2"></div>
                  <Input type="number" label="Braço Dir. (cm)" value={newEntry.armRight || ''} onChange={e => setNewEntry({...newEntry, armRight: Number(e.target.value)})} />
                  <Input type="number" label="Coxa Dir. (cm)" value={newEntry.thighRight || ''} onChange={e => setNewEntry({...newEntry, thighRight: Number(e.target.value)})} />
                  <Input type="number" label="Panturrilha (cm)" value={newEntry.calfRight || ''} onChange={e => setNewEntry({...newEntry, calfRight: Number(e.target.value)})} />
                </div>
              )}

              {activeTab === 'folds' && (
                <div className="space-y-4 animate-fade-in">
                   <div className="bg-gray-800/50 p-3 rounded-lg text-xs text-gray-400 mb-2">
                      Preencha as dobras para cálculo automático da densidade corporal (Pollock).
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                    <Input type="number" label="Tríceps (mm)" value={newEntry.triceps || ''} onChange={e => setNewEntry({...newEntry, triceps: Number(e.target.value)})} />
                    <Input type="number" label="Subescapular (mm)" value={newEntry.subscapular || ''} onChange={e => setNewEntry({...newEntry, subscapular: Number(e.target.value)})} />
                    <Input type="number" label="Supra-ilíaca (mm)" value={newEntry.suprailiac || ''} onChange={e => setNewEntry({...newEntry, suprailiac: Number(e.target.value)})} />
                    <Input type="number" label="Abdominal (mm)" value={newEntry.abdominal || ''} onChange={e => setNewEntry({...newEntry, abdominal: Number(e.target.value)})} />
                  </div>
                </div>
              )}
           </div>

           <div className="p-4 bg-black/20 border-t border-gray-800 flex justify-end gap-3">
             <Button variant="ghost" onClick={handleCancel} className="!w-auto">Cancelar</Button>
             <Button onClick={handleSave} className="!w-auto px-8 flex items-center gap-2">
                 <Save size={18} /> {isEditing ? 'Atualizar Dados' : 'Salvar Avaliação'}
             </Button>
           </div>
        </div>
      ) : (
        <Button variant="outline" onClick={() => { setShowForm(true); setIsEditing(false); setNewEntry({ date: new Date().toISOString().split('T')[0], height: currentPatient.height || 0, weight: currentPatient.weight || 0 }); }} className="mb-8 border-dashed border-2 hover:border-primary hover:bg-primary/5">
          <Plus size={18} /> Nova Avaliação Completa
        </Button>
      )}

      {/* Evolution Charts */}
      {data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase flex items-center gap-2">
                 <Activity size={14} className="text-primary" /> Evolução de Peso (kg)
              </h3>
              <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#A6CE71" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#A6CE71" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#666" domain={['dataMin - 2', 'dataMax + 2']} fontSize={10} tickLine={false} axisLine={false} width={30} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#A6CE71' }}
                      />
                      <Area type="monotone" dataKey="weight" stroke="#A6CE71" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase flex items-center gap-2">
                 <Activity size={14} className="text-blue-400" /> Evolução de Gordura (%)
              </h3>
              <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                      <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#666" domain={[0, 40]} fontSize={10} tickLine={false} axisLine={false} width={30} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', fontSize: '12px' }}
                        itemStyle={{ color: '#60A5FA' }}
                      />
                      <Area type="monotone" dataKey="bodyFat" stroke="#60A5FA" strokeWidth={3} fillOpacity={1} fill="url(#colorFat)" />
                    </AreaChart>
                  </ResponsiveContainer>
              </div>
            </div>
          </div>
      )}

      {/* History Table */}
      <div>
         <div className="flex items-center justify-between mb-3">
             <h3 className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                <Ruler size={14} /> Histórico Detalhado
            </h3>
            <span className="text-[10px] text-gray-600 uppercase font-bold">{data.length} Avaliações</span>
         </div>
         
         <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
             <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-black/40 text-gray-500 text-xs uppercase font-bold tracking-wider">
                    <tr>
                        <th className="p-4">Data</th>
                        <th className="p-4">Peso</th>
                        <th className="p-4">Altura</th>
                        <th className="p-4">IMC</th>
                        <th className="p-4 text-center">Cintura</th>
                        <th className="p-4 text-right">% Gord</th>
                        <th className="p-4 text-center">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                    {data.slice().reverse().map((record, i) => (
                        <tr key={i} className="hover:bg-gray-800/50 transition-colors">
                            <td className="p-4 text-gray-300 font-medium">{record.date}</td>
                            <td className="p-4 font-bold text-white">{record.weight} kg</td>
                            <td className="p-4 text-gray-400">{record.height} cm</td>
                            <td className="p-4 text-gray-400">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getBMIStatus(record.bmi).bg} ${getBMIStatus(record.bmi).color}`}>
                                    {record.bmi}
                                </span>
                            </td>
                            <td className="p-4 text-gray-400 text-center">{record.waist > 0 ? `${record.waist} cm` : '-'}</td>
                            <td className="p-4 text-primary font-bold text-right">{record.bodyFat > 0 ? `${record.bodyFat}%` : '-'}</td>
                            <td className="p-4 flex justify-center">
                                <button 
                                  onClick={() => handleEdit(record)}
                                  className="text-gray-500 hover:text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors"
                                  title="Editar"
                                >
                                    <Edit2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={7} className="p-8 text-center text-gray-600 flex flex-col items-center justify-center gap-2">
                                <Scale size={32} className="opacity-20" />
                                <span>Nenhuma avaliação registrada para este paciente.</span>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
             </div>
         </div>
      </div>
    </Layout>
  );
};

export default Anthropometry;
