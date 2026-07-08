import type {
  AIContext,
  AIMessage,
  AIActionProposal,
  MealEstimateResponse,
  WorkoutProposal,
  WorkoutExercise,
} from '../types';
import { calculateMacroRecommendation } from '../../../domain/nutrition/macros/calculateMacroRecommendation';
import type { MacroPreference } from '../../../domain/recommendations/types';
import type { PrimaryGoal, TrainingExperience } from '../../../types';
import { parseMockIntent } from '../intents/parseMockIntent';

// ─── Helpers ─────────────────────────────────────────────────────────────────

let _msgCounter = 0;
const newId = () => `msg-${++_msgCounter}-${Date.now()}`;
const actionId = () => `action-${++_msgCounter}-${Date.now()}`;

function msg(
  ctx: AIContext,
  partial: Omit<AIMessage, 'id' | 'coachingStyle' | 'createdAt'>
): AIMessage {
  return {
    id: newId(),
    coachingStyle: ctx.persona.id,
    createdAt: new Date().toISOString(),
    ...partial,
  };
}

function isDirectStyle(ctx: AIContext) {
  return ctx.persona.id === 'direct';
}

function formatWeightFluctuation(ctx: AIContext, lbs: number, direction: 'up' | 'down' | 'stable') {
  if (isDirectStyle(ctx)) {
    if (direction === 'up') return `Weight is up ${lbs.toFixed(1)} lbs. Your 7-day average is on track, so this is likely glycogen and water retention. No adjustment needed.`;
    if (direction === 'down') return `Weight is down ${Math.abs(lbs).toFixed(1)} lbs. Rate of loss is within target range. Continue current protocol.`;
    return 'Weight is stable. 7-day average unchanged. On track.';
  }

  if (direction === 'up') return `Your weight is up ${lbs.toFixed(1)} lbs today, but the weekly trend still looks controlled. This is most likely normal water-weight movement.`;
  if (direction === 'down') return `Your weight is down ${Math.abs(lbs).toFixed(1)} lbs, and the trend is moving in the right direction.`;
  return 'Your weight is holding steady today, which is useful consistency data.';
}

function formatCaloriesLow(ctx: AIContext, remaining: number) {
  return isDirectStyle(ctx)
    ? `${remaining} calories remaining. Plan your next meal to close the deficit cleanly.`
    : `You still have ${remaining} calories to work with today. A balanced protein-forward meal would fit well.`;
}

function formatGreeting(ctx: AIContext) {
  if (isDirectStyle(ctx)) {
    const map: Record<string, string> = {
      morning: `Morning, ${ctx.user.name}. Here's what you need to know.`,
      afternoon: `${ctx.user.name}. Mid-day check-in.`,
      evening: `Evening, ${ctx.user.name}. Let's review your day.`,
      night: `${ctx.user.name}. Quick debrief before tomorrow.`,
    };
    return map[ctx.time.dayPart] ?? `${ctx.user.name}. Ready to work.`;
  }

  const map: Record<string, string> = {
    morning: `Good morning, ${ctx.user.name}. Here's a look at your day ahead.`,
    afternoon: `Hey ${ctx.user.name}, here's where things stand for the afternoon.`,
    evening: `Good evening, ${ctx.user.name}. Let's see how your day went.`,
    night: `Hi ${ctx.user.name}. Before you wind down, here's a quick overview.`,
  };
  return map[ctx.time.dayPart] ?? `Hi ${ctx.user.name}. Here's your update.`;
}

// ─── Meal estimator database (keyword → macros) ──────────────────────────────

interface FoodProfile {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const FOOD_DB: Array<{ keywords: string[]; profile: FoodProfile }> = [
  {
    keywords: ['chicken burrito', 'burrito'],
    profile: { calories: 780, protein: 52, carbs: 88, fat: 24 },
  },
  {
    keywords: ['protein shake', 'protein powder', 'shake'],
    profile: { calories: 200, protein: 25, carbs: 8, fat: 4 },
  },
  {
    keywords: ['chicken breast', 'grilled chicken'],
    profile: { calories: 280, protein: 54, carbs: 0, fat: 6 },
  },
  {
    keywords: ['rice', 'white rice', 'brown rice'],
    profile: { calories: 200, protein: 4, carbs: 44, fat: 1 },
  },
  {
    keywords: ['steak', 'beef steak'],
    profile: { calories: 400, protein: 50, carbs: 0, fat: 22 },
  },
  {
    keywords: ['oatmeal', 'oats'],
    profile: { calories: 300, protein: 10, carbs: 54, fat: 6 },
  },
  {
    keywords: ['eggs', 'scrambled eggs', 'egg'],
    profile: { calories: 220, protein: 18, carbs: 2, fat: 16 },
  },
  {
    keywords: ['salmon', 'grilled salmon'],
    profile: { calories: 350, protein: 48, carbs: 0, fat: 18 },
  },
  {
    keywords: ['pizza', 'slice'],
    profile: { calories: 600, protein: 24, carbs: 72, fat: 24 },
  },
  {
    keywords: ['sandwich', 'sub'],
    profile: { calories: 520, protein: 30, carbs: 60, fat: 18 },
  },
  {
    keywords: ['greek yogurt', 'yogurt'],
    profile: { calories: 140, protein: 20, carbs: 10, fat: 2 },
  },
  {
    keywords: ['banana'],
    profile: { calories: 105, protein: 1, carbs: 27, fat: 0 },
  },
  {
    keywords: ['apple'],
    profile: { calories: 80, protein: 0, carbs: 21, fat: 0 },
  },
  {
    keywords: ['burger', 'hamburger', 'cheeseburger'],
    profile: { calories: 650, protein: 38, carbs: 48, fat: 30 },
  },
  {
    keywords: ['pasta', 'spaghetti'],
    profile: { calories: 480, protein: 18, carbs: 84, fat: 8 },
  },
];

function estimateFoodProfile(description: string): { profile: FoodProfile; matched: boolean } {
  const lower = description.toLowerCase();
  for (const item of FOOD_DB) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return { profile: item.profile, matched: true };
    }
  }
  // Fallback generic estimate
  return {
    profile: { calories: 450, protein: 30, carbs: 50, fat: 15 },
    matched: false,
  };
}

