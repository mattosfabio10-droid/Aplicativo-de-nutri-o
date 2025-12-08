import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button, Input } from '../components/UI';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      const success = login(email, password);
      if (success) navigate('/dashboard');
      else { setErrorMsg('Credenciais inválidas.'); setLoading(false); }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80"></div>
      <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-xl border border-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl relative z-10 flex flex-col items-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center text-primary shadow-2xl border border-gray-800 relative overflow-hidden">
             <Leaf size={64} />
          </div>
          <div className="h-px w-24 bg-primary/50 my-3"></div>
          <p className="text-primary text-sm uppercase tracking-widest font-bold text-center">Mattos NutriCare</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5 w-full">
          {errorMsg && <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-lg text-xs flex items-center gap-2"><AlertCircle size={14} /> {errorMsg}</div>}
          <Input type="email" label="Email" placeholder="fabio@nutri.com" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" label="Senha" placeholder="123456" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" disabled={loading} className="!mt-8 shadow-xl uppercase tracking-wider text-sm">{loading ? 'Acessando...' : 'Entrar'}</Button>
        </form>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center w-full">
          <button onClick={() => { setEmail('fabio@nutri.com'); setPassword('123456'); }} className="text-primary text-xs hover:underline bg-primary/10 px-2 py-1 rounded">Dr. Fábio (Demo)</button>
        </div>
      </div>
    </div>
  );
};
export default Login;