import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { SuggestedPrompt } from '../../ai/types';

interface SuggestedPromptsRailProps {
  prompts: SuggestedPrompt[];
  onPress: (prompt: string) => void;
  compact?: boolean;
}

export function SuggestedPromptsRail({ prompts, onPress, compact = false }: SuggestedPromptsRailProps) {
  if (prompts.length === 0) return null;

  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      {prompts.slice(0, 4).map((prompt) => (
        <PromptChip key={prompt.id} prompt={prompt} onPress={onPress} compact={compact} />
      ))}
    </View>
  );
}

function PromptChip({
  prompt,
  onPress,
  compact = false,
}: {
  prompt: SuggestedPrompt;
  onPress: (prompt: string) => void;
  compact?: boolean;
}) {
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={prompt.label}
      onPress={() => onPress(prompt.prompt)}
      activeOpacity={0.75}
      style={[
        styles.chip,
        compact && styles.compactChip,
        { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.subtle },
      ]}
    >
      <Text variant="labelMedium" color={theme.colors.text.primary} numberOfLines={2} style={styles.label}>
        {prompt.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  compactContainer: { maxWidth: 340, paddingBottom: 8 },
  chip: {
    width: '48%',
    minHeight: 46,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactChip: { minHeight: 40, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 7 },
  label: { letterSpacing: 0.2, lineHeight: 16, textAlign: 'center' },
});