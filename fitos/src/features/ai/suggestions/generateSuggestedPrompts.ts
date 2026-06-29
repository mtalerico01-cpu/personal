import type { AIContext, SuggestedPrompt, PromptCategory, CoachTopic, IntentType } from '../types';

let _counter = 0;
const uid = () => `prompt-${++_counter}-${Date.now()}`;

/**
 * Generates 4 context-aware suggested prompts based on the current AI context.
 * Prompts change based on day part, nutrition state, workout state, and weight trend.
 */
export function generateSuggestedPrompts(ctx: AIContext): SuggestedPrompt[] {
  const prompts: SuggestedPrompt[] = [];

  const { dayPart } = ctx.time;
  const { proteinRemaining, caloriesRemaining, mealsLogged } = ctx.nutrition;
  const { completed: workoutDone, scheduledWorkoutName } = ctx.training;
  const { weeklyWeightChange } = ctx.progress;

  // ── Priority 1: Significant weight change ───────────────────────────────
  if (Math.abs(weeklyWeightChange) > 1.5) {
    prompts.push({
      id: uid(),
      label: 'Explain my weight',
      category: 'progress',
      prompt: 'Why did my weight change this week?',
      intent: 'weight_explanation',
      topic: 'progress',
    });
  }

  // ── Priority 2: Protein very low ────────────────────────────────────────
  if (proteinRemaining > 60) {
    prompts.push({
      id: uid(),
      label: 'Hit protein target',
      category: 'nutrition',
      prompt: 'Help me finish my protein target for today.',
      intent: 'meal_recommendation',
      topic: 'nutrition',
    });
  }

  // ── Priority 3: Workout not done ────────────────────────────────────────
  if (!workoutDone && scheduledWorkoutName) {
    prompts.push({
      id: uid(),
      label: 'Build today\'s workout',
      category: 'training',
      prompt: `Build me a workout for today (${scheduledWorkoutName}).`,
      intent: 'workout_generation',
      topic: 'training',
    });
  }

  // ── Priority 4: Day-part specific prompts ───────────────────────────────
  if (dayPart === 'morning') {
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Pre-workout meal',
        category: 'nutrition',
        prompt: 'What should I eat before training today?',
      });
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Today\'s priorities',
        category: 'planning',
        prompt: 'What are my priorities for today?',
      });
  }

  if (dayPart === 'afternoon') {
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Check my macros',
        category: 'nutrition',
        prompt: 'How are my macros looking?',
        intent: 'nutrition_status',
        topic: 'nutrition',
      });
    if (prompts.length < 4 && !workoutDone)
      prompts.push({
        id: uid(),
        label: 'Cardio check',
        category: 'cardio',
        prompt: 'Should I do cardio today?',
        intent: 'cardio_status',
        topic: 'cardio',
      });
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Next meal idea',
        category: 'nutrition',
        prompt: 'What should I eat next?',
        intent: 'meal_recommendation',
        topic: 'nutrition',
      });
  }

  if (dayPart === 'evening') {
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Dinner suggestion',
        category: 'nutrition',
        prompt: 'What should I eat for dinner?',
      });
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Daily goal check',
        category: 'goals',
        prompt: 'Did I hit my goals today?',
      });
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Recovery tonight',
        category: 'planning',
        prompt: 'How should I recover tonight?',
      });
  }

  if (dayPart === 'night') {
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Plan tomorrow',
        category: 'planning',
        prompt: 'Help me plan tomorrow.',
      });
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Review my day',
        category: 'progress',
        prompt: 'Review my day.',
      });
    if (prompts.length < 4)
      prompts.push({
        id: uid(),
        label: 'Adjust tomorrow',
        category: 'planning',
        prompt: 'Should I change anything for tomorrow?',
      });
  }

  // ── Fill remaining slots with general context prompts ───────────────────
  if (prompts.length < 4 && caloriesRemaining > 400) {
    prompts.push({
      id: uid(),
      label: 'Log a meal',
      category: 'nutrition',
      prompt: 'I want to log what I just ate.',
      intent: 'meal_logging',
      topic: 'nutrition',
    });
  }

  if (prompts.length < 4 && mealsLogged < 2) {
    prompts.push({
      id: uid(),
      label: 'Meal suggestions',
      category: 'nutrition',
      prompt: 'Suggest a meal for me.',
      intent: 'meal_recommendation',
      topic: 'nutrition',
    });
  }

  if (prompts.length < 4) {
    prompts.push({
      id: uid(),
      label: 'Adjust calories',
      category: 'goals',
      prompt: 'I want to adjust my calorie target.',
      intent: 'macro_adjustment',
      topic: 'goals',
    });
  }

  if (prompts.length < 4) {
    prompts.push({
      id: uid(),
      label: 'Progress update',
      category: 'progress',
      prompt: 'Give me a progress update.',
      intent: 'progress_review',
      topic: 'progress',
    });
  }

  return prompts.slice(0, 4);
}

