import { useState } from 'react';
import {
  mockNutritionLog,
  mockNutritionGoals,
  mockSupplements,
  mockAIFoodEstimate,
  type Supplement,
} from '../mock';

export function useNutrition() {
  const [supplements, setSupplements] = useState<Supplement[]>(mockSupplements);
  const [aiEstimateVisible, setAIEstimateVisible] = useState(false);
  const [foodInput, setFoodInput] = useState('');

  const toggleSupplement = (id: string) => {
    setSupplements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, taken: !s.taken } : s)),
    );
  };

  const estimateMacros = () => {
    // Phase 3: replace with real OpenAI call
    setAIEstimateVisible(true);
  };

  const { totalMacros } = mockNutritionLog;
  const goals = mockNutritionGoals;

  const remaining = {
    calories: Math.max(goals.calories - totalMacros.calories, 0),
    proteinGrams: Math.max(goals.proteinGrams - totalMacros.proteinGrams, 0),
    carbsGrams: Math.max(goals.carbsGrams - totalMacros.carbsGrams, 0),
    fatGrams: Math.max(goals.fatGrams - totalMacros.fatGrams, 0),
  };

  return {
    log: mockNutritionLog,
    goals,
    remaining,
    supplements,
    toggleSupplement,
    foodInput,
    setFoodInput,
    aiEstimateVisible,
    estimateMacros,
    dismissAIEstimate: () => setAIEstimateVisible(false),
    aiEstimate: mockAIFoodEstimate,
  };
}
