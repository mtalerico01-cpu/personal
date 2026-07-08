import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing } from '@/shared/theme/spacing';
import type { KPICardData } from '../types';

// Status derived from theme tokens at render time — see deriveStatusColor()
type KPIStatus = 'empty' | 'inProgress' | 'complete';

function deriveStatus(current?: number, progress?: number): KPIStatus {
  if (current === undefined || current === null || current === 0) return 'empty';
  if ((progress ?? 0) >= 1) return 'complete';
  return 'inProgress';
}

interface KPICardProps {
  data: KPICardData;
}

export function KPICard({ data }: KPICardProps) {
  const theme = useActiveTheme();
  const { label, value, unit, progress, trendLabel, current } = data;

  // Metrics without a goal (e.g. Weight) are tracking-only — no status dot, always primary text
  const hasGoal = progress !== undefined;
  const status = hasGoal ? deriveStatus(current, progress) : null;
  const statusColor = status === 'complete' ? theme.colors.persona.core
    : status === 'inProgress' ? theme.colors.status.warning
    : theme.colors.text.disabled;

  return (
    <Card style={styles.card} padding={14}>
      {/* Header row: label + status dot (only when goal-based) */}
      <View style={styles.header}>
        <Text variant="labelMedium" color={colors.textTertiary}>
          {label.toUpperCase()}
        </Text>
        {hasGoal && <View style={[styles.statusDot, { backgroundColor: statusColor }]} />}
      </View>

      {/* Primary value */}
      <View style={styles.valueRow}>
        <Text variant="displaySmall" color={status === 'empty' ? colors.textTertiary : colors.textPrimary}>
          {value}
        </Text>
        {unit && (
          <Text variant="bodyMedium" color={colors.textTertiary} style={styles.unit}>
            {unit}
          </Text>
        )}
      </View>

      {/* Progress bar — colored by status */}
      {progress !== undefined && (
        <View style={[styles.progressTrack, { backgroundColor: theme.colors.border.subtle }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(progress * 100, 100)}%`,
                backgroundColor: statusColor,
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
  statusDot: {
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
