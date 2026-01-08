
import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const VOICES = [
  { id: 'Kore', name: 'Kore (Cheerful)' },
  { id: 'Puck', name: 'Puck (Narrative)' },
  { id: 'Charon', name: 'Charon (Deep)' },
];

export const TextToSpeech: React.FC<{ onBack: () => void }> = () => {
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('Kore');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const generateSpeech = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: selectedVoice } } },
        },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) setAudioUrl(`data:audio/wav;base64,${base64Audio}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-border-light shadow-sm p-10 space-y-6">
        <textarea 
          value={text} onChange={(e) => setText(e.target.value)}
          className="w-full h-80 bg-slate-50 border-none rounded-3xl p-8 text-xl outline-none resize-none shadow-inner"
          placeholder="Enter text to speak..."
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
      <div className="lg:col-span-4">
        {audioUrl && (
          <div className="bg-white p-8 rounded-[2rem] border-2 border-primary/20 shadow-xl animate-in zoom-in">
             <h4 className="text-xs font-black text-primary uppercase mb-4">Output Ready</h4>
             <audio controls src={audioUrl} className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
};
