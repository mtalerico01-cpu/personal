import { useTrainingStore } from '../../../store/trainingStore';
import type { WorkoutSession } from '../../../types';

export interface SaveWorkoutPayload {
  name: string;
  durationMinutes: number;
  exercises: Array<{ name: string; sets: number; reps: string; restSeconds: number }>;
  estimatedCalories: number;
}

export interface SaveWorkoutResult {
  success: boolean;
  workoutName: string;
  exerciseCount: number;
}

export function saveWorkoutTool(payload: Record<string, unknown>): SaveWorkoutResult {
  const { name, durationMinutes, exercises, estimatedCalories } = payload as unknown as SaveWorkoutPayload;

  if (!name || !exercises || exercises.length === 0) {
    throw new Error('saveWorkoutTool: invalid payload — name and exercises required');
  }

  const session: WorkoutSession = {
    id: `w-${Date.now()}`,
    name,
    date: new Date().toISOString().split('T')[0],
    status: 'planned',
    durationMinutes,
    totalVolumeKg: 0,
    exercises: exercises.map((e, i) => ({
      id: `ex-${i}`,
      exerciseId: e.name.toLowerCase().replace(/\s+/g, '-'),
      exerciseName: e.name,
      muscleGroups: [],
      sets: Array.from({ length: e.sets }, (_, si) => ({
        id: `s-${i}-${si}`,
        setNumber: si + 1,
        weightKg: 0,
        reps: parseInt(e.reps.split('–')[0], 10) || 10,
        completed: false,
      })),
    })),
  };

  useTrainingStore.getState().setTodayWorkout(session);

  return { success: true, workoutName: name, exerciseCount: exercises.length };
}
