// ─── Confidence ─────────────────────────────────────────────────────────────

export type ConfidenceLevel = 'low' | 'medium' | 'high';

// ─── Action types ────────────────────────────────────────────────────────────

export type AIActionType =
  | 'log_meal'
  | 'update_macros'
  | 'update_weight_goal'
  | 'save_workout'
  | 'update_cardio_goal'
  | 'create_plan'
  | 'review_day'
  | 'navigate';

export type AIActionStatus = 'proposed' | 'confirmed' | 'cancelled' | 'completed';

export interface AIActionProposal {
  id: string;
  type: AIActionType;
  title: string;
  description: string;
  payload: Record<string, unknown>;
  requiresConfirmation: boolean;
  status: AIActionStatus;
}

// ─── Messages ────────────────────────────────────────────────────────────────

export interface AIMessage {
  id: string;
  personaId: 'cedric' | 'elara';
  createdAt: string;
  title?: string;
  summary: string;
  details?: string[];
  recommendation?: string;
  confidence?: ConfidenceLevel;
  proposedActions?: AIActionProposal[];
}

// ─── Suggested prompts ───────────────────────────────────────────────────────

export type PromptCategory =
  | 'nutrition'
  | 'training'
  | 'progress'
  | 'goals'
  | 'planning';

export interface SuggestedPrompt {
  id: string;
  label: string;
  category: PromptCategory;
  prompt: string;
}

// ─── AI Context ──────────────────────────────────────────────────────────────

export type DayPart = 'morning' | 'afternoon' | 'evening' | 'night';

export interface AIContext {
  user: {
    id: string;
    name: string;
    age: number;
    heightInches: number;
    currentWeight: number;
    goalWeight: number;
    primaryGoal: 'gain' | 'lose' | 'maintain' | 'recomp';
    trainingExperience: 'beginner' | 'intermediate' | 'advanced';
    timezone: string;
    preferredDiet: string;
  };

  persona: {
    id: 'cedric' | 'elara';
    name: string;
    role: string;
    tone: string;
  };

  time: {
    nowISO: string;
    localDate: string;
    localTime: string;
    dayOfWeek: string;
    dayPart: DayPart;
  };

  nutrition: {
    calorieGoal: number;
    caloriesConsumed: number;
    caloriesRemaining: number;
    proteinGoal: number;
    proteinConsumed: number;
    proteinRemaining: number;
    carbGoal: number;
    carbsConsumed: number;
    carbsRemaining: number;
    fatGoal: number;
    fatConsumed: number;
    fatRemaining: number;
    mealsLogged: number;
    hydrationProgress: number;
  };

  training: {
    scheduledWorkoutName: string | null;
    scheduledBodyParts: string[];
    completed: boolean;
    durationMinutes: number | null;
    estimatedCalories: number | null;
    cardioGoalMinutes: number;
    cardioCompletedMinutes: number;
  };

  progress: {
    currentWeight: number;
    sevenDayAverage: number;
    weeklyWeightChange: number;
    goalWeight: number;
    strengthScore: number;
    strengthScoreChange: number;
    estimatedOneRepMaxes: Record<string, number>;
  };

  recovery: {
    sleepHours: number;
    sleepQuality: number;
    steps: number;
    activeCalories: number;
    restingHeartRate: number;
  };

  plan: {
    name: string;
    status: 'active' | 'paused';
    startDate: string;
    targetDate?: string;
  };
}

// ─── Tool results ─────────────────────────────────────────────────────────────

export interface MealEstimate {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: ConfidenceLevel;
}

export interface MealEstimateResponse {
  estimate: MealEstimate;
  message: AIMessage;
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
}

export interface WorkoutProposal {
  name: string;
  durationMinutes: number;
  bodyParts: string[];
  exercises: WorkoutExercise[];
  estimatedCalories: number;
  message: AIMessage;
}

export interface MacroProposal {
  calorieGoal: number;
  proteinGoal: number;
  carbGoal: number;
  fatGoal: number;
}

// ─── Intent ──────────────────────────────────────────────────────────────────

export type IntentType =
  | 'log_meal'
  | 'estimate_food'
  | 'remaining_macros'
  | 'adjust_calories'
  | 'update_macros'
  | 'build_workout'
  | 'change_workout'
  | 'cardio_review'
  | 'weight_explanation'
  | 'progress_review'
  | 'plan_tomorrow'
  | 'change_goal'
  | 'create_cut'
  | 'create_bulk'
  | 'maintenance_plan'
  | 'review_day'
  | 'general';

export interface ParsedIntent {
  type: IntentType;
  confidence: ConfidenceLevel;
  extractedValues: Record<string, unknown>;
}
