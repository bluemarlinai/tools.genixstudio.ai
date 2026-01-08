
import React, { useState } from 'react';

export const FaviconGenerator: React.FC<{ onBack: () => void }> = () => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      <div className="bg-white rounded-[2rem] border shadow-sm p-10 flex flex-col justify-center items-center gap-6">
        <label className="w-full h-64 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all">
          <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">upload_file</span>
          <span className="font-bold text-text-secondary">Upload Image</span>
          <input type="file" hidden accept="image/*" onChange={(e) => {
             const file = e.target.files?.[0];
             if(file) {
               const reader = new FileReader();
               reader.onload = (ev) => setImage(ev.target?.result as string);
               reader.readAsDataURL(file);
             }
          }} />
        </label>
        <button disabled={!image} className="w-full bg-primary text-white font-black py-4 rounded-2xl active:scale-95 transition-all disabled:opacity-50">Generate Package</button>
      </div>
      <div className="bg-slate-50/50 rounded-[2rem] border p-10 flex flex-wrap gap-10 justify-center items-center">
         {[16, 32, 64].map(s => <div key={s} className="size-16 bg-white border flex items-center justify-center rounded shadow-sm">{image && <img src={image} className="size-full object-contain" />}</div>)}
      </div>
    </div>
  );
};
