import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { radius, spacing } from '@/shared/theme/spacing';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { InitialPlan } from '../types';

interface PlanSummaryProps {
  plan: InitialPlan;
}

export function PlanSummary({ plan }: PlanSummaryProps) {
  const theme = useActiveTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface.default, borderColor: theme.colors.border.default }]}> 
      <SummaryRow label="Goal" value={plan.goalLabel} />
      <SummaryRow label="Calories" value={`${plan.macros.calories.active.toLocaleString()} per day`} />
      <SummaryRow
        label="Macros"
        value={`${plan.macros.proteinGrams.active}g protein · ${plan.macros.carbsGrams.active}g carbs · ${plan.macros.fatGrams.active}g fat`}
      />
      <SummaryRow label="Training" value={`${plan.training.daysPerWeek} days · ${plan.training.split}`} />
      <SummaryRow label="Cardio" value={`${plan.cardio.sessionsPerWeek} x ${plan.cardio.minutesPerSession} min · ${plan.cardio.intensity}`} />
      <SummaryRow label="Steps" value={`${plan.dailyStepGoal.active.toLocaleString()} per day`} />
      <SummaryRow label="Meals" value={plan.mealStructure} />
      <SummaryRow label="Expected pace" value={plan.expectedRate} />
      <SummaryRow label="First review" value={plan.firstReviewDate} />
      {plan.safetyLevel !== 'standard' ? <SummaryRow label="Safety" value={plan.safetyLevel === 'restricted' ? 'Conservative guidance only' : 'Conservative start'} /> : null}
      <Text variant="caption" color={theme.colors.text.secondary} style={styles.explanation}>
        {plan.explanation}
      </Text>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  const theme = useActiveTheme();
  return (
    <View style={styles.row}>
      <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.label}>
        {label}
      </Text>
      <Text variant="bodyMedium" color={theme.colors.text.primary} style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing[5],
    gap: spacing[3],
  },
  row: {
    gap: 4,
  },
  label: {
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  value: {
    lineHeight: 22,
  },
  explanation: {
    marginTop: spacing[2],
    lineHeight: 20,
  },
});
