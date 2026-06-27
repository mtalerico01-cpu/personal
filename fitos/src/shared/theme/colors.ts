/**
 * FitOS Design System — Color Tokens
 *
 * Dark mode first. Inspired by Apple Health, WHOOP, and Linear.
 * All surfaces, text, and semantic colors are defined here.
 * Never hardcode hex values outside this file.
 */

export const colors = {
  // ─── Backgrounds ───────────────────────────────────────────────────────────
  background: '#0A0A0A',       // App background (near black)
  surface: '#141414',          // Default card surface
  surfaceElevated: '#1C1C1E',  // Elevated cards (modals, sheets)
  surfaceHigh: '#252528',      // Highest elevation surface

  // ─── Borders ───────────────────────────────────────────────────────────────
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.14)',

  // ─── Text ──────────────────────────────────────────────────────────────────
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.60)',
  textTertiary: 'rgba(255, 255, 255, 0.35)',
  textDisabled: 'rgba(255, 255, 255, 0.20)',

  // ─── Accent / Brand ────────────────────────────────────────────────────────
  accent: '#00D4AA',           // Primary teal – main interactive color
  accentMuted: 'rgba(0, 212, 170, 0.15)',
  accentDim: 'rgba(0, 212, 170, 0.30)',

  // ─── Semantic ──────────────────────────────────────────────────────────────
  success: '#30D158',
  successMuted: 'rgba(48, 209, 88, 0.15)',
  warning: '#FF9F0A',
  warningMuted: 'rgba(255, 159, 10, 0.15)',
  error: '#FF453A',
  errorMuted: 'rgba(255, 69, 58, 0.15)',

  // ─── Macro / Metric Colors ─────────────────────────────────────────────────
  calories: '#FF6B35',
  caloriesMuted: 'rgba(255, 107, 53, 0.15)',
  protein: '#7C7CF4',
  proteinMuted: 'rgba(124, 124, 244, 0.15)',
  carbs: '#FFD60A',
  carbsMuted: 'rgba(255, 214, 10, 0.15)',
  fat: '#FF9F0A',
  fatMuted: 'rgba(255, 159, 10, 0.15)',
  weight: '#64D2FF',
  weightMuted: 'rgba(100, 210, 255, 0.15)',
  steps: '#30D158',
  stepsMuted: 'rgba(48, 209, 88, 0.15)',
  training: '#BF5AF2',
  trainingMuted: 'rgba(191, 90, 242, 0.15)',

  // ─── Tab Bar ───────────────────────────────────────────────────────────────
  tabBarBackground: '#111111',
  tabBarBorder: 'rgba(255, 255, 255, 0.06)',
  tabBarActive: '#00D4AA',
  tabBarInactive: 'rgba(255, 255, 255, 0.35)',
} as const;

export type ColorToken = keyof typeof colors;
