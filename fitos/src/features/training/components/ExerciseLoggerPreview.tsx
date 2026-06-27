import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing, radius } from '@/shared/theme/spacing';
import type { WorkoutExercise } from '../../../types';

interface ExerciseLoggerPreviewProps {
  exercises: WorkoutExercise[];
}

export function ExerciseLoggerPreview({ exercises }: ExerciseLoggerPreviewProps) {
  const [activeExercise, setActiveExercise] = useState(0);
  const exercise = exercises[activeExercise];

  return (
    <Card padding={16}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
        EXERCISE LOGGER
      </Text>

      {/* Exercise selector pills */}
      <View style={styles.exercisePills}>
        {exercises.slice(0, 4).map((ex, i) => (
          <TouchableOpacity
            key={ex.id}
            onPress={() => setActiveExercise(i)}
            style={[
              styles.pill,
              activeExercise === i && styles.pillActive,
            ]}
          >
            <Text
              variant="caption"
              color={activeExercise === i ? colors.background : colors.textTertiary}
              numberOfLines={1}
            >
              {ex.exerciseName.split(' ')[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Active exercise */}
      <Text variant="headingSmall" color={colors.textPrimary} style={styles.exName}>
        {exercise.exerciseName}
      </Text>

      {/* Set rows */}
      <View style={styles.setHeader}>
        <Text variant="labelMedium" color={colors.textTertiary} style={styles.setNum}>SET</Text>
        <Text variant="labelMedium" color={colors.textTertiary} style={styles.col}>KG</Text>
        <Text variant="labelMedium" color={colors.textTertiary} style={styles.col}>REPS</Text>
        <View style={styles.checkCol} />
      </View>

      {exercise.sets.map((set) => (
        <View key={set.id} style={styles.setRow}>
          <Text variant="labelLarge" color={colors.textTertiary} style={styles.setNum}>
            {set.setNumber}
          </Text>
          <View style={[styles.col, styles.inputBox]}>
            <Text variant="bodyMedium" color={colors.textPrimary}>{set.weightKg}</Text>
          </View>
          <View style={[styles.col, styles.inputBox]}>
            <Text variant="bodyMedium" color={colors.textPrimary}>{set.reps}</Text>
          </View>
          <View style={styles.checkCol}>
            <View style={[styles.checkbox, set.completed && styles.checkboxDone]}>
              {set.completed && (
                <Text variant="caption" color={colors.background}>✓</Text>
              )}
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addSetButton}>
        <Text variant="labelLarge" color={colors.accent}>+ Add Set</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: spacing[3] },
  exercisePills: {
    flexDirection: 'row',
    gap: spacing[2],
    marginBottom: spacing[4],
    flexWrap: 'wrap',
  },
  pill: {
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    maxWidth: 90,
  },
  pillActive: {
    backgroundColor: colors.training,
    borderColor: colors.training,
  },
  exName: { marginBottom: spacing[3] },
  setHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    marginBottom: spacing[1],
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  setNum: { width: 32 },
  col: { flex: 1, alignItems: 'center' },
  inputBox: {
    backgroundColor: colors.surfaceElevated,
    paddingVertical: 6,
    borderRadius: radius.sm,
    marginHorizontal: 4,
  },
  checkCol: { width: 40, alignItems: 'center' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  addSetButton: {
    marginTop: spacing[3],
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
});
