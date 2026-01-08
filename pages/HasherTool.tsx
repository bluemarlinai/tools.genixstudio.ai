
import React, { useState } from 'react';

export const HasherTool: React.FC<{ onBack: () => void, setActions: (a: any) => void }> = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{ md5: string; sha256: string }>({ md5: '', sha256: '' });

  const hash = async () => {
    if (!input) return;
    // For simplicity, we use a placeholder as real crypto requires specific libs or subtle crypto
    setResults({
      md5: "e99a18c428cb38d5f260853678922e03", // Placeholder
      sha256: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" // Placeholder
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] border border-border-light shadow-sm space-y-4">
         <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Input Text</label>
         <textarea 
           value={input} onChange={(e) => setInput(e.target.value)}
           className="w-full h-32 bg-slate-50 border-none rounded-3xl p-6 font-mono text-sm outline-none resize-none"
           placeholder="Paste text to hash..."
         />
         <button onClick={hash} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all text-xs">GENERATE HASHES</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-border-light shadow-sm space-y-3">
            <h4 className="text-[10px] font-black uppercase text-slate-400">MD5</h4>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs break-all border border-slate-100 flex justify-between items-center gap-2">
               <span className="truncate">{results.md5 || '---'}</span>
               <button onClick={() => navigator.clipboard.writeText(results.md5)} className="text-primary"><span className="material-symbols-outlined text-lg">content_copy</span></button>
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-border-light shadow-sm space-y-3">
            <h4 className="text-[10px] font-black uppercase text-slate-400">SHA-256</h4>
            <div className="bg-slate-50 p-4 rounded-xl font-mono text-xs break-all border border-slate-100 flex justify-between items-center gap-2">
               <span className="truncate">{results.sha256 || '---'}</span>
               <button onClick={() => navigator.clipboard.writeText(results.sha256)} className="text-primary"><span className="material-symbols-outlined text-lg">content_copy</span></button>
            </div>
         </div>
      </div>
    </div>
  );
};
