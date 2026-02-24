import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { MOCK_CHATS } from '../data/mockChats';

import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native'; // Pastikan Image diimpor dari react-native
import { Send, Plus, Image as ImageIcon } from 'lucide-react-native';
import { ThemedIcon } from '../../../components/ui/ThemedIcon';
import { CustomChatHeader } from '../../../components/navigation/CustomChatHeader';
import { MessageBubble } from '../components/MessageBubble';

export const ChatRoomScreen = ({ route }: any) => {
  const { colors, mode } = useAppTheme();
  const { roomId, userName, userAvatar } = route.params;
  const isNeo = mode === 'neo-brutalism';

  // Ambil data chat berdasarkan ID, atau kosong jika tidak ada
  const chatData = MOCK_CHATS.find(c => c.id === roomId);
  const [messages, setMessages] = useState(chatData ? [...chatData.messages].reverse() : []);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage: any = {
      id: Date.now().toString(),
      text: inputText,
      senderId: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      type: 'text',
    };

    setMessages((prev) => [newMessage, ...prev]);
    setInputText('');
  };

  const renderItem = ({ item, index }: { item: any, index: number }) => {
    // Karena FlatList kita 'inverted' (terbalik), maka:
    // - 'Next' Message secara visual adalah index - 1 (di bawahnya dalam array)
    // - 'Previous' Message secara visual adalah index + 1 (di atasnya dalam array)

    const nextMessage = messages[index - 1]; 
    const prevMessage = messages[index + 1];

    const isMe = item.senderId === 'me';

    // Logika Grouping:
    // Apakah ini pesan pertama dalam grup? (Jika pesan sebelumnya beda pengirim)
    const isFirstInGroup = !prevMessage || prevMessage.senderId !== item.senderId;

    // Apakah ini pesan terakhir dalam grup? (Jika pesan setelahnya beda pengirim)
    const isLastInGroup = !nextMessage || nextMessage.senderId !== item.senderId;

    return (
      <MessageBubble
        message={item}
        isMe={isMe}
        isFirstInGroup={isFirstInGroup}
        isLastInGroup={isLastInGroup}
        showAvatar={true} // Nanti bisa dikondisikan kalau grup chat
      />
    );
  };

  const pickImage = async () => {
    // Minta izin akses galeri
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // User bisa crop/edit dikit
      quality: 0.7, // Kompresi sedikit agar ringan
    });

    if (!result.canceled && result.assets[0].uri) {
      sendImageMessage(result.assets[0].uri);
    }
  };

  // Fungsi Kirim Pesan Gambar
  const sendImageMessage = (uri: string) => {
    const newMessage: any = { // Pakai any sementara agar tidak error tipe
      id: Date.now().toString(),
      text: 'Sent an image', // Teks placeholder
      senderId: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
      image: uri, // Masukkan URI gambar
      type: 'image',
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* 1. Custom Header (Sticky di atas) */}
      <CustomChatHeader 
        name={userName || 'Unknown'} 
        avatar={userAvatar} // Nanti kita update navigasi biar kirim avatar
        status="Online" 
      />

      {/* 2. Area Chat (KeyboardAvoidingView) */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}// Sesuaikan dengan tinggi header
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted // Pesan terbaru di bawah (teknisnya di atas karena inverted)
          contentContainerStyle={{ padding: 2, paddingBottom: 20 }}
        />

        {/* Input Area */}
        <View style={[
          styles.inputContainer, 
          { backgroundColor: colors.card, borderTopColor: colors.border, borderTopWidth: 1 }
        ]}>
          
          {/* TOMBOL TAMBAH GAMBAR */}
          <TouchableOpacity 
            onPress={pickImage}
            style={{ marginRight: 10, padding: 5 }}
          >
            {/* Gunakan ThemedIcon */}
            <ThemedIcon icon={Plus} size={28} color={colors.primary} />
          </TouchableOpacity>

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
                // ... shadow ...
              }
            ]}
          >
            <ThemedIcon icon={Send} size={20} color="#fff" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
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