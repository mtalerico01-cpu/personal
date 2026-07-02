import type { InitialPlan, OnboardingAnswers, OnboardingStepId } from '../types';

export interface OnboardingValidationContext {
  nameInput?: string;
  usernameInput?: string;
  bodyInputs?: {
    age?: string;
    feet?: string;
    cm?: string;
    weight?: string;
  };
  generationReady?: boolean;
  plan?: InitialPlan | null;
}

export interface OnboardingValidationResult {
  isComplete: boolean;
  missing: string[];
}

export function isOnboardingStepComplete(stepId: OnboardingStepId, answers: OnboardingAnswers, context: OnboardingValidationContext = {}) {
  return validateOnboardingStep(stepId, answers, context).isComplete;
}

export function validateOnboardingStep(stepId: OnboardingStepId, answers: OnboardingAnswers, context: OnboardingValidationContext = {}): OnboardingValidationResult {
  const missing = getMissingRequirements(stepId, answers, context);
  return { isComplete: missing.length === 0, missing };
}

function getMissingRequirements(stepId: OnboardingStepId, answers: OnboardingAnswers, context: OnboardingValidationContext) {
  const missing: string[] = [];

  if (stepId === 'welcome_name') {
    requireField(Boolean((context.nameInput ?? answers.firstName ?? '').trim()), 'firstName', missing);
  } else if (stepId === 'body_profile') {
    const age = context.bodyInputs?.age ?? (answers.age ? String(answers.age) : '');
    const weight = context.bodyInputs?.weight ?? (answers.currentWeightKg ? String(answers.currentWeightKg) : '');
    const height = answers.units === 'metric'
      ? context.bodyInputs?.cm ?? (answers.heightCm ? String(answers.heightCm) : '')
      : context.bodyInputs?.feet ?? (answers.heightCm ? String(answers.heightCm) : '');
    requireField(Boolean(age), 'age', missing);
    requireField(Boolean(weight), 'currentWeight', missing);
    requireField(Boolean(height), 'height', missing);
    requireField(Boolean(answers.estimationSex), 'estimationSex', missing);
  } else if (stepId === 'goals') {
    requireField(Boolean(answers.primaryGoal), 'primaryGoal', missing);
    requireField(Boolean(answers.planAggressiveness), 'planAggressiveness', missing);
  } else if (stepId === 'username') {
    requireField((context.usernameInput ?? answers.username ?? '').trim().length >= 2, 'username', missing);
  } else if (stepId === 'plan_aggressiveness') {
    requireField(Boolean(answers.planAggressiveness), 'planAggressiveness', missing);
  } else if (stepId === 'experience_level') {
    requireField(Boolean(answers.trainingExperience), 'trainingExperience', missing);
  } else if (stepId === 'structured_plan') {
    requireField(Boolean(answers.structuredPlanStatus), 'structuredPlanStatus', missing);
  } else if (stepId === 'target_knowledge') {
    requireField(Boolean(answers.targetKnowledge), 'targetKnowledge', missing);
  } else if (stepId === 'activity') {
    requireField(Boolean(answers.activityLevel), 'activityLevel', missing);
  } else if (stepId === 'training_availability') {
    requireField(Boolean(answers.trainingDaysPerWeek), 'trainingDaysPerWeek', missing);
    requireField(Boolean(answers.preferredTrainingTypes?.length), 'preferredTrainingTypes', missing);
    requireField(Boolean(answers.equipment?.length), 'equipment', missing);
  } else if (stepId === 'training_location') {
    requireField(Boolean(answers.equipment?.length), 'equipment', missing);
  } else if (stepId === 'training_preference') {
    requireField(Boolean(answers.preferredTrainingTypes?.length), 'preferredTrainingTypes', missing);
  } else if (stepId === 'workout_split') {
    requireField(Boolean(answers.workoutSplitStatus), 'workoutSplitStatus', missing);
    if (answers.workoutSplitStatus && answers.workoutSplitStatus !== 'recommend') {
      requireField(Boolean(answers.workoutSplit), 'workoutSplit', missing);
      if (answers.workoutSplit === 'custom') requireField(Boolean(answers.customWorkoutSplit), 'customWorkoutSplit', missing);
    }
  } else if (stepId === 'workout_split_entry') {
    requireField(Boolean(answers.workoutSplit), 'workoutSplit', missing);
  } else if (stepId === 'nutrition_diet') {
    requireField(Boolean(answers.dietPattern || answers.eatingStyles?.length), 'dietPattern', missing);
    requireField(Boolean(answers.macroPreference), 'macroPreference', missing);
    requireField(Boolean(answers.nutritionTargetPreference), 'nutritionTargetPreference', missing);
    requireField(Boolean(answers.restrictionsStatus), 'restrictionsStatus', missing);
  } else if (stepId === 'nutrition_target_preference') {
    requireField(Boolean(answers.nutritionTargetPreference), 'nutritionTargetPreference', missing);
  } else if (stepId === 'manual_targets') {
    requireField(Boolean(answers.manualTargets?.calories || answers.manualTargets?.proteinGrams || answers.manualTargets?.carbsGrams || answers.manualTargets?.fatGrams), 'manualTargets', missing);
  } else if (stepId === 'cardio_current') {
    requireField(Boolean(answers.cardioStatus), 'cardioStatus', missing);
    if (answers.cardioStatus === 'weekly' || answers.cardioStatus === 'specific_plan') {
      requireField(Boolean(answers.cardioSessionsPerWeek), 'cardioSessionsPerWeek', missing);
      requireField(Boolean(answers.cardioDurationMinutes), 'cardioDurationMinutes', missing);
      requireField(Boolean(answers.cardioType), 'cardioType', missing);
    }
  } else if (stepId === 'steps_tracking') {
    requireField(Boolean(answers.stepTrackingStatus), 'stepTrackingStatus', missing);
    if (answers.stepTrackingStatus === 'yes_with_target') requireField(Boolean(answers.dailyStepGoal), 'dailyStepGoal', missing);
  } else if (stepId === 'coaching_style') {
    requireField(Boolean(answers.coachingStyle), 'coachingStyle', missing);
    requireField(Boolean(answers.responseDetail), 'responseDetail', missing);
    requireField(Boolean(answers.accountability), 'accountability', missing);
    requireField(Boolean(answers.appearance), 'appearance', missing);
    requireField(Boolean(answers.memoryPreference), 'memoryPreference', missing);
  } else if (stepId === 'appearance') {
    requireField(Boolean(answers.appearance), 'appearance', missing);
  } else if (stepId === 'memory_consent') {
    requireField(Boolean(answers.memoryPreference), 'memoryPreference', missing);
  } else if (stepId === 'plan_generation') {
    requireField(Boolean(context.generationReady), 'generationReady', missing);
  } else if (stepId === 'plan_preview') {
    requireField(Boolean(context.plan), 'plan', missing);
  }

  return missing;
}

function requireField(condition: boolean, field: string, missing: string[]) {
  if (!condition) missing.push(field);
}