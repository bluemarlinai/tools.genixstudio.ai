
import React, { useState } from 'react';
import { Page, ToolCategory } from '../types';
import { TOOLS } from '../data/tools';
import { AdUnit } from '../components/AdUnit';

const CATEGORIES: (ToolCategory | 'All')[] = ['All', 'Life', 'Social', 'Writing', 'Development', 'Design', 'Media', 'Networking', 'Security'];

interface HomeProps {
  onSelect: (page: Page) => void;
  searchQuery: string;
}

export const Home: React.FC<HomeProps> = ({ onSelect, searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');

  const filteredTools = TOOLS.filter(t => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center w-fit px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-black tracking-widest uppercase">
          Unified Toolbox
        </div>
        <h1 className="text-3xl font-black tracking-tight text-text-main dark:text-white font-display sm:text-4xl">
          Smart <span className="notebook-gradient italic">SmartPortal</span>
        </h1>
        <p className="text-text-secondary dark:text-slate-400 font-normal text-xs max-w-lg leading-relaxed opacity-80">
          Your daily hub for productivity, life hacks, and development tools. Fast, secure, and AI-powered.
        </p>
      </div>

      <div className="flex items-center overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center bg-white dark:bg-slate-800 p-1 rounded-xl border border-border-light dark:border-slate-700 shadow-sm flex-nowrap shrink-0">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-main hover:bg-slate-50 dark:hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {!searchQuery && <AdUnit type="banner" />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTools.map((tool) => (
          <div 
            key={tool.id}
            onClick={() => onSelect(tool.id as Page)}
            className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-800 border border-border-light dark:border-slate-700 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer relative overflow-hidden"
          >
            {tool.hot && (
              <div className="absolute top-0 right-4 bg-primary text-white text-[7px] font-black tracking-widest px-2 py-2 rounded-b-md shadow-sm">
                HOT
              </div>
            )}
            
            <div className={`size-11 rounded-xl flex items-center justify-center shadow-sm mb-4 transition-transform group-hover:scale-110 ${tool.color}`}>
              <span className="material-symbols-outlined text-2xl">{tool.icon}</span>
            </div>
            
            <div className="space-y-1 flex-1">
              <h3 className="text-sm font-black text-text-main dark:text-white group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-[11px] text-text-secondary dark:text-slate-400 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
                {tool.category}
              </span>
              <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors text-lg">arrow_forward</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
