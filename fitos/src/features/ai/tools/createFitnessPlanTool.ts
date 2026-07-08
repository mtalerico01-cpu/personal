import { useNutritionStore } from '../../../store/nutritionStore';
import { calculateMacroRecommendation } from '../../../domain/nutrition/macros/calculateMacroRecommendation';
import type { PrimaryGoal } from '../../../types';

export interface CreateFitnessPlanPayload {
  mode: 'cut' | 'bulk' | 'maintain';
  calorieGoal: number;
}

export interface CreateFitnessPlanResult {
  success: boolean;
  mode: string;
  newCalorieGoal: number;
  sourceReferences: string[];
  confidence: string;
}

export function createFitnessPlanTool(payload: Record<string, unknown>): CreateFitnessPlanResult {
  const { mode, calorieGoal } = payload as unknown as CreateFitnessPlanPayload;

  if (!['cut', 'bulk', 'maintain'].includes(mode)) {
    throw new Error('createFitnessPlanTool: mode must be cut, bulk, or maintain');
  }
  if (typeof calorieGoal !== 'number' || calorieGoal < 1200 || calorieGoal > 6000) {
    throw new Error('createFitnessPlanTool: calorie goal out of safe range');
  }

  const store = useNutritionStore.getState();
  const current = store.goals;
  const recommendation = calculateMacroRecommendation({
    calorieGoal,
    bodyWeightKg: inferBodyWeightKg(current.proteinGrams),
    primaryGoal: mapModeToGoal(mode),
    macroPreference: mode === 'cut' ? 'higher_protein' : 'balanced',
  });

  store.setGoals({
    calories: calorieGoal,
    proteinGrams: recommendation.active.proteinGrams,
    carbsGrams: recommendation.active.carbsGrams,
    fatGrams: recommendation.active.fatGrams,
  });

  return { success: true, mode, newCalorieGoal: calorieGoal, sourceReferences: recommendation.metadata.sourceIds, confidence: recommendation.metadata.confidence };
}

function mapModeToGoal(mode: CreateFitnessPlanPayload['mode']): PrimaryGoal {
  if (mode === 'cut') return 'fat_loss';
  if (mode === 'bulk') return 'muscle_gain';
  return 'maintenance';
}

function inferBodyWeightKg(proteinGrams: number | undefined) {
  if (!proteinGrams) return 80;
  return Math.min(140, Math.max(45, Math.round(proteinGrams / 1.8)));
}
