
import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  type: 'grid' | 'sidebar' | 'banner' | 'native-feed';
  adSlot?: string;
  adClient?: string;
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdUnit: React.FC<AdUnitProps> = ({ 
  type, 
  adSlot = "0000000000", 
  adClient = "ca-pub-0000000000000000", 
  label = "ADVERTISEMENT",
  className = ""
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.warn("AdSense failed to push:", e);
    }
  }, []);

  const baseLabel = <span className="absolute top-1 left-2 text-[8px] font-bold text-slate-300 dark:text-slate-600 tracking-widest uppercase pointer-events-none">{label}</span>;

  // Placeholder styles for development
  const isDev = true; // Set to false when your AdSense account is approved and IDs are set

  if (type === 'banner') {
    return (
      <div className={`w-full bg-white dark:bg-slate-800 border border-border-light dark:border-slate-700 rounded-xl overflow-hidden relative min-h-[90px] flex items-center justify-center mb-4 ${className}`}>
        {baseLabel}
        {isDev ? (
          <div className="text-center space-y-1">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Horizontal Leaderboard</div>
            <div className="text-[9px] text-slate-300 font-mono italic">728 x 90 Responsive</div>
          </div>
        ) : (
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%', height: '90px' }}
               data-ad-client={adClient}
               data-ad-slot={adSlot}
               data-ad-format="horizontal"
               data-full-width-responsive="true"></ins>
        )}
      </div>
    );
  }

  if (type === 'grid' || type === 'native-feed') {
    return (
      <div className={`group flex flex-col p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-700 transition-all hover:border-primary/30 relative overflow-hidden min-h-[160px] ${className}`}>
        {baseLabel}
        {isDev ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 py-4">
            <div className="size-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300">
              <span className="material-symbols-outlined text-2xl">ads_click</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-tight">In-Feed Unit</h3>
              <p className="text-[9px] text-slate-300 leading-tight max-w-[150px]">Native advertisement placeholder</p>
            </div>
          </div>
        ) : (
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-format="fluid"
               data-ad-layout-key="-fb+5w+4e-db+86"
               data-ad-client={adClient}
               data-ad-slot={adSlot}></ins>
        )}
        <div className="pt-2 flex justify-end">
           <span className="text-[8px] font-black text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">SPONSORED</span>
        </div>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-xl border border-border-light dark:border-slate-700 shadow-sm overflow-hidden relative min-h-[400px] flex flex-col ${className}`}>
        <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border-b border-border-light dark:border-slate-700 flex justify-between items-center">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{label}</span>
          <span className="material-symbols-outlined text-[12px] text-slate-300">info</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          {isDev ? (
            <>
              <div className="w-full aspect-[3/4] bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center border border-slate-100 dark:border-slate-800 border-dashed relative">
                 <div className="text-[10px] font-black text-slate-200 uppercase rotate-45">Skyscraper</div>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-24 bg-slate-100 dark:bg-slate-900 rounded mx-auto"></div>
                <div className="h-1.5 w-32 bg-slate-50 dark:bg-slate-900 rounded mx-auto"></div>
              </div>
              <div className="w-full h-8 bg-primary rounded-lg flex items-center justify-center text-[10px] font-black text-white uppercase tracking-widest opacity-20">
                Action
              </div>
            </>
          ) : (
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client={adClient}
                 data-ad-slot={adSlot}
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          )}
        </div>
        <div className="p-2 text-center border-t border-slate-50 dark:border-slate-700">
           <p className="text-[8px] text-slate-300 dark:text-slate-600 uppercase">300 x 600 Side Unit</p>
        </div>
      </div>
    );
  }

  return null;
};
