import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const USER_SESSION_KEY = 'user_session';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  mood?: string;
  username?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  checkLogin: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  
  login: async (userData) => {
    try {
      // Simpan data ke SecureStore (harus string)
      const finalData = { ...userData, mood: '👋', status: 'Available', username: '@user' };
      await SecureStore.setItemAsync(USER_SESSION_KEY, JSON.stringify(finalData));
      set({ isAuthenticated: true, user: finalData });
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
      const jsonValue = await SecureStore.getItemAsync(USER_SESSION_KEY);
      if (jsonValue) {
        set({ isAuthenticated: true, user: JSON.parse(jsonValue), isLoading: false });
      } else {
        set({ isAuthenticated: false, user: null, isLoading: false });
      }
    } catch {
      set({ isAuthenticated: false, user: null, isLoading: false });
    }
  },

  updateProfile: async (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      set({ user: updatedUser });
      // Simpan perubahan ke storage agar permanen
      await SecureStore.setItemAsync(USER_SESSION_KEY, JSON.stringify(updatedUser));
    }
  },
}));