import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { activateInitialPlan } from '../services/activateInitialPlan';
import { calculateProfileCompleteness } from '../services/calculateProfileCompleteness';
import { evaluateOnboardingSafety } from '../services/evaluateOnboardingSafety';
import { generateInitialPlan } from '../services/generateInitialPlan';
import { getNextStepId, getPreviousStepId } from '../steps';
import type { InitialPlan, OnboardingAnswers, OnboardingDraftState, OnboardingStepId } from '../types';
import { onboardingVersion } from '../types';

const onboardingStorageKey = 'form-theory-onboarding-v1';
const profileShortcutKey = 'form-theory-profile-shortcut-v1';

const memoryOnboardingStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (name: string) => Promise.resolve(store[name] ?? null),
    setItem: (name: string, value: string) => {
      store[name] = value;
      return Promise.resolve();
    },
    removeItem: (name: string) => {
      delete store[name];
      return Promise.resolve();
    },
  };
})();

const onboardingStorage = typeof window === 'undefined' ? memoryOnboardingStorage : AsyncStorage;

const defaultDraft: OnboardingDraftState = {
  status: 'not_started',
  currentStepId: 'welcome_name',
  completedStepIds: [],
  skippedStepIds: [],
  answers: {
    units: 'imperial',
    appearance: 'system',
    coachingStyle: 'balanced',
    responseDetail: 'standard',
    accountability: 'gentle',
    memoryPreference: 'ask_first',
    manualTargets: { status: 'not_used' },
  },
  plan: null,
  safety: null,
  completeness: {
    essentials: 0,
    goals: 0,
    training: 0,
    nutrition: 0,
    lifestyle: 0,
    preferences: 60,
    integrations: 0,
    overall: 8,
  },
  version: onboardingVersion,
};

