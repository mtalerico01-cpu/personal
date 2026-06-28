import { create } from 'zustand';
import { mockProgressData } from '../features/progress/mock';

interface WeightEntry {
  date: string;
  lbs: number;
}

interface ProgressState {
  currentWeightLbs: number;
  goalWeightLbs: number;
  sevenDayAvgLbs: number;
  weeklyChangeLbs: number;
  monthlyChangeLbs: number;
  sparkline: number[];
  strengthScore: number;
  strengthScoreChangeThisMonth: number;
  estimatedOneRepMaxes: Record<string, number>;
  recentWeightHistory: WeightEntry[];

  // Computed insight (set by AI service)
  weightInsight: string;
  strengthInsight: string;

  // Actions
  updateCurrentWeight: (lbs: number) => void;
  updateGoalWeight: (lbs: number) => void;
  setWeightInsight: (text: string) => void;
  setStrengthInsight: (text: string) => void;
  resetToMock: () => void;
}

const initialOneRepMaxes: Record<string, number> = {
  'Bench Press': 285,
  'Squat': 340,
  'Deadlift': 405,
  'Overhead Press': 165,
};

export const useProgressStore = create<ProgressState>((set) => ({
  currentWeightLbs: mockProgressData.weight.currentLbs,
  goalWeightLbs: mockProgressData.weight.goalLbs,
  sevenDayAvgLbs: mockProgressData.weight.sevenDayAvgLbs,
  weeklyChangeLbs: mockProgressData.weight.weeklyChangeLbs,
  monthlyChangeLbs: mockProgressData.weight.monthlyChangeLbs,
  sparkline: mockProgressData.weight.sparkline,
  strengthScore: mockProgressData.strength.score,
  strengthScoreChangeThisMonth: mockProgressData.strength.scoreChangeThisMonth,
  estimatedOneRepMaxes: initialOneRepMaxes,
  recentWeightHistory: [],
  weightInsight: mockProgressData.aiWeightInsight,
  strengthInsight: mockProgressData.strength.aiInsight,

  updateCurrentWeight: (lbs) =>
    set((state) => ({
      currentWeightLbs: lbs,
      recentWeightHistory: [
        ...state.recentWeightHistory,
        { date: new Date().toISOString().slice(0, 10), lbs },
      ],
    })),

  updateGoalWeight: (lbs) => set({ goalWeightLbs: lbs }),

  setWeightInsight: (text) => set({ weightInsight: text }),

  setStrengthInsight: (text) => set({ strengthInsight: text }),

  resetToMock: () =>
    set({
      currentWeightLbs: mockProgressData.weight.currentLbs,
      goalWeightLbs: mockProgressData.weight.goalLbs,
      weeklyChangeLbs: mockProgressData.weight.weeklyChangeLbs,
      weightInsight: mockProgressData.aiWeightInsight,
      strengthInsight: mockProgressData.strength.aiInsight,
    }),
}));
