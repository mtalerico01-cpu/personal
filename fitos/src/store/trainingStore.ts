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
  activity: string;
  intensity: string;
  recommendation: string;
  sessions: Array<{
    id: string;
    type: string;
    durationMinutes: number;
    calories: number;
    distanceMiles: number;
  }>;
}

interface TrainingState {
  todayWorkout: WorkoutSession | null;
  workoutCompleted: boolean;
  cardio: CardioData;

  // Actions
  setTodayWorkout: (workout: WorkoutSession) => void;
  markWorkoutComplete: () => void;
  updateCardioGoal: (minutes: number) => void;
  updateCardioPlan: (plan: Partial<Pick<CardioData, 'cardioMinutesGoal' | 'activity' | 'intensity' | 'stepsGoal'>>) => void;
  addCardioMinutes: (minutes: number) => void;
  markCardioComplete: () => void;
  resetToMock: () => void;
}

const initialCardio: CardioData = {
  steps: mockCardioData.steps,
  stepsGoal: mockCardioData.stepsGoal,
  activeCalories: mockCardioData.activeCalories,
  activeCaloriesGoal: mockCardioData.activeCaloriesGoal,
  distanceMiles: mockCardioData.distanceMiles,
  cardioMinutesCompleted: mockCardioData.cardioMinutesCompleted,
  cardioMinutesGoal: mockCardioData.cardioMinutesGoal,
  activity: mockCardioData.activity,
  intensity: mockCardioData.intensity,
  recommendation: mockCardioData.recommendation,
  sessions: mockCardioData.sessions,
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

  updateCardioPlan: (plan) =>
    set((state) => ({
      cardio: { ...state.cardio, ...plan },
    })),

  addCardioMinutes: (minutes) =>
    set((state) => ({
      cardio: {
        ...state.cardio,
        cardioMinutesCompleted: state.cardio.cardioMinutesCompleted + minutes,
      },
    })),

  markCardioComplete: () =>
    set((state) => ({
      cardio: {
        ...state.cardio,
        cardioMinutesCompleted: state.cardio.cardioMinutesGoal,
        sessions: [
          {
            id: `cardio-${Date.now()}`,
            type: state.cardio.activity,
            durationMinutes: state.cardio.cardioMinutesGoal,
            calories: Math.round(state.cardio.cardioMinutesGoal * 6),
            distanceMiles: state.cardio.activity.toLowerCase().includes('walk') ? 1.6 : 0,
          },
          ...state.cardio.sessions.filter((session) => session.id !== 'planned-cardio'),
        ],
      },
    })),

  resetToMock: () =>
    set({ todayWorkout: mockTodayWorkout, workoutCompleted: false, cardio: initialCardio }),
}));