export interface OnboardingState extends OnboardingDraftState {
  isHydrated: boolean;
  savedShortcut: { username: string; firstName: string } | null;
  init: () => Promise<void>;
  updateAnswers: (answers: Partial<OnboardingAnswers>) => void;
  skipStep: (stepId?: OnboardingStepId) => void;
  next: () => void;
  back: () => void;
  goToStep: (stepId: OnboardingStepId) => void;
  ensurePlan: () => InitialPlan | null;
  editPlan: (edits: Partial<Pick<InitialPlan, 'macros' | 'training' | 'cardio' | 'expectedRate'>>) => void;
  confirmPlan: () => void;
  restoreFromShortcut: () => Promise<void>;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()((set, get) => ({
  ...defaultDraft,
  isHydrated: false,
  savedShortcut: null,

  init: async () => {
    try {
      const [value, shortcutValue] = await Promise.all([
        onboardingStorage.getItem(onboardingStorageKey),
        onboardingStorage.getItem(profileShortcutKey),
      ]);
      const shortcut = shortcutValue ? (JSON.parse(shortcutValue) as { username: string; firstName: string }) : null;
      if (value) {
        const parsed = JSON.parse(value) as OnboardingDraftState;
        set({ ...defaultDraft, ...parsed, isHydrated: true, savedShortcut: shortcut });
        return;
      }
      set({ ...defaultDraft, isHydrated: true, savedShortcut: shortcut });
    } catch {
      set({ ...defaultDraft, isHydrated: true, savedShortcut: null });
    }
  },

  updateAnswers: (answers) => {
    set((state) => {
      const mergedAnswers = { ...state.answers, ...answers };
      return {
        answers: mergedAnswers,
        status: state.status === 'not_started' ? 'in_progress' : state.status,
        startedAt: state.startedAt ?? new Date().toISOString(),
        safety: evaluateOnboardingSafety(mergedAnswers),
        completeness: calculateProfileCompleteness(mergedAnswers),
      };
    });
    persist(get());
  },

  skipStep: (stepId) => {
    const target = stepId ?? get().currentStepId;
    set((state) => ({
      skippedStepIds: addUnique(state.skippedStepIds, target),
      completedStepIds: addUnique(state.completedStepIds, target),
      currentStepId: getNextStepId(target, state.answers),
      status: state.status === 'not_started' ? 'in_progress' : state.status,
      startedAt: state.startedAt ?? new Date().toISOString(),
    }));
    persist(get());
  },

  next: () => {
    set((state) => ({
      completedStepIds: addUnique(state.completedStepIds, state.currentStepId),
      currentStepId: getNextStepId(state.currentStepId, state.answers),
      status: state.status === 'not_started' ? 'in_progress' : state.status,
      startedAt: state.startedAt ?? new Date().toISOString(),
    }));
    persist(get());
  },

  back: () => {
    set((state) => ({ currentStepId: getPreviousStepId(state.currentStepId, state.answers) }));
    persist(get());
  },

  goToStep: (stepId) => {
    set({ currentStepId: stepId });
    persist(get());
  },

  ensurePlan: () => {
    const plan = generateInitialPlan(get().answers);
    set({ plan, safety: evaluateOnboardingSafety(get().answers), completeness: calculateProfileCompleteness(get().answers) });
    persist(get());
    return plan;
  },

  editPlan: (edits) => {
    set((state) => ({ plan: state.plan ? { ...state.plan, ...edits, status: 'draft' } : state.plan }));
    persist(get());
  },

  confirmPlan: () => {
    const draft = get();
    const plan = draft.plan ?? generateInitialPlan(draft.answers);
    if (plan.safetyLevel === 'restricted') {
      set({ safety: draft.safety ?? evaluateOnboardingSafety(draft.answers) });
      persist(get());
      return;
    }

    const confirmedPlan: InitialPlan = {
      ...plan,
      status: 'confirmed',
      confirmedAt: new Date().toISOString(),
    };
    activateInitialPlan(draft, confirmedPlan);

    set({
      status: 'completed',
      currentStepId: 'plan_preview',
      completedStepIds: addUnique(draft.completedStepIds, 'plan_preview'),
      plan: confirmedPlan,
      completedAt: new Date().toISOString(),
      completeness: calculateProfileCompleteness(draft.answers),
    });
    persist(get());

    // Save profile shortcut for quick sign-in during testing
    const username = draft.answers.username?.trim();
    const firstName = draft.answers.firstName?.trim();
    if (username) {
      const shortcut = { username, firstName: firstName ?? username };
      onboardingStorage.setItem(profileShortcutKey, JSON.stringify(shortcut)).catch(() => undefined);
      set({ savedShortcut: shortcut });
    }
  },

  restoreFromShortcut: async () => {
    // Restores the saved onboarding draft (already in storage) and marks hydrated
    try {
      const value = await onboardingStorage.getItem(onboardingStorageKey);
      if (value) {
        const parsed = JSON.parse(value) as OnboardingDraftState;
        set({ ...defaultDraft, ...parsed, isHydrated: true });
      }
    } catch {
      set({ isHydrated: true });
    }
  },

  reset: () => {
    onboardingStorage.removeItem(onboardingStorageKey).catch(() => undefined);
    set((state) => ({ ...defaultDraft, isHydrated: true, savedShortcut: state.savedShortcut }));
  },
}));

function persist(state: OnboardingState) {
  const draft: OnboardingDraftState = {
    status: state.status,
    currentStepId: state.currentStepId,
    completedStepIds: state.completedStepIds,
    skippedStepIds: state.skippedStepIds,
    answers: state.answers,
    plan: state.plan,
    safety: state.safety,
    completeness: state.completeness,
    startedAt: state.startedAt,
    completedAt: state.completedAt,
    version: state.version,
  };
  onboardingStorage.setItem(onboardingStorageKey, JSON.stringify(draft)).catch(() => undefined);
}

function addUnique<T>(values: T[], value: T) {
  return values.includes(value) ? values : [...values, value];
}
