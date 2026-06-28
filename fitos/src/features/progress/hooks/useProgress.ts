import { mockProgressData } from '../mock';
import { useProgressStore } from '../../../store/progressStore';

export function useProgress() {
  const {
    currentWeightLbs,
    goalWeightLbs,
    sevenDayAvgLbs,
    weeklyChangeLbs,
    strengthScore,
    estimatedOneRepMaxes,
    weightInsight,
    strengthInsight,
  } = useProgressStore();

  const weight = {
    ...mockProgressData.weight,
    current: currentWeightLbs / 2.20462,
    goal: goalWeightLbs / 2.20462,
    sevenDayAvg: sevenDayAvgLbs / 2.20462,
    weeklyChange: weeklyChangeLbs / 2.20462,
  };

  return {
    weight,
    aiWeightInsight: weightInsight ?? mockProgressData.aiWeightInsight,
    strength: {
      ...mockProgressData.strength,
      score: strengthScore,
      estimatedOneRepMaxes,
      aiInsight: strengthInsight ?? mockProgressData.strength.aiInsight,
    },
    bodyMeasurements: mockProgressData.bodyMeasurements,
    bodyMeasurementHistory: mockProgressData.bodyMeasurementHistory,
    progressPhotos: mockProgressData.progressPhotos,
  };
}
