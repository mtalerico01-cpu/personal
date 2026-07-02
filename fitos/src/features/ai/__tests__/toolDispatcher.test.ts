/**
 * Tool dispatcher integration tests.
 * Uses Zustand store getState() so no React renderer needed.
 */

import { executeAction } from '../tools/toolDispatcher';
import { useNutritionStore } from '../../../store/nutritionStore';
import { useTrainingStore } from '../../../store/trainingStore';
import { useProgressStore } from '../../../store/progressStore';

beforeEach(() => {
  useNutritionStore.getState().resetToMock();
});

describe('logMealTool via toolDispatcher', () => {
  it('adds a meal and reduces remaining calories', () => {
    const before = useNutritionStore.getState().remaining();
    const result = executeAction('log_meal', {
      name: 'Test Chicken',
      calories: 300,
      proteinGrams: 40,
      carbsGrams: 10,
      fatGrams: 8,
    }) as { caloriesRemaining: number; proteinRemaining: number };

    expect(result.caloriesRemaining).toBe(before.calories - 300);
  });

  it('throws on missing name', () => {
    expect(() =>
      executeAction('log_meal', { calories: 300, proteinGrams: 0, carbsGrams: 0, fatGrams: 0 })
    ).toThrow();
  });
});

describe('updateMacroGoalsTool via toolDispatcher', () => {
  it('updates calorie goal in store', () => {
    executeAction('update_macros', { calorieGoal: 2000, proteinGoal: 160, carbGoal: 220, fatGoal: 60 });
    expect(useNutritionStore.getState().goals.calories).toBe(2000);
  });

  it('throws when calorie goal is below 1200', () => {
    expect(() =>
      executeAction('update_macros', { calorieGoal: 800, proteinGoal: 100, carbGoal: 80, fatGoal: 30 })
    ).toThrow();
  });
});

describe('updateWeightGoalTool via toolDispatcher', () => {
  it('updates goal weight in store', () => {
    executeAction('update_weight_goal', { goalWeightLbs: 175 });
    expect(useProgressStore.getState().goalWeightLbs).toBe(175);
  });
});

describe('updateCardioGoalTool via toolDispatcher', () => {
  it('updates cardio goal minutes', () => {
    executeAction('update_cardio_goal', { minutes: 45 });
    expect(useTrainingStore.getState().cardio.cardioMinutesGoal).toBe(45);
  });
});

describe('createFitnessPlanTool via toolDispatcher', () => {
  it('sets macros from calorie goal (cut)', () => {
    const result = executeAction('create_plan', { mode: 'cut', calorieGoal: 1800 });
    const goals = useNutritionStore.getState().goals;
    expect(goals.calories).toBe(1800);
    expect(goals.proteinGrams).toBeGreaterThan(120);
    expect(result.sourceReferences).toEqual(expect.arrayContaining(['SRC-ISSN-PROTEIN-2017']));
  });
});

describe('navigate action', () => {
  it('returns handled:ui without error', () => {
    const result = executeAction('navigate', { screen: 'nutrition' });
    expect(result).toEqual({ success: true, type: 'navigate', handled: 'ui' });
  });
});
