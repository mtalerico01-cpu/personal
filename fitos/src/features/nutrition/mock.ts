import type { DailyNutritionLog } from '../../types';

export const mockNutritionGoals = {
  calories: 3000,
  proteinGrams: 200,
  carbsGrams: 325,
  fatGrams: 85,
};

export const mockNutritionLog: DailyNutritionLog = {
  date: new Date().toISOString().split('T')[0],
  waterMl: 2200,
  totalMacros: {
    calories: 1840,
    proteinGrams: 154,
    carbsGrams: 185,
    fatGrams: 52,
  },
  meals: [
    {
      id: 'meal-1',
      type: 'breakfast',
      totalMacros: { calories: 540, proteinGrams: 44, carbsGrams: 58, fatGrams: 13 },
      entries: [
        {
          id: 'entry-1',
          servings: 1,
          loggedAt: new Date().toISOString(),
          foodItem: {
            id: 'f1',
            name: 'Greek Yogurt Parfait',
            servingSize: 1,
            servingUnit: 'bowl',
            macros: { calories: 340, proteinGrams: 28, carbsGrams: 38, fatGrams: 7 },
          },
        },
        {
          id: 'entry-2',
          servings: 1,
          loggedAt: new Date().toISOString(),
          foodItem: {
            id: 'f2',
            name: 'Protein Shake',
            brand: 'Optimum Nutrition',
            servingSize: 1,
            servingUnit: 'scoop',
            macros: { calories: 200, proteinGrams: 16, carbsGrams: 20, fatGrams: 6 },
          },
        },
      ],
    },
    {
      id: 'meal-2',
      type: 'lunch',
      totalMacros: { calories: 720, proteinGrams: 64, carbsGrams: 72, fatGrams: 20 },
      entries: [
        {
          id: 'entry-3',
          servings: 1,
          loggedAt: new Date().toISOString(),
          foodItem: {
            id: 'f3',
            name: 'Grilled Chicken & Rice Bowl',
            servingSize: 450,
            servingUnit: 'g',
            macros: { calories: 720, proteinGrams: 64, carbsGrams: 72, fatGrams: 20 },
          },
        },
      ],
    },
    {
      id: 'meal-3',
      type: 'snack',
      totalMacros: { calories: 580, proteinGrams: 46, carbsGrams: 55, fatGrams: 19 },
      entries: [
        {
          id: 'entry-4',
          servings: 1,
          loggedAt: new Date().toISOString(),
          foodItem: {
            id: 'f4',
            name: 'Post-Workout Shake + Banana',
            servingSize: 1,
            servingUnit: 'serving',
            macros: { calories: 580, proteinGrams: 46, carbsGrams: 55, fatGrams: 19 },
          },
        },
      ],
    },
  ],
};

export interface Supplement {
  id: string;
  name: string;
  dose: string;
  taken: boolean;
}

export const mockSupplements: Supplement[] = [
  { id: 's1', name: 'Creatine', dose: '5g', taken: true },
  { id: 's2', name: 'Protein', dose: '1 scoop', taken: true },
  { id: 's3', name: 'Vitamin D', dose: '5000 IU', taken: false },
  { id: 's4', name: 'Fish Oil', dose: '2g', taken: false },
  { id: 's5', name: 'Magnesium', dose: '400mg', taken: false },
  { id: 's6', name: 'Electrolytes', dose: '1 packet', taken: true },
];

export interface MockAIFoodEstimate {
  description: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  confidence: 'High' | 'Medium' | 'Low';
}

export const mockAIFoodEstimate: MockAIFoodEstimate = {
  description: 'Large steak burrito from a local Mexican restaurant',
  calories: 950,
  proteinGrams: 55,
  carbsGrams: 110,
  fatGrams: 35,
  confidence: 'Medium',
};
