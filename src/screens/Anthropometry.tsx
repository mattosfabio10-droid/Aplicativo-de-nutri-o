
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
  const [newEntry, setNewEntry] = useState<Partial<AnthropometryRecord>>({ date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    if (currentPatient) {
      setData(StorageService.getAnthropometry(currentPatient.id));
      if (!showForm) setNewEntry({ ...newEntry, weight: currentPatient.weight, height: currentPatient.height });
    }
  }, [currentPatient, showForm]);

  const handleSave = () => {
    if (currentPatient && newEntry.weight && newEntry.height) {
      const record: AnthropometryRecord = {
        id: Date.now().toString(),
        date: new Date(newEntry.date!).toLocaleDateString('pt-BR'),
        weight: Number(newEntry.weight),
        height: Number(newEntry.height),
        bmi: Number((Number(newEntry.weight) / ((Number(newEntry.height)/100)**2)).toFixed(2)),
        waist: Number(newEntry.waist) || 0,
        hip: Number(newEntry.hip) || 0,
        bodyFat: Number(newEntry.bodyFat) || 0,
        abdomen: 0, armRight: 0, thighRight: 0, calfRight: 0, triceps: 0, subscapular: 0, suprailiac: 0, abdominal: 0, visceralFat: 0, skeletalMuscle: 0, bodyAge: 0, restingMetabolism: 0, fatMass: 0, leanMass: 0
      };
      StorageService.saveAnthropometry(currentPatient.id, record);
      setCurrentPatient({ ...currentPatient, weight: record.weight, height: record.height });
      refreshPatients();
      setShowForm(false);
    }
  };

  if (!currentPatient) return <Layout title="Antropometria">Selecione um paciente.</Layout>;

  return (
    <Layout title="Avaliação Antropométrica" showBack>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl"><span>Peso Atual</span><div className="text-2xl font-bold text-white">{currentPatient.weight} kg</div></div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl"><span>IMC</span><div className="text-2xl font-bold text-white">{data[data.length-1]?.bmi || '--'}</div></div>
      </div>
      {showForm ? (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
            <Input type="date" label="Data" value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} />
            <Input type="number" label="Peso (kg)" value={newEntry.weight} onChange={e => setNewEntry({...newEntry, weight: Number(e.target.value)})} />
            <Input type="number" label="Altura (cm)" value={newEntry.height} onChange={e => setNewEntry({...newEntry, height: Number(e.target.value)})} />
            <Input type="number" label="Cintura (cm)" value={newEntry.waist} onChange={e => setNewEntry({...newEntry, waist: Number(e.target.value)})} />
            <div className="flex gap-4"><Button onClick={handleSave}>Salvar</Button><Button variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button></div>
        </div>
      ) : (
        <Button onClick={() => setShowForm(true)} className="mb-6"><Plus /> Nova Avaliação</Button>
      )}
      {data.length > 0 && <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data}><XAxis dataKey="date" /><YAxis domain={['dataMin - 2', 'dataMax + 2']} /><Area type="monotone" dataKey="weight" stroke="#A6CE71" fill="#A6CE71" fillOpacity={0.3} /></AreaChart></ResponsiveContainer></div>}
    </Layout>
  );
};

export default Anthropometry;
