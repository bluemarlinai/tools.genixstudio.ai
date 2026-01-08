
import React, { useState, useMemo } from 'react';

export const SubnetCalculator: React.FC = () => {
  const [cidr, setCidr] = useState('192.168.1.0/24');

  const calcData = useMemo(() => {
    try {
      const [ip, maskStr] = cidr.split('/');
      const mask = parseInt(maskStr);
      if (isNaN(mask) || mask < 0 || mask > 32) throw new Error();

      const ipParts = ip.split('.').map(p => parseInt(p));
      if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) throw new Error();

      const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
      const maskNum = mask === 0 ? 0 : (~0 << (32 - mask));
      
      const networkNum = ipNum & maskNum;
      const broadcastNum = networkNum | ~maskNum;
      const numHosts = Math.max(0, broadcastNum - networkNum - 1);

      const toIp = (num: number) => [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join('.');

      const toBinary = (num: number) => {
        const bin = (num >>> 0).toString(2).padStart(32, '0');
        return [bin.slice(0, 8), bin.slice(8, 16), bin.slice(16, 24), bin.slice(24, 32)].join('.');
      };

      return {
        network: toIp(networkNum),
        broadcast: toIp(broadcastNum),
        mask: toIp(maskNum),
        range: `${toIp(networkNum + 1)} - ${toIp(broadcastNum - 1)}`,
        hosts: numHosts.toLocaleString(),
        binaryMask: toBinary(maskNum),
        error: false
      };
    } catch (e) {
      return { error: true };
    }
  }, [cidr]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-6 space-y-6">
        <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary">CIDR Block</label>
            <input 
              type="text" 
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-5 font-mono font-black text-2xl outline-none focus:ring-2 focus:ring-blue-100 text-center"
              placeholder="10.0.0.0/16"
            />
          </div>

          {!calcData.error && (
            <div className="space-y-4">
               {[
                 { label: 'Network Address', value: calcData.network },
                 { label: 'Broadcast Address', value: calcData.broadcast },
                 { label: 'Subnet Mask', value: calcData.mask },
                 { label: 'Usable Host Range', value: calcData.range },
                 { label: 'Total Usable Hosts', value: calcData.hosts },
               ].map((row, i) => (
                 <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50 last:border-none">
                    <span className="text-xs font-black uppercase text-slate-400 tracking-tighter">{row.label}</span>
                    <span className="font-mono font-bold text-blue-600">{row.value}</span>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-6 space-y-6">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 shadow-2xl">
           <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">Binary Mask Breakdown</h3>
           {!calcData.error ? (
             <div className="space-y-6 font-mono text-center">
                <div className="space-y-2">
                   <p className="text-[10px] text-slate-500 uppercase">Subnet Mask</p>
                   <div className="text-xl font-black text-blue-400 tracking-[0.2em]">{calcData.binaryMask}</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-[8px] text-slate-600 uppercase">
                   <span>Octet 1</span><span>Octet 2</span><span>Octet 3</span><span>Octet 4</span>
                </div>
             </div>
           ) : (
             <div className="text-rose-400 font-black italic">Invalid CIDR notation detected.</div>
           )}
        </div>

        <div className="bg-white rounded-[2rem] border border-border-light p-8 space-y-4 shadow-sm">
           <h4 className="text-xs font-black text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span> Tech Note
           </h4>
           <p className="text-xs text-text-secondary leading-relaxed font-light">
              Subnetting allows you to divide a large network into smaller, more manageable sub-networks. This improves security and reduces broadcast traffic.
           </p>
        </div>
      </div>
    </div>
  );
};
