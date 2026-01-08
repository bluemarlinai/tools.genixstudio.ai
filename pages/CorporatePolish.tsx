
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export const CorporatePolish: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const polishText = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Translate the following casual/blunt text into professional, "polished" corporate email speak. Be polite but clear. Input: "${input}"`,
      });
      setOutput(response.text || 'No response');
    } catch (e) {
      setOutput('AI error. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px]">
      <div className="bg-white rounded-2xl border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b bg-slate-50/50 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-slate-400">Blunt Thoughts</span>
        </div>
        <textarea 
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Stop CCing me on things that aren't my problem."
          className="flex-1 p-6 text-sm font-medium outline-none resize-none bg-transparent"
        />
        <div className="p-4 bg-slate-50/30 border-t">
          <button 
            onClick={polishText} disabled={loading}
            className="w-full bg-primary text-white font-black py-3 rounded-xl shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? 'POLISHING...' : 'PROFESSIONALIZE'}
          </button>
        </div>
      </div>
      <div className="bg-indigo-900 text-white rounded-2xl flex flex-col overflow-hidden shadow-xl">
        <div className="px-4 py-3 border-b border-indigo-800 bg-black/10 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase text-indigo-300">The "Polished" Result</span>
          <button onClick={() => navigator.clipboard.writeText(output)} className="text-[10px] font-black text-indigo-400 hover:text-white">COPY</button>
        </div>
        <div className="flex-1 p-8 text-sm leading-relaxed font-light italic whitespace-pre-wrap overflow-auto custom-scrollbar">
          {output || 'Waiting for input...'}
        </div>
      </div>
    </div>
  );
};
