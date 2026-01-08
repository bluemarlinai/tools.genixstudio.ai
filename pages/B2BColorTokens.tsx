
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface B2BColorTokensProps {
  setActions: (actions: React.ReactNode) => void;
}

export const B2BColorTokens: React.FC<B2BColorTokensProps> = ({ setActions }) => {
  const [baseColor, setBaseColor] = useState('#0b57d0');
  const [tokens, setTokens] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateTokens = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Given a primary B2B brand color "${baseColor}", generate a set of enterprise UI design tokens in JSON format. Include: Success (Green-ish), Warning (Orange/Amber), Error (Red-ish), Info (Blue-ish), and a Neutral Grey scale (5 levels). Ensure they look "stable" and "professional". Only return valid JSON.`,
        config: { responseMimeType: "application/json" }
      });
      setTokens(JSON.parse(response.text || '{}'));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const TokenRow = ({ label, color }: { label: string, color: string }) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 hover:shadow-sm transition-all group">
      <div className="flex items-center gap-3">
        <div className="size-8 rounded-lg shadow-inner border border-black/5" style={{ backgroundColor: color }} />
        <span className="text-xs font-bold text-text-main uppercase tracking-tight">{label}</span>
      </div>
      <button 
        onClick={() => navigator.clipboard.writeText(color)}
        className="text-[10px] font-black text-slate-300 group-hover:text-primary transition-colors font-mono"
      >
        {color.toUpperCase()}
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white rounded-xl border border-border-light shadow-sm p-6 space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400">Brand Primary</label>
              <div className="flex gap-2">
                <input 
                  type="color" value={baseColor} 
                  onChange={(e) => setBaseColor(e.target.value)} 
                  className="size-10 rounded-lg border-none bg-transparent cursor-pointer shadow-sm"
                />
                <input 
                  type="text" value={baseColor} readOnly
                  className="flex-1 bg-slate-50 border-none rounded-lg px-3 py-2 font-mono font-bold text-sm text-primary"
                />
              </div>
           </div>
           <button 
             onClick={generateTokens} 
             disabled={loading}
             className="w-full bg-primary text-white font-black py-3 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 text-xs"
           >
             {loading ? 'Analyzing Theme...' : 'GENERATE TOKENS'}
           </button>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
           <h4 className="text-[10px] font-black text-text-secondary uppercase mb-2">B2B Design Logic</h4>
           <p className="text-[11px] leading-relaxed text-slate-500 font-light italic">
             "Professional software should prioritize utility. High-contrast labels and desaturated status colors provide a stable environment for long-term usage."
           </p>
        </div>
      </div>

      <div className="lg:col-span-8">
        {tokens ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in">
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-text-secondary uppercase ml-1">Functional Tokens</h3>
              <TokenRow label="Success" color={tokens.Success || '#10b981'} />
              <TokenRow label="Warning" color={tokens.Warning || '#f59e0b'} />
              <TokenRow label="Error" color={tokens.Error || '#ef4444'} />
              <TokenRow label="Info" color={tokens.Info || '#3b82f6'} />
            </div>
            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-text-secondary uppercase ml-1">Neutral Palette</h3>
              {tokens.Neutral && Object.entries(tokens.Neutral).map(([key, val]: any) => (
                <TokenRow key={key} label={key} color={val} />
              ))}
            </div>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl text-slate-300">
             <span className="material-symbols-outlined text-4xl mb-2 opacity-50">auto_fix_high</span>
             <p className="text-xs font-bold uppercase tracking-widest opacity-50">Run Engine to Preview</p>
          </div>
        )}
      </div>
    </div>
  );
};
