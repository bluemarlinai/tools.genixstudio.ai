
import React, { useState } from 'react';

export const WcagContrast: React.FC<{ setActions: (a: any) => void }> = () => {
  const [bg, setBg] = useState('#ffffff');
  const [fg, setFg] = useState('#0b57d0');

  // Simple contrast calculation logic
  const getLuminance = (hex: string) => {
    const rgb = hex.substring(1).match(/.{2}/g)?.map(x => parseInt(x, 16) / 255) || [0,0,0];
    const a = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum1 = getLuminance(bg);
  const lum2 = getLuminance(fg);
  const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);

  const PassTag = ({ pass }: { pass: boolean }) => (
    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${pass ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
      {pass ? 'PASS' : 'FAIL'}
    </span>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white rounded-2xl border border-border-light p-6 space-y-6 shadow-sm">
           <div className="space-y-4">
              <div className="space-y-1.5">
                 <label className="text-[9px] font-black uppercase text-slate-400">Background Color</label>
                 <div className="flex gap-2">
                    <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="size-10 border-none bg-transparent cursor-pointer" />
                    <input type="text" value={bg} readOnly className="flex-1 bg-slate-50 border-none rounded-lg px-3 py-2 font-mono text-sm" />
                 </div>
              </div>
              <div className="space-y-1.5">
                 <label className="text-[9px] font-black uppercase text-slate-400">Foreground Text</label>
                 <div className="flex gap-2">
                    <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="size-10 border-none bg-transparent cursor-pointer" />
                    <input type="text" value={fg} readOnly className="flex-1 bg-slate-50 border-none rounded-lg px-3 py-2 font-mono text-sm" />
                 </div>
              </div>
           </div>
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 text-white text-center space-y-2 shadow-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Contrast Ratio</p>
           <h3 className="text-4xl font-black text-primary italic tracking-tighter">{ratio.toFixed(2)} : 1</h3>
        </div>
      </div>

      <div className="lg:col-span-8 flex flex-col gap-6">
         <div className="bg-white rounded-2xl border border-border-light overflow-hidden shadow-sm">
            <div className="p-20 flex items-center justify-center transition-colors" style={{ backgroundColor: bg }}>
               <div className="text-center" style={{ color: fg }}>
                  <h1 className="text-4xl font-black mb-2">Headline Example</h1>
                  <p className="text-lg font-medium opacity-80">This is a paragraph example for preview.</p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-border-light flex flex-col gap-3">
               <h4 className="text-[11px] font-black text-text-main uppercase tracking-tight border-b pb-2">Normal Text</h4>
               <div className="flex justify-between items-center"><span className="text-xs">WCAG AA (4.5:1)</span> <PassTag pass={ratio >= 4.5} /></div>
               <div className="flex justify-between items-center"><span className="text-xs">WCAG AAA (7.0:1)</span> <PassTag pass={ratio >= 7} /></div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-border-light flex flex-col gap-3">
               <h4 className="text-[11px] font-black text-text-main uppercase tracking-tight border-b pb-2">Large Text / UI</h4>
               <div className="flex justify-between items-center"><span className="text-xs">WCAG AA (3.0:1)</span> <PassTag pass={ratio >= 3} /></div>
               <div className="flex justify-between items-center"><span className="text-xs">WCAG AAA (4.5:1)</span> <PassTag pass={ratio >= 4.5} /></div>
            </div>
         </div>
      </div>
    </div>
  );
};
