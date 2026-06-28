import { create } from 'zustand';
import type { WorkoutSession } from '../types';
import { mockTodayWorkout, mockCardioData } from '../features/training/mock';

export interface CardioData {
  steps: number;
  stepsGoal: number;
  activeCalories: number;
  activeCaloriesGoal: number;
  distanceMiles: number;
  cardioMinutesCompleted: number;
  cardioMinutesGoal: number;
}

interface TrainingState {
  todayWorkout: WorkoutSession | null;
  workoutCompleted: boolean;
  cardio: CardioData;

  // Actions
  setTodayWorkout: (workout: WorkoutSession) => void;
  markWorkoutComplete: () => void;
  updateCardioGoal: (minutes: number) => void;
  addCardioMinutes: (minutes: number) => void;
  resetToMock: () => void;
}

const initialCardio: CardioData = {
  steps: mockCardioData.steps,
  stepsGoal: mockCardioData.stepsGoal,
  activeCalories: mockCardioData.activeCalories,
  activeCaloriesGoal: mockCardioData.activeCaloriesGoal,
  distanceMiles: mockCardioData.distanceMiles,
  cardioMinutesCompleted: 45,
  cardioMinutesGoal: 45,
};

export const useTrainingStore = create<TrainingState>((set) => ({
  todayWorkout: mockTodayWorkout,
  workoutCompleted: false,
  cardio: initialCardio,

  setTodayWorkout: (workout) => set({ todayWorkout: workout, workoutCompleted: false }),

  markWorkoutComplete: () => set({ workoutCompleted: true }),

  updateCardioGoal: (minutes) =>
    set((state) => ({
      cardio: { ...state.cardio, cardioMinutesGoal: minutes },
    })),

  addCardioMinutes: (minutes) =>
    set((state) => ({
      cardio: {
        ...state.cardio,
        cardioMinutesCompleted: state.cardio.cardioMinutesCompleted + minutes,
      },
    })),

  resetToMock: () =>
    set({ todayWorkout: mockTodayWorkout, workoutCompleted: false, cardio: initialCardio }),
}));
