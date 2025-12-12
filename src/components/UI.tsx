
import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }> = ({ 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  const baseStyle = "w-full font-bold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-black shadow-glow hover:shadow-glow-hover hover:bg-[#b5dd82] active:scale-[0.98]",
    outline: "border border-primary text-primary bg-transparent hover:bg-primary/10 active:scale-[0.98]",
    ghost: "bg-gray-800 text-gray-300 hover:bg-gray-700 active:scale-[0.98]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props} />
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">{label}</label>}
    <input 
      className={`w-full bg-gray-900 border border-gray-800 rounded-xl py-3.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 ${className}`}
      {...props}
    />
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ label, className = '', children, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">{label}</label>}
    <div className="relative">
      <select 
        className={`w-full bg-gray-900 border border-gray-800 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all duration-200 cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);

export const DashboardCard: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  onClick: () => void;
  color?: string;
}> = ({ title, icon, onClick, color }) => (
  <div 
    onClick={onClick}
    className="bg-[#121212] border border-gray-800 rounded-2xl p-5 flex flex-col items-center justify-center gap-4 aspect-square cursor-pointer hover:bg-gray-800 hover:border-primary/30 transition-all duration-300 group active:scale-95 shadow-lg relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div 
      className="p-4 rounded-full transition-transform duration-300 group-hover:scale-110 shadow-glow"
      style={{ 
        backgroundColor: color ? `${color}15` : 'rgba(166,206,113,0.1)', 
        color: color || '#A6CE71' 
      }}
    >
      {icon}
    </div>
    <span className="text-sm font-bold text-center text-gray-300 group-hover:text-white transition-colors tracking-wide">{title}</span>
  </div>
);
