import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { CoachBackground } from '@/features/coach/components/CoachBackground';
import { CoachTopBar } from '@/features/coach/components/CoachTopBar';
import { CoachNavigationRail } from '@/features/coach/components/CoachNavigationRail';
import { EmptyConversationState } from '@/features/coach/components/EmptyConversationState';
import { ConversationList } from '@/features/coach/components/ConversationList';
import { CoachComposer } from '@/features/coach/components/CoachComposer';
import { useCoach } from '@/features/coach/hooks/useCoach';
import { useUserStore } from '@/store/userStore';

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
  const profile = useUserStore((state) => state.profile);
  const [isNavigationRailOpen, setIsNavigationRailOpen] = React.useState(false);
  const params = useLocalSearchParams<{ returnTo?: string; returnLabel?: string }>();
  const hasMessages = messages.length > 0;
  const returnTo = typeof params.returnTo === 'string' ? params.returnTo : undefined;
  const returnLabel = typeof params.returnLabel === 'string' ? params.returnLabel : undefined;
  const displayName = profile?.identity.firstName ?? profile?.name ?? 'Member';
  const username = profile?.identity.username ? `@${profile.identity.username}` : displayName;

  const handleSend = (text: string) => {
    if (!text.trim() || isThinking) return;
    sendMessage(text);
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
          onMenuPress={() => setIsNavigationRailOpen(true)}
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
        {/* Spacer so the floating tab bar never covers the composer */}
        <View style={styles.tabBarSpacer} />
      </SafeAreaView>

      <CoachNavigationRail
        visible={isNavigationRailOpen}
        displayName={displayName}
        username={username}
        avatarUrl={profile?.avatarUrl}
        coachingStyle={coachingStyle}
        appearance={appearance}
        onCoachingStyleChange={setCoachingStyle}
        onAppearanceChange={setAppearance}
        onClose={() => setIsNavigationRailOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1 },
  conversationShell: { flex: 1, minHeight: 0 },
  // Height matches GlassTabBar shell: bar height 78 + bottom padding 8
  tabBarSpacer: { height: 86 },
});
