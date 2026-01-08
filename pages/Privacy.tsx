
import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in">
      <div className="space-y-6">
        <div className="border-b border-border-light pb-4">
          <h1 className="text-3xl font-black tracking-tight text-text-main">Privacy Policy</h1>
          <p className="text-text-secondary text-sm mt-1 uppercase tracking-widest font-bold">Last Updated: May 2024</p>
        </div>
        
        <div className="prose prose-sm max-w-none text-text-secondary space-y-4">
          <section>
            <h2 className="text-lg font-black text-text-main uppercase tracking-tight">1. Data Collection</h2>
            <p className="leading-relaxed">ToolPortal is designed as a client-side utility suite. We do not store your personal data on our servers. Most processing happens directly in your browser using local storage and session state.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-text-main uppercase tracking-tight">2. AI Features & Third Parties</h2>
            <p className="leading-relaxed">When using our AI-enhanced tools (like AI Fix or AI Refine), your input text is securely transmitted to the Google Gemini API for processing. This data is not stored by ToolPortal. Please refer to Google's privacy policy for details on how they handle API data.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-text-main uppercase tracking-tight">3. Local Storage</h2>
            <p className="leading-relaxed">We use browser Local Storage to save your preferences, recent queries, and mock configurations locally on your device for your convenience.</p>
          </section>

          <section>
            <h2 className="text-lg font-black text-text-main uppercase tracking-tight">4. Cookies</h2>
            <p className="leading-relaxed">We do not use tracking cookies. Third-party providers like Google AdSense may use cookies to serve personalized advertisements based on your previous visits to this or other websites.</p>
          </section>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-[11px] font-medium text-primary leading-tight italic">
              Questions regarding privacy? Contact our support via the community Discord channel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
