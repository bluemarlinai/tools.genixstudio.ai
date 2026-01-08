
import React, { useState } from 'react';

export const DiffChecker: React.FC<{ onBack: () => void, setActions: (a: any) => void }> = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
        <div className="bg-white rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden">
          <div className="px-4 py-2 border-b bg-slate-50/50 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Original Text</span>
          </div>
          <textarea 
            value={textA} onChange={(e) => setTextA(e.target.value)}
            className="flex-1 p-4 font-mono text-xs outline-none resize-none bg-transparent custom-scrollbar"
            placeholder="Paste source text here..."
          />
        </div>
        <div className="bg-white rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden">
          <div className="px-4 py-2 border-b bg-slate-50/50 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-text-secondary tracking-widest">Modified Text</span>
          </div>
          <textarea 
            value={textB} onChange={(e) => setTextB(e.target.value)}
            className="flex-1 p-4 font-mono text-xs outline-none resize-none bg-transparent custom-scrollbar"
            placeholder="Paste modified text here..."
          />
        </div>
      </div>
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-center border-4 border-slate-800 border-dashed">
         <p className="text-xs font-black uppercase tracking-widest opacity-50 italic">Visual Diff Engine Offline - Processing Locally</p>
      </div>
    </div>
  );
};
