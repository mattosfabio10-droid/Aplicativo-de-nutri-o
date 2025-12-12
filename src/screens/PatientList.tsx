
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, User, Phone, Trash2, Edit, Save, X, ChevronRight, Camera, History } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Patient } from '../types';
import { Button, Input, Select } from '../components/UI';
import { StorageService } from '../services/storage';

const PatientList: React.FC = () => {
  const { patients, setCurrentPatient, refreshPatients, currentPatient } = useApp();
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'form'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<Patient>>({ gender: 'male', activityLevel: 'moderate', goal: 'Manutenção' });

  const handleSelect = (p: Patient) => { setCurrentPatient(p); navigate('/dashboard'); };
  const handlePhotos = (e: React.MouseEvent, p: Patient) => { e.stopPropagation(); setCurrentPatient(p); navigate('/patient-photos'); };
  const handleHistory = (e: React.MouseEvent, p: Patient) => { e.stopPropagation(); setCurrentPatient(p); navigate('/patient-history'); };
  
  const handleNew = () => {
    setFormData({ gender: 'male', activityLevel: 'moderate', goal: 'Manutenção', weight: 0, height: 0, age: 0 });
    setView('form');
  };

  const handleEdit = (e: React.MouseEvent, p: Patient) => { e.stopPropagation(); setFormData({ ...p }); setView('form'); };

  const handleSave = () => {
    if (!formData.name || !formData.age) { alert("Nome e idade são obrigatórios."); return; }
    const patientToSave: Patient = {
      id: formData.id || Date.now().toString(),
      name: formData.name,
      email: formData.email || '',
      phone: formData.phone || '',
      occupation: formData.occupation || '',
      age: Number(formData.age),
      weight: Number(formData.weight) || 0,
      height: Number(formData.height) || 0,
      waist: Number(formData.waist) || 0,
      goal: formData.goal || 'Manutenção',
      gender: (formData.gender as 'male' | 'female') || 'male',
      activityLevel: (formData.activityLevel as 'sedentary' | 'moderate' | 'active') || 'moderate',
      history: formData.history || '',
      preferences: formData.preferences || '',
    };
    StorageService.savePatient(patientToSave);
    refreshPatients();
    if (currentPatient && currentPatient.id === patientToSave.id) { setCurrentPatient(patientToSave); }
    setView('list');
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Tem certeza que deseja excluir este paciente? Todos os dados serão perdidos.")) {
      StorageService.deletePatient(id);
      refreshPatients();
      if (currentPatient?.id === id) { setCurrentPatient(null); }
    }
  };

  if (view === 'form') {
    return (
      <Layout title={formData.id ? "Editar Paciente" : "Novo Paciente"}>
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
          <div className="flex items-center justify-between mb-6">
             <button onClick={() => setView('list')} className="text-gray-400 hover:text-white flex items-center gap-2"><X size={20} /> Cancelar</button>
             <h2 className="text-xl font-bold text-white">{formData.id ? `Editando: ${formData.name}` : 'Cadastro de Paciente'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                <h3 className="text-primary font-bold text-sm uppercase mb-4 flex items-center gap-2"><User size={16} /> Dados Pessoais</h3>
                <div className="space-y-4">
                    <Input label="Nome Completo *" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ex: João Silva" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" label="Idade *" value={formData.age || ''} onChange={e => setFormData({...formData, age: Number(e.target.value)})} />
                        <Select label="Sexo" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as any})}>
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                        </Select>
                    </div>
                    <Input label="Email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
                    <Input label="Telefone / WhatsApp" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </section>
              <section className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
                <h3 className="text-primary font-bold text-sm uppercase mb-4 flex items-center gap-2"><Save size={16} /> Dados Clínicos Iniciais</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" label="Peso (kg)" value={formData.weight || ''} onChange={e => setFormData({...formData, weight: Number(e.target.value)})} />
                        <Input type="number" label="Altura (cm)" value={formData.height || ''} onChange={e => setFormData({...formData, height: Number(e.target.value)})} />
                    </div>
                    <Select label="Nível de Atividade Física" value={formData.activityLevel} onChange={e => setFormData({...formData, activityLevel: e.target.value as any})}>
                        <option value="sedentary">Sedentário</option>
                        <option value="moderate">Moderado</option>
                        <option value="active">Ativo</option>
                    </Select>
                    <Select label="Objetivo Principal" value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})}>
                        <option value="Emagrecimento">Emagrecimento</option>
                        <option value="Hipertrofia">Hipertrofia</option>
                        <option value="Manutenção">Manutenção</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Performance">Performance</option>
                    </Select>
                </div>
              </section>
          </div>
          <div className="flex justify-end gap-4 mt-6 border-t border-gray-800 pt-6">
             <Button variant="ghost" onClick={() => setView('list')} className="!w-auto">Cancelar</Button>
             <Button onClick={handleSave} className="!w-auto px-8 flex items-center gap-2"><Save size={18} /> Salvar Paciente</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const filtered = patients.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Layout title="Meus Pacientes">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
             <Search className="absolute left-3 top-3.5 text-gray-500" size={20} />
             <input type="text" placeholder="Buscar paciente..." className="w-full bg-gray-900 rounded-xl py-3.5 pl-10 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary transition-all" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <button onClick={handleNew} className="bg-primary text-black font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform flex items-center justify-center gap-2 whitespace-nowrap"><Plus size={20} /> Cadastrar Novo</button>
      </div>
      <div className="space-y-3">
        {filtered.length === 0 && <div className="text-center py-20 text-gray-500 bg-gray-900/50 rounded-xl border border-dashed border-gray-800"><User size={48} className="mx-auto mb-3 opacity-20" /><p>Nenhum paciente encontrado.</p></div>}
        {filtered.map(patient => (
          <div key={patient.id} onClick={() => handleSelect(patient)} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-gray-800 hover:border-gray-600 transition-all group relative overflow-hidden">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${currentPatient?.id === patient.id ? 'bg-primary text-black' : 'bg-gray-800 text-gray-400 group-hover:text-white'}`}>{patient.name.charAt(0).toUpperCase()}</div>
              <div><h3 className={`font-bold text-lg ${currentPatient?.id === patient.id ? 'text-primary' : 'text-white'}`}>{patient.name}</h3><div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5"><span>{patient.age} anos</span><span>•</span><span className="capitalize">{patient.goal}</span></div></div>
            </div>
            <div className="flex items-center gap-2">
               <div className="hidden md:flex flex-col items-end mr-4 text-right"><span className="text-xs text-gray-500 uppercase font-bold">Peso</span><span className="font-bold text-white">{patient.weight > 0 ? `${patient.weight}kg` : '-'}</span></div>
               <div className="flex items-center gap-1 bg-gray-950 p-1 rounded-lg border border-gray-800">
                   <button onClick={(e) => handlePhotos(e, patient)} className="p-2 text-gray-400 hover:text-pink-400 hover:bg-pink-400/10 rounded-md transition-colors"><Camera size={18} /></button>
                   <div className="w-px h-6 bg-gray-800"></div>
                   <button onClick={(e) => handleHistory(e, patient)} className="p-2 text-gray-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-md transition-colors"><History size={18} /></button>
                   <div className="w-px h-6 bg-gray-800"></div>
                   <button onClick={(e) => handleEdit(e, patient)} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors"><Edit size={18} /></button>
                   <div className="w-px h-6 bg-gray-800"></div>
                   <button onClick={(e) => handleDelete(e, patient.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"><Trash2 size={18} /></button>
               </div>
               <ChevronRight className="text-gray-600 group-hover:text-primary transition-colors ml-2" size={20} />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PatientList;
