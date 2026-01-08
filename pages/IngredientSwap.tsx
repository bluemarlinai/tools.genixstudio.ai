
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export const IngredientSwap: React.FC = () => {
  const [ingredient, setIngredient] = useState('');
  const [limit, setLimit] = useState('Vegan');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const findSwaps = async () => {
    if (!ingredient) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I need to replace "${ingredient}" in a recipe because I follow a ${limit} diet. Give me 3 best substitutes with a quick explanation for each. Use bullet points.`,
      });
      setOutput(response.text);
    } catch (e) {
      setOutput('AI error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-border-light shadow-sm space-y-8">
        <div className="space-y-2">
           <label className="text-[10px] font-black uppercase text-slate-400">Ingredient to Replace</label>
           <input 
             type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)}
             className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black text-lg outline-none"
             placeholder="e.g. Eggs"
           />
        </div>
        <div className="space-y-2">
           <label className="text-[10px] font-black uppercase text-slate-400">Dietary Restriction</label>
           <div className="flex flex-wrap gap-2">
             {['Vegan', 'Gluten-Free', 'Keto', 'Nut-Free', 'Low Carb'].map(l => (
               <button 
                 key={l} onClick={() => setLimit(l)}
                 className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all ${limit === l ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-200'}`}
               >
                 {l}
               </button>
             ))}
           </div>
        </div>
        <button 
          onClick={findSwaps} disabled={loading}
          className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 disabled:opacity-50 text-xs"
        >
          {loading ? 'SEARCHING...' : 'FIND SUBSTITUTES'}
        </button>
      </div>

      <div className="lg:col-span-7 bg-emerald-50/30 rounded-[2.5rem] border border-emerald-100 p-10 flex flex-col justify-center min-h-[300px]">
        <div className="prose prose-sm prose-emerald max-w-none text-emerald-900 font-medium">
           {output ? (
             <div className="animate-in whitespace-pre-wrap leading-relaxed">{output}</div>
           ) : (
             <div className="text-center opacity-30 italic">Enter an ingredient to see AI-powered suggestions</div>
           )}
        </div>
      </div>
    </div>
  );
};
