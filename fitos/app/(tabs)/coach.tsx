import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/shared/components/ui/Text';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { CoachBackground } from '@/features/coach/components/CoachBackground';
import { CoachTopBar } from '@/features/coach/components/CoachTopBar';
import { CoachIdentityMark } from '@/features/coach/components/CoachIdentityMark';
import { EmptyConversationState } from '@/features/coach/components/EmptyConversationState';
import { ConversationList } from '@/features/coach/components/ConversationList';
import { CoachComposer } from '@/features/coach/components/CoachComposer';
import { useCoach } from '@/features/coach/hooks/useCoach';
import type { PersonaId } from '@/features/coach/store/coachStore';

export default function CoachScreen() {
  const {
    persona,
    setPersona,
    messages,
    inputText,
    setInputText,
    isThinking,
    sendMessage,
    confirmAction,
    cancelAction,
    suggestedPrompts,
    proactiveBrief,
    clearChat,
    currentPersona,
    hasSelectedPersona,
    completePersonaSelection,
  } = useCoach();

  const theme = useActiveTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ returnTo?: string; returnLabel?: string }>();
  const hasMessages = messages.length > 0;
  const returnTo = typeof params.returnTo === 'string' ? params.returnTo : undefined;
  const returnLabel = typeof params.returnLabel === 'string' ? params.returnLabel : undefined;

  const handleSend = (text: string) => {
    if (!text.trim() || isThinking) return;
    sendMessage(text);
  };

  const handleSwitchCoach = () => {
    setPersona(persona === 'cedric' ? 'elara' : 'cedric');
  };

  const handleReturn = () => {
    if (!returnTo) return;
    router.push(returnTo as Parameters<typeof router.push>[0]);
  };

  const handleConfirmAction = (actionId: string, messageId: string) => {
    const action = messages
      .find((message) => message.id === messageId)
      ?.aiMessage?.proposedActions?.find((candidate) => candidate.id === actionId);

    void Promise.resolve(confirmAction(actionId, messageId)).then(() => {
      if (action?.type !== 'navigate') return;
      const route = action.payload.route;
      if (typeof route === 'string') {
        router.push(route as Parameters<typeof router.push>[0]);
      }
    });
  };

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background.primary }]}> 
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      <CoachBackground />

      <SafeAreaView style={styles.safeArea}>
        {!hasSelectedPersona && <CoachSelectionOverlay onSelect={completePersonaSelection} />}

        <CoachTopBar
          personaId={persona}
          name={currentPersona.name}
          role={currentPersona.role}
          onNewConversation={clearChat}
          onSwitchCoach={handleSwitchCoach}
          returnLabel={returnLabel}
          onReturn={returnTo ? handleReturn : undefined}
        />

        <View style={styles.conversationShell}>
          {hasMessages ? (
            <ConversationList
              messages={messages}
              suggestedPrompts={isThinking ? [] : suggestedPrompts}
              onPromptPress={handleSend}
              onConfirm={handleConfirmAction}
              onCancel={cancelAction}
            />
          ) : (
            <EmptyConversationState
              personaId={persona}
              coachName={currentPersona.name}
              brief={proactiveBrief}
              prompts={suggestedPrompts}
              onPromptPress={handleSend}
            />
          )}
        </View>

        <CoachComposer
          value={inputText}
          onChange={setInputText}
          onSend={handleSend}
          personaId={persona}
          disabled={isThinking}
        />
      </SafeAreaView>
    </View>
  );
}

function CoachSelectionOverlay({ onSelect }: { onSelect: (id: PersonaId) => void }) {
  const theme = useActiveTheme();

  return (
    <View style={[styles.selectionOverlay, { backgroundColor: theme.colors.background.overlay }]}> 
      <View style={[styles.selectionPanel, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.raised }]}> 
        <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.selectionEyebrow}>
          Choose your coach
        </Text>
        <Text variant="headingLarge" color={theme.colors.text.primary} style={styles.selectionTitle}>
          How should FitOS coach you?
        </Text>
        <View style={styles.selectionCards}>
          <CoachChoice
            persona="cedric"
            name="Cedric"
            role="Performance intelligence"
            description="Direct, analytical, and precise. Dark appearance with restrained green light."
            onPress={() => onSelect('cedric')}
          />
          <CoachChoice
            persona="elara"
            name="Elara"
            role="Wellness intelligence"
            description="Supportive, thoughtful, and adaptive. Light appearance with luminous pale-blue atmosphere."
            onPress={() => onSelect('elara')}
          />
        </View>
      </View>
    </View>
  );
}

function CoachChoice({
  persona,
  name,
  role,
  description,
  onPress,
}: {
  persona: PersonaId;
  name: string;
  role: string;
  description: string;
  onPress: () => void;
}) {
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Choose ${name}`}
      style={[styles.selectionCard, { borderColor: theme.colors.border.subtle, backgroundColor: theme.colors.surface.subtle }]}
      onPress={onPress}
      activeOpacity={0.82}
    >
      <CoachIdentityMark persona={persona} size={58} />
      <Text variant="headingSmall" color={theme.colors.text.primary}>{name}</Text>
      <Text variant="labelMedium" color={theme.colors.text.secondary}>{role}</Text>
      <Text variant="caption" color={theme.colors.text.muted} style={styles.selectionDescription}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },
  conversationShell: { flex: 1, minHeight: 0 },
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  selectionPanel: {
    width: '100%',
    maxWidth: 540,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    gap: 14,
  },
  selectionEyebrow: { letterSpacing: 1, textTransform: 'uppercase' },
  selectionTitle: { lineHeight: 34 },
  selectionCards: { flexDirection: 'row', gap: 12 },
  selectionCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    gap: 7,
  },
  selectionDescription: { lineHeight: 17 },
});
