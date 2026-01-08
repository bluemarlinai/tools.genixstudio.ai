
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
    <div className="space-y-4 mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="size-10 flex items-center justify-center rounded-full bg-white border border-border-light text-text-secondary hover:text-primary hover:border-primary transition-all shadow-sm active:scale-90"
            title="Back to home"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span className="cursor-pointer hover:text-primary transition-colors font-medium" onClick={onBack}>Home</span>
            <span className="opacity-30">/</span>
            <span className="font-bold text-text-main">{category}</span>
            <span className="opacity-30">/</span>
            <span className="text-primary font-black">{title}</span>
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
      
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
          {icon && <span className="material-symbols-outlined text-primary text-[32px]">{icon}</span>}
          {title}
        </h1>
        <p className="text-text-secondary text-lg leading-relaxed max-w-3xl font-light">
          {description}
        </p>
      </div>
    </div>
  );
};
