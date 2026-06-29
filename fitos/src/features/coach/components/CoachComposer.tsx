import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { PersonaId } from '../store/coachStore';
import { PERSONAS } from '../../ai/personas/personas';

interface CoachComposerProps {
  value: string;
  onChange: (text: string) => void;
  onSend: (text: string) => void;
  personaId: PersonaId;
  disabled?: boolean;
}

export function CoachComposer({ value, onChange, onSend, personaId, disabled = false }: CoachComposerProps) {
  const theme = useActiveTheme();
  const canSend = value.trim().length > 0 && !disabled;
  const coachName = PERSONAS[personaId].name;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.outer}>
        <View
          style={[
            styles.composer,
            { backgroundColor: theme.colors.surface.raised, borderColor: canSend ? theme.colors.border.persona : theme.colors.border.default },
          ]}
        >
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={`Ask ${coachName} about your fitness...`}
            placeholderTextColor={theme.colors.text.muted}
            multiline
            maxLength={900}
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={() => canSend && onSend(value)}
            style={[styles.input, { color: theme.colors.text.primary }]}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Send message to ${coachName}`}
            disabled={!canSend}
            onPress={() => canSend && onSend(value)}
            activeOpacity={0.8}
            style={[
              styles.send,
              { backgroundColor: canSend ? theme.colors.persona.core : theme.colors.surface.subtle },
            ]}
          >
            <Text variant="headingSmall" color={canSend ? theme.colors.text.inverse : theme.colors.text.disabled}>
              ↑
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 26 : 12,
  },
  composer: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    minHeight: 54,
    borderRadius: 27,
    borderWidth: 1,
    paddingLeft: 18,
    paddingRight: 7,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 9,
  },
  input: {
    flex: 1,
    minHeight: 34,
    maxHeight: 120,
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 7,
    outlineStyle: 'none' as never,
  },
  send: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});