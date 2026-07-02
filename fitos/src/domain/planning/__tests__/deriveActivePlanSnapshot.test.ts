import { generateInitialPlan } from '../../../features/onboarding/services/generateInitialPlan';
import { deriveActivePlanSnapshot } from '../deriveActivePlanSnapshot';

describe('deriveActivePlanSnapshot', () => {
  it('derives store-ready nutrition, workout, cardio, and metadata from a confirmed plan', () => {
    const plan = {
      ...generateInitialPlan({
        age: 34,
        heightCm: 180,
        currentWeightKg: 95,
        estimationSex: 'male',
        primaryGoal: 'fat_loss',
        activityLevel: 'sedentary',
        trainingExperience: 'beginner',
        trainingDaysPerWeek: 3,
        equipment: ['full_gym'],
      }),
      status: 'confirmed' as const,
      confirmedAt: '2026-07-02T12:00:00.000Z',
    };

    const snapshot = deriveActivePlanSnapshot(plan, { activatedAt: plan.confirmedAt });

    expect(snapshot.nutritionGoals.calories).toBe(plan.macros.calories.active);
    expect(snapshot.todayWorkout.date).toBe('2026-07-02');
    expect(snapshot.cardioPlan.stepsGoal).toBe(plan.dailyStepGoal.active);
    expect(snapshot.sourceReferences).toEqual(expect.arrayContaining(['SRC-ENERGY-MIFFLIN-1990']));
  });
});