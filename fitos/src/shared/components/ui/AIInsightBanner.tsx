/**
 * AIInsightBanner — inline AI coach callout.
 * Reusable across Nutrition, Training, and Progress screens.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors } from '@/shared/theme/colors';
import { spacing, radius } from '@/shared/theme/spacing';

interface AIInsightBannerProps {
  text: string;
  label?: string;
}

export function AIInsightBanner({ text, label = 'AI INSIGHT' }: AIInsightBannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <View style={styles.badge}>
          <Text variant="labelMedium" color={colors.accent}>
            {label}
          </Text>
        </View>
        <View style={styles.statusDot} />
      </View>
      <Text variant="bodyLarge" color={colors.textSecondary} style={styles.text}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(5, 8, 9, 0.66)',
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderLeftWidth: 2,
    borderColor: 'rgba(243,243,243,0.14)',
    borderLeftColor: 'rgba(168,255,62,0.45)',
    padding: spacing[4],
    gap: spacing[2],
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 22,
    elevation: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: 'rgba(168,255,62,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(168,255,62,0.14)',
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.85,
    shadowRadius: 8,
  },
  text: {
    lineHeight: 22,
  },
});
