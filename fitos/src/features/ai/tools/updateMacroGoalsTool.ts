import { useNutritionStore } from '../../../store/nutritionStore';

export interface UpdateMacroGoalsPayload {
  calorieGoal: number;
  proteinGoal: number;
  carbGoal: number;
  fatGoal: number;
}

export interface UpdateMacroGoalsResult {
  success: boolean;
  newCalorieGoal: number;
  newProteinGoal: number;
}

export function updateMacroGoalsTool(payload: Record<string, unknown>): UpdateMacroGoalsResult {
  const { calorieGoal, proteinGoal, carbGoal, fatGoal } = payload as unknown as UpdateMacroGoalsPayload;

  if (!calorieGoal || calorieGoal < 1200 || calorieGoal > 6000) {
    throw new Error('updateMacroGoalsTool: calorie goal out of safe range (1200–6000)');
  }

  useNutritionStore.getState().setGoals({
    calories: calorieGoal,
    proteinGrams: proteinGoal,
    carbsGrams: carbGoal,
    fatGrams: fatGoal,
  });

  return { success: true, newCalorieGoal: calorieGoal, newProteinGoal: proteinGoal };
}
