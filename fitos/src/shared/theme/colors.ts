export type PersonaId = 'cedric' | 'elara';
export type AppearanceMode = 'dark' | 'light';

export interface FitOSTheme {
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

export const cedricTheme: FitOSTheme = {
  mode: 'dark',
  colors: {
    background: {
      primary: '#070908',
      secondary: '#0C0F0D',
      elevated: '#111512',
      overlay: 'rgba(7,9,8,0.88)',
    },
    surface: {
      default: 'rgba(16,20,17,0.88)',
      raised: 'rgba(21,26,22,0.92)',
      subtle: 'rgba(12,15,13,0.78)',
      selected: 'rgba(168,233,91,0.10)',
      translucent: 'rgba(16,20,17,0.72)',
    },
    border: {
      subtle: 'rgba(255,255,255,0.07)',
      default: 'rgba(255,255,255,0.11)',
      strong: 'rgba(255,255,255,0.17)',
      persona: 'rgba(168,233,91,0.36)',
      accent: 'rgba(168,233,91,0.34)',
    },
    text: {
      primary: '#F4F6F4',
      secondary: '#A8AEA9',
      muted: '#747B75',
      disabled: '#505651',
      inverse: '#080A09',
    },
    persona: {
      core: '#A8E95B',
      soft: 'rgba(168,233,91,0.22)',
      ambient: 'rgba(113,170,67,0.10)',
      deep: '#182015',
    },
    accent: {
      primary: '#A8E95B',
      soft: '#98D94A',
      muted: 'rgba(168,233,91,0.10)',
      glow: 'rgba(168,233,91,0.12)',
    },
    status: {
      success: '#79D88B',
      warning: '#D9B96E',
      error: '#E07C7C',
      info: '#7FA9D8',
    },
  },
};

export const elaraTheme: FitOSTheme = {
  mode: 'light',
  colors: {
    background: {
      primary: '#F5F7F8',
      secondary: '#EEF2F4',
      elevated: '#FFFFFF',
      overlay: 'rgba(245,247,248,0.88)',
    },
    surface: {
      default: 'rgba(255,255,255,0.88)',
      raised: 'rgba(255,255,255,0.96)',
      subtle: 'rgba(236,241,244,0.82)',
      selected: 'rgba(120,190,235,0.13)',
      translucent: 'rgba(255,255,255,0.74)',
    },
    border: {
      subtle: 'rgba(22,36,46,0.08)',
      default: 'rgba(22,36,46,0.12)',
      strong: 'rgba(22,36,46,0.18)',
      persona: 'rgba(120,190,235,0.42)',
      accent: 'rgba(120,190,235,0.42)',
    },
    text: {
      primary: '#182127',
      secondary: '#52616A',
      muted: '#7B8991',
      disabled: '#A9B3B9',
      inverse: '#FFFFFF',
    },
    persona: {
      core: '#5EADD9',
      soft: 'rgba(120,190,235,0.22)',
      ambient: 'rgba(120,190,235,0.12)',
      deep: '#DCEEF8',
    },
    accent: {
      primary: '#5EADD9',
      soft: '#78BEEB',
      muted: 'rgba(120,190,235,0.13)',
      glow: 'rgba(120,190,235,0.16)',
    },
    status: {
      success: '#4F93C2',
      warning: '#B6842D',
      error: '#C85F5F',
      info: '#4F93C2',
    },
  },
};

export const themesByPersona = {
  cedric: cedricTheme,
  elara: elaraTheme,
} satisfies Record<PersonaId, FitOSTheme>;

export function getThemeForPersona(personaId: PersonaId): FitOSTheme {
  return themesByPersona[personaId];
}

export const semanticColors = cedricTheme.colors;

/*
 * Compatibility aliases. New code should prefer useActiveTheme() and theme.colors.*.
 * These remain Cedric-dark defaults for older components until they are migrated.
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

