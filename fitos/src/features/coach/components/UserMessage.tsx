import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { ChatMessage } from '../store/coachStore';

export function UserMessage({ message }: { message: ChatMessage }) {
  const theme = useActiveTheme();
  return (
    <View style={styles.row}>
      <View style={[styles.message, { backgroundColor: theme.colors.surface.raised, borderColor: theme.colors.border.default }]}> 
        <Text variant="bodyLarge" color={theme.colors.text.primary} style={styles.text}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
  },
  message: {
    maxWidth: '78%',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  text: { lineHeight: 24 },
});