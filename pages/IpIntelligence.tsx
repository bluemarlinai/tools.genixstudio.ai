
import React, { useState, useEffect } from 'react';

interface IpIntelligenceProps {
  setActions: (actions: React.ReactNode) => void;
}

export const IpIntelligence: React.FC<IpIntelligenceProps> = ({ setActions }) => {
  const [ip, setIp] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getBasicIp = async () => {
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      if (res.ok) {
        const d = await res.json();
        return d.ip;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const fetchIpData = async (targetIp?: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const url = targetIp ? `https://ipapi.co/${targetIp}/json/` : `https://ipapi.co/json/`;
      const response = await fetch(url);
      
      if (!response.ok) throw new Error(`API returned ${response.status}`);
      
      const result = await response.json();
      if (result.error) throw new Error(result.reason || 'IP Lookup failed');
      
      setData(result);
      if (!targetIp) setIp(result.ip);
    } catch (e: any) {
      if (!targetIp) {
        const basicIp = await getBasicIp();
        if (basicIp) {
          setIp(basicIp);
          setError('Detailed lookup failed, showing basic IP detection.');
          return;
        }
      }
      setError('Connection failed. Service may be blocked.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpData();
    // AI Audit removed to prevent unauthorized API usage
    setActions(null);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
      <div className="lg:col-span-8 space-y-3">
        <div className="bg-white rounded-xl border border-border-light shadow-sm p-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-text-secondary ml-1">IP Target</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchIpData(ip)}
                className="flex-1 bg-slate-50 border-none rounded-lg px-3 py-1.5 font-mono font-bold text-xs outline-none focus:ring-1 focus:ring-emerald-200"
                placeholder="Enter IP address..."
              />
              <button 
                onClick={() => fetchIpData(ip)}
                disabled={loading || !ip}
                className="bg-emerald-600 text-white font-black px-4 rounded-lg shadow-sm hover:bg-emerald-700 transition-all active:scale-95 disabled:opacity-50 text-[10px] uppercase tracking-wider"
              >
                {loading ? '...' : 'Lookup'}
              </button>
            </div>
            {error && <p className="text-[9px] text-rose-500 font-bold px-1 animate-pulse">{error}</p>}
          </div>

          {data ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 animate-in">
               {[
                 { label: 'Location', value: `${data.city || 'N/A'}, ${data.country_code || 'N/A'}`, icon: 'location_on' },
                 { label: 'Network', value: data.org || 'Unknown', icon: 'business' },
                 { label: 'ASN', value: data.asn || 'N/A', icon: 'router' },
                 { label: 'Region', value: data.region || 'N/A', icon: 'map' },
                 { label: 'Lat/Long', value: data.latitude ? `${data.latitude}, ${data.longitude}` : 'N/A', icon: 'explore' },
                 { label: 'Currency', value: data.currency || 'N/A', icon: 'payments' },
               ].map((item, idx) => (
                 <div key={idx} className="bg-slate-50/50 p-2 rounded-lg border border-slate-100 flex items-center gap-2">
                    <div className="size-7 rounded-md bg-white border border-slate-100 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                       <span className="material-symbols-outlined text-base">{item.icon}</span>
                    </div>
                    <div className="min-w-0">
                       <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 leading-none mb-0.5">{item.label}</p>
                       <p className="font-bold text-[10px] text-text-main truncate leading-tight">{item.value}</p>
                    </div>
                 </div>
               ))}
            </div>
          ) : !loading && (
            <div className="py-8 text-center text-slate-300 font-light flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-3xl opacity-20">sensors</span>
              <p className="text-[10px] font-bold uppercase tracking-widest">Awaiting IP Data</p>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-3">
        <div className="bg-emerald-900 text-white rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center gap-2">
           <div className="size-8 rounded-full bg-emerald-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">public</span>
           </div>
           <div>
              <p className="text-[8px] font-black uppercase text-emerald-300 tracking-widest">Current Node</p>
              <h3 className="text-base font-black font-mono">{ip || 'Detecting...'}</h3>
           </div>
        </div>
      </div>
    </div>
  );
};
