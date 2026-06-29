import { useProgressStore } from '../../../store/progressStore';

export interface UpdateWeightGoalPayload { goalWeightLbs: number }
export interface UpdateWeightGoalResult { success: boolean; newGoalWeightLbs: number }

export function updateWeightGoalTool(payload: Record<string, unknown>): UpdateWeightGoalResult {
  const { goalWeightLbs } = payload as unknown as UpdateWeightGoalPayload;
  if (typeof goalWeightLbs !== 'number' || goalWeightLbs < 80 || goalWeightLbs > 400) {
    throw new Error('updateWeightGoalTool: goal weight out of safe range (80–400 lbs)');
  }
  useProgressStore.getState().updateGoalWeight(goalWeightLbs);
  return { success: true, newGoalWeightLbs: goalWeightLbs };
}
