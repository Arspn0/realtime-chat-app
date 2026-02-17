import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withSpring, withTiming, useSharedValue, withDelay } from 'react-native-reanimated';
import { MessageSquare, Users, User } from 'lucide-react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useAppTheme } from '../hooks/useAppTheme';
import { ThemedIcon } from '../components/ui/ThemedIcon';

// Komponen Item Tab
const TabItem = ({ 
  label, 
  icon: Icon, 
  isFocused, 
  onPress, 
  onLongPress,
  options 
}: any) => {
  const { colors, mode, fonts, isNeo, isRetro } = useAppTheme();
  
  // Animasi Container
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      // Background: Aktif = Warna, Inaktif = Transparan (atau sangat subtle di mode tertentu)
      backgroundColor: isFocused 
        ? (isNeo ? colors.primary : colors.text) 
        : 'transparent', 
      
      borderRadius: isNeo ? 8 : 30,
      
      // REVISI: Jangan jadikan 0 saat inaktif. Beri minimal 12 agar tetap "berisi"
      paddingHorizontal: withTiming(isFocused ? 20 : 12, { duration: 250 }),
      paddingVertical: 10,
      
      // REVISI: Hapus scale agar icon tidak mengecil
      transform: [{ scale: withSpring(1) }], 
    };
  });

  // Animasi Teks Label
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isFocused ? 1 : 0, { duration: 200 }),
      // REVISI: Kurangi sedikit lebar maksimalnya agar tidak terlalu mendorong tab lain
      maxWidth: withTiming(isFocused ? 80 : 0, { duration: 250 }),
      paddingLeft: withTiming(isFocused ? 8 : 0, { duration: 200 }),
    };
  });

  const activeIconColor = isNeo ? colors.text : colors.background; 
  const inactiveIconColor = colors.textSecondary;

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={0.8}
      style={{ 
        // REVISI: Gunakan flex: 1 rata untuk semua, tapi konten di dalamnya yang flexible
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
      }}
    >
      <Animated.View 
        style={[
          { 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden',
            // Border hanya muncul saat aktif di Neo Brutalism
            borderWidth: isNeo && isFocused ? 2 : 0,
            borderColor: colors.text,
            shadowColor: isNeo ? colors.text : 'transparent',
            shadowOffset: isNeo && isFocused ? { width: 2, height: 2 } : { width: 0, height: 0 },
            shadowOpacity: isNeo && isFocused ? 1 : 0,
          }, 
          animatedContainerStyle
        ]}
      >
        <ThemedIcon 
          icon={Icon} 
          size={24} 
          color={isFocused ? activeIconColor : inactiveIconColor} 
          // Icon aktif sedikit lebih tebal
          strokeWidth={isFocused ? 2.5 : 2}
        />
        
        <Animated.Text 
          numberOfLines={1}
          style={[
            animatedTextStyle,
            {
              color: isFocused ? activeIconColor : inactiveIconColor,
              fontFamily: fonts.body,
              fontWeight: 'bold',
              fontSize: 13, // Sedikit diperkecil agar compact
            }
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const CustomBottomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors, isNeo, isRetro } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingBottom: insets.bottom + 10,
      paddingHorizontal: 20, 
      backgroundColor: 'transparent',
    }}>
      <View style={{
        flexDirection: 'row',
        backgroundColor: colors.card,
        paddingVertical: 12, // Padding vertikal container
        paddingHorizontal: 8, // REVISI: Tambah padding internal container agar tab pinggir tidak mentok
        borderRadius: isNeo ? 12 : 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        
        borderWidth: isNeo ? 3 : (isRetro ? 2 : 0),
        borderColor: isNeo ? colors.text : (isRetro ? colors.border : 'transparent'),
        
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: isNeo ? 5 : 8 },
        shadowOpacity: isNeo ? 1 : 0.1,
        shadowRadius: isNeo ? 0 : 15,
        elevation: 10,
      }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let Icon = MessageSquare;
          let label = "Chat";
          
          if (route.name === 'Chat') { Icon = MessageSquare; label = 'Chat'; }
          else if (route.name === 'Groups') { Icon = Users; label = 'Groups'; }
          else if (route.name === 'Profile') { Icon = User; label = 'Profile'; }

          return (
            <TabItem
              key={route.key}
              label={label}
              icon={Icon}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
              options={options}
            />
          );
        })}
      </View>
    </View>
  );
};