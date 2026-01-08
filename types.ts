
export type ToolCategory = 'Development' | 'Design' | 'Networking' | 'Security' | 'Life' | 'Social' | 'Writing' | 'Media';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  color: string;
  hot?: boolean;
}

// Added missing MockField interface to fix import error in JsonMockGenerator
export interface MockField {
  id: string;
  name: string;
  type: string;
  options: string;
}

export type Page = 
  | 'home' | 'privacy' | 'terms'
  | 'json-mock' | 'url-utils' | 'json-formatter' | 'password-gen' | 'csv-to-json' | 'image-resizer' 
  | 'text-to-speech' | 'mermaid-editor' | 'regex-tester' | 'qr-generator' | 'base64-tool' 
  | 'case-converter' | 'mock-api' | 'markdown-editor' | 'jwt-debugger' | 'crontab-gen' 
  | 'svg-optimizer' | 'favicon-gen' | 'word-counter' | 'unit-converter' | 'ping-test' 
  | 'dns-lookup' | 'ip-intelligence' | 'subnet-calc' | 'gradient-gen' | 'palette-gen' | 'b2b-tokens'
  | 'diff-checker' | 'unix-timestamp' | 'json-to-ts' | 'sql-formatter' | 'wcag-contrast' 
  | 'aspect-ratio' | 'box-shadow' | 'hasher' | 'markdown-table' | 'lorem-ipsum'
  | 'english-name' | 'social-bio' | 'smart-translate' | 'decision-hub' | 'travel-list' | 'emoji-search';
