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
    backgroundColor: 'rgba(5, 8, 9, 0.66)',
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(243,243,243,0.14)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.34,
    shadowRadius: 24,
    elevation: 5,
  },
  elevated: {
    backgroundColor: 'rgba(5, 8, 9, 0.76)',
    borderColor: 'rgba(243,243,243,0.18)',
    ...shadows.elevated,
  },
  flat: {
    backgroundColor: 'rgba(5, 8, 9, 0.42)',
    shadowOpacity: 0,
    elevation: 0,
  },
});
