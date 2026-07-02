import type { DailyMacroPlanDay, InitialPlan, OnboardingAnswers, WeeklyPlanDay } from '../types';
import type { RecommendationConfidence, RecommendationMetadata, RecommendationRationale, RecommendationWarning } from '../../../domain/recommendations/types';
import { calculateEnergyNeeds } from './calculateEnergyNeeds';
import { calculateMacroTargets } from './calculateMacroTargets';
import { evaluateOnboardingSafety } from './evaluateOnboardingSafety';
import { generateCardioPlan } from './generateCardioPlan';
import { generateTrainingPlan } from './generateTrainingPlan';

export function generateInitialPlan(answers: OnboardingAnswers): InitialPlan {
  const safety = evaluateOnboardingSafety(answers);
  const energy = calculateEnergyNeeds(answers, safety);
  const macros = calculateMacroTargets(answers, energy.calorieGoal);
  const training = generateTrainingPlan(answers);
  const cardio = generateCardioPlan(answers);
  const mealStructure = buildMealStructure(answers);
  const weeklySchedule = buildWeeklySchedule(training, cardio);
  const metadata = mergeMetadata(energy.metadata, macros.metadata, {
    confidence: safety.confidence ?? 'high',
    assumptions: [],
    warnings: safety.warnings ?? [],
    rationale: [],
    sourceIds: safety.sourceReferences ?? [],
  });
  const now = new Date();
  const reviewDate = new Date(now);
  reviewDate.setDate(reviewDate.getDate() + 14);

  return {
    id: `initial-plan-${now.getTime()}`,
    status: 'draft',
    createdAt: now.toISOString(),
    goalLabel: getGoalLabel(answers.primaryGoal),
    explanation: buildExplanation(answers, energy.maintenanceCalories, metadata),
    maintenanceCalories: {
      estimated: energy.maintenanceCalories,
      active: energy.maintenanceCalories,
      source: 'system_estimate',
      confidence: energy.metadata.confidence,
      sourceReferences: energy.metadata.sourceIds,
      rationale: energy.metadata.rationale.map((item) => item.ruleId).join(', '),
    },
    macros,
    training,
    cardio,
    dailyStepGoal: buildStepTarget(answers),
    mealStructure,
    weeklySchedule,
    dailyMacroPlan: buildDailyMacroPlan(weeklySchedule, macros, mealStructure, answers),
    expectedRate: energy.expectedRate,
    firstReviewDate: reviewDate.toISOString().slice(0, 10),
    safetyLevel: safety.level,
    confidence: metadata.confidence,
    assumptions: metadata.assumptions,
    warnings: metadata.warnings,
    rationale: metadata.rationale,
    sourceReferences: metadata.sourceIds,
  };
}

function mergeMetadata(...items: Array<RecommendationMetadata | undefined>): RecommendationMetadata {
  const present = items.filter(Boolean) as RecommendationMetadata[];
  const warnings = present.flatMap((item) => item.warnings);
  const confidence = getLowestConfidence(present.map((item) => item.confidence));
  const rationale = present.flatMap((item) => item.rationale);
  return {
    confidence,
    assumptions: Array.from(new Set(present.flatMap((item) => item.assumptions))),
    warnings,
    rationale,
    sourceIds: Array.from(new Set([...present.flatMap((item) => item.sourceIds), ...warnings.flatMap((warning) => warning.sourceIds ?? []), ...rationale.flatMap((item) => item.sourceIds)])),
  };
}

function getLowestConfidence(values: RecommendationConfidence[]) {
  if (values.includes('low')) return 'low';
  if (values.includes('medium')) return 'medium';
  return 'high';
}

function buildWeeklySchedule(training: InitialPlan['training'], cardio: InitialPlan['cardio']): WeeklyPlanDay[] {
  const days: WeeklyPlanDay['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const trainingIndexesByDays: Record<number, number[]> = {
    1: [0],
    2: [1, 3],
    3: [0, 2, 4],
    4: [0, 1, 3, 4],
    5: [0, 1, 3, 4, 5],
    6: [0, 1, 2, 3, 4, 5],
  };
  const trainingIndexes = trainingIndexesByDays[Math.min(6, Math.max(1, training.daysPerWeek))] ?? trainingIndexesByDays[3];
  const schedule = days.map<WeeklyPlanDay>((day, index) => {
    const trainingPosition = trainingIndexes.indexOf(index);
    const workout = trainingPosition >= 0 ? training.workouts[trainingPosition % training.workouts.length] : undefined;
    return workout ? {
      day,
      focus: 'strength',
      workoutName: workout.name,
      workoutFocus: workout.exercises,
      notes: `${training.sessionLengthMinutes} min strength session`,
    } : {
      day,
      focus: 'recovery',
      notes: 'Recovery, mobility, or easy steps',
    };
  });

  const restIndexes = schedule.map((item, index) => item.focus === 'recovery' ? index : -1).filter((index) => index >= 0);
  const cardioIndexes = Array.from({ length: cardio.sessionsPerWeek }, (_, index) => restIndexes[index % restIndexes.length] ?? trainingIndexes[index % trainingIndexes.length] ?? index % 7);

  cardioIndexes.forEach((index) => {
    const current = schedule[index];
    schedule[index] = {
      ...current,
      focus: current.focus === 'strength' ? 'strength_cardio' : 'cardio',
      cardioActivity: cardio.activity,
      cardioMinutes: cardio.minutesPerSession,
      notes: current.focus === 'strength'
        ? `${current.notes} + ${cardio.minutesPerSession} min ${cardio.activity}`
        : `${cardio.minutesPerSession} min ${cardio.activity}`,
    };
  });

  return schedule;
}

