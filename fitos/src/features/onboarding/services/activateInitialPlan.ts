import { deriveActivePlanSnapshot } from '../../../domain/planning/deriveActivePlanSnapshot';
import { useActivePlanStore } from '../../../store/activePlanStore';
import { useNutritionStore } from '../../../store/nutritionStore';
import { useProgressStore } from '../../../store/progressStore';
import { useTrainingStore } from '../../../store/trainingStore';
import { useUserStore } from '../../../store/userStore';
import { useCoachStore } from '../../coach/store/coachStore';
import { buildUserProfileFromOnboarding } from './buildUserProfileFromOnboarding';
import { kgToLbs } from './unitConversion';
import type { InitialPlan, OnboardingDraftState } from '../types';

export function activateInitialPlan(draft: OnboardingDraftState, confirmedPlan: InitialPlan) {
  const profile = buildUserProfileFromOnboarding({ ...draft, plan: confirmedPlan }, confirmedPlan);
  const snapshot = deriveActivePlanSnapshot(confirmedPlan, { source: 'onboarding', activatedAt: confirmedPlan.confirmedAt });
  const currentWeightLbs = kgToLbs(profile.body.currentWeightKg);
  const goalWeightLbs = profile.body.targetWeightKg ? kgToLbs(profile.body.targetWeightKg) : currentWeightLbs;

  useActivePlanStore.getState().setActivePlan({
    id: confirmedPlan.id,
    plan: confirmedPlan,
    source: snapshot.source,
    activatedAt: snapshot.activatedAt,
    confidence: snapshot.confidence,
    sourceReferences: snapshot.sourceReferences,
  });
  useUserStore.getState().setProfile(profile);
  useNutritionStore.getState().setGoals(snapshot.nutritionGoals);
  useTrainingStore.getState().setTodayWorkout(snapshot.todayWorkout);
  useTrainingStore.getState().updateCardioPlan(snapshot.cardioPlan);
  useProgressStore.getState().updateCurrentWeight(currentWeightLbs);
  useProgressStore.getState().updateGoalWeight(goalWeightLbs);
  useCoachStore.getState().setCoachingStyle(profile.preferences.coachingStyle);
  useCoachStore.getState().setAppearance(profile.preferences.appearance);
  useCoachStore.getState().setPostOnboardingHandoff(snapshot.coachHandoff);

  return { profile, snapshot };
}