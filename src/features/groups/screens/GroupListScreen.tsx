import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useGroupStore } from '../../../store/groupStore';

export const GroupListScreen = () => {
  const { colors, mode } = useAppTheme();
  const navigation = useNavigation<any>();
  const groups = useGroupStore((state) => state.groups);
  const isNeo = mode === 'neobrutalism';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* List Grup */}
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
            Belum ada grup. Buat sekarang!
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.text,
                borderWidth: isNeo ? 2 : 1,
                shadowColor: colors.text,
                shadowOffset: isNeo ? { width: 4, height: 4 } : { width: 0, height: 0 },
                shadowOpacity: isNeo ? 1 : 0,
              }
            ]}
            onPress={() => navigation.navigate('ChatRoom', { 
              roomId: item.id, 
              userName: item.name // Reuse ChatRoom untuk Grup juga
            })}
          >
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
               <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.name.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.groupName, { color: colors.text }]}>{item.name}</Text>
              <Text style={{ color: colors.text, opacity: 0.7 }}>{item.members.length} Anggota</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button (FAB) untuk tambah grup */}
      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor: colors.primary,
            borderColor: colors.text,
            borderWidth: isNeo ? 2 : 0,
          }
        ]}
        onPress={() => navigation.navigate('CreateGroup')}
      >
        <Text style={{ fontSize: 30, color: '#fff', marginTop: -4 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
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
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});