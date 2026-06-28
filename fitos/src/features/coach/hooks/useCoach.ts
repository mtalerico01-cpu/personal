import { useState, useCallback } from 'react';
import {
  PersonaId,
  PERSONAS,
  ChatMessage,
  SUGGESTED_PROMPTS,
  MOCK_RESPONSES,
  DEFAULT_RESPONSE,
} from '../mock';

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

let _msgId = 1;

export function useCoach() {
  const [persona, setPersona] = useState<PersonaId>('cedric');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const currentPersona = PERSONAS[persona];
  const greeting = currentPersona.greeting(getTimeOfDay(), 'Alex');
  const showSuggestions = messages.length === 0;

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `msg-${_msgId++}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    await new Promise(resolve => setTimeout(resolve, 1200));

    const response = MOCK_RESPONSES[trimmed] ?? DEFAULT_RESPONSE;
    const coachMsg: ChatMessage = {
      id: `msg-${_msgId++}`,
      role: 'coach',
      text: response.text,
      timestamp: new Date(),
      actionCard: response.actionCard,
    };

    setIsThinking(false);
    setMessages(prev => [...prev, coachMsg]);
  }, []);

  const handlePromptTap = useCallback(
    (text: string) => sendMessage(text),
    [sendMessage]
  );

  const handleActionTap = useCallback((messageId: string, actionId: string) => {
    const ack =
      actionId === 'apply'
        ? 'Done. I\u2019ve applied those changes to your nutrition goals.'
        : actionId === 'log'
        ? 'Logged. Added that meal to your log.'
        : actionId === 'start'
        ? 'Let\u2019s go. Opening your workout session.'
        : 'Got it.';

    const ackMsg: ChatMessage = {
      id: `msg-${_msgId++}`,
      role: 'coach',
      text: ack,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, ackMsg]);
  }, []);

  const clearChat = useCallback(() => setMessages([]), []);

  return {
    persona,
    setPersona,
    currentPersona,
    greeting,
    messages,
    inputText,
    setInputText,
    isThinking,
    showSuggestions,
    suggestedPrompts: SUGGESTED_PROMPTS,
    sendMessage,
    handlePromptTap,
    handleActionTap,
    clearChat,
  };
}
