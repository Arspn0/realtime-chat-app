import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../hooks/useAppTheme';
import { useAuthStore } from '../../../store/authStore';
import { CustomInput } from '../../../components/ui/CustomInput';
import { CustomButton } from '../../../components/ui/CustomButton';

export const EditProfileScreen = () => {
  const { colors, mode } = useAppTheme();
  const navigation = useNavigation();
  const { user, updateProfile } = useAuthStore();
  const isNeo = mode === 'neobrutalism';

  const [name, setName] = useState(user?.name || '');
  const [status, setStatus] = useState(user?.status || '');
  const [mood, setMood] = useState(user?.mood || '👋');
  const [avatar, setAvatar] = useState(user?.avatar || null);

  // Fungsi Pilih Gambar
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true, // Kita simpan base64 string sementara (karena belum ada server)
    });

    if (!result.canceled && result.assets[0].base64) {
      // Tambahkan prefix data uri agar bisa ditampilkan Image component
      setAvatar('data:image/jpeg;base64,' + result.assets[0].base64);
    }
  };

  const handleSave = () => {
    updateProfile({ name, status, mood, avatar: avatar || undefined });
    Alert.alert('Success', 'Profile updated!');
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {avatar ? (
            <Image 
              source={{ uri: avatar }} 
              style={[
                styles.avatar, 
                { borderColor: colors.text, borderWidth: isNeo ? 2 : 0 }
              ]} 
            />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: colors.secondary }]}>
              <Text style={{ fontSize: 30 }}>📷</Text>
            </View>
          )}
          <Text style={[styles.changePhotoText, { color: colors.primary }]}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <CustomInput label="Display Name" value={name} onChangeText={setName} />
        <CustomInput label="Status / Bio" value={status} onChangeText={setStatus} />
        
        {/* Simple Mood Selector */}
        <Text style={[styles.label, { color: colors.text }]}>Current Mood</Text>
        <View style={styles.moodContainer}>
          {['👋', '🚀', '💻', '☕', '😴', '🔥'].map((m) => (
            <TouchableOpacity 
              key={m} 
              onPress={() => setMood(m)}
              style={[
                styles.moodItem, 
                { 
                  backgroundColor: mood === m ? colors.primary : colors.card,
                  borderColor: colors.text,
                  borderWidth: isNeo ? 2 : 1
                }
              ]}
            >
              <Text style={{ fontSize: 24 }}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton title="Save Changes" onPress={handleSave} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  avatarContainer: { alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  changePhotoText: { marginTop: 10, fontWeight: 'bold' },
  form: { paddingBottom: 40 },
  label: { marginBottom: 10, fontWeight: '600' },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  moodItem: { padding: 10, borderRadius: 30 },
});