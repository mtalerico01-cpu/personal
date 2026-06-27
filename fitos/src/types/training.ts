export interface ExerciseSet {
  id: string;
  setNumber: number;
  weightKg?: number;
  reps?: number;
  durationSeconds?: number;
  rpe?: number; // Rate of perceived exertion 1–10
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  muscleGroups: string[];
  sets: ExerciseSet[];
}

export type WorkoutStatus = 'planned' | 'in_progress' | 'completed' | 'skipped';

export interface WorkoutSession {
  id: string;
  name: string;
  date: string;
  status: WorkoutStatus;
  exercises: WorkoutExercise[];
  durationMinutes?: number;
  notes?: string;
  totalVolumeKg?: number;
}
