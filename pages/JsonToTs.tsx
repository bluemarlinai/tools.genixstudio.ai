
import React, { useState } from 'react';

export const JsonToTs: React.FC<{ onBack: () => void, setActions: (a: any) => void }> = () => {
  const [json, setJson] = useState('{\n  "id": 1,\n  "name": "User Profile",\n  "active": true\n}');
  const [ts, setTs] = useState('interface RootObject {\n  id: number;\n  name: string;\n  active: boolean;\n}');

  const convert = () => {
    try {
      const obj = JSON.parse(json);
      const types = Object.entries(obj).map(([key, val]) => {
        // Explicitly type 'type' as string to allow non-standard typeof values like 'any[]' or 'any'
        let type: string = typeof val;
        if (Array.isArray(val)) type = 'any[]';
        else if (val === null) type = 'any';
        return `  ${key}: ${type};`;
      }).join('\n');
      setTs(`interface RootObject {\n${types}\n}`);
    } catch(e) { setTs('// Error: Invalid JSON input'); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
      <div className="bg-white rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b bg-slate-50/50 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-text-secondary">Input JSON</span>
          <button onClick={convert} className="text-[10px] font-black text-primary hover:underline">CONVERT</button>
        </div>
        <textarea 
          value={json} onChange={(e) => setJson(e.target.value)}
          className="flex-1 p-4 font-mono text-xs outline-none resize-none bg-transparent custom-scrollbar"
        />
      </div>
      <div className="bg-[#0d1117] rounded-xl border border-slate-800 shadow-sm flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-800 bg-black/20 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">TypeScript Interface</span>
          <button onClick={() => navigator.clipboard.writeText(ts)} className="text-[10px] font-black text-emerald-500 hover:underline">COPY</button>
        </div>
        <pre className="flex-1 p-4 font-mono text-[11px] leading-relaxed text-gray-300 overflow-auto custom-scrollbar">
          <code>{ts}</code>
        </pre>
      </div>
    </div>
  );
};
