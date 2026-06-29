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
  topic?: CoachTopic;
  intent?: IntentType;
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
  | 'cardio'
  | 'progress'
  | 'recovery'
  | 'goals'
  | 'planning'
  | 'general';

export interface SuggestedPrompt {
  id: string;
  label: string;
  category: PromptCategory;
  prompt: string;
  intent?: IntentType;
  topic?: CoachTopic;
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

export type CoachTopic =
  | 'nutrition'
  | 'training'
  | 'cardio'
  | 'progress'
  | 'recovery'
  | 'goals'
  | 'general';

export type IntentType =
  | 'daily_review'
  | 'nutrition_status'
  | 'meal_recommendation'
  | 'meal_logging'
  | 'protein_status'
  | 'calorie_status'
  | 'macro_adjustment'
  | 'calorie_adjustment'
  | 'diet_strategy_compare'
  | 'diet_strategy_recommend'
  | 'diet_plan_preview'
  | 'diet_plan_apply'
  | 'training_plan'
  | 'workout_generation'
  | 'workout_adjustment'
  | 'exercise_replacement'
  | 'training_plan_generation'
  | 'cardio_status'
  | 'cardio_recommendation'
  | 'cardio_goal_update'
  | 'recovery_status'
  | 'weight_explanation'
  | 'progress_review'
  | 'goal_change'
  | 'goal_update'
  | 'navigation'
  | 'clarification'
  | 'tomorrow_plan'
  | 'unknown'
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
  topic: CoachTopic;
  confidence: ConfidenceLevel;
  extractedValues: Record<string, unknown>;
}
