/**
 * FitOS Design System — Color Tokens
 *
 * Five colors. No exceptions.
 * Background · Surface · Text · Neon Green · Amber
 * Restraint is the premium.
 */

export const colors = {
  // ─── Backgrounds ───────────────────────────────────────────────────────────
  background: '#050505',
  surface: '#111111',
  surfaceElevated: '#161616',
  surfaceHigh: '#1D1D1D',

  // ─── Borders ───────────────────────────────────────────────────────────────
  border: 'rgba(243, 243, 243, 0.06)',
  borderStrong: 'rgba(243, 243, 243, 0.10)',

  // ─── Text ──────────────────────────────────────────────────────────────────
  textPrimary: '#F3F3F3',
  textSecondary: 'rgba(243, 243, 243, 0.52)',
  textTertiary: 'rgba(243, 243, 243, 0.26)',
  textDisabled: 'rgba(243, 243, 243, 0.14)',

  // ─── Accent — Neon Performance Green ───────────────────────────────────────
  accent: '#A8FF3E',
  accentMuted: 'rgba(168, 255, 62, 0.10)',
  accentDim: 'rgba(168, 255, 62, 0.18)',

  // ─── Neon states ───────────────────────────────────────────────────────────
  neonGreen: '#A8FF3E',
  neonGreenMuted: 'rgba(168, 255, 62, 0.10)',
  neonRed: '#FF3B30',
  neonRedMuted: 'rgba(255, 59, 48, 0.10)',

  // ─── Semantic ──────────────────────────────────────────────────────────────
  success: '#A8FF3E',
  successMuted: 'rgba(168, 255, 62, 0.10)',
  warning: '#F5A623',
  warningMuted: 'rgba(245, 166, 35, 0.12)',
  error: '#FF3B30',
  errorMuted: 'rgba(255, 59, 48, 0.10)',

  // ─── Macro / Metric — all unified to accent ────────────────────────────────
  calories: '#A8FF3E',
  caloriesMuted: 'rgba(168, 255, 62, 0.10)',
  protein: '#A8FF3E',
  proteinMuted: 'rgba(168, 255, 62, 0.10)',
  carbs: '#A8FF3E',
  carbsMuted: 'rgba(168, 255, 62, 0.10)',
  fat: '#A8FF3E',
  fatMuted: 'rgba(168, 255, 62, 0.10)',
  weight: '#A8FF3E',
  weightMuted: 'rgba(168, 255, 62, 0.10)',
  steps: '#A8FF3E',
  stepsMuted: 'rgba(168, 255, 62, 0.10)',
  training: '#A8FF3E',
  trainingMuted: 'rgba(168, 255, 62, 0.10)',

  // ─── Coach Screen ──────────────────────────────────────────────────────────
  coachGlow: 'rgba(168, 255, 62, 0.12)',
  coachGlowStrong: 'rgba(168, 255, 62, 0.06)',
  coachRing: '#A8FF3E',
  coachChipBorder: 'rgba(168, 255, 62, 0.18)',

  // ─── Tab Bar ───────────────────────────────────────────────────────────────
  tabBarBackground: '#070707',
  tabBarBorder: 'rgba(243, 243, 243, 0.04)',
  tabBarActive: '#A8FF3E',
  tabBarInactive: 'rgba(243, 243, 243, 0.26)',
} as const;

export type ColorToken = keyof typeof colors;

