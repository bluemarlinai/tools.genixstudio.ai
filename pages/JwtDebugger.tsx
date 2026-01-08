
import React, { useState, useEffect } from 'react';

export const JwtDebugger: React.FC<{ onBack: () => void }> = () => {
  const [token, setToken] = useState('');
  const [payload, setPayload] = useState('');

  useEffect(() => {
    try {
      const parts = token.split('.');
      if (parts[1]) setPayload(JSON.stringify(JSON.parse(atob(parts[1])), null, 2));
    } catch (e) { setPayload('Invalid'); }
  }, [token]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
      <div className="lg:col-span-5 bg-white rounded-[2.5rem] border shadow-sm flex flex-col overflow-hidden">
        <textarea value={token} onChange={(e) => setToken(e.target.value)} className="flex-1 p-8 font-mono text-sm outline-none break-all" placeholder="JWT..." />
      </div>
      <div className="lg:col-span-7 bg-white rounded-[2rem] border shadow-sm flex flex-col overflow-hidden">
        <pre className="flex-1 p-8 font-mono text-xs overflow-auto bg-indigo-50/30 text-indigo-700"><code>{payload}</code></pre>
      </div>
    </div>
  );
};
