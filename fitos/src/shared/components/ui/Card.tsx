import React from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import { colors } from '@/shared/theme/colors';
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
  return (
    <View
      style={[
        styles.base,
        variant === 'elevated' && styles.elevated,
        variant === 'flat' && styles.flat,
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
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    ...shadows.card,
  },
  elevated: {
    backgroundColor: colors.surfaceElevated,
    ...shadows.elevated,
  },
  flat: {
    backgroundColor: colors.surface,
    shadowOpacity: 0,
    elevation: 0,
  },
});
