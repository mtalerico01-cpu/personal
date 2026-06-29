/**
 * AIInsightBanner — inline AI coach callout.
 * Reusable across Nutrition, Training, and Progress screens.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing, radius } from '@/shared/theme/spacing';

interface AIInsightBannerProps {
  text: string;
  label?: string;
}

export function AIInsightBanner({ text, label = 'AI INSIGHT' }: AIInsightBannerProps) {
  const theme = useActiveTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface.default,
          borderColor: theme.colors.border.subtle,
          borderLeftColor: theme.colors.border.persona,
          shadowOpacity: theme.mode === 'dark' ? 0.18 : 0.07,
        },
      ]}
    >
      <View style={styles.labelRow}>
        <View style={[styles.badge, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.default }]}> 
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
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 2,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.full,
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
