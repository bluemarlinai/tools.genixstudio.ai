
import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  setCurrentPage, 
  searchQuery, 
  setSearchQuery 
}) => {
  const [isDark, setIsDark] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val && currentPage !== 'home' && currentPage !== 'privacy' && currentPage !== 'terms') {
      setCurrentPage('home');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border-light dark:border-slate-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Logo Section - Refined Copy */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer shrink-0" 
            onClick={() => {
              setSearchQuery('');
              setCurrentPage('home');
            }}
          >
            <div className="size-8 flex items-center justify-center rounded-lg bg-primary text-white shadow-sm">
              <span className="material-symbols-outlined font-bold text-[18px]">terminal</span>
            </div>
            <div className="flex flex-col leading-none">
              <h1 className="text-sm font-black tracking-tighter text-text-main dark:text-white uppercase">DevPortal</h1>
              <span className="text-[8px] font-bold text-slate-400 tracking-wider uppercase">System Toolbox</span>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[18px] group-focus-within:text-primary transition-colors">search</span>
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search tools or commands... (⌘K)" 
                className="w-full bg-slate-100/50 dark:bg-slate-800/50 border border-transparent rounded-xl py-1.5 pl-10 pr-12 text-xs font-medium focus:ring-2 focus:ring-primary/10 focus:bg-white dark:focus:bg-slate-800 focus:border-primary/20 transition-all outline-none"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery ? (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="size-5 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex h-4 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[9px] font-medium text-slate-400 opacity-80 pointer-events-none">
                    <span className="text-[10px]">⌘</span>K
                  </kbd>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Group */}
          <div className="flex items-center gap-1 sm:gap-4">
            <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/50 p-0.5 rounded-lg border border-slate-200/50">
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setCurrentPage('home');
                }}
                className={`px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-tight transition-all ${currentPage === 'home' && !searchQuery ? 'bg-white text-primary shadow-sm' : 'text-text-secondary hover:text-text-main'}`}
              >
                Tools
              </button>
              <button className="px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-tight text-text-secondary hover:text-text-main hover:bg-white/50 transition-all">
                Docs
              </button>
            </nav>

            <div className="h-4 w-[1px] bg-border-light hidden sm:block"></div>

            <div className="flex items-center gap-0.5">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:bg-slate-100 hover:text-primary transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
              </button>
              
              <button className="size-8 flex items-center justify-center rounded-lg text-text-secondary hover:bg-slate-100 hover:text-primary transition-all relative" title="Notifications">
                <span className="material-symbols-outlined text-[18px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 size-1.5 bg-rose-500 border-2 border-white rounded-full"></span>
              </button>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-border-light ml-1">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-indigo-600 p-[1.5px] shadow-sm active:scale-95 transition-all cursor-pointer">
                <div className="size-full bg-white rounded-[6px] flex items-center justify-center text-primary text-[10px] font-black">
                  AD
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4">
        {children}
      </main>

      <footer className="border-t border-border-light bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-text-secondary gap-3">
          <div className="flex items-center gap-3">
            <p className="font-medium opacity-60">© 2024 DevPortal</p>
            <div className="h-2 w-[1px] bg-slate-200"></div>
            <div className="flex items-center gap-1 text-emerald-600 font-bold uppercase tracking-widest">
              <span className="size-1 rounded-full bg-emerald-500 animate-pulse"></span>
              Operational
            </div>
          </div>
          <div className="flex gap-4 font-bold uppercase tracking-widest opacity-80">
            <button onClick={() => setCurrentPage('privacy')} className="hover:text-primary transition-colors">Privacy</button>
            <button onClick={() => setCurrentPage('terms')} className="hover:text-primary transition-colors">Terms</button>
            <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">API Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
