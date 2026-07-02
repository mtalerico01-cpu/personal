import type { GeneratedCardioPlan, OnboardingAnswers } from '../types';

export function generateCardioPlan(answers: OnboardingAnswers): GeneratedCardioPlan {
  if (answers.manualTargets?.weeklyCardioSessions || answers.cardioStatus === 'specific_plan') {
    return {
      sessionsPerWeek: answers.manualTargets?.weeklyCardioSessions ?? answers.cardioSessionsPerWeek ?? 2,
      minutesPerSession: answers.manualTargets?.cardioDurationMinutes ?? answers.cardioDurationMinutes ?? 25,
      intensity: answers.cardioIntensity ?? 'User-provided intensity',
      activity: answers.manualTargets?.cardioType ?? answers.cardioType ?? 'User-provided cardio',
      rationale: 'Form Theory preserved your existing cardio target instead of replacing it.',
    };
  }

  const goal = answers.primaryGoal ?? 'general_health';
  const trainingDays = answers.trainingDaysPerWeek === 'varies' ? 3 : answers.trainingDaysPerWeek ?? 3;
  const lowActivity = answers.activityLevel === 'sedentary' || answers.activityLevel === 'light';

  if (goal === 'athletic_performance' || goal === 'cardiovascular_fitness' || goal === 'endurance' || goal === 'event_preparation') {
    return {
      sessionsPerWeek: goal === 'endurance' || goal === 'event_preparation' ? 4 : 3,
      minutesPerSession: goal === 'endurance' || goal === 'event_preparation' ? 35 : 30,
      intensity: 'Mostly easy with one moderate conditioning day',
      activity: goal === 'event_preparation' ? 'Event-specific cardio plus easy base work' : 'Run, bike, row, or low-impact cardio',
      rationale: 'Cardio-forward goals need a consistent aerobic base while keeping intensity controlled enough to recover from strength work.',
    };
  }

  if (goal === 'fat_loss') {
    return {
      sessionsPerWeek: lowActivity ? 3 : 2,
      minutesPerSession: lowActivity ? 25 : 20,
      intensity: 'Moderate Zone 2',
      activity: 'Incline walk or bike',
      rationale: 'A simple cardio base supports fat loss without relying on excessive volume.',
    };
  }

  return {
    sessionsPerWeek: trainingDays >= 4 ? 2 : 3,
    minutesPerSession: 20,
    intensity: 'Easy to moderate',
    activity: 'Walk, bike, or low-impact cardio',
    rationale: 'This keeps conditioning present without competing with recovery.',
  };
}
