import { useThemeStore } from '../store/themeStore';
import { getTheme, ThemeKey } from '../config/theme';

export const useAppTheme = () => {
  const mode = useThemeStore((state) => state.mode);
  const colorScheme = useThemeStore((state) => state.colorScheme);
  const setMode = useThemeStore((state) => state.setMode);
  const toggleColorScheme = useThemeStore((state) => state.toggleColorScheme);

  // Ambil konfigurasi tema lengkap menggunakan helper function dari theme.ts baru
  const themeConfig = getTheme(mode as ThemeKey, colorScheme);

  return {
    // Spread semua properti tema agar bisa diakses langsung
    // (colors, fonts, spacing, borderRadius, dll)
    ...themeConfig,
    
    // Properti state
    mode,
    colorScheme,
    setMode,
    toggleColorScheme,
    
    // Helper boolean
    isDark: colorScheme === 'dark',
    isNeo: mode === 'neo-brutalism',
    isRetro: mode === 'retro',
    isMinimalist: mode === 'minimalist',
  };
};