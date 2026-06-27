/**
 * useDashboard — assembles all dashboard data from mock services.
 *
 * In Phase 4, the mock imports will be replaced with TanStack Query hooks
 * that fetch from Supabase. The hook's return shape stays identical,
 * so all consuming components remain untouched.
 */

import {
  mockUser,
  mockNutritionLog,
  mockWeightTrend,
  mockTodayWorkout,
  mockAIDailyBrief,
  mockSteps,
} from '../mock';
import { colors } from '../../../shared/theme';
import type { KPICardData } from '../types';

export function useDashboard() {
  const { goals } = mockUser;
  const { totalMacros } = mockNutritionLog;

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
      value: `${(mockWeightTrend.current * 2.20462).toFixed(1)}`,
      unit: 'lbs',
      trend: mockWeightTrend.direction,
      trendLabel: `${mockWeightTrend.weeklyChange > 0 ? '+' : ''}${(mockWeightTrend.weeklyChange * 2.20462).toFixed(1)} lbs this week`,
      accentColor: colors.weight,
      accentColorMuted: colors.weightMuted,
    },
    {
      id: 'steps',
      label: 'Steps',
      value: mockSteps.today.toLocaleString(),
      current: mockSteps.today,
      goal: mockSteps.goal,
      progress: Math.min(mockSteps.today / mockSteps.goal, 1),
      trend: mockSteps.today >= mockSteps.goal ? 'up' : 'stable',
      trendLabel: `${mockSteps.goal.toLocaleString()} goal`,
      accentColor: colors.steps,
      accentColorMuted: colors.stepsMuted,
    },
  ];

  return {
    user: mockUser,
    kpiCards,
    workout: mockTodayWorkout,
    aiDailyBrief: mockAIDailyBrief,
    nutritionLog: mockNutritionLog,
    weightTrend: mockWeightTrend,
  };
}
