/**
 * useDashboard — assembles all dashboard data from shared Zustand stores.
 *
 * In Phase 4, mock imports will be replaced with TanStack Query hooks
 * that fetch from Supabase. The hook's return shape stays identical.
 */

import {
  mockWeightTrend,
  mockTodayWorkout,
  mockAIDailyBrief,
} from '../mock';
import { useNutritionStore } from '../../../store/nutritionStore';
import { useProgressStore } from '../../../store/progressStore';
import { useTrainingStore } from '../../../store/trainingStore';
import { fallbackUserProfile, useUserStore } from '../../../store/userStore';
import { colors } from '../../../shared/theme';
import type { KPICardData } from '../types';

export function useDashboard() {
  const profile = useUserStore((state) => state.profile) ?? fallbackUserProfile;
  const { goals, log } = useNutritionStore();
  const { currentWeightLbs, weeklyChangeLbs } = useProgressStore();
  const { todayWorkout, cardio } = useTrainingStore();
  const totalMacros = log.totalMacros;
  const workout = todayWorkout ?? mockTodayWorkout;

  const kpiCards: KPICardData[] = [
    {
      id: 'calories',
      label: 'Calories',
      value: totalMacros.calories.toLocaleString(),
      unit: 'kcal',
      current: totalMacros.calories,
      goal: goals.calories,
      progress: Math.min(totalMacros.calories / goals.calories, 1),
      trend: totalMacros.calories < goals.calories ? 'stable' : 'up',
      trendLabel: `${goals.calories - totalMacros.calories > 0 ? goals.calories - totalMacros.calories : 0} remaining`,
      accentColor: colors.calories,
      accentColorMuted: colors.caloriesMuted,
    },
    {
      id: 'protein',
      label: 'Protein',
      value: `${totalMacros.proteinGrams}`,
      unit: 'g',
      current: totalMacros.proteinGrams,
      goal: goals.proteinGrams,
      progress: Math.min(totalMacros.proteinGrams / goals.proteinGrams, 1),
      trend: totalMacros.proteinGrams >= goals.proteinGrams * 0.9 ? 'up' : 'stable',
      trendLabel: `${goals.proteinGrams}g goal`,
      accentColor: colors.protein,
      accentColorMuted: colors.proteinMuted,
    },
    {
      id: 'carbs',
      label: 'Carbs',
      value: `${totalMacros.carbsGrams}`,
      unit: 'g',
      current: totalMacros.carbsGrams,
      goal: goals.carbsGrams,
      progress: Math.min(totalMacros.carbsGrams / goals.carbsGrams, 1),
      trend: 'stable',
      trendLabel: `${goals.carbsGrams}g goal`,
      accentColor: colors.carbs,
      accentColorMuted: colors.carbsMuted,
    },
    {
      id: 'fat',
      label: 'Fat',
      value: `${totalMacros.fatGrams}`,
      unit: 'g',
      current: totalMacros.fatGrams,
      goal: goals.fatGrams,
      progress: Math.min(totalMacros.fatGrams / goals.fatGrams, 1),
      trend: 'stable',
      trendLabel: `${goals.fatGrams}g goal`,
      accentColor: colors.fat,
      accentColorMuted: colors.fatMuted,
    },
    {
      id: 'weight',
      label: 'Weight',
      value: `${currentWeightLbs.toFixed(1)}`,
      unit: 'lbs',
      trend: weeklyChangeLbs < 0 ? 'down' : weeklyChangeLbs > 0 ? 'up' : 'stable',
      trendLabel: `${weeklyChangeLbs > 0 ? '+' : ''}${weeklyChangeLbs.toFixed(1)} lbs this week`,
      accentColor: colors.weight,
      accentColorMuted: colors.weightMuted,
    },
    {
      id: 'steps',
      label: 'Steps',
      value: cardio.steps.toLocaleString(),
      current: cardio.steps,
      goal: cardio.stepsGoal,
      progress: Math.min(cardio.steps / cardio.stepsGoal, 1),
      trend: cardio.steps >= cardio.stepsGoal ? 'up' : 'stable',
      trendLabel: `${cardio.stepsGoal.toLocaleString()} goal`,
      accentColor: colors.steps,
      accentColorMuted: colors.stepsMuted,
    },
  ];

  return {
    user: profile,
    kpiCards,
    workout,
    aiDailyBrief: mockAIDailyBrief,
    nutritionLog: log,
    weightTrend: mockWeightTrend,
  };
}