// ─── Workout templates by goal + duration ─────────────────────────────────────

function buildWorkoutExercises(durationMinutes: number, bodyParts: string[]): WorkoutExercise[] {
  const allExercises: WorkoutExercise[] = [
    { name: 'Lat Pulldown', sets: 3, reps: '8–10', restSeconds: 90 },
    { name: 'Seated Cable Row', sets: 3, reps: '10–12', restSeconds: 90 },
    { name: 'Chest Supported Row', sets: 3, reps: '8–10', restSeconds: 90 },
    { name: 'Barbell Curl', sets: 3, reps: '8–10', restSeconds: 60 },
    { name: 'Hammer Curl', sets: 2, reps: '12–15', restSeconds: 60 },
    { name: 'Bench Press', sets: 4, reps: '6–8', restSeconds: 120 },
    { name: 'Incline DB Press', sets: 3, reps: '8–10', restSeconds: 90 },
    { name: 'Cable Fly', sets: 3, reps: '12–15', restSeconds: 60 },
    { name: 'Overhead Press', sets: 3, reps: '8–10', restSeconds: 90 },
    { name: 'Lateral Raise', sets: 3, reps: '15–20', restSeconds: 60 },
    { name: 'Squat', sets: 4, reps: '6–8', restSeconds: 120 },
    { name: 'Romanian Deadlift', sets: 3, reps: '8–10', restSeconds: 90 },
    { name: 'Leg Press', sets: 3, reps: '10–12', restSeconds: 90 },
    { name: 'Leg Curl', sets: 3, reps: '12–15', restSeconds: 60 },
    { name: 'Calf Raise', sets: 4, reps: '15–20', restSeconds: 45 },
  ];

  const count =
    durationMinutes <= 30 ? 3 :
    durationMinutes <= 45 ? 5 :
    durationMinutes <= 60 ? 6 : 8;

  return allExercises.slice(0, count);
}

// ─── Simulated network delay ──────────────────────────────────────────────────

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Generates a proactive brief for the Coach screen on load.
 * Tone adapts to the selected persona.
 */
export async function generateProactiveBrief(ctx: AIContext): Promise<AIMessage> {
  await delay(600);

  const { nutrition, training, progress } = ctx;

  const details: string[] = [];

  // Weight status
  const wChange = progress.weeklyWeightChange;
  if (Math.abs(wChange) > 0.1) {
    const direction = wChange > 0 ? 'up' : 'down';
    details.push(formatWeightFluctuation(ctx, Math.abs(wChange), direction));
  } else {
    details.push(formatWeightFluctuation(ctx, 0, 'stable'));
  }

  // Nutrition status
  const calPct = Math.round((nutrition.caloriesConsumed / nutrition.calorieGoal) * 100);
  if (isDirectStyle(ctx)) {
    details.push(
      `Calories: ${nutrition.caloriesConsumed} / ${nutrition.calorieGoal} kcal (${calPct}%). ` +
      `Protein: ${nutrition.proteinConsumed}g / ${nutrition.proteinGoal}g.`
    );
  } else {
    details.push(
      `You've had ${nutrition.caloriesConsumed} of your ${nutrition.calorieGoal} calorie goal today — that's ${calPct}%. ` +
      `Protein is at ${nutrition.proteinConsumed}g out of ${nutrition.proteinGoal}g.`
    );
  }

  // Workout status
  if (training.scheduledWorkoutName) {
    if (training.completed) {
      details.push(
        isDirectStyle(ctx)
          ? `${training.scheduledWorkoutName} — complete. Good execution.`
          : `You've already finished ${training.scheduledWorkoutName} — nice work!`
      );
    } else {
      details.push(
        isDirectStyle(ctx)
          ? `${training.scheduledWorkoutName} is scheduled. Not yet logged.`
          : `${training.scheduledWorkoutName} is on your plan for today. Ready when you are.`
      );
    }
  }

  // Cardio
  const stepPct = Math.round((ctx.recovery.steps / 10000) * 100);
  details.push(
    isDirectStyle(ctx)
      ? `Steps: ${ctx.recovery.steps.toLocaleString()} (${stepPct}% of 10,000).`
      : `You've hit ${stepPct}% of your step goal — ${ctx.recovery.steps.toLocaleString()} steps so far.`
  );

  return msg(ctx, {
    title: formatGreeting(ctx),
    summary: isDirectStyle(ctx)
      ? "Here's your current status."
      : "Here's a look at how your day is going.",
    details,
    confidence: 'high',
  });
}

/**
 * Routes a user prompt to the appropriate mock response function.
 */
