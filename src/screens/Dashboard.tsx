
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ClipboardList, Ruler, Utensils, Repeat, BookOpen, ArrowRight, FileHeart, FileCheck, FlaskConical, CalendarDays, Scale, Calculator, History, Image as ImageIcon } from 'lucide-react';
import Layout from '../components/Layout';
import { DashboardCard, Button } from '../components/UI';
import { useApp } from '../context/AppContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentPatient } = useApp();

  const menuItems = [
    { title: 'Pacientes', icon: <Users size={24} />, path: '/patients', color: '#60A5FA' },
    { title: 'Agenda', icon: <CalendarDays size={24} />, path: '/agenda', color: '#FFFFFF' },
    { title: 'Prontuário', icon: <History size={24} />, path: '/patient-history', color: '#94A3B8' },
    { title: 'Fotos', icon: <ImageIcon size={24} />, path: '/patient-photos', color: '#F472B6' },
    { title: 'Anamnese', icon: <ClipboardList size={24} />, path: '/anamnesis', color: '#F472B6' },
    { title: 'Antropometria', icon: <Ruler size={24} />, path: '/anthropometry', color: '#34D399' },
    { title: 'Calculadoras', icon: <Calculator size={24} />, path: '/calculators', color: '#10B981' }, 
    { title: 'Bioimpedância', icon: <Scale size={24} />, path: '/bioimpedance', color: '#A6CE71' }, 
    { title: 'Planej. Alimentar', icon: <Utensils size={24} />, path: '/meal-plan-ai', color: '#FBBF24' },
    { title: 'Exames Lab.', icon: <FlaskConical size={24} />, path: '/lab-analysis', color: '#C084FC' },
    { title: 'Atestados', icon: <FileCheck size={24} />, path: '/certificates', color: '#EAB308' },
    { title: 'Orientações', icon: <FileHeart size={24} />, path: '/guidelines', color: '#F87171' },
    { title: 'Substituição', icon: <Repeat size={24} />, path: '/substitutions', color: '#A78BFA' },
    { title: 'Protocolos', icon: <BookOpen size={24} />, path: '/protocols', color: '#9CA3AF' },
  ];

  return (
    <Layout title="Visão Geral">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 rounded-2xl relative overflow-hidden group shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
          <div className="relative z-10">
             <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo, Fábio Mattos</h2>
             <p className="text-gray-400 mb-6 max-w-md">{currentPatient ? `Você está editando o planejamento de ${currentPatient.name}.` : 'Selecione um paciente para começar a prescrever dietas e avaliações.'}</p>
             {!currentPatient ? (
                <Button className="!w-auto px-8" onClick={() => navigate('/patients')}><Users size={18} /> Selecionar Paciente</Button>
             ) : (
                <div className="flex items-center gap-4">
                  <div className="bg-[#121212] px-4 py-2 rounded-xl border border-gray-800"><span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Peso</span><p className="font-bold text-white">{currentPatient.weight} kg</p></div>
                  <div className="bg-[#121212] px-4 py-2 rounded-xl border border-gray-800"><span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Objetivo</span><p className="font-bold text-primary">{currentPatient.goal}</p></div>
                   <Button className="!w-auto !bg-gray-800 !text-white !border !border-gray-700 hover:!bg-gray-700" onClick={() => navigate('/patients')}>Trocar</Button>
                </div>
             )}
          </div>
        </div>
        <div className="bg-[#121212] border border-gray-800 p-6 rounded-2xl flex flex-col justify-between hover:border-primary/50 transition-colors cursor-pointer group shadow-lg" onClick={() => currentPatient ? navigate('/meal-plan-ai') : navigate('/patients')}>
          <div>
            <div className="bg-primary text-black w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-glow group-hover:scale-110 transition-transform"><Utensils size={24} /></div>
            <h3 className="font-bold text-white text-lg">Criar Dieta</h3>
            <p className="text-sm text-gray-400 mt-1">Use a Inteligência Artificial ou crie um plano do zero manualmente.</p>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm mt-4">Acessar Planejamento <ArrowRight size={16} /></div>
        </div>
      </div>
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2"><span className="w-1.5 h-6 bg-primary rounded-full shadow-glow"></span> Menu Rápido</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {menuItems.map((item, index) => (
          <DashboardCard key={index} title={item.title} icon={item.icon} color={item.color} onClick={() => {
              const patientRequired = ['/anamnesis', '/anthropometry', '/meal-plan-ai', '/lab-analysis', '/bioimpedance', '/patient-history', '/patient-photos'];
              if (patientRequired.includes(item.path) && !currentPatient) { alert("Selecione um paciente primeiro para acessar este módulo."); return; }
              navigate(item.path);
            }}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
