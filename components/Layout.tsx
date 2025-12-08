
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  User, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu,
  X,
  ClipboardList,
  Ruler,
  Repeat,
  BookOpen,
  Sparkles,
  Leaf,
  FileHeart,
  FileCheck,
  FlaskConical,
  CalendarDays,
  Scale
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const { currentPatient, logout } = useApp();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [imageError, setImageError] = useState(false);

  const navItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
    { label: 'Agenda', icon: <CalendarDays size={20} />, path: '/agenda' },
    { label: 'Pacientes', icon: <User size={20} />, path: '/patients' },
    { label: 'IA Nutricional', icon: <Sparkles size={20} />, path: '/meal-plan-ai' },
    { label: 'Bioimpedância', icon: <Scale size={20} />, path: '/bioimpedance' }, // Item Novo
    { label: 'Exames Lab.', icon: <FlaskConical size={20} />, path: '/lab-analysis' },
    { label: 'Anamnese', icon: <ClipboardList size={20} />, path: '/anamnesis' },
    { label: 'Antropometria', icon: <Ruler size={20} />, path: '/anthropometry' },
    { label: 'Atestados', icon: <FileCheck size={20} />, path: '/certificates' },
    { label: 'Substituição', icon: <Repeat size={20} />, path: '/substitutions' },
    { label: 'Orientações', icon: <FileHeart size={20} />, path: '/guidelines' },
    { label: 'Protocolos', icon: <BookOpen size={20} />, path: '/protocols' },
    { label: 'Configurações', icon: <SettingsIcon size={20} />, path: '/settings' },
  ];

  const handleNavigate = (path: string) => {
    // Rotas livres que não exigem paciente selecionado
    const freeRoutes = ['/patients', '/dashboard', '/substitutions', '/settings', '/protocols', '/guidelines', '/certificates', '/agenda'];
    
    if (!freeRoutes.includes(path) && !currentPatient) {
      alert("Selecione um paciente na lista primeiro.");
      navigate('/patients');
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const LogoComponent = () => (
    <div className="w-12 h-12 flex items-center justify-center">
      {!imageError ? (
        <img 
            src="https://i.imgur.com/JrGn2f5.png" 
            alt="Logo" 
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-black border border-gray-800 flex items-center justify-center text-primary">
          <Leaf size={20} fill="currentColor" fillOpacity={0.3} />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-gray-900 border-r border-gray-800">
        <div className="p-6 flex items-center gap-3 border-b border-gray-800">
          <LogoComponent />
          <div>
            <h1 className="text-lg font-sans uppercase tracking-wide text-white leading-tight">Mattos</h1>
            <p className="text-[10px] text-primary uppercase tracking-wider">NutriCare</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary text-black font-bold shadow-lg shadow-primary/20' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header (Desktop & Mobile) */}
        <header className="h-16 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-bold text-white md:text-xl truncate">
              {title || 'Dashboard'}
            </h2>
          </div>

          {currentPatient && (
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-xs text-gray-500 uppercase font-bold">Paciente Atual</p>
                <p className="text-sm font-bold text-primary">{currentPatient.name}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-primary font-bold">
                {currentPatient.name.charAt(0)}
              </div>
            </div>
          )}
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-black">
          <div className="max-w-6xl mx-auto w-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative bg-gray-900 w-64 h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-6 flex items-center justify-between border-b border-gray-800">
               <div className="w-full flex items-center gap-3">
                  <LogoComponent />
                  <span className="text-lg font-bold text-white">Mattos NutriCare</span>
               </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                    location.pathname === item.path 
                      ? 'bg-primary text-black font-bold' 
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
              <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/10 rounded-xl mt-4"
              >
                <LogOut size={20} />
                <span className="text-sm">Sair</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
