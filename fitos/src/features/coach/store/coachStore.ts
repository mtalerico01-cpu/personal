import { create } from 'zustand';
import type { AIMessage, AIActionProposal, SuggestedPrompt } from '../../ai/types';
import { buildAIContext } from '../../ai/context/buildAIContext';
import { generateSuggestedPrompts, generateFollowUpPrompts } from '../../ai/suggestions/generateSuggestedPrompts';
import { parseMockIntent } from '../../ai/intents/parseMockIntent';
import { generateProactiveBrief, answerCoachPrompt } from '../../ai/services/mockAIService';
import { executeAction } from '../../ai/tools/toolDispatcher';
import { PERSONAS } from '../../ai/personas/personas';

export type PersonaId = 'cedric' | 'elara';

export interface ChatMessage {
  id: string;
  role: 'user' | 'coach';
  text?: string;
  aiMessage?: AIMessage;
  isThinking?: boolean;
  createdAt: string;
}

interface CoachState {
  personaId: PersonaId;
  messages: ChatMessage[];
  inputText: string;
  isLoading: boolean;
  proactiveBrief: AIMessage | null;
  suggestedPrompts: SuggestedPrompt[];
  hasStartedChat: boolean;
  pendingActionId: string | null;

  // Actions
  setPersona: (id: PersonaId) => void;
  setInputText: (text: string) => void;
  initBrief: () => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  confirmAction: (actionId: string, messageId: string) => void;
  cancelAction: (actionId: string, messageId: string) => void;
  clearChat: () => void;
}

let _idCounter = 0;
const newId = () => `chat-${++_idCounter}-${Date.now()}`;

export const useCoachStore = create<CoachState>((set, get) => ({
  personaId: 'cedric',
  messages: [],
  inputText: '',
  isLoading: false,
  proactiveBrief: null,
  suggestedPrompts: [],
  hasStartedChat: false,
  pendingActionId: null,

  setPersona: (id) => {
    set({ personaId: id });
    // Regenerate brief with new persona
    get().initBrief();
  },

  setInputText: (text) => set({ inputText: text }),

  initBrief: async () => {
    set({ isLoading: true });
    try {
      const ctx = buildAIContext(get().personaId);
      const [brief, prompts] = await Promise.all([
        generateProactiveBrief(ctx),
        Promise.resolve(generateSuggestedPrompts(ctx)),
      ]);
      set({ proactiveBrief: brief, suggestedPrompts: prompts, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  sendMessage: async (text) => {
    if (!text.trim()) return;

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
      const ctx = buildAIContext(get().personaId);
      const response = await answerCoachPrompt(text, ctx);

      const coachMsg: ChatMessage = {
        id: newId(),
        role: 'coach',
        aiMessage: response,
        createdAt: new Date().toISOString(),
      };

      const intent = parseMockIntent(text);
      console.log('[Coach] Intent:', intent.type);
      console.log('[Coach] Response:', response.summary?.substring(0, 80));

      set((state) => ({
        messages: state.messages.filter((m) => m.id !== thinkingId).concat(coachMsg),
        isLoading: false,
        suggestedPrompts: generateFollowUpPrompts(intent.type),
      }));
    } catch {
      set((state) => ({
        messages: state.messages.filter((m) => m.id !== thinkingId),
        isLoading: false,
      }));
    }
  },

  confirmAction: (actionId, messageId) => {
    const { messages, personaId } = get();

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

      // Build confirmation message
      const persona = PERSONAS[personaId];
      const ctx = buildAIContext(personaId);
      let confirmText = persona.generalAck();

      if (action.type === 'log_meal') {
        const r = result as { mealName: string; calories: number; caloriesRemaining: number };
        confirmText = persona.mealLogged(r.mealName, r.calories, r.caloriesRemaining);
      } else if (action.type === 'update_macros' || action.type === 'create_plan') {
        const r = result as { newCalorieGoal: number };
        confirmText = persona.macrosUpdated(r.newCalorieGoal);
      } else if (action.type === 'save_workout') {
        const r = result as { workoutName: string };
        confirmText = persona.workoutSaved(r.workoutName);
      }

      const confirmMsg: ChatMessage = {
        id: newId(),
        role: 'coach',
        aiMessage: {
          id: newId(),
          personaId,
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

  clearChat: () => {
    const ctx = buildAIContext(get().personaId);
    const prompts = generateSuggestedPrompts(ctx);
    set({ messages: [], hasStartedChat: false, inputText: '', suggestedPrompts: prompts });
  },
}));
