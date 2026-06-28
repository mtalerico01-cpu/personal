import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { CoachBackground } from '@/features/coach/components/CoachBackground';
import { MicButton } from '@/features/coach/components/MicButton';
import { ChatBubble } from '@/features/coach/components/ChatBubble';
import { ChatInput } from '@/features/coach/components/ChatInput';
import { colors } from '@/shared/theme/colors';
import { useCoach } from '@/features/coach/hooks/useCoach';
import { PRIMARY_PROMPTS } from '@/features/coach/mock';
import type { SuggestedPrompt } from '@/features/ai/types';
import {
  NutritionIcon,
  TrainingIcon,
  ProgressIcon,
} from '@/shared/components/ui/NavIcon';

type PromptCategory = 'nutrition' | 'training' | 'progress';
type PromptIntent = 'question' | 'prompt';

const PORTRAITS = {
  cedric: require('../../assets/Branding/Cedric 2.png'),
  elara: require('../../assets/Branding/Elara 2.png'),
} as const;

const LANDING_PROMPT_ROWS = [
  {
    category: 'nutrition',
    question: { id: 'nutrition-question', text: 'How is my nutrition today?', prompt: 'How is my nutrition today?' },
    prompt: { id: 'nutrition-prompt', text: 'Log a new meal.', prompt: 'Log a meal for me' },
  },
  {
    category: 'training',
    question: { id: 'training-question', text: 'Review today’s workout.', prompt: 'Review today’s workout.' },
    prompt: { id: 'training-prompt', text: 'Build a workout.', prompt: 'Build me a workout' },
  },
  {
    category: 'progress',
    question: { id: 'progress-question', text: 'Explain today’s weight.', prompt: PRIMARY_PROMPTS[1].text },
    prompt: { id: 'progress-prompt', text: 'Update weight goal.', prompt: 'Update my weight goal.' },
  },
] satisfies Array<{
  category: PromptCategory;
  question: { id: string; text: string; prompt: string };
  prompt: { id: string; text: string; prompt: string };
}>;

const PROMPT_ICONS = {
  nutrition: NutritionIcon,
  training: TrainingIcon,
  progress: ProgressIcon,
} satisfies Record<PromptCategory, React.ComponentType<{ color: string; size?: number }>>;

