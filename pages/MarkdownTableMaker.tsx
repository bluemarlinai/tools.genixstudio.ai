
import React, { useState } from 'react';

export const MarkdownTableMaker: React.FC<{ onBack: () => void, setActions: (a: any) => void }> = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [data, setData] = useState<string[][]>(Array(3).fill(null).map(() => Array(3).fill('')));

  const updateCell = (r: number, c: number, val: string) => {
    const newData = [...data];
    newData[r][c] = val;
    setData(newData);
  };

  const generateTable = () => {
    let md = '| ' + data[0].join(' | ') + ' |\n';
    md += '| ' + data[0].map(() => '---').join(' | ') + ' |\n';
    for (let i = 1; i < rows; i++) {
      md += '| ' + data[i].join(' | ') + ' |\n';
    }
    return md;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-border-light shadow-sm space-y-6">
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse">
               <tbody>
                  {data.map((row, rIdx) => (
                    <tr key={rIdx}>
                       {row.map((cell, cIdx) => (
                         <td key={cIdx} className="p-1 border border-slate-100">
                            <input 
                              value={cell} 
                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)} 
                              className={`w-full border-none bg-slate-50/50 p-2 text-xs focus:ring-1 focus:ring-primary/20 ${rIdx === 0 ? 'font-black' : ''}`}
                              placeholder={rIdx === 0 ? 'Header' : 'Data'}
                            />
                         </td>
                       ))}
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="flex gap-4">
            <button onClick={() => { setRows(rows + 1); setData([...data, Array(cols).fill('')]); }} className="flex-1 border-2 border-dashed py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-primary transition-all">Add Row</button>
            <button onClick={() => { setCols(cols + 1); setData(data.map(r => [...r, ''])); }} className="flex-1 border-2 border-dashed py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-primary transition-all">Add Column</button>
         </div>
      </div>

      <div className="lg:col-span-4 bg-slate-900 rounded-[2.5rem] p-8 space-y-6 flex flex-col">
         <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Markdown Output</h3>
         <pre className="flex-1 font-mono text-[10px] text-slate-400 overflow-auto custom-scrollbar bg-black/20 p-4 rounded-xl border border-slate-800">
            {generateTable()}
         </pre>
         <button onClick={() => navigator.clipboard.writeText(generateTable())} className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl text-xs shadow-lg active:scale-95 transition-all">COPY TABLE CODE</button>
      </div>
    </div>
  );
};
