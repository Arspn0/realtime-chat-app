import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Tambah ini
import { NavigationContainer } from '@react-navigation/native';

// Screens
import { ChatListScreen } from '../features/chat/screens/ChatListScreen';
import { GroupListScreen } from '../features/groups/screens/GroupListScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { RegisterScreen } from '../features/auth/screens/RegisterScreen';
import { ChatRoomScreen } from '../features/chat/screens/ChatRoomScreen';
import { EditProfileScreen } from '../features/profile/screens/EditProfileScreen';
import { CreateGroupScreen } from '../features/groups/screens/CreateGroupScreen';
import { CustomBottomTab } from '../navigation/CustomBottomTab';

// Hooks & Store
import { useAppTheme } from '../hooks/useAppTheme';
import { useAuthStore } from '../store/authStore';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Stack untuk Auth

const MainStack = createNativeStackNavigator();

// 1. Komponen untuk Tab Utama (Aplikasi setelah login)
const MainAppTabs = () => {

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTab {...props} />}
      screenOptions={{
        headerShown: false,
      }}
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

// Stack for main app
const MainAppStack = () => {
  const { colors } = useAppTheme();

  return (
    <MainStack.Navigator>
      {/* Halaman Utama adalah Tabs */}
      <MainStack.Screen 
        name="MainTabs" 
        component={MainAppTabs} 
        options={{ headerShown: false }} 
      />

      {/* Halaman Chat Room (akan menimpa Tabs) */}
      <MainStack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen}
        options={({ route }: any) => ({
          title: route.params.userName, // Judul header sesuai nama teman
          headerStyle: { backgroundColor: colors.card },
          headerShown: false,
          headerTintColor: colors.text,
        })}
      />

      {/* Edit Profile Screen */}
      <MainStack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />

      {/* Create Group Screen */}
      <MainStack.Screen 
        name="CreateGroup" 
        component={CreateGroupScreen}
        options={{
          title: 'Buat Grup Baru',
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
        }}
      />
    </MainStack.Navigator>
  );
};

// 3. Root Navigator yang memilih tampilan berdasarkan status login
export const AppNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainAppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};