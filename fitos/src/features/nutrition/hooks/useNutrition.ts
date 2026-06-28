import { useState } from 'react';
import { mockAIFoodEstimate } from '../mock';
import { useNutritionStore } from '../../../store/nutritionStore';

export function useNutrition() {
  const [aiEstimateVisible, setAIEstimateVisible] = useState(false);
  const [foodInput, setFoodInput] = useState('');

  const { log, goals, supplements, remaining, toggleSupplement } = useNutritionStore();

  const estimateMacros = () => {
    setAIEstimateVisible(true);
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
    dismissAIEstimate: () => setAIEstimateVisible(false),
    aiEstimate: mockAIFoodEstimate,
  };
}
