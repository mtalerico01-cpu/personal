import type { OnboardingAnswers, OnboardingSafetyResult } from '../types';
import { calculateEnergyRequirement } from '../../../domain/nutrition/energy/calculateEnergyRequirement';
import type { RecommendationMetadata } from '../../../domain/recommendations/types';

export interface EnergyNeedsResult {
  restingCalories: number;
  maintenanceCalories: number;
  calorieGoal: number;
  adjustmentCalories: number;
  expectedRate: string;
  metadata: RecommendationMetadata;
}

export function calculateEnergyNeeds(answers: OnboardingAnswers, safety: OnboardingSafetyResult): EnergyNeedsResult {
  return calculateEnergyRequirement({
    age: answers.age,
    heightCm: answers.heightCm,
    currentWeightKg: answers.currentWeightKg,
    estimationSex: answers.estimationSex,
    activityLevel: answers.activityLevel,
    estimatedStepsRange: answers.estimatedStepsRange,
    trainingDaysPerWeek: answers.trainingDaysPerWeek,
    cardioSessionsPerWeek: answers.cardioSessionsPerWeek,
    primaryGoal: answers.primaryGoal,
    ratePreference: answers.ratePreference ?? mapAggressivenessToRate(answers.planAggressiveness),
    manualCalories: answers.manualTargets?.status === 'completed' ? answers.manualTargets.calories : undefined,
    safetyLevel: safety.level,
  });
}

function mapAggressivenessToRate(aggressiveness: OnboardingAnswers['planAggressiveness']) {
  if (aggressiveness === 'easy') return 'gradual' as const;
  if (aggressiveness === 'aggressive') return 'faster' as const;
  return 'moderate' as const;
}
