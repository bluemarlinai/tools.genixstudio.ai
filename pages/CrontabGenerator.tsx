
import React, { useState, useEffect } from 'react';

interface CrontabGeneratorProps {
  onBack: () => void;
  setActions: (actions: React.ReactNode) => void;
}

export const CrontabGenerator: React.FC<CrontabGeneratorProps> = ({ onBack, setActions }) => {
  const [expression, setExpression] = useState('* * * * *');

  useEffect(() => {
    // AI Explain removed to prevent unauthorized API usage
    setActions(null);
  }, []);

  const presets = [
    { name: 'Every minute', val: '* * * * *' },
    { name: 'Hourly', val: '0 * * * *' },
    { name: 'Daily at midnight', val: '0 0 * * *' },
    { name: 'Weekly', val: '0 0 * * 0' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Presets</label>
          <div className="flex flex-wrap gap-2">
            {presets.map(p => (
              <button 
                key={p.name}
                onClick={() => setExpression(p.val)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${expression === p.val ? 'bg-primary text-white' : 'bg-slate-50 text-text-secondary hover:bg-slate-100'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Expression</label>
          <input 
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full text-4xl font-mono font-black py-6 px-4 bg-slate-50 border-none rounded-3xl text-center focus:ring-2 focus:ring-primary/20 outline-none"
          />
          <div className="flex justify-center gap-12 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            <span>Min</span><span>Hour</span><span>Day</span><span>Month</span><span>Week</span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50/30 rounded-[2.5rem] border border-indigo-100 p-10 flex flex-col items-center justify-center text-center gap-6">
        <div className="size-16 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
          <span className="material-symbols-outlined text-[32px]">info</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-black uppercase tracking-widest text-indigo-400">Status</h3>
          <p className="text-xl font-display font-medium text-text-main leading-relaxed">
            AI Explanations are currently disabled to optimize performance.
          </p>
        </div>
      </div>
    </div>
  );
};
