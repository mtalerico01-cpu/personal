/**
 * Mock data for Phase 1 development.
 * All data is typed against src/types/ — swap these out for real API calls in Phase 4.
 */

import type {
  UserProfile,
  DailyNutritionLog,
  WeightEntry,
  WeightTrend,
  WorkoutSession,
  AIDailyBrief,
} from '../../types';

// ─── User ─────────────────────────────────────────────────────────────────────

export const mockUser: UserProfile = {
  id: 'user-001',
  identity: {
    firstName: 'Alex',
    age: 28,
    estimationSex: 'male',
    timezone: 'America/New_York',
    units: 'imperial',
  },
  body: {
    heightCm: 178,
    currentWeightKg: 92.3,
    targetWeightKg: 82,
    weightGoalType: 'target_weight',
  },
  planGoals: {
    primaryGoal: 'recomposition',
    motivation: 'Building consistency',
    ratePreference: 'recommended',
  },
  lifestyle: {
    activityLevel: 'light',
    estimatedStepsRange: '7000_10000',
  },
  training: {
    experience: 'intermediate',
    preferredTypes: ['strength', 'bodybuilding'],
    daysPerWeek: 4,
    sessionLengthMinutes: 60,
    equipment: ['full_gym'],
    limitations: [],
    likedExercises: [],
    dislikedExercises: [],
  },
  nutrition: {
    eatingStyles: ['balanced'],
    allergies: [],
    intolerances: [],
    restrictions: [],
    restrictionsStatus: 'answered_none',
    dislikedFoods: [],
    preferredFoods: [],
    preferredCuisines: [],
    mealsPerDay: 3,
    snacksPreferred: true,
    cookingPattern: 'simple_meals',
    nutritionChallenge: 'miss_protein',
  },
  preferences: {
    appearance: 'system',
    coachingStyle: 'balanced',
    responseDetail: 'standard',
    accountability: 'gentle',
    memoryPreference: 'ask_first',
  },
  onboarding: {
    status: 'completed',
    completedSections: ['mock'],
    skippedSections: [],
    completedAt: '2024-01-15T00:00:00Z',
    version: 1,
  },
  completeness: {
    essentials: 100,
    goals: 100,
    training: 100,
    nutrition: 80,
    lifestyle: 60,
    preferences: 100,
    integrations: 0,
    overall: 82,
  },
  memories: [],
  name: 'Alex',
  weightUnit: 'lbs',
  energyUnit: 'kcal',
  goals: {
    calories: 2400,
    proteinGrams: 185,
    carbsGrams: 240,
    fatGrams: 75,
    weightGoalKg: 82,
    dailySteps: 10000,
  },
  createdAt: '2024-01-15T00:00:00Z',
};

// ─── Nutrition ────────────────────────────────────────────────────────────────