export async function answerCoachPrompt(
  prompt: string,
  ctx: AIContext
): Promise<AIMessage> {
  await delay(900);

  const intent = parseMockIntent(prompt);

  switch (intent.type) {
    case 'meal_logging':
    case 'log_meal':
    case 'estimate_food': {
      const { message } = await estimateMeal(
        (intent.extractedValues.foodDescription as string) || prompt,
        ctx
      );
      return message;
    }
    case 'nutrition_status':
    case 'protein_status':
    case 'calorie_status':
    case 'remaining_macros':
      return buildRemainingMacrosMessage(ctx);
    case 'meal_recommendation':
      return buildMealRecommendationMessage(ctx);
    case 'macro_adjustment':
    case 'calorie_adjustment':
    case 'adjust_calories':
    case 'update_macros': {
      const amount = (intent.extractedValues.amount as number) ?? 200;
      const direction = (intent.extractedValues.direction as string) ?? 'increase';
      const { message } = await proposeMacroAdjustment(
        `${direction} by ${amount}`,
        ctx
      );
      return message;
    }
    case 'diet_strategy_compare':
      return buildDietStrategyCompareMessage(ctx);
    case 'diet_strategy_recommend':
      return buildDietStrategyRecommendationMessage(ctx);
    case 'diet_plan_preview':
      return buildDietPlanPreviewMessage(ctx, false);
    case 'diet_plan_apply':
      return buildDietPlanPreviewMessage(ctx, true);
    case 'navigation':
      return buildNavigationMessage(ctx, intent.extractedValues);
    case 'training_plan':
      return buildTrainingPlanMessage(ctx);
    case 'workout_generation':
    case 'build_workout':
    case 'workout_adjustment':
    case 'change_workout': {
      const duration = (intent.extractedValues.durationMinutes as number) ?? 45;
      const { message } = await generateWorkout(duration, ctx);
      return message;
    }
    case 'exercise_replacement':
    case 'training_plan_generation': {
      const duration = (intent.extractedValues.durationMinutes as number) ?? 45;
      const { message } = await generateWorkout(duration, ctx);
      return message;
    }
    case 'cardio_status':
    case 'cardio_recommendation':
    case 'cardio_review':
      return buildCardioMessage(ctx);
    case 'weight_explanation':
      return analyzeWeightChange(ctx);
    case 'progress_review':
      return buildProgressMessage(ctx);
    case 'recovery_status':
      return buildRecoveryMessage(ctx);
    case 'tomorrow_plan':
    case 'plan_tomorrow':
      return buildPlanTomorrowMessage(ctx);
    case 'daily_review':
    case 'review_day':
      return reviewDay(ctx);
    case 'goal_change':
    case 'goal_update':
    case 'change_goal':
      return buildWeightGoalMessage(ctx);
    case 'create_cut':
      return buildGoalMessage(ctx, 'cut');
    case 'create_bulk':
      return buildGoalMessage(ctx, 'bulk');
    default:
      return buildGeneralResponse(prompt, ctx);
  }
}

/**
 * Estimates the macros for a described meal and proposes a log_meal action.
 */
export async function estimateMeal(
  description: string,
  ctx: AIContext
): Promise<MealEstimateResponse> {
  await delay(400);

  const { profile, matched } = estimateFoodProfile(description);
  const confidence = matched ? 'high' : 'medium';

  const actionProposal: AIActionProposal = {
    id: actionId(),
    type: 'log_meal',
    title: 'Log this meal',
    description: `Add to Meal ${ctx.nutrition.mealsLogged + 1}: ${description}`,
    payload: {
      name: description,
      calories: profile.calories,
      proteinGrams: profile.protein,
      carbsGrams: profile.carbs,
      fatGrams: profile.fat,
    },
    requiresConfirmation: true,
    status: 'proposed',
  };

  const summary = isDirectStyle(ctx)
    ? `Estimated: ${profile.calories} kcal — ${profile.protein}g protein, ${profile.carbs}g carbs, ${profile.fat}g fat.`
    : `For "${description}", I'm estimating ${profile.calories} calories with ${profile.protein}g protein, ${profile.carbs}g carbs, and ${profile.fat}g fat.`;

  const caloriesAfter = ctx.nutrition.caloriesConsumed + profile.calories;
  const remaining = Math.max(0, ctx.nutrition.calorieGoal - caloriesAfter);

  return {
    estimate: {
      name: description,
      calories: profile.calories,
      protein: profile.protein,
      carbs: profile.carbs,
      fat: profile.fat,
      confidence,
    },
    message: msg(ctx, {
      title: isDirectStyle(ctx) ? 'Meal Estimate' : 'Here\'s my estimate',
      summary,
      details: [
        `Confidence: ${confidence}${matched ? '' : ' — best estimate for unrecognised food'}`,
        `After logging: ${caloriesAfter} / ${ctx.nutrition.calorieGoal} kcal`,
        `${remaining} calories remaining`,
      ],
      recommendation: formatCaloriesLow(ctx, remaining),
      confidence,
      proposedActions: [actionProposal],
    }),
  };
}

/**
 * Generates a workout proposal for a given duration.
 */
export async function generateWorkout(
  durationMinutes: number,
  ctx: AIContext
): Promise<WorkoutProposal> {
  await delay(500);

  const exercises = buildWorkoutExercises(durationMinutes, ctx.training.scheduledBodyParts);
  const estimatedCalories = Math.round(durationMinutes * 6.5);
  const name = ctx.training.scheduledWorkoutName ?? 'Custom Workout';

  const actionProposal: AIActionProposal = {
    id: actionId(),
    type: 'save_workout',
    title: 'Save this workout',
    description: `Save "${name}" with ${exercises.length} exercises`,
    payload: {
      name,
      durationMinutes,
      exercises,
      estimatedCalories,
    },
    requiresConfirmation: true,
    status: 'proposed',
  };

  const summary = isDirectStyle(ctx)
    ? `${name} — ${durationMinutes} min, ${exercises.length} exercises. Estimated ${estimatedCalories} kcal.`
    : `Here's a ${durationMinutes}-minute ${name} for you — ${exercises.length} exercises, estimated ${estimatedCalories} calories burned.`;

  return {
    name,
    durationMinutes,
    bodyParts: ctx.training.scheduledBodyParts,
    exercises,
    estimatedCalories,
    message: msg(ctx, {
      title: isDirectStyle(ctx) ? 'Workout Plan' : 'Your workout is ready',
      summary,
      details: exercises.map((e) => `${e.name} — ${e.sets} × ${e.reps}`),
      recommendation: isDirectStyle(ctx)
        ? 'Start with your heaviest compound movements while CNS is fresh.'
        : 'Start with the bigger exercises first when you have the most energy.',
      confidence: 'high',
      proposedActions: [actionProposal],
    }),
  };
}

