export interface UserGoals {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  weightGoalKg: number;
  dailySteps: number;
}

export type WeightUnit = 'kg' | 'lbs';
export type EnergyUnit = 'kcal' | 'kJ';

export type UnitPreference = 'imperial' | 'metric';
export type EstimationSex = 'female' | 'male' | 'not_used';
export type PrimaryGoal =
  | 'fat_loss'
  | 'muscle_gain'
  | 'strength'
  | 'recomposition'
  | 'general_health'
  | 'maintenance'
  | 'return_to_fitness'
  | 'athletic_performance'
  | 'cardiovascular_fitness'
  | 'endurance'
  | 'mobility'
  | 'healthy_aging'
  | 'event_preparation'
  | 'custom';
export type RatePreference = 'gradual' | 'moderate' | 'faster' | 'recommended';
export type ActivityLevel = 'sedentary' | 'light' | 'active' | 'highly_active';
export type StepsRange = 'under_4000' | '4000_7000' | '7000_10000' | 'over_10000' | 'unknown';
export type TrainingExperience = 'new' | 'beginner' | 'intermediate' | 'advanced' | 'athlete' | 'returning';
export type ResponseDetail = 'quick' | 'standard' | 'detailed';
export type AccountabilityPreference = 'on_request' | 'gentle' | 'regular' | 'strong';
export type MemoryPreference = 'enabled' | 'ask_first' | 'disabled';
export type OnboardingStatus = 'not_started' | 'in_progress' | 'completed';
export type WeightGoalType = 'target_weight' | 'weight_range' | 'not_weight_based' | 'unknown';
export type FoodRestrictionsStatus = 'answered_none' | 'answered_with_restrictions' | 'skipped';

export interface TrainingLimitation {
  id: string;
  type: 'injury_or_limitation' | 'clinician_restriction' | 'exercise_to_avoid' | 'equipment_limitation' | 'movement_discomfort';
  description: string;
  sensitivity: 'standard' | 'sensitive';
}

export interface ProfileCompleteness {
  essentials: number;
  goals: number;
  training: number;
  nutrition: number;
  lifestyle: number;
  preferences: number;
  integrations: number;
  overall: number;
}

export interface UserMemory {
  id: string;
  category: 'preference' | 'schedule' | 'feedback' | 'behavior_pattern' | 'constraint' | 'conversation_summary';
  key: string;
  value: unknown;
  source: 'explicit_user_statement' | 'confirmed_action' | 'repeated_behavior' | 'system_inference';
  confidence: number;
  createdAt: string;
  updatedAt: string;
  lastConfirmedAt?: string;
  expiresAt?: string;
  userEditable: boolean;
  sensitivity: 'standard' | 'sensitive';
}

export interface UserProfile {
  id: string;

  identity: {
    firstName?: string;
    username?: string;
    age?: number;
    dateOfBirth?: string;
    estimationSex: EstimationSex;
    timezone: string;
    units: UnitPreference;
  };

  body: {
    heightCm: number;
    currentWeightKg: number;
    targetWeightKg?: number;
    bodyFatPercentage?: number;
    weightGoalType: WeightGoalType;
  };

  planGoals: {
    primaryGoal: PrimaryGoal;
    secondaryGoal?: PrimaryGoal;
    secondaryGoals?: PrimaryGoal[];
    motivation?: string;
    ratePreference?: RatePreference;
    planAggressiveness?: 'easy' | 'balanced' | 'aggressive';
    targetKnowledge?: 'recommend_everything' | 'know_some' | 'know_targets';
  };

  lifestyle: {
    activityLevel: ActivityLevel;
    estimatedStepsRange?: StepsRange;
    wakeTime?: string;
    bedtime?: string;
    averageSleepHours?: number;
    stressLevel?: 'low' | 'moderate' | 'high' | 'very_high';
    jobActivityType?: ActivityLevel;
    recoveryConcerns?: string[];
    preferredWorkoutTime?: string;
    scheduleVaries?: boolean;
  };

  training: {
    experience: TrainingExperience;
    structuredPlanStatus?: 'none' | 'somewhat' | 'yes';
    preferredTypes: string[];
    daysPerWeek: number | 'varies';
    preferredDays?: number[];
    sessionLengthMinutes?: number;
    equipment: string[];
    workoutSplitStatus?: 'recommend' | 'enter' | 'open_to_changes';
    workoutSplit?: string;
    limitations: TrainingLimitation[];
    likedExercises: string[];
    dislikedExercises: string[];
  };

  nutrition: {
    eatingStyles: string[];
    allergies: string[];
    intolerances: string[];
    restrictions: string[];
    restrictionsStatus: FoodRestrictionsStatus;
    dislikedFoods: string[];
    preferredFoods: string[];
    preferredCuisines: string[];
    mealsPerDay?: number;
    mealPlanStructure?: string;
    favoriteProteinSources?: string[];
    eatingSchedule?: string;
    mealPrepPreference?: string;
    snacksPreferred?: boolean;
    fastingWindow?: string;
    cookingPattern?: string;
    nutritionChallenge?: string;
  };

  preferences: {
    appearance: 'dark' | 'light' | 'system';
    coachingStyle: 'direct' | 'balanced' | 'encouraging';
    responseDetail: ResponseDetail;
    accountability: AccountabilityPreference;
    memoryPreference: MemoryPreference;
  };

  onboarding: {
    status: OnboardingStatus;
    currentSection?: string;
    completedSections: string[];
    skippedSections: string[];
    startedAt?: string;
    completedAt?: string;
    version: number;
    onboardingComplete?: boolean;
    answers?: Record<string, unknown>;
  };

  completeness: ProfileCompleteness;
  memories?: UserMemory[];

  // Compatibility fields used by existing screens until the backend/profile refactor lands.
  name: string;
  avatarUrl?: string;
  weightUnit: WeightUnit;
  energyUnit: EnergyUnit;
  goals: UserGoals;
  createdAt: string;
}
