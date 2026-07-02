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

import { useCoachStore } from '../../coach/store/coachStore';
import { useActivePlanStore } from '../../../store/activePlanStore';
import { useNutritionStore } from '../../../store/nutritionStore';
import { useTrainingStore } from '../../../store/trainingStore';
import { useUserStore } from '../../../store/userStore';
import { useOnboardingStore } from '../store/onboardingStore';

describe('onboardingStore', () => {
  beforeEach(() => {
    mockAsyncStorage.clear();
    useOnboardingStore.getState().reset();
    useActivePlanStore.getState().clearActivePlan();
    useUserStore.setState({ profile: null, isLoaded: false, hasHydrated: true });
    useNutritionStore.getState().resetToMock();
    useTrainingStore.getState().resetToMock();
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

  it('keeps skipped optional fields distinct from answered none', () => {
    const store = useOnboardingStore.getState();

    store.goToStep('restrictions');
    store.skipStep('restrictions');

    expect(useOnboardingStore.getState().skippedStepIds).toContain('restrictions');
    expect(useOnboardingStore.getState().answers.restrictionsStatus).toBeUndefined();
  });

  it('generates a draft plan without activating shared stores', () => {
    seedRequiredAnswers();
    const plan = useOnboardingStore.getState().ensurePlan();

    expect(plan?.status).toBe('draft');
    expect(useUserStore.getState().profile).toBeNull();
    expect(useNutritionStore.getState().goals.calories).not.toBe(plan?.macros.calories.active);
  });

  it('confirms a plan into profile, nutrition, training, progress, and Coach handoff state', () => {
    seedRequiredAnswers();
    const plan = useOnboardingStore.getState().ensurePlan();

    useOnboardingStore.getState().confirmPlan();

    expect(useOnboardingStore.getState().status).toBe('completed');
    expect(useActivePlanStore.getState().activePlan?.plan.id).toBe(plan?.id);
    expect(useActivePlanStore.getState().activePlan?.sourceReferences).toEqual(expect.arrayContaining(['SRC-ENERGY-MIFFLIN-1990']));
    expect(useUserStore.getState().profile?.onboarding.status).toBe('completed');
    expect(useNutritionStore.getState().goals.calories).toBe(plan?.macros.calories.active);
    expect(useTrainingStore.getState().todayWorkout?.name).toBeTruthy();
    expect(useCoachStore.getState().proactiveBrief?.summary).toBe('Your starting plan is ready.');
  });

  it('blocks unsafe manual targets from activation', () => {
    seedRequiredAnswers({ manualTargets: { status: 'completed', calories: 900 } });
    useOnboardingStore.getState().ensurePlan();
    useOnboardingStore.getState().confirmPlan();

    expect(useOnboardingStore.getState().status).not.toBe('completed');
    expect(useActivePlanStore.getState().activePlan).toBeNull();
    expect(useUserStore.getState().profile).toBeNull();
  });
});

function seedRequiredAnswers(overrides = {}) {
  useOnboardingStore.getState().updateAnswers({
    primaryGoal: 'fat_loss',
    age: 34,
    heightCm: 180,
    currentWeightKg: 95,
    estimationSex: 'male',
    units: 'imperial',
    ratePreference: 'moderate',
    activityLevel: 'sedentary',
    trainingExperience: 'beginner',
    trainingDaysPerWeek: 3,
    equipment: ['full_gym'],
    coachingStyle: 'balanced',
    appearance: 'system',
    responseDetail: 'standard',
    accountability: 'gentle',
    memoryPreference: 'ask_first',
    ...overrides,
  });
}
