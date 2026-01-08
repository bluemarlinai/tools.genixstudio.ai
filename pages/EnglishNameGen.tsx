
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

export const EnglishNameGen: React.FC = () => {
  const [gender, setGender] = useState('Neutral');
  const [traits, setTraits] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateNames = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate 5 suitable English names for a ${gender} person. Personality/Traits: ${traits}. For each name, provide: Name, Meaning, Personality, and Pronunciation. Output as JSON.`,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                meaning: { type: Type.STRING },
                personality: { type: Type.STRING },
                pronunciation: { type: Type.STRING }
              }
            }
          }
        }
      });
      setResults(JSON.parse(response.text || '[]'));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 bg-white rounded-2xl border border-border-light shadow-sm p-6 space-y-6">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400">Preferred Gender</label>
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            {['Male', 'Female', 'Neutral'].map(g => (
              <button 
                key={g} onClick={() => setGender(g)}
                className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${gender === g ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-slate-400">Traits or Desired Meaning</label>
          <textarea 
            value={traits} onChange={(e) => setTraits(e.target.value)}
            className="w-full h-24 bg-slate-50 border-none rounded-xl p-4 text-sm outline-none resize-none"
            placeholder="e.g. Brave, Elegant, Like nature..."
          />
        </div>
        <button 
          onClick={generateNames} disabled={loading}
          className="w-full bg-primary text-white font-black py-3 rounded-xl shadow-lg active:scale-95 disabled:opacity-50 text-xs"
        >
          {loading ? 'Consulting AI...' : 'GENERATE NAMES'}
        </button>
      </div>

      <div className="lg:col-span-8 space-y-4">
        {results.length > 0 ? results.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-border-light shadow-sm flex items-center justify-between animate-in">
             <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <h3 className="text-xl font-black text-text-main">{item.name}</h3>
                   <span className="text-[10px] font-mono text-slate-300">[{item.pronunciation}]</span>
                </div>
                <p className="text-xs text-text-secondary"><span className="font-bold">Meaning:</span> {item.meaning}</p>
                <p className="text-[11px] text-slate-400 font-light italic">{item.personality}</p>
             </div>
             <button onClick={() => navigator.clipboard.writeText(item.name)} className="size-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-primary transition-all">
                <span className="material-symbols-outlined text-lg">content_copy</span>
             </button>
          </div>
        )) : (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-300">
             <span className="material-symbols-outlined text-4xl mb-2 opacity-50">face</span>
             <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">AI suggestions will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};
