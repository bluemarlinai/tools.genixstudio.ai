
import React, { useState } from 'react';
import { MockField } from '../types';

export const JsonMockGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [fields] = useState<MockField[]>([
    { id: '1', name: 'id', type: 'UUID', options: 'unique' },
    { id: '2', name: 'username', type: 'Internet Name', options: 'min:5' },
    { id: '3', name: 'email', type: 'Email', options: 'gmail.com' },
    { id: '4', name: 'isAdmin', type: 'Boolean', options: 'prob:0.2' },
  ]);
  const [rowCount, setRowCount] = useState(10);
  const [output, setOutput] = useState<string>('// Result will appear here...');
  const [loading, setLoading] = useState(false);

  const generateData = () => {
    setLoading(true);
    // AI generation removed to prevent unauthorized API usage
    setTimeout(() => {
      setOutput("// Mock generation disabled.\n// AI processing is currently offline.");
      setLoading(false);
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
      <section className="lg:col-span-6 flex flex-col gap-4">
        <div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div className="px-4 py-2 border-b border-border-light flex justify-between items-center bg-slate-50/50">
            <h2 className="text-[11px] font-black uppercase text-text-secondary tracking-widest">Schema</h2>
          </div>
          
          <div className="divide-y divide-border-light">
            {fields.map((field) => (
              <div key={field.id} className="grid grid-cols-12 gap-2 p-2 items-center">
                <div className="col-span-5">
                  <input className="w-full bg-slate-50 border-none rounded-lg px-2 py-1 text-xs font-bold" value={field.name} readOnly />
                </div>
                <div className="col-span-7">
                   <p className="text-[10px] text-text-secondary font-medium">{field.type} • {field.options}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border-light shadow-sm p-4 flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-[10px] font-black text-text-secondary uppercase mb-1">Row Count</label>
            <input type="number" value={rowCount} onChange={(e) => setRowCount(Number(e.target.value))} className="w-full border border-border-light rounded-lg px-3 py-1.5 text-xs font-bold" />
          </div>
          <button onClick={generateData} disabled={loading} className="bg-primary text-white font-black rounded-lg px-6 py-2.5 text-xs shadow-md active:scale-95 disabled:opacity-50 mt-4 transition-all">
            {loading ? '...' : 'Generate'}
          </button>
        </div>
      </section>

      <section className="lg:col-span-6 h-[400px]">
        <div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden flex flex-col h-full">
          <div className="flex-1 overflow-auto p-4 bg-[#0d1117] font-mono text-[11px] leading-relaxed custom-scrollbar">
            <pre className="text-gray-300"><code>{output}</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
};
