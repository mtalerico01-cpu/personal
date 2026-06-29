import type { AIContext, CoachTopic } from '../../ai/types';
import type { PersonaId } from '@/shared/theme/colors';

export type CoachInsightScreen = 'dashboard' | 'nutrition' | 'training' | 'cardio' | 'progress';
export type CoachInsightStatus = 'positive' | 'attention' | 'neutral';

export interface CoachInsightAction {
  label: string;
  prompt: string;
  topic: CoachTopic;
}

export interface CoachInsight {
  title: string;
  summary: string;
  recommendation: string;
  status: CoachInsightStatus;
  actions: CoachInsightAction[];
}

function isCedric(personaId: PersonaId) {
  return personaId === 'cedric';
}

export function buildCoachInsight(screen: CoachInsightScreen, ctx: AIContext): CoachInsight {
  const cedric = isCedric(ctx.persona.id);
  const caloriesRemaining = Math.max(ctx.nutrition.caloriesRemaining, 0);
  const proteinRemaining = Math.max(ctx.nutrition.proteinRemaining, 0);
  const cardioRemaining = Math.max(ctx.training.cardioGoalMinutes - ctx.training.cardioCompletedMinutes, 0);
  const workoutName = ctx.training.scheduledWorkoutName ?? 'Today\'s workout';

  switch (screen) {
    case 'nutrition':
      return {
        title: cedric ? 'Nutrition readout' : 'Nutrition guidance',
        summary: cedric
          ? `${caloriesRemaining} kcal remain. Protein gap: ${proteinRemaining}g. Carbs are the cleanest lever for the next meal.`
          : `You have ${caloriesRemaining} calories left today, with ${proteinRemaining}g of protein still open. A balanced protein-and-carb meal would fit well.`,
        recommendation: cedric
          ? 'Prioritise lean protein first, then allocate remaining calories to carbohydrates.'
          : 'Choose something satisfying and protein-forward so the rest of the day stays easy.',
        status: proteinRemaining > 35 ? 'attention' : 'positive',
        actions: [
          { label: 'What should I eat?', topic: 'nutrition', prompt: 'Help me decide what to eat next based on today\'s remaining macros.' },
          { label: 'Adjust goal', topic: 'goals', prompt: 'Help me adjust my nutrition goal.' },
        ],
      };
    case 'training':
      return {
        title: cedric ? 'Training directive' : 'Training check-in',
        summary: cedric
          ? `${workoutName} is scheduled. Current plan supports ${ctx.training.durationMinutes ?? 60} minutes with no reduction required.`
          : `${workoutName} is ready for today. Your current recovery supports the full session without needing to scale it back.`,
        recommendation: cedric
          ? 'Keep compounds first, then finish accessories with controlled rest periods.'
          : 'Start with the biggest movements while you feel freshest, then keep the rest steady.',
        status: ctx.training.completed ? 'positive' : 'neutral',
        actions: [
          { label: 'Review workout', topic: 'training', prompt: 'Review today\'s workout and recommend any changes.' },
          { label: 'Shorten it', topic: 'training', prompt: 'Make today\'s workout shorter.' },
        ],
      };
    case 'cardio':
      return {
        title: cedric ? 'Cardio target' : 'Cardio guidance',
        summary: cedric
          ? `${cardioRemaining} minutes remain against a ${ctx.training.cardioGoalMinutes}-minute target. Moderate work is sufficient.`
          : `You have ${cardioRemaining} cardio minutes left. A moderate walk would complete the target without taking too much out of you.`,
        recommendation: cardioRemaining > 0
          ? cedric
            ? 'Use incline walking after lifting or later today. Avoid adding intensity.'
            : 'A comfortable incline walk later today would be the smoothest option.'
          : cedric
            ? 'Cardio target complete. Shift focus to recovery.'
            : 'Cardio is complete for today, so recovery can take priority now.',
        status: cardioRemaining > 0 ? 'attention' : 'positive',
        actions: [
          { label: 'Cardio plan', topic: 'cardio', prompt: 'Review my cardio plan for today.' },
          { label: 'Change duration', topic: 'cardio', prompt: 'Change my cardio duration for today.' },
        ],
      };
    case 'progress':
      return {
        title: cedric ? 'Trend analysis' : 'Progress perspective',
        summary: cedric
          ? `7-day average is ${ctx.progress.sevenDayAverage.toFixed(1)} lbs. Weekly change is ${ctx.progress.weeklyWeightChange > 0 ? '+' : ''}${ctx.progress.weeklyWeightChange.toFixed(1)} lbs; within target range.`
          : `Your seven-day average is ${ctx.progress.sevenDayAverage.toFixed(1)} lbs, and the weekly trend is still in a healthy range. No big adjustment is needed.`,
        recommendation: cedric
          ? 'Do not change calories from a single-day fluctuation. Continue the current protocol.'
          : 'Keep watching the weekly average rather than reacting to one weigh-in.',
        status: 'positive',
        actions: [
          { label: 'Explain trend', topic: 'progress', prompt: 'Explain my current weight and strength trends.' },
          { label: 'Change goal', topic: 'goals', prompt: 'Help me change my weight goal.' },
        ],
      };
    case 'dashboard':
    default:
      return {
        title: cedric ? 'Daily command' : 'Today\'s guidance',
        summary: cedric
          ? `Nutrition is at ${Math.round((ctx.nutrition.caloriesConsumed / ctx.nutrition.calorieGoal) * 100)}%. ${workoutName} remains appropriate. Protein is the main actionable gap.`
          : `You\'re in a good position today. Nutrition and training are aligned, with protein being the main thing to focus on next.`,
        recommendation: cedric
          ? 'Close the protein gap before adding discretionary calories.'
          : 'A protein-forward meal is the clearest next step.',
        status: proteinRemaining > 35 ? 'attention' : 'positive',
        actions: [
          { label: 'Review today', topic: 'general', prompt: 'Review my day and tell me what to prioritize.' },
          { label: 'Ask priority', topic: 'general', prompt: 'What should I prioritize next today?' },
        ],
      };
  }
}
