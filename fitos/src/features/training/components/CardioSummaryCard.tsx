import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing, radius } from '@/shared/theme/spacing';

interface CardioSummaryCardProps {
  steps: number;
  stepsGoal: number;
  activeCalories: number;
  distanceMiles: number;
  cardioMinutesCompleted: number;
  cardioMinutesGoal: number;
  activity: string;
  intensity: string;
  recommendation: string;
  sessions?: Array<{
    id: string;
    type: string;
    durationMinutes: number;
    calories: number;
    distanceMiles: number;
  }>;
  onMarkComplete: () => void;
  onEditPlan: () => void;
}

export function CardioSummaryCard({
  steps,
  stepsGoal,
  activeCalories,
  distanceMiles,
  cardioMinutesCompleted,
  cardioMinutesGoal,
  activity,
  intensity,
  recommendation,
  sessions = [],
  onMarkComplete,
  onEditPlan,
}: CardioSummaryCardProps) {
  const theme = useActiveTheme();
  const safeStepsGoal = stepsGoal || 1;
  const stepsProgress = Math.min(steps / safeStepsGoal, 1);
  const cardioProgress = Math.min(cardioMinutesCompleted / Math.max(cardioMinutesGoal, 1), 1);

  return (
    <View style={styles.container}>
      {/* KPI row */}
      <View style={styles.kpiRow}>
        <CardioKPI label="Steps" value={steps.toLocaleString()} color={theme.colors.persona.core} />
        <CardioKPI label="Active Cal" value={`${activeCalories}`} color={theme.colors.status.info} />
        <CardioKPI label="Distance" value={`${distanceMiles}mi`} color={theme.colors.text.secondary} />
      </View>

      <Card padding={16}>
        <Text variant="labelMedium" color={colors.textTertiary} style={styles.sectionLabel}>CARDIO</Text>
        <View style={styles.planGrid}>
          <PlanStat label="Goal" value={`${cardioMinutesGoal} min`} />
          <PlanStat label="Completed" value={`${cardioMinutesCompleted} min`} />
        </View>
        <View style={styles.planBlock}>
          <Text variant="labelMedium" color={colors.textTertiary}>TODAY'S PLAN</Text>
          <Text variant="headingSmall" color={colors.textPrimary}>{activity || 'Cardio plan not set'}</Text>
          <Text variant="bodyMedium" color={colors.textSecondary}>{intensity || 'Intensity not set'}</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${cardioProgress * 100}%`, backgroundColor: theme.colors.persona.core }]} />
        </View>
        <View style={styles.recommendation}>
          <Text variant="labelMedium" color={colors.textTertiary}>RECOMMENDATION</Text>
          <Text variant="bodyMedium" color={colors.textSecondary}>{recommendation || 'Keep cardio light and consistent today.'}</Text>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.primaryAction, { backgroundColor: theme.colors.persona.core }]} onPress={onMarkComplete} activeOpacity={0.75}>
            <Text variant="labelLarge" color={theme.colors.text.inverse}>Mark complete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryAction, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.subtle }]} onPress={onEditPlan} activeOpacity={0.75}>
            <Text variant="labelLarge" color={colors.textSecondary}>Edit plan</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Steps progress */}
      <Card padding={14}>
        <View style={styles.stepsHeader}>
          <Text variant="labelMedium" color={colors.textTertiary}>DAILY STEPS</Text>
          <Text variant="labelMedium" color={colors.textTertiary}>
            {steps.toLocaleString()} / {safeStepsGoal.toLocaleString()}
          </Text>
        </View>
        <View style={styles.track}>
          <View
            style={[styles.fill, { width: `${stepsProgress * 100}%`, backgroundColor: theme.colors.persona.core }]}
          />
        </View>
        <Text variant="caption" color={colors.textTertiary} style={styles.stepsRemain}>
          {Math.max(safeStepsGoal - steps, 0).toLocaleString()} steps remaining
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

interface PlanStatProps { label: string; value: string }
function PlanStat({ label, value }: PlanStatProps) {
  return (
    <View style={styles.planStat}>
      <Text variant="labelMedium" color={colors.textTertiary}>{label}</Text>
      <Text variant="headingMedium" color={colors.textPrimary}>{value}</Text>
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
  sectionLabel: { marginBottom: spacing[3] },
  planGrid: { flexDirection: 'row', gap: spacing[3], marginBottom: spacing[4] },
  planStat: {
    flex: 1,
    gap: 4,
    padding: spacing[3],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.semantic.border.subtle,
    backgroundColor: colors.semantic.surface.subtle,
  },
  planBlock: { gap: spacing[1], marginBottom: spacing[3] },
  recommendation: { gap: spacing[1], marginTop: spacing[3] },
  actionRow: { flexDirection: 'row', gap: spacing[3], marginTop: spacing[4] },
  primaryAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderRadius: radius.lg,
  },
  secondaryAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderRadius: radius.lg,
    borderWidth: 1,
  },
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
