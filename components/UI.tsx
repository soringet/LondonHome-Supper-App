import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  size = 'md',
  ...props 
}) => {
  const baseStyles = 'rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center';
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-[8px]',
    md: 'px-4 py-3 text-[10px]',
    lg: 'px-6 py-4 text-[12px]'
  };

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100',
    secondary: 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-100',
    outline: 'border-2 border-slate-200 text-slate-700 hover:bg-slate-100',
    danger: 'bg-rose-500 text-white hover:bg-rose-600'
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div 
    className={`bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'warning' | 'info'; className?: string }> = ({ children, variant = 'info', className = '' }) => {
  const styles = {
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    info: 'bg-indigo-100 text-indigo-700'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const ListItem: React.FC<{ icon: string; label: string; value?: string; onClick?: () => void }> = ({ icon, label, value, onClick }) => (
  <button 
    onClick={onClick} 
    className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
    aria-label={`${label} ${value || ''}`}
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-xl" aria-hidden="true">{icon}</div>
      <span className="text-xs font-black text-slate-800 uppercase tracking-tighter">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-xs font-bold text-slate-400">{value}</span>}
      <span className="text-slate-300" aria-hidden="true">→</span>
    </div>
  </button>
);