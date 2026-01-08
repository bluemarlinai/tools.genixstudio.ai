
import React from 'react';

interface AdUnitProps {
  type: 'grid' | 'sidebar' | 'banner';
}

export const AdUnit: React.FC<AdUnitProps> = ({ type }) => {
  if (type === 'grid') {
    return (
      <div className="flex flex-col p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-dashed border-primary/20 transition-all hover:shadow-md cursor-pointer relative overflow-hidden group">
        <div className="absolute top-2 right-4 text-[7px] font-black uppercase tracking-[0.2em] text-slate-300">Sponsored</div>
        <div className="size-10 rounded-xl flex items-center justify-center bg-white border border-slate-100 shadow-sm mb-3 group-hover:scale-105 transition-transform shrink-0">
          <span className="material-symbols-outlined text-primary text-2xl">campaign</span>
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">CloudScale Pro</h3>
          <p className="text-[11px] text-text-secondary leading-normal font-light">
            Deploy your mock services globally with 99.9% uptime.
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[9px] font-black text-primary px-2 py-0.5 bg-primary/5 rounded-full">UPGRADE</span>
          <span className="material-symbols-outlined text-slate-300 text-sm group-hover:translate-x-0.5 transition-transform">arrow_outward</span>
        </div>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden">
        <div className="px-3 py-1.5 bg-slate-50 border-b border-border-light flex justify-between items-center">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Promoted</span>
          <span className="material-symbols-outlined text-[12px] text-slate-300">info</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 shadow-inner group cursor-pointer relative overflow-hidden">
             <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80" className="absolute inset-0 size-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <p className="absolute bottom-2 left-2 text-white text-[9px] font-black uppercase tracking-widest">Master React</p>
          </div>
          <p className="text-[11px] text-text-secondary leading-normal font-light">
            20% off for ToolPortal users. Code <strong>TP20</strong>.
          </p>
          <button className="w-full bg-slate-900 text-white py-2 rounded-lg text-[9px] font-black hover:bg-black transition-all active:scale-95">
            LEARN MORE
          </button>
        </div>
      </div>
    );
  }

  return null;
};
