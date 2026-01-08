
import React, { useState } from 'react';

export const SvgOptimizer: React.FC<{ onBack: () => void }> = () => {
  const [svg, setSvg] = useState('');
  const [optimized, setOptimized] = useState('');

  const optimize = () => setOptimized(svg.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ').trim());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[550px]">
      <div className="bg-white rounded-[2rem] border shadow-sm flex flex-col overflow-hidden">
        <textarea value={svg} onChange={(e) => setSvg(e.target.value)} className="flex-1 p-6 font-mono text-sm outline-none" placeholder="SVG Code..." />
        <div className="p-4 bg-slate-50 border-t">
          <button onClick={optimize} className="w-full bg-orange-600 text-white font-black py-3 rounded-xl">Optimize</button>
        </div>
      </div>
      <div className="bg-[#0d1117] text-gray-400 p-8 font-mono text-xs rounded-[2rem] border overflow-auto">
        {optimized || '// Result...'}
      </div>
    </div>
  );
};
