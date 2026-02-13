import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ChatListScreen } from '../features/chat/screens/ChatListScreen';
import { GroupListScreen } from '../features/groups/screens/GroupListScreen';
import { ProfileScreen } from '../features/profile/screens/ProfileScreen';
import { useAppTheme } from '../hooks/useAppTheme';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  const { colors } = useAppTheme();

  return (
    <NavigationContainer>
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

            // Return emoji sementara sebagai icon
            return <Text style={{ fontSize: 20 }}>{iconName}</Text>;
          },
        })}
      >
        <Tab.Screen name="Chat" component={ChatListScreen} />
        <Tab.Screen name="Groups" component={GroupListScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};