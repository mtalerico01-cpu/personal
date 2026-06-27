import type { WorkoutSession } from '../../types';

export const mockTodayWorkout: WorkoutSession = {
  id: 'w-today',
  name: 'Back + Biceps',
  date: new Date().toISOString().split('T')[0],
  status: 'planned',
  durationMinutes: 58,
  totalVolumeKg: 0,
  exercises: [
    {
      id: 'ex-1',
      exerciseId: 'lat-pulldown',
      exerciseName: 'Lat Pulldown',
      muscleGroups: ['Lats', 'Biceps'],
      sets: [
        { id: 's1', setNumber: 1, weightKg: 72, reps: 10, completed: false },
        { id: 's2', setNumber: 2, weightKg: 72, reps: 10, completed: false },
        { id: 's3', setNumber: 3, weightKg: 72, reps: 8, completed: false },
      ],
    },
    {
      id: 'ex-2',
      exerciseId: 'chest-supported-row',
      exerciseName: 'Chest Supported Row',
      muscleGroups: ['Upper Back', 'Rear Delts'],
      sets: [
        { id: 's4', setNumber: 1, weightKg: 60, reps: 10, completed: false },
        { id: 's5', setNumber: 2, weightKg: 60, reps: 10, completed: false },
        { id: 's6', setNumber: 3, weightKg: 60, reps: 10, completed: false },
      ],
    },
    {
      id: 'ex-3',
      exerciseId: 'cable-row',
      exerciseName: 'Cable Row',
      muscleGroups: ['Mid Back', 'Lats'],
      sets: [
        { id: 's7', setNumber: 1, weightKg: 65, reps: 12, completed: false },
        { id: 's8', setNumber: 2, weightKg: 65, reps: 12, completed: false },
        { id: 's9', setNumber: 3, weightKg: 65, reps: 10, completed: false },
      ],
    },
    {
      id: 'ex-4',
      exerciseId: 'single-arm-pulldown',
      exerciseName: 'Single Arm Pulldown',
      muscleGroups: ['Lats'],
      sets: [
        { id: 's10', setNumber: 1, weightKg: 30, reps: 14, completed: false },
        { id: 's11', setNumber: 2, weightKg: 30, reps: 14, completed: false },
      ],
    },
    {
      id: 'ex-5',
      exerciseId: 'barbell-curl',
      exerciseName: 'Barbell Curl',
      muscleGroups: ['Biceps'],
      sets: [
        { id: 's12', setNumber: 1, weightKg: 40, reps: 10, completed: false },
        { id: 's13', setNumber: 2, weightKg: 40, reps: 10, completed: false },
        { id: 's14', setNumber: 3, weightKg: 40, reps: 8, completed: false },
      ],
    },
    {
      id: 'ex-6',
      exerciseId: 'hammer-curl',
      exerciseName: 'Hammer Curl',
      muscleGroups: ['Biceps', 'Brachialis'],
      sets: [
        { id: 's15', setNumber: 1, weightKg: 20, reps: 14, completed: false },
        { id: 's16', setNumber: 2, weightKg: 20, reps: 14, completed: false },
      ],
    },
  ],
};

export const mockEstimatedCalories = 420;

export interface GeneratedWorkout {
  durationMinutes: number;
  exercises: { name: string; sets: string; reps: string }[];
}

export const mockGeneratedWorkouts: Record<number, GeneratedWorkout> = {
  30: {
    durationMinutes: 30,
    exercises: [
      { name: 'Lat Pulldown', sets: '3', reps: '10-12' },
      { name: 'Seated Cable Row', sets: '3', reps: '10-12' },
      { name: 'Barbell Curl', sets: '3', reps: '8-10' },
    ],
  },
  45: {
    durationMinutes: 45,
    exercises: [
      { name: 'Lat Pulldown', sets: '3', reps: '8-10' },
      { name: 'Chest Supported Row', sets: '3', reps: '8-10' },
      { name: 'Cable Row', sets: '3', reps: '10-12' },
      { name: 'Barbell Curl', sets: '3', reps: '8-10' },
      { name: 'Hammer Curl', sets: '2', reps: '12-15' },
    ],
  },
  60: {
    durationMinutes: 60,
    exercises: [
      { name: 'Lat Pulldown', sets: '3', reps: '8-10' },
      { name: 'Chest Supported Row', sets: '3', reps: '8-10' },
      { name: 'Cable Row', sets: '3', reps: '10-12' },
      { name: 'Single Arm Pulldown', sets: '2', reps: '12-15' },
      { name: 'Barbell Curl', sets: '3', reps: '8-10' },
      { name: 'Hammer Curl', sets: '2', reps: '12-15' },
    ],
  },
  90: {
    durationMinutes: 90,
    exercises: [
      { name: 'Weighted Pull-Up', sets: '4', reps: '6-8' },
      { name: 'Pendlay Row', sets: '4', reps: '6-8' },
      { name: 'Chest Supported Row', sets: '3', reps: '8-10' },
      { name: 'Cable Row', sets: '3', reps: '10-12' },
      { name: 'Single Arm Pulldown', sets: '2', reps: '12-15' },
      { name: 'Barbell Curl', sets: '4', reps: '8-10' },
      { name: 'Hammer Curl', sets: '3', reps: '12-15' },
      { name: 'Incline Curl', sets: '2', reps: '12-15' },
    ],
  },
};

export const mockCardioData = {
  steps: 12453,
  stepsGoal: 15000,
  activeCalories: 634,
  activeCaloriesGoal: 700,
  distanceMiles: 5.2,
  sessions: [
    {
      id: 'c1',
      type: 'Walking',
      durationMinutes: 45,
      calories: 210,
      distanceMiles: 2.1,
    },
  ],
};
