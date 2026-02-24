import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useAppTheme } from '../../hooks/useAppTheme';
import { ThemedIcon } from './ThemedIcon';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export const SearchBar = ({ value, onChangeText, placeholder = "Search...", onClear }: Props) => {
  const { colors, fonts, isNeo, isRetro, isMinimalist } = useAppTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Animasi Border/Shadow saat fokus
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: isFocused ? colors.primary : colors.border,
      transform: [{ scale: withTiming(isFocused ? 1.01 : 1, { duration: 200 }) }],
      // Shadow Neo memanjang saat fokus
      shadowOffset: isNeo 
        ? { width: withTiming(isFocused ? 4 : 2), height: withTiming(isFocused ? 4 : 2) }
        : { width: 0, height: 2 },
    };
  });

  return (
    <Animated.View style={[
      {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: isMinimalist ? colors.card : colors.background, // Minimalist pakai card putih, Neo pakai bg (biasanya kuning/krem)
        height: 50,
        paddingHorizontal: 16,
        marginBottom: 16,
        
        // Style Dasar
        borderRadius: isNeo ? 4 : (isRetro ? 2 : 12),
        borderWidth: isNeo ? 2 : 1,
        // Minimalist border tipis, Neo border tebal hitam
        borderColor: isNeo ? colors.text : colors.border, 
        
        // Shadow Logic
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isNeo ? 1 : (isMinimalist ? 0.05 : 0),
        shadowRadius: isNeo ? 0 : 8,
        elevation: isNeo ? 2 : 1,
      },
      containerAnimatedStyle
    ]}>
      {/* Search Icon */}
      <ThemedIcon 
        icon={Search} 
        size={20} 
        color={isFocused ? colors.primary : colors.textSecondary} 
        style={{ marginRight: 12 }}
      />

      {/* Text Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={{
          flex: 1,
          fontFamily: fonts.body,
          fontSize: 16,
          color: colors.text,
          height: '100%', // Full height agar area tap luas
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Clear Button (Muncul jika ada teks) */}
      {value.length > 0 && (
        <TouchableOpacity 
          onPress={() => {
            onChangeText('');
            onClear && onClear();
          }}
          style={{
            padding: 4,
            backgroundColor: isNeo ? colors.text : colors.backgroundElevated,
            borderRadius: 12,
          }}
        >
          <X size={12} color={isNeo ? colors.background : colors.text} strokeWidth={3} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};