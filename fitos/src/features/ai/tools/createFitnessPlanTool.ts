import { useNutritionStore } from '../../../store/nutritionStore';

export interface CreateFitnessPlanPayload {
  mode: 'cut' | 'bulk' | 'maintain';
  calorieGoal: number;
}

export interface CreateFitnessPlanResult {
  success: boolean;
  mode: string;
  newCalorieGoal: number;
}

export function createFitnessPlanTool(payload: Record<string, unknown>): CreateFitnessPlanResult {
  const { mode, calorieGoal } = payload as CreateFitnessPlanPayload;

  if (!['cut', 'bulk', 'maintain'].includes(mode)) {
    throw new Error('createFitnessPlanTool: mode must be cut, bulk, or maintain');
  }
  if (typeof calorieGoal !== 'number' || calorieGoal < 1200 || calorieGoal > 6000) {
    throw new Error('createFitnessPlanTool: calorie goal out of safe range');
  }

  const store = useNutritionStore.getState();
  const current = store.goals;

  // Derive new macros from calorie goal (rough split: 30% P / 45% C / 25% F)
  const proteinGoal = Math.round((calorieGoal * 0.30) / 4);
  const carbGoal = Math.round((calorieGoal * 0.45) / 4);
  const fatGoal = Math.round((calorieGoal * 0.25) / 9);

  store.setGoals({
    calories: calorieGoal,
    proteinGrams: proteinGoal,
    carbsGrams: carbGoal,
    fatGrams: fatGoal,
  });

  return { success: true, mode, newCalorieGoal: calorieGoal };
}
