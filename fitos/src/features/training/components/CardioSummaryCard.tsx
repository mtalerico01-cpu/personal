import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';

interface CardioSummaryCardProps {
  steps: number;
  stepsGoal: number;
  activeCalories: number;
  distanceMiles: number;
  sessions: Array<{
    id: string;
    type: string;
    durationMinutes: number;
    calories: number;
    distanceMiles: number;
  }>;
}

export function CardioSummaryCard({
  steps,
  stepsGoal,
  activeCalories,
  distanceMiles,
  sessions,
}: CardioSummaryCardProps) {
  const stepsProgress = Math.min(steps / stepsGoal, 1);

  return (
    <View style={styles.container}>
      {/* KPI row */}
      <View style={styles.kpiRow}>
        <CardioKPI label="Steps" value={steps.toLocaleString()} color={colors.steps} />
        <CardioKPI label="Active Cal" value={`${activeCalories}`} color={colors.calories} />
        <CardioKPI label="Distance" value={`${distanceMiles}mi`} color={colors.weight} />
      </View>

      {/* Steps progress */}
      <Card padding={14}>
        <View style={styles.stepsHeader}>
          <Text variant="labelMedium" color={colors.textTertiary}>DAILY STEPS</Text>
          <Text variant="labelMedium" color={colors.textTertiary}>
            {steps.toLocaleString()} / {stepsGoal.toLocaleString()}
          </Text>
        </View>
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: `${stepsProgress * 100}%`, backgroundColor: colors.steps },
            ]}
          />
        </View>
        <Text variant="caption" color={colors.textTertiary} style={styles.stepsRemain}>
          {Math.max(stepsGoal - steps, 0).toLocaleString()} steps remaining
        </Text>
      </Card>

      {/* Sessions */}
      {sessions.map((session) => (
        <Card key={session.id} padding={14}>
          <View style={styles.sessionHeader}>
            <Text variant="headingSmall" color={colors.textPrimary}>{session.type}</Text>
            <Text variant="labelLarge" color={colors.accent}>{session.durationMinutes} min</Text>
          </View>
          <View style={styles.sessionStats}>
            <Text variant="bodyMedium" color={colors.textTertiary}>
              {session.calories} kcal · {session.distanceMiles} mi
            </Text>
          </View>
        </Card>
      ))}
    </View>
  );
}

interface CardioKPIProps { label: string; value: string; color: string }
function CardioKPI({ label, value, color }: CardioKPIProps) {
  return (
    <Card padding={12} style={styles.kpiCard}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.kpiLabel}>{label}</Text>
      <Text variant="displaySmall" color={color}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing[3] },
  kpiRow: { flexDirection: 'row', gap: spacing[3] },
  kpiCard: { flex: 1 },
  kpiLabel: { marginBottom: spacing[1] },
  stepsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  track: {
    height: 6,
    backgroundColor: colors.stepsMuted,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 3 },
  stepsRemain: { marginTop: spacing[1] },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sessionStats: {},
});
