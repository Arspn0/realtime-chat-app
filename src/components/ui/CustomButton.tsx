import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const CustomButton = ({ title, onPress, loading, variant = 'primary' }: Props) => {
  const { colors, mode } = useAppTheme();
  const isNeo = mode === 'neobrutalism';

  const bgColor = variant === 'primary' ? colors.primary : colors.secondary;
  const textColor = variant === 'primary' ? '#fff' : colors.text;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.btn,
        {
          backgroundColor: bgColor,
          borderColor: colors.text,
          borderWidth: isNeo ? 2 : 0,
          shadowColor: colors.text,
          shadowOffset: isNeo ? { width: 4, height: 4 } : { width: 0, height: 0 },
          shadowOpacity: isNeo ? 1 : 0,
          shadowRadius: 0,
        }
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor, fontWeight: 'bold' }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  text: { fontSize: 16 },
});