
import React, { useState, useEffect } from 'react';

interface GradientGeneratorProps {
  onBack: () => void;
  setActions: (actions: React.ReactNode) => void;
}

export const GradientGenerator: React.FC<GradientGeneratorProps> = ({ setActions }) => {
  const [color1, setColor1] = useState('#0b57d0');
  const [color2, setColor2] = useState('#9b72cb');
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState<'linear' | 'radial'>('linear');

  const css = type === 'linear' 
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})` 
    : `radial-gradient(circle, ${color1}, ${color2})`;

  useEffect(() => {
    setActions(
      <button 
        onClick={() => navigator.clipboard.writeText(`background: ${css};`)}
        className="bg-primary text-white px-3 py-1.5 rounded-lg text-[10px] font-black active:scale-95 transition-all shadow-sm"
      >
        COPY CSS
      </button>
    );
  }, [css]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 bg-white rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden min-h-[400px]">
        <div 
          className="flex-1 transition-all duration-500" 
          style={{ background: css }}
        />
        <div className="p-4 bg-slate-50 border-t border-border-light font-mono text-[11px] text-text-secondary">
          <code>background: {css};</code>
        </div>
      </div>

      <div className="lg:col-span-4 bg-white rounded-xl border border-border-light shadow-sm p-5 space-y-5">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary border-b pb-2">Config</h3>
        
        <div className="space-y-4">
          <div className="flex gap-1 p-0.5 bg-slate-100 rounded-lg">
            {(['linear', 'radial'] as const).map(t => (
              <button 
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${type === t ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase text-slate-400">Start Color</label>
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="size-6 border-none bg-transparent cursor-pointer" />
                <span className="text-[10px] font-mono font-bold uppercase">{color1}</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase text-slate-400">End Color</label>
              <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="size-6 border-none bg-transparent cursor-pointer" />
                <span className="text-[10px] font-mono font-bold uppercase">{color2}</span>
              </div>
            </div>
          </div>

          {type === 'linear' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-black uppercase text-slate-400">Angle</label>
                <span className="text-[10px] font-bold text-primary">{angle}°</span>
              </div>
              <input 
                type="range" min="0" max="360" value={angle} 
                onChange={(e) => setAngle(parseInt(e.target.value))} 
                className="w-full h-1.5 accent-primary bg-slate-100 rounded-lg appearance-none cursor-pointer" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
