
import React, { useState, useEffect } from 'react';

export const RegExTester: React.FC<{ onBack: () => void }> = () => {
  const [regex, setRegex] = useState('[a-z]+');
  const [testText, setTestText] = useState('hello 123 world');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);

  useEffect(() => {
    try {
      const re = new RegExp(regex, 'g');
      setMatches(Array.from(testText.matchAll(re)));
    } catch (e) { setMatches([]); }
  }, [regex, testText]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white rounded-[2rem] border p-8 space-y-4 shadow-sm">
          <div className="flex gap-2 items-center bg-slate-50 p-4 rounded-xl border">
            <span className="text-slate-300 font-mono">/</span>
            <input value={regex} onChange={(e) => setRegex(e.target.value)} className="flex-1 bg-transparent border-none font-mono" placeholder="regex" />
            <span className="text-slate-300 font-mono">/g</span>
          </div>
        </div>
        <div className="bg-white rounded-[2rem] border shadow-sm flex flex-col overflow-hidden flex-1">
          <textarea value={testText} onChange={(e) => setTestText(e.target.value)} className="flex-1 p-8 font-mono text-sm outline-none resize-none" placeholder="Text to test..." />
        </div>
      </div>
      <div className="lg:col-span-5 bg-white rounded-[2rem] border shadow-sm overflow-auto p-6 space-y-4">
        <h3 className="text-xs font-black uppercase text-slate-400">Matches ({matches.length})</h3>
        {matches.map((m, i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-xl font-mono text-sm break-all">"{m[0]}"</div>
        ))}
      </div>
    </div>
  );
};
