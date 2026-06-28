import { create } from 'zustand';
import type { DailyNutritionLog } from '../types';
import { mockNutritionGoals, mockNutritionLog, mockSupplements } from '../features/nutrition/mock';
import type { Supplement } from '../features/nutrition/mock';

export interface NutritionGoals {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

interface NutritionState {
  goals: NutritionGoals;
  log: DailyNutritionLog;
  supplements: Supplement[];

  // Computed helpers (derived but stored for convenience)
  remaining: () => {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  };

  // Actions
  setGoals: (goals: NutritionGoals) => void;
  addMealEntry: (meal: {
    name: string;
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  }) => void;
  toggleSupplement: (id: string) => void;
  resetToMock: () => void;
}

export const useNutritionStore = create<NutritionState>((set, get) => ({
  goals: mockNutritionGoals,
  log: mockNutritionLog,
  supplements: mockSupplements,

  remaining: () => {
    const { goals, log } = get();
    return {
      calories: Math.max(0, goals.calories - log.totalMacros.calories),
      proteinGrams: Math.max(0, goals.proteinGrams - log.totalMacros.proteinGrams),
      carbsGrams: Math.max(0, goals.carbsGrams - log.totalMacros.carbsGrams),
      fatGrams: Math.max(0, goals.fatGrams - log.totalMacros.fatGrams),
    };
  },

  setGoals: (goals) => set({ goals }),

  addMealEntry: (meal) =>
    set((state) => {
      const updatedLog: DailyNutritionLog = {
        ...state.log,
        totalMacros: {
          calories: state.log.totalMacros.calories + meal.calories,
          proteinGrams: state.log.totalMacros.proteinGrams + meal.proteinGrams,
          carbsGrams: state.log.totalMacros.carbsGrams + meal.carbsGrams,
          fatGrams: state.log.totalMacros.fatGrams + meal.fatGrams,
        },
        meals: [
          ...state.log.meals,
          {
            id: `meal-${Date.now()}`,
            type: 'snack',
            totalMacros: {
              calories: meal.calories,
              proteinGrams: meal.proteinGrams,
              carbsGrams: meal.carbsGrams,
              fatGrams: meal.fatGrams,
            },
            entries: [
              {
                id: `entry-${Date.now()}`,
                servings: 1,
                loggedAt: new Date().toISOString(),
                foodItem: {
                  id: `food-${Date.now()}`,
                  name: meal.name,
                  servingSize: 1,
                  servingUnit: 'serving',
                  macros: {
                    calories: meal.calories,
                    proteinGrams: meal.proteinGrams,
                    carbsGrams: meal.carbsGrams,
                    fatGrams: meal.fatGrams,
                  },
                },
              },
            ],
          },
        ],
      };
      return { log: updatedLog };
    }),

  toggleSupplement: (id) =>
    set((state) => ({
      supplements: state.supplements.map((s) =>
        s.id === id ? { ...s, taken: !s.taken } : s
      ),
    })),

  resetToMock: () =>
    set({ goals: mockNutritionGoals, log: mockNutritionLog, supplements: mockSupplements }),
}));
