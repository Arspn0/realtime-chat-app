export type ThemeMode = 'minimalist' | 'retro' | 'neobrutalism';

export const THEMES = {
  minimalist: {
    background: '#FFFFFF',
    text: '#1A1A1A',
    primary: '#007AFF',
    secondary: '#F2F2F7',
    border: '#E5E5EA',
    card: '#FFFFFF',
    shadow: '0px 2px 4px rgba(0,0,0,0.05)',
  },
  retro: {
    background: '#FDF6E3', // Creamy
    text: '#5D4037', // Brownish
    primary: '#D35400', // Burnt Orange
    secondary: '#E0E0E0',
    border: '#8D6E63',
    card: '#FEF9E7',
    shadow: '2px 2px 0px #5D4037', // Hard shadow retro style
  },
  neobrutalism: {
    background: '#E0E7FF', // Soft Indigo bg
    text: '#000000',
    primary: '#FF6B6B', // Red/Pink
    secondary: '#4ECDC4', // Teal
    border: '#000000', // Bold black borders
    card: '#FFFFFF',
    shadow: '4px 4px 0px #000000', // Hard black shadow
  },
};