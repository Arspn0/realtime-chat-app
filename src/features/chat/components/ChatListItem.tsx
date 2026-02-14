import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { ChatRoom } from '../data/mockChats';

interface Props {
  chat: ChatRoom;
  onPress: () => void;
}

export const ChatListItem = ({ chat, onPress }: Props) => {
  const { colors, mode } = useAppTheme();
  const isNeo = mode === 'neobrutalism';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.text,
          borderBottomWidth: isNeo ? 2 : 1, // Garis bawah lebih tebal di Neo
          borderWidth: isNeo ? 2 : 0, // Border keliling di Neo
          marginTop: isNeo ? 8 : 0, // Jarak antar item di Neo
          marginHorizontal: isNeo ? 10 : 0,
          borderRadius: isNeo ? 8 : 0,
          shadowColor: colors.text,
          shadowOffset: isNeo ? { width: 3, height: 3 } : { width: 0, height: 0 },
          shadowOpacity: isNeo ? 1 : 0,
        }
      ]}
    >
      {/* Avatar Circle (Placeholder) */}
      <View style={[
        styles.avatar, 
        { 
          backgroundColor: colors.secondary,
          borderColor: colors.text,
          borderWidth: isNeo ? 2 : 0 
        }
      ]}>
        <Text style={{ fontSize: 18 }}>{chat.name.charAt(0)}</Text>
        {chat.isOnline && (
          <View style={[styles.onlineIndicator, { borderColor: colors.card }]} />
        )}
      </View>

      {/* Text Content */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, { color: colors.text }]}>{chat.name}</Text>
          <Text style={[styles.time, { color: colors.text }]}>{chat.lastMessageTime}</Text>
        </View>
        
        <View style={styles.footer}>
          <Text 
            numberOfLines={1} 
            style={[
              styles.message, 
              { color: colors.text, opacity: 0.7, fontWeight: chat.unreadCount > 0 ? 'bold' : 'normal' }
            ]}
          >
            {chat.lastMessage}
          </Text>
          
          {chat.unreadCount > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  onlineIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50', // Green
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  badge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});