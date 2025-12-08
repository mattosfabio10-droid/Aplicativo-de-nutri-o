import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, ClipboardList, Ruler, Sparkles, ArrowRight, FileHeart, FileCheck, FlaskConical, CalendarDays, Scale, Repeat, BookOpen
} from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '../components/UI';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentPatient, currentUser } = useApp();

  const menuItems = [
    { title: 'Pacientes', icon: <Users size={24} />, path: '/patients', color: '#60A5FA' },
    { title: 'Agenda', icon: <CalendarDays size={24} />, path: '/agenda', color: '#FFFFFF' },
    { title: 'Anamnese', icon: <ClipboardList size={24} />, path: '/anamnesis', color: '#F472B6' },
    { title: 'Antropometria', icon: <Ruler size={24} />, path: '/anthropometry', color: '#34D399' },
    { title: 'Bioimpedância', icon: <Scale size={24} />, path: '/bioimpedance', color: '#A6CE71' },
    { title: 'IA Nutricional', icon: <Sparkles size={24} />, path: '/meal-plan-ai', color: '#FBBF24' },
    { title: 'Exames Lab.', icon: <FlaskConical size={24} />, path: '/lab-analysis', color: '#C084FC' },
    { title: 'Atestados', icon: <FileCheck size={24} />, path: '/certificates', color: '#EAB308' },
    { title: 'Orientações', icon: <FileHeart size={24} />, path: '/guidelines', color: '#F87171' },
    { title: 'Substituição', icon: <Repeat size={24} />, path: '/substitutions', color: '#A78BFA' },
    { title: 'Protocolos', icon: <BookOpen size={24} />, path: '/protocols', color: '#9CA3AF' },
  ];

  return (
    <Layout title="Visão Geral">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
             <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo(a), {currentUser?.name}</h2>
             <p className="text-gray-400 mb-6 max-w-md">
               {currentPatient ? `Paciente selecionado: ${currentPatient.name}` : 'Selecione um paciente para iniciar.'}
             </p>
             {!currentPatient ? (
                <Button className="!w-auto px-8" onClick={() => navigate('/patients')}><Users size={18} /> Selecionar Paciente</Button>
             ) : (
                <div className="flex gap-4"><Button className="!w-auto" onClick={() => navigate('/patients')}>Trocar Paciente</Button></div>
             )}
          </div>
        </div>
        <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl flex flex-col justify-between cursor-pointer" onClick={() => navigate(currentPatient ? '/meal-plan-ai' : '/patients')}>
          <div>
            <div className="bg-primary text-black w-10 h-10 rounded-lg flex items-center justify-center mb-4"><Sparkles size={20} /></div>
            <h3 className="font-bold text-white text-lg">Gerador IA</h3>
            <p className="text-sm text-gray-400 mt-1">Crie dietas em segundos.</p>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm mt-4">Acessar <ArrowRight size={16} /></div>
        </div>
      </div>
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><span className="w-1.5 h-6 bg-primary rounded-full"></span> Menu Rápido</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {menuItems.map((item, index) => (
          <div key={index} onClick={() => navigate(item.path)} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col items-start gap-4 cursor-pointer hover:bg-gray-800 hover:border-gray-700 transition-all">
            <div className="p-3 rounded-xl bg-gray-950" style={{ color: item.color }}>{item.icon}</div>
            <div><span className="font-bold text-gray-200 block mb-1">{item.title}</span><span className="text-xs text-gray-500">Acessar</span></div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
export default Dashboard;