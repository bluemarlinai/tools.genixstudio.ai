
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface PingTestProps {
  onBack: () => void;
  setActions: (actions: React.ReactNode) => void;
}

export const PingTest: React.FC<PingTestProps> = ({ setActions }) => {
  const [target, setTarget] = useState('www.google.com');
  const [results, setResults] = useState<{ time: number; status: 'up' | 'down' | 'error' }[]>([]);
  const [isPinging, setIsPinging] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const startPing = async () => {
    setIsPinging(true);
    setResults([]);
    
    // Normalize target URL for a basic reachability check
    let testUrl = target;
    if (!testUrl.startsWith('http')) {
        testUrl = 'https://' + testUrl;
    }

    // Browser pinging is limited by CORS, but 'no-cors' allows a basic opaque request
    // to measure the time it takes for a server to respond at all.
    for (let i = 0; i < 4; i++) {
      const startTime = Date.now();
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        await fetch(testUrl, { 
            mode: 'no-cors', 
            cache: 'no-cache',
            signal: controller.signal 
        });
        
        clearTimeout(timeoutId);
        const endTime = Date.now();
        setResults(prev => [...prev, { time: endTime - startTime, status: 'up' }]);
      } catch (e: any) {
        console.warn(`Ping attempt ${i+1} failed:`, e.name);
        setResults(prev => [...prev, { time: 0, status: e.name === 'AbortError' ? 'down' : 'error' }]);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setIsPinging(false);
  };

  const analyzeNetwork = async () => {
    setLoadingAnalysis(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const stats = results.length > 0 
        ? `Latency Sequence: ${results.map(r => r.status === 'up' ? r.time + 'ms' : 'Timeout').join(', ')}` 
        : 'No data.';
        
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this ping sequence for ${target}: ${stats}. What does this suggest about the server reachability or network jitter? Keep it brief and professional.`,
      });
      setAnalysis(response.text || 'Analysis empty.');
    } catch (e) {
      setAnalysis("AI Analysis unavailable at this time.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    setActions(
      <button 
        onClick={analyzeNetwork}
        disabled={loadingAnalysis || results.length === 0}
        className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-lg text-[10px] font-black hover:bg-emerald-100 transition-all flex items-center gap-1.5 disabled:opacity-50 active:scale-95"
      >
        <span className="material-symbols-outlined text-sm">analytics</span> AI Insights
      </button>
    );
  }, [results, loadingAnalysis]);

  const avgLatency = results.length > 0 && results.some(r => r.status === 'up') 
    ? Math.round(results.filter(r => r.status === 'up').reduce((acc, r) => acc + r.time, 0) / results.filter(r => r.status === 'up').length) 
    : 0;

  const packetLoss = results.length > 0 
    ? Math.round((results.filter(r => r.status !== 'up').length / results.length) * 100) 
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
      <div className="lg:col-span-7 space-y-3">
        <div className="bg-white rounded-xl border border-border-light shadow-sm p-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-1">Target Host</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && startPing()}
                className="flex-1 bg-slate-50 border-none rounded-lg px-3 py-1.5 font-mono font-bold text-xs outline-none focus:ring-1 focus:ring-emerald-200"
                placeholder="e.g. google.com"
              />
              <button 
                onClick={startPing}
                disabled={isPinging || !target}
                className="bg-emerald-600 text-white font-black px-4 rounded-lg shadow-sm hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50 text-[10px] uppercase"
              >
                {isPinging ? '...' : 'Ping'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-1">Terminal Output</h3>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-[10px] space-y-1 h-32 overflow-y-auto custom-scrollbar border border-slate-800">
              {results.length === 0 && !isPinging && <p className="text-slate-600 italic">Ready to transmit...</p>}
              {results.map((r, i) => (
                <div key={i} className="flex justify-between items-center border-b border-slate-800/50 pb-1 last:border-0 animate-in">
                  <span className="text-slate-400 opacity-60">SEQ={i+1} Target={target.slice(0, 15)}...</span>
                  <span className={r.status === 'up' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {r.status === 'up' ? `${r.time}ms` : 'TIMEOUT'}
                  </span>
                </div>
              ))}
              {isPinging && <div className="text-emerald-400/30 animate-pulse">Requesting ICMP Echo...</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-3">
        <div className="bg-white rounded-xl border border-border-light shadow-sm p-5 flex flex-col items-center justify-center text-center gap-4">
           <div className={`size-14 rounded-full flex items-center justify-center border shadow-inner transition-colors ${packetLoss > 50 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
              <span className="material-symbols-outlined text-2xl">{packetLoss > 50 ? 'signal_disconnected' : 'speed'}</span>
           </div>
           <div className="space-y-0.5">
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Avg Latency</p>
              <h2 className="text-3xl font-black text-text-main">{avgLatency}<span className="text-sm font-light text-slate-400 ml-0.5">ms</span></h2>
           </div>
           <div className="grid grid-cols-2 gap-2 w-full">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                 <p className="text-[7px] font-black uppercase text-slate-400 mb-0.5">Loss</p>
                 <p className={`text-xs font-bold ${packetLoss > 0 ? 'text-rose-500' : 'text-emerald-600'}`}>{packetLoss}%</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                 <p className="text-[7px] font-black uppercase text-slate-400 mb-0.5">Status</p>
                 <p className={`text-xs font-bold ${packetLoss < 100 ? 'text-emerald-600' : 'text-rose-600'}`}>
                   {packetLoss < 100 ? 'Live' : 'Dead'}
                 </p>
              </div>
           </div>
        </div>

        {analysis && (
          <div className="bg-emerald-900 text-white rounded-xl p-4 shadow-sm slide-in border border-emerald-800">
            <h4 className="text-[9px] font-black uppercase tracking-widest text-emerald-300 mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">verified</span> Network Context
            </h4>
            <p className="text-[10px] font-light leading-relaxed opacity-90">
              {analysis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
