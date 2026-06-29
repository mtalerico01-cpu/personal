import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { AIMessage, SuggestedPrompt } from '../../ai/types';
import type { PersonaId } from '../store/coachStore';
import { CoachIdentityMark } from './CoachIdentityMark';
import { SuggestedPromptsRail } from './SuggestedPromptsRail';

interface EmptyConversationStateProps {
  personaId: PersonaId;
  coachName: string;
  brief: AIMessage | null;
  prompts: SuggestedPrompt[];
  onPromptPress: (prompt: string) => void;
}

export function EmptyConversationState({ personaId, coachName, brief, prompts, onPromptPress }: EmptyConversationStateProps) {
  const theme = useActiveTheme();
  const opening = brief?.details?.[1] ?? brief?.summary ?? `${coachName} has your training, nutrition, cardio, and progress context ready.`;

  return (
    <View style={styles.container}>
      <CoachIdentityMark persona={personaId} size={72} />
      <View style={styles.copy}>
        <Text variant="headingLarge" color={theme.colors.text.primary} style={styles.greeting}>
          {brief?.title ?? `Good ${coachName === 'Cedric' ? 'morning' : 'morning'}, Alex.`}
        </Text>
        <Text variant="bodyLarge" color={theme.colors.text.secondary} style={styles.opening}>
          {opening}
        </Text>
      </View>
      <SuggestedPromptsRail prompts={prompts} onPress={onPromptPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
    gap: 24,
  },
  copy: {
    width: '100%',
    maxWidth: 680,
    alignItems: 'center',
    gap: 10,
  },
  greeting: {
    textAlign: 'center',
    fontWeight: '300',
    lineHeight: 38,
  },
  opening: {
    textAlign: 'center',
    lineHeight: 25,
  },
});