// ─── Follow-up prompts (shown after each coach response) ─────────────────────

interface FollowUp {
  label: string;
  category: PromptCategory;
  prompt: string;
  intent?: IntentType;
  topic?: CoachTopic;
}

const FOLLOW_UPS_BY_TOPIC: Record<CoachTopic, FollowUp[]> = {
  nutrition: [
    { label: 'What should I eat next?', category: 'nutrition', topic: 'nutrition', intent: 'meal_recommendation', prompt: 'What should I eat next?' },
    { label: 'Help me finish protein', category: 'nutrition', topic: 'nutrition', intent: 'meal_recommendation', prompt: 'Help me finish my protein.' },
    { label: 'Show remaining macros', category: 'nutrition', topic: 'nutrition', intent: 'nutrition_status', prompt: 'How are my macros looking today?' },
    { label: 'Change nutrition goal', category: 'goals', topic: 'goals', intent: 'macro_adjustment', prompt: 'Change my nutrition goal.' },
  ],
  training: [
    { label: 'Show today\'s workout', category: 'training', topic: 'training', intent: 'training_plan', prompt: 'What is my workout today?' },
    { label: 'Make it 45 minutes', category: 'training', topic: 'training', intent: 'workout_generation', prompt: 'Build me a 45-minute workout.' },
    { label: 'Replace an exercise', category: 'training', topic: 'training', intent: 'workout_adjustment', prompt: 'Replace an exercise in today\'s workout.' },
    { label: 'Change training goal', category: 'goals', topic: 'goals', intent: 'goal_change', prompt: 'Change my training goal.' },
  ],
  cardio: [
    { label: 'Recommend cardio', category: 'cardio', topic: 'cardio', intent: 'cardio_recommendation', prompt: 'What cardio should I do today?' },
    { label: 'Review cardio plan', category: 'cardio', topic: 'cardio', intent: 'cardio_status', prompt: 'Review my cardio plan.' },
    { label: 'Change duration', category: 'cardio', topic: 'cardio', intent: 'cardio_recommendation', prompt: 'Change the cardio duration.' },
    { label: 'Change cardio goal', category: 'goals', topic: 'goals', intent: 'goal_change', prompt: 'Change my cardio goal.' },
  ],
  progress: [
    { label: 'Explain weight change', category: 'progress', topic: 'progress', intent: 'weight_explanation', prompt: 'Why did my weight go up?' },
    { label: 'Review weekly progress', category: 'progress', topic: 'progress', intent: 'progress_review', prompt: 'Review my weekly progress.' },
    { label: 'Strength progress', category: 'progress', topic: 'progress', intent: 'progress_review', prompt: 'Review my strength progress.' },
    { label: 'Change weight goal', category: 'goals', topic: 'goals', intent: 'goal_change', prompt: 'Change my weight goal.' },
  ],
  recovery: [
    { label: 'Should I train hard?', category: 'recovery', topic: 'recovery', intent: 'recovery_status', prompt: 'Should I train hard today?' },
    { label: 'Recover tonight', category: 'recovery', topic: 'recovery', intent: 'recovery_status', prompt: 'How should I recover tonight?' },
    { label: 'Adjust workout', category: 'training', topic: 'training', intent: 'workout_adjustment', prompt: 'Adjust today\'s workout for recovery.' },
  ],
  goals: [
    { label: 'Change nutrition goal', category: 'goals', topic: 'goals', intent: 'macro_adjustment', prompt: 'Change my nutrition goal.' },
    { label: 'Change training goal', category: 'goals', topic: 'goals', intent: 'goal_change', prompt: 'Change my training goal.' },
    { label: 'Change weight goal', category: 'goals', topic: 'goals', intent: 'goal_change', prompt: 'Change my weight goal.' },
  ],
  general: [
    { label: 'Check macros', category: 'nutrition', topic: 'nutrition', intent: 'nutrition_status', prompt: 'How are my macros looking?' },
    { label: 'Today\'s workout', category: 'training', topic: 'training', intent: 'training_plan', prompt: 'What is my workout today?' },
    { label: 'Cardio plan', category: 'cardio', topic: 'cardio', intent: 'cardio_status', prompt: 'Review my cardio plan.' },
    { label: 'Weekly progress', category: 'progress', topic: 'progress', intent: 'progress_review', prompt: 'Review my weekly progress.' },
  ],
};

