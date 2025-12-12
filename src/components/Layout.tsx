
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, User, Settings as SettingsIcon, LogOut, Menu, X,
  ClipboardList, Ruler, Repeat, BookOpen, Leaf, FileHeart,
  FileCheck, FlaskConical, CalendarDays, Scale, Utensils,
  Calculator, History, Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const { currentPatient, logout } = useApp();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Visão Geral', icon: <Home size={20} />, path: '/dashboard' },
    { label: 'Agenda', icon: <CalendarDays size={20} />, path: '/agenda' },
    { label: 'Pacientes', icon: <User size={20} />, path: '/patients' },
    { label: 'Prontuário', icon: <History size={20} />, path: '/patient-history' },
    { label: 'Fotos', icon: <ImageIcon size={20} />, path: '/patient-photos' },
    { label: 'Dieta IA', icon: <Utensils size={20} />, path: '/meal-plan-ai' },
    { label: 'Calculadoras', icon: <Calculator size={20} />, path: '/calculators' },
    { label: 'Bioimpedância', icon: <Scale size={20} />, path: '/bioimpedance' }, 
    { label: 'Exames', icon: <FlaskConical size={20} />, path: '/lab-analysis' },
    { label: 'Anamnese', icon: <ClipboardList size={20} />, path: '/anamnesis' },
    { label: 'Antropometria', icon: <Ruler size={20} />, path: '/anthropometry' },
    { label: 'Documentos', icon: <FileCheck size={20} />, path: '/certificates' },
    { label: 'Substituições', icon: <Repeat size={20} />, path: '/substitutions' },
    { label: 'Orientações', icon: <FileHeart size={20} />, path: '/guidelines' },
    { label: 'Protocolos', icon: <BookOpen size={20} />, path: '/protocols' },
    { label: 'Configurações', icon: <SettingsIcon size={20} />, path: '/settings' },
  ];

  const handleNavigate = (path: string) => {
    const freeRoutes = [
        '/patients', '/dashboard', '/substitutions', '/settings', 
        '/protocols', '/guidelines', '/certificates', '/agenda',
        '/calculators', '/patient-history', '/patient-photos'
    ];
    
    if (!freeRoutes.includes(path) && !currentPatient) {
      alert("Selecione um paciente na lista primeiro para acessar este módulo.");
      navigate('/patients');
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden font-sans">
      <aside className="hidden md:flex w-72 flex-col bg-[#050505] border-r border-gray-900">
        <div className="p-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-primary shadow-glow">
             <Leaf size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-none">Mattos</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1">NutriCare</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'text-primary bg-primary/5' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-glow"></div>}
                <div className={`${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-white'} transition-colors`}>
                    {item.icon}
                </div>
                <span className={`text-sm font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-gray-900">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/10 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="text-sm font-medium">Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 bg-black relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none" />

        <header className="h-20 flex items-center justify-between px-6 md:px-10 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-400 hover:text-white p-2" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white tracking-tight">{title || 'Dashboard'}</h2>
          </div>

          {currentPatient && (
            <div className="flex items-center gap-4 bg-[#121212] pl-5 pr-2 py-2 rounded-full border border-gray-800 shadow-lg">
              <div className="hidden md:block text-right">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Paciente</p>
                <p className="text-sm font-bold text-primary leading-tight">{currentPatient.name.split(' ')[0]}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-bold text-lg shadow-glow">
                {currentPatient.name.charAt(0)}
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto px-4 md:px-10 pb-10 custom-scrollbar z-10">
          <div className="max-w-7xl mx-auto w-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative bg-[#121212] w-72 h-full shadow-2xl flex flex-col animate-slide-in border-r border-gray-800">
            <div className="p-6 flex items-center justify-between border-b border-gray-800">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-primary">
                     <Leaf size={16} />
                  </div>
                  <span className="text-lg font-bold text-white">Mattos Nutri</span>
               </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium ${
                    location.pathname === item.path 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-4 text-red-400 hover:bg-red-900/10 rounded-xl mt-6 border border-transparent hover:border-red-900/30">
                <LogOut size={20} />
                Sair
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
