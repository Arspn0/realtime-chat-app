import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Switch, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'; // Animasi masuk
import QRCode from 'react-native-qrcode-svg'; 
import { LogOut, QrCode, Edit3, Palette, ChevronRight, User, Shield, Bell } from 'lucide-react-native';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { useAuthStore } from '../../../store/authStore';
import { ThemedIcon } from '../../../components/ui/ThemedIcon';

export const ProfileScreen = () => {
  // Kita ambil semua properti styling canggih dari hook tema
  const { 
    colors, setMode, mode, 
    fonts, shadows, borders, borderRadius, spacing, 
    isNeo, isRetro, isMinimalist 
  } = useAppTheme();
  
  const { user, logout } = useAuthStore();
  const navigation = useNavigation<any>();
  const [showQR, setShowQR] = useState(false);

  // Helper untuk merender Menu Item agar konsisten & cantik
  const MenuItem = ({ icon, label, value, onPress, isDestructive = false }: any) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: colors.card,
        marginBottom: isNeo ? 12 : 1, // Neo-Brutalism suka terpisah-pisah
        borderBottomWidth: isNeo ? 2 : (isRetro ? 1 : 0),
        borderBottomColor: colors.border,
        // Style khusus Neo-Brutalism
        borderWidth: isNeo ? 2 : 0,
        borderColor: colors.text,
        borderRadius: isNeo ? 8 : 0,
        shadowColor: isNeo ? colors.text : 'transparent',
        shadowOffset: isNeo ? { width: 4, height: 4 } : { width: 0, height: 0 },
        shadowOpacity: isNeo ? 1 : 0,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{
          padding: 8,
          borderRadius: 8,
          backgroundColor: isDestructive ? '#FFEBEE' : colors.background,
          borderWidth: isNeo ? 2 : 0,
          borderColor: colors.text
        }}>
          <ThemedIcon icon={icon} size={20} color={isDestructive ? '#D32F2F' : colors.text} />
        </View>
        <Text style={{ 
          fontFamily: fonts.body, 
          fontSize: 16, 
          color: isDestructive ? '#D32F2F' : colors.text,
          fontWeight: isNeo ? '700' : '400'
        }}>
          {label}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {value && (
          <Text style={{ fontFamily: fonts.body, color: colors.textSecondary, fontSize: 14 }}>
            {value}
          </Text>
        )}
        {!isDestructive && <ThemedIcon icon={ChevronRight} size={18} color={colors.textSecondary} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* 1. Header Profile dengan Animasi */}
      <Animated.View 
        entering={FadeInDown.delay(100).duration(600)}
        style={{
          alignItems: 'center',
          paddingVertical: 40,
          paddingHorizontal: 20,
          backgroundColor: isMinimalist ? 'transparent' : colors.card,
          borderBottomWidth: isNeo ? 4 : (isRetro ? 2 : 0),
          borderBottomColor: colors.border,
        }}
      >
        <View style={{ marginBottom: 16 }}>
          {user?.avatar ? (
             <Image 
               source={{ uri: user.avatar }} 
               style={{ 
                 width: 100, height: 100, 
                 borderRadius: isNeo ? 12 : 50, // Neo kotak, lainnya bulat
                 borderWidth: isNeo ? 4 : 0,
                 borderColor: colors.text
               }} 
             />
          ) : (
            <View style={{ 
              width: 100, height: 100, 
              borderRadius: isNeo ? 12 : 50, 
              backgroundColor: colors.primary,
              justifyContent: 'center', alignItems: 'center',
              borderWidth: isNeo ? 4 : 0,
              borderColor: colors.text,
              // Shadow canggih dari theme.ts
              shadowColor: colors.primary,
              shadowOpacity: isMinimalist ? 0.3 : 0,
              shadowRadius: 20,
            }}>
               <Text style={{ fontSize: 40, color: '#fff', fontFamily: fonts.display }}>
                 {user?.name?.charAt(0)}
               </Text>
            </View>
          )}
          
          {/* Mood Bubble Absolute */}
          <View style={{
            position: 'absolute', bottom: 0, right: -4,
            backgroundColor: colors.card,
            padding: 6,
            borderRadius: 20,
            borderWidth: isNeo ? 3 : 1,
            borderColor: colors.text
          }}>
             <Text style={{ fontSize: 20 }}>{user?.mood || '👋'}</Text>
          </View>
        </View>

        <Text style={{ 
          fontFamily: fonts.display, // Font Keren (Bebas Neue / DM Serif)
          fontSize: 32, 
          color: colors.text,
          marginBottom: 4,
          textTransform: isNeo ? 'uppercase' : 'none',
          letterSpacing: isNeo ? 2 : 0
        }}>
          {user?.name}
        </Text>
        
        <Text style={{ 
          fontFamily: fonts.mono, 
          color: colors.primary, 
          marginBottom: 20,
          fontSize: 14
        }}>
          {user?.username || '@username'}
        </Text>

        {/* Stats Row (Hiasan biar tidak sepi) */}
        <View style={{ flexDirection: 'row', gap: 20, marginBottom: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: fonts.display, fontSize: 20, color: colors.text }}>142</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>Friends</Text>
          </View>
          <View style={{ width: 1, height: 30, backgroundColor: colors.border }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontFamily: fonts.display, fontSize: 20, color: colors.text }}>12</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary }}>Groups</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('EditProfile')}
            style={{
              backgroundColor: colors.text,
              paddingVertical: 10,
              paddingHorizontal: 24,
              borderRadius: isNeo ? 6 : 24,
              borderWidth: isNeo ? 2 : 0,
              borderColor: colors.text === '#000000' ? '#fff' : '#000', // Kontras
            }}
          >
            <Text style={{ color: colors.background, fontWeight: 'bold', fontFamily: fonts.body }}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => setShowQR(true)}
            style={{
              backgroundColor: colors.card,
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderRadius: isNeo ? 6 : 24,
              borderWidth: 1,
              borderColor: colors.border,
              // Shadow Neo Brutalism
              shadowColor: colors.text,
              shadowOffset: isNeo ? { width: 4, height: 4 } : { width: 0, height: 0 },
              shadowOpacity: isNeo ? 1 : 0,
            }}
          >
            <ThemedIcon icon={QrCode} size={20} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* 2. Settings Section */}
      <View style={{ padding: 20 }}>
        <Text style={{ 
          fontFamily: fonts.mono, 
          fontSize: 14, 
          color: colors.textSecondary, 
          marginBottom: 10,
          textTransform: 'uppercase',
          letterSpacing: 1
        }}>
          Preferences
        </Text>

        <View style={{ 
          backgroundColor: isMinimalist ? '#fff' : 'transparent', // Card container untuk minimalist
          borderRadius: 16,
          overflow: 'hidden',
          // Shadow halus untuk minimalist
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isMinimalist ? 0.05 : 0,
          shadowRadius: 10,
          elevation: isMinimalist ? 2 : 0,
        }}>
          <MenuItem icon={Palette} label="Appearance" value={mode.replace('-', ' ')} onPress={() => {}} />
          <View style={{ height: 16 }} /> 
          
          {/* Theme Selector Horizontal */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
            {['minimalist', 'retro', 'neo-brutalism'].map((t: any) => (
              <TouchableOpacity
                key={t}
                onPress={() => setMode(t)}
                style={{
                  marginRight: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 20,
                  backgroundColor: mode === t ? colors.primary : colors.card,
                  borderWidth: isNeo ? 2 : 1,
                  borderColor: colors.text,
                  // Neo shadow
                  shadowColor: colors.text,
                  shadowOffset: isNeo && mode === t ? { width: 2, height: 2 } : { width: 0, height: 0 },
                  shadowOpacity: isNeo && mode === t ? 1 : 0,
                }}
              >
                <Text style={{ 
                  color: mode === t ? (isNeo ? colors.text : '#fff') : colors.text,
                  fontFamily: fonts.body,
                  fontWeight: 'bold'
                }}>
                  {t.replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <MenuItem icon={Bell} label="Notifications" value="On" onPress={() => {}} />
          <MenuItem icon={Shield} label="Privacy & Security" onPress={() => {}} />
        </View>

        <View style={{ height: 30 }} />

        <MenuItem 
          icon={LogOut} 
          label="Log Out" 
          isDestructive 
          onPress={logout} 
        />
        
        <Text style={{ textAlign: 'center', marginTop: 30, color: colors.textSecondary, fontSize: 12, fontFamily: fonts.mono }}>
          Version 1.0.0 (Build 2024)
        </Text>
      </View>

      {/* QR Modal (Dipercantik) */}
      <Modal visible={showQR} transparent animationType="fade">
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0,0,0,0.6)', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <Animated.View 
            entering={FadeInUp.springify()}
            style={{ 
              width: 300, 
              padding: 30, 
              backgroundColor: colors.card, 
              borderRadius: 20, 
              alignItems: 'center',
              borderWidth: isNeo ? 4 : 0,
              borderColor: colors.text,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
            }}
          >
            <Text style={{ fontFamily: fonts.display, fontSize: 24, marginBottom: 20, color: colors.text }}>
              SCAN ME
            </Text>
            <View style={{ padding: 10, backgroundColor: '#fff', borderRadius: 10 }}>
              <QRCode value={user?.id || 'unknown'} size={200} />
            </View>
            <Text style={{ marginTop: 20, fontFamily: fonts.mono, color: colors.primary }}>
              {user?.username}
            </Text>
            <TouchableOpacity 
              onPress={() => setShowQR(false)}
              style={{ marginTop: 30, padding: 10 }}
            >
              <Text style={{ color: colors.textSecondary }}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

    </ScrollView>
  );
};