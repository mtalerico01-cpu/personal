import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import { CoachBackground } from '@/features/coach/components/CoachBackground';
import { CoachPortrait } from '@/features/coach/components/CoachPortrait';
import { AIResponseCard } from '@/features/coach/components/AIResponseCard';
import { PromptCard } from '@/features/coach/components/PromptCard';
import { MicButton } from '@/features/coach/components/MicButton';
import { ChatBubble, ThinkingBubble } from '@/features/coach/components/ChatBubble';
import { ActionCard } from '@/features/coach/components/ActionCard';
import { ChatInput } from '@/features/coach/components/ChatInput';
import { colors } from '@/shared/theme/colors';
import { useCoach } from '@/features/coach/hooks/useCoach';
import { PRIMARY_PROMPTS, MOCK_BRIEFING } from '@/features/coach/mock';

export default function CoachScreen() {
  const {
    persona,
    setPersona,
    messages,
    inputText,
    setInputText,
    isThinking,
    sendMessage,
    handleActionTap,
  } = useCoach();

  const scrollRef = useRef<ScrollView>(null);
  const inChat = messages.length > 0;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <CoachBackground />

      <SafeAreaView style={styles.safeArea}>

        {/* ── Portrait pair ── */}
        <View style={styles.portraitRow}>
          <CoachPortrait
            persona="cedric"
            active={persona === 'cedric'}
            onPress={() => setPersona('cedric')}
          />
          <View style={styles.portraitDivider} />
          <CoachPortrait
            persona="elara"
            active={persona === 'elara'}
            onPress={() => setPersona('elara')}
          />
        </View>

        {/* ── Main content ── */}
        {!inChat ? (
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.defaultContent}
            showsVerticalScrollIndicator={false}
          >
            <AIResponseCard
              coachName={persona === 'cedric' ? 'Cedric' : 'Elara'}
              userName="Alex"
              briefing={MOCK_BRIEFING}
              isThinking={isThinking}
            />

            <View style={styles.promptsSection}>
              <Text style={styles.promptsLabel}>Ask me anything</Text>
              <View style={styles.promptsList}>
                {PRIMARY_PROMPTS.map(p => (
                  <PromptCard
                    key={p.id}
                    text={p.text}
                    onPress={() => sendMessage(p.text)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.micSection}>
              <MicButton
                persona={persona}
                onPress={() => sendMessage(PRIMARY_PROMPTS[0].text)}
              />
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            ref={scrollRef}
            style={styles.scrollArea}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({ animated: true })
            }
            keyboardShouldPersistTaps="handled"
          >
            {messages.map(msg => (
              <React.Fragment key={msg.id}>
                <ChatBubble message={msg} />
                {msg.role === 'coach' && msg.actionCard && (
                  <ActionCard
                    messageId={msg.id}
                    card={msg.actionCard}
                    onAction={handleActionTap}
                  />
                )}
              </React.Fragment>
            ))}
            {isThinking && <ThinkingBubble />}
          </ScrollView>
        )}

        {inChat && (
          <ChatInput
            value={inputText}
            onChange={setInputText}
            onSend={sendMessage}
            persona={persona}
            isThinking={isThinking}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  portraitRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 28,
    paddingBottom: 24,
  },
  portraitDivider: {
    width: 60,
  },
  scrollArea: {
    flex: 1,
  },
  defaultContent: {
    paddingBottom: 40,
    gap: 32,
  },
  promptsSection: {
    paddingHorizontal: 20,
    gap: 14,
  },
  promptsLabel: {
    fontSize: 11,
    fontWeight: '400',
    color: colors.textTertiary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  promptsList: {
    gap: 10,
  },
  micSection: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
  },
  chatContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
});
