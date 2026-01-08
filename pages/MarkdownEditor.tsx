
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface MarkdownEditorProps {
  onBack: () => void;
  setActions: (actions: React.ReactNode) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ setActions }) => {
  const [content, setContent] = useState('# ToolPortal\n\nWelcome to the **Ultimate Portal**. \n\n```mermaid\ngraph LR\nA[Input] --> B(Process) --> C[Output]\n```');
  const [loading, setLoading] = useState(false);

  const aiImprove = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Improve and polish the following markdown content while keeping its core meaning and structure: \n\n${content}`,
      });
      setContent(response.text || content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActions(
      <button 
        onClick={aiImprove}
        disabled={loading}
        className="bg-primary text-white px-5 py-2.5 rounded-xl text-[10px] font-black flex items-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 uppercase tracking-widest"
      >
        <span className="material-symbols-outlined text-[18px]">magic_button</span>
        {loading ? 'Refining...' : 'AI Refine'}
      </button>
    );
  }, [content, loading]);

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
      <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Markdown Editor</h3>
          <span className="text-[10px] font-bold text-slate-300">GFM SUPPORTED</span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-8 font-mono text-sm leading-relaxed resize-none outline-none bg-transparent custom-scrollbar"
          placeholder="Write your markdown here..."
          spellCheck={false}
        />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Rendered Preview</h3>
          <button onClick={() => setContent('')} className="text-xs font-black text-red-500 uppercase tracking-tighter">Clear</button>
        </div>
        <div className="flex-1 p-10 overflow-y-auto prose prose-indigo max-w-none custom-scrollbar bg-slate-50/30">
          <div className="font-display">
            <div className="space-y-4">
              {content.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('#') ? 'text-2xl font-black mt-4' : 'text-base font-light'}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
