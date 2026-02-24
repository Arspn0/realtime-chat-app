import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { LucideIcon, Ghost, Inbox, SearchX } from 'lucide-react-native';
import { useAppTheme } from '../../hooks/useAppTheme';
import { ThemedIcon } from './ThemedIcon';

interface Props {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionButton?: React.ReactNode; // Opsional: Tombol aksi (misal "Buat Baru")
}

export const EmptyState = ({ title, description, icon: Icon = Ghost, actionButton }: Props) => {
  const { colors, fonts, isNeo, isRetro, isMinimalist } = useAppTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40, marginTop: 40 }}>
      {/* Icon Container dengan Animasi */}
      <Animated.View 
        entering={ZoomIn.duration(500)}
        style={{
          width: 100, height: 100,
          borderRadius: isNeo ? 12 : 50,
          backgroundColor: isNeo ? colors.primary : colors.card,
          alignItems: 'center', justifyContent: 'center',
          marginBottom: 24,
          
          // Styling Tema
          borderWidth: isNeo ? 3 : (isRetro ? 2 : 0),
          borderColor: colors.text,
          borderStyle: isRetro ? 'dashed' : 'solid',
          
          shadowColor: colors.text,
          shadowOffset: isNeo ? { width: 4, height: 4 } : { width: 0, height: 10 },
          shadowOpacity: isNeo ? 1 : (isMinimalist ? 0.05 : 0),
          shadowRadius: isNeo ? 0 : 20,
        }}
      >
        <ThemedIcon 
          icon={Icon} 
          size={48} 
          color={isNeo ? colors.text : colors.primary} 
          strokeWidth={isNeo ? 2.5 : 1.5}
        />
      </Animated.View>

      {/* Teks Title */}
      <Animated.Text 
        entering={FadeInUp.delay(200)}
        style={{
          fontFamily: fonts.display,
          fontSize: 24,
          color: colors.text,
          textAlign: 'center',
          marginBottom: 8,
          textTransform: isNeo ? 'uppercase' : 'none',
        }}
      >
        {title}
      </Animated.Text>

      {/* Teks Deskripsi */}
      <Animated.Text 
        entering={FadeInUp.delay(300)}
        style={{
          fontFamily: fonts.body,
          fontSize: 16,
          color: colors.textSecondary,
          textAlign: 'center',
          marginBottom: 32,
          lineHeight: 24,
        }}
      >
        {description}
      </Animated.Text>

      {/* Action Button (Jika ada) */}
      {actionButton && (
        <Animated.View entering={FadeInUp.delay(400)}>
          {actionButton}
        </Animated.View>
      )}
    </View>
  );
};