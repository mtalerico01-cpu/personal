import type { ParsedIntent, IntentType } from '../types';

interface IntentPattern {
  type: IntentType;
  keywords: string[];
  extractors?: Array<(text: string) => Record<string, unknown>>;
}

const PATTERNS: IntentPattern[] = [
  {
    type: 'log_meal',
    keywords: ['log', 'ate', 'had', 'eaten', 'just had', 'just ate', 'add meal', 'add food', 'track'],
  },
  {
    type: 'estimate_food',
    keywords: ['estimate', 'how many calories', 'macros in', 'nutrition in', 'calories in', 'how much protein'],
  },
  {
    type: 'remaining_macros',
    keywords: ['remaining', 'left', 'how am i doing', 'macros', 'calories left', 'protein left', 'how are my macros'],
  },
  {
    type: 'adjust_calories',
    keywords: ['increase my calories', 'decrease my calories', 'change my calories', 'calorie target', 'add calories', 'reduce calories', 'cut calories', 'bump calories'],
  },
  {
    type: 'update_macros',
    keywords: ['update my macros', 'change my macros', 'adjust my macros', 'macro goals', 'protein goal', 'carb goal', 'fat goal'],
  },
  {
    type: 'build_workout',
    keywords: ['build', 'generate', 'create', 'make me a workout', 'workout plan', "today's workout", 'plan my workout'],
  },
  {
    type: 'change_workout',
    keywords: ['change my workout', 'different workout', 'swap workout', 'modify workout', 'edit workout'],
  },
  {
    type: 'cardio_review',
    keywords: ['cardio', 'steps', 'walk', 'run', 'do i need cardio', 'active calories', 'cardio today'],
  },
  {
    type: 'weight_explanation',
    keywords: ['weight change', 'why did my weight', 'explain my weight', 'weight up', 'weight down', 'weight increase', 'weight decrease', 'gained weight', 'lost weight'],
  },
  {
    type: 'progress_review',
    keywords: ['progress', 'how am i progressing', 'progress update', 'gains', 'strength', 'how am i doing overall'],
  },
  {
    type: 'plan_tomorrow',
    keywords: ['tomorrow', 'plan tomorrow', 'prepare for tomorrow', "tomorrow's plan"],
  },
  {
    type: 'change_goal',
    keywords: ['change my goal', 'update my goal', 'goal weight', 'new goal', 'change goal'],
  },
  {
    type: 'create_cut',
    keywords: ['cut', 'lose weight', 'calorie deficit', 'lose fat', 'start cutting', 'cutting phase'],
  },
  {
    type: 'create_bulk',
    keywords: ['bulk', 'gain weight', 'gain muscle', 'calorie surplus', 'start bulking', 'bulking phase'],
  },
  {
    type: 'maintenance_plan',
    keywords: ['maintenance', 'maintain weight', 'stay at this weight', 'maintenance calories'],
  },
  {
    type: 'review_day',
    keywords: ['review my day', 'how did i do', 'daily summary', 'end of day', 'day review', 'recap'],
  },
];

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

/**
 * Parses a user prompt into a structured intent using keyword matching.
 * Modular — replace the body with an actual LLM call in Phase 4.
 */
export function parseMockIntent(prompt: string): ParsedIntent {
  const lower = prompt.toLowerCase().trim();

  for (const pattern of PATTERNS) {
    const matched = pattern.keywords.some((kw) => lower.includes(kw));
    if (matched) {
      let extractedValues: Record<string, unknown> = {};

      if (pattern.type === 'adjust_calories' || pattern.type === 'update_macros') {
        extractedValues = extractCalorieChange(lower);
      }
      if (pattern.type === 'build_workout' || pattern.type === 'change_workout') {
        extractedValues = extractWorkoutDuration(lower);
      }
      if (pattern.type === 'log_meal' || pattern.type === 'estimate_food') {
        // Extract food description after keywords
        const foodMatch = lower.replace(/^(i (just )?(had|ate|eaten)|log|ate|add|track|estimate)\s*/i, '').trim();
        extractedValues = { foodDescription: foodMatch || 'unspecified food' };
      }

      return {
        type: pattern.type,
        confidence: 'high',
        extractedValues,
      };
    }
  }

  return {
    type: 'general',
    confidence: 'low',
    extractedValues: {},
  };
}
