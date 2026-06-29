import { useTrainingStore } from '../../../store/trainingStore';

export interface UpdateCardioGoalPayload { minutes: number }
export interface UpdateCardioGoalResult { success: boolean; newGoalMinutes: number }

export function updateCardioGoalTool(payload: Record<string, unknown>): UpdateCardioGoalResult {
  const { minutes } = payload as unknown as UpdateCardioGoalPayload;
  if (typeof minutes !== 'number' || minutes < 0 || minutes > 180) {
    throw new Error('updateCardioGoalTool: minutes must be 0–180');
  }
  useTrainingStore.getState().updateCardioGoal(minutes);
  return { success: true, newGoalMinutes: minutes };
}
