
import React, { useState } from 'react';

export const WordCounter: React.FC<{ onBack: () => void }> = () => {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 bg-white rounded-[2.5rem] border shadow-sm overflow-hidden flex flex-col">
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-[450px] p-10 text-xl outline-none resize-none" placeholder="Start typing..." />
      </div>
      <div className="lg:col-span-4 bg-white rounded-[2rem] border shadow-sm p-10 space-y-6">
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-slate-50 p-6 rounded-2xl"><p className="text-xs text-slate-400">Words</p><p className="text-2xl font-black">{words}</p></div>
           <div className="bg-slate-50 p-6 rounded-2xl"><p className="text-xs text-slate-400">Chars</p><p className="text-2xl font-black">{chars}</p></div>
        </div>
      </div>
    </div>
  );
};
