
import React, { useState } from 'react';

// Added key to the prop type to satisfy TypeScript when used in a list map
const Swatch = ({ color, label, key }: { color: string, label: string, key?: React.Key }) => (
  <div 
    key={key}
    className="group flex flex-col gap-2 cursor-pointer" 
    onClick={() => navigator.clipboard.writeText(color)}
  >
    <div 
      className="w-full h-24 rounded-xl shadow-sm border border-black/5 group-hover:scale-[1.02] transition-all relative overflow-hidden"
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
        <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">content_copy</span>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">{label}</span>
      <span className="text-[10px] font-mono font-bold text-text-main">{color.toUpperCase()}</span>
    </div>
  </div>
);

export const PaletteGenerator: React.FC<{ onBack: () => void, setActions: (a: any) => void }> = () => {
  const [baseColor, setBaseColor] = useState('#0b57d0');

  // Simple harmony generation logic (Hex only)
  const generateShades = (hex: string) => {
    return [0.1, 0.3, 0.5, 0.7, 0.9].map(opacity => hex); // Placeholder for real logic
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input 
            type="color" value={baseColor} 
            onChange={(e) => setBaseColor(e.target.value)} 
            className="size-12 rounded-lg border-none bg-transparent cursor-pointer shadow-sm"
          />
          <div>
            <h3 className="text-sm font-black text-text-main">Base Brand Color</h3>
            <p className="text-[10px] text-text-secondary font-medium">Pick a core color to generate harmony schemes.</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-100 rounded-lg text-[10px] font-black hover:bg-slate-200 transition-all">RANDOM</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
           <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Tints & Shades</h4>
              <div className="grid grid-cols-5 gap-3">
                 {[100, 300, 500, 700, 900].map(weight => (
                   <Swatch key={weight} color={baseColor} label={`Weight ${weight}`} />
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">UI Preview</h4>
              <div className="p-10 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-center">
                 <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                    <div className="h-24" style={{ backgroundColor: baseColor }} />
                    <div className="p-6 space-y-4">
                       <div className="h-4 w-3/4 bg-slate-100 rounded" />
                       <div className="space-y-2">
                          <div className="h-2 w-full bg-slate-50 rounded" />
                          <div className="h-2 w-5/6 bg-slate-50 rounded" />
                       </div>
                       <button className="w-full py-2.5 rounded-lg text-white font-black text-xs shadow-lg" style={{ backgroundColor: baseColor }}>
                          Call to Action
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="md:col-span-4 space-y-6">
           <div className="bg-slate-900 text-white rounded-xl p-6 space-y-4 shadow-xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-pink-400">Usage Recommendation</h4>
              <p className="text-xs font-light leading-relaxed opacity-70">
                Use your 500 weight for primary actions. The 900 weight is ideal for text on light backgrounds or headers.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
