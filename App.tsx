import React, { useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Import varian font spesifik yang dibutuhkan
import { 
  DMSans_400Regular, 
  DMSans_500Medium, 
  DMSans_700Bold, 
  DMSans_400Regular_Italic 
} from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular, DMSerifDisplay_400Regular_Italic } from '@expo-google-fonts/dm-serif-display';
import { SpaceMono_400Regular, SpaceMono_700Bold } from '@expo-google-fonts/space-mono';
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { VT323_400Regular } from '@expo-google-fonts/vt323';
import { CourierPrime_400Regular, CourierPrime_700Bold } from '@expo-google-fonts/courier-prime';

import { AppNavigator } from './src/navigation/AppNavigator';
import { useAuthStore } from './src/store/authStore';
import './global.css';

// Mencegah splash screen hilang otomatis sampai font siap
SplashScreen.preventAutoHideAsync();

export default function App() {
  const checkLogin = useAuthStore((state) => state.checkLogin);
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  // 1. Load Fonts
  const [fontsLoaded] = useFonts({
    // Minimalist
    'DMSans-Regular': DMSans_400Regular,
    'DMSans-Medium': DMSans_500Medium,
    'DMSans-Bold': DMSans_700Bold,
    'DMSans-Italic': DMSans_400Regular_Italic,
    'DMSerifDisplay-Regular': DMSerifDisplay_400Regular,
    'DMSerifDisplay-Italic': DMSerifDisplay_400Regular_Italic,

    // Neo-Brutalism
    'SpaceMono-Regular': SpaceMono_400Regular,
    'SpaceMono-Bold': SpaceMono_700Bold,
    'BebasNeue-Regular': BebasNeue_400Regular,

    // Retro
    'VT323-Regular': VT323_400Regular,
    'CourierPrime-Regular': CourierPrime_400Regular,
    'CourierPrime-Bold': CourierPrime_700Bold,
  });

  // 2. Auth Check
  useEffect(() => {
    checkLogin();
  }, []);

  // 3. Handle Layout (Hide Splash Screen)
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !isAuthLoading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isAuthLoading]);

  // Loading State
  if (!fontsLoaded || isAuthLoading) {
    return null; // Splash screen masih native
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}