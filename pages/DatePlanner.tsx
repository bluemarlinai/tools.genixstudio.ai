
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export const DatePlanner: React.FC = () => {
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('Medium');
  const [vibe, setVibe] = useState('Romantic');
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);

  const planDate = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create a creative, detailed 3-step date night itinerary in ${city}. Budget level: ${budget}. Vibe: ${vibe}. Include a specific place or activity for each step. Use a warm tone.`,
      });
      setItinerary(response.text);
    } catch (e) {
      setItinerary('Could not plan. Maybe just stay home?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-border-light shadow-sm space-y-8">
         <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400">City / Location</label>
            <input 
              type="text" value={city} onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 font-bold text-sm"
              placeholder="e.g. San Francisco"
            />
         </div>
         <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-slate-400">Budget</label>
            <div className="flex gap-2">
               {['Low', 'Medium', 'High'].map(b => (
                 <button key={b} onClick={() => setBudget(b)} className={`flex-1 py-2 rounded-xl text-xs font-black border transition-all ${budget === b ? 'bg-pink-600 text-white border-pink-600 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-pink-200'}`}>{b}</button>
               ))}
            </div>
         </div>
         <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-400">The Vibe</label>
            <select value={vibe} onChange={(e) => setVibe(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold">
               <option>Romantic</option>
               <option>Adventurous</option>
               <option>Chill / Cozy</option>
               <option>Intellectual</option>
               <option>Crazy Fun</option>
            </select>
         </div>
         <button 
           onClick={planDate} disabled={loading}
           className="w-full bg-pink-600 text-white font-black py-4 rounded-2xl shadow-xl active:scale-95 disabled:opacity-50 text-xs tracking-widest"
         >
           {loading ? 'PLANNING MAGIC...' : 'PLAN MY DATE'}
         </button>
      </div>

      <div className="lg:col-span-7">
        {itinerary ? (
          <div className="bg-white rounded-[2.5rem] border border-border-light p-10 h-full animate-in relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 text-pink-50 opacity-20 pointer-events-none">
                <span className="material-symbols-outlined text-9xl">favorite</span>
             </div>
             <div className="relative z-10 space-y-6">
                <h3 className="text-xl font-black text-pink-600 flex items-center gap-2">
                   <span className="material-symbols-outlined">auto_awesome</span>
                   Your Perfect Night in {city}
                </h3>
                <div className="prose prose-sm prose-pink max-w-none text-text-secondary whitespace-pre-wrap leading-loose font-medium">
                   {itinerary}
                </div>
             </div>
          </div>
        ) : (
          <div className="h-full border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-slate-300 gap-4 min-h-[400px]">
             <span className="material-symbols-outlined text-6xl opacity-20">celebration</span>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Awaiting your destination</p>
          </div>
        )}
      </div>
    </div>
  );
};