export const mockNutritionLog: DailyNutritionLog = {
  date: new Date().toISOString().split('T')[0],
  waterMl: 1800,
  totalMacros: {
    calories: 1740,
    proteinGrams: 142,
    carbsGrams: 178,
    fatGrams: 48,
  },
  meals: [
    {
      id: 'meal-001',
      type: 'breakfast',
      totalMacros: {
        calories: 520,
        proteinGrams: 42,
        carbsGrams: 55,
        fatGrams: 12,
      },
      entries: [
        {
          id: 'entry-001',
          servings: 1,
          loggedAt: new Date().toISOString(),
          foodItem: {
            id: 'food-001',
            name: 'Greek Yogurt Parfait',
            brand: 'Chobani',
            servingSize: 200,
            servingUnit: 'g',
            macros: {
              calories: 320,
              proteinGrams: 28,
              carbsGrams: 35,
              fatGrams: 6,
            },
          },
        },
        {
          id: 'entry-002',
          servings: 1,
          loggedAt: new Date().toISOString(),
          foodItem: {
            id: 'food-002',
            name: 'Whole Grain Toast',
            servingSize: 2,
            servingUnit: 'slices',
            macros: {
              calories: 200,
              proteinGrams: 14,
              carbsGrams: 20,
              fatGrams: 6,
            },
          },
        },
      ],
    },
    {
      id: 'meal-002',
      type: 'lunch',
      totalMacros: {
        calories: 680,
        proteinGrams: 58,
        carbsGrams: 72,
        fatGrams: 18,
      },
      entries: [
        {
          id: 'entry-003',
          servings: 1,
          loggedAt: new Date().toISOString(),
          foodItem: {
            id: 'food-003',
            name: 'Grilled Chicken & Rice Bowl',
            servingSize: 420,
            servingUnit: 'g',
            macros: {
              calories: 680,
              proteinGrams: 58,
              carbsGrams: 72,
              fatGrams: 18,
            },
          },
        },
      ],
    },
    {
      id: 'meal-003',
      type: 'snack',
      totalMacros: {
        calories: 540,
        proteinGrams: 42,
        carbsGrams: 51,
        fatGrams: 18,
      },
      entries: [
        {
          id: 'entry-004',
          servings: 1,
          loggedAt: new Date().toISOString(),
          foodItem: {
            id: 'food-004',
            name: 'Protein Shake + Banana',
            servingSize: 1,
            servingUnit: 'serving',
            macros: {
              calories: 540,
              proteinGrams: 42,
              carbsGrams: 51,
              fatGrams: 18,
            },
          },
        },
      ],
    },
  ],
};

// ─── Weight ───────────────────────────────────────────────────────────────────

export const mockWeightHistory: WeightEntry[] = [
  { id: 'w-30', date: '2024-05-28', weightKg: 86.8 },
  { id: 'w-29', date: '2024-05-29', weightKg: 86.5 },
  { id: 'w-28', date: '2024-05-30', weightKg: 86.9 },
  { id: 'w-27', date: '2024-05-31', weightKg: 86.3 },
  { id: 'w-26', date: '2024-06-01', weightKg: 86.1 },
  { id: 'w-25', date: '2024-06-02', weightKg: 85.8 },
  { id: 'w-24', date: '2024-06-03', weightKg: 86.2 },
  { id: 'w-23', date: '2024-06-04', weightKg: 85.9 },
  { id: 'w-22', date: '2024-06-05', weightKg: 85.7 },
  { id: 'w-21', date: '2024-06-06', weightKg: 85.5 },
  { id: 'w-20', date: '2024-06-07', weightKg: 85.8 },
  { id: 'w-19', date: '2024-06-08', weightKg: 85.4 },
  { id: 'w-18', date: '2024-06-09', weightKg: 85.2 },
  { id: 'w-17', date: '2024-06-10', weightKg: 85.0 },
  { id: 'w-16', date: '2024-06-11', weightKg: 85.3 },
  { id: 'w-15', date: '2024-06-12', weightKg: 84.9 },
  { id: 'w-14', date: '2024-06-13', weightKg: 84.7 },
  { id: 'w-13', date: '2024-06-14', weightKg: 84.9 },
  { id: 'w-12', date: '2024-06-15', weightKg: 84.5 },
  { id: 'w-11', date: '2024-06-16', weightKg: 84.3 },
  { id: 'w-10', date: '2024-06-17', weightKg: 84.6 },
  { id: 'w-9',  date: '2024-06-18', weightKg: 84.2 },
  { id: 'w-8',  date: '2024-06-19', weightKg: 84.0 },
  { id: 'w-7',  date: '2024-06-20', weightKg: 84.4 },
  { id: 'w-6',  date: '2024-06-21', weightKg: 84.1 },
  { id: 'w-5',  date: '2024-06-22', weightKg: 83.8 },
  { id: 'w-4',  date: '2024-06-23', weightKg: 84.0 },
  { id: 'w-3',  date: '2024-06-24', weightKg: 83.7 },
  { id: 'w-2',  date: '2024-06-25', weightKg: 83.5 },
  { id: 'w-1',  date: '2024-06-26', weightKg: 83.2 },
];

