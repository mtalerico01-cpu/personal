import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { ChatMessage } from '../store/coachStore';
import { PERSONAS } from '../../ai/personas/personas';
import { CoachIdentityMark } from './CoachIdentityMark';
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
  const persona = PERSONAS[aiMessage.personaId];
  const activePersona = theme.mode === 'dark' ? 'cedric' : 'elara';
  const actions = aiMessage.proposedActions ?? [];

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <CoachIdentityMark persona={aiMessage.personaId} size={28} active={aiMessage.personaId === activePersona} />
        <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.name}>
          {persona.name}
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
        <CoachIdentityMark persona={theme.mode === 'dark' ? 'cedric' : 'elara'} size={28} />
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
  name: { letterSpacing: 0.4 },
  content: { gap: 8, paddingLeft: 37 },
  title: { lineHeight: 25 },
  summary: { lineHeight: 25 },
  details: { gap: 6, marginTop: 2 },
  detailRow: { flexDirection: 'row', gap: 9, alignItems: 'flex-start' },
  dot: { width: 5, height: 5, borderRadius: 3, marginTop: 8 },
  detailText: { flex: 1, lineHeight: 21 },
  recommendation: { marginTop: 3, borderWidth: 1, borderRadius: 14, padding: 12 },
  thinkingRow: { flexDirection: 'row', gap: 6, paddingLeft: 37, paddingTop: 4 },
  thinkingDot: { width: 7, height: 7, borderRadius: 4 },
});