
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface DnsLookupProps {
  onBack: () => void;
  setActions: (actions: React.ReactNode) => void;
}

interface DnsRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

const RECORD_TYPES: Record<number, string> = {
  1: 'A',
  2: 'NS',
  5: 'CNAME',
  15: 'MX',
  16: 'TXT',
  28: 'AAAA',
};

export const DnsLookup: React.FC<DnsLookupProps> = ({ setActions }) => {
  const [domain, setDomain] = useState('google.com');
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const lookup = async () => {
    setLoading(true);
    setRecords([]);
    try {
      // Use Google DNS-over-HTTPS API
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=ANY`);
      const data = await response.json();
      setRecords(data.Answer || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const analyzeDns = async () => {
    setLoadingAnalysis(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const recordSummary = records.map(r => `${RECORD_TYPES[r.type] || r.type}: ${r.data}`).join('\n');
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Explain these DNS records for ${domain} in simple terms. What services do they point to (e.g. Google Workspace, Cloudflare)? \n\n${recordSummary}`,
      });
      setAnalysis(response.text || 'No analysis available.');
    } catch (e) {
      setAnalysis("Error analyzing DNS records.");
    } finally {
      setLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    setActions(
      <button 
        onClick={analyzeDns}
        disabled={loadingAnalysis || records.length === 0}
        className="bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-100 transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95"
      >
        <span className="material-symbols-outlined text-[18px]">auto_awesome</span> Interpret Records
      </button>
    );
  }, [records, loadingAnalysis]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Domain Name</label>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 font-mono font-bold text-lg outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="e.g. toolportal.io"
              />
              <button 
                onClick={lookup}
                disabled={loading || !domain}
                className="bg-blue-600 text-white font-black px-8 rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Fetching...' : 'Lookup'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Answer Records</h3>
                <span className="text-[10px] font-bold text-slate-300 uppercase">Provider: Google DoH</span>
             </div>
             <div className="bg-slate-50 rounded-3xl overflow-hidden border border-border-light">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-white border-b border-border-light text-[10px] font-black uppercase tracking-widest text-text-secondary">
                      <tr>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4">Value</th>
                        <th className="px-6 py-4 text-right">TTL</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-border-light font-mono text-xs">
                      {records.length > 0 ? records.map((r, i) => (
                        <tr key={i} className="hover:bg-white transition-colors">
                          <td className="px-6 py-4"><span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-black">{RECORD_TYPES[r.type] || r.type}</span></td>
                          <td className="px-6 py-4 text-text-main truncate max-w-[200px]" title={r.data}>{r.data}</td>
                          <td className="px-6 py-4 text-right text-text-secondary">{r.TTL}s</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">No records found. Perform a lookup to see results.</td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-8">
        <div className="bg-white rounded-[2rem] border border-border-light shadow-sm p-10">
           <div className="flex items-center gap-4 mb-6">
              <div className="size-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                 <span className="material-symbols-outlined">dns</span>
              </div>
              <div>
                 <h4 className="font-black text-text-main">DNS Intelligence</h4>
                 <p className="text-xs text-text-secondary font-light">Understand the plumbing of the internet.</p>
              </div>
           </div>
           
           <div className="space-y-4 text-sm text-text-secondary leading-relaxed font-light">
              <p>DNS (Domain Name System) is the phonebook of the internet. It maps human-readable names like <code className="bg-slate-50 px-1.5 py-0.5 rounded text-blue-600">google.com</code> to machine IP addresses.</p>
              <div className="grid grid-cols-2 gap-3 text-[10px] font-bold uppercase tracking-tighter">
                 <div className="p-3 bg-slate-50 rounded-xl">A: IPv4 Address</div>
                 <div className="p-3 bg-slate-50 rounded-xl">AAAA: IPv6 Address</div>
                 <div className="p-3 bg-slate-50 rounded-xl">MX: Mail Server</div>
                 <div className="p-3 bg-slate-50 rounded-xl">CNAME: Alias</div>
              </div>
           </div>
        </div>

        {analysis && (
          <div className="bg-white rounded-[2rem] border-2 border-blue-100 p-8 shadow-xl animate-in fade-in slide-in-from-right-4">
             <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span> AI Expert Analysis
             </h4>
             <div className="prose prose-sm prose-blue font-light text-text-main leading-relaxed">
                {analysis.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
