
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // Networking
  { id: 'ip-intelligence', name: 'IP Intelligence', description: 'Detect geolocation, ISP details, and perform AI security risk analysis on any IP.', category: 'Networking', icon: 'location_searching', color: 'bg-emerald-50 text-emerald-600', hot: true },
  { id: 'subnet-calc', name: 'Subnet Calculator', description: 'Visualize CIDR blocks, calculate usable IP ranges, and view binary masks.', category: 'Networking', icon: 'grid_view', color: 'bg-blue-50 text-blue-600' },
  { id: 'ping-test', name: 'Latency Checker', description: 'Measure web response times and analyze connectivity issues.', category: 'Networking', icon: 'network_ping', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'dns-lookup', name: 'DNS Analyzer', description: 'Fetch and explain DNS records using AI-powered insights.', category: 'Networking', icon: 'dns', color: 'bg-blue-50 text-blue-600' },

  // Development
  { id: 'json-mock', name: 'JSON Mock Generator', description: 'Design realistic data schemas and generate mock JSON.', category: 'Development', icon: 'database', color: 'bg-blue-50 text-blue-600' },
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Beautify, validate, and minify your JSON data.', category: 'Development', icon: 'code', color: 'bg-purple-50 text-purple-600' },
  { id: 'mock-api', name: 'Mock API Architect', description: 'Design and simulate online endpoints with custom JSON.', category: 'Development', icon: 'api', color: 'bg-indigo-50 text-indigo-600', hot: true },
  { id: 'markdown-editor', name: 'Markdown Pro', description: 'Real-time editor with Mermaid support and AI refinement.', category: 'Development', icon: 'edit_square', color: 'bg-slate-50 text-slate-800' },
  { id: 'jwt-debugger', name: 'JWT Debugger', description: 'Securely decode and analyze JSON Web Tokens locally.', category: 'Development', icon: 'key_visualizer', color: 'bg-rose-50 text-rose-600' },
  { id: 'regex-tester', name: 'RegEx Tester', description: 'Test and debug regular expressions with real-time feedback.', category: 'Development', icon: 'search_check', color: 'bg-amber-50 text-amber-600' },
  { id: 'crontab-gen', name: 'Crontab Generator', description: 'Visualize and build cron schedules with AI explanations.', category: 'Development', icon: 'schedule', color: 'bg-cyan-50 text-cyan-600' },
  
  // Media
  { id: 'qr-generator', name: 'QR Code Studio', description: 'Generate customizable QR codes with colors and logos.', category: 'Media', icon: 'qr_code_2', color: 'bg-violet-50 text-violet-600', hot: true },
  { id: 'svg-optimizer', name: 'SVG Optimizer', description: 'Compress and clean SVG code for faster web performance.', category: 'Media', icon: 'compress', color: 'bg-orange-50 text-orange-600' },
  { id: 'image-resizer', name: 'Image Studio', description: 'Resize, scale and optimize images for the web.', category: 'Media', icon: 'aspect_ratio', color: 'bg-rose-50 text-rose-600' },
  { id: 'favicon-gen', name: 'Favicon Maker', description: 'Create multi-platform web icons from any image.', category: 'Media', icon: 'deployed_code', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'text-to-speech', name: 'AI Voice Narrator', description: 'Transform text into high-quality human speech.', category: 'Media', icon: 'auto_stories', color: 'bg-pink-50 text-pink-600' },

  // Productivity
  { id: 'word-counter', name: 'Word Counter', description: 'Deep text analysis, reading time, and keyword density.', category: 'Productivity', icon: 'segment', color: 'bg-blue-50 text-blue-600' },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Universal converter for length, weight, and data.', category: 'Productivity', icon: 'sync_alt', color: 'bg-green-50 text-green-600' },
  { id: 'case-converter', name: 'Case Converter', description: 'Switch between camelCase, snake_case, and others.', category: 'Productivity', icon: 'text_fields', color: 'bg-sky-50 text-sky-600' },

  // Security
  { id: 'password-gen', name: 'SecureGen', description: 'Generate cryptographically secure passwords.', category: 'Security', icon: 'lock', color: 'bg-orange-50 text-orange-600' },
];