const PROMPT_CATEGORY_LABELS = {
  nutrition: 'Nutrition',
  training: 'Training',
  progress: 'Progress',
} satisfies Record<PromptCategory, string>;

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
    clearChat,
  } = useCoach();

  const scrollRef = useRef<ScrollView>(null);
  const inChat = messages.length > 0;
  const [promptIntent, setPromptIntent] = useState<PromptIntent>('question');

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (inChat) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages.length, inChat]);

  const handleSend = (text: string) => {
    if (!text.trim() || isThinking) return;
    console.log('[Coach] Prompt submitted:', text);
    sendMessage(text);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <CoachBackground />

      <SafeAreaView style={styles.safeArea}>
        <CoachTopBar
          inChat={inChat}
          onNewChat={clearChat}
          onElara={() => setPersona('elara')}
        />

        {/* ── Default view: no scroll, flex layout ── */}
        {!inChat && (
          <View style={styles.defaultArea}>
            <LandingBriefingCard
              persona={persona}
              isThinking={isThinking}
            />

            <View style={styles.promptsSection}>
              <PromptModeSwitch value={promptIntent} onChange={setPromptIntent} />
              <View style={styles.promptsList}>
                {LANDING_PROMPT_ROWS.map(row => (
                  <LandingPrompt
                    key={`${row.category}-${promptIntent}`}
                    text={row[promptIntent].text}
                    category={row.category}
                    intent={promptIntent}
                    onPress={() => handleSend(row[promptIntent].prompt)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.micSection}>
              <MicButton
                persona={persona}
                onPress={() => handleSend(PRIMARY_PROMPTS[0].text)}
              />
            </View>
          </View>
        )}

        {/* ── Chat view: scrollable messages ── */}
        {inChat && (
          <ScrollView
            ref={scrollRef}
            style={styles.scrollArea}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg, idx) => {
              const isLastCoach =
                msg.role === 'coach' &&
                !msg.isThinking &&
                idx === messages.length - 1;
              return (
                <React.Fragment key={msg.id}>
                  <ChatBubble
                    message={msg}
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                  />
                  {isLastCoach && !isThinking && suggestedPrompts.length > 0 && (
                    <FollowUpChips
                      prompts={suggestedPrompts}
                      onPress={handleSend}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </ScrollView>
        )}

        {inChat && (
          <ChatInput
            value={inputText}
            onChange={setInputText}
            onSend={handleSend}
            persona={persona}
            isThinking={isThinking}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

function CoachTopBar({
  inChat,
  onNewChat,
  onElara,
}: {
  inChat: boolean;
  onNewChat: () => void;
  onElara: () => void;
}) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity style={styles.menuButton} activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Open coach menu">
        <View style={styles.menuLine} />
        <View style={[styles.menuLine, styles.menuLineShort]} />
        <View style={styles.menuLine} />
      </TouchableOpacity>

      <View style={styles.coachIdentity}>
        <Text style={styles.coachName}>C E D R I C <Text style={styles.coachDot}>•</Text></Text>
        <Text style={styles.coachSubtitle}>AI Performance Coach</Text>
      </View>

      <TouchableOpacity
        style={inChat ? styles.resetChatButton : styles.elaraButton}
        onPress={inChat ? onNewChat : onElara}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel={inChat ? 'Reset chat' : 'Switch to Elara'}
      >
        {inChat ? <ResetChatIcon /> : <Text style={styles.elaraButtonText}>Elara</Text>}
      </TouchableOpacity>
    </View>
  );
}

function ResetChatIcon() {
  return (
    // @ts-ignore -- inline SVG icon, web-safe
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 10s2.004-2.732 3.633-4.362C7.263 4.008 9.513 3 12 3c4.971 0 9 4.029 9 9m-19 0c0 4.971 4.029 9 9 9 2.487 0 4.737-1.008 6.367-2.638C18.996 16.732 21 14 21 14m0 0v5m0-5h-5M2 10V5m0 5h5"
        stroke="rgba(243,243,243,0.72)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LandingBriefingCard({
  persona,
  isThinking,
}: {
  persona: 'cedric' | 'elara';
  isThinking: boolean;
}) {
  return (
    <View style={styles.briefingCard}>
      <View style={styles.cardTopRow}>
        <View style={styles.avatarGlow}>
          <Image source={PORTRAITS[persona]} style={styles.cardAvatar} resizeMode="cover" />
        </View>
        <View style={styles.cardSignalColumn}>
          <View style={styles.cardStatusRow}>
            <Text style={styles.cardStatusText}>Live brief</Text>
            <View style={styles.cardStatusDot} />
          </View>
          <RestingWaveform active={isThinking} />
        </View>
      </View>

      <Text style={styles.greeting}>Good morning, Alex.</Text>

      <View style={styles.briefingLines}>
        <Text style={styles.briefingText}>Workout complete. Recovery metrics look solid.</Text>
        <Text style={styles.briefingText}>Protein is strong at <Text style={styles.metricText}>142g</Text>; calories left: <Text style={styles.metricText}>1,160</Text>.</Text>
        <Text style={styles.briefingText}>Best next move: <Text style={styles.metricText}>carbs</Text> with dinner.</Text>
      </View>

      <View style={styles.cardDivider} />
      <Text style={styles.focusQuestion}>What would you like to focus on?</Text>
    </View>
  );
}

function PromptModeSwitch({
  value,
  onChange,
}: {
  value: PromptIntent;
  onChange: (value: PromptIntent) => void;
}) {
  return (
    <View style={styles.promptSwitch}>
      <TouchableOpacity
        style={[styles.promptSwitchOption, value === 'question' && styles.promptSwitchOptionActive]}
        onPress={() => onChange('question')}
        activeOpacity={0.75}
      >
        <Text style={[styles.promptSwitchText, value === 'question' && styles.promptSwitchTextActive]}>Questions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.promptSwitchOption, value === 'prompt' && styles.promptSwitchOptionActive]}
        onPress={() => onChange('prompt')}
        activeOpacity={0.75}
      >
        <Text style={[styles.promptSwitchText, value === 'prompt' && styles.promptSwitchTextActive]}>Prompts</Text>
      </TouchableOpacity>
    </View>
  );
}

function RestingWaveform({ active }: { active: boolean }) {
  const heights = active ? [8, 18, 10, 26, 12, 32, 10, 20, 8] : [3, 6, 4, 12, 5, 16, 4, 8, 3];

  return (
    <View style={styles.cardWaveform}>
      {heights.map((height, index) => (
        <View key={index} style={[styles.cardWaveBar, { height }]} />
      ))}
    </View>
  );
}

function LandingPrompt({
  text,
  category,
  intent,
  onPress,
}: {
  text: string;
  category: PromptCategory;
  intent: PromptIntent;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.promptPill} onPress={onPress} activeOpacity={0.72}>
      <PromptIcon category={category} />
      <View style={styles.promptTextStack}>
        <Text style={styles.promptIntent}>{PROMPT_CATEGORY_LABELS[category]}</Text>
        <Text style={styles.promptText}>{text}</Text>
      </View>
      <Text style={styles.promptChevron}>›</Text>
    </TouchableOpacity>
  );
}

function PromptIcon({ category }: { category: PromptCategory }) {
  const Icon = PROMPT_ICONS[category];

  return (
    <View style={styles.promptIconWrap}>
      <Icon color={colors.accent} size={22} />
    </View>
  );
}

// ── Follow-up chips component ─────────────────────────────────────────────────

function FollowUpChips({
  prompts,
  onPress,
}: {
  prompts: SuggestedPrompt[];
  onPress: (text: string) => void;
}) {
  return (
    <View style={chipStyles.container}>
      <Text style={chipStyles.label}>Suggested follow-ups</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={chipStyles.row}
      >
        {prompts.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={chipStyles.chip}
            onPress={() => onPress(p.prompt)}
            activeOpacity={0.7}
          >
            <Text style={chipStyles.chipText}>{p.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const chipStyles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingBottom: 16,
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.textTertiary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    paddingRight: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 20,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.coachChipBorder,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(168,255,62,0.05)',
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '400',
  },
});

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 14,
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(243,243,243,0.12)',
    backgroundColor: 'rgba(5,8,9,0.24)',
  },
  menuLine: {
    width: 28,
    height: 1.5,
    borderRadius: 1,
    backgroundColor: colors.textPrimary,
  },
  menuLineShort: {
    width: 20,
  },
  coachIdentity: {
    position: 'absolute',
    left: 90,
    right: 90,
    alignItems: 'center',
  },
  coachName: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 5,
    textTransform: 'uppercase',
  },
  coachDot: {
    color: colors.accent,
    fontSize: 22,
    letterSpacing: 0,
  },
  coachSubtitle: {
    marginTop: 6,
    color: 'rgba(243,243,243,0.44)',
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  elaraButton: {
    borderWidth: 1,
    borderColor: 'rgba(243,243,243,0.22)',
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 11,
    backgroundColor: 'rgba(5,8,9,0.30)',
  },
  elaraButtonText: {
    color: 'rgba(243,243,243,0.62)',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  resetChatButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(243,243,243,0.22)',
    backgroundColor: 'rgba(5,8,9,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  scrollArea: {
    flex: 1,
  },
  chatContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  promptsSection: {
    paddingHorizontal: 34,
    gap: 12,
  },
  promptSwitch: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(243,243,243,0.14)',
    backgroundColor: 'rgba(5, 8, 9, 0.58)',
  },
  promptSwitchOption: {
    flex: 1,
    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptSwitchOptionActive: {
    backgroundColor: 'rgba(168,255,62,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(168,255,62,0.18)',
  },
  promptSwitchText: {
    color: 'rgba(243,243,243,0.42)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  promptSwitchTextActive: {
    color: colors.accent,
  },
  promptsList: {
    gap: 8,
  },
  micSection: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 8,
  },
  briefingCard: {
    marginHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(243,243,243,0.18)',
    backgroundColor: 'rgba(5, 8, 9, 0.66)',
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 28,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 14,
  },
  cardSignalColumn: {
    flex: 1,
    gap: 12,
  },
  cardStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardStatusText: {
    color: 'rgba(243,243,243,0.46)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cardStatusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  avatarGlow: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: colors.accent,
    shadowOpacity: 0.8,
    shadowRadius: 24,
    backgroundColor: 'rgba(168,255,62,0.08)',
  },
  cardAvatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  cardWaveform: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: 0.72,
  },
  cardWaveBar: {
    width: 2,
    borderRadius: 1,
    backgroundColor: colors.accent,
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 30,
    marginBottom: 12,
  },
  briefingLines: {
    gap: 7,
  },
  briefingText: {
    color: 'rgba(243,243,243,0.68)',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 19,
  },
  metricText: {
    color: colors.accent,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(243,243,243,0.08)',
    marginTop: 14,
    marginBottom: 12,
  },
  focusQuestion: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '300',
  },
  promptPill: {
    minHeight: 62,
    borderRadius: 20,
    borderWidth: 1,
    borderLeftWidth: 2,
    borderColor: 'rgba(243,243,243,0.13)',
    borderLeftColor: 'rgba(168,255,62,0.42)',
    backgroundColor: 'rgba(5, 8, 9, 0.64)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    gap: 10,
  },
  promptIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(168,255,62,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(168,255,62,0.13)',
    shadowColor: colors.accent,
    shadowOpacity: 0.65,
    shadowRadius: 10,
  },
  promptText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '300',
    lineHeight: 16,
  },
  promptTextStack: {
    flex: 1,
    gap: 2,
  },
  promptIntent: {
    color: colors.accent,
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 1.2,
    lineHeight: 10,
    textTransform: 'uppercase',
  },
  promptChevron: {
    color: 'rgba(243,243,243,0.52)',
    fontSize: 22,
    fontWeight: '200',
    lineHeight: 24,
  },
});
