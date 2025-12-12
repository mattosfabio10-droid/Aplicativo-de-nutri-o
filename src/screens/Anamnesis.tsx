
import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { Anamnesis as AnamnesisType } from '../types';
import { Button } from '../components/UI';

const Anamnesis: React.FC = () => {
  const { currentPatient } = useApp();
  const [data, setData] = useState<Partial<AnamnesisType>>({});

  useEffect(() => {
    if (currentPatient) {
      const existing = StorageService.getAnamnesis(currentPatient.id);
      if (existing) setData(existing);
    }
  }, [currentPatient]);

  const handleSave = () => {
    if (currentPatient) {
      StorageService.saveAnamnesis({ ...data, patientId: currentPatient.id, updatedAt: new Date().toISOString() } as AnamnesisType);
      alert('Salvo!');
    }
  };

  if (!currentPatient) return <Layout title="Anamnese">Selecione um paciente.</Layout>;

  return (
    <Layout title="Anamnese" showBack>
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 space-y-4">
        <textarea className="w-full bg-black border border-gray-700 rounded-lg p-4 text-white min-h-[200px]" placeholder="Histórico clínico, queixas, medicamentos..." value={data.notes || ''} onChange={e => setData({...data, notes: e.target.value})} />
        <Button onClick={handleSave}><Save /> Salvar Anamnese</Button>
      </div>
    </Layout>
  );
};

export default Anamnesis;
