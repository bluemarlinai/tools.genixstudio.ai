
import React, { useState } from 'react';
import { Page, ToolCategory } from '../types';
import { TOOLS } from '../data/tools';
import { AdUnit } from '../components/AdUnit';

const CATEGORIES: ToolCategory[] = ['Networking', 'Development', 'Design', 'Media', 'Security', 'Productivity'];

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
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4 py-1">
      {/* Refined Header Section */}
      <div className="flex flex-col gap-1.5">
        <div className="space-y-0.5">
          <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[8px] font-black tracking-widest uppercase">
            Workstation
          </div>
          <h1 className="text-2xl font-black tracking-tight text-text-main dark:text-white font-display sm:text-3xl">
            Developer <span className="notebook-gradient italic">Workstation</span>
          </h1>
          <p className="text-text-secondary dark:text-slate-400 font-normal text-xs max-w-lg leading-relaxed opacity-80">
            {searchQuery 
              ? `Found ${filteredTools.length} tools matching "${searchQuery}"`
              : "Curated minimalist utilities for development, networking, and security auditing."
            }
          </p>
        </div>
      </div>

      {/* Categories - Removed -mx-1 to ensure perfect left alignment */}
      <div className="flex items-center overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center bg-white dark:bg-slate-800 p-0.5 rounded-xl border border-border-light dark:border-slate-700 shadow-sm flex-nowrap shrink-0">
          <button 
            onClick={() => setActiveCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all whitespace-nowrap ${activeCategory === 'All' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-main hover:bg-slate-50 dark:hover:bg-slate-700'}`}
          >
            All Tools
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white shadow-sm' : 'text-text-secondary hover:text-text-main hover:bg-slate-50 dark:hover:bg-slate-700'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Banner Ad */}
      {!searchQuery && <AdUnit type="banner" className="my-0" />}

      {/* Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredTools.map((tool, index) => {
            const items = [];
            
            if (!searchQuery && (index === 3 || index === 11)) {
              items.push(<AdUnit key={`ad-${index}`} type="grid" />);
            }

            items.push(
              <div 
                key={tool.id}
                onClick={() => onSelect(tool.id as Page)}
                className="group flex flex-col p-4 rounded-xl bg-white dark:bg-slate-800 border border-border-light dark:border-slate-700 transition-all hover:shadow-md hover:border-primary/40 cursor-pointer relative overflow-hidden"
              >
                {tool.hot && (
                  <div className="absolute top-0 right-3 transform bg-primary text-white text-[6px] font-black tracking-widest px-1.5 py-1.5 rounded-b-sm shadow-sm z-10">
                    HOT
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-3">
                  <div className={`size-9 rounded-lg flex items-center justify-center shadow-sm transition-all group-hover:scale-110 ${tool.color}`}>
                    <span className="material-symbols-outlined text-[20px]">{tool.icon}</span>
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/80 dark:bg-slate-900 px-1.5 py-0.5 rounded-md">
                    {tool.category}
                  </span>
                </div>
                
                <div className="space-y-0.5 flex-1">
                  <h3 className="text-sm font-black text-text-main dark:text-white group-hover:text-primary transition-colors leading-tight">
                    {tool.name}
                  </h3>
                  <p className="text-[10px] text-text-secondary dark:text-slate-400 leading-relaxed font-normal line-clamp-2 opacity-80">
                    {tool.description}
                  </p>
                </div>
                
                <div className="mt-3 pt-2 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all">
                    Launch <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                  </div>
                </div>
              </div>
            );
            
            return items;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
           <div className="size-14 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-300 mb-3">
              <span className="material-symbols-outlined text-2xl">search_off</span>
           </div>
           <h3 className="text-sm font-black text-text-main dark:text-white mb-0.5">No results found</h3>
           <p className="text-[10px] text-text-secondary dark:text-slate-400 max-w-xs mx-auto font-light">
             Adjust your filters or keywords.
           </p>
           <button 
             onClick={() => setActiveCategory('All')}
             className="mt-4 px-5 py-2 bg-primary text-white rounded-lg text-[10px] font-black shadow-sm hover:scale-105 transition-all"
           >
             Clear Filters
           </button>
        </div>
      )}
    </div>
  );
};
