/**
 * SectionHeader — a labeled section divider with optional action button.
 * Keeps section headings consistent across all screens.
 */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.dot} />
        <Text variant="labelLarge" color={colors.textPrimary} style={styles.title}>
          {title}
        </Text>
      </View>
      {actionLabel && onAction && (
        <TouchableOpacity onPress={onAction} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={styles.actionButton}>
          <Text variant="labelMedium" color={colors.accent}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing[2],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  title: {
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  actionButton: {
    borderWidth: 1,
    borderColor: 'rgba(168,255,62,0.18)',
    borderRadius: 16,
    paddingHorizontal: spacing[3],
    paddingVertical: 6,
    backgroundColor: 'rgba(168,255,62,0.06)',
  },
});
