import type { OnboardingAnswers, OnboardingStepId } from '../types';

export function shouldShowOnboardingStep(stepId: OnboardingStepId, answers: OnboardingAnswers) {
  if (stepId === 'manual_targets') {
    return Boolean(answers.nutritionTargetPreference && answers.nutritionTargetPreference !== 'recommend_everything');
  }

  if (stepId === 'cardio_details') {
    return answers.cardioStatus === 'weekly' || answers.cardioStatus === 'specific_plan';
  }

  if (stepId === 'goal_affirmation') {
    return Boolean(answers.primaryGoal);
  }

  return true;
}