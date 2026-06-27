export interface MacroBreakdown {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}

export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  servingSize: number;
  servingUnit: string;
  macros: MacroBreakdown;
}

export interface MealEntry {
  id: string;
  foodItem: FoodItem;
  servings: number;
  loggedAt: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
  id: string;
  type: MealType;
  entries: MealEntry[];
  totalMacros: MacroBreakdown;
}

export interface DailyNutritionLog {
  date: string;
  meals: Meal[];
  totalMacros: MacroBreakdown;
  waterMl: number;
}
