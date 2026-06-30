import { formTheoryLogoSizes, formTheoryMotion, formTheoryRadii } from '@/branding/visualSystem';

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radius = {
  sm: formTheoryRadii.sm,
  md: formTheoryRadii.md,
  lg: formTheoryRadii.lg,
  xl: formTheoryRadii.xl,
  '2xl': formTheoryRadii.panel,
  full: formTheoryRadii.pill,
} as const;

export const logoSizes = formTheoryLogoSizes;
export const motion = formTheoryMotion;

export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 7,
    elevation: 4,
  },
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 6,
  },
} as const;
