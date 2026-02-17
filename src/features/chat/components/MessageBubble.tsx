import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Check, CheckCheck, Clock } from 'lucide-react-native';
import Animated, { FadeIn, Layout } from 'react-native-reanimated';

import { useAppTheme } from '../../../hooks/useAppTheme';
import { Message } from '../data/mockChats';

interface Props {
  message: Message;
  isMe: boolean;
  isFirstInGroup: boolean; // Apakah ini pesan pertama dalam rentetan?
  isLastInGroup: boolean;  // Apakah ini pesan terakhir dalam rentetan?
  showAvatar?: boolean;    // Untuk grup chat (pesan orang lain)
}

export const MessageBubble = ({ 
  message, 
  isMe, 
  isFirstInGroup, 
  isLastInGroup,
  showAvatar 
}: Props) => {
  const { colors, fonts, isNeo, isRetro, isMinimalist } = useAppTheme();

  // LOGIKA BORDER RADIUS DINAMIS
  // Neo-Brutalism: Selalu tajam/kotak
  // Minimalist/Retro: Gunakan logika grouping
  const baseRadius = isNeo ? 4 : 18;
  const smallRadius = isNeo ? 4 : 4;

  const borderRadiusStyle = isMe ? {
    borderTopLeftRadius: baseRadius,
    borderTopRightRadius: isFirstInGroup ? baseRadius : smallRadius,
    borderBottomRightRadius: isLastInGroup ? baseRadius : smallRadius,
    borderBottomLeftRadius: baseRadius,
  } : {
    borderTopLeftRadius: isFirstInGroup ? baseRadius : smallRadius,
    borderTopRightRadius: baseRadius,
    borderBottomRightRadius: baseRadius,
    borderBottomLeftRadius: isLastInGroup ? baseRadius : smallRadius,
  };

  // Render Status Icon (Jam / Centang 1 / Centang 2)
  const renderStatus = () => {
    if (!isMe) return null; // Pesan orang lain tidak perlu status centang

    // Logika dummy status (bisa diganti real data nanti)
    if (!message.isRead) {
      return <Check size={14} color={isNeo ? '#000' : 'rgba(255,255,255,0.7)'} strokeWidth={2} />;
    }
    return <CheckCheck size={14} color={isNeo ? '#000' : '#4FD1C5'} strokeWidth={2} />; // Biru/Teal jika read
  };

  return (
    <Animated.View 
      entering={FadeIn.duration(300)} // Animasi pesan masuk halus
      layout={Layout.springify()}     // Animasi saat list bergeser
      style={{
        flexDirection: 'row',
        justifyContent: isMe ? 'flex-end' : 'flex-start',
        marginBottom: isLastInGroup ? 12 : 2, // Jarak rapat jika satu grup, renggang jika beda
        paddingHorizontal: 16,
      }}
    >
      {/* Avatar Lawan Bicara (Hanya muncul di pesan terakhir grup) */}
      {/* {!isMe && (
        <View style={{ width: 32, marginRight: 8, justifyContent: 'flex-end' }}>
          {isLastInGroup && showAvatar ? (
             <View style={{
               width: 30, height: 30, borderRadius: 15,
               backgroundColor: colors.backgroundElevated,
               alignItems: 'center', justifyContent: 'center',
               borderWidth: 1, borderColor: colors.border
             }}>
               <Text style={{ fontSize: 10, fontFamily: fonts.mono }}>?</Text>
             </View>
          ) : null}
        </View>
      )} */}

      {/* BUBBLE CONTAINER */}
      <View
        style={{
          maxWidth: '75%',
          paddingVertical: 8,
          paddingHorizontal: 12,
          backgroundColor: isMe 
            ? colors.primary // Warna User
            : (isNeo ? '#fff' : colors.card), // Warna Teman
          
          ...borderRadiusStyle,

          // Styling Per Tema
          borderWidth: isNeo ? 2 : 0,
          borderColor: colors.text,
          shadowColor: colors.text,
          shadowOffset: isNeo && isLastInGroup ? { width: 2, height: 2 } : { width: 0, height: 0 },
          shadowOpacity: isNeo && isLastInGroup ? 1 : 0.05,
          shadowRadius: isNeo ? 0 : 4,
          elevation: isNeo ? 0 : 1,
        }}
      >
        {/* IMAGE CONTENT */}
        {message.type === 'image' && message.image && (
          <Image 
            source={{ uri: message.image }}
            style={{
              width: 200, height: 150,
              borderRadius: isNeo ? 2 : 12,
              marginBottom: message.text ? 8 : 0,
              borderWidth: isNeo ? 2 : 0,
              borderColor: colors.text
            }}
          />
        )}

        {/* TEXT CONTENT */}
        {message.text ? (
          <Text style={{
            fontFamily: fonts.body,
            fontSize: 15,
            color: isMe 
              ? (isNeo ? colors.text : '#fff') // Neo: Text hitam di kuning, Min: Putih di Biru
              : colors.text,
            lineHeight: 22,
          }}>
            {message.text}
          </Text>
        ) : null}

        {/* METADATA (Time & Status) */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: 4,
          gap: 4
        }}>
          <Text style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            color: isMe 
              ? (isNeo ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)') 
              : colors.textSecondary
          }}>
            {message.timestamp}
          </Text>
          {renderStatus()}
        </View>

      </View>
    </Animated.View>
  );
};