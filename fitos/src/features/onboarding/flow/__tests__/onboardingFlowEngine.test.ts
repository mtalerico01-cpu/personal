import { onboardingFlowEngine } from '../onboardingFlowEngine';
import { isOnboardingStepComplete, validateOnboardingStep } from '../onboardingValidation';
import type { OnboardingAnswers } from '../../types';

const baseAnswers: OnboardingAnswers = {
  units: 'imperial',
  primaryGoal: 'fat_loss',
  planAggressiveness: 'balanced',
  nutritionTargetPreference: 'recommend_everything',
  dietPattern: 'balanced',
  macroPreference: 'higher_protein',
  restrictionsStatus: 'answered_none',
};

describe('onboardingFlowEngine', () => {
  it('skips manual targets when the user wants recommendations', () => {
    const visibleIds = onboardingFlowEngine.getVisibleSteps(baseAnswers).map((step) => step.id);

    expect(visibleIds).not.toContain('manual_targets');
    expect(onboardingFlowEngine.getNextStepId('nutrition_diet', baseAnswers)).toBe('cardio_current');
  });

  it('includes manual targets when the user knows any nutrition target', () => {
    const answers = { ...baseAnswers, nutritionTargetPreference: 'recommend_macros' } satisfies OnboardingAnswers;
    const visibleIds = onboardingFlowEngine.getVisibleSteps(answers).map((step) => step.id);

    expect(visibleIds).toContain('manual_targets');
    expect(onboardingFlowEngine.getNextStepId('nutrition_diet', answers)).toBe('manual_targets');
  });

  it('requires diet pattern, macro preference, target preference, and restrictions for nutrition setup', () => {
    const result = validateOnboardingStep('nutrition_diet', { ...baseAnswers, macroPreference: undefined });

    expect(result.isComplete).toBe(false);
    expect(result.missing).toContain('macroPreference');
    expect(isOnboardingStepComplete('nutrition_diet', baseAnswers)).toBe(true);
  });

  it('validates custom split details before continuing', () => {
    const missingCustom = validateOnboardingStep('workout_split', {
      workoutSplitStatus: 'enter',
      workoutSplit: 'custom',
    });

    expect(missingCustom.isComplete).toBe(false);
    expect(missingCustom.missing).toContain('customWorkoutSplit');
    expect(isOnboardingStepComplete('workout_split', { workoutSplitStatus: 'enter', workoutSplit: 'custom', customWorkoutSplit: 'chest, back' })).toBe(true);
  });
});