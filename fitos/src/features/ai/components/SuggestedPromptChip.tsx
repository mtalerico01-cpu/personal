import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '../../../shared/theme/colors';
import { spacing, radius } from '../../../shared/theme/spacing';
import type { SuggestedPrompt } from '../types';

interface Props {
  prompt: SuggestedPrompt;
  onPress: (prompt: string) => void;
}

export function SuggestedPromptChip({ prompt, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.chip}
      onPress={() => onPress(prompt.prompt)}
      activeOpacity={0.7}
    >
      <Text variant="labelMedium" color={colors.textSecondary} numberOfLines={1}>
        {prompt.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: colors.semantic.border.subtle,
    borderRadius: radius.full,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.semantic.surface.subtle,
  },
});
