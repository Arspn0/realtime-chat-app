import { useThemeStore } from '../store/themeStore';
import { THEMES } from '../config/theme';

export const useAppTheme = () => {
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  
  // Mengembalikan warna tema aktif dan fungsi ganti tema
  return {
    colors: THEMES[mode],
    mode,
    setMode,
    isDark: mode !== 'minimalist', // Anggap selain minimalist agak gelap/berat
  };
};