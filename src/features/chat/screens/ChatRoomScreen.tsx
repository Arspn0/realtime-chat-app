import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { MOCK_CHATS } from '../data/mockChats';

import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native'; // Pastikan Image diimpor dari react-native
import { Ionicons } from '@expo/vector-icons'; // Kita pakai icon bawaan Expo untuk tombol +

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
            // ... shadow styles (biarkan sama) ...
            shadowColor: colors.text,
            shadowOffset: isNeo ? { width: 3, height: 3 } : { width: 0, height: 0 },
            shadowOpacity: isNeo ? 1 : 0,
            borderBottomRightRadius: isMe ? 0 : 16,
            borderBottomLeftRadius: isMe ? 16 : 0,
            padding: item.type === 'image' ? 4 : 12, // Padding lebih kecil jika gambar
          }
        ]}>
          
          {/* LOGIC RENDER: Jika Image tampilkan gambar, jika Teks tampilkan teks */}
          {item.type === 'image' && item.image ? (
            <Image 
              source={{ uri: item.image }} 
              style={{ width: 200, height: 150, borderRadius: 8 }} 
              resizeMode="cover"
            />
          ) : (
            <Text style={{ 
              color: isMe ? '#fff' : colors.text,
              fontWeight: isNeo ? 'bold' : 'normal'
            }}>
              {item.text}
            </Text>
          )}

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
        
        {/* TOMBOL TAMBAH GAMBAR */}
        <TouchableOpacity 
          onPress={pickImage}
          style={{ marginRight: 10, padding: 5 }}
        >
          <Ionicons name="add-circle-outline" size={32} color={colors.primary} />
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
          <Ionicons name="send" size={20} color="#fff" />
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