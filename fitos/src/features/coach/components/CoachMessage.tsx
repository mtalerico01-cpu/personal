import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { brand } from '@/branding/brand';
import type { ChatMessage } from '../store/coachStore';
import { ActionPreview } from './ActionPreview';

interface CoachMessageProps {
  message: ChatMessage;
  onConfirm?: (actionId: string, messageId: string) => void;
  onCancel?: (actionId: string, messageId: string) => void;
}

export function CoachMessage({ message, onConfirm, onCancel }: CoachMessageProps) {
  const theme = useActiveTheme();

  if (message.isThinking) {
    return <CoachThinkingState />;
  }

  const aiMessage = message.aiMessage;
  if (!aiMessage) return null;
  const actions = aiMessage.proposedActions ?? [];

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <View style={[styles.messageRule, { backgroundColor: theme.colors.persona.core }]} />
        <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.name}>
          {brand.shortCoachName}
        </Text>
      </View>
      <View style={styles.content}>
        {aiMessage.title ? (
          <Text variant="headingSmall" color={theme.colors.text.primary} style={styles.title}>
            {aiMessage.title}
          </Text>
        ) : null}
        <Text variant="bodyLarge" color={theme.colors.text.primary} style={styles.summary}>
          {aiMessage.summary}
        </Text>
        {aiMessage.details && aiMessage.details.length > 0 && (
          <View style={styles.details}>
            {aiMessage.details.map((detail, index) => (
              <View key={`${message.id}-detail-${index}`} style={styles.detailRow}>
                <View style={[styles.dot, { backgroundColor: theme.colors.persona.core }]} />
                <Text variant="bodyMedium" color={theme.colors.text.secondary} style={styles.detailText}>
                  {detail}
                </Text>
              </View>
            ))}
          </View>
        )}
        {aiMessage.recommendation ? (
          <View style={[styles.recommendation, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.translucent }]}> 
            <Text variant="bodyMedium" color={theme.colors.text.primary} style={styles.detailText}>
              {aiMessage.recommendation}
            </Text>
          </View>
        ) : null}
      </View>
      {actions.map((action) => (
        <ActionPreview
          key={action.id}
          action={action}
          messageId={message.id}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ))}
    </View>
  );
}

export function CoachThinkingState() {
  const theme = useActiveTheme();
  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <View style={[styles.messageRule, { backgroundColor: theme.colors.persona.core }]} />
        <Text variant="labelMedium" color={theme.colors.text.muted}>Reviewing your data</Text>
      </View>
      <View style={styles.thinkingRow}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[styles.thinkingDot, { backgroundColor: theme.colors.persona.core, opacity: 0.35 + i * 0.2 }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 18,
    gap: 10,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  messageRule: { width: 18, height: 2, borderRadius: 1 },
  name: { letterSpacing: 1.2, textTransform: 'uppercase' },
  content: { gap: 8, paddingLeft: 27 },
  title: { lineHeight: 25 },
  summary: { lineHeight: 25 },
  details: { gap: 6, marginTop: 2 },
  detailRow: { flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  dot: { width: 5, height: 5, borderRadius: 3, marginTop: 8 },
  detailText: { flex: 1, lineHeight: 21 },
  recommendation: { marginTop: 3, borderWidth: 1, borderRadius: 10, padding: 12 },
  thinkingRow: { flexDirection: 'row', gap: 6, paddingLeft: 27, paddingTop: 4 },
  thinkingDot: { width: 7, height: 7, borderRadius: 4 },
});