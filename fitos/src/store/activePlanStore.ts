import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ActivePlanSource } from '../domain/planning/deriveActivePlanSnapshot';
import type { InitialPlan } from '../features/onboarding/types';

export interface ActivePlanRecord {
  id: string;
  plan: InitialPlan;
  source: ActivePlanSource;
  activatedAt: string;
  confidence: InitialPlan['confidence'];
  sourceReferences: string[];
}

interface ActivePlanState {
  activePlan: ActivePlanRecord | null;
  isLoaded: boolean;
  hasHydrated: boolean;
  initActivePlan: () => Promise<void>;
  setActivePlan: (record: ActivePlanRecord) => void;
  clearActivePlan: () => void;
}

const activePlanStorageKey = 'form-theory-active-plan-v1';

const memoryActivePlanStorage = (() => {
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

const activePlanStorage = typeof window === 'undefined' ? memoryActivePlanStorage : AsyncStorage;

export const useActivePlanStore = create<ActivePlanState>((set) => ({
  activePlan: null,
  isLoaded: false,
  hasHydrated: false,

  initActivePlan: async () => {
    try {
      const value = await activePlanStorage.getItem(activePlanStorageKey);
      if (value) {
        set({ activePlan: JSON.parse(value) as ActivePlanRecord, isLoaded: true, hasHydrated: true });
        return;
      }
      set({ activePlan: null, isLoaded: true, hasHydrated: true });
    } catch {
      set({ activePlan: null, isLoaded: true, hasHydrated: true });
    }
  },

  setActivePlan: (record) => {
    activePlanStorage.setItem(activePlanStorageKey, JSON.stringify(record)).catch(() => undefined);
    set({ activePlan: record, isLoaded: true, hasHydrated: true });
  },

  clearActivePlan: () => {
    activePlanStorage.removeItem(activePlanStorageKey).catch(() => undefined);
    set({ activePlan: null, isLoaded: false, hasHydrated: true });
  },
}));