/**
 * Explains the user's recent weight change.
 */
export async function analyzeWeightChange(ctx: AIContext): Promise<AIMessage> {
  await delay(400);

  const { progress } = ctx;
  const change = progress.weeklyWeightChange;
  const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

  return msg(ctx, {
    title: isDirectStyle(ctx) ? 'Weight Analysis' : 'About your weight',
    summary: formatWeightFluctuation(ctx, Math.abs(change), direction),
    details: [
      `Current: ${progress.currentWeight.toFixed(1)} lbs`,
      `7-day average: ${progress.sevenDayAverage.toFixed(1)} lbs`,
      `Weekly change: ${change > 0 ? '+' : ''}${change.toFixed(1)} lbs`,
      `Goal: ${progress.goalWeight} lbs`,
    ],
    recommendation: isDirectStyle(ctx)
      ? 'Continue tracking daily. Assess the 7-day trend, not individual readings.'
      : 'Focus on the weekly average rather than any single day — that\'s what tells the real story.',
    confidence: 'medium',
  });
}

/**
 * Produces an end-of-day review.
 */
export async function reviewDay(ctx: AIContext): Promise<AIMessage> {
  await delay(600);

  const { nutrition, training, recovery } = ctx;
  const calPct = Math.round((nutrition.caloriesConsumed / nutrition.calorieGoal) * 100);
  const proteinPct = Math.round((nutrition.proteinConsumed / nutrition.proteinGoal) * 100);

  const summary = isDirectStyle(ctx)
    ? `Daily review: calories at ${calPct}%, protein at ${proteinPct}%. Workout ${training.completed ? 'complete' : 'incomplete'}.`
    : `Here's how your day went — you hit ${calPct}% of your calorie goal and ${proteinPct}% of your protein target. ${training.completed ? 'Workout is done — great job!' : 'The workout is still pending.'}`;

  return msg(ctx, {
    title: isDirectStyle(ctx) ? 'Day Review' : 'Your Day in Review',
    summary,
    details: [
      `Calories: ${nutrition.caloriesConsumed} / ${nutrition.calorieGoal} kcal (${calPct}%)`,
      `Protein: ${nutrition.proteinConsumed}g / ${nutrition.proteinGoal}g (${proteinPct}%)`,
      `Carbs: ${nutrition.carbsConsumed}g / ${nutrition.carbGoal}g`,
      `Fat: ${nutrition.fatConsumed}g / ${nutrition.fatGoal}g`,
      `Steps: ${recovery.steps.toLocaleString()}`,
      `Workout: ${training.completed ? '✓ Complete' : '— Not logged'}`,
    ],
    recommendation:
      calPct < 80
        ? isDirectStyle(ctx)
          ? 'Under-eating by this margin will compromise recovery. Prioritise a full meal before sleep.'
          : 'You\'re a bit under on calories today. A small meal before bed would really help recovery.'
        : isDirectStyle(ctx)
          ? 'Good adherence today. Maintain this consistency across the week.'
          : 'Great consistency today — this is exactly the kind of day that drives results.',
    confidence: 'high',
  });
}

/**
 * Proposes a macro adjustment based on a natural language request.
 */
