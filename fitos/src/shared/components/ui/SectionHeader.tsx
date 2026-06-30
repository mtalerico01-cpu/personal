/**
 * SectionHeader — a labeled section divider with optional action button.
 * Keeps section headings consistent across all screens.
 */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing } from '@/shared/theme/spacing';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  const theme = useActiveTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={[styles.rule, { backgroundColor: theme.colors.border.persona }]} />
        <Text variant="labelLarge" color={theme.colors.text.primary} style={styles.title}>
          {title}
        </Text>
      </View>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={[
            styles.actionButton,
            { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.subtle },
          ]}
        >
          <Text variant="labelMedium" color={theme.colors.persona.core}>
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
  rule: {
    width: 20,
    height: 2,
    borderRadius: 1,
  },
  title: {
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: spacing[3],
    paddingVertical: 6,
  },
});
