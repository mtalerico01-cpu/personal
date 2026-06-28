import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors } from '@/shared/theme/colors';
import { radius, spacing } from '@/shared/theme/spacing';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  detail?: string;
}

export function PageHero({ eyebrow, title, detail }: PageHeroProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.dot} />
        <Text variant="labelMedium" color={colors.accent} style={styles.eyebrow}>
          {eyebrow}
        </Text>
      </View>
      <Text variant="headingLarge" color={colors.textPrimary} style={styles.title}>
        {title}
      </Text>
      {detail && (
        <Text variant="bodyMedium" color={colors.textSecondary} style={styles.detail}>
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
    borderColor: 'rgba(243,243,243,0.14)',
    backgroundColor: 'rgba(5, 8, 9, 0.66)',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[5],
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 24,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  eyebrow: {
    letterSpacing: 2.2,
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