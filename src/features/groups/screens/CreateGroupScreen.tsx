import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useGroupStore } from '../../../store/groupStore';
import { MOCK_CONTACTS, Contact } from '../../chat/data/mockContacts';
import { CustomInput } from '../../../components/ui/CustomInput';
import { CustomButton } from '../../../components/ui/CustomButton';

export const CreateGroupScreen = () => {
  const { colors, mode } = useAppTheme();
  const navigation = useNavigation();
  const createGroup = useGroupStore((state) => state.createGroup);
  const isNeo = mode === 'neobrutalism';

  const [groupName, setGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

  const toggleSelect = (contact: Contact) => {
    if (selectedContacts.find((c) => c.id === contact.id)) {
      setSelectedContacts(prev => prev.filter((c) => c.id !== contact.id));
    } else {
      setSelectedContacts(prev => [...prev, contact]);
    }
  };

  const handleCreate = () => {
    if (!groupName.trim()) {
      Alert.alert('Error', 'Nama grup wajib diisi!');
      return;
    }
    if (selectedContacts.length === 0) {
      Alert.alert('Error', 'Pilih minimal 1 anggota.');
      return;
    }

    createGroup(groupName, selectedContacts);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: 16 }}>
        <CustomInput 
          label="Nama Grup" 
          placeholder="Contoh: Alumni SMA..." 
          value={groupName}
          onChangeText={setGroupName}
        />
        <Text style={{ color: colors.text, marginBottom: 10, fontWeight: 'bold' }}>
          Pilih Anggota ({selectedContacts.length})
        </Text>
      </View>

      <FlatList
        data={MOCK_CONTACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedContacts.some(c => c.id === item.id);
          return (
            <TouchableOpacity
              onPress={() => toggleSelect(item)}
              style={[
                styles.contactItem,
                { 
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  borderColor: colors.text,
                  borderBottomWidth: 1,
                  // Style khusus tema Neo jika selected
                  borderWidth: isNeo && isSelected ? 2 : 0, 
                }
              ]}
            >
              <View style={[styles.avatar, { backgroundColor: '#ddd' }]}>
                <Text>{item.name.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  color: isSelected ? '#fff' : colors.text, 
                  fontWeight: 'bold' 
                }}>
                  {item.name}
                </Text>
                <Text style={{ color: isSelected ? '#eee' : colors.text, fontSize: 12 }}>
                  {item.status}
                </Text>
              </View>
              {isSelected && <Text style={{ color: '#fff', fontWeight: 'bold' }}>✓</Text>}
            </TouchableOpacity>
          );
        }}
      />

      <View style={{ padding: 16 }}>
        <CustomButton title="Buat Grup" onPress={handleCreate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contactItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
});