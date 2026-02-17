import React from 'react';
import { LucideIcon } from 'lucide-react-native';
import { useAppTheme } from '../../hooks/useAppTheme';

interface ThemedIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  strokeWidth?: number; // Opsional, jika ingin override manual
  style?: any;
}

export const ThemedIcon = ({ 
  icon: Icon, 
  size = 24, 
  color, 
  strokeWidth,
  style 
}: ThemedIconProps) => {
  const { colors, mode } = useAppTheme();

  // Logika ketebalan garis otomatis berdasarkan tema
  const getDynamicStrokeWidth = () => {
    if (strokeWidth) return strokeWidth; // Jika di-override manual, pakai itu

    switch (mode) {
      case 'minimalist':
        return 1.5; // Tipis & Elegan
      case 'neo-brutalism':
        return 2.5; // Tebal & Berani
      case 'retro':
        return 2;   // Standar
      default:
        return 2;
    }
  };

  // Warna default mengikuti teks tema jika tidak ditentukan
  const finalColor = color || colors.text;

  return (
    <Icon 
      size={size} 
      color={finalColor} 
      strokeWidth={getDynamicStrokeWidth()} 
      style={style}
    />
  );
};