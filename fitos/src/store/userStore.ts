import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUser } from '../features/dashboard/mock';
import type { UserProfile } from '../types';

interface UserState {
  profile: UserProfile | null;
  isLoaded: boolean;
  hasHydrated: boolean;
  initProfile: () => Promise<void>;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

const userProfileStorageKey = 'form-theory-user-profile-v1';

const memoryProfileStorage = (() => {
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

const profileStorage = typeof window === 'undefined' ? memoryProfileStorage : AsyncStorage;

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoaded: false,
  hasHydrated: false,

  initProfile: async () => {
    try {
      const value = await profileStorage.getItem(userProfileStorageKey);
      if (value) {
        set({ profile: JSON.parse(value) as UserProfile, isLoaded: true, hasHydrated: true });
        return;
      }
      set({ profile: null, isLoaded: true, hasHydrated: true });
    } catch {
      set({ profile: null, isLoaded: true, hasHydrated: true });
    }
  },

  setProfile: (profile) => {
    profileStorage.setItem(userProfileStorageKey, JSON.stringify(profile)).catch(() => undefined);
    set({ profile, isLoaded: true, hasHydrated: true });
  },

  clearProfile: () => {
    profileStorage.removeItem(userProfileStorageKey).catch(() => undefined);
    set({ profile: null, isLoaded: false, hasHydrated: true });
  },
}));

export const fallbackUserProfile = mockUser;
