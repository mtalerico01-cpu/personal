import React from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { SuggestedPrompt } from '../mock';

interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onSelect: (text: string) => void;
}

export function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  // Split into two rows of 5
  const row1 = prompts.slice(0, 5);
  const row2 = prompts.slice(5);

  return (
    <View style={styles.container}>
      <PromptRow prompts={row1} onSelect={onSelect} />
      <PromptRow prompts={row2} onSelect={onSelect} />
    </View>
  );
}

function PromptRow({
  prompts,
  onSelect,
}: {
  prompts: SuggestedPrompt[];
  onSelect: (text: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {prompts.map(p => (
        <TouchableOpacity
          key={p.id}
          style={styles.chip}
          onPress={() => onSelect(p.text)}
          activeOpacity={0.7}
        >
          <Text style={styles.chipText}>{p.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.coachChipBorder,
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  chipText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
});
