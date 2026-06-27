import { create } from 'zustand';
import { mockUser } from '../features/dashboard/mock';
import type { UserProfile } from '../types';

interface UserState {
  profile: UserProfile | null;
  isLoaded: boolean;
  setProfile: (profile: UserProfile) => void;
  clearProfile: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: mockUser, // Pre-loaded with mock data for Phase 1
  isLoaded: true,
  setProfile: (profile) => set({ profile, isLoaded: true }),
  clearProfile: () => set({ profile: null, isLoaded: false }),
}));
