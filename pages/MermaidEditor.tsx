
import React, { useState, useEffect } from 'react';

const loadMermaid = () => {
  return new Promise<any>((resolve) => {
    if ((window as any).mermaid) { resolve((window as any).mermaid); return; }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11.4.0/dist/mermaid.min.js';
    script.onload = () => {
      (window as any).mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });
      resolve((window as any).mermaid);
    };
    document.head.appendChild(script);
  });
};

export const MermaidEditor: React.FC<{ onBack: () => void }> = () => {
  const [code, setCode] = useState(`graph TD\nA[Start] --> B{Process}\nB --> C[End]`);
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const mermaid = await loadMermaid();
        const { svg } = await mermaid.render(`id-${Date.now()}`, code);
        setSvgContent(svg);
      } catch (e) {}
    }, 500);
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
      <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b bg-slate-50/50">
          <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Source Code</h3>
        </div>
        <textarea
          value={code} onChange={(e) => setCode(e.target.value)}
          className="flex-1 p-8 font-mono text-sm leading-relaxed resize-none outline-none"
          spellCheck={false}
        />
      </div>
      <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Preview</h3>
          <button onClick={() => {}} className="text-xs text-primary font-bold">SVG</button>
        </div>
        <div className="flex-1 overflow-auto bg-slate-50/50 flex items-center justify-center p-12 pattern-grid" dangerouslySetInnerHTML={{ __html: svgContent }} />
      </div>
    </div>
  );
};
