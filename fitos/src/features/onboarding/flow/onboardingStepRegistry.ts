import type { OnboardingStepDefinition } from '../types';

export const onboardingStepRegistry: OnboardingStepDefinition[] = [
  { id: 'welcome_name', section: 'welcome', required: true, title: 'What should I call you?', explanation: 'Form Theory builds a coach around you, not just a calorie tracker.' },
  { id: 'body_profile', section: 'body', required: true, title: 'Tell us the essentials.', explanation: 'These biometrics power your first nutrition, training, cardio, and recovery recommendations.' },
  { id: 'goals', section: 'goals', required: true, title: 'What are we building toward?' },
  { id: 'experience_level', section: 'training', required: true, title: 'Where are you starting from?' },
  { id: 'activity', section: 'lifestyle', required: true, title: 'What is your normal day like?' },
  { id: 'training_availability', section: 'training', required: true, title: 'Set up your training.' },
  { id: 'workout_split', section: 'training', required: true, title: 'Pick your split.' },
  { id: 'limitations', section: 'training', required: false, title: 'Any injury history or training limitations?' },
  { id: 'nutrition_diet', section: 'nutrition', required: true, title: 'Set up nutrition.' },
  { id: 'manual_targets', section: 'nutrition', required: false, title: 'Choose the targets you know.' },
  { id: 'cardio_current', section: 'lifestyle', required: true, title: 'Set up cardio.' },
  { id: 'steps_tracking', section: 'lifestyle', required: true, title: 'Do you track steps?' },
  { id: 'recovery_lifestyle', section: 'lifestyle', required: false, title: 'Recovery check.' },
  { id: 'coaching_style', section: 'preferences', required: true, title: 'Tune your coach.' },
  { id: 'username', section: 'preferences', required: false, title: 'Create your handle.', explanation: 'Used to identify your profile. You can sign in as this handle to restore your data anytime.' },
  { id: 'plan_generation', section: 'plan', required: true, title: 'Building your personalized coaching plan...' },
  { id: 'plan_preview', section: 'plan', required: true, title: "Here's your starting plan" },
];

export function getOnboardingStepDefinition(stepId: OnboardingStepDefinition['id']) {
  return onboardingStepRegistry.find((step) => step.id === stepId);
}