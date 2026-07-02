import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';

const pages: Record<string, { eyebrow: string; title: string; body: string; next: string }> = {
  settings: {
    eyebrow: 'Settings',
    title: 'Account controls are coming next.',
    body: 'This page will collect appearance, coaching, notifications, units, and account-level preferences in one place.',
    next: 'Planned settings rows: account, appearance, notifications, units, Coach preferences, and data controls.',
  },
  'try-premium': {
    eyebrow: 'Premium',
    title: 'Premium tools will live here.',
    body: 'This page will introduce advanced planning, deeper analytics, premium routines, and expanded Coach capabilities.',
    next: 'Planned premium areas: advanced plan review, expanded recipes, deeper progress analysis, and wearable intelligence.',
  },
  goals: {
    eyebrow: 'Goals',
    title: 'Goal management is being separated from profile editing.',
    body: 'This page will focus on primary goal, secondary goals, target weight, training focus, cardio focus, and review cadence.',
    next: 'Planned goal controls: priority goal, target rate, timeline, milestones, and Coach review schedule.',
  },
  'workout-routines': {
    eyebrow: 'Workout Routines',
    title: 'Saved routines and plan templates will live here.',
    body: 'This page will organize generated routines, saved templates, active splits, exercise swaps, and schedule preferences.',
    next: 'Planned routine tools: active split, saved templates, equipment filters, substitutions, and progression notes.',
  },
  recipes: {
    eyebrow: 'Recipes',
    title: 'Recipes and saved meals are coming soon.',
    body: 'This page will collect saved meals, high-protein ideas, meal prep templates, and nutrition targets by recipe.',
    next: 'Planned recipe tools: saved meals, protein filters, prep time, restrictions, and macro fit.',
  },
  'apps-devices': {
    eyebrow: 'Apps & Devices',
    title: 'Wearable and app connections will live here.',
    body: 'This page will manage integrations for steps, workouts, body weight, sleep, recovery, and health data permissions.',
    next: 'Planned connections: Apple Health, Fitbit, Garmin, wearables, scale data, and import permissions.',
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'Privacy and data controls are coming next.',
    body: 'This page will explain what Form Theory stores, what Coach can remember, and how users can manage or delete data.',
    next: 'Planned privacy controls: memory settings, export, delete data, permissions, and health-data explanations.',
  },
  help: {
    eyebrow: 'Help',
    title: 'Support and guidance will live here.',
    body: 'This page will collect support, FAQs, onboarding help, troubleshooting, and direct guidance for common workflows.',
    next: 'Planned help areas: account support, nutrition logging, workout planning, Coach actions, and safety notes.',
  },
};

export default function MenuPlaceholderScreen() {
  const theme = useActiveTheme();
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug?: string }>();
  const page = pages[slug ?? ''] ?? {
    eyebrow: 'Menu',
    title: 'This section is coming soon.',
    body: 'This menu destination is reserved for a future Form Theory workflow.',
    next: 'The page will be added once the workflow and design-system rules are ready.',
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background.primary }]}> 
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Return to Coach"
          onPress={() => router.push('/coach' as Parameters<typeof router.push>[0])}
          activeOpacity={0.78}
          style={[styles.backButton, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.translucent }]}
        >
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.backText}>Back to Coach</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text variant="caption" color={theme.colors.persona.core} style={styles.eyebrow}>{page.eyebrow}</Text>
          <Text variant="displaySmall" color={theme.colors.text.primary} style={styles.title}>{page.title}</Text>
          <Text variant="bodyLarge" color={theme.colors.text.secondary} style={styles.body}>{page.body}</Text>
        </View>

        <View style={[styles.panel, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.default }]}> 
          <Text variant="labelLarge" color={theme.colors.text.primary} style={styles.panelTitle}>Planned scope</Text>
          <Text variant="bodyMedium" color={theme.colors.text.secondary} style={styles.panelBody}>{page.next}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 34,
    paddingBottom: 34,
    gap: 28,
  },
  backButton: {
    alignSelf: 'flex-start',
    minHeight: 42,
    borderRadius: 21,
    borderWidth: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  backText: {
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  header: {
    gap: 12,
  },
  eyebrow: {
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  title: {
    lineHeight: 36,
  },
  body: {
    lineHeight: 24,
  },
  panel: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 18,
    gap: 8,
  },
  panelTitle: {
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  panelBody: {
    lineHeight: 22,
  },
});