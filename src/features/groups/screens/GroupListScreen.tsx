import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../hooks/useAppTheme';

export const GroupListScreen = () => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Group Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold' },
});