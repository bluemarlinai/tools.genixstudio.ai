
import React, { useState } from 'react';

const VOICES = [
  { id: 'Kore', name: 'Kore (Cheerful)' },
  { id: 'Puck', name: 'Puck (Narrative)' },
  { id: 'Charon', name: 'Charon (Deep)' },
];

export const TextToSpeech: React.FC<{ onBack: () => void }> = () => {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const [loading, setLoading] = useState(false);

  const generateSpeech = () => {
    setLoading(true);
    // AI TTS generation removed to prevent unauthorized API usage
    setTimeout(() => {
      setLoading(false);
      alert("TTS generation is currently disabled to optimize system resources.");
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-6">
        <textarea 
          value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-80 bg-slate-50 border-none rounded-3xl p-8 text-xl outline-none resize-none shadow-inner"
          placeholder="Enter text (Feature offline)..."
        />
        <div className="flex flex-wrap gap-3">
          {VOICES.map(v => (
            <button key={v.id} onClick={() => setSelectedVoice(v.id)} className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all ${selectedVoice === v.id ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200'}`}>
              {v.name}
            </button>
          ))}
          <button 
            onClick={generateSpeech} disabled={loading}
            className="ml-auto bg-pink-600 text-white font-black px-8 py-3 rounded-2xl active:scale-95 disabled:opacity-50 shadow-lg shadow-pink-100"
          >
            {loading ? 'Synthesizing...' : 'Speak'}
          </button>
        </div>
      </div>
    </div>
  );
};
