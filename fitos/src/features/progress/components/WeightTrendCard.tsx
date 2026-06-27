import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing, radius } from '@/shared/theme/spacing';

interface WeightTrendCardProps {
  currentLbs: number;
  goalLbs: number;
  sevenDayAvgLbs: number;
  weeklyChangeLbs: number;
  sparkline: number[];
}

export function WeightTrendCard({
  currentLbs,
  goalLbs,
  sevenDayAvgLbs,
  weeklyChangeLbs,
  sparkline,
}: WeightTrendCardProps) {
  const toGoal = goalLbs - currentLbs;
  const weeklyChangeLabel = weeklyChangeLbs > 0
    ? `+${weeklyChangeLbs.toFixed(1)} lbs`
    : `${weeklyChangeLbs.toFixed(1)} lbs`;

  return (
    <Card padding={16}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
        WEIGHT
      </Text>

      <View style={styles.heroRow}>
        <View>
          <Text variant="displayMedium" color={colors.textPrimary}>
            {currentLbs.toFixed(1)}
          </Text>
          <Text variant="bodyMedium" color={colors.textTertiary}>
            lbs
          </Text>
        </View>
        <View style={styles.statsRight}>
          <StatLine label="Goal" value={`${goalLbs} lbs`} color={colors.accent} />
          <StatLine label="7-day avg" value={`${sevenDayAvgLbs.toFixed(1)} lbs`} color={colors.weight} />
          <StatLine
            label="This week"
            value={weeklyChangeLabel}
            color={weeklyChangeLbs >= 0 ? colors.success : colors.error}
          />
        </View>
      </View>

      <View style={styles.toGoalRow}>
        <Text variant="bodyMedium" color={colors.textSecondary}>
          {toGoal > 0
            ? `${toGoal.toFixed(1)} lbs to goal`
            : 'Goal reached 🎉'}
        </Text>
      </View>

      {/* Sparkline */}
      <View style={styles.sparklineContainer}>
        <Sparkline data={sparkline} color={colors.weight} />
      </View>
    </Card>
  );
}

interface StatLineProps { label: string; value: string; color: string }
function StatLine({ label, value, color }: StatLineProps) {
  return (
    <View style={styles.statLine}>
      <Text variant="caption" color={colors.textTertiary}>{label}</Text>
      <Text variant="labelLarge" color={color}>{value}</Text>
    </View>
  );
}

interface SparklineProps { data: number[]; color: string }
function Sparkline({ data, color }: SparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const HEIGHT = 48;

  return (
    <View style={[styles.sparkline, { height: HEIGHT }]}>
      {data.map((val, i) => {
        const normalized = (val - min) / range;
        const barH = Math.max(normalized * HEIGHT, 3);
        return (
          <View
            key={i}
            style={[
              styles.sparkBar,
              {
                height: barH,
                backgroundColor: i === data.length - 1 ? color : `${color}60`,
                borderRadius: 2,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: spacing[3] },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  statsRight: { gap: spacing[2], alignItems: 'flex-end' },
  statLine: { alignItems: 'flex-end', gap: 1 },
  toGoalRow: { marginBottom: spacing[3] },
  sparklineContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    paddingTop: spacing[3],
  },
  sparkline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  sparkBar: {
    flex: 1,
  },
});
