
import React from 'react';

interface AdUnitProps {
  type: 'grid' | 'sidebar' | 'banner';
}

export const AdUnit: React.FC<AdUnitProps> = ({ type }) => {
  if (type === 'grid') {
    return (
      <div className="flex flex-col p-6 rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-white border border-dashed border-primary/20 transition-all hover:shadow-xl cursor-pointer relative overflow-hidden group">
        <div className="absolute top-4 right-6 text-[8px] font-black uppercase tracking-[0.2em] text-slate-300">Sponsored</div>
        <div className="size-14 rounded-3xl flex items-center justify-center bg-white border border-slate-100 shadow-sm mb-6 group-hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-primary text-[32px]">campaign</span>
        </div>
        <div className="space-y-2 flex-1">
          <h3 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">CloudScale Pro</h3>
          <p className="text-xs text-text-secondary leading-relaxed font-light">
            Deploy your mock services globally with 99.9% uptime. The ultimate partner for ToolPortal users.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/5 rounded-full">UPGRADE NOW</span>
          <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">arrow_outward</span>
        </div>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div className="bg-white rounded-[2rem] border border-border-light shadow-sm overflow-hidden mt-8">
        <div className="p-4 bg-slate-50 border-b border-border-light flex justify-between items-center">
          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Promoted</span>
          <span className="material-symbols-outlined text-[14px] text-slate-300">info</span>
        </div>
        <div className="p-6 space-y-4">
          <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shadow-inner group cursor-pointer relative overflow-hidden">
             <img src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80" className="absolute inset-0 size-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <p className="absolute bottom-3 left-3 text-white text-[10px] font-black uppercase tracking-widest">Master React Performance</p>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed font-light">
            Exclusive 20% off for ToolPortal developers. Use code <strong>TP20</strong>.
          </p>
          <button className="w-full bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black hover:bg-black transition-all active:scale-95">
            LEARN MORE
          </button>
        </div>
      </div>
    );
  }

  return null;
};
