import type { OnboardingAnswers, OnboardingSafetyResult } from '../types';
import type { RecommendationWarning } from '../../../domain/recommendations/types';

export function evaluateOnboardingSafety(answers: OnboardingAnswers): OnboardingSafetyResult {
  const flags: string[] = [];
  const blockedActions: string[] = [];
  const warnings: RecommendationWarning[] = [];
  const age = answers.age;
  const heightMeters = answers.heightCm ? answers.heightCm / 100 : undefined;
  const bmi = heightMeters && answers.currentWeightKg ? answers.currentWeightKg / (heightMeters * heightMeters) : undefined;

  if (typeof age === 'number' && age < 18) {
    flags.push('under_18');
    blockedActions.push('automated_calorie_deficit', 'automated_calorie_surplus');
    warnings.push({ code: 'under_18', message: 'Automated calorie targets are restricted for users under 18.', severity: 'restricted' });
  }

  if (bmi && bmi < 18.5) {
    flags.push('underweight_range');
    blockedActions.push('automated_calorie_deficit');
    warnings.push({ code: 'underweight_range', message: 'Automated calorie deficits are restricted for underweight BMI ranges.', severity: 'restricted' });
  }

  if (answers.ratePreference === 'faster') {
    flags.push('aggressive_rate_requested');
    warnings.push({ code: 'aggressive_rate_requested', message: 'Faster progress requests should be reduced to conservative starting changes.', severity: 'caution', sourceIds: ['SRC-CDC-WEIGHT-LOSS-2025'] });
  }

  if (answers.isPregnant || answers.isBreastfeeding) {
    flags.push(answers.isPregnant ? 'pregnancy' : 'breastfeeding');
    blockedActions.push('automated_calorie_deficit', 'automated_calorie_surplus', 'advanced_exercise_progression');
    warnings.push({ code: 'pregnancy_or_breastfeeding', message: 'Pregnancy or breastfeeding requires clinician-aware nutrition and activity guidance.', severity: 'restricted', sourceIds: ['SRC-CDC-PREGNANCY-ACTIVITY-2025', 'SRC-NASEM-DRI-RDA-2005'] });
  }

  if (answers.eatingDisorderConcern) {
    flags.push('eating_disorder_risk');
    blockedActions.push('automated_calorie_deficit', 'automated_macro_targets', 'weight_loss_pacing');
    warnings.push({ code: 'eating_disorder_risk', message: 'Calorie and macro prescriptions are restricted when eating disorder risk is indicated.', severity: 'restricted' });
  }

  if (answers.medicallyPrescribedDiet || answers.clinicianDirectedNutrition) {
    flags.push('clinician_directed_nutrition');
    blockedActions.push('automated_macro_targets', 'automated_calorie_deficit', 'automated_calorie_surplus');
    warnings.push({ code: 'clinician_directed_nutrition', message: 'Clinician-directed nutrition should not be overwritten by app-generated targets.', severity: 'restricted' });
  }

  if (answers.severeInjuryOrPain || answers.cardiacSymptoms) {
    flags.push(answers.cardiacSymptoms ? 'cardiac_or_red_flag_symptoms' : 'severe_injury_or_pain');
    blockedActions.push('advanced_exercise_progression', 'high_intensity_cardio');
    warnings.push({ code: 'medical_exercise_clearance', message: 'Exercise progression should be clinician-guided when severe pain or red-flag symptoms are indicated.', severity: 'restricted' });
  }

  const manualCalories = answers.manualTargets?.status === 'completed' ? answers.manualTargets.calories : undefined;
  if (typeof manualCalories === 'number' && (manualCalories < 1200 || manualCalories > 6000)) {
    flags.push('extreme_requested_calorie_target');
    blockedActions.push('activate_extreme_calorie_target');
    warnings.push({ code: 'extreme_requested_calorie_target', message: 'Requested calorie target is outside the app safety boundary.', severity: 'restricted' });
  }

  const hasSensitiveLimitation = answers.limitations?.some(
    (limitation) => limitation.type === 'clinician_restriction' || limitation.sensitivity === 'sensitive'
  );
  if (hasSensitiveLimitation) {
    flags.push('clinician_or_sensitive_limitation');
    blockedActions.push('advanced_exercise_progression');
    warnings.push({ code: 'clinician_or_sensitive_limitation', message: 'Training progression should stay conservative around clinician or sensitive limitations.', severity: 'caution' });
  }

  const restricted = warnings.some((warning) => warning.severity === 'restricted');
  const sourceReferences = Array.from(new Set(warnings.flatMap((warning) => warning.sourceIds ?? [])));

  if (restricted) {
    return {
      level: 'restricted',
      flags,
      blockedActions,
      message: 'Form Theory can help you organize habits and training, but it will not create aggressive calorie targets from this profile. Use conservative targets and qualified guidance when needed.',
      warnings,
      sourceReferences,
      confidence: 'high',
    };
  }

  if (flags.length > 0) {
    return {
      level: 'caution',
      flags,
      blockedActions,
      message: 'Form Theory will keep the starting plan conservative and avoid aggressive changes.',
      warnings,
      sourceReferences,
      confidence: 'high',
    };
  }

  return { level: 'standard', flags, blockedActions, warnings, sourceReferences, confidence: 'high' };
}
