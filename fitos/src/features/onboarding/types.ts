import type {
  AccountabilityPreference,
  ActivityLevel,
  EstimationSex,
  FoodRestrictionsStatus,
  MemoryPreference,
  PrimaryGoal,
  ProfileCompleteness,
  RatePreference,
  ResponseDetail,
  StepsRange,
  TrainingExperience,
  TrainingLimitation,
  UnitPreference,
} from '@/types';
import type { AppearancePreference, CoachingStyle } from '@/features/coach/styles/coachingStyles';
import type { MacroPreference, RecommendationConfidence, RecommendationMetadata, RecommendationRationale, RecommendationWarning } from '../../domain/recommendations/types';

export const onboardingVersion = 1;

export type OnboardingSection =
  | 'welcome'
  | 'goals'
  | 'body'
  | 'lifestyle'
  | 'training'
  | 'nutrition'
  | 'preferences'
  | 'integrations'
  | 'plan';

export type OnboardingStepId =
  | 'welcome_name'
  | 'body_profile'
  | 'goals'
  | 'goal_affirmation'
  | 'plan_aggressiveness'
  | 'experience_level'
  | 'structured_plan'
  | 'target_knowledge'
  | 'manual_targets'
  | 'activity'
  | 'steps'
  | 'training_availability'
  | 'training_location'
  | 'training_preference'
  | 'workout_split'
  | 'workout_split_entry'
  | 'limitations'
  | 'nutrition_diet'
  | 'nutrition_target_preference'
  | 'meal_preference'
  | 'nutrition_optional'
  | 'restrictions'
  | 'cardio_current'
  | 'cardio_details'
  | 'steps_tracking'
  | 'recovery_lifestyle'
  | 'coaching_style'
  | 'appearance'
  | 'response_detail'
  | 'accountability'
  | 'memory_consent'
  | 'username'
  | 'integrations'
  | 'plan_generation'
  | 'plan_preview';

export interface OnboardingStepDefinition {
  id: OnboardingStepId;
  section: OnboardingSection;
  required: boolean;
  title: string;
  explanation?: string;
}

export type ManualTargetsStatus = 'not_used' | 'in_progress' | 'completed';
export type PlanAggressiveness = 'easy' | 'balanced' | 'aggressive';
export type StructuredPlanStatus = 'none' | 'somewhat' | 'yes';
export type TargetKnowledge = 'recommend_everything' | 'know_some' | 'know_targets';
export type NutritionTargetPreference = 'recommend_everything' | 'recommend_calories' | 'recommend_macros' | 'manual';
export type WorkoutSplitStatus = 'recommend' | 'enter' | 'open_to_changes';
export type WorkoutSplit = 'push_pull_legs' | 'upper_lower' | 'full_body' | 'body_part_split' | 'custom';
export type CardioStatus = 'none' | 'sometimes' | 'weekly' | 'specific_plan';
export type StepTrackingStatus = 'no' | 'yes_no_target' | 'yes_with_target';
export type StressLevel = 'low' | 'moderate' | 'high' | 'very_high';
export type DietPattern = 'balanced' | 'mediterranean' | 'vegetarian' | 'vegan' | 'pescatarian' | 'dairy_free' | 'gluten_free' | 'low_fodmap_aware' | 'culturally_flexible' | 'custom';

export interface ManualTargets {
  status: ManualTargetsStatus;
  calories?: number;
  proteinGrams?: number;
  carbsGrams?: number;
  fatGrams?: number;
  weeklyWorkoutDays?: number;
  weeklyCardioSessions?: number;
  cardioType?: string;
  cardioDurationMinutes?: number;
  currentMealPlanStructure?: string;
  currentDietStyle?: string;
  currentTrainingSplit?: string;
  dailyStepGoal?: number;
}

