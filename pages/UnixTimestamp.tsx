
import React, { useState, useEffect } from 'react';

export const UnixTimestamp: React.FC<{ onBack: () => void, setActions: (a: any) => void }> = () => {
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [inputTs, setInputTs] = useState(now.toString());
  const [dateStr, setDateStr] = useState(new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const toDate = () => {
    try {
      const d = new Date(parseInt(inputTs) * 1000);
      setDateStr(d.toLocaleString());
    } catch(e) { setDateStr('Invalid Date'); }
  };

  return (
    <div className="space-y-4">
      <div className="bg-primary text-white p-8 rounded-3xl shadow-xl shadow-primary/20 flex flex-col items-center justify-center gap-2">
         <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Current Unix Timestamp</p>
         <h2 className="text-5xl font-black font-mono tracking-tighter">{now}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="bg-white rounded-2xl border border-border-light p-6 space-y-4 shadow-sm">
            <h3 className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Timestamp to Date</h3>
            <div className="space-y-3">
               <input 
                 value={inputTs} onChange={(e) => setInputTs(e.target.value)}
                 className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-primary/10"
               />
               <div className="flex gap-2">
                  <button onClick={toDate} className="flex-1 bg-primary text-white font-black py-2 rounded-lg text-xs">CONVERT</button>
                  <button onClick={() => setInputTs(now.toString())} className="px-4 py-2 border rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">NOW</button>
               </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
               <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Result</p>
               <p className="text-sm font-bold text-text-main font-mono">{dateStr}</p>
            </div>
         </div>

         <div className="bg-slate-900 rounded-2xl p-6 flex flex-col justify-center gap-6">
            <div className="space-y-1">
               <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Time Units Guide</h4>
               <p className="text-[11px] text-slate-400 leading-relaxed italic">
                 Unix time is defined as the number of seconds that have elapsed since January 1, 1970 (UTC).
               </p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-500 font-bold">
               <div className="p-2 border border-slate-800 rounded">1 Min = 60s</div>
               <div className="p-2 border border-slate-800 rounded">1 Hour = 3600s</div>
               <div className="p-2 border border-slate-800 rounded">1 Day = 86400s</div>
               <div className="p-2 border border-slate-800 rounded">1 Year = 31536k</div>
            </div>
         </div>
      </div>
    </div>
  );
};
