/**
 * MacroProgressBar — shows a labeled macro with a colored progress bar.
 * Used on both the Nutrition and Dashboard screens.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';

interface MacroProgressBarProps {
  label: string;
  current: number;
  goal: number;
  unit?: string;
  color: string;
  colorMuted: string;
}

export function MacroProgressBar({
  label,
  current,
  goal,
  unit = 'g',
  color,
  colorMuted,
}: MacroProgressBarProps) {
  const progress = Math.min(current / goal, 1);
  const remaining = Math.max(goal - current, 0);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text variant="labelLarge" color={colors.textSecondary}>
          {label}
        </Text>
        <Text variant="labelLarge" color={colors.textSecondary}>
          {current}
          <Text variant="caption" color={colors.textTertiary}>
            /{goal}{unit}
          </Text>
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: colorMuted }]}>
        <View
          style={[
            styles.fill,
            { width: `${progress * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
      <Text variant="caption" color={colors.textTertiary} style={styles.remaining}>
        {remaining}{unit} remaining
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[1],
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  remaining: {
    marginTop: 2,
  },
});
