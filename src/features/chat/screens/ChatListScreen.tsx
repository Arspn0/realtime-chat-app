import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { MOCK_CHATS } from '../data/mockChats';
import { ChatListItem } from '../components/ChatListItem';
import { CustomInput } from '../../../components/ui/CustomInput';
import { SearchBar } from '../../../components/ui/SearchBar';
import { EmptyState } from '../../../components/ui/EmptyState';

export const ChatListScreen = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = MOCK_CHATS.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar Container dengan padding */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Cari teman atau pesan..."
        />
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem 
            chat={item} 
            onPress={() => navigation.navigate('ChatRoom', { 
              roomId: item.id, 
              userName: item.name,
              userAvatar: item.avatar,
            })} 
          />
        )}
        ListEmptyComponent={
          <View style={{ marginTop: 50 }}>
            <EmptyState 
              title="Tidak Ditemukan"
              description={`Tidak ada hasil untuk "${searchQuery}"`}
              icon={require('lucide-react-native').SearchX} // Import icon SearchX dulu di atas
            />
          </View>
        }
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { padding: 16, paddingBottom: 0 },
});