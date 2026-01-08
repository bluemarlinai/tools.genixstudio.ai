
import React, { useState } from 'react';

export const Base64Tool: React.FC<{ onBack: () => void }> = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
      <div className="bg-white rounded-[2.5rem] border shadow-sm flex flex-col overflow-hidden">
        <textarea value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 p-8 font-mono text-sm outline-none resize-none" placeholder="Source..." />
        <div className="p-6 border-t bg-slate-50/30 flex gap-4">
          <button onClick={() => setOutput(btoa(input))} className="flex-1 bg-emerald-600 text-white font-black py-4 rounded-2xl">Encode</button>
          <button onClick={() => { try { setOutput(atob(input)); } catch(e) { setOutput('Error'); } }} className="flex-1 border border-emerald-600 text-emerald-600 font-black py-4 rounded-2xl">Decode</button>
        </div>
      </div>
      <div className="bg-white rounded-[2.5rem] border shadow-sm flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-8 font-mono text-sm bg-[#0d1117] text-gray-300 break-all">
          {output || '// Result...'}
        </div>
      </div>
    </div>
  );
};
