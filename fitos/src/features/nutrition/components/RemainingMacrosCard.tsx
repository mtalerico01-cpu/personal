import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';

interface RemainingMacrosCardProps {
  calorieGoal: number;
  remaining: {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  };
}

export function RemainingMacrosCard({ calorieGoal, remaining }: RemainingMacrosCardProps) {
  if (remaining.calories === 0) {
    return (
      <Card padding={16}>
        <Text variant="labelMedium" color={colors.success}>
          ✓ Calorie goal reached
        </Text>
      </Card>
    );
  }

  return (
    <Card padding={16}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
        TO REACH YOUR GOAL
      </Text>
      <Text variant="bodyLarge" color={colors.textSecondary} style={styles.body}>
        To hit your{' '}
        <Text variant="bodyLarge" color={colors.textPrimary}>
          {calorieGoal.toLocaleString()} calorie
        </Text>{' '}
        goal, you still need{' '}
        <Text variant="bodyLarge" color={colors.protein}>
          {remaining.proteinGrams}g protein
        </Text>
        {', '}
        <Text variant="bodyLarge" color={colors.carbs}>
          {remaining.carbsGrams}g carbs
        </Text>
        {', and '}
        <Text variant="bodyLarge" color={colors.fat}>
          {remaining.fatGrams}g fat
        </Text>
        .
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing[2],
  },
  body: {
    lineHeight: 24,
  },
});