function buildDailyMacroPlan(schedule: WeeklyPlanDay[], macros: InitialPlan['macros'], mealStructure: string, answers: OnboardingAnswers): DailyMacroPlanDay[] {
  const manual = answers.manualTargets?.status === 'completed';
  return schedule.map((day) => {
    const isTraining = day.focus === 'strength' || day.focus === 'strength_cardio';
    const isCardio = day.focus === 'cardio';
    const carbAdjustment = manual ? 0 : isTraining ? 25 : isCardio ? 10 : -15;
    const calorieAdjustment = manual ? 0 : carbAdjustment * 4;
    const dayType = day.focus === 'strength_cardio' ? 'training_cardio' : day.focus === 'strength' ? 'training' : day.focus === 'cardio' ? 'cardio' : 'recovery';
    return {
      day: day.day,
      dayType,
      calories: Math.max(1200, macros.calories.active + calorieAdjustment),
      proteinGrams: macros.proteinGrams.active,
      carbsGrams: Math.max(50, macros.carbsGrams.active + carbAdjustment),
      fatGrams: macros.fatGrams.active,
      mealStructure,
    };
  });
}

export function getGoalLabel(goal: OnboardingAnswers['primaryGoal']) {
  const labels: Record<NonNullable<OnboardingAnswers['primaryGoal']>, string> = {
    fat_loss: 'Lose body fat',
    muscle_gain: 'Build muscle',
    strength: 'Improve strength',
    recomposition: 'Body recomposition',
    general_health: 'Improve general health',
    maintenance: 'Maintain current progress',
    return_to_fitness: 'Return to fitness',
    athletic_performance: 'Improve athletic performance',
    cardiovascular_fitness: 'Improve cardiovascular fitness',
    endurance: 'Build endurance',
    mobility: 'Improve mobility',
    healthy_aging: 'Build healthy aging habits',
    event_preparation: 'Prepare for an event',
    custom: 'Custom goal',
  };
  return goal ? labels[goal] : 'Build consistency';
}

function buildExplanation(answers: OnboardingAnswers, maintenanceCalories: number, metadata: RecommendationMetadata) {
  const base = `This is a starting estimate based on your body profile, daily activity, and goal. Estimated maintenance is about ${maintenanceCalories} calories per day. Confidence: ${metadata.confidence}.`;
  if (answers.manualTargets?.status === 'completed') {
    return `${base} You provided manual targets, so Form Theory preserved them instead of overwriting your plan.`;
  }
  return `${base} Form Theory will compare this plan with your actual progress and recommend adjustments over time.`;
}

function buildStepTarget(answers: OnboardingAnswers) {
  const estimated = estimateSteps(answers);
  const manual = answers.dailyStepGoal ?? answers.manualTargets?.dailyStepGoal;
  return {
    estimated,
    active: manual ?? estimated,
    source: manual ? 'user_override' as const : 'system_estimate' as const,
  };
}

function estimateSteps(answers: OnboardingAnswers) {
  if (answers.estimatedStepsRange === 'under_4000') return 5000;
  if (answers.estimatedStepsRange === '4000_7000') return 7000;
  if (answers.estimatedStepsRange === '7000_10000') return 9000;
  if (answers.estimatedStepsRange === 'over_10000') return 11000;
  if (answers.activityLevel === 'sedentary') return 7000;
  if (answers.activityLevel === 'highly_active') return 11000;
  return 8000;
}

function buildMealStructure(answers: OnboardingAnswers) {
  if (answers.manualTargets?.currentMealPlanStructure) return answers.manualTargets.currentMealPlanStructure;
  if (answers.mealPlanStructure) return answers.mealPlanStructure;
  if (answers.mealsPerDay) return `${answers.mealsPerDay} meals per day`;
  return '3 flexible meals with a protein anchor';
}
