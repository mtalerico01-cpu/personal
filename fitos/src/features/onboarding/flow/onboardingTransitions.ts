import type { OnboardingAnswers, OnboardingSection, OnboardingStepDefinition, OnboardingStepId } from '../types';
import { shouldShowOnboardingStep } from './onboardingConditions';
import { onboardingStepRegistry } from './onboardingStepRegistry';

export function getStepIndex(stepId: OnboardingStepId) {
  return Math.max(0, onboardingStepRegistry.findIndex((step) => step.id === stepId));
}

export function getVisibleSteps(answers: OnboardingAnswers) {
  return onboardingStepRegistry.filter((step) => shouldShowOnboardingStep(step.id, answers));
}

export function getNextStepId(currentStepId: OnboardingStepId, answers: OnboardingAnswers) {
  const steps = getVisibleSteps(answers);
  const index = getVisibleIndex(steps, currentStepId);
  return steps[Math.min(index + 1, steps.length - 1)].id;
}

export function getPreviousStepId(currentStepId: OnboardingStepId, answers: OnboardingAnswers) {
  const steps = getVisibleSteps(answers);
  const index = getVisibleIndex(steps, currentStepId);
  return steps[Math.max(index - 1, 0)].id;
}

export function getSectionProgress(currentStepId: OnboardingStepId, answers: OnboardingAnswers) {
  const steps = getVisibleSteps(answers);
  const current = steps.find((step) => step.id === currentStepId) ?? steps[0];
  const sectionSteps = steps.filter((step) => step.section === current.section);
  const sectionIndex = sectionSteps.findIndex((step) => step.id === current.id);
  return {
    section: current.section,
    current: sectionIndex + 1,
    total: sectionSteps.length,
    sections: ['welcome', 'body', 'goals', 'training', 'nutrition', 'lifestyle', 'preferences', 'integrations', 'plan'] as readonly OnboardingSection[],
  };
}

function getVisibleIndex(steps: OnboardingStepDefinition[], currentStepId: OnboardingStepId) {
  const index = steps.findIndex((step) => step.id === currentStepId);
  return index >= 0 ? index : 0;
}