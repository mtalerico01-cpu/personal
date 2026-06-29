import { useState } from 'react';
import {
  mockEstimatedCalories,
  mockGeneratedWorkouts,
  type GeneratedWorkout,
} from '../mock';
import { useTrainingStore } from '../../../store/trainingStore';

export type TrainingTab = 'strength' | 'cardio';

export function useTraining() {
  const [activeTab, setActiveTab] = useState<TrainingTab>('strength');
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const { todayWorkout, cardio, markCardioComplete, updateCardioPlan } = useTrainingStore();

  const generatedWorkout: GeneratedWorkout | null = selectedDuration
    ? mockGeneratedWorkouts[selectedDuration] ?? null
    : null;

  return {
    activeTab,
    setActiveTab,
    todayWorkout,
    estimatedCalories: mockEstimatedCalories,
    selectedDuration,
    setSelectedDuration,
    generatedWorkout,
    cardioData: cardio,
    markCardioComplete,
    updateCardioPlan,
  };
}
