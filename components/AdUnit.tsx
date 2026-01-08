
import React from 'react';

interface AdUnitProps {
  type: 'grid' | 'sidebar' | 'banner' | 'native-feed';
  label?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ type, label = "ADVERTISEMENT" }) => {
  // 模拟 AdSense 的加载状态和样式
  const baseLabel = <span className="absolute top-1 left-2 text-[8px] font-bold text-slate-300 tracking-widest">{label}</span>;

  if (type === 'banner') {
    return (
      <div className="w-full bg-white border border-border-light rounded-xl overflow-hidden relative min-h-[90px] flex items-center justify-center group cursor-help mb-4">
        {baseLabel}
        <div className="text-center space-y-1">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Horizontal Leaderboard</div>
          <div className="text-[9px] text-slate-300 font-mono">728 x 90 (Responsive)</div>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 transition-colors pointer-events-none"></div>
      </div>
    );
  }

  if (type === 'grid' || type === 'native-feed') {
    return (
      <div className="group flex flex-col p-4 rounded-xl bg-slate-50/50 border border-dashed border-slate-200 transition-all hover:border-primary/30 cursor-pointer relative overflow-hidden min-h-[160px]">
        {baseLabel}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 py-4">
          <div className="size-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-300">
            <span className="material-symbols-outlined text-3xl">ads_click</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-tight">Display Ad Unit</h3>
            <p className="text-[10px] text-slate-300 leading-tight max-w-[150px]">
              In-feed native advertisement unit placeholder
            </p>
          </div>
        </div>
        <div className="pt-2 flex justify-end">
           <span className="text-[9px] font-black text-slate-400 border border-slate-200 px-2 py-0.5 rounded">SPONSORED</span>
        </div>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden relative min-h-[400px] flex flex-col">
        <div className="px-3 py-1.5 bg-slate-50 border-b border-border-light flex justify-between items-center">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{label}</span>
          <span className="material-symbols-outlined text-[12px] text-slate-300">info</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-full aspect-[3/4] bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 border-dashed relative">
             <div className="text-[10px] font-black text-slate-300 uppercase rotate-45">Vertical Skyscraper</div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-24 bg-slate-100 rounded mx-auto"></div>
            <div className="h-2 w-32 bg-slate-50 rounded mx-auto"></div>
            <div className="h-2 w-20 bg-slate-100 rounded mx-auto"></div>
          </div>
          <div className="w-full h-8 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] font-black text-white uppercase tracking-widest opacity-20">
            Buy Now
          </div>
        </div>
        <div className="p-2 text-center border-t border-slate-50">
           <p className="text-[8px] text-slate-300 uppercase">300 x 600 Size</p>
        </div>
      </div>
    );
  }

  return null;
};
