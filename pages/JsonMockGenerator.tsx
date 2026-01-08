
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MockField } from '../types';

const FIELD_TYPES = [
  'UUID', 'Full Name', 'Email', 'Internet Name', 'Boolean', 'Number', 'Date', 'Paragraph'
];

export const JsonMockGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [fields, setFields] = useState<MockField[]>([
    { id: '1', name: 'id', type: 'UUID', options: 'unique' },
    { id: '2', name: 'username', type: 'Internet Name', options: 'min:5' },
    { id: '3', name: 'email', type: 'Email', options: 'gmail.com' },
    { id: '4', name: 'isAdmin', type: 'Boolean', options: 'prob:0.2' },
  ]);
  const [rowCount, setRowCount] = useState(10);
  const [output, setOutput] = useState<string>('// Result will appear here after generation...');
  const [loading, setLoading] = useState(false);

  const generateData = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const schemaDescription = fields.map(f => `${f.name} (${f.type}, options: ${f.options})`).join(', ');
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate JSON array with ${rowCount} items: ${schemaDescription}. Return raw JSON.`,
        config: { responseMimeType: "application/json" }
      });
      setOutput(JSON.stringify(JSON.parse(response.text || '[]'), null, 2));
    } catch (error) {
      setOutput("// Error generating data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <section className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border-light flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold">Schema Definition</h2>
          </div>
          
          <div className="divide-y divide-border-light">
            {fields.map((field) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                <div className="col-span-5">
                  <input className="w-full bg-slate-50 border-none rounded-xl px-3 py-2 text-sm" value={field.name} onChange={() => {}} />
                </div>
                <div className="col-span-6">
                   <p className="text-xs text-text-secondary">{field.type} - {field.options}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-border-light shadow-sm p-6 flex flex-col md:flex-row items-end gap-6">
          <div className="flex-1 w-full">
            <label className="block text-sm font-bold text-text-main mb-2">Rows</label>
            <input type="number" value={rowCount} onChange={(e) => setRowCount(Number(e.target.value))} className="w-full border border-border-light rounded-xl px-4 py-2" />
          </div>
          <button onClick={generateData} disabled={loading} className="bg-primary text-white font-black rounded-xl px-6 py-2.5">
            {loading ? '...' : 'Generate'}
          </button>
        </div>
      </section>

      <section className="lg:col-span-5 h-[600px]">
        <div className="bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden flex flex-col h-full">
          <div className="flex-1 overflow-auto p-4 bg-[#0d1117] font-mono text-xs">
            <pre className="text-gray-300"><code>{output}</code></pre>
          </div>
        </div>
      </section>
    </div>
  );
};
