import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { spacing } from '@/shared/theme/spacing';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { OnboardingSection } from '../types';

const sectionLabels: Record<OnboardingSection, string> = {
  welcome: 'Welcome',
  goals: 'Goals',
  body: 'Body',
  lifestyle: 'Lifestyle',
  training: 'Training',
  nutrition: 'Nutrition',
  preferences: 'Preferences',
  integrations: 'Connections',
  plan: 'Plan',
};

interface OnboardingProgressProps {
  section: OnboardingSection;
  current: number;
  total: number;
  sections: readonly OnboardingSection[];
}

export function OnboardingProgress({ section, current, total, sections }: OnboardingProgressProps) {
  const theme = useActiveTheme();

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        <Text variant="labelMedium" color={theme.colors.persona.core} style={styles.sectionLabel}>
          {sectionLabels[section]}
        </Text>
        <Text variant="caption" color={theme.colors.text.muted}>
          {current} / {total}
        </Text>
      </View>
      <View style={styles.sectionRail}>
        {sections.map((item) => (
          <View
            key={item}
            style={[
              styles.sectionDot,
              {
                backgroundColor: item === section ? theme.colors.persona.core : theme.colors.border.default,
                opacity: item === section ? 1 : 0.45,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[2],
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  sectionRail: {
    flexDirection: 'row',
    gap: 6,
  },
  sectionDot: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
});
