
import React, { useState, useRef } from 'react';

export const ImageResizer: React.FC<{ onBack: () => void }> = () => {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(event.target?.result as string);
          setWidth(img.width);
          setHeight(img.height);
          setAspectRatio(img.width / img.height);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const updateWidth = (w: number) => {
    setWidth(w);
    if (maintainAspect) setHeight(Math.round(w / aspectRatio));
  };

  const download = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      const link = document.createElement('a');
      link.download = 'resized.png';
      link.href = canvas.toDataURL();
      link.click();
    };
    img.src = image;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-border-light shadow-sm min-h-[500px] flex flex-col overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Preview</h3>
          {image && <button onClick={() => setImage(null)} className="text-xs text-red-500 font-bold">Remove</button>}
        </div>
        <div className="flex-1 p-10 flex items-center justify-center bg-slate-100/50 pattern-grid">
          {image ? (
            <img src={image} className="max-w-full max-h-[450px] rounded-2xl shadow-2xl border border-white" alt="Source" />
          ) : (
            <div onClick={() => fileInputRef.current?.click()} className="w-full max-w-lg h-72 border-2 border-dashed border-slate-300 rounded-[3rem] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-primary transition-all">
              <span className="material-symbols-outlined text-4xl text-slate-300">add_photo_alternate</span>
              <p className="font-bold text-text-secondary">Select Image</p>
              <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleFileChange} />
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-primary border-b pb-4">Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400">Width</label>
              <input type="number" value={width} onChange={(e) => updateWidth(parseInt(e.target.value) || 0)} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold" />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={maintainAspect} onChange={(e) => setMaintainAspect(e.target.checked)} className="rounded text-primary" />
              <span className="text-xs font-medium">Maintain Ratio</span>
            </label>
          </div>
          <button onClick={download} disabled={!image} className="w-full bg-primary text-white font-black py-4 rounded-[2rem] shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 transition-all">Download</button>
        </div>
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};
