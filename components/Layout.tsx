
import React from 'react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border-light px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setCurrentPage('home')}
          >
            <div className="size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined font-bold text-base">menu_book</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-text-main hidden sm:block">ToolPortal</h1>
          </div>

          <div className="flex-1 max-w-lg mx-auto hidden md:block">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[18px]">search</span>
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="w-full bg-background-light border-none rounded-full py-1.5 pl-9 pr-4 text-xs focus:ring-2 focus:ring-primary/20 transition-shadow"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden lg:flex items-center gap-4">
              <button onClick={() => setCurrentPage('home')} className={`text-xs font-medium ${currentPage === 'home' ? 'text-primary' : 'text-text-secondary hover:text-text-main'}`}>All Tools</button>
              <button className="text-xs font-medium text-text-secondary hover:text-text-main">Community</button>
              <button className="text-xs font-medium text-text-secondary hover:text-text-main">Docs</button>
            </nav>
            <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer">
              TP
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-4">
        {children}
      </main>

      <footer className="border-t border-border-light bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[11px] text-text-secondary gap-2">
          <p>© 2024 ToolPortal. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
