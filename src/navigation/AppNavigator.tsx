import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Tambah ini
import { NavigationContainer } from '@react-navigation/native';

// Screens
import { ChatListScreen } from '../features/chat/screens/ChatListScreen';
import { GroupListScreen } from '../features/groups/screens/GroupListScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen'; // Import Login
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';

// Hooks & Store
import { useAppTheme } from '../hooks/useAppTheme';
import { useAuthStore } from '../store/authStore'; // Import Auth Store
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Stack untuk Auth

// 1. Komponen untuk Tab Utama (Aplikasi setelah login)
const MainAppTabs = () => {
  const { colors } = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        tabBarStyle: { 
          backgroundColor: colors.card, 
          borderTopColor: colors.border,
          borderTopWidth: 1, 
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Chat') iconName = '💬';
          else if (route.name === 'Groups') iconName = '👥';
          else if (route.name === 'Profile') iconName = '👤';
          return <Text style={{ fontSize: 20 }}>{iconName}</Text>;
        },
      })}
    >
      <Tab.Screen name="Chat" component={ChatListScreen} />
      <Tab.Screen name="Groups" component={GroupListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// 2. Komponen untuk Auth Stack (Login/Register)
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} /> 
    </Stack.Navigator>
  );
};

// 3. Root Navigator yang memilih tampilan berdasarkan status login
export const AppNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainAppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};