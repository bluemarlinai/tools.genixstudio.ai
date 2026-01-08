
import React, { useState, useEffect } from 'react';

export const QrGenerator: React.FC<{ onBack: () => void }> = () => {
  const [text, setText] = useState('https://toolportal.io');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (text) setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`);
  }, [text]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-8">
        <textarea 
          value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-40 bg-slate-50 border-none rounded-3xl p-6 font-mono text-sm outline-none resize-none shadow-inner"
        />
        <button onClick={() => window.open(qrUrl)} className="w-full bg-primary text-white font-black py-4 rounded-2xl active:scale-95 transition-all">Download QR</button>
      </div>
      <div className="bg-white rounded-[2.5rem] border shadow-sm p-12 flex items-center justify-center pattern-grid">
         {qrUrl && <img src={qrUrl} className="size-64 shadow-2xl border-8 border-white rounded-2xl" alt="QR" />}
      </div>
    </div>
  );
};
