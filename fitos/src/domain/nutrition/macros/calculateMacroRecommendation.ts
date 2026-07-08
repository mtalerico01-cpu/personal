import type { PrimaryGoal, TrainingExperience } from '../../../types';
import type { ManualTargets } from '../../../features/onboarding/types';
import type { MacroPreference, RecommendationMetadata, RecommendationWarning } from '../../recommendations/types';
import { uniqueSourceIds } from '../../recommendations/types';

export interface MacroRecommendationInput {
  calorieGoal: number;
  bodyWeightKg?: number;
  primaryGoal?: PrimaryGoal;
  trainingExperience?: TrainingExperience;
  trainingDaysPerWeek?: number | 'varies';
  cardioSessionsPerWeek?: number;
  dietPattern?: string;
  eatingStyles?: string[];
  macroPreference?: MacroPreference;
  manualTargets?: ManualTargets;
  safetyLevel?: 'standard' | 'caution' | 'restricted';
}

export interface MacroRecommendationResult {
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  active: {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
  };
  source: 'system_estimate' | 'user_override';
  metadata: RecommendationMetadata;
}

const macroRangeSourceIds = ['SRC-NASEM-DRI-MACROS-2005'];
const proteinSourceIds = ['SRC-ISSN-PROTEIN-2017', 'SRC-NASEM-DRI-RDA-2005'];
const carbohydrateSourceIds = ['SRC-NASEM-DRI-RDA-2005', 'SRC-NASEM-DRI-MACROS-2005'];

export function calculateMacroRecommendation(input: MacroRecommendationInput): MacroRecommendationResult {
  const assumptions: string[] = [];
  const warnings: RecommendationWarning[] = [];
  const bodyWeightKg = input.bodyWeightKg ?? 82;
  if (!input.bodyWeightKg) assumptions.push('Body weight was not provided; used 82 kg for macro estimation.');

  const macroPreference = normalizeMacroPreference(input);
  const proteinGrams = estimateProteinGrams(input, bodyWeightKg, macroPreference);
  const carbFloor = estimateCarbFloor(input, bodyWeightKg, macroPreference);
  const fatRange = estimateFatRange(input.calorieGoal, bodyWeightKg);
  const { carbsGrams, fatGrams } = allocateCarbsAndFat(input.calorieGoal, proteinGrams, carbFloor, fatRange, macroPreference, warnings);
  const estimated = {
    calories: input.calorieGoal,
    proteinGrams,
    carbsGrams,
    fatGrams,
  };
  const manual = input.manualTargets?.status === 'completed' ? input.manualTargets : undefined;
  const active = {
    calories: manual?.calories ?? estimated.calories,
    proteinGrams: manual?.proteinGrams ?? estimated.proteinGrams,
    carbsGrams: manual?.carbsGrams ?? estimated.carbsGrams,
    fatGrams: manual?.fatGrams ?? estimated.fatGrams,
  };

  if (manual) validateManualTargets(active, warnings);

  const rationale = [
    {
      ruleId: 'MACRO-001',
      summary: 'Macros were generated from gram-based protein, energy target, diet preference, training context, and AMDR context instead of one universal split.',
      sourceIds: macroRangeSourceIds,
    },
    {
      ruleId: 'MACRO-002',
      summary: 'Protein target was estimated from body mass, goal, energy status, and training context.',
      sourceIds: proteinSourceIds,
    },
    {
      ruleId: 'MACRO-003',
      summary: 'Carbohydrate target was allocated after protein and fat constraints, with minimum and performance context considered.',
      sourceIds: carbohydrateSourceIds,
    },
    {
      ruleId: 'MACRO-004',
      summary: 'Fat target used body-mass minimums and AMDR context rather than a universal percentage.',
      sourceIds: macroRangeSourceIds,
    },
  ];

  return {
    ...estimated,
    active,
    source: manual ? 'user_override' : 'system_estimate',
    metadata: {
      confidence: buildConfidence(input, warnings),
      assumptions,
      warnings,
      rationale,
      sourceIds: uniqueSourceIds(rationale.flatMap((item) => item.sourceIds), warnings.flatMap((item) => item.sourceIds ?? [])),
    },
  };
}

function normalizeMacroPreference(input: MacroRecommendationInput): MacroPreference {
  if (input.macroPreference) return input.macroPreference;
  const styles = input.eatingStyles ?? [];
  if (styles.includes('higher_protein')) return 'higher_protein';
  if (styles.includes('lower_carb') || styles.includes('keto')) return 'lower_carb';
  if (input.primaryGoal === 'cardiovascular_fitness' || input.primaryGoal === 'endurance' || input.primaryGoal === 'event_preparation' || input.primaryGoal === 'athletic_performance' || (input.cardioSessionsPerWeek ?? 0) >= 3) return 'higher_carb_endurance';
  return 'balanced';
}

