
import React, { useState, useEffect } from 'react';

export const AspectRatioCalc: React.FC = () => {
  const [w1, setW1] = useState(1920);
  const [h1, setH1] = useState(1080);
  const [w2, setW2] = useState(1280);
  const [h2, setH2] = useState(720);

  const calculateH2 = () => setH2(Math.round((w2 * h1) / w1));
  const calculateW2 = () => setW2(Math.round((h2 * w1) / h1));

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const commonGcd = gcd(w1, h1);
  const ratio = `${w1 / commonGcd}:${h1 / commonGcd}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-primary text-white p-10 rounded-[3rem] shadow-xl shadow-primary/20 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Calculated Aspect Ratio</p>
         <h2 className="text-6xl font-black italic tracking-tighter">{ratio}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-8 rounded-[2.5rem] border border-border-light shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Original Size</h3>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Width</label>
                  <input type="number" value={w1} onChange={(e) => setW1(parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" />
               </div>
               <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Height</label>
                  <input type="number" value={h1} onChange={(e) => setH1(parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" />
               </div>
            </div>
         </div>

         <div className="bg-white p-8 rounded-[2.5rem] border border-border-light shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">New Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Width</label>
                  <input 
                    type="number" value={w2} 
                    onChange={(e) => { setW2(parseInt(e.target.value) || 0); setH2(Math.round(((parseInt(e.target.value) || 0) * h1) / w1)); }} 
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-primary" 
                  />
               </div>
               <div>
                  <label className="text-[9px] font-black uppercase text-slate-400 block mb-1">Height</label>
                  <input 
                    type="number" value={h2} 
                    onChange={(e) => { setH2(parseInt(e.target.value) || 0); setW2(Math.round(((parseInt(e.target.value) || 0) * w1) / h1)); }} 
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-primary" 
                  />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
