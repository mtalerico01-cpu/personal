import type { InitialPlan } from '../../features/onboarding/types';
import type { WorkoutSession } from '../../types';

export type ActivePlanSource = 'onboarding' | 'coach' | 'manual' | 'ai';

export interface ActivePlanSnapshot {
  plan: InitialPlan;
  source: ActivePlanSource;
  activatedAt: string;
  nutritionGoals: {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  };
  todayWorkout: WorkoutSession;
  cardioPlan: {
    cardioMinutesGoal: number;
    activity: string;
    intensity: string;
    stepsGoal: number;
  };
  coachHandoff: {
    summary: string;
    details: string[];
    prompts: string[];
  };
  confidence: InitialPlan['confidence'];
  sourceReferences: string[];
}

export function deriveActivePlanSnapshot(plan: InitialPlan, options: { source?: ActivePlanSource; activatedAt?: string } = {}): ActivePlanSnapshot {
  const activatedAt = options.activatedAt ?? new Date().toISOString();
  return {
    plan,
    source: options.source ?? 'onboarding',
    activatedAt,
    nutritionGoals: {
      calories: plan.macros.calories.active,
      proteinGrams: plan.macros.proteinGrams.active,
      carbsGrams: plan.macros.carbsGrams.active,
      fatGrams: plan.macros.fatGrams.active,
    },
    todayWorkout: toWorkoutSession(plan, activatedAt),
    cardioPlan: {
      cardioMinutesGoal: plan.cardio.sessionsPerWeek * plan.cardio.minutesPerSession,
      activity: plan.cardio.activity,
      intensity: plan.cardio.intensity,
      stepsGoal: plan.dailyStepGoal.active,
    },
    coachHandoff: {
      summary: 'Your starting plan is ready.',
      details: [
        `You are set for ${plan.training.daysPerWeek} strength sessions per week with ${plan.macros.calories.active.toLocaleString()} calories per day.`,
        'Protein and training consistency are the main priorities for the next two weeks.',
      ],
      prompts: ['Review my workout plan', 'Explain my nutrition targets', 'Adjust my schedule', 'Show my dashboard'],
    },
    confidence: plan.confidence,
    sourceReferences: plan.sourceReferences ?? [],
  };
}

function toWorkoutSession(plan: InitialPlan, activatedAt: string): WorkoutSession {
  const workout = plan.training.workouts[0] ?? { name: plan.training.split, exercises: ['Press pattern', 'Row pattern', 'Squat pattern'] };
  return {
    id: `active-plan-workout-${plan.id}`,
    name: workout.name,
    date: activatedAt.slice(0, 10),
    status: 'planned',
    durationMinutes: plan.training.sessionLengthMinutes,
    exercises: workout.exercises.map((exercise, index) => ({
      id: `active-plan-exercise-${index}`,
      exerciseId: exercise.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      exerciseName: exercise,
      muscleGroups: ['Full body'],
      sets: [1, 2, 3].map((setNumber) => ({
        id: `active-plan-set-${index}-${setNumber}`,
        setNumber,
        reps: 10,
        completed: false,
      })),
    })),
  };
}