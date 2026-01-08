
export type ToolCategory = 'Development' | 'Media' | 'Security' | 'Productivity' | 'Networking' | 'Design';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  color: string;
  hot?: boolean;
}

export interface MockField {
  id: string;
  name: string;
  type: string;
  options: string;
}

export type Page = 
  | 'home' 
  | 'privacy'
  | 'terms'
  | 'json-mock' 
  | 'url-utils' 
  | 'json-formatter' 
  | 'password-gen' 
  | 'csv-to-json' 
  | 'image-resizer' 
  | 'text-to-speech' 
  | 'mermaid-editor'
  | 'regex-tester'
  | 'qr-generator'
  | 'base64-tool'
  | 'case-converter'
  | 'mock-api'
  | 'markdown-editor'
  | 'jwt-debugger'
  | 'crontab-gen'
  | 'svg-optimizer'
  | 'favicon-gen'
  | 'word-counter'
  | 'unit-converter'
  | 'ping-test'
  | 'dns-lookup'
  | 'ip-intelligence'
  | 'subnet-calc'
  | 'gradient-gen'
  | 'palette-gen'
  | 'b2b-tokens';
