import type { CoachTopic, ParsedIntent, IntentType } from '../types';

interface IntentPattern {
  type: IntentType;
  topic: CoachTopic;
  confidence?: ParsedIntent['confidence'];
  patterns: RegExp[];
  extractors?: Array<(text: string) => Record<string, unknown>>;
}

function normalizePrompt(prompt: string): string {
  return prompt
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts a calorie number from a prompt string.
 * e.g. "increase by 200" → { amount: 200, direction: 'increase' }
 */
function extractCalorieChange(text: string): Record<string, unknown> {
  const match = text.match(/(\d+)\s*(calorie|cal|kcal)?/i);
  const amount = match ? parseInt(match[1], 10) : 200;
  const direction = /decreas|reduc|cut|lower/i.test(text) ? 'decrease' : 'increase';
  return { amount, direction };
}

/**
 * Extracts a duration from a workout prompt.
 * e.g. "30 minute workout" → { durationMinutes: 30 }
 */
function extractWorkoutDuration(text: string): Record<string, unknown> {
  const match = text.match(/(\d+)\s*min/i);
  const durationMinutes = match ? parseInt(match[1], 10) : 45;
  return { durationMinutes: [30, 45, 60, 90].includes(durationMinutes) ? durationMinutes : 45 };
}

function extractFoodDescription(text: string): Record<string, unknown> {
  const foodDescription = text
    .replace(/^(i\s+)?(just\s+)?(had|ate|eaten|log|add|track|estimate)\s*/i, '')
    .replace(/^(a|an|some)\s+/i, '')
    .trim();
  return { foodDescription: foodDescription || 'unspecified food' };
}

function extractNavigationTarget(text: string): Record<string, unknown> {
  if (/nutrition|macro|meal|food/.test(text)) return { route: '/nutrition', label: 'Nutrition' };
  if (/training|workout|exercise|lift/.test(text)) return { route: '/training', label: 'Training' };
  if (/progress|weight|trend|strength/.test(text)) return { route: '/progress', label: 'Progress' };
  if (/dashboard|home|today|overview/.test(text)) return { route: '/', label: 'Dashboard' };
  if (/coach|chat/.test(text)) return { route: '/coach', label: 'Coach' };
  return { route: '/', label: 'Dashboard' };
}

const PATTERNS: IntentPattern[] = [
  {
    type: 'navigation',
    topic: 'general',
    patterns: [/(open|go to|take me to|show me|navigate).*\b(nutrition|training|workout|progress|dashboard|home|coach)\b/],
    extractors: [extractNavigationTarget],
  },
  {
    type: 'diet_strategy_compare',
    topic: 'nutrition',
    patterns: [/compare.*diet/, /diet.*compare/, /keto.*mediterranean|mediterranean.*keto/, /which diet/, /diet strategy/],
  },
  {
    type: 'diet_plan_apply',
    topic: 'nutrition',
    patterns: [/apply.*diet/, /diet.*apply/, /apply.*plan/, /start.*diet/, /use.*diet plan/, /save.*diet plan/],
  },
  {
    type: 'diet_plan_preview',
    topic: 'nutrition',
    patterns: [/preview.*diet/, /show.*diet plan/, /meal plan/, /plan.*diet/],
  },
  {
    type: 'diet_strategy_recommend',
    topic: 'nutrition',
    patterns: [/recommend.*diet/, /best diet/, /what diet should i/, /nutrition strategy/],
  },
  {
    type: 'meal_logging',
    topic: 'nutrition',
    patterns: [/\b(log|add|track)\b.*\b(meal|food|ate|had|chicken|rice|shake|burger|burrito|salad)\b/, /\bi (just )?(ate|had)\b/],
    extractors: [extractFoodDescription],
  },
  {
    type: 'meal_recommendation',
    topic: 'nutrition',
    patterns: [/what should i eat/, /recommend.*meal/, /meal fits.*macro/, /help me finish.*protein/, /eat for dinner/, /next meal/, /protein target/],
  },
  {
    type: 'protein_status',
    topic: 'nutrition',
    patterns: [/protein.*(left|remaining|status|target|short)/, /how much protein/],
  },
  {
    type: 'calorie_status',
    topic: 'nutrition',
    patterns: [/calories?.*(left|remaining|status)/, /how many calories.*(left|remaining)/],
  },
  {
    type: 'nutrition_status',
    topic: 'nutrition',
    patterns: [/how.*macros/, /macros?.*looking/, /how.*nutrition/, /nutrition.*today/, /what.*left today/, /nutrition targets? remain/, /on track.*food/, /remaining macros/],
  },
  {
    type: 'meal_recommendation',
    topic: 'nutrition',
    patterns: [/what should i eat/, /eat next/, /next meal/, /target.*next meal/, /meal target/, /recommend.*meal/],
  },
  {
    type: 'macro_adjustment',
    topic: 'goals',
    patterns: [/increase.*calor/, /decrease.*calor/, /reduc.*calor/, /change.*calor/, /lower.*carb/, /update.*protein/, /adjust.*macro/, /change.*nutrition goal/],
    extractors: [extractCalorieChange],
  },
  {
    type: 'exercise_replacement',
    topic: 'training',
    patterns: [/replace.*exercise/, /swap.*exercise/, /different exercise/],
    extractors: [extractWorkoutDuration],
  },
  {
    type: 'training_plan',
    topic: 'training',
    patterns: [/what.*workout today/, /what am i training/, /show.*today.*workout/, /review.*workout/, /today.*training/],
  },
  {
    type: 'workout_generation',
    topic: 'training',
    patterns: [/build.*workout/, /create.*workout/, /give me.*workout/, /make.*training plan/, /generate.*workout/, /quick workout/],
    extractors: [extractWorkoutDuration],
  },
  {
    type: 'training_plan_generation',
    topic: 'training',
    patterns: [/make.*training plan/, /build.*training plan/, /generate.*training plan/],
    extractors: [extractWorkoutDuration],
  },
  {
    type: 'workout_adjustment',
    topic: 'training',
    patterns: [/change.*workout/, /modify.*workout/, /replace.*exercise/, /shorter workout/, /different workout/, /edit workout/],
    extractors: [extractWorkoutDuration],
  },
  {
    type: 'cardio_status',
    topic: 'cardio',
    patterns: [/cardio.*looking/, /do i need cardio/, /cardio.*need/, /completed.*cardio/, /review.*cardio/, /how is my cardio/, /cardio plan/],
  },
  {
    type: 'cardio_recommendation',
    topic: 'cardio',
    patterns: [/what cardio should i do/, /recommend.*cardio/, /build.*cardio/, /cardio routine/],
  },
  {
    type: 'weight_explanation',
    topic: 'progress',
    patterns: [/why.*weight.*(up|down|change)/, /explain.*weight/, /weight trend/, /gaining too quickly/, /weight.*on track/, /gained weight|lost weight/],
  },
  {
    type: 'progress_review',
    topic: 'progress',
    patterns: [/how.*progress/, /review.*weekly progress/, /progress review/, /strength progress/, /progress update/, /how am i doing overall/],
  },
  {
    type: 'recovery_status',
    topic: 'recovery',
    patterns: [/recovery/, /sleep/, /train hard today/, /recover tonight/, /rest day/],
  },
  {
    type: 'tomorrow_plan',
    topic: 'general',
    patterns: [/tomorrow/, /plan tomorrow/, /prepare for tomorrow/],
  },
  {
    type: 'daily_review',
    topic: 'general',
    patterns: [/review my day/, /daily summary/, /day review/, /how did i do/, /how am i doing.*today/, /goals today/, /priorities today/],
  },
  {
    type: 'goal_change',
    topic: 'goals',
    patterns: [/change.*goal/, /update.*goal/, /goal weight/, /training goal/, /weight goal/, /fitness goal/],
  },
  {
    type: 'estimate_food',
    topic: 'nutrition',
    patterns: [/estimate/, /calories in/, /macros in/, /nutrition in/],
    extractors: [extractFoodDescription],
  },
  {
    type: 'create_cut',
    topic: 'goals',
    patterns: [/\bcut\b/, /lose weight/, /calorie deficit/, /lose fat/, /cutting phase/],
  },
  {
    type: 'create_bulk',
    topic: 'goals',
    patterns: [/\bbulk\b/, /gain weight/, /gain muscle/, /calorie surplus/, /bulking phase/],
  },
];

function likelyTopic(text: string): CoachTopic {
  if (/protein|calor|macro|meal|food|eat|carb|fat/.test(text)) return 'nutrition';
  if (/workout|train|exercise|set|rep|lift/.test(text)) return 'training';
  if (/cardio|walk|run|step|zone/.test(text)) return 'cardio';
  if (/weight|progress|trend|strength/.test(text)) return 'progress';
  if (/sleep|recover|recovery|rest/.test(text)) return 'recovery';
  if (/goal|target|plan/.test(text)) return 'goals';
  return 'general';
}

/**
 * Parses a user prompt into a structured intent using keyword matching.
 * Modular — replace the body with an actual LLM call in Phase 4.
 */
export function parseMockIntent(prompt: string): ParsedIntent {
  const lower = normalizePrompt(prompt);

  for (const pattern of PATTERNS) {
    const matched = pattern.patterns.some((regex) => regex.test(lower));
    if (matched) {
      const extractedValues = Object.assign(
        {},
        ...(pattern.extractors ?? []).map((extract) => extract(lower))
      );

      return {
        type: pattern.type,
        topic: pattern.topic,
        confidence: pattern.confidence ?? 'high',
        extractedValues,
      };
    }
  }

  return {
    type: 'unknown',
    topic: likelyTopic(lower),
    confidence: likelyTopic(lower) === 'general' ? 'low' : 'medium',
    extractedValues: {},
  };
}
