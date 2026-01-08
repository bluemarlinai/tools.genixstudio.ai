
import React, { useState } from 'react';

export const UrlEncoder: React.FC<{ onBack: () => void }> = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const encode = () => setResult(encodeURIComponent(input));
  const decode = () => setResult(decodeURIComponent(input));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
      <div className="bg-white rounded-[2rem] border border-border-light shadow-sm overflow-hidden p-8 flex flex-col gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Input URL / String</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-40 bg-background-light border border-border-light rounded-[1.5rem] p-6 font-mono text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            placeholder="https://example.com/search?q=hello world"
          />
        </div>

        <div className="flex gap-4">
          <button 
            onClick={encode}
            className="flex-1 bg-primary hover:bg-primary-hover text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Encode URL
          </button>
          <button 
            onClick={decode}
            className="flex-1 border border-border-light hover:bg-slate-50 text-text-main font-black py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Decode URL
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase text-text-secondary tracking-widest">Result</label>
            <button 
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-xs font-bold text-primary hover:underline"
            >
              Copy Result
            </button>
          </div>
          <textarea 
            readOnly
            value={result}
            className="w-full h-40 bg-slate-50 border border-border-light rounded-[1.5rem] p-6 font-mono text-sm outline-none resize-none text-text-secondary"
            placeholder="Result will appear here..."
          />
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-8 rounded-[2rem] border border-border-light space-y-4 shadow-sm">
          <h4 className="font-black text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">info</span> Technical Guide
          </h4>
          <p className="text-sm text-text-secondary leading-relaxed font-light">
            URL encoding converts characters into a format that can be transmitted over the Internet. It replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['Space = %20', '/ = %2F', '? = %3F', ': = %3A'].map(c => (
              <span key={c} className="bg-slate-50 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold text-text-secondary border border-border-light">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
