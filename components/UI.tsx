import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }> = ({ 
  className = '', 
  variant = 'primary', 
  ...props 
}) => {
  const baseStyle = "w-full font-bold py-3.5 px-6 rounded-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-black shadow-[0_0_15px_rgba(166,206,113,0.3)] hover:shadow-[0_0_25px_rgba(166,206,113,0.5)]",
    outline: "border border-primary text-primary bg-transparent hover:bg-primary/10",
    ghost: "bg-gray-800 text-gray-300 hover:bg-gray-700"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props} />
  );
};

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-primary text-xs font-bold mb-2 uppercase tracking-wide">{label}</label>}
    <input 
      className={`w-full bg-gray-900 border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${className}`}
      {...props}
    />
  </div>
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }> = ({ label, className = '', children, ...props }) => (
  <div className="mb-4">
    {label && <label className="block text-primary text-xs font-bold mb-2 uppercase tracking-wide">{label}</label>}
    <select 
      className={`w-full bg-gray-900 border border-gray-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none ${className}`}
      {...props}
    >
      {children}
    </select>
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
    className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 aspect-square cursor-pointer hover:bg-gray-800 hover:border-primary/50 transition-all group active:scale-95"
  >
    <div className={`p-3 rounded-full ${color ? `bg-[${color}]/20 text-[${color}]` : 'bg-primary/10 text-primary'} group-hover:scale-110 transition-transform duration-300`}>
      {icon}
    </div>
    <span className="text-sm font-medium text-center text-gray-200">{title}</span>
  </div>
);