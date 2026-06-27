import React from 'react';
import { Text as RNText, TextStyle, StyleSheet, StyleProp } from 'react-native';
import { colors } from '@/shared/theme/colors';
import { typography } from '@/shared/theme/typography';
import type { TypographyToken } from '@/shared/theme/typography';

interface TextProps {
  children: React.ReactNode;
  variant?: TypographyToken;
  color?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export function Text({
  children,
  variant = 'bodyMedium',
  color = colors.textPrimary,
  style,
  numberOfLines,
}: TextProps) {
  return (
    <RNText
      style={[typography[variant], { color }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}
