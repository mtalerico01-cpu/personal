import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { CoachBackground } from '@/features/coach/components/CoachBackground';
import { CoachTopBar } from '@/features/coach/components/CoachTopBar';
import { EmptyConversationState } from '@/features/coach/components/EmptyConversationState';
import { ConversationList } from '@/features/coach/components/ConversationList';
import { CoachComposer } from '@/features/coach/components/CoachComposer';
import { useCoach } from '@/features/coach/hooks/useCoach';
import { coachingStyles, type AppearancePreference, type CoachingStyle } from '@/features/coach/styles/coachingStyles';

const coachingStyleOrder: CoachingStyle[] = ['direct', 'balanced', 'encouraging'];
const appearanceOrder: AppearancePreference[] = ['dark', 'light', 'system'];

export default function CoachScreen() {
  const {
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
    coachingStyle,
    setCoachingStyle,
    appearance,
    setAppearance,
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

  const handleCycleCoachingStyle = () => {
    const currentIndex = coachingStyleOrder.indexOf(coachingStyle);
    setCoachingStyle(coachingStyleOrder[(currentIndex + 1) % coachingStyleOrder.length]);
  };

  const handleCycleAppearance = () => {
    const currentIndex = appearanceOrder.indexOf(appearance);
    setAppearance(appearanceOrder[(currentIndex + 1) % appearanceOrder.length]);
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
        <CoachTopBar
          name={currentPersona.name}
          role={currentPersona.role}
          onNewConversation={clearChat}
          coachingStyleLabel={coachingStyles[coachingStyle].name}
          appearanceLabel={appearance === 'system' ? 'System' : appearance === 'dark' ? 'Dark' : 'Light'}
          onCycleCoachingStyle={handleCycleCoachingStyle}
          onCycleAppearance={handleCycleAppearance}
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
          disabled={isThinking}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },
  conversationShell: { flex: 1, minHeight: 0 },
});
