import React from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

interface Props extends TextInputProps {
  label: string;
}

export const CustomInput = ({ label, style, ...props }: Props) => {
  const { colors, mode } = useAppTheme();
  
  // Logic styling khusus untuk Neo-Brutalism
  const isNeo = mode === 'neobrutalism';
  
  return (
    <View style={{ marginBottom: 16, width: '100%' }}>
      <Text style={{ color: colors.text, marginBottom: 8, fontWeight: '600' }}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: isNeo ? '#fff' : colors.card,
            borderColor: colors.text,
            color: colors.text,
            borderWidth: isNeo ? 2 : 1, // Border tebal untuk Neo
            shadowColor: colors.text,
            shadowOffset: isNeo ? { width: 4, height: 4 } : { width: 0, height: 0 },
            shadowOpacity: isNeo ? 1 : 0,
            shadowRadius: 0,
            elevation: isNeo ? 0 : 2, // Android shadow handle
          },
          style,
        ]}
        placeholderTextColor={'#999'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});