import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';

export const ProfileScreen = () => {
  const { colors, setMode, mode } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>User Profile</Text>
      <Text style={{ color: colors.text, marginBottom: 20 }}>Current Theme: {mode.toUpperCase()}</Text>

      {/* Tombol Ganti Tema */}
      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: '#FFFFFF', borderColor: colors.text }]}
        onPress={() => setMode('minimalist')}
      >
        <Text style={{ color: '#1A1A1A' }}>Minimalist Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: '#FDF6E3', borderColor: colors.text }]}
        onPress={() => setMode('retro')}
      >
        <Text style={{ color: '#5D4037' }}>Retro Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.btn, { backgroundColor: '#E0E7FF', borderColor: colors.text }]}
        onPress={() => setMode('neobrutalism')}
      >
        <Text style={{ color: '#000000' }}>Neo-Brutalism Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
});