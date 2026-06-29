import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing, radius } from '@/shared/theme/spacing';
import type { WorkoutExercise } from '../../../types';

interface ExerciseLoggerPreviewProps {
  exercises: WorkoutExercise[];
}

export function ExerciseLoggerPreview({ exercises }: ExerciseLoggerPreviewProps) {
  const theme = useActiveTheme();
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
              {
                borderColor: activeExercise === i ? theme.colors.border.persona : theme.colors.border.default,
                backgroundColor: activeExercise === i ? theme.colors.persona.core : theme.colors.surface.subtle,
              },
            ]}
          >
            <Text
              variant="caption"
              color={activeExercise === i ? theme.colors.text.inverse : theme.colors.text.muted}
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
          <View style={[styles.col, styles.inputBox, { backgroundColor: theme.colors.surface.raised }]}> 
            <Text variant="bodyMedium" color={colors.textPrimary}>{set.weightKg}</Text>
          </View>
          <View style={[styles.col, styles.inputBox, { backgroundColor: theme.colors.surface.raised }]}> 
            <Text variant="bodyMedium" color={colors.textPrimary}>{set.reps}</Text>
          </View>
          <View style={styles.checkCol}>
            <View
              style={[
                styles.checkbox,
                { borderColor: theme.colors.border.default },
                set.completed && styles.checkboxDone,
                set.completed && { backgroundColor: theme.colors.persona.core, borderColor: theme.colors.border.persona },
              ]}
            >
              {set.completed && (
                <Text variant="caption" color={theme.colors.text.inverse}>✓</Text>
              )}
            </View>
          </View>
        </View>
      ))}

      <View style={styles.addSetButton}>
        <Text variant="labelLarge" color={colors.textDisabled}>Add Set · Coming later</Text>
      </View>
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
    maxWidth: 90,
  },
  pillActive: {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
  },
  addSetButton: {
    marginTop: spacing[3],
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
});
