
import React, { useState } from 'react';

export const CaseConverter: React.FC<{ onBack: () => void }> = () => {
  const [text, setText] = useState('hello world');
  const cases = [
    { name: 'UPPER', fn: (t: string) => t.toUpperCase() },
    { name: 'lower', fn: (t: string) => t.toLowerCase() },
    { name: 'camelCase', fn: (t: string) => t.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, '') },
  ];

  return (
    <div className="bg-white rounded-[3rem] border shadow-sm p-10 space-y-8 max-w-5xl mx-auto w-full">
      <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-48 bg-slate-50 border-none rounded-[2rem] p-8 text-2xl outline-none resize-none shadow-inner" />
      <div className="grid grid-cols-3 gap-4">
        {cases.map(c => (
          <button key={c.name} onClick={() => setText(c.fn(text))} className="bg-sky-50 text-sky-700 font-black py-4 rounded-xl active:scale-95 transition-all text-xs">
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
};
