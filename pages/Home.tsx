
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
    <div className="flex flex-col gap-6 py-2">
      {/* Header Section */}
      <div className="flex flex-col gap-3 border-b border-border-light pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-widest uppercase">
            Productivity OS
          </div>
          <h1 className="text-3xl font-black tracking-tight text-text-main font-display sm:text-4xl">
            Ultimate <span className="notebook-gradient italic">Portal</span>
          </h1>
          <p className="text-text-secondary font-light text-base max-w-xl">
            High-performance development and creative utility suite.
          </p>
        </div>
      </div>

      {/* Category Selection Bar */}
      <div className="flex items-center overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center bg-white p-1 rounded-xl border border-border-light shadow-sm flex-nowrap shrink-0">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeCategory === 'All' ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-text-main hover:bg-slate-50'}`}
          >
            All Tools
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:text-text-main hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTools.map((tool, index) => (
          <React.Fragment key={tool.id}>
            {index === 4 && (activeCategory === 'All' || activeCategory === 'Networking') && (
              <AdUnit type="grid" />
            )}
            
            <div 
              onClick={() => onSelect(tool.id as Page)}
              className="group flex flex-col p-4 rounded-xl bg-white border border-border-light transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 cursor-pointer relative overflow-hidden"
            >
              {tool.hot && (
                <div className="absolute top-0 right-4 transform bg-primary text-white text-[7px] font-black tracking-widest px-2 py-2 rounded-b-md shadow-sm">
                  HOT
                </div>
              )}
              
              <div className="flex items-start justify-between mb-3">
                <div className={`size-10 rounded-xl flex items-center justify-center shadow-sm transition-all group-hover:scale-105 ${tool.color}`}>
                  <span className="material-symbols-outlined text-2xl">{tool.icon}</span>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                  {tool.category}
                </span>
              </div>
              
              <div className="space-y-1 flex-1">
                <h3 className="text-base font-black text-text-main group-hover:text-primary transition-colors leading-tight">
                  {tool.name}
                </h3>
                <p className="text-[12px] text-text-secondary leading-normal font-light line-clamp-2">
                  {tool.description}
                </p>
              </div>
              
              <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
                  Launch <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
