import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing } from '@/shared/theme/spacing';
import type { KPICardData } from '../types';

interface KPICardProps {
  data: KPICardData;
}

export function KPICard({ data }: KPICardProps) {
  const theme = useActiveTheme();
  const { label, value, unit, progress, trendLabel, trend } = data;

  return (
    <Card style={styles.card} padding={14}>
      {/* Header row: label + trend indicator */}
      <View style={styles.header}>
        <Text variant="labelMedium" color={colors.textTertiary}>
          {label.toUpperCase()}
        </Text>
        {trend && (
          <View style={[styles.trendDot, { backgroundColor: trendColor(trend, theme) }]} />
        )}
      </View>

      {/* Primary value */}
      <View style={styles.valueRow}>
        <Text variant="displaySmall" color={colors.textPrimary}>
          {value}
        </Text>
        {unit && (
          <Text variant="bodyMedium" color={colors.textTertiary} style={styles.unit}>
            {unit}
          </Text>
        )}
      </View>

      {/* Progress bar */}
      {progress !== undefined && (
        <View style={[styles.progressTrack, { backgroundColor: theme.colors.border.subtle }]}> 
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(progress * 100, 100)}%`,
                backgroundColor: theme.colors.persona.core,
              },
            ]}
          />
        </View>
      )}

      {/* Trend label */}
      {trendLabel && (
        <Text variant="caption" color={colors.textTertiary} style={styles.trendLabel}>
          {trendLabel}
        </Text>
      )}
    </Card>
  );
}

function trendColor(trend: 'up' | 'down' | 'stable', theme: ReturnType<typeof useActiveTheme>): string {
  if (trend === 'up') return theme.colors.persona.core;
  if (trend === 'down') return theme.colors.status.error;
  return theme.colors.text.disabled;
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  },
  trendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    marginBottom: spacing[2],
  },
  unit: {
    marginBottom: 4,
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing[2],
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  trendLabel: {
    marginTop: 2,
  },
});
