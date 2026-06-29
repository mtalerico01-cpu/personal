import { useState } from 'react';
import { mockAIFoodEstimate } from '../mock';
import { useNutritionStore } from '../../../store/nutritionStore';

export function useNutrition() {
  const [aiEstimateVisible, setAIEstimateVisible] = useState(false);
  const [foodInput, setFoodInput] = useState('');

  const { log, goals, supplements, remaining, toggleSupplement, addMealEntry } = useNutritionStore();

  const estimateMacros = () => {
    setAIEstimateVisible(true);
  };

  const addEstimatedFood = () => {
    addMealEntry({
      name: foodInput.trim() || mockAIFoodEstimate.description,
      calories: mockAIFoodEstimate.calories,
      proteinGrams: mockAIFoodEstimate.proteinGrams,
      carbsGrams: mockAIFoodEstimate.carbsGrams,
      fatGrams: mockAIFoodEstimate.fatGrams,
    });
    setFoodInput('');
    setAIEstimateVisible(false);
  };

  return {
    log,
    goals,
    remaining: remaining(),
    supplements,
    toggleSupplement,
    foodInput,
    setFoodInput,
    aiEstimateVisible,
    estimateMacros,
    addEstimatedFood,
    dismissAIEstimate: () => setAIEstimateVisible(false),
    aiEstimate: mockAIFoodEstimate,
  };
}
