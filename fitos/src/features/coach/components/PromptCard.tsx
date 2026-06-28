import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors } from '@/shared/theme/colors';

interface PromptCardProps {
  text: string;
  onPress: () => void;
}

export function PromptCard({ text, onPress }: PromptCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.65}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(17, 17, 17, 0.55)',
  },
  text: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.textSecondary,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
});
