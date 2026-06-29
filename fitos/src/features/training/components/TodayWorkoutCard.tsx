import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Badge } from '../../../shared/components/ui/Badge';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing } from '@/shared/theme/spacing';
import type { WorkoutSession } from '../../../types';

interface TodayWorkoutCardProps {
  workout: WorkoutSession;
  estimatedCalories: number;
}

export function TodayWorkoutCard({ workout, estimatedCalories }: TodayWorkoutCardProps) {
  const theme = useActiveTheme();
  const muscleGroups = [
    ...new Set(workout.exercises.flatMap((e) => e.muscleGroups)),
  ].slice(0, 4);

  return (
    <Card padding={16}>
      <View style={styles.header}>
        <View style={styles.left}>
          <Text variant="labelMedium" color={colors.textTertiary} style={styles.eyebrow}>
            TODAY'S WORKOUT
          </Text>
          <Text variant="headingMedium" color={colors.textPrimary}>
            {workout.name}
          </Text>
        </View>
        <Badge label="Planned" variant="neutral" />
      </View>

      <View style={styles.stats}>
        <Stat label="Duration" value={`${workout.durationMinutes}m`} color={theme.colors.persona.core} />
        <View style={[styles.divider, { backgroundColor: theme.colors.border.subtle }]} />
        <Stat label="Exercises" value={`${workout.exercises.length}`} color={theme.colors.persona.core} />
        <View style={[styles.divider, { backgroundColor: theme.colors.border.subtle }]} />
        <Stat label="Est. Cal" value={`${estimatedCalories}`} color={theme.colors.status.info} />
      </View>

      <View style={styles.muscleRow}>
        {muscleGroups.map((g) => (
          <View key={g} style={[styles.muscleTag, { backgroundColor: theme.colors.persona.soft }]}> 
            <Text variant="caption" color={colors.textSecondary}>{g}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

interface StatProps { label: string; value: string; color: string }
function Stat({ label, value, color }: StatProps) {
  return (
    <View style={styles.stat}>
      <Text variant="headingSmall" color={color}>{value}</Text>
      <Text variant="caption" color={colors.textTertiary}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[4],
  },
  left: { flex: 1, marginRight: spacing[3] },
  eyebrow: { marginBottom: 4 },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  stat: { flex: 1, alignItems: 'center' },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
  },
  muscleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  muscleTag: {
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: 6,
  },
});
