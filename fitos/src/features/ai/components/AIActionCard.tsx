import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '../../../shared/theme/colors';
import { spacing, radius } from '../../../shared/theme/spacing';
import { ConfirmationActions } from './ConfirmationActions';
import type { AIActionProposal } from '../types';

interface Props {
  action: AIActionProposal;
  messageId: string;
  onConfirm: (actionId: string, messageId: string) => void;
  onCancel: (actionId: string, messageId: string) => void;
}

export function AIActionCard({ action, messageId, onConfirm, onCancel }: Props) {
  const isCompleted = action.status === 'completed';
  const isCancelled = action.status === 'cancelled';

  return (
    <View style={[styles.container, isCompleted && styles.completed, isCancelled && styles.cancelled]}>
      <View style={styles.header}>
        <Text variant="labelMedium" color={colors.accent} style={styles.label}>
          {typeLabel(action.type)}
        </Text>
        {isCompleted ? (
          <Text variant="caption" color={colors.success}>✓ Done</Text>
        ) : isCancelled ? (
          <Text variant="caption" color={colors.textTertiary}>Cancelled</Text>
        ) : null}
      </View>

      <Text variant="bodyLarge" color={colors.textPrimary} style={styles.title}>
        {action.title}
      </Text>
      <Text variant="bodyMedium" color={colors.textSecondary}>
        {action.description}
      </Text>

      {action.status === 'proposed' ? (
        <ConfirmationActions
          onConfirm={() => onConfirm(action.id, messageId)}
          onCancel={() => onCancel(action.id, messageId)}
        />
      ) : null}
    </View>
  );
}

function typeLabel(type: AIActionProposal['type']): string {
  const map: Record<string, string> = {
    log_meal: 'LOG MEAL',
    update_macros: 'UPDATE MACROS',
    update_weight_goal: 'UPDATE GOAL',
    save_workout: 'SAVE WORKOUT',
    update_cardio_goal: 'CARDIO GOAL',
    create_plan: 'NEW PLAN',
    review_day: 'DAY REVIEW',
    navigate: 'NAVIGATE',
  };
  return map[type] ?? type.toUpperCase();
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.accentDim,
    borderRadius: radius.lg,
    padding: spacing[4],
    gap: spacing[2],
    marginTop: spacing[2],
  },
  completed: {
    borderColor: colors.success,
    opacity: 0.7,
  },
  cancelled: {
    opacity: 0.4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    letterSpacing: 1,
  },
  title: {
    fontWeight: '600',
  },
});
