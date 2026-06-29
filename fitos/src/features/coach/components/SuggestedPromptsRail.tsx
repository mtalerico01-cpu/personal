import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { SuggestedPrompt } from '../../ai/types';

interface SuggestedPromptsRailProps {
  prompts: SuggestedPrompt[];
  onPress: (prompt: string) => void;
  compact?: boolean;
}

export function SuggestedPromptsRail({ prompts, onPress, compact = false }: SuggestedPromptsRailProps) {
  const theme = useActiveTheme();
  const { width } = useWindowDimensions();
  const wrapPrompts = width < 430;
  if (prompts.length === 0) return null;

  if (wrapPrompts) {
    return (
      <View style={[styles.wrappedContainer, compact && styles.compactWrappedContainer]}>
        {prompts.slice(0, 4).map((prompt) => (
          <PromptChip key={prompt.id} prompt={prompt} onPress={onPress} compact={compact} wrapped />
        ))}
      </View>
    );
  }

  return (
    <View style={compact ? styles.compactContainer : styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.row, !compact && styles.centeredRow]}
      >
        {prompts.slice(0, 4).map((prompt) => (
          <PromptChip key={prompt.id} prompt={prompt} onPress={onPress} compact={compact} />
        ))}
      </ScrollView>
    </View>
  );
}

function PromptChip({
  prompt,
  onPress,
  compact = false,
  wrapped = false,
}: {
  prompt: SuggestedPrompt;
  onPress: (prompt: string) => void;
  compact?: boolean;
  wrapped?: boolean;
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
        wrapped && styles.wrappedChip,
        { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.translucent },
      ]}
    >
      <Text variant="labelMedium" color={theme.colors.text.primary} style={styles.label}>
        {prompt.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 12 },
  wrappedContainer: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  compactWrappedContainer: {
    maxWidth: 330,
    paddingHorizontal: 0,
    paddingBottom: 10,
  },
  compactContainer: { paddingLeft: 18, paddingBottom: 8 },
  row: { gap: 8, paddingRight: 18, paddingVertical: 2 },
  centeredRow: { flexGrow: 1, justifyContent: 'center', paddingLeft: 18 },
  chip: {
    minHeight: 44,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactChip: { minHeight: 38, paddingHorizontal: 13 },
  wrappedChip: { maxWidth: 156 },
  label: { letterSpacing: 0.1, textAlign: 'center' },
});