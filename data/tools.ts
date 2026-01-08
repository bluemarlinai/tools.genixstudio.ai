
import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // Life & Social (Western Pop Favorites)
  { id: 'ui-roaster', name: 'UI Roaster', description: 'Let AI brutally (but hilariously) critique your designs or ideas.', category: 'Design', icon: 'local_fire_department', color: 'bg-orange-50 text-orange-600', hot: true },
  { id: 'date-planner', name: 'Date Night AI', description: 'Custom date night itineraries based on your city, budget, and vibe.', category: 'Life', icon: 'favorite', color: 'bg-pink-50 text-pink-600', hot: true },
  { id: 'idea-validator', name: 'Idea Validator', description: 'Pitch your startup idea and get a critical analysis of its potential.', category: 'Writing', icon: 'lightbulb', color: 'bg-amber-50 text-amber-600' },
  
  // Existing Life & Social
  { id: 'corporate-polish', name: 'Corporate Polish', description: 'Translate "too honest" thoughts into professional office speak.', category: 'Writing', icon: 'mark_email_read', color: 'bg-indigo-50 text-indigo-600' },
  { id: 'pet-name', name: 'Pet Name Gen', description: 'Find the perfect name for your furry friend.', category: 'Life', icon: 'pets', color: 'bg-orange-50 text-orange-600' },
  { id: 'english-name', name: 'English Name Lab', description: 'AI-powered English name generator based on your vibe.', category: 'Life', icon: 'face_6', color: 'bg-rose-50 text-rose-600' },

  // Design & Media
  { id: 'palette-gen', name: 'Color Palette', description: 'Generate brand-ready color schemes with ease.', category: 'Design', icon: 'palette', color: 'bg-blue-50 text-blue-600' },
  { id: 'qr-generator', name: 'QR Studio', description: 'Custom QR codes for URLs or text.', category: 'Media', icon: 'qr_code_2', color: 'bg-slate-50 text-slate-800' },
  
  // Development
  { id: 'json-formatter', name: 'JSON Beautifier', description: 'Format, validate and minify JSON data.', category: 'Development', icon: 'code', color: 'bg-blue-50 text-blue-700' },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Beautify messy SQL queries instantly.', category: 'Development', icon: 'database', color: 'bg-slate-50 text-slate-700' },
  { id: 'password-gen', name: 'SecureGen', description: 'Military-grade password generation.', category: 'Security', icon: 'security', color: 'bg-orange-50 text-orange-600' },
];
