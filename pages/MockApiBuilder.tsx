
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ToolHeader } from '../components/ToolHeader';

interface ApiRoute {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  response: string;
  description: string;
}

// Fix: Add setActions to the props interface to match App.tsx usage.
interface MockApiBuilderProps {
  onBack: () => void;
  setActions: (actions: React.ReactNode) => void;
}

export const MockApiBuilder: React.FC<MockApiBuilderProps> = ({ onBack, setActions }) => {
  const [routes, setRoutes] = useState<ApiRoute[]>([
    { id: '1', path: '/v1/users', method: 'GET', response: '[\n  { "id": 1, "name": "John Doe" }\n]', description: 'List all users' }
  ]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('1');
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState<'fetch' | 'express'>('fetch');

  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  const addRoute = () => {
    const newId = Math.random().toString(36).substring(7);
    const newRoute: ApiRoute = {
      id: newId,
      path: '/v1/new-endpoint',
      method: 'GET',
      response: '{\n  "status": "success"\n}',
      description: 'Newly created route'
    };
    setRoutes([...routes, newRoute]);
    setSelectedRouteId(newId);
  };

  const updateRoute = (key: keyof ApiRoute, value: string) => {
    setRoutes(routes.map(r => r.id === selectedRouteId ? { ...r, [key]: value } : r));
  };

  const deleteRoute = (id: string) => {
    if (routes.length === 1) return;
    const newRoutes = routes.filter(r => r.id !== id);
    setRoutes(newRoutes);
    setSelectedRouteId(newRoutes[0].id);
  };

  const aiPopulate = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a realistic JSON response for a ${selectedRoute.method} request to the path "${selectedRoute.path}". The purpose is: ${selectedRoute.description}. Return ONLY the raw JSON.`,
        config: { responseMimeType: "application/json" }
      });
      updateRoute('response', JSON.stringify(JSON.parse(response.text || '{}'), null, 2));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const generateExpressCode = () => {
    const code = routes.map(r => `app.${r.method.toLowerCase()}('${r.path}', (req, res) => {\n  res.json(${r.response});\n});`).join('\n\n');
    return `const express = require('express');\nconst app = express();\n\n${code}\n\napp.listen(3000, () => console.log('Mock server running on port 3000'));`;
  };

  const generateFetchCode = () => {
    return `// Call your simulated endpoint\nfetch('https://api.toolportal.io${selectedRoute.path}', {\n  method: '${selectedRoute.method}',\n  headers: { 'Content-Type': 'application/json' }\n})\n.then(res => res.json())\n.then(data => console.log(data));`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[700px]">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
        <ToolHeader 
          title="Mock API Architect" 
          category="Development" 
          description="Design, simulate, and generate professional mock backend services for your frontend prototypes."
          onBack={onBack}
          icon="api"
        />
        <button 
          onClick={addRoute}
          className="bg-primary text-white font-black px-6 py-3.5 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2 active:scale-95 transition-all mt-2"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span> New Route
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        <aside className="lg:col-span-3 bg-white rounded-[2rem] border border-border-light shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-border-light bg-slate-50/50">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">API Endpoints</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-2">
            {routes.map(r => (
              <div 
                key={r.id}
                onClick={() => setSelectedRouteId(r.id)}
                className={`group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${selectedRouteId === r.id ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-transparent hover:bg-slate-50'}`}
              >
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className={`text-[9px] font-black uppercase ${r.method === 'GET' ? 'text-green-600' : 'text-blue-600'}`}>{r.method}</span>
                  <span className="text-xs font-bold text-text-main truncate font-mono">{r.path}</span>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteRoute(r.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:text-red-500 transition-all rounded-lg hover:bg-white"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        </aside>

        <div className="lg:col-span-9 grid grid-cols-1 xl:grid-cols-12 gap-8 min-h-0">
          <div className="xl:col-span-7 flex flex-col gap-8 min-h-0">
            <div className="bg-white rounded-[2rem] border border-border-light shadow-sm p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Method</label>
                  <select 
                    value={selectedRoute.method}
                    onChange={(e) => updateRoute('method', e.target.value as any)}
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 font-black text-sm outline-none cursor-pointer focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Path</label>
                  <input 
                    type="text"
                    value={selectedRoute.path}
                    onChange={(e) => updateRoute('path', e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="/api/v1/users"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary ml-1">Goal / Description</label>
                <input 
                  type="text"
                  value={selectedRoute.description}
                  onChange={(e) => updateRoute('description', e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="e.g. Return list of employees with unique IDs"
                />
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-border-light shadow-sm flex flex-col overflow-hidden flex-1 min-h-0">
              <div className="px-6 py-4 border-b border-border-light bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Mock Data (JSON)</h3>
                <button 
                  onClick={aiPopulate}
                  disabled={loading}
                  className="text-[10px] bg-indigo-600 text-white px-4 py-1.5 rounded-full font-black flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
                >
                  <span className="material-symbols-outlined text-[14px]">magic_button</span> {loading ? 'Synthesizing...' : 'AI Generate Body'}
                </button>
              </div>
              <textarea
                value={selectedRoute.response}
                onChange={(e) => updateRoute('response', e.target.value)}
                className="flex-1 p-8 font-mono text-sm leading-relaxed resize-none outline-none bg-transparent custom-scrollbar"
                placeholder='{ "data": [] }'
                spellCheck={false}
              />
            </div>
          </div>

          <div className="xl:col-span-5 flex flex-col gap-8 min-h-0">
            <div className="bg-white rounded-[2rem] border border-border-light shadow-sm p-8 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">cloud_done</span> Simulation Hub
              </h3>
              <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-3">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Public Endpoint URL</p>
                 <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-indigo-100 shadow-sm">
                    <span className="text-xs font-mono text-indigo-600 truncate flex-1">https://api.toolportal.io{selectedRoute.path}</span>
                    <button onClick={() => navigator.clipboard.writeText(`https://api.toolportal.io{selectedRoute.path}`)} className="text-indigo-400 hover:text-indigo-600 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                 </div>
              </div>
              <div className="flex items-center gap-2 px-2">
                <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Sandbox Online</span>
              </div>
            </div>

            <div className="bg-[#0d1117] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden flex-1 min-h-0">
              <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-black/20">
                <div className="flex bg-gray-800/50 p-1 rounded-xl border border-gray-700/50">
                  <button 
                    onClick={() => setShowCode('fetch')}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${showCode === 'fetch' ? 'bg-white text-gray-900 shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    Client
                  </button>
                  <button 
                    onClick={() => setShowCode('express')}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${showCode === 'express' ? 'bg-white text-gray-900 shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    Server
                  </button>
                </div>
                <button 
                   onClick={() => navigator.clipboard.writeText(showCode === 'fetch' ? generateFetchCode() : generateExpressCode())}
                   className="text-[10px] text-gray-400 hover:text-white font-black underline"
                >
                  Copy Snippet
                </button>
              </div>
              <div className="flex-1 overflow-auto p-8 font-mono text-xs leading-relaxed custom-scrollbar text-gray-400">
                <pre><code>{showCode === 'fetch' ? generateFetchCode() : generateExpressCode()}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
