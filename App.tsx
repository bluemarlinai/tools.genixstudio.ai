
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ToolHeader } from './components/ToolHeader';
import { AdUnit } from './components/AdUnit';
import { TOOLS } from './data/tools';
import { Page } from './types';

// Page components
import { JsonMockGenerator } from './pages/JsonMockGenerator';
import { UrlEncoder } from './pages/UrlEncoder';
import { JsonFormatter } from './pages/JsonFormatter';
import { SecureGen } from './pages/SecureGen';
import { CsvToJson } from './pages/CsvToJson';
import { ImageResizer } from './pages/ImageResizer';
import { TextToSpeech } from './pages/TextToSpeech';
import { MermaidEditor } from './pages/MermaidEditor';
import { RegExTester } from './pages/RegExTester';
import { QrGenerator } from './pages/QrGenerator';
import { Base64Tool } from './pages/Base64Tool';
import { CaseConverter } from './pages/CaseConverter';
import { MockApiBuilder } from './pages/MockApiBuilder';
import { MarkdownEditor } from './pages/MarkdownEditor';
import { JwtDebugger } from './pages/JwtDebugger';
import { WordCounter } from './pages/WordCounter';
import { CrontabGenerator } from './pages/CrontabGenerator';
import { SvgOptimizer } from './pages/SvgOptimizer';
import { FaviconGenerator } from './pages/FaviconGenerator';
import { UnitConverter } from './pages/UnitConverter';
import { PingTest } from './pages/PingTest';
import { DnsLookup } from './pages/DnsLookup';
import { IpIntelligence } from './pages/IpIntelligence';
import { SubnetCalculator } from './pages/SubnetCalculator';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [headerActions, setHeaderActions] = useState<React.ReactNode>(null);

  const onBack = () => {
    setHeaderActions(null);
    setCurrentPage('home');
  };

  const renderToolBody = () => {
    switch (currentPage) {
      case 'json-mock': return <JsonMockGenerator onBack={onBack} />;
      case 'url-utils': return <UrlEncoder onBack={onBack} />;
      case 'json-formatter': return <JsonFormatter onBack={onBack} setActions={setHeaderActions} />;
      case 'password-gen': return <SecureGen onBack={onBack} setActions={setHeaderActions} />;
      case 'csv-to-json': return <CsvToJson onBack={onBack} />;
      case 'image-resizer': return <ImageResizer onBack={onBack} />;
      case 'text-to-speech': return <TextToSpeech onBack={onBack} />;
      case 'mermaid-editor': return <MermaidEditor onBack={onBack} />;
      case 'regex-tester': return <RegExTester onBack={onBack} />;
      case 'qr-generator': return <QrGenerator onBack={onBack} />;
      case 'base64-tool': return <Base64Tool onBack={onBack} />;
      case 'case-converter': return <CaseConverter onBack={onBack} />;
      case 'mock-api': return <MockApiBuilder onBack={onBack} setActions={setHeaderActions} />;
      case 'markdown-editor': return <MarkdownEditor onBack={onBack} setActions={setHeaderActions} />;
      case 'jwt-debugger': return <JwtDebugger onBack={onBack} />;
      case 'word-counter': return <WordCounter onBack={onBack} />;
      case 'crontab-gen': return <CrontabGenerator onBack={onBack} setActions={setHeaderActions} />;
      case 'svg-optimizer': return <SvgOptimizer onBack={onBack} />;
      case 'favicon-gen': return <FaviconGenerator onBack={onBack} />;
      case 'unit-converter': return <UnitConverter onBack={onBack} />;
      case 'ping-test': return <PingTest onBack={onBack} setActions={setHeaderActions} />;
      case 'dns-lookup': return <DnsLookup onBack={onBack} setActions={setHeaderActions} />;
      case 'ip-intelligence': return <IpIntelligence setActions={setHeaderActions} />;
      case 'subnet-calc': return <SubnetCalculator />;
      default: return null;
    }
  };

  const toolMetadata = TOOLS.find(t => t.id === currentPage);

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      <div className="animate-in fade-in duration-500">
        {currentPage === 'home' ? (
          <Home onSelect={setCurrentPage} />
        ) : (
          toolMetadata && (
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1 min-w-0">
                <ToolHeader 
                  title={toolMetadata.name}
                  category={toolMetadata.category}
                  description={toolMetadata.description}
                  icon={toolMetadata.icon}
                  onBack={onBack}
                  actions={headerActions}
                />
                {renderToolBody()}
              </div>
              
              {/* Subtle Sidebar Ad for Tool Pages */}
              <aside className="hidden xl:block w-72 shrink-0">
                <div className="sticky top-24">
                  <div className="bg-slate-50/50 p-6 rounded-3xl border border-dashed border-border-light text-center space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400">Toolkit Buddy</p>
                    <p className="text-xs font-light text-text-secondary">Want more advanced AI tools? Check out our Enterprise Edition.</p>
                  </div>
                  <AdUnit type="sidebar" />
                </div>
              </aside>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default App;
