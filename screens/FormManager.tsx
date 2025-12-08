import React, { useState } from 'react';
import { Search, Plus, MoreVertical, FileText, HelpCircle, FileQuestion, Users } from 'lucide-react';
import Layout from '../components/Layout';
import { Button, Input } from '../components/UI';
import { FormTemplate } from '../types';

// Mock Data
const mockForms: FormTemplate[] = [
  { id: '1', title: 'Novo Formulário', description: '-', responseCount: 0, createdAt: '04/11/2025' },
  { id: '2', title: 'Anamnese Nutricional Padrão (Cópia)', description: 'Avaliação nutricional completa para início de acompanhamento', responseCount: 0, createdAt: '04/11/2025' },
  { id: '3', title: 'Anamnese Nutricional Padrão', description: 'Avaliação nutricional completa para início de acompanhamento', responseCount: 0, createdAt: '15/10/2025' },
  { id: '4', title: 'Digestão e Saúde Intestinal', description: 'Avaliação da saúde digestiva e intestinal', responseCount: 0, createdAt: '15/10/2025' },
  { id: '5', title: 'Estilo de Vida, Social e Orçamento', description: 'Avaliação do estilo de vida e contexto social', responseCount: 0, createdAt: '15/10/2025' },
  { id: '6', title: 'Medicamentos, Suplementos e Exames', description: 'Levantamento de medicamentos, suplementos e exames', responseCount: 0, createdAt: '15/10/2025' },
  { id: '7', title: 'Histórico de Peso e Medidas', description: 'Avaliação do histórico de peso e composição corporal', responseCount: 0, createdAt: '15/10/2025' },
  { id: '8', title: 'Hábitos Alimentares (Rotina)', description: 'Avaliação dos hábitos e rotina alimentar', responseCount: 0, createdAt: '15/10/2025' },
];

const FormManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forms' | 'responses'>('forms');
  const [searchTerm, setSearchTerm] = useState('');
  const [forms, setForms] = useState<FormTemplate[]>(mockForms);

  const filteredForms = forms.filter(f => 
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Formulários Pré-Consulta">
      <div className="relative min-h-[calc(100vh-140px)] flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
                <h2 className="text-xl font-bold text-white">Formulários Pré-Consulta</h2>
                <p className="text-gray-400 text-sm mt-1">Crie formulários e gerencie respostas dos pacientes</p>
            </div>
            <Button className="!w-auto flex items-center gap-2 px-6 shadow-lg shadow-primary/20">
                <Plus size={18} /> Criar Formulário
            </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-800 mb-6">
            <button 
                onClick={() => setActiveTab('forms')}
                className={`pb-3 px-2 flex items-center gap-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'forms' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
                <FileQuestion size={18} />
                Formulários
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'forms' ? 'bg-primary/20 text-primary' : 'bg-gray-800 text-gray-500'}`}>
                    {forms.length}
                </span>
            </button>
            <button 
                onClick={() => setActiveTab('responses')}
                className={`pb-3 px-2 flex items-center gap-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'responses' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}
            >
                <Users size={18} />
                Respostas
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === 'responses' ? 'bg-primary/20 text-primary' : 'bg-gray-800 text-gray-500'}`}>
                    0
                </span>
            </button>
        </div>

        {/* Content */}
        {activeTab === 'forms' ? (
            <div className="flex-1 flex flex-col animate-fade-in">
                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    <Input 
                        placeholder="Buscar formulário..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="!pl-10 !mb-0 !bg-gray-900"
                    />
                    <div className="absolute right-4 top-4 text-xs text-gray-500">
                        {filteredForms.length} formulários encontrados
                    </div>
                </div>

                {/* Table Header */}
                <div className="bg-gray-900 border border-gray-800 rounded-t-xl grid grid-cols-12 p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-5 md:col-span-4">Título</div>
                    <div className="col-span-4 hidden md:block">Descrição</div>
                    <div className="col-span-2 md:col-span-1 text-center">Respostas</div>
                    <div className="col-span-3 md:col-span-2 text-right md:text-left md:pl-4">Criado em</div>
                    <div className="col-span-2 md:col-span-1 text-right">Ações</div>
                </div>

                {/* Table Body */}
                <div className="bg-gray-900/50 border-x border-b border-gray-800 rounded-b-xl divide-y divide-gray-800">
                    {filteredForms.map(form => (
                        <div key={form.id} className="grid grid-cols-12 p-4 items-center hover:bg-gray-800/50 transition-colors group">
                            
                            {/* Title */}
                            <div className="col-span-5 md:col-span-4 text-sm font-bold text-gray-200 truncate pr-2">
                                {form.title}
                            </div>
                            
                            {/* Description */}
                            <div className="col-span-4 hidden md:block text-sm text-gray-500 truncate pr-2">
                                {form.description}
                            </div>
                            
                            {/* Responses Badge */}
                            <div className="col-span-2 md:col-span-1 flex justify-center">
                                <span className={`px-2 py-1 rounded text-xs font-bold min-w-[30px] text-center ${form.responseCount > 0 ? 'bg-primary text-black' : 'bg-gray-800 text-gray-400'}`}>
                                    {form.responseCount}
                                </span>
                            </div>
                            
                            {/* Created At */}
                            <div className="col-span-3 md:col-span-2 text-xs text-gray-400 text-right md:text-left md:pl-4">
                                {form.createdAt}
                            </div>
                            
                            {/* Actions */}
                            <div className="col-span-2 md:col-span-1 flex justify-end">
                                <button className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {filteredForms.length === 0 && (
                        <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                            <FileText size={48} className="opacity-20 mb-4" />
                            <p>Nenhum formulário encontrado.</p>
                        </div>
                    )}
                </div>
            </div>
        ) : (
            /* Responses Tab Placeholder */
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 animate-fade-in bg-gray-900/30 rounded-xl border border-dashed border-gray-800 m-1">
                <Users size={48} className="opacity-20 mb-4" />
                <p>Nenhuma resposta recebida ainda.</p>
                <p className="text-xs mt-2">Compartilhe seus formulários para começar a receber dados.</p>
            </div>
        )}

        {/* FAB Help Button */}
        <button className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-black rounded-full shadow-xl shadow-primary/20 flex items-center justify-center hover:scale-110 transition-transform z-50">
            <HelpCircle size={24} />
        </button>

      </div>
    </Layout>
  );
};

export default FormManager;