const FOLLOW_UPS: Partial<Record<IntentType, FollowUp[]>> = {
  log_meal: [
    { label: 'What should I eat next?', category: 'nutrition', prompt: 'What should I target for my next meal?' },
    { label: 'Calories left today', category: 'nutrition', prompt: 'How many calories do I have left for today?' },
    { label: 'Hit protein target', category: 'nutrition', prompt: 'How much protein do I still need today?' },
    { label: 'Log another meal', category: 'nutrition', prompt: 'I want to log another meal.' },
  ],
  estimate_food: [
    { label: 'Log this meal', category: 'nutrition', prompt: 'Log that meal for me.' },
    { label: 'Remaining macros', category: 'nutrition', prompt: 'How are my macros looking?' },
    { label: 'Better options?', category: 'nutrition', prompt: 'Are there higher-protein options I could eat instead?' },
    { label: 'Adjust my targets', category: 'goals', prompt: 'I want to adjust my calorie or macro goals.' },
  ],
  remaining_macros: [
    { label: 'What to eat next', category: 'nutrition', prompt: 'What should I target for my next meal?' },
    { label: 'Adjust calorie goal', category: 'goals', prompt: 'Increase my calories by 200.' },
    { label: 'Change protein target', category: 'goals', prompt: 'Update my protein goal.' },
    { label: 'Change fitness goal', category: 'goals', prompt: 'I want to change my overall fitness goal.' },
  ],
  adjust_calories: [
    { label: 'See new targets', category: 'nutrition', prompt: 'How are my macros looking now?' },
    { label: 'Change protein too', category: 'goals', prompt: 'Update my protein goal as well.' },
    { label: 'Switch to cut', category: 'goals', prompt: 'I want to switch to a cutting phase.' },
    { label: 'Plan tomorrow', category: 'planning', prompt: 'Help me plan tomorrow with my new targets.' },
  ],
  update_macros: [
    { label: 'See updated macros', category: 'nutrition', prompt: 'How are my macros looking now?' },
    { label: 'Plan a meal', category: 'nutrition', prompt: 'What should I eat to hit my new targets?' },
    { label: 'Switch to bulk', category: 'goals', prompt: 'I want to switch to a bulking phase.' },
    { label: 'Review progress', category: 'progress', prompt: 'Give me a progress update.' },
  ],
  build_workout: [
    { label: 'Save this workout', category: 'training', prompt: 'Save that workout for today.' },
    { label: 'Different workout', category: 'training', prompt: 'Build me a different workout.' },
    { label: 'Check my cardio', category: 'training', prompt: 'How is my cardio looking today?' },
    { label: 'Nutrition around it', category: 'nutrition', prompt: 'What should I eat around my workout?' },
  ],
  change_workout: [
    { label: 'Save this version', category: 'training', prompt: 'Save that workout for today.' },
    { label: 'Add more volume', category: 'training', prompt: 'Add more exercises to this workout.' },
    { label: 'Cardio instead', category: 'training', prompt: 'Should I do cardio today instead?' },
    { label: 'Post-workout meal', category: 'nutrition', prompt: 'What should I eat after my workout?' },
  ],
  cardio_review: [
    { label: 'Build a cardio plan', category: 'training', prompt: 'Build me a cardio routine for this week.' },
    { label: 'Update cardio goal', category: 'goals', prompt: 'Change my daily cardio goal.' },
    { label: 'Calories burned', category: 'training', prompt: 'How many calories did I burn from cardio?' },
    { label: 'Strength workout', category: 'training', prompt: 'Build me a strength workout for today.' },
  ],
  weight_explanation: [
    { label: 'Update weight goal', category: 'goals', prompt: 'I want to update my goal weight.' },
    { label: 'Switch to cut', category: 'goals', prompt: 'I want to switch to a cutting phase.' },
    { label: 'Adjust calories', category: 'goals', prompt: 'Adjust my calories for my weight goal.' },
    { label: 'Progress this week', category: 'progress', prompt: 'Give me a full progress update.' },
  ],
  progress_review: [
    { label: 'Adjust my plan', category: 'goals', prompt: 'I want to adjust my fitness plan.' },
    { label: 'Change my goal', category: 'goals', prompt: 'I want to change my goal weight.' },
    { label: 'Plan tomorrow', category: 'planning', prompt: 'Help me plan tomorrow.' },
    { label: 'Review nutrition', category: 'nutrition', prompt: 'How are my macros looking?' },
  ],
  plan_tomorrow: [
    { label: 'Build a workout', category: 'training', prompt: 'Build me a 45-minute workout for tomorrow.' },
    { label: 'Meal plan', category: 'nutrition', prompt: 'What should I eat tomorrow to hit my goals?' },
    { label: 'Adjust targets', category: 'goals', prompt: 'I want to adjust my calorie target.' },
    { label: 'Review today', category: 'progress', prompt: 'Review my day.' },
  ],
  change_goal: [
    { label: 'Switch to cut', category: 'goals', prompt: 'I want to start a cutting phase.' },
    { label: 'Switch to bulk', category: 'goals', prompt: 'I want to start a bulking phase.' },
    { label: 'Adjust calories now', category: 'goals', prompt: 'Adjust my calories for my new goal.' },
    { label: 'Build new workout', category: 'training', prompt: 'Build a workout for my new goal.' },
  ],
  create_cut: [
    { label: 'See new targets', category: 'nutrition', prompt: 'How are my macros looking now?' },
    { label: 'Plan meals', category: 'nutrition', prompt: 'What should I eat on a cut?' },
    { label: 'Cardio plan', category: 'training', prompt: 'How much cardio should I do while cutting?' },
    { label: 'Update weight goal', category: 'goals', prompt: 'Update my goal weight.' },
  ],
  create_bulk: [
    { label: 'See new targets', category: 'nutrition', prompt: 'How are my macros looking now?' },
    { label: 'Plan meals', category: 'nutrition', prompt: 'What should I eat to bulk effectively?' },
    { label: 'Build workout', category: 'training', prompt: 'Build me a hypertrophy workout.' },
    { label: 'Update weight goal', category: 'goals', prompt: 'Update my goal weight.' },
  ],
  maintenance_plan: [
    { label: 'Check macros', category: 'nutrition', prompt: 'How are my macros looking?' },
    { label: 'Daily workout', category: 'training', prompt: 'Build me a maintenance workout.' },
    { label: 'Plan tomorrow', category: 'planning', prompt: 'Help me plan tomorrow.' },
    { label: 'Progress check', category: 'progress', prompt: 'Give me a progress update.' },
  ],
  review_day: [
    { label: 'Plan tomorrow', category: 'planning', prompt: 'Help me plan tomorrow.' },
    { label: 'Adjust targets', category: 'goals', prompt: 'I want to adjust my targets for tomorrow.' },
    { label: 'What else today', category: 'nutrition', prompt: 'What should I still eat tonight?' },
    { label: 'Update weight', category: 'progress', prompt: 'Update my current weight.' },
  ],
  general: [
    { label: 'Check my macros', category: 'nutrition', prompt: 'How are my macros looking?' },
    { label: 'Today\'s workout', category: 'training', prompt: 'Build me a workout for today.' },
    { label: 'Am I on track?', category: 'progress', prompt: 'How am I doing today overall?' },
    { label: 'Change a goal', category: 'goals', prompt: 'I want to change my fitness goal.' },
  ],
};

