import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { AIMessage, SuggestedPrompt } from '../../ai/types';
import { SuggestedPromptsRail } from './SuggestedPromptsRail';

interface EmptyConversationStateProps {
  brief: AIMessage | null;
  prompts: SuggestedPrompt[];
  onPromptPress: (prompt: string) => void;
}

export function EmptyConversationState({ brief, prompts, onPromptPress }: EmptyConversationStateProps) {
  const theme = useActiveTheme();
  const starterPrompts = prompts.slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text variant="headingLarge" color={theme.colors.text.primary} style={styles.greeting}>
          How can I help?
        </Text>
        <Text variant="bodyMedium" color={theme.colors.text.muted} style={styles.opening}>
          Ask about training, nutrition, recovery, or your plan.
        </Text>
      </View>
      <SuggestedPromptsRail prompts={starterPrompts} onPress={onPromptPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    gap: 18,
  },
  copy: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    gap: 8,
  },
  greeting: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    letterSpacing: 0,
  },
  opening: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
});