export interface OnboardingAnswers {
  firstName?: string;
  username?: string;
  primaryGoal?: PrimaryGoal;
  secondaryGoal?: PrimaryGoal;
  secondaryGoals?: PrimaryGoal[];
  motivation?: string;
  age?: number;
  heightCm?: number;
  currentWeightKg?: number;
  bodyFatPercentage?: number;
  estimationSex?: EstimationSex;
  units?: UnitPreference;
  targetWeightKg?: number;
  weightGoalType?: 'target_weight' | 'not_weight_based' | 'unknown';
  ratePreference?: RatePreference;
  planAggressiveness?: PlanAggressiveness;
  structuredPlanStatus?: StructuredPlanStatus;
  targetKnowledge?: TargetKnowledge;
  nutritionTargetPreference?: NutritionTargetPreference;
  activityLevel?: ActivityLevel;
  estimatedStepsRange?: StepsRange;
  wakeTime?: string;
  bedtime?: string;
  averageSleepHours?: number;
  preferredWorkoutTime?: string;
  scheduleVaries?: boolean;
  trainingExperience?: TrainingExperience;
  preferredTrainingTypes?: string[];
  trainingDaysPerWeek?: number | 'varies';
  sessionLengthMinutes?: number;
  equipment?: string[];
  workoutSplitStatus?: WorkoutSplitStatus;
  workoutSplit?: WorkoutSplit;
  customWorkoutSplit?: string;
  limitations?: TrainingLimitation[];
  likedExercises?: string[];
  dislikedExercises?: string[];
  eatingStyles?: string[];
  dietPattern?: DietPattern;
  macroPreference?: MacroPreference;
  customDietPattern?: string;
  allergies?: string[];
  intolerances?: string[];
  restrictions?: string[];
  restrictionsStatus?: FoodRestrictionsStatus;
  dislikedFoods?: string[];
  preferredFoods?: string[];
  preferredCuisines?: string[];
  mealsPerDay?: number;
  mealPlanStructure?: string;
  favoriteProteinSources?: string[];
  eatingSchedule?: string;
  mealPrepPreference?: string;
  snacksPreferred?: boolean;
  cookingPattern?: string;
  nutritionChallenge?: string;
  cardioStatus?: CardioStatus;
  cardioSessionsPerWeek?: number;
  cardioDurationMinutes?: number;
  cardioType?: string;
  cardioIntensity?: string;
  stepTrackingStatus?: StepTrackingStatus;
  dailyStepGoal?: number;
  stressLevel?: StressLevel;
  jobActivityType?: ActivityLevel;
  recoveryConcerns?: string[];
  injuryHistory?: string;
  coachingStyle?: CoachingStyle;
  appearance?: AppearancePreference;
  responseDetail?: ResponseDetail;
  accountability?: AccountabilityPreference;
  memoryPreference?: MemoryPreference;
  integrationInterest?: string[];
  manualTargets?: ManualTargets;
  isPregnant?: boolean;
  isBreastfeeding?: boolean;
  eatingDisorderConcern?: boolean;
  medicallyPrescribedDiet?: boolean;
  clinicianDirectedNutrition?: boolean;
  severeInjuryOrPain?: boolean;
  cardiacSymptoms?: boolean;
}

export interface TargetValue {
  estimated: number;
  active: number;
  source: 'system_estimate' | 'user_override' | 'coach_adjustment';
  confidence?: RecommendationConfidence;
  sourceReferences?: string[];
  rationale?: string;
}

export interface MacroTargets {
  calories: TargetValue;
  proteinGrams: TargetValue;
  carbsGrams: TargetValue;
  fatGrams: TargetValue;
  metadata?: RecommendationMetadata;
}

export interface GeneratedTrainingPlan {
  daysPerWeek: number;
  split: string;
  sessionLengthMinutes: number;
  focus: string[];
  equipment: string[];
  workouts: Array<{
    name: string;
    exercises: string[];
  }>;
}

export interface GeneratedCardioPlan {
  sessionsPerWeek: number;
  minutesPerSession: number;
  intensity: string;
  activity: string;
  rationale: string;
}

export interface WeeklyPlanDay {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  focus: 'strength' | 'cardio' | 'strength_cardio' | 'recovery';
  workoutName?: string;
  workoutFocus?: string[];
  cardioActivity?: string;
  cardioMinutes?: number;
  notes: string;
}

export interface DailyMacroPlanDay {
  day: WeeklyPlanDay['day'];
  dayType: 'training' | 'cardio' | 'training_cardio' | 'recovery';
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  mealStructure: string;
}

export interface InitialPlan {
  id: string;
  status: 'draft' | 'confirmed';
  createdAt: string;
  confirmedAt?: string;
  goalLabel: string;
  explanation: string;
  maintenanceCalories: TargetValue;
  macros: MacroTargets;
  training: GeneratedTrainingPlan;
  cardio: GeneratedCardioPlan;
  dailyStepGoal: TargetValue;
  mealStructure: string;
  weeklySchedule: WeeklyPlanDay[];
  dailyMacroPlan: DailyMacroPlanDay[];
  expectedRate: string;
  firstReviewDate: string;
  safetyLevel: OnboardingSafetyResult['level'];
  confidence?: RecommendationConfidence;
  assumptions?: string[];
  warnings?: RecommendationWarning[];
  rationale?: RecommendationRationale[];
  sourceReferences?: string[];
}

export interface OnboardingSafetyResult {
  level: 'standard' | 'caution' | 'restricted';
  flags: string[];
  blockedActions: string[];
  message?: string;
  warnings?: RecommendationWarning[];
  sourceReferences?: string[];
  confidence?: RecommendationConfidence;
}

export interface OnboardingDraftState {
  status: 'not_started' | 'in_progress' | 'completed';
  currentStepId: OnboardingStepId;
  completedStepIds: OnboardingStepId[];
  skippedStepIds: OnboardingStepId[];
  answers: OnboardingAnswers;
  plan: InitialPlan | null;
  safety: OnboardingSafetyResult | null;
  completeness: ProfileCompleteness;
  startedAt?: string;
  completedAt?: string;
  version: number;
}
