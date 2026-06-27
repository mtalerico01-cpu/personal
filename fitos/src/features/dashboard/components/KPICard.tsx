import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';
import type { KPICardData } from '../types';

interface KPICardProps {
  data: KPICardData;
}

export function KPICard({ data }: KPICardProps) {
  const { label, value, unit, progress, trendLabel, trend, accentColor, accentColorMuted } = data;

  return (
    <Card style={styles.card} padding={14}>
      {/* Header row: label + trend indicator */}
      <View style={styles.header}>
        <Text variant="labelMedium" color={colors.textTertiary}>
          {label.toUpperCase()}
        </Text>
        {trend && (
          <View style={[styles.trendDot, { backgroundColor: trendColor(trend, accentColor) }]} />
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
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(progress * 100, 100)}%`,
                backgroundColor: accentColor,
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

function trendColor(trend: 'up' | 'down' | 'stable', accentColor: string): string {
  if (trend === 'up') return colors.success;
  if (trend === 'down') return colors.error;
  return accentColor;
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
    backgroundColor: colors.border,
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
