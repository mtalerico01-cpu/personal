import { generateFollowUpPromptsForTopic, generateSuggestedPrompts } from '../suggestions/generateSuggestedPrompts';
import type { AIContext } from '../types';

function makeCtx(overrides: {
  weeklyWeightChange?: number;
  proteinRemaining?: number;
  workoutDone?: boolean;
  scheduledWorkoutName?: string | null;
  dayPart?: AIContext['time']['dayPart'];
}): AIContext {
  return {
    user: {
      id: 'u1', name: 'Alex', age: 28, heightInches: 72,
      currentWeight: 190, goalWeight: 185,
      primaryGoal: 'lose', trainingExperience: 'intermediate',
      timezone: 'America/New_York', preferredDiet: 'standard',
    },
    persona: { id: 'direct', name: 'Form Theory Coach', role: 'AI Fitness Coach', tone: 'direct' },
    time: {
      nowISO: '2025-01-01T08:00:00Z',
      localDate: '2025-01-01',
      localTime: '08:00',
      dayOfWeek: 'Wednesday',
      dayPart: overrides.dayPart ?? 'morning',
    },
    nutrition: {
      calorieGoal: 2200, caloriesConsumed: 1800, caloriesRemaining: 400,
      proteinGoal: 180, proteinConsumed: 120,
      proteinRemaining: overrides.proteinRemaining ?? 60,
      carbGoal: 220, carbsConsumed: 180, carbsRemaining: 40,
      fatGoal: 70, fatConsumed: 50, fatRemaining: 20,
      mealsLogged: 2, hydrationProgress: 0.6,
    },
    training: {
      scheduledWorkoutName: overrides.scheduledWorkoutName ?? 'Upper Body',
      scheduledBodyParts: ['chest', 'shoulders'],
      completed: overrides.workoutDone ?? false,
      durationMinutes: 60, estimatedCalories: 350,
      cardioGoalMinutes: 30, cardioCompletedMinutes: 0,
    },
    progress: {
      currentWeight: 190, sevenDayAverage: 190.5,
      weeklyWeightChange: overrides.weeklyWeightChange ?? -1.0,
      goalWeight: 185, strengthScore: 72, strengthScoreChange: 1.5,
      estimatedOneRepMaxes: { squat: 225, bench: 185, deadlift: 275 },
    },
    recovery: { sleepHours: 7.5, sleepQuality: 0.8, steps: 6000, activeCalories: 320, restingHeartRate: 62 },
    plan: { name: 'Cut Phase', status: 'active', startDate: '2024-12-01' },
  } as AIContext;
}

describe('generateSuggestedPrompts', () => {
  it('returns exactly 4 prompts', () => {
    const prompts = generateSuggestedPrompts(makeCtx({}));
    expect(prompts).toHaveLength(4);
  });

  it('prioritizes significant weight change first', () => {
    const prompts = generateSuggestedPrompts(makeCtx({ weeklyWeightChange: 2.5 }));
    expect(prompts[0].category).toBe('progress');
  });

  it('prioritizes protein low (>60g remaining) when no significant weight change', () => {
    const prompts = generateSuggestedPrompts(makeCtx({
      weeklyWeightChange: 0,
      proteinRemaining: 80,
    }));
    expect(prompts[0].category).toBe('nutrition');
  });

  it('includes workout prompt when workout is incomplete', () => {
    const prompts = generateSuggestedPrompts(makeCtx({ workoutDone: false, scheduledWorkoutName: 'Legs' }));
    expect(prompts.some(p => p.category === 'training')).toBe(true);
  });

  it('each prompt has id, label, prompt, category', () => {
    const prompts = generateSuggestedPrompts(makeCtx({}));
    for (const p of prompts) {
      expect(p.id).toBeTruthy();
      expect(p.label).toBeTruthy();
      expect(p.prompt).toBeTruthy();
      expect(p.category).toBeTruthy();
    }
  });

  it.each([
    ['nutrition', 'nutrition'],
    ['training', 'training'],
    ['cardio', 'cardio'],
    ['progress', 'progress'],
  ] as const)('keeps %s follow-ups topic relevant', (topic, expectedPrimaryCategory) => {
    const prompts = generateFollowUpPromptsForTopic(topic);
    expect(prompts).toHaveLength(4);
    expect(prompts[0].category).toBe(expectedPrimaryCategory);
    expect(prompts.some((prompt) => prompt.label.toLowerCase().includes('change'))).toBe(true);
  });
});
