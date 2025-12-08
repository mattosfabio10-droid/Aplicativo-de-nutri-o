import React, { useState, useEffect } from 'react';
import { Plus, Save, Scale, Edit2 } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { AnthropometryRecord } from '../types';
import { Button, Input } from '../components/UI';

const Bioimpedance: React.FC = () => {
  const { currentPatient, refreshPatients } = useApp();
  const [data, setData] = useState<AnthropometryRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<AnthropometryRecord>>({ date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    if (currentPatient) setData(StorageService.getAnthropometry(currentPatient.id));
  }, [currentPatient, showForm]);

  const handleSave = () => {
    if (!currentPatient || !newEntry.weight) return;
    const record: AnthropometryRecord = {
        id: Date.now().toString(),
        date: new Date(newEntry.date!).toLocaleDateString('pt-BR'),
        weight: Number(newEntry.weight),
        height: Number(newEntry.height) || currentPatient.height,
        bmi: 0, // Simplificado
        bodyFat: Number(newEntry.bodyFat),
        visceralFat: Number(newEntry.visceralFat),
        skeletalMuscle: Number(newEntry.skeletalMuscle),
        waist: 0, hip: 0 // Simplificado
    };
    StorageService.saveAnthropometry(currentPatient.id, record);
    refreshPatients();
    setShowForm(false);
  };

  if (!currentPatient) return <Layout title="Bioimpedância">Selecione um paciente.</Layout>;

  return (
    <Layout title="Bioimpedância Omron" showBack>
      {showForm ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="font-bold text-white mb-4">Nova Leitura</h3>
            <div className="grid grid-cols-2 gap-4">
                <Input type="date" value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} />
                <Input type="number" label="Peso (kg)" value={newEntry.weight || ''} onChange={e => setNewEntry({...newEntry, weight: Number(e.target.value)})} />
                <Input type="number" label="Gordura %" value={newEntry.bodyFat || ''} onChange={e => setNewEntry({...newEntry, bodyFat: Number(e.target.value)})} />
                <Input type="number" label="Músculo %" value={newEntry.skeletalMuscle || ''} onChange={e => setNewEntry({...newEntry, skeletalMuscle: Number(e.target.value)})} />
            </div>
            <div className="flex gap-2 mt-4"><Button onClick={handleSave}>Salvar</Button><Button variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button></div>
        </div>
      ) : (
        <button onClick={() => setShowForm(true)} className="w-full py-4 border-2 border-dashed border-gray-800 rounded-xl text-gray-500 hover:border-primary flex justify-center gap-2 mb-6"><Plus /> Nova Leitura</button>
      )}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
         {data.map(d => (
             <div key={d.id} className="p-4 border-b border-gray-800 flex justify-between text-sm">
                 <span className="text-gray-300">{d.date}</span>
                 <span className="font-bold text-white">{d.weight}kg</span>
                 <span className="text-blue-400">{d.bodyFat}% Gord</span>
             </div>
         ))}
      </div>
    </Layout>
  );
};
export default Bioimpedance;