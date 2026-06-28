import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { ChatMessage } from '../mock';

interface ChatBubbleProps {
  message: ChatMessage;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowCoach]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleCoach]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textCoach]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

export function ThinkingBubble() {
  return (
    <View style={[styles.row, styles.rowCoach]}>
      <View style={[styles.bubble, styles.bubbleCoach]}>
        <Text style={[styles.text, styles.textCoach, { opacity: 0.5 }]}>
          Thinking\u2026
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  rowUser: {
    alignItems: 'flex-end',
  },
  rowCoach: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: colors.accentDim,
    borderBottomRightRadius: 4,
  },
  bubbleCoach: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  },
  textUser: {
    color: colors.textPrimary,
    fontWeight: '400',
  },
  textCoach: {
    color: colors.textSecondary,
    fontWeight: '400',
  },
});
