import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAuthStore } from './src/store/authStore';

export default function App() {
  const checkLogin = useAuthStore((state) => state.checkLogin);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    // Cek status login saat aplikasi dimulai
    checkLogin();
  }, []);

  // Tampilkan Loading Screen polos saat sedang mengecek SecureStore
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}