import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import type { ChatMessage } from '../store/coachStore';
import type { AIActionProposal } from '../../ai/types';

interface ChatBubbleProps {
  message: ChatMessage;
  onConfirm?: (actionId: string, messageId: string) => void;
  onCancel?: (actionId: string, messageId: string) => void;
}

export function ChatBubble({ message, onConfirm, onCancel }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  if (message.isThinking) {
    return <ThinkingBubble />;
  }

  // Resolve display text
  const bodyText = message.text ?? message.aiMessage?.summary ?? '';
  const details = message.aiMessage?.details ?? [];
  const recommendation = message.aiMessage?.recommendation;
  const actions = message.aiMessage?.proposedActions ?? [];

  return (
    <>
      <View style={[styles.row, isUser ? styles.rowUser : styles.rowCoach]}>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleCoach]}>
          {bodyText ? (
            <Text style={[styles.text, isUser ? styles.textUser : styles.textCoach]}>
              {bodyText}
            </Text>
          ) : null}
          {details.length > 0 && (
            <View style={styles.details}>
              {details.map((d, i) => (
                <View key={i} style={styles.detailRow}>
                  <View style={styles.dot} />
                  <Text style={[styles.text, styles.textCoach, { flex: 1, fontSize: 13 }]}>
                    {d}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {recommendation ? (
            <Text style={[styles.text, styles.recommendation]}>
              💡 {recommendation}
            </Text>
          ) : null}
        </View>
      </View>

      {actions.map((action) => (
        <InlineActionCard
          key={action.id}
          action={action}
          messageId={message.id}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ))}
    </>
  );
}

// ── Inline action card ────────────────────────────────────────────────────────

interface InlineActionCardProps {
  action: AIActionProposal;
  messageId: string;
  onConfirm?: (actionId: string, messageId: string) => void;
  onCancel?: (actionId: string, messageId: string) => void;
}

function InlineActionCard({ action, messageId, onConfirm, onCancel }: InlineActionCardProps) {
  const isDone = action.status === 'completed';
  const isCancelled = action.status === 'cancelled';

  return (
    <View style={[styles.actionCard, isDone && styles.actionDone, isCancelled && { opacity: 0.4 }]}>
      <Text style={styles.actionTitle}>{action.title}</Text>
      <Text style={styles.actionDesc}>{action.description}</Text>

      {action.status === 'proposed' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.btnConfirm}
            onPress={() => onConfirm?.(action.id, messageId)}
            activeOpacity={0.75}
          >
            <Text style={styles.btnConfirmText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={() => onCancel?.(action.id, messageId)}
            activeOpacity={0.75}
          >
            <Text style={styles.btnCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      {isDone && <Text style={styles.doneLabel}>✓ Applied</Text>}
      {isCancelled && <Text style={styles.cancelledLabel}>Cancelled</Text>}
    </View>
  );
}

// ── Thinking indicator ────────────────────────────────────────────────────────

export function ThinkingBubble() {
  return (
    <View style={[styles.row, styles.rowCoach]}>
      <View style={[styles.bubble, styles.bubbleCoach]}>
        <Text style={[styles.text, styles.textCoach, { opacity: 0.5 }]}>
          Thinking…
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  rowUser: {
    alignItems: 'flex-end',
  },
  rowCoach: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
  },
  bubbleUser: {
    backgroundColor: colors.accentDim,
    borderBottomRightRadius: 4,
  },
  bubbleCoach: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  textUser: {
    color: colors.textPrimary,
    fontWeight: '400',
  },
  textCoach: {
    color: colors.textSecondary,
    fontWeight: '400',
  },
  details: {
    gap: 4,
    marginTop: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
    marginTop: 9,
  },
  recommendation: {
    color: colors.accent,
    fontSize: 13,
    marginTop: 4,
  },
  // Action card
  actionCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.accentDim,
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  actionDone: {
    borderColor: colors.success,
  },
  actionTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  actionDesc: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  btnConfirm: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  btnConfirmText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 14,
  },
  btnCancel: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnCancelText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  doneLabel: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
  cancelledLabel: {
    color: colors.textTertiary,
    fontSize: 12,
  },
});
