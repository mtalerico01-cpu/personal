import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { radius, spacing } from '@/shared/theme/spacing';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  detail?: string;
}

export function PageHero({ eyebrow, title, detail }: PageHeroProps) {
  const theme = useActiveTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: theme.colors.border.subtle,
          borderWidth: theme.mode === 'dark' ? 1 : 2,
          backgroundColor: theme.colors.surface.default,
          shadowOpacity: theme.mode === 'dark' ? 0.10 : 0,
          shadowRadius: theme.mode === 'dark' ? 12 : 0,
          elevation: theme.mode === 'dark' ? 1 : 0,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={[styles.rule, { backgroundColor: theme.colors.border.persona }]} />
        <Text variant="labelMedium" color={theme.colors.persona.core} style={styles.eyebrow}>
          {eyebrow}
        </Text>
      </View>
      <Text variant="headingLarge" color={theme.colors.text.primary} style={styles.title}>
        {title}
      </Text>
      {detail && (
        <Text variant="bodyMedium" color={theme.colors.text.secondary} style={styles.detail}>
          {detail}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[5],
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  rule: {
    width: 22,
    height: 2,
    borderRadius: 1,
  },
  eyebrow: {
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: '600',
    letterSpacing: 0,
  },
  detail: {
    marginTop: spacing[2],
    lineHeight: 21,
  },
});