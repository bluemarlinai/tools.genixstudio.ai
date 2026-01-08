
import React from 'react';

interface ToolHeaderProps {
  title: string;
  category: string;
  description: string;
  onBack: () => void;
  icon?: string;
  actions?: React.ReactNode;
}

export const ToolHeader: React.FC<ToolHeaderProps> = ({ title, category, description, onBack, icon, actions }) => {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="size-8 flex items-center justify-center rounded-full bg-white border border-border-light text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90"
            title="Back to home"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-2 text-[11px] text-text-secondary">
            <span className="cursor-pointer hover:text-primary transition-colors font-medium" onClick={onBack}>Home</span>
            <span className="opacity-30">/</span>
            <span className="font-bold text-text-main uppercase tracking-tighter">{category}</span>
            <span className="opacity-30">/</span>
            <span className="text-primary font-black uppercase tracking-tighter">{title}</span>
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      
      <div className="flex flex-col gap-0.5">
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
          {icon && <span className="material-symbols-outlined text-primary text-[28px]">{icon}</span>}
          {title}
        </h1>
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl font-light">
          {description}
        </p>
      </div>
    </div>
  );
};
