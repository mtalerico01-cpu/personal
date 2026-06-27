import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
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
        <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
          <Text variant="labelLarge" color={colors.accent}>
            + Add
          </Text>
        </TouchableOpacity>
      </View>

      {/* Macro pills */}
      <View style={styles.macroRow}>
        <MacroPill value={meal.totalMacros.proteinGrams} label="P" color={colors.protein} />
        <MacroPill value={meal.totalMacros.carbsGrams} label="C" color={colors.carbs} />
        <MacroPill value={meal.totalMacros.fatGrams} label="F" color={colors.fat} />
      </View>

      {/* Food entries */}
      {meal.entries.map((entry) => (
        <View key={entry.id} style={styles.entryRow}>
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
    borderTopColor: colors.border,
  },
  entryName: {
    flex: 1,
    marginRight: spacing[3],
  },
});
