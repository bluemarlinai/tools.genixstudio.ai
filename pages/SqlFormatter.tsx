
import React, { useState } from 'react';

export const SqlFormatter: React.FC<{ onBack: () => void, setActions: (a: any) => void }> = () => {
  const [sql, setSql] = useState('SELECT * FROM users WHERE active = 1 ORDER BY created_at DESC');
  const [formatted, setFormatted] = useState('');

  const formatSql = () => {
    // Basic formatting simulation
    const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'LIMIT', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'ON', 'AND', 'OR'];
    let result = sql;
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      result = result.replace(regex, `\n${kw.toUpperCase()}`);
    });
    setFormatted(result.trim());
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[450px]">
      <div className="bg-white rounded-xl border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b bg-slate-50/50 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-text-secondary">Raw SQL</span>
        </div>
        <textarea 
          value={sql} onChange={(e) => setSql(e.target.value)}
          className="flex-1 p-4 font-mono text-xs outline-none resize-none bg-transparent"
          placeholder="Paste SQL query..."
        />
        <div className="p-4 border-t bg-slate-50/30">
           <button onClick={formatSql} className="bg-primary text-white font-black px-4 py-2 rounded-lg text-xs w-full shadow-sm">BEAUTIFY SQL</button>
        </div>
      </div>
      <div className="bg-[#0d1117] rounded-xl border border-slate-800 shadow-sm flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-800 bg-black/20 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Formatted Output</span>
        </div>
        <pre className="flex-1 p-4 font-mono text-[11px] leading-relaxed text-blue-300 overflow-auto custom-scrollbar">
          <code>{formatted || '-- Formatted SQL will appear here...'}</code>
        </pre>
      </div>
    </div>
  );
};
