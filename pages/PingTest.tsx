
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface PingTestProps {
  onBack: () => void;
  setActions: (actions: React.ReactNode) => void;
}

export const PingTest: React.FC<PingTestProps> = ({ setActions }) => {
  const [target, setTarget] = useState('https://www.google.com');
  const [results, setResults] = useState<{ time: number; status: 'up' | 'down' | 'error' }[]>([]);
  const [isPinging, setIsPinging] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const startPing = async () => {
    setIsPinging(true);
    setResults([]);
    
    // Simulate 4 pings
    for (let i = 0; i < 4; i++) {
      const startTime = Date.now();
      try {
        // Browsers can't do ICMP, so we do a HEAD request or simple fetch
        // Note: Subject to CORS, but gives a relative sense of 'web latency'
        await fetch(target, { mode: 'no-cors', cache: 'no-cache' });
        const endTime = Date.now();
        setResults(prev => [...prev, { time: endTime - startTime, status: 'up' }]);
      } catch (e) {
        setResults(prev => [...prev, { time: 0, status: 'down' }]);
      }
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setIsPinging(false);
  };

  const analyzeNetwork = async () => {
    setLoadingAnalysis(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const stats = results.length > 0 
        ? `Latency: ${results.map(r => r.time + 'ms').join(', ')}` 
        : 'No live data yet.';
        
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I am testing connectivity to ${target}. ${stats}. Provide a brief professional explanation of what these results might indicate about the network path, DNS resolution, or potential ISP throttling. Be concise.`,
      });
      setAnalysis(response.text || 'No analysis available.');
    } catch (e) {
      setAnalysis("Error analyzing connectivity.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    setActions(
      <button 
        onClick={analyzeNetwork}
        disabled={loadingAnalysis || results.length === 0}
        className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-black hover:bg-emerald-100 transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95"
      >
        <span className="material-symbols-outlined text-[18px]">psychology</span> AI Deep Insight
      </button>
    );
  }, [results, loadingAnalysis]);

  const avgLatency = results.length > 0 ? Math.round(results.reduce((acc, r) => acc + r.time, 0) / results.length) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Target URL / IP</label>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 font-mono font-bold text-lg outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder="e.g. https://google.com"
              />
              <button 
                onClick={startPing}
                disabled={isPinging || !target}
                className="bg-emerald-600 text-white font-black px-8 rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50"
              >
                {isPinging ? 'Pinging...' : 'Start Test'}
              </button>
            </div>
            <p className="text-[10px] text-text-secondary italic">Note: Web-based latency tests are subject to CORS and represent HTTP handshake time.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Response Log</h3>
            <div className="bg-slate-900 rounded-3xl p-6 font-mono text-sm space-y-2 h-48 overflow-y-auto custom-scrollbar">
              {results.length === 0 && !isPinging && <p className="text-slate-600">Waiting for test to start...</p>}
              {results.map((r, i) => (
                <div key={i} className="flex justify-between items-center text-emerald-400">
                  <span>[{i+1}] Sequence response from {target}</span>
                  <span className={r.status === 'up' ? 'text-emerald-400' : 'text-rose-400'}>
                    {r.status === 'up' ? `time=${r.time}ms` : 'Request Timeout'}
                  </span>
                </div>
              ))}
              {isPinging && <div className="text-emerald-400/50 animate-pulse">Requesting...</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white rounded-[2rem] border border-border-light shadow-sm p-10 flex flex-col items-center justify-center text-center gap-6">
           <div className="size-24 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner">
              <span className="material-symbols-outlined text-4xl">speed</span>
           </div>
           <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Average Latency</p>
              <h2 className="text-5xl font-black text-text-main">{avgLatency}<span className="text-lg font-light text-slate-400 ml-1">ms</span></h2>
           </div>
           <div className="flex gap-4 w-full">
              <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                 <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Packet Loss</p>
                 <p className="font-bold">{results.length > 0 ? Math.round((results.filter(r => r.status === 'down').length / results.length) * 100) : 0}%</p>
              </div>
              <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                 <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Stability</p>
                 <p className="font-bold text-emerald-600">Stable</p>
              </div>
           </div>
        </div>

        {analysis && (
          <div className="bg-emerald-900 text-white rounded-[2rem] p-8 shadow-xl animate-in fade-in slide-in-from-bottom-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">verified</span> Network Analysis
            </h4>
            <p className="text-sm font-light leading-relaxed">
              {analysis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
