import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { MOCK_CHATS } from '../data/mockChats';
import { ChatListItem } from '../components/ChatListItem';
import { CustomInput } from '../../../components/ui/CustomInput';

export const ChatListScreen = () => {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <CustomInput label="" placeholder="Search contacts..." />
      </View>

      {/* Chat List */}
      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatListItem 
            chat={item} 
            onPress={() => navigation.navigate('ChatRoom', { 
              roomId: item.id, 
              userName: item.name 
            })} 
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { padding: 16, paddingBottom: 0 },
});