export const mockWeightTrend: WeightTrend = {
  current: 83.2,
  sevenDayAvg: 83.8,
  thirtyDayAvg: 85.1,
  weeklyChange: -0.6,
  monthlyChange: -3.2,
  direction: 'down',
};

// ─── Training ─────────────────────────────────────────────────────────────────

export const mockTodayWorkout: WorkoutSession = {
  id: 'workout-today',
  name: 'Push Day — Chest & Shoulders',
  date: new Date().toISOString().split('T')[0],
  status: 'planned',
  durationMinutes: 65,
  totalVolumeKg: 0,
  exercises: [
    {
      id: 'ex-001',
      exerciseId: 'bench-press',
      exerciseName: 'Barbell Bench Press',
      muscleGroups: ['Chest', 'Triceps', 'Front Delts'],
      sets: [
        { id: 's-1', setNumber: 1, weightKg: 80, reps: 8, completed: false },
        { id: 's-2', setNumber: 2, weightKg: 80, reps: 8, completed: false },
        { id: 's-3', setNumber: 3, weightKg: 80, reps: 6, completed: false },
      ],
    },
    {
      id: 'ex-002',
      exerciseId: 'ohp',
      exerciseName: 'Overhead Press',
      muscleGroups: ['Shoulders', 'Triceps'],
      sets: [
        { id: 's-4', setNumber: 1, weightKg: 55, reps: 8, completed: false },
        { id: 's-5', setNumber: 2, weightKg: 55, reps: 8, completed: false },
        { id: 's-6', setNumber: 3, weightKg: 55, reps: 8, completed: false },
      ],
    },
    {
      id: 'ex-003',
      exerciseId: 'incline-db-press',
      exerciseName: 'Incline DB Press',
      muscleGroups: ['Upper Chest', 'Triceps'],
      sets: [
        { id: 's-7', setNumber: 1, weightKg: 30, reps: 10, completed: false },
        { id: 's-8', setNumber: 2, weightKg: 30, reps: 10, completed: false },
        { id: 's-9', setNumber: 3, weightKg: 30, reps: 10, completed: false },
      ],
    },
  ],
};

// ─── Steps ────────────────────────────────────────────────────────────────────

export const mockSteps = {
  today: 7240,
  goal: 10000,
};

// ─── AI Brief ────────────────────────────────────────────────────────────────

export const mockAIDailyBrief: AIDailyBrief = {
  greeting: 'Good morning, Alex',
  headline: "You're trending down — solid consistency this week.",
  body:
    "Down 0.6 lbs this week while hitting 142g protein yesterday. Your training load is appropriate. One more focused week and you'll break the 183 lb mark. Push day scheduled — prioritize form over load today.",
  generatedAt: new Date().toISOString(),
  insights: [
    {
      id: 'insight-001',
      type: 'weight_analysis',
      title: 'Weight Trend',
      summary: '−0.6 lbs this week',
      detail:
        'Your 7-day average is trending down steadily. Water retention was slightly elevated mid-week, which explains the Thursday spike.',
      generatedAt: new Date().toISOString(),
      period: 'this_week',
    },
    {
      id: 'insight-002',
      type: 'nutrition_tip',
      title: 'Protein on Track',
      summary: '77% of daily goal met by 3pm',
      detail:
        'You hit protein early yesterday — this supports muscle protein synthesis throughout the day. Keep this pattern.',
      generatedAt: new Date().toISOString(),
      period: 'today',
    },
    {
      id: 'insight-003',
      type: 'workout_suggestion',
      title: 'Today: Push Day',
      summary: 'Chest & Shoulders — 65 min',
      detail:
        'Your last push session had strong bench performance. Aim to match or slightly exceed last week\u2019s volume.',
      generatedAt: new Date().toISOString(),
      period: 'today',
    },
  ],
};
