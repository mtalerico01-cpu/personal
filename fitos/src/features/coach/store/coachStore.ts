import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AIMessage, AIActionProposal, SuggestedPrompt } from '../../ai/types';
import { buildAIContext } from '../../ai/context/buildAIContext';
import { generateSuggestedPrompts, generateFollowUpPromptsForTopic } from '../../ai/suggestions/generateSuggestedPrompts';
import { parseMockIntent } from '../../ai/intents/parseMockIntent';
import { generateProactiveBrief, answerCoachPrompt } from '../../ai/services/mockAIService';
import { executeAction } from '../../ai/tools/toolDispatcher';
import {
  defaultExperiencePreferences,
  isAppearancePreference,
  isCoachingStyle,
  mapLegacyPersonaToStyle,
  type AppearancePreference,
  type CoachingStyle,
} from '../styles/coachingStyles';

export interface ChatMessage {
  id: string;
  role: 'user' | 'coach';
  text?: string;
  aiMessage?: AIMessage;
  isThinking?: boolean;
  createdAt: string;
}

interface CoachState {
  coachingStyle: CoachingStyle;
  appearance: AppearancePreference;
  messages: ChatMessage[];
  inputText: string;
  isLoading: boolean;
  proactiveBrief: AIMessage | null;
  suggestedPrompts: SuggestedPrompt[];
  hasStartedChat: boolean;
  hasOnboardingHandoff: boolean;
  pendingActionId: string | null;

  // Actions
  setCoachingStyle: (style: CoachingStyle) => void;
  setAppearance: (appearance: AppearancePreference) => void;
  setInputText: (text: string) => void;
  initBrief: () => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  confirmAction: (actionId: string, messageId: string) => void;
  cancelAction: (actionId: string, messageId: string) => void;
  setPostOnboardingHandoff: (handoff: { summary: string; details: string[]; prompts: string[] }) => void;
  clearChat: () => void;
}

let _idCounter = 0;
const newId = () => `chat-${++_idCounter}-${Date.now()}`;

const memoryPreferenceStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (name: string) => Promise.resolve(store[name] ?? null),
    setItem: (name: string, value: string) => {
      store[name] = value;
      return Promise.resolve();
    },
    removeItem: (name: string) => {
      delete store[name];
      return Promise.resolve();
    },
  };
})();

const coachPreferenceStorage = typeof window === 'undefined' ? memoryPreferenceStorage : AsyncStorage;
const isDev = typeof __DEV__ !== 'undefined' && __DEV__;
const preferenceStorageKey = 'form-theory-experience-preferences';
const legacyPreferenceStorageKey = 'fitos-coach-preferences';

function saveCoachPreferences(coachingStyle: CoachingStyle, appearance: AppearancePreference) {
  coachPreferenceStorage
    .setItem(preferenceStorageKey, JSON.stringify({ coachingStyle, appearance }))
    .catch(() => undefined);
}

