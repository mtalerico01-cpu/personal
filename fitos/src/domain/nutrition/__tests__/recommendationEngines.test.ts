import { calculateEnergyRequirement } from '../energy/calculateEnergyRequirement';
import { calculateMacroRecommendation } from '../macros/calculateMacroRecommendation';

describe('nutrition recommendation engines', () => {
  it('returns traceable energy metadata with a conservative fat-loss adjustment', () => {
    const result = calculateEnergyRequirement({
      age: 35,
      heightCm: 178,
      currentWeightKg: 92,
      estimationSex: 'male',
      activityLevel: 'light',
      primaryGoal: 'fat_loss',
      ratePreference: 'faster',
    });

    expect(result.calorieGoal).toBeLessThan(result.maintenanceCalories);
    expect(result.metadata.sourceIds).toEqual(expect.arrayContaining(['SRC-ENERGY-MIFFLIN-1990', 'SRC-CDC-WEIGHT-LOSS-2025']));
    expect(result.metadata.rationale.map((item) => item.ruleId)).toEqual(expect.arrayContaining(['ENERGY-001', 'WEIGHT-001']));
  });

  it('does not use one universal macro split for different goals', () => {
    const fatLoss = calculateMacroRecommendation({
      calorieGoal: 2200,
      bodyWeightKg: 82,
      primaryGoal: 'fat_loss',
      macroPreference: 'higher_protein',
    });
    const endurance = calculateMacroRecommendation({
      calorieGoal: 2200,
      bodyWeightKg: 82,
      primaryGoal: 'endurance',
      macroPreference: 'higher_carb_endurance',
    });

    expect(fatLoss.proteinGrams).toBeGreaterThan(endurance.proteinGrams);
    expect(endurance.carbsGrams).toBeGreaterThan(fatLoss.carbsGrams);
    expect(fatLoss.metadata.sourceIds).toEqual(expect.arrayContaining(['SRC-ISSN-PROTEIN-2017', 'SRC-NASEM-DRI-MACROS-2005']));
  });

  it('warns when manual macro targets do not align with calories', () => {
    const result = calculateMacroRecommendation({
      calorieGoal: 2200,
      bodyWeightKg: 82,
      manualTargets: {
        status: 'completed',
        calories: 2200,
        proteinGrams: 80,
        carbsGrams: 80,
        fatGrams: 40,
      },
    });

    expect(result.active).toMatchObject({ calories: 2200, proteinGrams: 80, carbsGrams: 80, fatGrams: 40 });
    expect(result.metadata.warnings.some((warning) => warning.code === 'manual_macro_calorie_mismatch')).toBe(true);
  });
});
