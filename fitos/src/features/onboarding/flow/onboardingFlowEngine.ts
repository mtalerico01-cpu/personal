import type { OnboardingAnswers, OnboardingStepDefinition, OnboardingStepId } from '../types';
import { shouldShowOnboardingStep } from './onboardingConditions';
import { getNextStepId, getPreviousStepId, getSectionProgress, getVisibleSteps } from './onboardingTransitions';
import { validateOnboardingStep, type OnboardingValidationContext, type OnboardingValidationResult } from './onboardingValidation';
import { onboardingStepRegistry } from './onboardingStepRegistry';

export interface OnboardingFlowStep extends OnboardingStepDefinition {
  shouldShow: (answers: OnboardingAnswers) => boolean;
  validate: (answers: OnboardingAnswers, context?: OnboardingValidationContext) => OnboardingValidationResult;
  nextStep: (answers: OnboardingAnswers) => OnboardingStepId;
}

export function getOnboardingFlow(answers: OnboardingAnswers): OnboardingFlowStep[] {
  return onboardingStepRegistry
    .filter((step) => shouldShowOnboardingStep(step.id, answers))
    .map((step) => ({
      ...step,
      shouldShow: (nextAnswers: OnboardingAnswers) => shouldShowOnboardingStep(step.id, nextAnswers),
      validate: (nextAnswers: OnboardingAnswers, context?: OnboardingValidationContext) => validateOnboardingStep(step.id, nextAnswers, context),
      nextStep: (nextAnswers: OnboardingAnswers) => getNextStepId(step.id, nextAnswers),
    }));
}

export const onboardingFlowEngine = {
  getFlow: getOnboardingFlow,
  getVisibleSteps,
  getNextStepId,
  getPreviousStepId,
  getSectionProgress,
  shouldShowStep: shouldShowOnboardingStep,
  validateStep: validateOnboardingStep,
};