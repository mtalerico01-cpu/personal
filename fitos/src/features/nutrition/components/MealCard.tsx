import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing } from '@/shared/theme/spacing';
import type { Meal } from '../../../types';

interface MealCardProps {
  meal: Meal;
  mealNumber: number;
}

const mealTypeLabel: Record<Meal['type'], string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

export function MealCard({ meal, mealNumber }: MealCardProps) {
  const theme = useActiveTheme();

  return (
    <Card padding={14}>
      <View style={styles.header}>
        <View>
          <Text variant="caption" color={colors.textTertiary}>
            MEAL {mealNumber} · {mealTypeLabel[meal.type].toUpperCase()}
          </Text>
          <Text variant="headingSmall" color={colors.textPrimary} style={styles.calories}>
            {meal.totalMacros.calories} kcal
          </Text>
        </View>
        <View style={styles.addButton}>
          <Text variant="labelMedium" color={colors.textDisabled}>
            Coming later
          </Text>
        </View>
      </View>

      {/* Macro pills */}
      <View style={styles.macroRow}>
        <MacroPill value={meal.totalMacros.proteinGrams} label="P" color={theme.colors.status.info} />
        <MacroPill value={meal.totalMacros.carbsGrams} label="C" color={theme.colors.persona.core} />
        <MacroPill value={meal.totalMacros.fatGrams} label="F" color={theme.colors.status.warning} />
      </View>

      {/* Food entries */}
      {meal.entries.map((entry) => (
        <View key={entry.id} style={[styles.entryRow, { borderTopColor: theme.colors.border.subtle }]}> 
          <Text variant="bodyMedium" color={colors.textSecondary} numberOfLines={1} style={styles.entryName}>
            {entry.foodItem.name}
          </Text>
          <Text variant="caption" color={colors.textTertiary}>
            {entry.foodItem.macros.calories} kcal
          </Text>
        </View>
      ))}
    </Card>
  );
}

interface MacroPillProps {
  value: number;
  label: string;
  color: string;
}

function MacroPill({ value, label, color }: MacroPillProps) {
  return (
    <View style={[styles.pill, { borderColor: color }]}>
      <Text variant="labelMedium" color={color}>
        {label} {value}g
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[3],
  },
  calories: {
    marginTop: 2,
  },
  addButton: {
    paddingVertical: spacing[1],
  },
  macroRow: {
    flexDirection: 'row',
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  pill: {
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
  },
  entryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing[2],
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  entryName: {
    flex: 1,
    marginRight: spacing[3],
  },
});
