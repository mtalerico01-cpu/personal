import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/shared/components/ui/Text';
import { spacing, radius } from '@/shared/theme/spacing';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { useCoachStore } from '../store/coachStore';
import { PERSONAS } from '../../ai/personas/personas';
import { buildAIContext } from '../../ai/context/buildAIContext';
import { buildCoachInsight, type CoachInsightScreen } from '../insights/buildCoachInsight';

interface CoachInsightHeaderProps {
  screen: CoachInsightScreen;
}

export function CoachInsightHeader({ screen }: CoachInsightHeaderProps) {
  const theme = useActiveTheme();
  const router = useRouter();
  const personaId = useCoachStore((state) => state.personaId);
  const sendMessage = useCoachStore((state) => state.sendMessage);
  const persona = PERSONAS[personaId];
  const insight = buildCoachInsight(screen, buildAIContext(personaId));
  const returnTarget = getReturnTarget(screen);

  const openCoach = (prompt: string) => {
    sendMessage(prompt);
    router.push({ pathname: '/coach', params: { returnTo: returnTarget.route, returnLabel: returnTarget.label } });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface.translucent,
          borderColor: theme.colors.border.persona,
          shadowOpacity: theme.mode === 'dark' ? 0.22 : 0.08,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.identityRow}>
          <View
            style={[
              styles.identityMark,
              {
                borderColor: theme.colors.border.persona,
                backgroundColor: theme.colors.persona.soft,
              },
            ]}
          >
            <View style={[styles.identityCore, { backgroundColor: theme.colors.persona.core }]} />
          </View>
          <View>
            <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.eyebrow}>
              {persona.name} is guiding this screen
            </Text>
            <Text variant="headingSmall" color={theme.colors.text.primary}>
              {insight.title}
            </Text>
          </View>
        </View>
        <StatusPill status={insight.status} />
      </View>

      <Text variant="bodyLarge" color={theme.colors.text.secondary} style={styles.summary}>
        {insight.summary}
      </Text>
      <Text variant="bodyMedium" color={theme.colors.text.muted} style={styles.recommendation}>
        {insight.recommendation}
      </Text>

      <View style={styles.actionsRow}>
        {insight.actions.map((action) => (
          <TouchableOpacity
            key={action.label}
            style={[
              styles.actionButton,
              {
                backgroundColor: theme.colors.surface.subtle,
                borderColor: theme.colors.border.default,
              },
            ]}
            onPress={() => openCoach(action.prompt)}
            activeOpacity={0.76}
          >
            <Text variant="labelMedium" color={theme.colors.persona.core} style={styles.actionText}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[
            styles.openCoachButton,
            {
              backgroundColor: theme.colors.persona.core,
              borderColor: theme.colors.border.persona,
            },
          ]}
          onPress={() => openCoach(insight.actions[0]?.prompt ?? 'Review this screen with me.')}
          activeOpacity={0.8}
        >
          <Text variant="labelMedium" color={theme.colors.text.inverse} style={styles.actionText}>
            Open Coach
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function getReturnTarget(screen: CoachInsightScreen): { route: string; label: string } {
  switch (screen) {
    case 'nutrition':
      return { route: '/nutrition', label: 'Nutrition' };
    case 'training':
    case 'cardio':
      return { route: '/training', label: 'Training' };
    case 'progress':
      return { route: '/progress', label: 'Progress' };
    case 'dashboard':
    default:
      return { route: '/', label: 'Dashboard' };
  }
}

function StatusPill({ status }: { status: 'positive' | 'attention' | 'neutral' }) {
  const theme = useActiveTheme();
  const label = status === 'positive' ? 'On track' : status === 'attention' ? 'Focus' : 'Review';
  const color = status === 'positive'
    ? theme.colors.status.success
    : status === 'attention'
      ? theme.colors.status.warning
      : theme.colors.status.info;

  return (
    <View style={[styles.statusPill, { borderColor: color, backgroundColor: theme.colors.surface.subtle }]}> 
      <Text variant="labelMedium" color={color} style={styles.statusText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderLeftWidth: 2,
    padding: spacing[4],
    gap: spacing[3],
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing[3],
  },
  identityRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  identityMark: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  identityCore: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  eyebrow: {
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  summary: {
    lineHeight: 23,
  },
  recommendation: {
    lineHeight: 21,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  actionButton: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: 8,
  },
  openCoachButton: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: 8,
  },
  actionText: {
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  statusPill: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing[2],
    paddingVertical: 5,
  },
  statusText: {
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
