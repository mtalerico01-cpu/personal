import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Text } from '@/shared/components/ui/Text';
import { fontFamilies } from '@/shared/theme/typography';
import { spacing } from '@/shared/theme/spacing';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { OnboardingProgress } from './OnboardingProgress';
import type { OnboardingSection } from '../types';

function ChevronLeft({ size = 18, color = '#E6E8ED' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

interface OnboardingShellProps {
  title: string;
  explanation?: string;
  section: OnboardingSection;
  progressCurrent: number;
  progressTotal: number;
  sections: readonly OnboardingSection[];
  canContinue: boolean;
  continueLabel?: string;
  showSkip?: boolean;
  onBack?: () => void;
  onContinue?: () => void;
  onSkip?: () => void;
  children: React.ReactNode;
}

export function OnboardingShell({
  title,
  explanation,
  section,
  progressCurrent,
  progressTotal,
  sections,
  canContinue,
  continueLabel = 'Continue',
  showSkip = false,
  onBack,
  onContinue,
  onSkip,
  children,
}: OnboardingShellProps) {
  const theme = useActiveTheme();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.root, { backgroundColor: theme.colors.background.primary }]}> 
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          {onBack ? (
            <TouchableOpacity accessibilityRole="button" onPress={onBack} activeOpacity={0.72} style={[styles.backButton, { borderColor: theme.colors.border.default }]}>
              <ChevronLeft size={18} color="#D7D9E0" />
              <Text variant="labelMedium" color="#D7D9E0" style={styles.backLabel}>Back</Text>
            </TouchableOpacity>
          ) : <View style={styles.backPlaceholder} />}
          <View style={styles.progressWrap}>
            <OnboardingProgress section={section} current={progressCurrent} total={progressTotal} sections={sections} />
          </View>
        </View>

        <View style={styles.header}>
          <Text variant="headingLarge" color={theme.colors.text.primary} style={styles.title}>
            {title}
          </Text>
          {explanation ? (
            <Text variant="bodyLarge" color={theme.colors.text.secondary} style={styles.explanation}>
              {explanation}
            </Text>
          ) : null}
        </View>

        <View style={styles.body}>{children}</View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border.subtle, backgroundColor: theme.colors.background.primary }]}> 
        {showSkip ? (
          <TouchableOpacity accessibilityRole="button" onPress={onSkip} style={styles.skipButton}>
            <Text variant="labelLarge" color={theme.colors.text.secondary} style={styles.footerLabel}>Skip for now</Text>
          </TouchableOpacity>
        ) : <View />}
        <TouchableOpacity
          accessibilityRole="button"
          disabled={!canContinue}
          activeOpacity={0.82}
          onPress={onContinue}
          style={[
            styles.continueButton,
            {
              backgroundColor: canContinue ? theme.colors.persona.core : theme.colors.surface.default,
              opacity: canContinue ? 1 : 0.5,
            },
          ]}
        >
          <Text variant="labelLarge" color={canContinue ? theme.colors.text.inverse : theme.colors.text.muted} style={styles.footerLabel}>
            {continueLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingTop: Platform.OS === 'ios' ? 58 : 34,
    paddingHorizontal: spacing[5],
    paddingBottom: 130,
    gap: spacing[8],
    maxWidth: 760,
    width: '100%',
    alignSelf: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing[3],
    gap: 4,
  },
  backLabel: {
    fontFamily: fontFamilies.button,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0,
  },
  backPlaceholder: {
    width: 72,
  },
  progressWrap: {
    flex: 1,
  },
  header: {
    gap: spacing[3],
  },
  title: {
    lineHeight: 34,
  },
  explanation: {
    lineHeight: 25,
  },
  body: {
    gap: spacing[3],
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 86,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
    paddingBottom: Platform.OS === 'ios' ? 28 : spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing[4],
  },
  skipButton: {
    minHeight: 48,
    justifyContent: 'center',
  },
  continueButton: {
    minHeight: 50,
    minWidth: 150,
    borderRadius: 8,
    paddingHorizontal: spacing[6],
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerLabel: {
    fontFamily: fontFamilies.button,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: 0,
  },
});
