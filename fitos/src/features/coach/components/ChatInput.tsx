import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { PersonaId, PERSONAS } from '../mock';

interface ChatInputProps {
  value: string;
  onChange: (text: string) => void;
  onSend: (text: string) => void;
  persona: PersonaId;
  isThinking: boolean;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  persona,
  isThinking,
}: ChatInputProps) {
  const placeholder = `Ask ${PERSONAS[persona].name} anything\u2026`;
  const canSend = value.trim().length > 0 && !isThinking;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor={colors.textDisabled}
            multiline
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={() => canSend && onSend(value)}
          />
          <TouchableOpacity
            style={[styles.sendBtn, canSend && styles.sendBtnActive]}
            onPress={() => canSend && onSend(value)}
            activeOpacity={0.8}
            disabled={!canSend}
          >
            <Text style={[styles.sendIcon, canSend && styles.sendIconActive]}>
              ↑
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: 'rgba(8,8,8,0.96)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingVertical: 6,
    maxHeight: 100,
    lineHeight: 20,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: colors.accent,
  },
  sendIcon: {
    fontSize: 18,
    color: colors.textDisabled,
    fontWeight: '700',
    lineHeight: 22,
  },
  sendIconActive: {
    color: '#080808',
  },
});
