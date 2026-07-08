import type { ActivityLevel, EstimationSex, PrimaryGoal, RatePreference, StepsRange } from '../../../types';
import type { RecommendationMetadata, RecommendationWarning } from '../../recommendations/types';
import { uniqueSourceIds } from '../../recommendations/types';

export interface EnergyRequirementInput {
  age?: number;
  heightCm?: number;
  currentWeightKg?: number;
  estimationSex?: EstimationSex;
  activityLevel?: ActivityLevel;
  estimatedStepsRange?: StepsRange;
  trainingDaysPerWeek?: number | 'varies';
  cardioSessionsPerWeek?: number;
  primaryGoal?: PrimaryGoal;
  ratePreference?: RatePreference;
  manualCalories?: number;
  safetyLevel?: 'standard' | 'caution' | 'restricted';
}

export interface EnergyRequirementResult {
  restingCalories: number;
  maintenanceCalories: number;
  calorieGoal: number;
  adjustmentCalories: number;
  expectedRate: string;
  metadata: RecommendationMetadata;
}

const restingEnergySourceIds = ['SRC-ENERGY-MIFFLIN-1990'];
const weightRateSourceIds = ['SRC-CDC-WEIGHT-LOSS-2025'];

export function calculateEnergyRequirement(input: EnergyRequirementInput): EnergyRequirementResult {
  const assumptions: string[] = [];
  const warnings: RecommendationWarning[] = [];
  const age = input.age ?? 30;
  const heightCm = input.heightCm ?? 178;
  const currentWeightKg = input.currentWeightKg ?? 82;
  const estimationSex = input.estimationSex ?? 'not_used';

  if (!input.age) assumptions.push('Age was not provided; used age 30 for the starting estimate.');
  if (!input.heightCm) assumptions.push('Height was not provided; used 178 cm for the starting estimate.');
  if (!input.currentWeightKg) assumptions.push('Current weight was not provided; used 82 kg for the starting estimate.');
  if (!input.estimationSex || input.estimationSex === 'not_used') {
    assumptions.push('Sex-specific energy constants were not used; estimate confidence is lower.');
  }

  const restingCalories = roundToNearest(calculateRestingEnergy({ age, heightCm, currentWeightKg, estimationSex }), 5);
  const activityFactor = estimateActivityFactor(input, assumptions);
  const maintenanceCalories = roundToNearest(restingCalories * activityFactor, 25);
  const primaryGoal = input.primaryGoal ?? 'maintenance';

  if (input.manualCalories && input.safetyLevel !== 'restricted') {
    const metadata = buildEnergyMetadata(input, assumptions, warnings, [
      {
        ruleId: 'ENERGY-001',
        summary: 'Resting energy was estimated from age, height, weight, and optional sex-specific constants.',
        sourceIds: restingEnergySourceIds,
      },
      {
        ruleId: 'ENERGY-MANUAL-001',
        summary: 'User-provided calorie target was preserved as an override after safety validation.',
        sourceIds: [],
      },
    ]);
    return {
      restingCalories,
      maintenanceCalories,
      calorieGoal: input.manualCalories,
      adjustmentCalories: input.manualCalories - maintenanceCalories,
      expectedRate: 'Manual calorie target preserved',
      metadata,
    };
  }

  if (input.safetyLevel === 'restricted') {
    warnings.push({
      code: 'restricted_energy_prescription',
      message: 'Safety screening restricted calorie prescription; maintenance estimate was used instead.',
      severity: 'restricted',
    });
    const metadata = buildEnergyMetadata(input, assumptions, warnings, [
      {
        ruleId: 'ENERGY-001',
        summary: 'Resting energy was estimated from age, height, weight, and optional sex-specific constants.',
        sourceIds: restingEnergySourceIds,
      },
    ]);
    return {
      restingCalories,
      maintenanceCalories,
      calorieGoal: maintenanceCalories,
      adjustmentCalories: 0,
      expectedRate: 'Maintenance while safety guidance is reviewed',
      metadata,
    };
  }

  const goalAdjustment = calculateGoalAdjustment(primaryGoal, input.ratePreference, currentWeightKg, input.safetyLevel, warnings);
  const calorieGoal = roundToNearest(maintenanceCalories + goalAdjustment.adjustmentCalories, 25);
  const metadata = buildEnergyMetadata(input, assumptions, warnings, [
    {
      ruleId: 'ENERGY-001',
      summary: 'Resting energy was estimated from age, height, weight, and optional sex-specific constants.',
      sourceIds: restingEnergySourceIds,
    },
    {
      ruleId: 'ENERGY-002',
      summary: 'Maintenance was estimated by combining resting energy with activity, steps, and training assumptions.',
      sourceIds: restingEnergySourceIds,
    },
    ...goalAdjustment.rationale,
  ]);

  return {
    restingCalories,
    maintenanceCalories,
    calorieGoal,
    adjustmentCalories: calorieGoal - maintenanceCalories,
    expectedRate: goalAdjustment.expectedRate,
    metadata,
  };
}

function calculateRestingEnergy(input: { age: number; heightCm: number; currentWeightKg: number; estimationSex: EstimationSex }) {
  const base = 10 * input.currentWeightKg + 6.25 * input.heightCm - 5 * input.age;
  if (input.estimationSex === 'male') return base + 5;
  if (input.estimationSex === 'female') return base - 161;
  return base - 78;
}

