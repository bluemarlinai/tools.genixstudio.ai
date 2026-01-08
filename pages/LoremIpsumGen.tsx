
import React, { useState } from 'react';

const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const LoremIpsumGen: React.FC<{ onBack: () => void, setActions: (a: any) => void }> = () => {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'Paragraphs' | 'Words'>('Paragraphs');

  const generatedText = type === 'Paragraphs' 
    ? Array(count).fill(LOREM_TEXT).join('\n\n')
    : LOREM_TEXT.split(' ').slice(0, count).join(' ');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 bg-white rounded-2xl border border-border-light shadow-sm p-6 space-y-6">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary border-b pb-2">Config</h3>
         <div className="space-y-4">
            <div className="flex gap-1 p-0.5 bg-slate-100 rounded-lg">
               {(['Paragraphs', 'Words'] as const).map(t => (
                 <button key={t} onClick={() => setType(t)} className={`flex-1 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${type === t ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}>{t}</button>
               ))}
            </div>
            <div className="space-y-2">
               <div className="flex justify-between"><label className="text-[9px] font-black uppercase text-slate-400">Count</label><span className="text-xs font-bold text-primary">{count}</span></div>
               <input type="range" min="1" max="20" value={count} onChange={(e) => setCount(parseInt(e.target.value))} className="w-full accent-primary bg-slate-100 h-1.5 rounded-lg appearance-none" />
            </div>
         </div>
         <button onClick={() => navigator.clipboard.writeText(generatedText)} className="w-full bg-primary text-white font-black py-3 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all text-[10px] uppercase">Copy to Clipboard</button>
      </div>
      <div className="lg:col-span-8 bg-white rounded-2xl border border-border-light shadow-sm flex flex-col min-h-[400px]">
         <div className="px-6 py-4 border-b bg-slate-50/50">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Output Preview</span>
         </div>
         <div className="flex-1 p-10 overflow-y-auto font-display text-sm leading-relaxed text-text-secondary whitespace-pre-wrap custom-scrollbar">
            {generatedText}
         </div>
      </div>
    </div>
  );
};
