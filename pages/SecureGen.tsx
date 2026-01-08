
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface SecureGenProps {
  onBack: () => void;
  setActions: (actions: React.ReactNode) => void;
}

export const SecureGen: React.FC<SecureGenProps> = ({ setActions }) => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const generatePassword = () => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let chars = '';
    if (includeUpper) chars += upper;
    if (includeLower) chars += lower;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    if (!chars) return;
    let generated = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      generated += chars.charAt(array[i] % chars.length);
    }
    setPassword(generated);
  };

  const generateMemorable = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a memorable but secure password phrase. Return ONLY the phrase.",
      });
      setPassword(response.text || 'AI-Generation-Failed-123!');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActions(
      <button 
        onClick={generateMemorable}
        disabled={loading}
        className="bg-orange-50 text-orange-600 border border-orange-100 px-4 py-2 rounded-xl text-xs font-black hover:bg-orange-100 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-[18px]">psychology</span> AI Phrase
      </button>
    );
  }, [loading]);

  useEffect(() => {
    let s = 0;
    if (length > 12) s += 1;
    if (length > 20) s += 1;
    if (includeUpper && includeLower) s += 1;
    if (includeNumbers) s += 1;
    if (includeSymbols) s += 1;
    setStrength(s);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => { generatePassword(); }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      <div className="md:col-span-5 bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-black uppercase tracking-widest text-text-secondary">Length</label>
            <span className="text-primary font-mono font-black text-2xl">{length}</span>
          </div>
          <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full accent-primary" />
        </div>
        <div className="space-y-4">
          {[
            { label: 'Uppercase', state: includeUpper, setter: setIncludeUpper },
            { label: 'Lowercase', state: includeLower, setter: setIncludeLower },
            { label: 'Numbers', state: includeNumbers, setter: setIncludeNumbers },
            { label: 'Symbols', state: includeSymbols, setter: setIncludeSymbols },
          ].map((opt) => (
            <label key={opt.label} className="flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium">{opt.label}</span>
              <input type="checkbox" checked={opt.state} onChange={(e) => opt.setter(e.target.checked)} className="rounded text-primary" />
            </label>
          ))}
        </div>
        <button onClick={generatePassword} className="w-full bg-primary text-white font-black py-4 rounded-2xl active:scale-95 transition-all">Regenerate</button>
      </div>

      <div className="md:col-span-7 bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 flex flex-col gap-6">
        <div className="relative">
          <input type="text" readOnly value={password} className="w-full bg-slate-50 rounded-3xl p-8 text-2xl font-mono text-center tracking-widest outline-none shadow-inner" />
          <button onClick={() => navigator.clipboard.writeText(password)} className="absolute right-4 top-1/2 -translate-y-1/2 size-12 flex items-center justify-center bg-white border border-border-light rounded-xl hover:text-primary transition-all">
            <span className="material-symbols-outlined">content_copy</span>
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Strength Indicator</span>
            <span>{strength > 4 ? 'Very Strong' : strength > 2 ? 'Medium' : 'Weak'}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex gap-1">
             {[1,2,3,4,5,6].map(i => <div key={i} className={`flex-1 ${i <= strength ? (strength > 4 ? 'bg-green-500' : 'bg-yellow-500') : 'bg-transparent'}`} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
