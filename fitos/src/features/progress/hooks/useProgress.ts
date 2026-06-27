import { mockProgressData } from '../mock';

export function useProgress() {
  return {
    weight: mockProgressData.weight,
    aiWeightInsight: mockProgressData.aiWeightInsight,
    strength: mockProgressData.strength,
    bodyMeasurements: mockProgressData.bodyMeasurements,
    progressPhotos: mockProgressData.progressPhotos,
  };
}
