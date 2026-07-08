import type { UserGoals, UserProfile } from '@/types';
import type { InitialPlan, OnboardingAnswers, OnboardingDraftState } from '../types';
import { calculateProfileCompleteness } from './calculateProfileCompleteness';

export function buildUserProfileFromOnboarding(draft: OnboardingDraftState, plan: InitialPlan): UserProfile {
  const answers = draft.answers;
  const firstName = answers.firstName || 'Alex';
  const currentWeightKg = answers.currentWeightKg ?? 82;
  const targetWeightKg = answers.targetWeightKg;
  const goals: UserGoals = {
    calories: plan.macros.calories.active,
    proteinGrams: plan.macros.proteinGrams.active,
    carbsGrams: plan.macros.carbsGrams.active,
    fatGrams: plan.macros.fatGrams.active,
    weightGoalKg: targetWeightKg ?? currentWeightKg,
    dailySteps: getStepsGoal(answers.estimatedStepsRange),
  };

  return {
    id: 'user-001',
    identity: {
      firstName,
      username: answers.username?.trim() || undefined,
      age: answers.age,
      estimationSex: answers.estimationSex ?? 'not_used',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
      units: answers.units ?? 'imperial',
    },
    body: {
      heightCm: answers.heightCm ?? 178,
      currentWeightKg,
      targetWeightKg,
      bodyFatPercentage: answers.bodyFatPercentage,
      weightGoalType: answers.weightGoalType ?? (targetWeightKg ? 'target_weight' : 'unknown'),
    },
    planGoals: {
      primaryGoal: answers.primaryGoal ?? 'general_health',
      secondaryGoal: answers.secondaryGoal,
      secondaryGoals: answers.secondaryGoals,
      motivation: answers.motivation,
      ratePreference: answers.ratePreference,
      planAggressiveness: answers.planAggressiveness,
      targetKnowledge: answers.targetKnowledge,
    },
    lifestyle: {
      activityLevel: answers.activityLevel ?? 'light',
      estimatedStepsRange: answers.estimatedStepsRange,
      wakeTime: answers.wakeTime,
      bedtime: answers.bedtime,
      averageSleepHours: answers.averageSleepHours,
      stressLevel: answers.stressLevel,
      jobActivityType: answers.jobActivityType,
      recoveryConcerns: answers.recoveryConcerns,
      preferredWorkoutTime: answers.preferredWorkoutTime,
      scheduleVaries: answers.scheduleVaries,
    },
    training: {
      experience: answers.trainingExperience ?? 'beginner',
      structuredPlanStatus: answers.structuredPlanStatus,
      preferredTypes: answers.preferredTrainingTypes ?? [],
      daysPerWeek: answers.trainingDaysPerWeek ?? plan.training.daysPerWeek,
      sessionLengthMinutes: answers.sessionLengthMinutes ?? plan.training.sessionLengthMinutes,
      equipment: answers.equipment ?? [],
      workoutSplitStatus: answers.workoutSplitStatus,
      workoutSplit: answers.customWorkoutSplit ?? answers.manualTargets?.currentTrainingSplit ?? answers.workoutSplit,
      limitations: answers.limitations ?? [],
      likedExercises: answers.likedExercises ?? [],
      dislikedExercises: answers.dislikedExercises ?? [],
    },
    nutrition: {
      eatingStyles: answers.eatingStyles ?? [],
      allergies: answers.allergies ?? [],
      intolerances: answers.intolerances ?? [],
      restrictions: answers.restrictions ?? [],
      restrictionsStatus: answers.restrictionsStatus ?? 'skipped',
      dislikedFoods: answers.dislikedFoods ?? [],
      preferredFoods: answers.preferredFoods ?? [],
      preferredCuisines: answers.preferredCuisines ?? [],
      mealsPerDay: answers.mealsPerDay,
      mealPlanStructure: plan.mealStructure,
      favoriteProteinSources: answers.favoriteProteinSources,
      eatingSchedule: answers.eatingSchedule,
      mealPrepPreference: answers.mealPrepPreference,
      snacksPreferred: answers.snacksPreferred,
      cookingPattern: answers.cookingPattern,
      nutritionChallenge: answers.nutritionChallenge,
    },
    preferences: {
      appearance: answers.appearance ?? 'system',
      coachingStyle: answers.coachingStyle ?? 'balanced',
      responseDetail: answers.responseDetail ?? 'standard',
      accountability: answers.accountability ?? 'gentle',
      memoryPreference: answers.memoryPreference ?? 'ask_first',
    },
    onboarding: {
      status: 'completed',
      completedSections: draft.completedStepIds,
      skippedSections: draft.skippedStepIds,
      startedAt: draft.startedAt,
      completedAt: new Date().toISOString(),
      version: draft.version,
      onboardingComplete: true,
      answers: answers as unknown as Record<string, unknown>,
    },
    completeness: calculateProfileCompleteness(answers),
    memories: [],
    name: firstName,
    weightUnit: answers.units === 'metric' ? 'kg' : 'lbs',
    energyUnit: 'kcal',
    goals,
    createdAt: draft.startedAt ?? new Date().toISOString(),
  };
}

function getStepsGoal(range: OnboardingAnswers['estimatedStepsRange']) {
  if (range === 'under_4000') return 5000;
  if (range === '4000_7000') return 7000;
  if (range === '7000_10000') return 9000;
  if (range === 'over_10000') return 11000;
  return 8000;
}
