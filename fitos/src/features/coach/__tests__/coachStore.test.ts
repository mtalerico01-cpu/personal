const mockAsyncStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => Promise.resolve(store[key] ?? null)),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
      return Promise.resolve();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      store = {};
      return Promise.resolve();
    }),
  };
})();

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: mockAsyncStorage,
  ...mockAsyncStorage,
}));

import { useCoachStore } from '../store/coachStore';
import { useTrainingStore } from '../../../store/trainingStore';

describe('coach experience preferences', () => {
  beforeEach(() => {
    useCoachStore.setState({
      coachingStyle: 'balanced',
      appearance: 'system',
      messages: [],
      inputText: '',
      isLoading: false,
      proactiveBrief: null,
      suggestedPrompts: [],
      hasStartedChat: false,
      pendingActionId: null,
    });
  });

  it('updates coaching style without changing appearance', () => {
    useCoachStore.getState().setCoachingStyle('encouraging');

    expect(useCoachStore.getState().coachingStyle).toBe('encouraging');
    expect(useCoachStore.getState().appearance).toBe('system');
  });

  it('updates appearance without changing coaching style', () => {
    useCoachStore.getState().setAppearance('light');

    expect(useCoachStore.getState().appearance).toBe('light');
    expect(useCoachStore.getState().coachingStyle).toBe('balanced');
  });

  it('switching coaching style does not erase conversation', () => {
    useCoachStore.setState({
      messages: [
        {
          id: 'm1',
          role: 'user',
          text: 'How are my macros looking?',
          createdAt: '2026-06-29T00:00:00.000Z',
        },
      ],
    });

    useCoachStore.getState().setCoachingStyle('direct');

    expect(useCoachStore.getState().coachingStyle).toBe('direct');
    expect(useCoachStore.getState().messages).toHaveLength(1);
  });
});

describe('cardio store actions', () => {
  beforeEach(() => {
    useTrainingStore.getState().resetToMock();
  });

  it('marks cardio complete without missing session data', () => {
    useTrainingStore.getState().markCardioComplete();
    const cardio = useTrainingStore.getState().cardio;

    expect(cardio.cardioMinutesCompleted).toBe(cardio.cardioMinutesGoal);
    expect(cardio.sessions.length).toBeGreaterThan(0);
  });

  it('edits cardio plan fields', () => {
    useTrainingStore.getState().updateCardioPlan({
      cardioMinutesGoal: 30,
      activity: 'Outdoor Zone 2 walk',
      intensity: 'Easy to moderate',
    });

    expect(useTrainingStore.getState().cardio.cardioMinutesGoal).toBe(30);
    expect(useTrainingStore.getState().cardio.activity).toBe('Outdoor Zone 2 walk');
  });
});
