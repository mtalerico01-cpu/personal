import type { AIContext } from '../types';
import { getDayPartForTimezone, getLocalTimeString, getLocalDateString, getDayOfWeek } from './getDayPart';
import { brand } from '../../../branding/brand';
import { coachingStyles, type CoachingStyle } from '../../coach/styles/coachingStyles';
import { useUserStore } from '../../../store/userStore';
import { useNutritionStore } from '../../../store/nutritionStore';
import { useTrainingStore } from '../../../store/trainingStore';
import { useProgressStore } from '../../../store/progressStore';

/**
 * Builds the complete AIContext from shared Zustand stores.
 * This is the single source of truth for all AI functions.
 * Call this before any AI operation to get a fresh snapshot.
 */
export function buildAIContext(coachingStyle: CoachingStyle): AIContext {
  const userState = useUserStore.getState();
  const nutritionState = useNutritionStore.getState();
  const trainingState = useTrainingStore.getState();
  const progressState = useProgressStore.getState();

  const profile = userState.profile;
  const timezone = 'America/New_York';
  const dayPart = getDayPartForTimezone(timezone);
  const style = coachingStyles[coachingStyle];

  const nutritionGoals = nutritionState.goals;
  const nutritionLog = nutritionState.log;
  const remaining = nutritionState.remaining();

  const workout = trainingState.todayWorkout;
  const cardio = trainingState.cardio;

  return {
    user: {
      id: profile?.id ?? 'user-1',
      name: profile?.name ?? 'Alex',
      age: profile?.identity.age ?? 28,
      heightInches: profile?.body.heightCm ? Math.round(profile.body.heightCm / 2.54) : 70,
      currentWeight: progressState.currentWeightLbs,
      goalWeight: progressState.goalWeightLbs,
      primaryGoal: mapGoalToAIContext(profile?.planGoals.primaryGoal),
      trainingExperience: mapTrainingExperience(profile?.training.experience),
      timezone: profile?.identity.timezone ?? timezone,
      preferredDiet: profile?.nutrition.eatingStyles[0] ?? 'standard',
    },

    persona: {
      id: coachingStyle,
      name: brand.coachName,
      role: brand.subtitle,
      tone: style.toneInstructions,
    },

    time: {
      nowISO: new Date().toISOString(),
      localDate: getLocalDateString(timezone),
      localTime: getLocalTimeString(timezone),
      dayOfWeek: getDayOfWeek(timezone),
      dayPart,
    },

    nutrition: {
      calorieGoal: nutritionGoals.calories,
      caloriesConsumed: nutritionLog.totalMacros.calories,
      caloriesRemaining: remaining.calories,
      proteinGoal: nutritionGoals.proteinGrams,
      proteinConsumed: nutritionLog.totalMacros.proteinGrams,
      proteinRemaining: remaining.proteinGrams,
      carbGoal: nutritionGoals.carbsGrams,
      carbsConsumed: nutritionLog.totalMacros.carbsGrams,
      carbsRemaining: remaining.carbsGrams,
      fatGoal: nutritionGoals.fatGrams,
      fatConsumed: nutritionLog.totalMacros.fatGrams,
      fatRemaining: remaining.fatGrams,
      mealsLogged: nutritionLog.meals.length,
      hydrationProgress: nutritionLog.waterMl / 3000,
    },

    training: {
      scheduledWorkoutName: workout?.name ?? null,
      scheduledBodyParts: workout?.exercises.flatMap((e) => e.muscleGroups ?? []) ?? [],
      completed: trainingState.workoutCompleted,
      durationMinutes: workout?.durationMinutes ?? null,
      estimatedCalories: 420,
      cardioGoalMinutes: cardio.cardioMinutesGoal,
      cardioCompletedMinutes: cardio.cardioMinutesCompleted,
    },

    progress: {
      currentWeight: progressState.currentWeightLbs,
      sevenDayAverage: progressState.sevenDayAvgLbs,
      weeklyWeightChange: progressState.weeklyChangeLbs,
      goalWeight: progressState.goalWeightLbs,
      strengthScore: progressState.strengthScore,
      strengthScoreChange: progressState.strengthScoreChangeThisMonth,
      estimatedOneRepMaxes: progressState.estimatedOneRepMaxes,
    },

    recovery: {
      sleepHours: 7.5,
      sleepQuality: 78,
      steps: cardio.steps,
      activeCalories: cardio.activeCalories,
      restingHeartRate: 58,
    },

    plan: {
      name: 'Lean Bulk — Phase 1',
      status: 'active',
      startDate: '2026-06-01',
      targetDate: '2026-09-01',
    },
  };
}

function mapGoalToAIContext(goal: string | undefined): AIContext['user']['primaryGoal'] {
  if (goal === 'fat_loss') return 'lose';
  if (goal === 'muscle_gain' || goal === 'strength' || goal === 'athletic_performance') return 'gain';
  if (goal === 'recomposition') return 'recomp';
  if (goal === 'cardiovascular_fitness' || goal === 'endurance' || goal === 'event_preparation') return 'maintain';
  return 'maintain';
}

function mapTrainingExperience(experience: string | undefined): AIContext['user']['trainingExperience'] {
  if (experience === 'advanced' || experience === 'athlete') return 'advanced';
  if (experience === 'intermediate') return 'intermediate';
  return 'beginner';
}
