import { answerCoachPrompt } from '../services/mockAIService';
import type { AIActionProposal, AIContext } from '../types';

function makeCtx(style: AIContext['persona']['id']): AIContext {
  return {
    user: {
      id: 'u1', name: 'Alex', age: 28, heightInches: 72,
      currentWeight: 190, goalWeight: 185,
      primaryGoal: 'lose', trainingExperience: 'intermediate',
      timezone: 'America/New_York', preferredDiet: 'standard',
    },
    persona: { id: style, name: 'Form Theory Coach', role: 'AI Fitness Coach', tone: style },
    time: {
      nowISO: '2025-01-01T08:00:00Z', localDate: '2025-01-01', localTime: '08:00',
      dayOfWeek: 'Wednesday', dayPart: 'morning',
    },
    nutrition: {
      calorieGoal: 2200, caloriesConsumed: 1200, caloriesRemaining: 1000,
      proteinGoal: 180, proteinConsumed: 95, proteinRemaining: 85,
      carbGoal: 220, carbsConsumed: 120, carbsRemaining: 100,
      fatGoal: 70, fatConsumed: 35, fatRemaining: 35,
      mealsLogged: 2, hydrationProgress: 0.6,
    },
    training: {
      scheduledWorkoutName: 'Upper Body', scheduledBodyParts: ['chest', 'shoulders'],
      completed: false, durationMinutes: 60, estimatedCalories: 350,
      cardioGoalMinutes: 30, cardioCompletedMinutes: 0,
    },
    progress: {
      currentWeight: 190, sevenDayAverage: 190.5, weeklyWeightChange: -1.0,
      goalWeight: 185, strengthScore: 72, strengthScoreChange: 1.5,
      estimatedOneRepMaxes: { squat: 225, bench: 185, deadlift: 275 },
    },
    recovery: { sleepHours: 7.5, sleepQuality: 0.8, steps: 6000, activeCalories: 320, restingHeartRate: 62 },
    plan: { name: 'Cut Phase', status: 'active', startDate: '2024-12-01' },
  };
}

function normalizeAction(action: AIActionProposal | undefined) {
  if (!action) return undefined;
  return {
    type: action.type,
    title: action.title,
    description: action.description,
    payload: action.payload,
    requiresConfirmation: action.requiresConfirmation,
    status: action.status,
  };
}

describe('mock AI style behavior', () => {
  it('keeps diet plan action facts identical across coaching styles', async () => {
    const direct = await answerCoachPrompt('apply a diet plan', makeCtx('direct'));
    const balanced = await answerCoachPrompt('apply a diet plan', makeCtx('balanced'));
    const encouraging = await answerCoachPrompt('apply a diet plan', makeCtx('encouraging'));

    expect(direct.details).toEqual(balanced.details);
    expect(balanced.details).toEqual(encouraging.details);
    expect(normalizeAction(direct.proposedActions?.[0])).toEqual(normalizeAction(balanced.proposedActions?.[0]));
    expect(normalizeAction(balanced.proposedActions?.[0])).toEqual(normalizeAction(encouraging.proposedActions?.[0]));
  });
});
