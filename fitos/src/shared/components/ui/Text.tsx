import React from 'react';
import { Text as RNText, TextStyle, StyleProp } from 'react-native';
import { darkTheme, colors } from '@/shared/theme/colors';
import { typography } from '@/shared/theme/typography';
import type { TypographyToken } from '@/shared/theme/typography';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';

interface TextProps {
  children: React.ReactNode;
  variant?: TypographyToken;
  color?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export function Text({
  children,
  variant = 'bodyMedium',
  color,
  style,
  numberOfLines,
}: TextProps) {
  const theme = useActiveTheme();
  const resolvedColor = resolveThemeColor(color, theme.colors.text.primary, theme);

  return (
    <RNText
      style={[typography[variant], { color: resolvedColor }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}

function resolveThemeColor(color: string | undefined, fallback: string, theme: ReturnType<typeof useActiveTheme>) {
  if (!color) return fallback;

  const base = darkTheme.colors;
  const tokenMap: Record<string, string> = {
    [colors.textPrimary]: theme.colors.text.primary,
    [colors.textSecondary]: theme.colors.text.secondary,
    [colors.textTertiary]: theme.colors.text.muted,
    [colors.textDisabled]: theme.colors.text.disabled,
    [colors.background]: theme.colors.background.primary,
    [colors.accent]: theme.colors.persona.core,
    [colors.accentMuted]: theme.colors.persona.soft,
    [colors.success]: theme.colors.status.success,
    [colors.warning]: theme.colors.status.warning,
    [colors.error]: theme.colors.status.error,
    [base.text.primary]: theme.colors.text.primary,
    [base.text.secondary]: theme.colors.text.secondary,
    [base.text.muted]: theme.colors.text.muted,
    [base.text.disabled]: theme.colors.text.disabled,
    [base.text.inverse]: theme.colors.text.inverse,
    [base.accent.primary]: theme.colors.persona.core,
    [base.accent.soft]: theme.colors.persona.core,
    [base.status.success]: theme.colors.status.success,
    [base.status.warning]: theme.colors.status.warning,
    [base.status.error]: theme.colors.status.error,
    [base.status.info]: theme.colors.status.info,
  };

  return tokenMap[color] ?? color;
}
