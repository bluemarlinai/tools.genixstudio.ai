
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
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
import { GradientGenerator } from './pages/GradientGenerator';
import { PaletteGenerator } from './pages/PaletteGenerator';
import { B2BColorTokens } from './pages/B2BColorTokens';
import { DiffChecker } from './pages/DiffChecker';
import { UnixTimestamp } from './pages/UnixTimestamp';
import { JsonToTs } from './pages/JsonToTs';
import { SqlFormatter } from './pages/SqlFormatter';
import { WcagContrast } from './pages/WcagContrast';
import { AspectRatioCalc } from './pages/AspectRatioCalc';
import { ShadowStudio } from './pages/ShadowStudio';
import { HasherTool } from './pages/HasherTool';
import { MarkdownTableMaker } from './pages/MarkdownTableMaker';
import { LoremIpsumGen } from './pages/LoremIpsumGen';
import { EnglishNameGen } from './pages/EnglishNameGen';
import { SocialBioGen } from './pages/SocialBioGen';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [headerActions, setHeaderActions] = useState<React.ReactNode>(null);

  const onBack = () => {
    setHeaderActions(null);
    setCurrentPage('home');
  };

  const renderToolBody = () => {
    switch (currentPage) {
      case 'english-name': return <EnglishNameGen />;
      case 'social-bio': return <SocialBioGen />;
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
      case 'gradient-gen': return <GradientGenerator onBack={onBack} setActions={setHeaderActions} />;
      case 'palette-gen': return <PaletteGenerator onBack={onBack} setActions={setHeaderActions} />;
      case 'b2b-tokens': return <B2BColorTokens setActions={setHeaderActions} />;
      case 'diff-checker': return <DiffChecker onBack={onBack} setActions={setHeaderActions} />;
      case 'unix-timestamp': return <UnixTimestamp onBack={onBack} setActions={setHeaderActions} />;
      case 'json-to-ts': return <JsonToTs onBack={onBack} setActions={setHeaderActions} />;
      case 'sql-formatter': return <SqlFormatter onBack={onBack} setActions={setHeaderActions} />;
      case 'wcag-contrast': return <WcagContrast setActions={setHeaderActions} />;
      case 'aspect-ratio': return <AspectRatioCalc />;
      case 'box-shadow': return <ShadowStudio setActions={setHeaderActions} />;
      case 'hasher': return <HasherTool onBack={onBack} setActions={setHeaderActions} />;
      case 'markdown-table': return <MarkdownTableMaker onBack={onBack} setActions={setHeaderActions} />;
      case 'lorem-ipsum': return <LoremIpsumGen onBack={onBack} setActions={setHeaderActions} />;
      default: return null;
    }
  };

  const toolMetadata = TOOLS.find(t => t.id === currentPage);

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    >
      <div className="animate-in fade-in duration-500">
        {currentPage === 'home' ? (
          <Home onSelect={setCurrentPage} searchQuery={searchQuery} />
        ) : currentPage === 'privacy' ? (
          <Privacy />
        ) : currentPage === 'terms' ? (
          <Terms />
        ) : (
          toolMetadata && (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1 min-w-0">
                <ToolHeader 
                  title={toolMetadata.name}
                  category={toolMetadata.category}
                  description={toolMetadata.description}
                  icon={toolMetadata.icon}
                  onBack={onBack}
                  actions={headerActions}
                />
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {renderToolBody()}
                </div>
              </div>
              
              <aside className="hidden xl:block w-72 shrink-0">
                <div className="sticky top-24 space-y-4">
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 text-center space-y-1.5">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">Universal Access</p>
                    <p className="text-[11px] font-medium text-text-secondary leading-tight">Fast tools for everyday life.</p>
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
