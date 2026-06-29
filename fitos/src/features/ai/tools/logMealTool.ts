import { useNutritionStore } from '../../../store/nutritionStore';

export interface LogMealPayload {
  name: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export interface LogMealResult {
  success: boolean;
  mealName: string;
  calories: number;
  caloriesRemaining: number;
  proteinRemaining: number;
}

/**
 * Validates and applies a confirmed meal log to the nutrition store.
 */
export function logMealTool(payload: Record<string, unknown>): LogMealResult {
  const { name, calories, proteinGrams, carbsGrams, fatGrams } = payload as unknown as LogMealPayload;

  if (!name || typeof calories !== 'number' || calories <= 0) {
    throw new Error('logMealTool: invalid payload');
  }

  const store = useNutritionStore.getState();
  store.addMealEntry({ name, calories, proteinGrams, carbsGrams, fatGrams });

  const updated = useNutritionStore.getState();
  const remaining = updated.remaining();

  return {
    success: true,
    mealName: name,
    calories,
    caloriesRemaining: remaining.calories,
    proteinRemaining: remaining.proteinGrams,
  };
}
