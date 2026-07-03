/**
 * AIInsightBanner — inline Coach insight callout.
 * Reusable across Nutrition, Training, and Progress screens.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { SparklesIcon } from './NavIcon';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing, radius } from '@/shared/theme/spacing';

interface AIInsightBannerProps {
  text: string;
  label?: string;
}

export function AIInsightBanner({ text, label = 'COACH INSIGHT' }: AIInsightBannerProps) {
  const theme = useActiveTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface.default,
          borderColor: theme.colors.border.subtle,
          borderLeftColor: theme.colors.border.persona,
          borderWidth: theme.mode === 'dark' ? 1 : 2,
          shadowOpacity: theme.mode === 'dark' ? 0.10 : 0,
          shadowRadius: theme.mode === 'dark' ? 12 : 0,
          elevation: theme.mode === 'dark' ? 1 : 0,
        },
      ]}
    >
      <View style={styles.labelRow}>
        <View style={[styles.badge, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.default }]}>
          <SparklesIcon color={theme.colors.persona.core} size={18} />
          <Text variant="labelMedium" color={theme.colors.persona.core}>
            {label}
          </Text>
        </View>
        <View style={[styles.statusDot, { backgroundColor: theme.colors.persona.core }]} />
      </View>
      <Text variant="bodyLarge" color={theme.colors.text.secondary} style={styles.text}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderLeftWidth: 2,
    padding: spacing[4],
    gap: spacing[2],
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  text: {
    lineHeight: 22,
  },
});
