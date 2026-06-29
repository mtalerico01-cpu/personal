import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { ChatMessage } from '../store/coachStore';
import type { SuggestedPrompt } from '../../ai/types';
import { CoachMessage } from './CoachMessage';
import { UserMessage } from './UserMessage';
import { SuggestedPromptsRail } from './SuggestedPromptsRail';

interface ConversationListProps {
  messages: ChatMessage[];
  suggestedPrompts: SuggestedPrompt[];
  onPromptPress: (prompt: string) => void;
  onConfirm?: (actionId: string, messageId: string) => void;
  onCancel?: (actionId: string, messageId: string) => void;
}

export function ConversationList({ messages, suggestedPrompts, onPromptPress, onConfirm, onCancel }: ConversationListProps) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const id = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    return () => clearTimeout(id);
  }, [messages.length]);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.scroll}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message) => (
        <View key={message.id} style={styles.turn}>
          {message.role === 'user' ? (
            <UserMessage message={message} />
          ) : (
            <CoachMessage message={message} onConfirm={onConfirm} onCancel={onCancel} />
          )}
        </View>
      ))}
      <SuggestedPromptsRail prompts={suggestedPrompts} onPress={onPromptPress} compact />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { paddingTop: 12, paddingBottom: 18, gap: 18 },
  turn: { width: '100%' },
});