/**
 * FitOS Design System — Typography
 *
 * Uses San Francisco (system font) on iOS.
 * Scale is intentionally limited to prevent inconsistency.
 */

import { TextStyle } from 'react-native';

export const fontSizes = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 34,
  '4xl': 40,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
} as const;

export const lineHeights = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.4,
  relaxed: 1.6,
} as const;

/** Pre-composed text styles for consistent usage across the app. */
export const typography = {
  // Large display values (KPI numbers)
  displayLarge: {
    fontSize: fontSizes['4xl'],
    fontWeight: fontWeights.bold,
    letterSpacing: -1.5,
    lineHeight: fontSizes['4xl'] * lineHeights.tight,
  } satisfies TextStyle,

  displayMedium: {
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.bold,
    letterSpacing: -1,
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
  } satisfies TextStyle,

  displaySmall: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    letterSpacing: -0.5,
    lineHeight: fontSizes['2xl'] * lineHeights.snug,
  } satisfies TextStyle,

  // Section headings
  headingLarge: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    letterSpacing: -0.3,
    lineHeight: fontSizes.xl * lineHeights.snug,
  } satisfies TextStyle,

  headingMedium: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    letterSpacing: -0.2,
    lineHeight: fontSizes.lg * lineHeights.snug,
  } satisfies TextStyle,

  headingSmall: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    letterSpacing: -0.1,
    lineHeight: fontSizes.md * lineHeights.normal,
  } satisfies TextStyle,

  // Body text
  bodyLarge: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.base * lineHeights.relaxed,
  } satisfies TextStyle,

  bodyMedium: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.sm * lineHeights.relaxed,
  } satisfies TextStyle,

  // Labels / captions
  labelLarge: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.3,
    lineHeight: fontSizes.sm * lineHeights.normal,
  } satisfies TextStyle,

  labelMedium: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.5,
    lineHeight: fontSizes.xs * lineHeights.normal,
  } satisfies TextStyle,

  caption: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.xs * lineHeights.normal,
  } satisfies TextStyle,
} as const;

export type TypographyToken = keyof typeof typography;
