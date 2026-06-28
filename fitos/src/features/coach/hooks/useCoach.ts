/**
 * useCoach — thin wrapper over coachStore.
 * Kept for backward compatibility with coach.tsx and to expose
 * derived values (greeting, showSuggestions) in one place.
 */
import { useEffect } from 'react';
import { useCoachStore } from '../store/coachStore';
import { PERSONAS } from '../mock';
import { getDayPartForTimezone } from '../../ai/context/getDayPart';
import { useUserStore } from '../../../store/userStore';

export function useCoach() {
  const store = useCoachStore();
  const profile = useUserStore((s) => s.profile);
  const name = profile?.name ?? 'there';

  // Load brief on first mount
  useEffect(() => {
    store.initBrief();
  }, [store.personaId]);

  const dayPart = getDayPartForTimezone('America/New_York');
  const currentPersona = PERSONAS[store.personaId];
  // old mock PERSONAS.greeting signature is (timeOfDay, userName)
  const greeting = currentPersona?.greeting(dayPart, name) ?? '';
  const showSuggestions = store.messages.length === 0;

  return {
    persona: store.personaId,
    setPersona: store.setPersona,
    currentPersona,
    greeting,
    messages: store.messages,
    inputText: store.inputText,
    setInputText: store.setInputText,
    isThinking: store.isLoading,
    isLoading: store.isLoading,
    showSuggestions,
    suggestedPrompts: store.suggestedPrompts,
    proactiveBrief: store.proactiveBrief,
    sendMessage: store.sendMessage,
    handlePromptTap: store.sendMessage,
    confirmAction: store.confirmAction,
    cancelAction: store.cancelAction,
    clearChat: store.clearChat,
  };
}

