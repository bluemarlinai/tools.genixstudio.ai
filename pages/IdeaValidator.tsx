
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export const IdeaValidator: React.FC = () => {
  const [pitch, setPitch] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    if (!pitch) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this app/business idea: "${pitch}". Provide a critical breakdown: 1. Value Proposition, 2. Potential Obstacles, 3. Target Audience, 4. Scalability Score (1-10). Use a professional yet encouraging tone.`,
      });
      setAnalysis(response.text);
    } catch (e) {
      setAnalysis('Analysis failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px]">
      <div className="lg:col-span-5 bg-white rounded-2xl border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b bg-slate-50/50">
           <span className="text-[10px] font-black uppercase text-slate-400">Your Elevator Pitch</span>
        </div>
        <textarea 
          value={pitch} onChange={(e) => setPitch(e.target.value)}
          className="flex-1 p-8 text-sm font-medium outline-none resize-none placeholder:opacity-40 leading-relaxed"
          placeholder="e.g. An Uber for dog walkers who only work in the rain..."
        />
        <div className="p-6 bg-slate-50 border-t">
           <button 
             onClick={validate} disabled={loading}
             className="w-full bg-slate-900 text-white font-black py-4 rounded-xl shadow-lg active:scale-95 disabled:opacity-50 text-[10px] uppercase tracking-widest"
           >
             {loading ? 'ANALYZING MARKET...' : 'VALIDATE IDEA'}
           </button>
        </div>
      </div>
      
      <div className="lg:col-span-7 bg-white rounded-2xl border border-border-light shadow-sm flex flex-col overflow-hidden relative">
        <div className="px-6 py-4 border-b bg-amber-50/50 flex justify-between items-center">
           <span className="text-[10px] font-black uppercase text-amber-600">AI Analysis Report</span>
           <button onClick={() => navigator.clipboard.writeText(analysis)} className="text-[10px] font-black text-slate-400 hover:text-text-main">COPY</button>
        </div>
        <div className="flex-1 p-10 overflow-auto custom-scrollbar">
           {analysis ? (
             <div className="prose prose-sm prose-slate max-w-none animate-in font-medium leading-loose text-text-secondary whitespace-pre-wrap">
                {analysis}
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-slate-200">
                <span className="material-symbols-outlined text-6xl mb-4">insights</span>
                <p className="text-[10px] font-black uppercase tracking-widest">Awaiting your pitch</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
