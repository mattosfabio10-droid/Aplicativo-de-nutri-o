
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Input } from '../components/UI';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useApp();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form States - JÁ PREENCHIDOS FIXOS
  const [email, setEmail] = useState('fabio@nutri.com');
  const [password, setPassword] = useState('123456');

  // Se já estiver logado (ex: deu F5), vai direto pro dashboard
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
      
      if (success) {
        navigate('/dashboard');
      } else {
        setErrorMsg('Credenciais inválidas. Verifique email e senha.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl relative z-10 flex flex-col items-center">
        
        {/* Logo Image */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-40 h-40 mb-4 relative flex items-center justify-center">
             {!imageError ? (
               <img 
                  src="https://i.imgur.com/JrGn2f5.png" 
                  alt="Logo Mattos NutriCare" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
               />
             ) : (
               <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center text-primary shadow-2xl shadow-primary/10 border border-gray-800 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-50"></div>
                 <Leaf size={64} className="relative z-10" fill="currentColor" fillOpacity={0.2} />
               </div>
             )}
          </div>
          
          <div className="h-px w-24 bg-primary/50 my-3"></div>

          <p className="text-primary text-sm uppercase tracking-widest font-bold text-center">
            Mattos NutriCare
          </p>
          <p className="text-gray-400 text-xs uppercase tracking-wider font-light mt-1 text-center">
            Nutrição Ortomolecular
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5 w-full">
          {errorMsg && (
            <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle size={14} /> {errorMsg}
            </div>
          )}

          <div className="space-y-1">
             <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
             <Input 
                type="email" 
                placeholder="seunome@nutri.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="!bg-black/50 !border-gray-700 focus:!border-primary" 
             />
          </div>
          <div className="space-y-1">
             <label className="text-xs font-bold text-gray-500 uppercase ml-1">Senha</label>
             <Input 
                type="password" 
                placeholder="••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="!bg-black/50 !border-gray-700 focus:!border-primary" 
             />
          </div>
          
          <Button type="submit" disabled={loading} className="!mt-8 shadow-xl uppercase tracking-wider text-sm">
            {loading ? 'Acessando...' : 'Entrar no Sistema'}
            {!loading && <ArrowRight size={18} />}
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center w-full">
          <p className="text-gray-500 text-xs mb-2">Acesso Rápido</p>
          <div className="flex justify-center gap-2">
             <span className="text-xs text-gray-600 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
               Credenciais preenchidas automaticamente
             </span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 text-center w-full text-gray-800 text-[10px] uppercase tracking-widest">
         &copy; 2024 Mattos NutriCare
      </div>
    </div>
  );
};

export default Login;
