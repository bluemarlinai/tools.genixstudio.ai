
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export const UiRoaster: React.FC = () => {
  const [description, setDescription] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  const getRoast = async () => {
    if (!description) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Roast this UI design/idea brutally but hilariously. Be very critical and funny like a professional designer with no filter. Idea: "${description}"`,
      });
      setRoast(response.text || 'Even AI is speechless at how bad this is.');
    } catch (e) {
      setRoast('AI is currently on a coffee break. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm p-8 space-y-6">
         <div className="text-center space-y-2">
            <h2 className="text-2xl font-black italic text-orange-600">Emotional Damage Required?</h2>
            <p className="text-xs text-text-secondary">Describe your UI, your UX flow, or your color scheme.</p>
         </div>
         <textarea 
           value={description} onChange={(e) => setDescription(e.target.value)}
           className="w-full h-32 bg-slate-50 border-none rounded-3xl p-6 text-sm font-medium outline-none resize-none placeholder:opacity-40"
           placeholder="e.g. My app has a neon green background with comic sans font and 15 different types of buttons..."
         />
         <button 
           onClick={getRoast} disabled={loading}
           className="w-full bg-orange-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all text-xs tracking-widest"
         >
           {loading ? 'COOKING THE ROAST...' : 'ROAST ME BRUTALLY'}
         </button>
      </div>

      {roast && (
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden animate-in slide-in">
           <div className="absolute -top-4 -left-4 size-24 bg-orange-600/20 blur-3xl rounded-full"></div>
           <div className="absolute -bottom-4 -right-4 size-32 bg-red-600/10 blur-3xl rounded-full"></div>
           
           <span className="material-symbols-outlined text-4xl text-orange-500 mb-4">local_fire_department</span>
           <div className="prose prose-invert max-w-none">
              <p className="text-lg font-bold leading-relaxed italic text-orange-50 whitespace-pre-wrap">{roast}</p>
           </div>
           
           <div className="mt-8 flex justify-end">
              <button onClick={() => navigator.clipboard.writeText(roast)} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Copy my shame</button>
           </div>
        </div>
      )}
    </div>
  );
};