export const useCoachStore = create<CoachState>()((set, get) => ({
  coachingStyle: defaultExperiencePreferences.coachingStyle,
  appearance: defaultExperiencePreferences.appearance,
  messages: [],
  inputText: '',
  isLoading: false,
  proactiveBrief: null,
  suggestedPrompts: [],
  hasStartedChat: false,
  hasOnboardingHandoff: false,
  pendingActionId: null,

  setCoachingStyle: (style) => {
    if (isDev) console.log('[Coach] coaching style changed:', style);
    const { appearance } = get();
    set({
      coachingStyle: style,
      proactiveBrief: null,
      suggestedPrompts: [],
      hasOnboardingHandoff: false,
    });
    saveCoachPreferences(style, appearance);
    get().initBrief();
  },

  setAppearance: (appearance) => {
    if (isDev) console.log('[Coach] appearance changed:', appearance);
    const { coachingStyle } = get();
    set({ appearance });
    saveCoachPreferences(coachingStyle, appearance);
  },

  setInputText: (text) => set({ inputText: text }),

  initBrief: async () => {
    if (get().hasOnboardingHandoff && get().proactiveBrief && !get().hasStartedChat) return;
    set({ isLoading: true });
    try {
      const ctx = buildAIContext(get().coachingStyle);
      const [brief, prompts] = await Promise.all([
        generateProactiveBrief(ctx),
        Promise.resolve(generateSuggestedPrompts(ctx)),
      ]);
      if (get().hasOnboardingHandoff && get().proactiveBrief && !get().hasStartedChat) {
        set({ isLoading: false });
        return;
      }
      set({ proactiveBrief: brief, suggestedPrompts: prompts, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  sendMessage: async (text) => {
    if (!text.trim()) return;
    if (isDev) console.log('[Coach] message submitted:', text);

    const userMsg: ChatMessage = {
      id: newId(),
      role: 'user',
      text,
      createdAt: new Date().toISOString(),
    };

    const thinkingId = newId();
    const thinkingMsg: ChatMessage = {
      id: thinkingId,
      role: 'coach',
      isThinking: true,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      messages: [...state.messages, userMsg, thinkingMsg],
      inputText: '',
      isLoading: true,
      hasStartedChat: true,
    }));

    try {
      const ctx = buildAIContext(get().coachingStyle);
      const response = await answerCoachPrompt(text, ctx);

      const coachMsg: ChatMessage = {
        id: newId(),
        role: 'coach',
        aiMessage: response,
        createdAt: new Date().toISOString(),
      };

      const intent = parseMockIntent(text);
      if (isDev) {
        console.log('[Coach] detected intent:', intent.type);
        console.log('[Coach] response topic:', response.topic ?? 'general');
      }

      set((state) => ({
        messages: state.messages.filter((m) => m.id !== thinkingId).concat(coachMsg),
        isLoading: false,
        suggestedPrompts: generateFollowUpPromptsForTopic(response.topic ?? intent.topic),
      }));
    } catch {
      set((state) => ({
        messages: state.messages.filter((m) => m.id !== thinkingId),
        isLoading: false,
      }));
    }
  },

  confirmAction: (actionId, messageId) => {
    const { messages, coachingStyle } = get();

    // Find and update the action status to 'confirmed'
    const updatedMessages = messages.map((m) => {
      if (m.id !== messageId || !m.aiMessage?.proposedActions) return m;
      return {
        ...m,
        aiMessage: {
          ...m.aiMessage,
          proposedActions: m.aiMessage.proposedActions.map((a) =>
            a.id === actionId ? { ...a, status: 'confirmed' as const } : a
          ),
        },
      };
    });

    set({ messages: updatedMessages });

    // Find the action and execute it
    const targetMsg = messages.find((m) => m.id === messageId);
    const action = targetMsg?.aiMessage?.proposedActions?.find((a) => a.id === actionId);
    if (!action) return;

    try {
      const result = executeAction(action.type, action.payload);

      // Mark as completed
      const completedMessages = get().messages.map((m) => {
        if (m.id !== messageId || !m.aiMessage?.proposedActions) return m;
        return {
          ...m,
          aiMessage: {
            ...m.aiMessage,
            proposedActions: m.aiMessage.proposedActions.map((a) =>
              a.id === actionId ? { ...a, status: 'completed' as const } : a
            ),
          },
        };
      });

      const ctx = buildAIContext(coachingStyle);
      let confirmText = 'Done. I updated that for you.';

      if (action.type === 'log_meal') {
        const r = result as { mealName: string; calories: number; caloriesRemaining: number };
        confirmText = `${r.mealName} logged. ${r.calories} kcal added, with ${r.caloriesRemaining} calories remaining today.`;
      } else if (action.type === 'update_macros' || action.type === 'create_plan') {
        const r = result as { newCalorieGoal: number };
        confirmText = `Macro targets updated. New calorie target: ${r.newCalorieGoal} kcal.`;
      } else if (action.type === 'save_workout') {
        const r = result as { workoutName: string };
        confirmText = `${r.workoutName} saved.`;
      }

      const confirmMsg: ChatMessage = {
        id: newId(),
        role: 'coach',
        aiMessage: {
          id: newId(),
          coachingStyle,
          createdAt: new Date().toISOString(),
          summary: confirmText,
          confidence: 'high',
        },
        createdAt: new Date().toISOString(),
      };

      set({
        messages: [...completedMessages, confirmMsg],
        suggestedPrompts: generateSuggestedPrompts(ctx),
      });
    } catch (err) {
      console.warn('Action execution failed:', err);
    }
  },

  cancelAction: (actionId, messageId) => {
    set((state) => ({
      messages: state.messages.map((m) => {
        if (m.id !== messageId || !m.aiMessage?.proposedActions) return m;
        return {
          ...m,
          aiMessage: {
            ...m.aiMessage,
            proposedActions: m.aiMessage.proposedActions.map((a) =>
              a.id === actionId ? { ...a, status: 'cancelled' as const } : a
            ),
          },
        };
      }),
    }));
  },

  setPostOnboardingHandoff: ({ summary, details, prompts }) => {
    const coachingStyle = get().coachingStyle;
    set({
      messages: [],
      hasStartedChat: false,
      hasOnboardingHandoff: true,
      proactiveBrief: {
        id: newId(),
        coachingStyle,
        createdAt: new Date().toISOString(),
        topic: 'goals',
        title: 'Your starting plan is ready.',
        summary,
        details,
        confidence: 'high',
      },
      suggestedPrompts: prompts.map((prompt, index) => ({
        id: `handoff-${index}`,
        label: prompt,
        category: index === 0 ? 'training' : index === 1 ? 'nutrition' : index === 2 ? 'planning' : 'general',
        prompt,
        topic: index === 0 ? 'training' : index === 1 ? 'nutrition' : index === 2 ? 'goals' : 'general',
      })),
    });
  },

  clearChat: () => {
    const ctx = buildAIContext(get().coachingStyle);
    const prompts = generateSuggestedPrompts(ctx);
    set({ messages: [], hasStartedChat: false, hasOnboardingHandoff: false, inputText: '', suggestedPrompts: prompts });
  },
}));

coachPreferenceStorage
  .getItem(preferenceStorageKey)
  .then(async (value) => {
    if (value) {
      const preferences = JSON.parse(value) as { coachingStyle?: unknown; appearance?: unknown };
      const coachingStyle = isCoachingStyle(preferences.coachingStyle)
        ? preferences.coachingStyle
        : defaultExperiencePreferences.coachingStyle;
      const appearance = isAppearancePreference(preferences.appearance)
        ? preferences.appearance
        : defaultExperiencePreferences.appearance;

      useCoachStore.setState({
        coachingStyle,
        appearance,
      });
      return;
    }

    const legacyValue = await coachPreferenceStorage.getItem(legacyPreferenceStorageKey);
    if (!legacyValue) return;
    const legacyPreferences = JSON.parse(legacyValue) as { personaId?: unknown };
    const coachingStyle = mapLegacyPersonaToStyle(legacyPreferences.personaId);
    const appearance = defaultExperiencePreferences.appearance;

    useCoachStore.setState({
      coachingStyle,
      appearance,
    });
    saveCoachPreferences(coachingStyle, appearance);
  })
  .catch(() => undefined);
