export type CoachingStyle = 'direct' | 'balanced' | 'encouraging';

export type AppearancePreference = 'dark' | 'light' | 'system';

export interface CoachingStyleConfig {
  id: CoachingStyle;
  name: string;
  description: string;
  toneInstructions: string;
  verbosity: 'concise' | 'standard' | 'detailed';
}

export const coachingStyles: Record<CoachingStyle, CoachingStyleConfig> = {
  direct: {
    id: 'direct',
    name: 'Direct',
    description: 'Concise, analytical, and action-focused.',
    toneInstructions: 'Use concise, specific language. Prioritize data, tradeoffs, and the next action. Avoid extra encouragement.',
    verbosity: 'concise',
  },
  balanced: {
    id: 'balanced',
    name: 'Balanced',
    description: 'Clear, practical, and supportive.',
    toneInstructions: 'Use calm, practical language. Explain the key reason briefly and keep recommendations specific.',
    verbosity: 'standard',
  },
  encouraging: {
    id: 'encouraging',
    name: 'Encouraging',
    description: 'Warm, reassuring, and habit-focused.',
    toneInstructions: 'Use warm but specific language. Reinforce achievable next steps without exaggeration or vague motivation.',
    verbosity: 'standard',
  },
};

export const defaultExperiencePreferences = {
  appearance: 'system' as AppearancePreference,
  coachingStyle: 'balanced' as CoachingStyle,
};

export function isCoachingStyle(value: unknown): value is CoachingStyle {
  return value === 'direct' || value === 'balanced' || value === 'encouraging';
}

export function isAppearancePreference(value: unknown): value is AppearancePreference {
  return value === 'dark' || value === 'light' || value === 'system';
}

export function mapLegacyPersonaToStyle(value: unknown): CoachingStyle {
  if (value === 'cedric') return 'direct';
  if (value === 'elara') return 'encouraging';
  return defaultExperiencePreferences.coachingStyle;
}
