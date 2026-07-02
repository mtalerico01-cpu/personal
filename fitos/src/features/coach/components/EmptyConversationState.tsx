import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { brand } from '@/branding/brand';
import { brandAssets } from '@/branding/assets';
import { logoSizes } from '@/shared/theme/spacing';
import type { AIMessage, SuggestedPrompt } from '../../ai/types';
import { SuggestedPromptsRail } from './SuggestedPromptsRail';

interface EmptyConversationStateProps {
  brief: AIMessage | null;
  prompts: SuggestedPrompt[];
  onPromptPress: (prompt: string) => void;
}

export function EmptyConversationState({ brief, prompts, onPromptPress }: EmptyConversationStateProps) {
  const theme = useActiveTheme();
  const opening = brief?.details?.[1] ?? brief?.summary ?? `${brand.coachName} has your training, nutrition, cardio, and progress context ready.`;
  const logoSource = theme.mode === 'dark' ? brandAssets.markDark : brandAssets.markLight;

  return (
    <View style={styles.container}>
      <Image source={logoSource} resizeMode="contain" style={styles.logo} />
      <View style={styles.copy}>
        <Text variant="headingLarge" color={theme.colors.text.primary} style={styles.greeting}>
          {brief?.title ?? 'Good morning, Alex.'}
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
    gap: 16,
  },
  copy: {
    width: '100%',
    maxWidth: 680,
    alignItems: 'center',
    gap: 10,
  },
  logo: { width: 58, height: 58 },
  greeting: {
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 32,
  },
  opening: {
    textAlign: 'center',
    lineHeight: 22,
  },
});