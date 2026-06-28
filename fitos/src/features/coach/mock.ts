// ─── Briefing ───────────────────────────────────────────────────────────────

export interface BriefingItem {
  text: string;
  type: 'positive' | 'recommendation' | 'neutral';
}

export const MOCK_BRIEFING: BriefingItem[] = [
  { text: 'Today went well. You completed your workout.', type: 'positive' },
  { text: 'Protein intake is strong at 142g.', type: 'positive' },
  { text: 'Recovery metrics look good.', type: 'positive' },
  { text: 'You have 1,160 calories remaining for the day.', type: 'neutral' },
  { text: 'Prioritize carbohydrates with dinner to hit your bulk target.', type: 'recommendation' },
];

// 4 prompts only — minimal
export const PRIMARY_PROMPTS = [
  { id: 'p1', text: 'What should I eat for dinner?' },
  { id: 'p2', text: 'Explain today\u2019s weight.' },
  { id: 'p3', text: 'Review today\u2019s workout.' },
  { id: 'p4', text: 'Plan tomorrow.' },
];

// ─── Personas ──────────────────────────────────────────────────────────────

export type PersonaId = 'cedric' | 'elara';

export interface Persona {
  id: PersonaId;
  name: string;
  title: string;
  initials: string;
  greeting: (timeOfDay: string, userName: string) => string;
}

export const PERSONAS: Record<PersonaId, Persona> = {
  cedric: {
    id: 'cedric',
    name: 'Cedric',
    title: 'Performance Coach',
    initials: 'C',
    greeting: (timeOfDay, name) =>
      `${timeOfDay}, ${name}. Your metrics are loaded. What are we working on?`,
  },
  elara: {
    id: 'elara',
    name: 'Elara',
    title: 'Health & Nutrition Coach',
    initials: 'E',
    greeting: (timeOfDay, name) =>
      `${timeOfDay}, ${name}! I\u2019ve reviewed your day so far. Ready to help you crush it.`,
  },
};

// ─── Suggested Prompts ──────────────────────────────────────────────────────

export interface SuggestedPrompt {
  id: string;
  text: string;
  category: 'nutrition' | 'training' | 'progress' | 'planning';
}

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: '1', text: 'What should I eat next?', category: 'nutrition' },
  { id: '2', text: 'How is my nutrition today?', category: 'nutrition' },
  { id: '3', text: "What\u2019s my workout today?", category: 'training' },
  { id: '4', text: 'Build me a workout', category: 'training' },
  { id: '5', text: 'Am I on track with my bulk?', category: 'progress' },
  { id: '6', text: 'Why did my weight change?', category: 'progress' },
  { id: '7', text: 'Log a meal for me', category: 'nutrition' },
  { id: '8', text: 'Adjust my macro goals', category: 'planning' },
  { id: '9', text: 'Review my week', category: 'progress' },
  { id: '10', text: 'Summarize my rest of day', category: 'planning' },
];

// ─── Chat & Action Cards ─────────────────────────────────────────────────────

export interface ActionCardData {
  type: 'log_meal' | 'adjust_macros' | 'build_workout' | 'review_day';
  title: string;
  summary: string;
  details?: Record<string, string>;
  actions: Array<{
    id: string;
    label: string;
    variant: 'primary' | 'secondary' | 'ghost';
  }>;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'coach';
  text: string;
  timestamp: Date;
  actionCard?: ActionCardData;
}

// ─── Mock Responses ──────────────────────────────────────────────────────────

export const MOCK_RESPONSES: Record<string, { text: string; actionCard?: ActionCardData }> = {
  'What should I eat next?': {
    text: 'Based on your remaining macros, you need roughly 60g protein and 120g carbs before hitting your calorie goal. A solid option: chicken and rice. Or Greek yogurt with a banana for something lighter.',
    actionCard: {
      type: 'log_meal',
      title: 'Suggested Meal',
      summary: 'Chicken breast + white rice',
      details: {
        Calories: '520 kcal',
        Protein: '58g',
        Carbs: '48g',
        Fat: '8g',
      },
      actions: [
        { id: 'log', label: 'Log this meal', variant: 'primary' },
        { id: 'edit', label: 'Edit estimate', variant: 'secondary' },
        { id: 'cancel', label: 'Cancel', variant: 'ghost' },
      ],
    },
  },
  'How is my nutrition today?': {
    text: "You\u2019re at 1,840 calories \u2014 about 61% of your 3,000 target. Protein is solid at 142g. Carbs and fat are both under. You have room for 2 more solid meals to hit your goal.",
  },
  "What\u2019s my workout today?": {
    text: 'Today is Back + Biceps. You\u2019ve got 6 exercises queued: Pull-ups, Barbell Row, Cable Row, Face Pulls, Barbell Curl, and Hammer Curls. Estimated duration: 60\u201375 minutes.',
    actionCard: {
      type: 'build_workout',
      title: "Today\u2019s Workout",
      summary: 'Back + Biceps \u2014 6 exercises',
      details: {
        'Session type': 'Hypertrophy',
        'Est. duration': '60\u201375 min',
        'Volume target': 'Match last week +5%',
      },
      actions: [
        { id: 'start', label: 'Start session', variant: 'primary' },
        { id: 'modify', label: 'Modify workout', variant: 'secondary' },
      ],
    },
  },
  'Build me a workout': {
    text: 'What\u2019s the focus today \u2014 strength, hypertrophy, or conditioning? And how long do you have? I\u2019ll put together something dialed in.',
  },
  'Am I on track with my bulk?': {
    text: 'Mostly yes. You\u2019ve averaged 2,940 calories over the last 7 days against a 3,000 target \u2014 a small 60-calorie deficit per day. Weight is trending up at +0.4 lbs/week, which is clean lean bulk territory. Stay consistent.',
  },
  'Why did my weight change?': {
    text: 'Your weight dropped 0.6 lbs overnight. Most likely causes: lower sodium yesterday, a lighter dinner, or normal water fluctuation. Your 7-day trend is still +0.4 lbs/week. Nothing to adjust.',
  },
  'Log a meal for me': {
    text: "What did you eat? Describe it as specifically as you can \u2014 including portions if you know them \u2014 and I\u2019ll estimate the macros and log it for you.",
  },
  'Adjust my macro goals': {
    text: 'Based on your current weight trend and training volume, I\u2019d recommend adding 50g carbs to support your sessions. Here\u2019s the updated breakdown:',
    actionCard: {
      type: 'adjust_macros',
      title: 'Macro Adjustment',
      summary: 'Recommended update for lean bulk',
      details: {
        Calories: '3,000 \u2192 3,200',
        Protein: '200g (unchanged)',
        Carbs: '325g \u2192 375g',
        Fat: '85g (unchanged)',
      },
      actions: [
        { id: 'apply', label: 'Apply changes', variant: 'primary' },
        { id: 'edit', label: 'Edit first', variant: 'secondary' },
        { id: 'cancel', label: 'Cancel', variant: 'ghost' },
      ],
    },
  },
  'Review my week': {
    text: "Strong week overall. You trained 4 of 5 planned sessions, hit protein 6 out of 7 days, and your weight moved in the right direction. The one gap: cardio was under target by about 30 minutes. Easy fix next week.",
  },
  'Summarize my rest of day': {
    text: "You have ~1,160 calories remaining. No workout scheduled for tonight. I\u2019d suggest a high-protein dinner around 7pm and a lighter snack before bed. You\u2019re on track \u2014 just close out nutrition and you\u2019ll hit your targets.",
  },
};

export const DEFAULT_RESPONSE = {
  text: "Let me pull the right context for that. Give me a moment.",
};