/**
 * Returns 4 follow-up prompts that are contextually relevant to the last intent.
 * Shown as tappable chips after each coach response.
 */
export function generateFollowUpPrompts(intentType: IntentType): SuggestedPrompt[] {
  const topic = topicForIntent(intentType);
  const followUps = FOLLOW_UPS_BY_TOPIC[topic] ?? FOLLOW_UPS_BY_TOPIC.general;
  return followUps.slice(0, 4).map((f) => ({
    id: uid(),
    label: f.label,
    category: f.category,
    prompt: f.prompt,
    intent: f.intent ?? intentType,
    topic: f.topic ?? topic,
  }));
}

export function generateFollowUpPromptsForTopic(topic: CoachTopic): SuggestedPrompt[] {
  const followUps = FOLLOW_UPS_BY_TOPIC[topic] ?? FOLLOW_UPS_BY_TOPIC.general;
  return followUps.slice(0, 4).map((f) => ({
    id: uid(),
    label: f.label,
    category: f.category,
    prompt: f.prompt,
    intent: f.intent ?? 'unknown',
    topic: f.topic ?? topic,
  }));
}

function topicForIntent(intentType: IntentType): CoachTopic {
  if (['nutrition_status', 'meal_recommendation', 'meal_logging', 'protein_status', 'calorie_status', 'remaining_macros', 'log_meal', 'estimate_food'].includes(intentType)) return 'nutrition';
  if (['training_plan', 'workout_generation', 'workout_adjustment', 'build_workout', 'change_workout'].includes(intentType)) return 'training';
  if (['cardio_status', 'cardio_recommendation', 'cardio_review'].includes(intentType)) return 'cardio';
  if (['weight_explanation', 'progress_review'].includes(intentType)) return 'progress';
  if (intentType === 'recovery_status') return 'recovery';
  if (['goal_change', 'macro_adjustment', 'adjust_calories', 'update_macros', 'change_goal', 'create_cut', 'create_bulk'].includes(intentType)) return 'goals';
  return 'general';
}
