import React, { useState, useEffect } from 'react';
import { Save, Check, Stethoscope, Activity, Utensils, Brain, AlertCircle, HeartPulse, Cigarette } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { Anamnesis as AnamnesisType } from '../types';
import { Button, Input, Select } from '../components/UI';

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-primary text-xs font-bold mb-2 uppercase tracking-wide">{label}</label>}
    <textarea 
      className={`w-full bg-gray-900 border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all min-h-[100px] ${className}`}
      {...props}
    />
  </div>
);

// Componente para Checkbox Groups
const CheckboxGroup: React.FC<{
  title: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}> = ({ title, options, selected, onChange }) => {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter(s => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="bg-gray-950/50 p-4 rounded-xl border border-gray-800 mb-4">
      <h4 className="text-sm font-bold text-gray-400 uppercase mb-3">{title}</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group">
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selected.includes(opt) ? 'bg-primary border-primary' : 'border-gray-600 bg-transparent group-hover:border-gray-400'}`}>
              {selected.includes(opt) && <Check size={12} className="text-black" />}
            </div>
            <input type="checkbox" className="hidden" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
            <span className={`text-sm ${selected.includes(opt) ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const Anamnesis: React.FC = () => {
  const { currentPatient } = useApp();
  const [activeTab, setActiveTab] = useState<'clinic' | 'lifestyle' | 'gut' | 'metabolic' | 'diet'>('clinic');
  const [data, setData] = useState<Partial<AnamnesisType>>({});
  const [saved, setSaved] = useState(false);

  // States para campos JSON
  const [digestiveSymptoms, setDigestiveSymptoms] = useState<string[]>([]);
  const [metabolicTracking, setMetabolicTracking] = useState<string[]>([]);

  useEffect(() => {
    if (currentPatient) {
      const existing = StorageService.getAnamnesis(currentPatient.id);
      if (existing) {
        setData(existing);
        // Parse JSON fields
        try { setDigestiveSymptoms(JSON.parse(existing.digestiveSymptoms || '[]')); } catch (e) { setDigestiveSymptoms([]); }
        try { setMetabolicTracking(JSON.parse(existing.metabolicTracking || '[]')); } catch (e) { setMetabolicTracking([]); }
      } else {
        // Reset se novo paciente sem dados
        setData({});
        setDigestiveSymptoms([]);
        setMetabolicTracking([]);
      }
    }
  }, [currentPatient]);

  const handleSave = () => {
    if (!currentPatient) return;
    
    const toSave: AnamnesisType = {
      patientId: currentPatient.id,
      updatedAt: new Date().toISOString(),
      // Mapeamento dos campos
      pathologies: data.pathologies || '',
      medications: data.medications || '',
      familyHistory: data.familyHistory || '',
      surgeries: data.surgeries || '',
      allergies: data.allergies || '',
      
      sleepQuality: data.sleepQuality || '',
      stressLevel: data.stressLevel || '',
      physicalActivityDetails: data.physicalActivityDetails || '',
      smoking: data.smoking || '',
      alcohol: data.alcohol || '',
      
      intestinalFunction: data.intestinalFunction || '',
      stoolConsistency: data.stoolConsistency || '',
      digestiveSymptoms: JSON.stringify(digestiveSymptoms),
      
      waterIntake: data.waterIntake || '',
      appetite: data.appetite || '',
      chewing: data.chewing || '',
      intolerances: data.intolerances || '',
      preferences: data.preferences || '',
      
      metabolicTracking: JSON.stringify(metabolicTracking),
      notes: data.notes || '',
    };

    StorageService.saveAnamnesis(toSave);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = (field: keyof AnamnesisType, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const metabolicOptions = [
    "Dor de cabeça frequente", "Tontura", "Queda de cabelo", "Unhas fracas/quebradiças",
    "Acne em idade adulta", "Manchas na pele", "Olheiras", "Cansaço excessivo/Fadiga",
    "Falta de memória/concentração", "Insônia", "Ansiedade/Irritabilidade", "Depressão/Tristeza",
    "Dores musculares", "Câimbras", "Dores articulares", "Inchaço/Retenção",
    "Baixa libido", "TPM severa", "Pés/mãos frios", "Alergias respiratórias"
  ];

  const digestiveOptions = [
    "Azia / Queimação", "Refluxo", "Arrotos frequentes", "Gases / Flatulência excessiva",
    "Estufamento abdominal (após comer)", "Dor abdominal", "Náuseas", "Sensação de peso no estômago"
  ];

  if (!currentPatient) return <Layout title="Anamnese">Selecione um paciente.</Layout>;

  return (
    <Layout title="Anamnese Clínica Profissional" showBack>
      
      {/* Navigation Tabs */}
      <div className="flex bg-gray-900 p-1 rounded-xl mb-6 border border-gray-800 overflow-x-auto">
        {[
          { id: 'clinic', label: 'Histórico Clínico', icon: <Stethoscope size={16} /> },
          { id: 'lifestyle', label: 'Estilo de Vida', icon: <Activity size={16} /> },
          { id: 'gut', label: 'Saúde Intestinal', icon: <Brain size={16} /> },
          { id: 'metabolic', label: 'Rastreamento', icon: <HeartPulse size={16} /> },
          { id: 'diet', label: 'Comportamento', icon: <Utensils size={16} /> }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-3 px-4 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6 pb-24 max-w-4xl mx-auto">
        
        {/* TAB: Clínico Geral */}
        {activeTab === 'clinic' && (
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
                <TextArea 
                  label="Patologias Diagnosticadas" 
                  placeholder="Diabetes, Hipertensão, Hipotireoidismo, SOP, etc."
                  value={data.pathologies}
                  onChange={e => updateField('pathologies', e.target.value)}
                  className="!min-h-[80px]"
                />
            </div>
            <TextArea 
              label="Medicações de Uso Contínuo" 
              placeholder="Nome, dosagem e horários..."
              value={data.medications}
              onChange={e => updateField('medications', e.target.value)}
            />
            <TextArea 
              label="Suplementação Atual" 
              placeholder="Vitaminas, Whey, Creatina, etc."
              value={data.notes} // Usando notes temporariamente ou criar campo específico
              onChange={e => updateField('notes', e.target.value)}
            />
            <TextArea 
              label="Histórico Familiar" 
              placeholder="Doenças prevalentes na família (pais, avós)..."
              value={data.familyHistory}
              onChange={e => updateField('familyHistory', e.target.value)}
            />
            <div className="space-y-4">
                <TextArea 
                  label="Cirurgias Prévias" 
                  placeholder="Tipo e data aproximada..."
                  value={data.surgeries}
                  onChange={e => updateField('surgeries', e.target.value)}
                  className="!min-h-[80px]"
                />
                <TextArea 
                  label="Alergias (Alimentares/Medicamentosas)" 
                  placeholder="Ex: Camarão, Dipirona..."
                  value={data.allergies}
                  onChange={e => updateField('allergies', e.target.value)}
                  className="!min-h-[80px]"
                />
            </div>
          </div>
        )}

        {/* TAB: Estilo de Vida */}
        {activeTab === 'lifestyle' && (
          <div className="animate-fade-in space-y-6">
             <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Activity size={18} className="text-primary"/> Sono & Estresse</h3>
                   <Input 
                    label="Qualidade do Sono" 
                    placeholder="Horas/noite, acorda cansado, insônia?"
                    value={data.sleepQuality}
                    onChange={e => updateField('sleepQuality', e.target.value)}
                  />
                  <div className="mt-4">
                    <label className="block text-primary text-xs font-bold mb-2 uppercase tracking-wide">Nível de Estresse (0-10)</label>
                    <input 
                      type="range" 
                      min="0" max="10" 
                      value={data.stressLevel || 5} 
                      onChange={e => updateField('stressLevel', e.target.value)}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                       <span>Zen (0)</span>
                       <span className="text-white font-bold text-lg">{data.stressLevel || 5}</span>
                       <span>Caos (10)</span>
                    </div>
                  </div>
                </div>

                <div>
                   <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Cigarette size={18} className="text-primary"/> Hábitos Sociais</h3>
                   <Select label="Tabagismo" value={data.smoking} onChange={e => updateField('smoking', e.target.value)}>
                      <option value="">Selecione...</option>
                      <option value="Não fumante">Não fumante</option>
                      <option value="Ex-fumante">Ex-fumante</option>
                      <option value="Fumante ocasional">Fumante ocasional</option>
                      <option value="Fumante regular">Fumante regular</option>
                   </Select>
                   <Select label="Consumo de Álcool" value={data.alcohol} onChange={e => updateField('alcohol', e.target.value)}>
                      <option value="">Selecione...</option>
                      <option value="Não consome">Não consome</option>
                      <option value="Socialmente (fds)">Socialmente (finais de semana)</option>
                      <option value="3-4x semana">3-4x na semana</option>
                      <option value="Diariamente">Diariamente</option>
                   </Select>
                </div>
             </div>

             <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-white font-bold mb-4">Atividade Física</h3>
                <TextArea 
                  label="Detalhamento (Modalidade, Frequência, Intensidade, Horário)" 
                  value={data.physicalActivityDetails}
                  onChange={e => updateField('physicalActivityDetails', e.target.value)}
                />
             </div>
          </div>
        )}

        {/* TAB: Saúde Intestinal */}
        {activeTab === 'gut' && (
          <div className="animate-fade-in space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select label="Frequência de Evacuação" value={data.intestinalFunction} onChange={e => updateField('intestinalFunction', e.target.value)}>
                   <option value="">Selecione...</option>
                   <option value="Diariamente (1-3x)">Diariamente (1-3x)</option>
                   <option value="Dia sim / Dia não">Dia sim / Dia não</option>
                   <option value="A cada 2-3 dias">A cada 2-3 dias (Constipado)</option>
                   <option value="Mais de 3 dias">Mais de 3 dias (Constipação Severa)</option>
                   <option value="Irregular/Variável">Irregular / Variável</option>
                </Select>

                <Select label="Consistência (Escala de Bristol)" value={data.stoolConsistency} onChange={e => updateField('stoolConsistency', e.target.value)}>
                   <option value="">Selecione...</option>
                   <option value="Tipo 1: Caroços duros (Cabra)">Tipo 1: Caroços duros (Difícil)</option>
                   <option value="Tipo 2: Salsicha encaroçada">Tipo 2: Salsicha encaroçada</option>
                   <option value="Tipo 3: Salsicha com rachaduras">Tipo 3: Salsicha com rachaduras</option>
                   <option value="Tipo 4: Cobra lisa (Ideal)">Tipo 4: Cobra lisa e mole (Ideal)</option>
                   <option value="Tipo 5: Pedaços moles (Fácil)">Tipo 5: Pedaços moles, bordas nítidas</option>
                   <option value="Tipo 6: Pedaços pastosos">Tipo 6: Pedaços pastosos, bordas irregulares</option>
                   <option value="Tipo 7: Líquido (Diarreia)">Tipo 7: Totalmente líquido</option>
                </Select>
             </div>

             <CheckboxGroup 
                title="Sintomas Digestivos Recorrentes"
                options={digestiveOptions}
                selected={digestiveSymptoms}
                onChange={setDigestiveSymptoms}
             />
             
             <div className="bg-blue-900/10 p-4 rounded-lg border border-blue-900/30 flex items-start gap-3">
                <AlertCircle size={20} className="text-blue-400 mt-1" />
                <p className="text-sm text-blue-200">
                  <strong className="block text-blue-400 mb-1">Nota Clínica:</strong>
                  Sintomas digestivos persistentes podem indicar disbiose, hipocloridria ou sensibilidades alimentares. Considere investigar FODMAPs se houver muito estufamento.
                </p>
             </div>
          </div>
        )}

        {/* TAB: Rastreamento Metabólico */}
        {activeTab === 'metabolic' && (
           <div className="animate-fade-in">
              <div className="mb-4">
                 <h3 className="text-xl font-bold text-white">Rastreamento Metabólico</h3>
                 <p className="text-gray-400 text-sm">Identificação de sinais e sintomas subclínicos ligados a deficiências nutricionais.</p>
              </div>
              
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                 <CheckboxGroup 
                    title="Marque os sintomas frequentes (últimos 30 dias)"
                    options={metabolicOptions}
                    selected={metabolicTracking}
                    onChange={setMetabolicTracking}
                 />
                 
                 <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-sm font-bold text-gray-400">Total de Sintomas: <span className="text-primary text-lg">{metabolicTracking.length}</span></p>
                 </div>
              </div>
           </div>
        )}

        {/* TAB: Comportamento Alimentar */}
        {activeTab === 'diet' && (
          <div className="animate-fade-in space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Ingestão de Água (Litros/dia)" 
                  placeholder="Ex: 2.5 Litros"
                  value={data.waterIntake}
                  onChange={e => updateField('waterIntake', e.target.value)}
                />
                <Select label="Velocidade de Mastigação" value={data.chewing} onChange={e => updateField('chewing', e.target.value)}>
                   <option value="">Selecione...</option>
                   <option value="Muito Rápida">Muito Rápida (Engole sem mastigar)</option>
                   <option value="Rápida">Rápida</option>
                   <option value="Moderada">Moderada</option>
                   <option value="Lenta (Ideal)">Lenta / Adequada</option>
                </Select>
             </div>

             <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <Input 
                   label="Apetite e Horários de Fome" 
                   placeholder="Ex: Muita fome à noite, sem fome pela manhã..."
                   value={data.appetite}
                   onChange={e => updateField('appetite', e.target.value)}
                />
                <TextArea 
                   label="Intolerâncias / Sensibilidades (Percebidas)" 
                   placeholder="Alimentos que causam desconforto (leite, glúten, etc)..."
                   value={data.intolerances}
                   onChange={e => updateField('intolerances', e.target.value)}
                   className="!min-h-[80px]"
                />
             </div>

             <TextArea 
                label="Preferências e Aversões Alimentares" 
                placeholder="O que mais gosta de comer? O que não come de jeito nenhum?"
                value={data.preferences}
                onChange={e => updateField('preferences', e.target.value)}
             />
          </div>
        )}

      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={handleSave} 
          className="!w-auto flex items-center gap-3 px-8 py-4 shadow-2xl shadow-primary/30 rounded-full animate-fade-in hover:scale-105 transition-transform"
        >
          {saved ? <Check size={24} /> : <Save size={24} />}
          {saved ? 'Salvo!' : 'Salvar Anamnese'}
        </Button>
      </div>
    </Layout>
  );
};

export default Anamnesis;