import { create } from 'zustand';
import { ThemeMode } from '../config/theme';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'minimalist', // Default theme
  setMode: (mode) => set({ mode }),
}));