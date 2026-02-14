import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { MOCK_CHATS } from '../data/mockChats';

export const ChatRoomScreen = ({ route }: any) => {
  const { colors, mode } = useAppTheme();
  const { roomId } = route.params;
  const isNeo = mode === 'neobrutalism';

  // Ambil data chat berdasarkan ID, atau kosong jika tidak ada
  const chatData = MOCK_CHATS.find(c => c.id === roomId);
  const [messages, setMessages] = useState(chatData ? [...chatData.messages].reverse() : []);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      senderId: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    setMessages([newMessage, ...messages]);
    setInputText('');
  };

  const renderItem = ({ item }: any) => {
    const isMe = item.senderId === 'me';
    
    return (
      <View style={[
        styles.bubbleWrapper, 
        { justifyContent: isMe ? 'flex-end' : 'flex-start' }
      ]}>
        <View style={[
          styles.bubble,
          {
            backgroundColor: isMe ? colors.primary : colors.card,
            borderColor: colors.text,
            borderWidth: isNeo ? 2 : 0,
            shadowColor: colors.text,
            shadowOffset: isNeo ? { width: 3, height: 3 } : { width: 0, height: 0 },
            shadowOpacity: isNeo ? 1 : 0,
            borderBottomRightRadius: isMe ? 0 : 16,
            borderBottomLeftRadius: isMe ? 16 : 0,
          }
        ]}>
          <Text style={{ 
            color: isMe ? '#fff' : colors.text,
            fontWeight: isNeo ? 'bold' : 'normal'
          }}>
            {item.text}
          </Text>
          <Text style={{ 
            fontSize: 10, 
            color: isMe ? '#eee' : colors.text, 
            marginTop: 4, 
            alignSelf: 'flex-end',
            opacity: 0.7 
          }}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90} // Sesuaikan dengan tinggi header
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        inverted // Pesan terbaru di bawah (teknisnya di atas karena inverted)
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Input Area */}
      <View style={[
        styles.inputContainer, 
        { backgroundColor: colors.card, borderTopColor: colors.border, borderTopWidth: 1 }
      ]}>
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: colors.background, 
              color: colors.text,
              borderColor: colors.text,
              borderWidth: isNeo ? 2 : 1,
            }
          ]}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity 
          onPress={sendMessage}
          style={[
            styles.sendBtn, 
            { 
              backgroundColor: colors.primary,
              borderColor: colors.text,
              borderWidth: isNeo ? 2 : 0,
              shadowColor: colors.text,
              shadowOffset: isNeo ? { width: 2, height: 2 } : { width: 0, height: 0 },
              shadowOpacity: isNeo ? 1 : 0,
            }
          ]}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>➤</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bubbleWrapper: { flexDirection: 'row', marginBottom: 12 },
  bubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '75%',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    maxHeight: 100,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});