function estimateActivityFactor(input: EnergyRequirementInput, assumptions: string[]) {
  const baseFactors: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.35,
    active: 1.5,
    highly_active: 1.7,
  };
  const activityLevel = input.activityLevel ?? 'light';
  if (!input.activityLevel) assumptions.push('Activity level was not provided; used light activity as the starting estimate.');

  let factor = baseFactors[activityLevel];
  if (input.estimatedStepsRange === 'under_4000') factor -= 0.05;
  if (input.estimatedStepsRange === '7000_10000') factor += 0.03;
  if (input.estimatedStepsRange === 'over_10000') factor += 0.06;

  const trainingDays = typeof input.trainingDaysPerWeek === 'number' ? input.trainingDaysPerWeek : 0;
  if (trainingDays >= 4) factor += 0.04;
  if ((input.cardioSessionsPerWeek ?? 0) >= 3) factor += 0.03;

  return Math.min(1.85, Math.max(1.15, factor));
}

function calculateGoalAdjustment(
  goal: PrimaryGoal,
  ratePreference: RatePreference | undefined,
  currentWeightKg: number,
  safetyLevel: EnergyRequirementInput['safetyLevel'],
  warnings: RecommendationWarning[]
) {
  if (goal === 'fat_loss') {
    const weeklyRateKg = getFatLossRateKg(currentWeightKg, ratePreference);
    const rawDeficit = -Math.round((weeklyRateKg * 7700) / 7);
    const maxDeficit = safetyLevel === 'caution' ? 500 : 750;
    const adjustmentCalories = Math.max(rawDeficit, -maxDeficit);
    if (ratePreference === 'faster') {
      warnings.push({
        code: 'faster_weight_loss_requested',
        message: 'Faster fat-loss preference was reduced to a conservative starting deficit for safety and adherence.',
        severity: 'caution',
        sourceIds: weightRateSourceIds,
      });
    }
    return {
      adjustmentCalories,
      expectedRate: `${weeklyRateKg.toFixed(1)} kg per week target range`,
      rationale: [{
        ruleId: 'WEIGHT-001',
        summary: 'Fat-loss pace was kept in a gradual range and capped to avoid an aggressive starting deficit.',
        sourceIds: weightRateSourceIds,
      }],
    };
  }

  if (goal === 'muscle_gain') {
    const surplus = ratePreference === 'faster' ? 300 : ratePreference === 'gradual' ? 150 : 250;
    return {
      adjustmentCalories: surplus,
      expectedRate: 'Slow gain with strength and body-weight trend review',
      rationale: [{
        ruleId: 'ENERGY-GAIN-001',
        summary: 'Muscle-gain target uses a modest surplus so weight trend can be reviewed before increasing intake.',
        sourceIds: [],
      }],
    };
  }

  if (goal === 'strength' || goal === 'athletic_performance' || goal === 'cardiovascular_fitness' || goal === 'endurance' || goal === 'event_preparation') {
    return {
      adjustmentCalories: 100,
      expectedRate: 'Performance support with stable body-weight trend',
      rationale: [{
        ruleId: 'ENERGY-PERFORMANCE-001',
        summary: 'Performance goals start near maintenance with a small energy buffer unless fat loss is requested.',
        sourceIds: [],
      }],
    };
  }

  if (goal === 'recomposition') {
    return {
      adjustmentCalories: -100,
      expectedRate: 'Slow recomposition with 2-week review',
      rationale: [{
        ruleId: 'ENERGY-RECOMP-001',
        summary: 'Recomposition starts close to maintenance with a small deficit and higher protein emphasis.',
        sourceIds: ['SRC-ISSN-PROTEIN-2017'],
      }],
    };
  }

  return {
    adjustmentCalories: 0,
    expectedRate: 'Maintenance with 2-week review',
    rationale: [{
      ruleId: 'ENERGY-MAINTENANCE-001',
      summary: 'Maintenance and general health goals start at estimated maintenance while behavior data accumulates.',
      sourceIds: [],
    }],
  };
}

function getFatLossRateKg(currentWeightKg: number, ratePreference?: RatePreference) {
  const percentRate = ratePreference === 'gradual' ? 0.0035 : ratePreference === 'faster' ? 0.008 : 0.0055;
  return Math.min(0.9, Math.max(0.25, currentWeightKg * percentRate));
}

function buildEnergyMetadata(
  input: EnergyRequirementInput,
  assumptions: string[],
  warnings: RecommendationWarning[],
  rationale: RecommendationMetadata['rationale']
): RecommendationMetadata {
  const missingCriticalInputs = [input.age, input.heightCm, input.currentWeightKg, input.activityLevel].filter((value) => value === undefined).length;
  const confidence = input.safetyLevel === 'restricted'
    ? 'low'
    : missingCriticalInputs > 1 || input.estimationSex === 'not_used'
      ? 'medium'
      : 'high';
  return {
    confidence,
    assumptions,
    warnings,
    rationale,
    sourceIds: uniqueSourceIds(rationale.flatMap((item) => item.sourceIds), warnings.flatMap((item) => item.sourceIds ?? [])),
  };
}

function roundToNearest(value: number, nearest: number) {
  return Math.round(value / nearest) * nearest;
}
