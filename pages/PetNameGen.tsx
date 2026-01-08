
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

export const PetNameGen: React.FC = () => {
  const [type, setType] = useState('Dog');
  const [vibe, setVibe] = useState('Classic');
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState<any[]>([]);

  const generate = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate 6 creative names for a ${type} with a ${vibe} vibe. For each name, provide: name and a 1-sentence personality description. Output as JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                personality: { type: Type.STRING }
              }
            }
          }
        }
      });
      setNames(JSON.parse(response.text));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-2xl border border-border-light p-6 space-y-6">
           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400">Pet Type</label>
              <div className="grid grid-cols-2 gap-2">
                 {['Dog', 'Cat', 'Bird', 'Hamster'].map(t => (
                   <button key={t} onClick={() => setType(t)} className={`py-2 rounded-lg text-[10px] font-bold border transition-all ${type === t ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-400 border-slate-100 hover:border-orange-200'}`}>{t}</button>
                 ))}
              </div>
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400">The Vibe</label>
              <select 
                value={vibe} onChange={(e) => setVibe(e.target.value)}
                className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold"
              >
                <option>Classic</option>
                <option>Badass</option>
                <option>Preppy</option>
                <option>Food-themed</option>
                <option>Space-themed</option>
              </select>
           </div>
           <button 
             onClick={generate} disabled={loading}
             className="w-full bg-orange-500 text-white font-black py-4 rounded-xl shadow-lg active:scale-95 disabled:opacity-50 text-xs"
           >
             {loading ? 'THINKING...' : 'GENERATE NAMES'}
           </button>
        </div>
      </div>
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {names.length > 0 ? names.map((n, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border-light shadow-sm hover:border-orange-300 transition-all group animate-in">
             <h3 className="text-lg font-black text-orange-600 mb-1">{n.name}</h3>
             <p className="text-[11px] text-slate-500 leading-relaxed italic">{n.personality}</p>
          </div>
        )) : (
          <div className="md:col-span-2 h-64 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-300">
             <span className="material-symbols-outlined text-4xl mb-2 opacity-30">pets</span>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-30">New names will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};
