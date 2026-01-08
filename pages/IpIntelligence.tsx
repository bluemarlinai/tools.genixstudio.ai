
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface IpIntelligenceProps {
  setActions: (actions: React.ReactNode) => void;
}

export const IpIntelligence: React.FC<IpIntelligenceProps> = ({ setActions }) => {
  const [ip, setIp] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const fetchIpData = async (targetIp?: string) => {
    setLoading(true);
    try {
      // Use ipapi.co for free geolocation data
      const url = targetIp ? `https://ipapi.co/${targetIp}/json/` : `https://ipapi.co/json/`;
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      if (!targetIp) setIp(result.ip);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const generateRiskReport = async () => {
    if (!data) return;
    setLoadingAi(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this IP data for potential risks: ${JSON.stringify(data)}. Is it a known data center? What is the reputation of the ISP (${data.org})? Provide a brief security risk assessment score (1-10) and explanation.`,
      });
      setAiReport(response.text || 'No report generated.');
    } catch (e) {
      setAiReport("Unable to generate AI report at this time.");
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  useEffect(() => {
    setActions(
      <button 
        onClick={generateRiskReport}
        disabled={loadingAi || !data}
        className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-black hover:bg-emerald-100 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-[18px]">security</span> AI Security Audit
      </button>
    );
  }, [data, loadingAi]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Target IP Address</label>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 font-mono font-bold text-lg outline-none focus:ring-2 focus:ring-emerald-100"
                placeholder="e.g. 8.8.8.8"
              />
              <button 
                onClick={() => fetchIpData(ip)}
                disabled={loading || !ip}
                className="bg-emerald-600 text-white font-black px-8 rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? '...' : 'Lookup'}
              </button>
            </div>
          </div>

          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { label: 'Location', value: `${data.city}, ${data.region}, ${data.country_name}`, icon: 'location_on' },
                 { label: 'Organization / ISP', value: data.org, icon: 'business' },
                 { label: 'Timezone', value: data.timezone, icon: 'schedule' },
                 { label: 'ASN', value: data.asn, icon: 'router' },
                 { label: 'Coordinates', value: `${data.latitude}, ${data.longitude}`, icon: 'explore' },
                 { label: 'Currency', value: `${data.currency_name} (${data.currency})`, icon: 'payments' },
               ].map((item, idx) => (
                 <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                    <div className="size-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 shadow-sm">
                       <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                    </div>
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                       <p className="font-bold text-text-main truncate max-w-[200px]">{item.value}</p>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-[2rem] border shadow-sm p-8 flex flex-col items-center justify-center text-center gap-4 bg-emerald-900 text-white">
           <div className="size-16 rounded-full bg-emerald-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">public</span>
           </div>
           <div>
              <p className="text-[10px] font-black uppercase text-emerald-300">Public Access Node</p>
              <h3 className="text-2xl font-black">{data?.ip || 'Detecting...'}</h3>
           </div>
        </div>

        {aiReport && (
          <div className="bg-white rounded-[2rem] border-2 border-emerald-100 p-8 shadow-xl animate-in zoom-in">
             <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span> Security Risk Assessment
             </h4>
             <div className="text-sm font-light text-text-main leading-relaxed space-y-3">
                {aiReport.split('\n').map((line, i) => <p key={i}>{line}</p>)}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
