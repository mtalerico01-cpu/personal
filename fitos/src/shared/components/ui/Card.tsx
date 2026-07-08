import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { radius, shadows } from '@/shared/theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Use 'elevated' for modals/sheets, default for standard cards */
  variant?: 'default' | 'elevated' | 'flat';
  padding?: number;
}

export function Card({
  children,
  style,
  variant = 'default',
  padding = 16,
}: CardProps) {
  const theme = useActiveTheme();
  const lightModeShadow = theme.mode === 'light' ? styles.flatShadow : null;
  const lightModeBorder = theme.mode === 'light' ? styles.lightBorder : null;
  const variantStyle =
    variant === 'elevated'
      ? { backgroundColor: theme.colors.surface.raised, borderColor: theme.colors.border.strong }
      : variant === 'flat'
        ? { backgroundColor: theme.colors.surface.subtle, shadowOpacity: 0, elevation: 0 }
        : { backgroundColor: theme.colors.surface.default, borderColor: theme.colors.border.subtle };

  return (
    <View
      style={[
        styles.base,
        variant === 'elevated' && styles.elevated,
        lightModeShadow,
        lightModeBorder,
        variantStyle,
        { padding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 2,
  },
  elevated: {
    ...shadows.elevated,
  },
  flatShadow: {
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  lightBorder: {
    borderWidth: 2,
  },
});
