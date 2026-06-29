import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { AIActionProposal } from '../../ai/types';

interface ActionPreviewProps {
  action: AIActionProposal;
  messageId: string;
  onConfirm?: (actionId: string, messageId: string) => void;
  onCancel?: (actionId: string, messageId: string) => void;
}

export function ActionPreview({ action, messageId, onConfirm, onCancel }: ActionPreviewProps) {
  const theme = useActiveTheme();
  const isDone = action.status === 'completed';
  const isCancelled = action.status === 'cancelled';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface.translucent,
          borderColor: isDone ? theme.colors.status.success : theme.colors.border.persona,
          opacity: isCancelled ? 0.58 : 1,
        },
      ]}
    >
      <Text variant="labelLarge" color={theme.colors.persona.core} style={styles.eyebrow}>
        Proposed update
      </Text>
      <Text variant="headingSmall" color={theme.colors.text.primary}>
        {action.title}
      </Text>
      <Text variant="bodyMedium" color={theme.colors.text.secondary} style={styles.description}>
        {action.description}
      </Text>

      {action.status === 'proposed' && (
        <View style={styles.actions}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Apply ${action.title}`}
            onPress={() => onConfirm?.(action.id, messageId)}
            activeOpacity={0.75}
            style={[styles.primary, { backgroundColor: theme.colors.persona.core }]}
          >
            <Text variant="labelLarge" color={theme.colors.text.inverse}>Apply changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Cancel ${action.title}`}
            onPress={() => onCancel?.(action.id, messageId)}
            activeOpacity={0.75}
            style={[styles.secondary, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.default }]}
          >
            <Text variant="labelLarge" color={theme.colors.text.secondary}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {isDone && <Text variant="labelMedium" color={theme.colors.status.success}>Applied</Text>}
      {isCancelled && <Text variant="labelMedium" color={theme.colors.text.muted}>Cancelled</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 7,
  },
  eyebrow: { textTransform: 'uppercase', letterSpacing: 0.8 },
  description: { lineHeight: 20 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 6 },
  primary: { flex: 1, minHeight: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  secondary: { flex: 1, minHeight: 44, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});