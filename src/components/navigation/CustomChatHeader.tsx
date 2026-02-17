import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react-native';

import { useAppTheme } from '../../hooks/useAppTheme';
import { ThemedIcon } from '../ui/ThemedIcon';

interface Props {
  name: string;
  avatar?: string;
  status?: string; // 'Online', 'Typing...', atau jam terakhir
}

export const CustomChatHeader = ({ name, avatar, status = 'Online' }: Props) => {
  const { colors, fonts, isNeo, isRetro, isMinimalist } = useAppTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      paddingTop: insets.top + 10,
      paddingBottom: 16,
      paddingHorizontal: 16,
      backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      
      // Styling per Tema
      borderBottomWidth: isNeo ? 3 : (isRetro ? 2 : 1),
      borderBottomColor: isNeo ? colors.text : (isRetro ? colors.border : colors.border), // Minimalist pakai border halus
      
      // Shadow khusus Neo
      zIndex: 10,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: isNeo ? 4 : 2 },
      shadowOpacity: isNeo ? 1 : 0.05,
      shadowRadius: isNeo ? 0 : 10,
      elevation: isNeo ? 5 : 2,
    }}>
      
      {/* KIRI: Back & Profile */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{
            padding: 8,
            backgroundColor: isNeo ? colors.primary : 'transparent',
            borderRadius: isNeo ? 8 : 20,
            borderWidth: isNeo ? 2 : 0,
            borderColor: colors.text
          }}
        >
          <ThemedIcon icon={ArrowLeft} size={24} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {/* Avatar */}
          <View>
            {avatar ? (
              <Image 
                source={{ uri: avatar }} 
                style={{ 
                  width: 40, height: 40, 
                  borderRadius: isNeo ? 8 : 20,
                  borderWidth: isNeo ? 2 : 0,
                  borderColor: colors.text
                }} 
              />
            ) : (
              <View style={{ 
                width: 40, height: 40, 
                borderRadius: isNeo ? 8 : 20,
                backgroundColor: colors.backgroundElevated,
                alignItems: 'center', justifyContent: 'center',
                borderWidth: isNeo ? 2 : 0,
                borderColor: colors.text
              }}>
                <Text style={{ fontFamily: fonts.display, fontSize: 18 }}>{name?.charAt(0)}</Text>
              </View>
            )}
            
            {/* Online Indicator (Dot Hijau) */}
            <View style={{
              position: 'absolute', bottom: -2, right: -2,
              width: 12, height: 12, borderRadius: 6,
              backgroundColor: '#00C851',
              borderWidth: 2,
              borderColor: colors.card
            }} />
          </View>

          {/* Nama & Status */}
          <View>
            <Text style={{ 
              fontFamily: fonts.body, 
              fontWeight: 'bold', 
              fontSize: 16,
              color: colors.text 
            }}>
              {name}
            </Text>
            <Text style={{ 
              fontFamily: fonts.mono, 
              fontSize: 12, 
              color: colors.textSecondary 
            }}>
              {status}
            </Text>
          </View>
        </View>
      </View>

      {/* KANAN: Call Actions */}
      <View style={{ flexDirection: 'row', gap: isNeo ? 8 : 16 }}>
        <TouchableOpacity style={{ padding: 6 }}>
           <ThemedIcon icon={Phone} size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 6 }}>
           <ThemedIcon icon={Video} size={22} />
        </TouchableOpacity>
      </View>

    </View>
  );
};