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
      </View>
      <Text variant="bodyLarge" color={colors.textSecondary} style={styles.text}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentMuted,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accentDim,
    padding: spacing[4],
    gap: spacing[2],
  },
  labelRow: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  text: {
    lineHeight: 22,
  },
});
