
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, AlertCircle, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Input } from '../components/UI';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useApp();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('fabio@nutri.com');
  const [password, setPassword] = useState('123456');

  useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      const success = login(email, password);
      if (!success) {
        setErrorMsg('Credenciais inválidas. Tente novamente.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none animate-pulse duration-10000"></div>
      
      <div className="w-full max-w-md bg-[#121212]/80 backdrop-blur-xl border border-gray-800/50 p-10 rounded-3xl shadow-2xl relative z-10 flex flex-col items-center">
        <div className="mb-10 flex flex-col items-center relative">
          <div className="w-32 h-32 mb-6 relative flex items-center justify-center group">
             <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
             {!imageError ? (
               <img src="https://i.imgur.com/JrGn2f5.png" alt="Logo" className="w-full h-full object-contain relative z-10 drop-shadow-2xl" onError={() => setImageError(true)} />
             ) : (
               <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center text-primary border border-gray-800 relative z-10 shadow-glow"><Leaf size={48} /></div>
             )}
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Mattos NutriCare</h1>
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Portal do Especialista</p>
        </div>
        
        <form onSubmit={handleLogin} className="w-full space-y-6">
          {errorMsg && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-center gap-3"><AlertCircle size={18} /> {errorMsg}</div>}
          <div className="space-y-5">
             <Input type="email" label="Email Corporativo" value={email} onChange={e => setEmail(e.target.value)} className="!bg-black/50 !border-gray-800 focus:!border-primary/50 !py-4" />
             <div className="relative">
                <Input type="password" label="Senha de Acesso" value={password} onChange={e => setPassword(e.target.value)} className="!bg-black/50 !border-gray-800 focus:!border-primary/50 !py-4" />
                <Lock size={16} className="absolute right-4 top-[42px] text-gray-600" />
             </div>
          </div>
          <Button type="submit" disabled={loading} className="!mt-8 !py-4 shadow-glow hover:shadow-glow-hover text-base tracking-wide">
            {loading ? 'Autenticando...' : <>Acessar Sistema <ArrowRight size={20} /></>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
