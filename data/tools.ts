
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // Life & Social (New High Priority)
  { id: 'english-name', name: 'English Name Gen', description: 'AI-powered English name generator based on your personality and preferences.', category: 'Life', icon: 'face_6', color: 'bg-rose-50 text-rose-600', hot: true },
  { id: 'smart-translate', name: 'Context Translator', description: 'Smart translation that adapts to formal, casual, or technical contexts.', category: 'Life', icon: 'translate', color: 'bg-blue-50 text-blue-600', hot: true },
  { id: 'travel-list', name: 'Travel Checklist', description: 'AI-generated packing lists based on your destination and weather.', category: 'Life', icon: 'luggage', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'decision-hub', name: 'Decision Maker', description: 'Can\'t decide? Let AI help you make a choice or spin the virtual wheel.', category: 'Life', icon: 'casino', color: 'bg-amber-50 text-amber-600' },

  // Social & Writing
  { id: 'social-bio', name: 'Bio Architect', description: 'Generate engaging bios for Instagram, LinkedIn, or Twitter in seconds.', category: 'Social', icon: 'auto_awesome', color: 'bg-purple-50 text-purple-600', hot: true },
  { id: 'emoji-search', name: 'Emoji Kitchen', description: 'Find the perfect emoji or search for creative emoji combinations.', category: 'Social', icon: 'mood', color: 'bg-yellow-50 text-yellow-600' },
  { id: 'word-counter', name: 'Text Analytics', description: 'Deep analysis of text, including readability and reading time.', category: 'Writing', icon: 'bar_chart', color: 'bg-slate-50 text-slate-600' },
  { id: 'lorem-ipsum', name: 'Placeholder Gen', description: 'Professional filler text for mockups and document design.', category: 'Writing', icon: 'format_quote', color: 'bg-slate-50 text-slate-500' },

  // Design & Media
  { id: 'gradient-gen', name: 'Gradient Lab', description: 'Create beautiful CSS gradients with precision control.', category: 'Design', icon: 'gradient', color: 'bg-indigo-50 text-indigo-600' },
  { id: 'qr-generator', name: 'QR Code Studio', description: 'Generate custom QR codes with logos and style.', category: 'Media', icon: 'qr_code_2', color: 'bg-violet-50 text-violet-600' },
  { id: 'image-resizer', name: 'Image Studio', description: 'Resize and optimize images for various platforms.', category: 'Media', icon: 'photo_size_select_large', color: 'bg-rose-50 text-rose-600' },

  // Development & Technical
  { id: 'json-formatter', name: 'JSON Beautifier', description: 'Format and validate JSON with syntax highlighting.', category: 'Development', icon: 'code', color: 'bg-indigo-50 text-indigo-600' },
  { id: 'diff-checker', name: 'Diff Viewer', description: 'Compare two text blocks to find differences instantly.', category: 'Development', icon: 'compare', color: 'bg-slate-50 text-slate-700' },
  { id: 'ip-intelligence', name: 'IP Intelligence', description: 'Check IP details, location, and network safety.', category: 'Networking', icon: 'public', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'password-gen', name: 'SecureGen', description: 'Generate complex, ultra-secure passwords.', category: 'Security', icon: 'security', color: 'bg-orange-50 text-orange-600' },
];
