import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { Badge } from '../../../shared/components/ui/Badge';
import { colors } from '@/shared/theme/colors';
import { spacing, radius } from '@/shared/theme/spacing';
import type { WorkoutSession } from '../../../types';

interface TrainingCardProps {
  workout: WorkoutSession;
}

const statusBadgeVariant = (status: WorkoutSession['status']) => {
  switch (status) {
    case 'completed': return 'success';
    case 'in_progress': return 'accent';
    case 'skipped': return 'error';
    default: return 'neutral';
  }
};

const statusLabel = (status: WorkoutSession['status']) => {
  switch (status) {
    case 'completed': return 'Done';
    case 'in_progress': return 'In Progress';
    case 'skipped': return 'Skipped';
    default: return 'Planned';
  }
};

export function TrainingCard({ workout }: TrainingCardProps) {
  const totalSets = workout.exercises.reduce(
    (sum, ex) => sum + ex.sets.length,
    0,
  );
  const muscleGroups = [
    ...new Set(workout.exercises.flatMap((ex) => ex.muscleGroups)),
  ].slice(0, 3);

  return (
    <Card padding={16}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text variant="labelMedium" color={colors.textTertiary} style={styles.sectionLabel}>
            TODAY'S TRAINING
          </Text>
          <Text variant="headingSmall" color={colors.textPrimary} style={styles.workoutName}>
            {workout.name}
          </Text>
        </View>
        <Badge
          label={statusLabel(workout.status)}
          variant={statusBadgeVariant(workout.status)}
        />
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <Stat label="Exercises" value={`${workout.exercises.length}`} color={colors.training} />
        <View style={styles.statDivider} />
        <Stat label="Sets" value={`${totalSets}`} color={colors.training} />
        {workout.durationMinutes && (
          <>
            <View style={styles.statDivider} />
            <Stat label="Est. Time" value={`${workout.durationMinutes}m`} color={colors.training} />
          </>
        )}
      </View>

      {/* Muscle groups */}
      {muscleGroups.length > 0 && (
        <View style={styles.muscleRow}>
          {muscleGroups.map((group) => (
            <View key={group} style={styles.muscleTag}>
              <Text variant="caption" color={colors.textSecondary}>
                {group}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

interface StatProps {
  label: string;
  value: string;
  color: string;
}

function Stat({ label, value, color }: StatProps) {
  return (
    <View style={styles.stat}>
      <Text variant="headingSmall" color={color}>
        {value}
      </Text>
      <Text variant="caption" color={colors.textTertiary}>
        {label}
      </Text>
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
  headerLeft: {
    flex: 1,
    marginRight: spacing[3],
  },
  sectionLabel: {
    marginBottom: 4,
  },
  workoutName: {
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 28,
    backgroundColor: colors.border,
  },
  muscleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  muscleTag: {
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    backgroundColor: colors.trainingMuted,
    borderRadius: radius.sm,
  },
});
