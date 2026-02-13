import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';

export const ChatListScreen = () => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Chat List Screen</Text>
      <Text style={[styles.subText, { color: colors.primary }]}>
        Daftar chat akan muncul di sini.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
  subText: { fontSize: 16, marginTop: 10 },
});