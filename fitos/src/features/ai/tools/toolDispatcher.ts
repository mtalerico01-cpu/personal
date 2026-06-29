import type { AIActionType } from '../types';
import { logMealTool } from './logMealTool';
import { updateMacroGoalsTool } from './updateMacroGoalsTool';
import { saveWorkoutTool } from './saveWorkoutTool';
import { updateCardioGoalTool } from './updateCardioGoalTool';
import { updateWeightGoalTool } from './updateWeightGoalTool';
import { createFitnessPlanTool } from './createFitnessPlanTool';

type ToolFn = (payload: Record<string, unknown>) => unknown;

const TOOL_MAP: Partial<Record<AIActionType, ToolFn>> = {
  log_meal: logMealTool,
  update_macros: updateMacroGoalsTool,
  save_workout: saveWorkoutTool,
  update_cardio_goal: updateCardioGoalTool,
  update_weight_goal: updateWeightGoalTool,
  create_plan: createFitnessPlanTool,
};

/**
 * Executes a confirmed AI action by dispatching to the correct tool.
 * Returns the tool result on success, throws on validation failure.
 */
export function executeAction(
  type: AIActionType,
  payload: Record<string, unknown>
): Record<string, unknown> {
  const tool = TOOL_MAP[type];
  if (!tool) {
    // navigate / review_day actions are handled by the UI layer
    return { success: true, type, handled: 'ui' };
  }
  return tool(payload) as Record<string, unknown>;
}
