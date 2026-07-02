import { calculateProfileCompleteness } from '../services/calculateProfileCompleteness';
import { evaluateOnboardingSafety } from '../services/evaluateOnboardingSafety';
import { generateInitialPlan } from '../services/generateInitialPlan';
import { inchesToCm, kgToLbs, lbsToKg } from '../services/unitConversion';
import type { OnboardingAnswers } from '../types';

const baseAnswers: OnboardingAnswers = {
  age: 32,
  heightCm: 178,
  currentWeightKg: 90,
  estimationSex: 'male',
  units: 'imperial',
  activityLevel: 'light',
  trainingExperience: 'beginner',
  trainingDaysPerWeek: 3,
  equipment: ['full_gym'],
  coachingStyle: 'balanced',
  appearance: 'system',
  responseDetail: 'standard',
  accountability: 'gentle',
  memoryPreference: 'ask_first',
};

describe('generateInitialPlan', () => {
  it('creates a safe fat-loss deficit for beginners', () => {
    const plan = generateInitialPlan({ ...baseAnswers, primaryGoal: 'fat_loss', ratePreference: 'moderate' });

    expect(plan.macros.calories.active).toBeLessThan(plan.maintenanceCalories.active);
    expect(plan.macros.proteinGrams.active).toBeGreaterThanOrEqual(175);
    expect(plan.training.daysPerWeek).toBe(3);
    expect(plan.status).toBe('draft');
  });

  it('creates a surplus for muscle gain', () => {
    const plan = generateInitialPlan({ ...baseAnswers, primaryGoal: 'muscle_gain', trainingExperience: 'intermediate', trainingDaysPerWeek: 4 });

    expect(plan.macros.calories.active).toBeGreaterThan(plan.maintenanceCalories.active);
    expect(plan.training.split).toBe('Upper / lower');
  });

  it('preserves manual calorie and macro overrides', () => {
    const plan = generateInitialPlan({
      ...baseAnswers,
      primaryGoal: 'muscle_gain',
      manualTargets: { status: 'completed', calories: 3200, proteinGrams: 210, carbsGrams: 390, fatGrams: 80 },
    });

    expect(plan.macros.calories.active).toBe(3200);
    expect(plan.macros.calories.source).toBe('user_override');
    expect(plan.macros.proteinGrams.active).toBe(210);
  });

  it('exposes source-traceable plan metadata', () => {
    const plan = generateInitialPlan({ ...baseAnswers, primaryGoal: 'fat_loss', ratePreference: 'moderate' });

    expect(plan.confidence).toMatch(/low|medium|high/);
    expect(plan.sourceReferences).toEqual(expect.arrayContaining(['SRC-ENERGY-MIFFLIN-1990', 'SRC-ISSN-PROTEIN-2017']));
    expect(plan.rationale?.map((item) => item.ruleId)).toEqual(expect.arrayContaining(['ENERGY-001', 'MACRO-001']));
  });

  it('turns custom split choices into custom workouts', () => {
    const plan = generateInitialPlan({
      ...baseAnswers,
      primaryGoal: 'strength',
      workoutSplitStatus: 'enter',
      workoutSplit: 'custom',
      customWorkoutSplit: 'chest, back, mobility',
    });

    expect(plan.training.split).toBe('Custom: Chest / Back / Mobility');
    expect(plan.training.workouts.map((workout) => workout.name)).toEqual(['Chest Day', 'Back Day', 'Mobility Day']);
  });

  it('flags unsafe targets without relying on an LLM', () => {
    const safety = evaluateOnboardingSafety({
      ...baseAnswers,
      primaryGoal: 'fat_loss',
      manualTargets: { status: 'completed', calories: 900 },
    });

    expect(safety.level).toBe('restricted');
    expect(safety.blockedActions).toContain('activate_extreme_calorie_target');
  });

  it('converts units for profile storage', () => {
    expect(Math.round(lbsToKg(220))).toBe(100);
    expect(Math.round(kgToLbs(100))).toBe(220);
    expect(Math.round(inchesToCm(70))).toBe(178);
  });

  it('tracks profile completeness by category', () => {
    const completeness = calculateProfileCompleteness({ ...baseAnswers, primaryGoal: 'recomposition', eatingStyles: ['balanced'], macroPreference: 'higher_protein' });

    expect(completeness.essentials).toBe(100);
    expect(completeness.training).toBeGreaterThan(50);
    expect(completeness.overall).toBeGreaterThan(50);
  });
});
