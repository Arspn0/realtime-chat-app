import { create } from 'zustand';
import { ThemeKey, ThemeMode } from '../config/theme';

interface ThemeState {
  mode: ThemeKey;        // 'minimalist' | 'neo-brutalism' | 'retro'
  colorScheme: ThemeMode; // 'light' | 'dark'
  setMode: (mode: ThemeKey) => void;
  setColorScheme: (scheme: ThemeMode) => void;
  toggleColorScheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'minimalist', // Default theme
  colorScheme: 'light', // Default mode
  
  setMode: (mode) => set({ mode }),
  
  setColorScheme: (scheme) => set({ colorScheme: scheme }),
  
  toggleColorScheme: () => set((state) => ({ 
    colorScheme: state.colorScheme === 'light' ? 'dark' : 'light' 
  })),
}));