export async function proposeMacroAdjustment(
  requestedChange: string,
  ctx: AIContext
): Promise<{ message: AIMessage; proposal: { calories: number; protein: number; carbs: number; fat: number } }> {
  await delay(500);

  const { nutrition } = ctx;
  const isIncrease = !/decreas|reduc|cut|lower/i.test(requestedChange);
  const match = requestedChange.match(/(\d+)/);
  const calDelta = match ? parseInt(match[1], 10) : 200;

  const newCalories = isIncrease
    ? nutrition.calorieGoal + calDelta
    : Math.max(1200, nutrition.calorieGoal - calDelta);

  const recommendation = recommendMacrosForAIContext(ctx, newCalories, isIncrease ? 'balanced' : 'higher_protein');
  const newProtein = recommendation.proteinGoal;
  const newCarbs = recommendation.carbGoal;
  const newFat = recommendation.fatGoal;

  const proposal = { calories: newCalories, protein: newProtein, carbs: newCarbs, fat: newFat };

  const actionProposal: AIActionProposal = {
    id: actionId(),
    type: 'update_macros',
    title: isIncrease ? 'Increase calorie target' : 'Decrease calorie target',
    description: `${nutrition.calorieGoal} → ${newCalories} kcal`,
    payload: {
      calorieGoal: newCalories,
      proteinGoal: newProtein,
      carbGoal: newCarbs,
      fatGoal: newFat,
    },
    requiresConfirmation: true,
    status: 'proposed',
  };

  const summary = isDirectStyle(ctx)
    ? `Proposed adjustment: ${isIncrease ? '+' : '-'}${Math.abs(calDelta)} kcal using Form Theory macro rules.`
    : `I'd adjust calories and let the macro engine rebalance protein, carbs, and fats around your current goal.`;

  return {
    proposal,
    message: msg(ctx, {
      title: 'Macro Adjustment',
      summary,
      details: [
        `Calories: ${nutrition.calorieGoal} → ${newCalories} kcal`,
        `Protein: ${nutrition.proteinGoal}g → ${newProtein}g`,
        `Carbs: ${nutrition.carbGoal}g → ${newCarbs}g`,
        `Fat: ${nutrition.fatGoal}g → ${newFat}g`,
        `Rules: ${recommendation.ruleIds.join(', ')}`,
        `Sources: ${recommendation.sourceIds.join(', ')}`,
      ],
      recommendation: isDirectStyle(ctx)
        ? 'Monitor weight trend over 2 weeks before further adjustments.'
        : 'Give it 2 weeks and we can revisit based on how your body responds.',
      confidence: recommendation.confidence,
      proposedActions: [actionProposal],
    }),
  };
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function buildRemainingMacrosMessage(ctx: AIContext): AIMessage {
  const { nutrition } = ctx;
  const calPct = Math.round((nutrition.caloriesConsumed / nutrition.calorieGoal) * 100);

  return msg(ctx, {
    topic: 'nutrition',
    intent: 'nutrition_status',
    title: isDirectStyle(ctx) ? 'Macro Status' : 'Your macros right now',
    summary: isDirectStyle(ctx)
      ? `${calPct}% of calorie goal reached. ${nutrition.caloriesRemaining} kcal remaining.`
      : `You're at ${calPct}% of your calorie goal for the day — ${nutrition.caloriesRemaining} calories left.`,
    details: [
      `Calories: ${nutrition.caloriesConsumed} / ${nutrition.calorieGoal} (${nutrition.caloriesRemaining} remaining)`,
      `Protein: ${nutrition.proteinConsumed}g / ${nutrition.proteinGoal}g (${nutrition.proteinRemaining}g remaining)`,
      `Carbs: ${nutrition.carbsConsumed}g / ${nutrition.carbGoal}g (${nutrition.carbsRemaining}g remaining)`,
      `Fat: ${nutrition.fatConsumed}g / ${nutrition.fatGoal}g (${nutrition.fatRemaining}g remaining)`,
    ],
    recommendation:
      nutrition.proteinRemaining > 40
        ? isDirectStyle(ctx)
          ? `${nutrition.proteinRemaining}g protein outstanding. Prioritise protein in your next meal.`
          : `You still need ${nutrition.proteinRemaining}g of protein. A protein-forward meal or shake would help close that gap.`
        : isDirectStyle(ctx)
          ? 'Protein target is on track.'
          : 'Your protein is looking good!',
    confidence: 'high',
  });
}

function buildMealRecommendationMessage(ctx: AIContext): AIMessage {
  const { nutrition } = ctx;
  const meal = nutrition.proteinRemaining > 35
    ? 'grilled chicken, rice, and a lower-fat vegetable side'
    : 'Greek yogurt with fruit or a turkey sandwich';

  return msg(ctx, {
    topic: 'nutrition',
    intent: 'meal_recommendation',
    title: isDirectStyle(ctx) ? 'Next Meal Target' : 'A good next meal',
    summary: isDirectStyle(ctx)
      ? `${nutrition.caloriesRemaining} kcal remain: ${nutrition.proteinRemaining}g protein, ${nutrition.carbsRemaining}g carbs, ${nutrition.fatRemaining}g fat.`
      : `You have ${nutrition.caloriesRemaining} calories left, with ${nutrition.proteinRemaining}g protein and ${nutrition.carbsRemaining}g carbs still open.`,
    details: [
      `Protein remaining: ${nutrition.proteinRemaining}g`,
      `Carbs remaining: ${nutrition.carbsRemaining}g`,
      `Fat remaining: ${nutrition.fatRemaining}g`,
    ],
    recommendation: isDirectStyle(ctx)
      ? `Use ${meal}. It closes the protein gap without pushing fats high.`
      : `${meal} would fit nicely here and help you finish the day without forcing anything heavy.`,
    confidence: 'high',
  });
}

function buildDietStrategyCompareMessage(ctx: AIContext): AIMessage {
  const strategies = [
    'Protein-forward calorie-controlled: useful for body recomposition and appetite control.',
    'Mediterranean: easiest long-term adherence, strong for health markers, moderate protein unless planned.',
    'Lower-carbohydrate: useful for appetite control, but may reduce training performance if pushed too hard.',
    'Flexible dieting: strongest fit when consistency and social flexibility matter most.',
  ];

  return msg(ctx, {
    topic: 'nutrition',
    intent: 'diet_strategy_compare',
    title: isDirectStyle(ctx) ? 'Diet Strategy Comparison' : 'Comparing diet approaches',
    summary: isDirectStyle(ctx)
      ? 'For your current data, adherence and protein are higher leverage than a named diet label.'
      : 'The best diet here is the one that protects protein, supports training, and feels repeatable enough to actually live with.',
    details: strategies,
    recommendation: isDirectStyle(ctx)
      ? 'Use a protein-forward flexible plan unless you have a strong preference for Mediterranean structure.'
      : 'I would start with a protein-forward flexible plan, then borrow Mediterranean meal patterns when you want structure.',
    confidence: 'high',
  });
}

function buildDietStrategyRecommendationMessage(ctx: AIContext): AIMessage {
  return msg(ctx, {
    topic: 'nutrition',
    intent: 'diet_strategy_recommend',
    title: isDirectStyle(ctx) ? 'Recommended Diet Strategy' : 'The diet I would choose for you',
    summary: isDirectStyle(ctx)
      ? `Recommendation: protein-forward flexible dieting at ${ctx.nutrition.calorieGoal} kcal.`
      : 'I would use protein-forward flexible dieting for you: enough structure to hit targets, enough freedom to stay consistent.',
    details: [
      `${ctx.nutrition.proteinGoal}g protein as the anchor`,
      `${ctx.nutrition.calorieGoal} kcal daily target`,
      'Carbs placed around training for performance',
      'Mostly whole foods, with planned flexibility instead of all-or-nothing rules',
    ],
    recommendation: 'Ask me to preview the plan and I will show the target split before anything changes.',
    confidence: 'high',
  });
}

function buildDietPlanPreviewMessage(ctx: AIContext, includeAction: boolean): AIMessage {
  const targetCalories = ctx.user.primaryGoal === 'lose'
    ? Math.max(1500, ctx.nutrition.calorieGoal - 200)
    : ctx.user.primaryGoal === 'gain'
      ? ctx.nutrition.calorieGoal + 200
      : ctx.nutrition.calorieGoal;
  const recommendation = recommendMacrosForAIContext(ctx, targetCalories, ctx.user.primaryGoal === 'lose' ? 'higher_protein' : 'balanced');
  const proteinGoal = recommendation.proteinGoal;
  const carbGoal = recommendation.carbGoal;
  const fatGoal = recommendation.fatGoal;

  const actionProposal: AIActionProposal = {
    id: actionId(),
    type: 'update_macros',
    title: 'Apply diet plan targets',
    description: `${targetCalories} kcal, ${proteinGoal}g protein, ${carbGoal}g carbs, ${fatGoal}g fat`,
    payload: {
      calorieGoal: targetCalories,
      proteinGoal,
      carbGoal,
      fatGoal,
    },
    requiresConfirmation: true,
    status: 'proposed',
  };

  return msg(ctx, {
    topic: 'nutrition',
    intent: includeAction ? 'diet_plan_apply' : 'diet_plan_preview',
    title: isDirectStyle(ctx) ? 'Diet Plan Preview' : 'Diet plan preview',
    summary: isDirectStyle(ctx)
      ? 'Protein-forward flexible plan. Conservative targets, training-compatible carbohydrate intake.'
      : 'Here is the plan I would use: high protein, flexible food choices, and enough carbs to keep training productive.',
    details: [
      `Calories: ${ctx.nutrition.calorieGoal} -> ${targetCalories} kcal`,
      `Protein: ${ctx.nutrition.proteinGoal}g -> ${proteinGoal}g`,
      `Carbs: ${ctx.nutrition.carbGoal}g -> ${carbGoal}g`,
      `Fat: ${ctx.nutrition.fatGoal}g -> ${fatGoal}g`,
      `Rules: ${recommendation.ruleIds.join(', ')}`,
      `Sources: ${recommendation.sourceIds.join(', ')}`,
      'Meal pattern: 3-4 meals, each with a protein anchor',
    ],
    recommendation: includeAction
      ? 'Confirm to apply these macro targets. This will not erase logged meals or training data.'
      : 'Nothing changes yet. Ask me to apply this plan when you want these targets saved.',
    confidence: recommendation.confidence,
    proposedActions: includeAction ? [actionProposal] : undefined,
  });
}

function recommendMacrosForAIContext(ctx: AIContext, calorieGoal: number, macroPreference: MacroPreference) {
  const result = calculateMacroRecommendation({
    calorieGoal,
    bodyWeightKg: Math.max(45, Math.round(ctx.user.currentWeight / 2.20462)),
    primaryGoal: mapAIContextGoalToPrimaryGoal(ctx.user.primaryGoal),
    trainingExperience: mapAIContextTrainingExperience(ctx.user.trainingExperience),
    macroPreference,
  });

  return {
    proteinGoal: result.active.proteinGrams,
    carbGoal: result.active.carbsGrams,
    fatGoal: result.active.fatGrams,
    confidence: result.metadata.confidence,
    sourceIds: result.metadata.sourceIds,
    ruleIds: result.metadata.rationale.map((item) => item.ruleId),
  };
}

function mapAIContextGoalToPrimaryGoal(goal: AIContext['user']['primaryGoal']): PrimaryGoal {
  if (goal === 'lose') return 'fat_loss';
  if (goal === 'gain') return 'muscle_gain';
  if (goal === 'recomp') return 'recomposition';
  return 'maintenance';
}

function mapAIContextTrainingExperience(experience: AIContext['user']['trainingExperience']): TrainingExperience {
  if (experience === 'advanced') return 'advanced';
  if (experience === 'intermediate') return 'intermediate';
  return 'beginner';
}

function buildNavigationMessage(ctx: AIContext, values: Record<string, unknown>): AIMessage {
  const route = typeof values.route === 'string' ? values.route : '/';
  const label = typeof values.label === 'string' ? values.label : 'Dashboard';
  const actionProposal: AIActionProposal = {
    id: actionId(),
    type: 'navigate',
    title: `Open ${label}`,
    description: `Move to the ${label} screen with this Coach context preserved.`,
    payload: { route, label },
    requiresConfirmation: true,
    status: 'proposed',
  };

  return msg(ctx, {
    topic: 'general',
    intent: 'navigation',
    title: isDirectStyle(ctx) ? 'Navigation Ready' : `I can open ${label}`,
    summary: isDirectStyle(ctx)
      ? `${label} is the correct screen for the next step.`
      : `Yes. I can take you to ${label} and keep this conversation here when you come back.`,
    details: [`Destination: ${label}`, 'Conversation and selected Coach stay intact.'],
    recommendation: 'Confirm and I will open it.',
    confidence: 'high',
    proposedActions: [actionProposal],
  });
}

function buildTrainingPlanMessage(ctx: AIContext): AIMessage {
  const { training } = ctx;
  return msg(ctx, {
    topic: 'training',
    intent: 'training_plan',
    title: isDirectStyle(ctx) ? 'Today\'s Training' : 'Today\'s workout',
    summary: isDirectStyle(ctx)
      ? `${training.scheduledWorkoutName ?? 'Training'} is scheduled for ${training.durationMinutes ?? 60} minutes. Status: ${training.completed ? 'complete' : 'not logged'}.`
      : `Today is ${training.scheduledWorkoutName ?? 'your planned workout'}, around ${training.durationMinutes ?? 60} minutes. It has not been logged yet.`,
    details: [
      `Focus: ${training.scheduledBodyParts.slice(0, 4).join(', ') || 'Full body'}`,
      `Estimated calories: ${training.estimatedCalories ?? 420}`,
      `Workout status: ${training.completed ? 'Complete' : 'Planned'}`,
    ],
    recommendation: isDirectStyle(ctx)
      ? 'Complete strength first, then finish cardio after if energy remains stable.'
      : 'Get the strength work done first, then keep cardio easy afterward if you still feel good.',
    confidence: 'high',
  });
}

function buildCardioMessage(ctx: AIContext): AIMessage {
  const { training, recovery } = ctx;
  const stepPct = Math.round((recovery.steps / 10000) * 100);
  const cardioDone = training.cardioCompletedMinutes >= training.cardioGoalMinutes;

  return msg(ctx, {
    topic: 'cardio',
    intent: 'cardio_status',
    title: isDirectStyle(ctx) ? 'Cardio & Activity' : 'Your activity today',
    summary: isDirectStyle(ctx)
      ? `Steps: ${recovery.steps.toLocaleString()} (${stepPct}%). Cardio: ${training.cardioCompletedMinutes}/${training.cardioGoalMinutes} min.`
      : `You've walked ${recovery.steps.toLocaleString()} steps today — ${stepPct}% of your goal. Cardio is at ${training.cardioCompletedMinutes} of ${training.cardioGoalMinutes} minutes.`,
    details: [
      `Steps: ${recovery.steps.toLocaleString()} / 10,000 (${stepPct}%)`,
      `Active calories: ${recovery.activeCalories}`,
      `Cardio: ${training.cardioCompletedMinutes} / ${training.cardioGoalMinutes} min ${cardioDone ? '✓' : ''}`,
    ],
    recommendation: cardioDone
      ? isDirectStyle(ctx)
        ? 'Cardio goal met. Focus on recovery.'
        : 'Cardio goal is done — great effort!'
      : isDirectStyle(ctx)
        ? `${training.cardioGoalMinutes - training.cardioCompletedMinutes} cardio minutes outstanding.`
        : `You have ${training.cardioGoalMinutes - training.cardioCompletedMinutes} minutes of cardio left. Even a walk would count.`,
    confidence: 'high',
  });
}

function buildProgressMessage(ctx: AIContext): AIMessage {
  const { progress } = ctx;

  return msg(ctx, {
    topic: 'progress',
    intent: 'progress_review',
    title: isDirectStyle(ctx) ? 'Progress Report' : 'Your progress',
    summary: isDirectStyle(ctx)
      ? `Weight is trending ${progress.weeklyWeightChange > 0 ? 'up' : 'down'}. Strength score: ${progress.strengthScore} (+${progress.strengthScoreChange} this month).`
      : `Your strength score is ${progress.strengthScore} — up ${progress.strengthScoreChange} points this month. Weight is ${progress.weeklyWeightChange > 0 ? 'trending up' : 'trending down'} as planned.`,
    details: [
      `Current weight: ${progress.currentWeight.toFixed(1)} lbs (goal: ${progress.goalWeight} lbs)`,
      `7-day average: ${progress.sevenDayAverage.toFixed(1)} lbs`,
      `Weekly change: ${progress.weeklyWeightChange > 0 ? '+' : ''}${progress.weeklyWeightChange.toFixed(1)} lbs`,
      `Strength score: ${progress.strengthScore} (+${progress.strengthScoreChange} this month)`,
    ],
    recommendation: isDirectStyle(ctx)
      ? 'Rate of weight gain is within target range. Continue current plan.'
      : 'Everything is moving in the right direction. Keep the consistency going.',
    confidence: 'high',
  });
}

function buildPlanTomorrowMessage(ctx: AIContext): AIMessage {
  const { time, nutrition, training } = ctx;

  return msg(ctx, {
    topic: 'general',
    intent: 'tomorrow_plan',
    title: isDirectStyle(ctx) ? 'Tomorrow\'s Plan' : 'Planning tomorrow',
    summary: isDirectStyle(ctx)
      ? `Calorie target: ${nutrition.calorieGoal} kcal. Training: ${training.scheduledWorkoutName ?? 'rest day'}.`
      : `Here's a simple plan for tomorrow to keep your momentum going.`,
    details: [
      `Nutrition: ${nutrition.calorieGoal} kcal, ${nutrition.proteinGoal}g protein`,
      `Training: ${training.scheduledWorkoutName ?? 'Active recovery or rest'}`,
      `Cardio: ${training.cardioGoalMinutes} minutes target`,
      `Sleep target: 7.5–8 hours`,
    ],
    recommendation: isDirectStyle(ctx)
      ? 'Prep your meals the night before to reduce friction with adherence.'
      : 'A little prep tonight will make tomorrow much easier — especially for nutrition.',
    confidence: 'medium',
  });
}

function buildRecoveryMessage(ctx: AIContext): AIMessage {
  const { recovery } = ctx;
  return msg(ctx, {
    topic: 'recovery',
    intent: 'recovery_status',
    title: isDirectStyle(ctx) ? 'Recovery Status' : 'Recovery check',
    summary: isDirectStyle(ctx)
      ? `Sleep: ${recovery.sleepHours}h. Quality: ${recovery.sleepQuality}. Steps: ${recovery.steps.toLocaleString()}.`
      : `You slept ${recovery.sleepHours} hours and your recovery score is ${recovery.sleepQuality}. That's workable, but keep tonight calm.`,
    details: [
      `Sleep: ${recovery.sleepHours} hours`,
      `Sleep quality: ${recovery.sleepQuality}`,
      `Resting heart rate: ${recovery.restingHeartRate} bpm`,
    ],
    recommendation: isDirectStyle(ctx)
      ? 'Train as planned, but avoid adding extra volume today.'
      : 'Follow the plan, and keep a little energy in reserve instead of forcing extra work.',
    confidence: 'high',
  });
}

function buildWeightGoalMessage(ctx: AIContext): AIMessage {
  const target = ctx.progress.goalWeight + 2;
  const actionProposal: AIActionProposal = {
    id: actionId(),
    type: 'update_weight_goal',
    title: 'Update weight goal',
    description: `${ctx.progress.goalWeight} lbs → ${target} lbs`,
    payload: { goalWeightLbs: target },
    requiresConfirmation: true,
    status: 'proposed',
  };

  return msg(ctx, {
    topic: 'goals',
    intent: 'goal_change',
    title: isDirectStyle(ctx) ? 'Goal Adjustment' : 'Adjusting your goal',
    summary: isDirectStyle(ctx)
      ? `Current goal: ${ctx.progress.goalWeight} lbs. Proposed goal: ${target} lbs.`
      : `We can move your goal from ${ctx.progress.goalWeight} to ${target} lbs and keep the plan measured.`,
    details: [
      `Current weight: ${ctx.progress.currentWeight.toFixed(1)} lbs`,
      `7-day average: ${ctx.progress.sevenDayAverage.toFixed(1)} lbs`,
      `Weekly change: ${ctx.progress.weeklyWeightChange > 0 ? '+' : ''}${ctx.progress.weeklyWeightChange.toFixed(1)} lbs`,
    ],
    recommendation: isDirectStyle(ctx)
      ? 'Use small target changes. Keep nutrition stable until trend data changes.'
      : 'A small goal change is easier to manage and gives us cleaner feedback from the trend.',
    confidence: 'medium',
    proposedActions: [actionProposal],
  });
}

function buildGoalMessage(ctx: AIContext, mode: 'cut' | 'bulk'): AIMessage {
  const { nutrition } = ctx;
  const targetCalories = mode === 'cut'
    ? Math.max(1500, nutrition.calorieGoal - 400)
    : nutrition.calorieGoal + 300;

  const actionProposal: AIActionProposal = {
    id: actionId(),
    type: 'create_plan',
    title: mode === 'cut' ? 'Start a cut' : 'Start a bulk',
    description: `Adjust calories to ${targetCalories} kcal/day`,
    payload: { calorieGoal: targetCalories, mode },
    requiresConfirmation: true,
    status: 'proposed',
  };

  return msg(ctx, {
    topic: 'goals',
    intent: mode === 'cut' ? 'create_cut' : 'create_bulk',
    title: mode === 'cut' ? 'Starting a Cut' : 'Starting a Bulk',
    summary: isDirectStyle(ctx)
      ? `Recommended ${mode} target: ${targetCalories} kcal. This creates a ${Math.abs(targetCalories - nutrition.calorieGoal)} kcal ${mode === 'cut' ? 'deficit' : 'surplus'}.`
      : `For a ${mode}, I'd suggest aiming for around ${targetCalories} calories per day — a ${Math.abs(targetCalories - nutrition.calorieGoal)} calorie ${mode === 'cut' ? 'deficit' : 'surplus'}.`,
    details: [
      `Current: ${nutrition.calorieGoal} kcal`,
      `Proposed: ${targetCalories} kcal`,
      `${mode === 'cut' ? 'Deficit' : 'Surplus'}: ${Math.abs(targetCalories - nutrition.calorieGoal)} kcal`,
      mode === 'cut' ? 'Keep protein high to preserve muscle.' : 'Distribute surplus mainly through carbohydrates.',
    ],
    recommendation: isDirectStyle(ctx)
      ? 'Confirm to apply. Reassess after 3 weeks of consistent data.'
      : 'This is a conservative and sustainable approach. Confirm when ready.',
    confidence: 'high',
    proposedActions: [actionProposal],
  });
}

function buildGeneralResponse(prompt: string, ctx: AIContext): AIMessage {
  const intent = parseMockIntent(prompt);
  const choicesByTopic: Record<string, string[]> = {
    nutrition: ['Show my remaining macros', 'What should I eat next?', 'Change my nutrition goal'],
    training: ['Show today\'s workout', 'Build a 45-minute workout', 'Change my training goal'],
    cardio: ['Review my cardio plan', 'Recommend cardio for today', 'Change my cardio goal'],
    progress: ['Explain my weight trend', 'Review weekly progress', 'Change my weight goal'],
    recovery: ['Should I train hard today?', 'How should I recover tonight?', 'Adjust today\'s workout'],
    general: ['Check nutrition', 'Review training', 'Review progress'],
  };
  const choices = choicesByTopic[intent.topic] ?? choicesByTopic.general;

  return msg(ctx, {
    topic: intent.topic,
    intent: 'unknown',
    summary: isDirectStyle(ctx)
      ? `Clarify the target. Are you asking about ${choices.join(', ').toLowerCase()}?`
      : `I want to answer the right thing. Are you asking about ${choices.join(', ').toLowerCase()}?`,
    details: choices,
    recommendation: 'Pick one of these and I will narrow the response.',
    confidence: 'low',
  });
}
