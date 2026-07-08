import type { MacroTargets, OnboardingAnswers } from '../types';
import { calculateMacroRecommendation } from '../../../domain/nutrition/macros/calculateMacroRecommendation';

export function calculateMacroTargets(answers: OnboardingAnswers, calorieGoal: number): MacroTargets {
  const recommendation = calculateMacroRecommendation({
    calorieGoal,
    bodyWeightKg: answers.currentWeightKg,
    primaryGoal: answers.primaryGoal,
    trainingExperience: answers.trainingExperience,
    trainingDaysPerWeek: answers.trainingDaysPerWeek,
    cardioSessionsPerWeek: answers.cardioSessionsPerWeek,
    dietPattern: answers.dietPattern ?? answers.eatingStyles?.[0],
    eatingStyles: answers.eatingStyles,
    macroPreference: answers.macroPreference,
    manualTargets: answers.manualTargets,
  });
  const confidence = recommendation.metadata.confidence;
  const sourceReferences = recommendation.metadata.sourceIds;

  return {
    calories: { estimated: recommendation.calories, active: recommendation.active.calories, source: recommendation.source, confidence, sourceReferences },
    proteinGrams: { estimated: recommendation.proteinGrams, active: recommendation.active.proteinGrams, source: answers.manualTargets?.proteinGrams ? 'user_override' : 'system_estimate', confidence, sourceReferences },
    carbsGrams: { estimated: recommendation.carbsGrams, active: recommendation.active.carbsGrams, source: answers.manualTargets?.carbsGrams ? 'user_override' : 'system_estimate', confidence, sourceReferences },
    fatGrams: { estimated: recommendation.fatGrams, active: recommendation.active.fatGrams, source: answers.manualTargets?.fatGrams ? 'user_override' : 'system_estimate', confidence, sourceReferences },
    metadata: recommendation.metadata,
  };
}
