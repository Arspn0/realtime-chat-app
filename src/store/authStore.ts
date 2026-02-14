import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const USER_SESSION_KEY = 'user_session';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  checkLogin: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  
  login: async (userData) => {
    try {
      // Simpan data ke SecureStore (harus string)
      await SecureStore.setItemAsync(USER_SESSION_KEY, JSON.stringify(userData));
      set({ isAuthenticated: true, user: userData });
    } catch (error) {
      console.error('Gagal menyimpan sesi', error);
    }
  },

  logout: async () => {
    try {
      // Hapus data dari SecureStore
      await SecureStore.deleteItemAsync(USER_SESSION_KEY);
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error('Gagal hapus sesi', error);
    }
  },

  checkLogin: async () => {
    try {
      // Cek apakah ada data tersimpan
      const jsonValue = await SecureStore.getItemAsync(USER_SESSION_KEY);
      if (jsonValue) {
        const userData = JSON.parse(jsonValue);
        set({ isAuthenticated: true, user: userData, isLoading: false });
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    } catch (error) {
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },
}));