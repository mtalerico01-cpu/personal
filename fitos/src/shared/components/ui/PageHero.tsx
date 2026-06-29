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
          backgroundColor: theme.colors.surface.default,
          shadowOpacity: theme.mode === 'dark' ? 0.2 : 0.07,
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  rule: {
    width: 18,
    height: 1,
    borderRadius: 1,
  },
  eyebrow: {
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontWeight: '300',
    letterSpacing: 0.2,
  },
  detail: {
    marginTop: spacing[2],
    lineHeight: 21,
  },
});