function estimateProteinGrams(input: MacroRecommendationInput, bodyWeightKg: number, preference: MacroPreference) {
  const goal = input.primaryGoal ?? 'maintenance';
  const trained = input.trainingExperience === 'intermediate' || input.trainingExperience === 'advanced' || input.trainingExperience === 'athlete';
  let gramsPerKg = 1.6;

  if (goal === 'fat_loss') gramsPerKg = trained ? 2.1 : 2.0;
  else if (goal === 'muscle_gain' || goal === 'strength' || goal === 'recomposition') gramsPerKg = 1.8;
  else if (goal === 'cardiovascular_fitness' || goal === 'endurance' || goal === 'event_preparation' || goal === 'athletic_performance') gramsPerKg = 1.6;
  else if ((input.trainingDaysPerWeek ?? 0) === 0) gramsPerKg = 1.2;

  if (preference === 'higher_protein') gramsPerKg += 0.2;
  if (input.safetyLevel === 'restricted') gramsPerKg = Math.min(gramsPerKg, 1.6);

  return roundToNearest(bodyWeightKg * Math.min(2.4, gramsPerKg), 5);
}

function estimateCarbFloor(input: MacroRecommendationInput, bodyWeightKg: number, preference: MacroPreference) {
  if ((input.eatingStyles ?? []).includes('keto')) return 50;
  if (preference === 'lower_carb') return Math.max(100, roundToNearest(bodyWeightKg * 1.2, 5));
  if (preference === 'higher_carb_endurance') return Math.max(180, roundToNearest(bodyWeightKg * 2.5, 5));
  return 130;
}

function estimateFatRange(calorieGoal: number, bodyWeightKg: number) {
  const minimumByBodyMass = bodyWeightKg * 0.6;
  const minimumByAmdr = (calorieGoal * 0.2) / 9;
  const maximumByAmdr = (calorieGoal * 0.35) / 9;
  return {
    min: roundToNearest(Math.max(minimumByBodyMass, minimumByAmdr), 5),
    max: roundToNearest(maximumByAmdr, 5),
  };
}

function allocateCarbsAndFat(
  calories: number,
  proteinGrams: number,
  carbFloor: number,
  fatRange: { min: number; max: number },
  preference: MacroPreference,
  warnings: RecommendationWarning[]
) {
  const caloriesAfterProtein = calories - proteinGrams * 4;
  let carbsGrams = carbFloor;
  let fatGrams = roundToNearest((caloriesAfterProtein - carbsGrams * 4) / 9, 5);

  if (preference !== 'lower_carb' && preference !== 'higher_carb_endurance') {
    fatGrams = fatRange.min;
    carbsGrams = roundToNearest((caloriesAfterProtein - fatGrams * 9) / 4, 5);
  }

  if (preference === 'higher_carb_endurance') {
    fatGrams = fatRange.min;
    carbsGrams = roundToNearest((caloriesAfterProtein - fatGrams * 9) / 4, 5);
  }

  if (fatGrams < fatRange.min) {
    warnings.push({
      code: 'fat_below_context_range',
      message: 'Calorie, protein, and carbohydrate constraints pushed fat below the contextual minimum; fat was raised and carbohydrate was adjusted.',
      severity: 'caution',
      sourceIds: macroRangeSourceIds,
    });
    fatGrams = fatRange.min;
    carbsGrams = roundToNearest((caloriesAfterProtein - fatGrams * 9) / 4, 5);
  }

  if (preference !== 'lower_carb' && fatGrams > fatRange.max) {
    fatGrams = fatRange.max;
    carbsGrams = roundToNearest((caloriesAfterProtein - fatGrams * 9) / 4, 5);
  }

  if (carbsGrams < 50) {
    warnings.push({
      code: 'carbohydrate_very_low',
      message: 'Carbohydrate target is very low for a general training plan; review diet preference and training performance.',
      severity: 'caution',
      sourceIds: carbohydrateSourceIds,
    });
    carbsGrams = 50;
    fatGrams = roundToNearest((caloriesAfterProtein - carbsGrams * 4) / 9, 5);
  }

  return { carbsGrams: Math.max(50, carbsGrams), fatGrams: Math.max(30, fatGrams) };
}

function validateManualTargets(targets: MacroRecommendationResult['active'], warnings: RecommendationWarning[]) {
  const macroCalories = targets.proteinGrams * 4 + targets.carbsGrams * 4 + targets.fatGrams * 9;
  const mismatch = Math.abs(macroCalories - targets.calories);
  if (mismatch > Math.max(100, targets.calories * 0.08)) {
    warnings.push({
      code: 'manual_macro_calorie_mismatch',
      message: `Manual macros add up to about ${macroCalories} kcal, which does not closely match the ${targets.calories} kcal target.`,
      severity: 'caution',
    });
  }
}

function buildConfidence(input: MacroRecommendationInput, warnings: RecommendationWarning[]) {
  if (input.safetyLevel === 'restricted') return 'low';
  if (warnings.some((warning) => warning.severity === 'restricted')) return 'low';
  if (!input.bodyWeightKg || warnings.some((warning) => warning.severity === 'caution')) return 'medium';
  return 'high';
}

function roundToNearest(value: number, nearest: number) {
  return Math.round(value / nearest) * nearest;
}
