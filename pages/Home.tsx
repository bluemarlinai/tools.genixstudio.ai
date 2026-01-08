
import React, { useState } from 'react';
import { Page, ToolCategory } from '../types';
import { TOOLS } from '../data/tools';
import { AdUnit } from '../components/AdUnit';

const CATEGORIES: ToolCategory[] = ['Networking', 'Development', 'Media', 'Security', 'Productivity'];

interface HomeProps {
  onSelect: (page: Page) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelect }) => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');

  const filteredTools = activeCategory === 'All' 
    ? TOOLS 
    : TOOLS.filter(t => t.category === activeCategory);

  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border-light pb-8">
        <div className="space-y-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-black tracking-widest uppercase">
            Productivity OS
          </div>
          <h1 className="text-4xl font-black tracking-tight text-text-main font-display sm:text-5xl">
            Ultimate <span className="notebook-gradient italic">Portal</span>
          </h1>
          <p className="text-text-secondary font-light text-lg max-w-xl">
            The world-class utility suite for high-performance development and creative workflows.
          </p>
        </div>
        
        <div className="flex flex-wrap bg-white p-1 rounded-2xl border border-border-light shadow-sm">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeCategory === 'All' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary hover:text-text-main hover:bg-slate-50'}`}
          >
            All Tools
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary hover:text-text-main hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool, index) => (
          <React.Fragment key={tool.id}>
            {/* Inject an ad at index 3 (4th position) if looking at all tools or Networking */}
            {index === 3 && (activeCategory === 'All' || activeCategory === 'Networking') && (
              <AdUnit type="grid" />
            )}
            
            <div 
              onClick={() => onSelect(tool.id as Page)}
              className="group flex flex-col p-6 rounded-[2.5rem] bg-white border border-border-light transition-all hover:shadow-2xl hover:-translate-y-1.5 hover:border-primary/30 cursor-pointer relative overflow-hidden"
            >
              {tool.hot && (
                <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-primary text-white text-[8px] font-black tracking-widest px-3 py-4 rounded-b-xl rotate-12 shadow-lg">
                  HOT
                </div>
              )}
              
              <div className="flex items-start justify-between mb-6">
                <div className={`size-14 rounded-3xl flex items-center justify-center shadow-sm transition-all group-hover:scale-110 group-hover:rotate-3 ${tool.color}`}>
                  <span className="material-symbols-outlined text-[32px]">{tool.icon}</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">
                  {tool.category}
                </span>
              </div>
              
              <div className="space-y-3 flex-1">
                <h3 className="text-xl font-black text-text-main group-hover:text-primary transition-colors leading-tight">
                  {tool.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed font-light line-clamp-2">
                  {tool.description}
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-black text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  Launch <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
