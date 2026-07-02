import type { ProfileCompleteness } from '@/types';
import type { OnboardingAnswers } from '../types';

export function calculateProfileCompleteness(answers: OnboardingAnswers): ProfileCompleteness {
  const essentials = average([
    has(answers.primaryGoal),
    has(answers.age),
    has(answers.heightCm),
    has(answers.currentWeightKg),
    has(answers.estimationSex),
    has(answers.units),
  ]);
  const goals = average([has(answers.primaryGoal), has(answers.motivation), has(answers.ratePreference)]);
  const training = average([
    has(answers.trainingExperience),
    has(answers.trainingDaysPerWeek),
    hasList(answers.preferredTrainingTypes),
    hasList(answers.equipment),
    has(answers.sessionLengthMinutes),
  ]);
  const nutrition = average([
    hasList(answers.eatingStyles),
    has(answers.restrictionsStatus),
    has(answers.mealsPerDay),
    has(answers.cookingPattern),
    has(answers.nutritionChallenge),
  ]);
  const lifestyle = average([
    has(answers.activityLevel),
    has(answers.estimatedStepsRange),
    has(answers.wakeTime) || has(answers.scheduleVaries),
    has(answers.preferredWorkoutTime),
  ]);
  const preferences = average([
    has(answers.coachingStyle),
    has(answers.appearance),
    has(answers.responseDetail),
    has(answers.accountability),
    has(answers.memoryPreference),
  ]);
  const integrations = hasList(answers.integrationInterest) ? 100 : 0;
  const overall = Math.round((essentials * 0.28 + goals * 0.12 + training * 0.18 + nutrition * 0.16 + lifestyle * 0.1 + preferences * 0.14 + integrations * 0.02));

  return { essentials, goals, training, nutrition, lifestyle, preferences, integrations, overall };
}

function has(value: unknown) {
  return value !== undefined && value !== null && value !== '';
}

function hasList(value: unknown[] | undefined) {
  return Boolean(value?.length);
}

function average(values: boolean[]) {
  return Math.round((values.filter(Boolean).length / values.length) * 100);
}
