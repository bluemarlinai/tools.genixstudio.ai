
import React, { useState } from 'react';

export const CsvToJson: React.FC<{ onBack: () => void }> = () => {
  const [csv, setCsv] = useState('');
  const [json, setJson] = useState('');
  const [delimiter, setDelimiter] = useState(',');

  const convert = () => {
    if (!csv.trim()) return;
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(delimiter).map(h => h.trim());
    const result = lines.slice(1).map(line => {
      const data = line.split(delimiter);
      return headers.reduce((obj: any, header, i) => {
        obj[header] = data[i]?.trim() || '';
        return obj;
      }, {});
    });
    setJson(JSON.stringify(result, null, 2));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
      <div className="bg-white rounded-[2rem] border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Input CSV</h3>
          <div className="flex items-center gap-3">
            <input 
              type="text" value={delimiter} onChange={(e) => setDelimiter(e.target.value)}
              className="w-10 text-center border rounded font-bold text-xs p-1"
            />
            <button onClick={() => setCsv('')} className="text-xs font-bold text-red-500">Clear</button>
          </div>
        </div>
        <textarea
          value={csv}
          onChange={(e) => setCsv(e.target.value)}
          className="flex-1 p-6 font-mono text-sm resize-none outline-none"
          placeholder={`ID,Name,Email\n1,John Doe,john@example.com`}
        />
        <div className="p-6 border-t bg-slate-50/30">
          <button onClick={convert} className="w-full bg-primary text-white font-black py-4 rounded-2xl active:scale-95 transition-all">Convert</button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Result JSON</h3>
          <button onClick={() => navigator.clipboard.writeText(json)} className="text-xs text-primary font-black">Copy</button>
        </div>
        <div className="flex-1 overflow-auto p-6 bg-[#0d1117] font-mono text-sm leading-relaxed custom-scrollbar text-gray-300">
          <pre><code>{json || '// Result will appear here...'}</code></pre>
        </div>
      </div>
    </div>
  );
};
