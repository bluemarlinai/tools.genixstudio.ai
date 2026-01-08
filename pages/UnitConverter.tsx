
import React, { useState } from 'react';

const UNITS = {
  Length: { m: 1, km: 1000, inch: 0.0254 },
  Weight: { kg: 1, lb: 0.4535 },
};

export const UnitConverter: React.FC<{ onBack: () => void }> = () => {
  const [val, setVal] = useState(1);
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('km');

  return (
    <div className="bg-white rounded-[2.5rem] border shadow-sm p-10 max-w-4xl mx-auto w-full space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <input type="number" value={val} onChange={(e) => setVal(parseFloat(e.target.value) || 0)} className="w-full text-4xl font-black py-6 bg-slate-50 border-none rounded-3xl text-center" />
        <div className="text-center text-4xl text-slate-300">→</div>
        <div className="w-full text-4xl font-black py-6 bg-primary/5 text-primary rounded-3xl text-center">{val * 0.001}</div>
      </div>
    </div>
  );
};
