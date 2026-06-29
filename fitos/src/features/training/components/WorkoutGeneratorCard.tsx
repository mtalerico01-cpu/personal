import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing, radius } from '@/shared/theme/spacing';
import type { GeneratedWorkout } from '../mock';

const DURATION_OPTIONS = [30, 45, 60, 90] as const;

interface WorkoutGeneratorCardProps {
  selected: number | null;
  onSelect: (minutes: number) => void;
  generated: GeneratedWorkout | null;
}

export function WorkoutGeneratorCard({
  selected,
  onSelect,
  generated,
}: WorkoutGeneratorCardProps) {
  const theme = useActiveTheme();

  return (
    <Card padding={16}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
        WORKOUT GENERATOR
      </Text>
      <Text variant="headingSmall" color={colors.textPrimary} style={styles.question}>
        How much time do you have?
      </Text>

      <View style={styles.optionRow}>
        {DURATION_OPTIONS.map((min) => (
          <TouchableOpacity
            key={min}
            onPress={() => onSelect(min)}
            activeOpacity={0.75}
            style={[
              styles.option,
              selected === min && styles.optionSelected,
              {
                borderColor: selected === min ? theme.colors.border.persona : theme.colors.border.default,
                backgroundColor: selected === min ? theme.colors.persona.core : theme.colors.surface.raised,
              },
            ]}
          >
            <Text
              variant="headingSmall"
              color={selected === min ? theme.colors.text.inverse : theme.colors.text.primary}
            >
              {min}
            </Text>
            <Text
              variant="caption"
              color={selected === min ? theme.colors.text.inverse : theme.colors.text.muted}
            >
              min
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {generated && (
        <View style={styles.generated}>
          <Text variant="labelMedium" color={theme.colors.persona.core} style={styles.generatedLabel}>
            GENERATED WORKOUT — {generated.durationMinutes} MIN
          </Text>
          {generated.exercises.map((ex, i) => (
            <View key={i} style={styles.exerciseRow}>
              <Text variant="bodyMedium" color={colors.textPrimary} style={styles.exName}>
                {ex.name}
              </Text>
              <Text variant="labelLarge" color={colors.textTertiary}>
                {ex.sets} × {ex.reps}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: spacing[2] },
  question: { marginBottom: spacing[4] },
  optionRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  optionSelected: {},
  generated: {
    marginTop: spacing[4],
    gap: 0,
  },
  generatedLabel: {
    marginBottom: spacing[3],
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  exName: {
    flex: 1,
  },
});
