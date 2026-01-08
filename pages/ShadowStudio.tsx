
import React, { useState } from 'react';

export const ShadowStudio: React.FC<{ setActions: (a: any) => void }> = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(10);
  const [blur, setBlur] = useState(25);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.15);

  const rgba = (hex: string, op: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${op})`;
  };

  const shadow = `${x}px ${y}px ${blur}px ${spread}px ${rgba(color, opacity)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-border-light shadow-sm space-y-6">
         <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary border-b pb-4">Controls</h3>
         <div className="space-y-4">
            {[
              { label: 'Offset X', val: x, set: setX, min: -100, max: 100 },
              { label: 'Offset Y', val: y, set: setY, min: -100, max: 100 },
              { label: 'Blur', val: blur, set: setBlur, min: 0, max: 200 },
              { label: 'Spread', val: spread, set: setSpread, min: -50, max: 50 },
            ].map(ctrl => (
              <div key={ctrl.label} className="space-y-1">
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400">
                   <span>{ctrl.label}</span>
                   <span className="text-primary">{ctrl.val}px</span>
                </div>
                <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val} onChange={(e) => ctrl.set(parseInt(e.target.value))} className="w-full accent-primary h-1 bg-slate-100 rounded-lg appearance-none" />
              </div>
            ))}
            <div className="space-y-1">
               <div className="flex justify-between text-[9px] font-black uppercase text-slate-400">
                  <span>Opacity</span>
                  <span className="text-primary">{Math.round(opacity * 100)}%</span>
               </div>
               <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full accent-primary h-1 bg-slate-100 rounded-lg appearance-none" />
            </div>
         </div>
         <button onClick={() => navigator.clipboard.writeText(`box-shadow: ${shadow};`)} className="w-full bg-primary text-white font-black py-4 rounded-2xl active:scale-95 transition-all shadow-lg shadow-primary/10 text-xs">COPY CSS</button>
      </div>

      <div className="lg:col-span-8 flex flex-col gap-6">
         <div className="bg-slate-50 p-20 rounded-[3rem] border border-slate-100 flex items-center justify-center pattern-grid min-h-[400px]">
            <div 
              className="size-48 bg-white rounded-3xl transition-all duration-300"
              style={{ boxShadow: shadow }}
            />
         </div>
         <div className="bg-slate-900 p-6 rounded-2xl text-emerald-400 font-mono text-[11px] border border-slate-800">
            <code>box-shadow: {shadow};</code>
         </div>
      </div>
    </div>
  );
};
