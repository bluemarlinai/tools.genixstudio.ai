
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

export const SocialBioGen: React.FC = () => {
  const [platform, setPlatform] = useState('Instagram');
  const [description, setDescription] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generateBios = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Create 5 engaging social media bios for ${platform}. Based on these keywords/desc: ${description}. Include emojis and match the platform's typical style.`,
        config: { temperature: 0.8 }
      });
      setResults(response.text.split('\n').filter(l => l.trim() !== '').slice(0, 5));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl border border-border-light shadow-sm p-8 flex flex-col items-center gap-6">
        <div className="flex gap-3 bg-slate-100 p-1.5 rounded-2xl w-full max-w-md">
           {['Instagram', 'Twitter', 'LinkedIn', '小红书'].map(p => (
             <button 
               key={p} onClick={() => setPlatform(p)}
               className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${platform === p ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
             >
               {p}
             </button>
           ))}
        </div>
        <input 
          type="text" value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell AI about yourself (e.g. coffee lover, digital artist, based in NYC)"
          className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-center text-sm outline-none focus:ring-2 focus:ring-primary/10"
        />
        <button 
          onClick={generateBios} disabled={loading}
          className="px-10 py-3.5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 text-xs"
        >
          {loading ? 'Crafting...' : 'CREATE BIOS'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((bio, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-border-light shadow-sm hover:border-primary/20 transition-all group relative animate-in">
             <p className="text-sm text-text-main leading-relaxed pr-8 whitespace-pre-wrap">{bio.replace(/^\d\.\s/, '')}</p>
             <button 
               onClick={() => navigator.clipboard.writeText(bio)}
               className="absolute top-4 right-4 text-slate-300 hover:text-primary transition-colors"
             >
               <span className="material-symbols-outlined text-lg">content_copy</span>
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};
