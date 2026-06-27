import { useState } from 'react';
import {
  mockTodayWorkout,
  mockEstimatedCalories,
  mockGeneratedWorkouts,
  mockCardioData,
  type GeneratedWorkout,
} from '../mock';

export type TrainingTab = 'strength' | 'cardio';

export function useTraining() {
  const [activeTab, setActiveTab] = useState<TrainingTab>('strength');
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const generatedWorkout: GeneratedWorkout | null = selectedDuration
    ? mockGeneratedWorkouts[selectedDuration] ?? null
    : null;

  return {
    activeTab,
    setActiveTab,
    todayWorkout: mockTodayWorkout,
    estimatedCalories: mockEstimatedCalories,
    selectedDuration,
    setSelectedDuration,
    generatedWorkout,
    cardioData: mockCardioData,
  };
}
