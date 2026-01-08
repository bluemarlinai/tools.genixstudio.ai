
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface JsonFormatterProps {
  onBack: () => void;
  setActions: (actions: React.ReactNode) => void;
}

export const JsonFormatter: React.FC<JsonFormatterProps> = ({ setActions }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const formatJson = () => {
    try {
      setError(null);
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e: any) {
      setError(e.message);
    }
  };

  const aiFixJson = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `I have a broken or unformatted JSON string: "${input}". Please fix any syntax errors and return ONLY the valid, beautified JSON.`,
        config: { responseMimeType: "application/json" }
      });
      setOutput(JSON.stringify(JSON.parse(response.text || '{}'), null, 2));
    } catch (e) {
      setError("AI was unable to fix this JSON. Please check manually.");
    } finally {
      setLoading(false);
    }
  };

  // Inject actions into the parent header
  useEffect(() => {
    setActions(
      <>
        <button 
          onClick={aiFixJson} 
          disabled={loading}
          className="bg-indigo-50 text-indigo-600 border border-indigo-100 px-4 py-2 rounded-xl text-xs font-black hover:bg-indigo-100 transition-all flex items-center gap-2 disabled:opacity-50 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">magic_button</span> AI Fix
        </button>
      </>
    );
  }, [input, loading]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
      <div className="bg-white rounded-3xl border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-border-light bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Input JSON</h3>
          <button onClick={() => setInput('')} className="text-xs text-text-secondary hover:text-red-500 font-bold underline">CLEAR</button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-6 font-mono text-sm resize-none outline-none bg-transparent"
          placeholder='Paste your JSON here...'
          spellCheck={false}
        />
        <div className="p-6 border-t border-border-light bg-slate-50/30 flex gap-3">
          <button onClick={formatJson} className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-primary-hover transition-all active:scale-95 shadow-sm">Format</button>
          <button onClick={() => setOutput(JSON.stringify(JSON.parse(input)))} className="bg-white border border-border-light px-5 py-2.5 rounded-xl text-sm font-black hover:bg-slate-50 transition-all active:scale-95 shadow-sm">Minify</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border-light shadow-sm flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-border-light bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Result</h3>
          <button 
            onClick={() => navigator.clipboard.writeText(output)}
            className="text-xs text-primary font-black hover:underline uppercase tracking-tighter"
          >
            Copy
          </button>
        </div>
        <div className={`flex-1 overflow-auto p-6 font-mono text-sm leading-relaxed custom-scrollbar ${error ? 'bg-red-50/30' : 'bg-[#0d1117]'}`}>
          {error ? (
            <div className="text-red-500">
              <p className="font-bold mb-2 text-xs">Error Parsing JSON:</p>
              <code className="text-xs whitespace-pre-wrap">{error}</code>
            </div>
          ) : (
            <pre className="text-gray-300"><code>{output || '// Result will appear here...'}</code></pre>
          )}
        </div>
      </div>
    </div>
  );
};
