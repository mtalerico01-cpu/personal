export type AppearanceMode = 'dark' | 'light';
export type AppearancePreference = AppearanceMode | 'system';

import { formTheoryPalette } from '@/branding/visualSystem';

export interface FormTheoryTheme {
  mode: AppearanceMode;
  colors: {
    background: {
      primary: string;
      secondary: string;
      elevated: string;
      overlay: string;
    };
    surface: {
      default: string;
      raised: string;
      subtle: string;
      selected: string;
      translucent: string;
    };
    border: {
      subtle: string;
      default: string;
      strong: string;
      persona: string;
      accent: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
      disabled: string;
      inverse: string;
    };
    persona: {
      core: string;
      soft: string;
      ambient: string;
      deep: string;
    };
    brand: {
      core: string;
      soft: string;
      ambient: string;
      deep: string;
    };
    accent: {
      primary: string;
      soft: string;
      muted: string;
      glow: string;
    };
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
}

const darkBrand = {
  core: formTheoryPalette.lime,
  soft: 'rgba(167,255,0,0.16)',
  ambient: 'rgba(167,255,0,0.08)',
  deep: '#1D2A10',
};

const lightBrand = {
  core: formTheoryPalette.limePressed,
  soft: 'rgba(167,255,0,0.18)',
  ambient: 'rgba(167,255,0,0.08)',
  deep: '#EAF7CC',
};

export const darkTheme: FormTheoryTheme = {
  mode: 'dark',
  colors: {
    background: {
      primary: formTheoryPalette.black,
      secondary: formTheoryPalette.nearBlack,
      elevated: formTheoryPalette.graphite,
      overlay: 'rgba(11,13,16,0.90)',
    },
    surface: {
      default: 'rgba(16,18,20,0.92)',
      raised: 'rgba(26,29,34,0.96)',
      subtle: 'rgba(20,23,27,0.86)',
      selected: 'rgba(167,255,0,0.11)',
      translucent: 'rgba(16,18,20,0.78)',
    },
    border: {
      subtle: 'rgba(245,246,248,0.07)',
      default: 'rgba(245,246,248,0.12)',
      strong: 'rgba(245,246,248,0.20)',
      persona: 'rgba(167,255,0,0.42)',
      accent: 'rgba(167,255,0,0.38)',
    },
    text: {
      primary: formTheoryPalette.white,
      secondary: formTheoryPalette.silver,
      muted: formTheoryPalette.mutedGray,
      disabled: '#5F646C',
      inverse: formTheoryPalette.black,
    },
    persona: darkBrand,
    brand: darkBrand,
    accent: {
      primary: formTheoryPalette.lime,
      soft: formTheoryPalette.limePressed,
      muted: 'rgba(167,255,0,0.10)',
      glow: 'rgba(167,255,0,0.10)',
    },
    status: {
      success: '#82C95B',
      warning: formTheoryPalette.warning,
      error: formTheoryPalette.error,
      info: formTheoryPalette.information,
    },
  },
};

export const lightTheme: FormTheoryTheme = {
  mode: 'light',
  colors: {
    background: {
      primary: formTheoryPalette.coolWhite,
      secondary: '#EFF1F2',
      elevated: '#FFFFFF',
      overlay: 'rgba(247,248,248,0.90)',
    },
    surface: {
      default: 'rgba(255,255,255,0.92)',
      raised: 'rgba(255,255,255,0.98)',
      subtle: 'rgba(239,241,242,0.88)',
      selected: 'rgba(167,255,0,0.16)',
      translucent: 'rgba(255,255,255,0.80)',
    },
    border: {
      subtle: 'rgba(21,24,29,0.12)',
      default: 'rgba(21,24,29,0.17)',
      strong: 'rgba(21,24,29,0.26)',
      persona: 'rgba(143,224,0,0.42)',
      accent: 'rgba(143,224,0,0.38)',
    },
    text: {
      primary: formTheoryPalette.darkText,
      secondary: '#4E535A',
      muted: '#777D85',
      disabled: '#A7ABB0',
      inverse: '#FFFFFF',
    },
    persona: lightBrand,
    brand: lightBrand,
    accent: {
      primary: formTheoryPalette.limePressed,
      soft: '#A7FF00',
      muted: 'rgba(167,255,0,0.14)',
      glow: 'rgba(167,255,0,0.10)',
    },
    status: {
      success: '#5E9E35',
      warning: '#9D762E',
      error: '#B94E4E',
      info: '#646C78',
    },
  },
};

export const themesByAppearance = {
  dark: darkTheme,
  light: lightTheme,
} satisfies Record<AppearanceMode, FormTheoryTheme>;

export function resolveAppearanceMode(preference: AppearancePreference, colorScheme?: 'dark' | 'light' | null): AppearanceMode {
  if (preference === 'system') return colorScheme === 'light' ? 'light' : 'dark';
  return preference;
}

export function getThemeForAppearance(preference: AppearancePreference, colorScheme?: 'dark' | 'light' | null): FormTheoryTheme {
  return themesByAppearance[resolveAppearanceMode(preference, colorScheme)];
}

export const semanticColors = darkTheme.colors;

/*
 * Compatibility aliases. New code should prefer useActiveTheme() and theme.colors.*.
 * These remain dark defaults for older components until they are migrated.
 */
export const colors = {
  semantic: semanticColors,

  background: semanticColors.background.primary,
  surface: semanticColors.surface.default,
  surfaceElevated: semanticColors.surface.raised,
  surfaceHigh: semanticColors.surface.selected,

  border: semanticColors.border.subtle,
  borderStrong: semanticColors.border.default,

  textPrimary: semanticColors.text.primary,
  textSecondary: semanticColors.text.secondary,
  textTertiary: semanticColors.text.muted,
  textDisabled: semanticColors.text.disabled,

  accent: semanticColors.accent.primary,
  accentMuted: semanticColors.accent.muted,
  accentDim: semanticColors.border.accent,

  neonGreen: semanticColors.accent.primary,
  neonGreenMuted: semanticColors.accent.muted,
  neonRed: semanticColors.status.error,
  neonRedMuted: 'rgba(224,124,124,0.12)',

  success: semanticColors.status.success,
  successMuted: 'rgba(121,216,139,0.12)',
  warning: semanticColors.status.warning,
  warningMuted: 'rgba(217,185,110,0.12)',
  error: semanticColors.status.error,
  errorMuted: 'rgba(224,124,124,0.12)',

  calories: semanticColors.accent.soft,
  caloriesMuted: semanticColors.accent.muted,
  protein: semanticColors.status.success,
  proteinMuted: 'rgba(121,216,139,0.12)',
  carbs: semanticColors.status.info,
  carbsMuted: 'rgba(127,169,216,0.12)',
  fat: semanticColors.status.warning,
  fatMuted: 'rgba(217,185,110,0.12)',
  weight: semanticColors.accent.soft,
  weightMuted: semanticColors.accent.muted,
  steps: semanticColors.status.info,
  stepsMuted: 'rgba(127,169,216,0.12)',
  training: semanticColors.status.success,
  trainingMuted: 'rgba(121,216,139,0.12)',

  coachGlow: semanticColors.accent.glow,
  coachGlowStrong: 'rgba(181,255,73,0.06)',
  coachRing: semanticColors.accent.soft,
  coachChipBorder: 'rgba(255,255,255,0.12)',

  tabBarBackground: semanticColors.background.secondary,
  tabBarBorder: 'rgba(255,255,255,0.06)',
  tabBarActive: semanticColors.text.primary,
  tabBarInactive: semanticColors.text.muted,
} as const;

export type ColorToken = keyof typeof colors;
