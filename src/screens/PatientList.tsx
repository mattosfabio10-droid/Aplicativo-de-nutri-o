import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, User, Phone } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Patient } from '../types';
import { Button, Input, Select } from '../components/UI';
import { StorageService } from '../services/storage';

const PatientList: React.FC = () => {
  const { patients, setCurrentPatient, refreshPatients } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'new'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({ gender: 'male', activityLevel: 'moderate', goal: 'Manutenção' });

  const handleSelect = (p: Patient) => { setCurrentPatient(p); navigate('/dashboard'); };
  
  const handleSave = () => {
    if (!newPatient.name || !newPatient.age) return alert("Nome e idade obrigatórios.");
    const patient: Patient = {
      id: Date.now().toString(),
      name: newPatient.name!,
      email: newPatient.email || '',
      phone: newPatient.phone || '',
      occupation: newPatient.occupation || '',
      age: Number(newPatient.age),
      weight: Number(newPatient.weight) || 0,
      height: Number(newPatient.height) || 0,
      waist: Number(newPatient.waist) || 0,
      goal: newPatient.goal || 'Manutenção',
      gender: newPatient.gender as any,
      activityLevel: 'moderate',
      history: '',
      preferences: '',
    };
    StorageService.savePatient(patient);
    refreshPatients();
    setView('list');
    setCurrentPatient(patient);
  };

  if (view === 'new') {
    return (
      <Layout title="Novo Paciente" showBack={true}>
        <div className="space-y-8 pb-10">
          <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h3 className="text-primary font-bold text-sm uppercase mb-4">Dados Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome *" onChange={e => setNewPatient({...newPatient, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" label="Idade *" onChange={e => setNewPatient({...newPatient, age: Number(e.target.value)})} />
                <Select label="Sexo" onChange={e => setNewPatient({...newPatient, gender: e.target.value as any})}>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                </Select>
              </div>
              <Input label="Email" onChange={e => setNewPatient({...newPatient, email: e.target.value})} />
              <Input label="Telefone" onChange={e => setNewPatient({...newPatient, phone: e.target.value})} />
            </div>
          </section>
          <div className="flex gap-4"><Button variant="ghost" onClick={() => setView('list')}>Cancelar</Button><Button onClick={handleSave}>Salvar</Button></div>
        </div>
      </Layout>
    );
  }

  const filtered = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Layout title="Meus Pacientes">
      <div className="relative mb-6"><Search className="absolute left-3 top-3 text-gray-500" size={20} /><input type="text" placeholder="Buscar..." className="w-full bg-gray-900 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-primary" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
      <div className="space-y-3">
        <button onClick={() => setView('new')} className="w-full border-2 border-dashed border-gray-800 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-500 hover:text-primary hover:border-primary"><Plus size={20} /> Cadastrar Novo</button>
        {filtered.map(patient => (
          <div key={patient.id} onClick={() => handleSelect(patient)} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-primary"><User size={24} /></div>
              <div><h3 className="font-bold text-white text-lg">{patient.name}</h3><span className="text-xs text-gray-400">{patient.goal}</span></div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
export default PatientList;