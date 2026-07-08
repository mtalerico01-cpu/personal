import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { brandAssets } from '@/branding/assets';
import { Text } from '@/shared/components/ui/Text';
import { radius, spacing } from '@/shared/theme/spacing';
import { fontFamilies } from '@/shared/theme/typography';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { ChoiceCard } from '@/features/onboarding/components/ChoiceCard';
import { OnboardingShell } from '@/features/onboarding/components/OnboardingShell';
import { PlanSummary } from '@/features/onboarding/components/PlanSummary';
import { isOnboardingStepComplete } from '@/features/onboarding/flow/onboardingValidation';
import { generateInitialPlan } from '@/features/onboarding/services/generateInitialPlan';
import { inchesToCm, lbsToKg, roundToNearest } from '@/features/onboarding/services/unitConversion';
import { getSectionProgress, onboardingSteps } from '@/features/onboarding/steps';
import { useOnboardingStore, type OnboardingState } from '@/features/onboarding/store/onboardingStore';
import type { InitialPlan, OnboardingStepId } from '@/features/onboarding/types';
import type { PrimaryGoal } from '@/types';

type Choice<T extends string> = { label: string; value: T; description?: string };

const goalChoices = [
  { label: 'Build muscle', value: 'muscle_gain' },
  { label: 'Lose fat', value: 'fat_loss' },
  { label: 'Body recomposition', value: 'recomposition' },
  { label: 'Get stronger', value: 'strength' },
  { label: 'Improve cardio fitness', value: 'cardiovascular_fitness' },
  { label: 'Build endurance', value: 'endurance' },
  { label: 'Improve mobility', value: 'mobility' },
  { label: 'Improve athletic performance', value: 'athletic_performance' },
  { label: 'Healthy aging', value: 'healthy_aging' },
  { label: 'Prepare for an event', value: 'event_preparation' },
  { label: 'Improve general health', value: 'general_health' },
  { label: 'Maintain current fitness', value: 'maintenance' },
  { label: 'Custom goal', value: 'custom' },
] as const;

const secondaryGoalChoices = goalChoices.map((goal) => goal.value);
const trainingTypes = ['strength_training', 'hypertrophy', 'general_fitness', 'athletic_training', 'functional_training', 'not_sure'];
const dietPatterns = [
  { label: 'Balanced / flexible', value: 'balanced' },
  { label: 'Mediterranean-style', value: 'mediterranean' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Vegan', value: 'vegan' },
  { label: 'Pescatarian', value: 'pescatarian' },
  { label: 'Dairy-free', value: 'dairy_free' },
  { label: 'Gluten-free', value: 'gluten_free' },
  { label: 'Low-FODMAP-aware', value: 'low_fodmap_aware' },
  { label: 'Culturally flexible', value: 'culturally_flexible' },
  { label: 'Custom pattern', value: 'custom' },
] as const;
const macroPreferenceChoices = [
  { label: 'Balanced macros', value: 'balanced' },
  { label: 'Protein-forward', value: 'higher_protein' },
  { label: 'Moderate carbs', value: 'moderate_carb' },
  { label: 'Lower-carb preference', value: 'lower_carb' },
  { label: 'Higher carbs for endurance', value: 'higher_carb_endurance' },
  { label: 'Custom targets', value: 'custom' },
] as const;
const recoveryConcerns = ['poor_sleep', 'high_stress', 'soreness', 'low_energy', 'joint_pain', 'limited_time', 'none'];
const customSplitFocuses = ['chest', 'back', 'shoulders', 'arms', 'quads', 'hamstrings_glutes', 'full_body', 'cardio_conditioning', 'mobility'];

export default function OnboardingRoute() {
  const theme = useActiveTheme();
  const store = useOnboardingStore();
  const [nameInput, setNameInput] = useState(store.answers.firstName ?? '');
  const [usernameInput, setUsernameInput] = useState(store.answers.username ?? '');
  const [bodyInputs, setBodyInputs] = useState({ age: '', feet: '', inches: '', cm: '', weight: '', bodyFat: '', goalWeight: '' });
  const [manualInputs, setManualInputs] = useState({ calories: '', protein: '', carbs: '', fat: '', workoutDays: '', cardioSessions: '', cardioType: '', cardioDuration: '', mealPlan: '', dietStyle: '', trainingSplit: '', stepGoal: '' });
  const [nutritionInputs, setNutritionInputs] = useState({ foodsToAvoid: '', allergies: '', proteins: '', eatingSchedule: '', mealPrep: '' });
  const [cardioInputs, setCardioInputs] = useState({ sessions: '', duration: '', type: '', intensity: '' });
  const [recoveryInputs, setRecoveryInputs] = useState({ sleep: '', injury: '' });
  const [generationReady, setGenerationReady] = useState(false);
  const currentStep = onboardingSteps.find((step) => step.id === store.currentStepId) ?? onboardingSteps[0];
  const progress = getSectionProgress(currentStep.id, store.answers);

  useEffect(() => {
    store.init();
  }, []);

  useEffect(() => {
    if (currentStep.id !== 'plan_generation') return;
    setGenerationReady(false);
    const timer = setTimeout(() => {
      store.ensurePlan();
      setGenerationReady(true);
    }, 900);
    return () => clearTimeout(timer);
  }, [currentStep.id]);

  useEffect(() => {
    if (currentStep.id === 'plan_preview' && !store.plan) store.ensurePlan();
  }, [currentStep.id, store.plan]);

  const canContinue = useMemo(
    () => isOnboardingStepComplete(currentStep.id, store.answers, { nameInput, bodyInputs, generationReady, usernameInput, plan: store.plan }),
    [currentStep.id, store.answers, store.plan, nameInput, bodyInputs, generationReady, usernameInput],
  );
  const showSkip = !currentStep.required;

  if (!store.isHydrated) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.background.primary }]}> 
        <Text variant="labelLarge" color={theme.colors.text.secondary}>Loading Form Theory...</Text>
      </View>
    );
  }

  const continueStep = () => {
    if (currentStep.id === 'welcome_name') commitName();
    if (currentStep.id === 'username') store.updateAnswers({ username: usernameInput.trim().toLowerCase().replace(/\s+/g, '') });
    if (currentStep.id === 'body_profile') commitBodyInputs();
    if (currentStep.id === 'manual_targets') commitManualTargets();
    if (currentStep.id === 'nutrition_optional') commitNutritionOptional();
    if (currentStep.id === 'cardio_details') commitCardioDetails();
    if (currentStep.id === 'recovery_lifestyle') commitRecoveryLifestyle();
    if (currentStep.id === 'plan_generation') {
      store.ensurePlan();
      store.next();
      return;
    }
    if (currentStep.id === 'plan_preview') {
      store.confirmPlan();
      if (useOnboardingStore.getState().status === 'completed') router.replace('/');
      return;
    }
    store.next();
  };

  const skipStep = () => {
    if (currentStep.id === 'restrictions') store.updateAnswers({ restrictionsStatus: 'skipped' });
    store.skipStep();
  };

  const commitName = () => {
    store.updateAnswers({ firstName: nameInput.trim() });
  };

  const commitBodyInputs = () => {
    const units = store.answers.units ?? 'imperial';
    const age = Number(bodyInputs.age);
    const heightCm = units === 'metric' ? Number(bodyInputs.cm) : inchesToCm(Number(bodyInputs.feet) * 12 + Number(bodyInputs.inches || 0));
    const currentWeightKg = units === 'metric' ? Number(bodyInputs.weight) : lbsToKg(Number(bodyInputs.weight));
    const goalWeight = Number(bodyInputs.goalWeight);
    store.updateAnswers({
      age,
      heightCm,
      currentWeightKg,
      bodyFatPercentage: Number(bodyInputs.bodyFat) || undefined,
      targetWeightKg: goalWeight ? (units === 'metric' ? goalWeight : lbsToKg(goalWeight)) : undefined,
      weightGoalType: goalWeight ? 'target_weight' : 'unknown',
    });
  };

  const commitManualTargets = () => {
    const hasAnyTarget = Object.values(manualInputs).some(Boolean);
    store.updateAnswers({
      manualTargets: hasAnyTarget ? {
        status: 'completed',
        calories: numberOrUndefined(manualInputs.calories),
        proteinGrams: numberOrUndefined(manualInputs.protein),
        carbsGrams: numberOrUndefined(manualInputs.carbs),
        fatGrams: numberOrUndefined(manualInputs.fat),
        weeklyWorkoutDays: numberOrUndefined(manualInputs.workoutDays),
        weeklyCardioSessions: numberOrUndefined(manualInputs.cardioSessions),
        cardioType: manualInputs.cardioType || undefined,
        cardioDurationMinutes: numberOrUndefined(manualInputs.cardioDuration),
        currentMealPlanStructure: manualInputs.mealPlan || undefined,
        currentDietStyle: manualInputs.dietStyle || undefined,
        currentTrainingSplit: manualInputs.trainingSplit || undefined,
        dailyStepGoal: numberOrUndefined(manualInputs.stepGoal),
      } : { status: 'not_used' },
    });
  };

  const commitNutritionOptional = () => {
    store.updateAnswers({
      dislikedFoods: splitList(nutritionInputs.foodsToAvoid),
      allergies: splitList(nutritionInputs.allergies),
      favoriteProteinSources: splitList(nutritionInputs.proteins),
      eatingSchedule: nutritionInputs.eatingSchedule || undefined,
      mealPrepPreference: nutritionInputs.mealPrep || undefined,
    });
  };

  const commitCardioDetails = () => {
    store.updateAnswers({
      cardioSessionsPerWeek: numberOrUndefined(cardioInputs.sessions),
      cardioDurationMinutes: numberOrUndefined(cardioInputs.duration),
      cardioType: cardioInputs.type || undefined,
      cardioIntensity: cardioInputs.intensity || undefined,
    });
  };

  const commitRecoveryLifestyle = () => {
    store.updateAnswers({
      averageSleepHours: numberOrUndefined(recoveryInputs.sleep),
      injuryHistory: recoveryInputs.injury || undefined,
    });
  };

  const adjustCalories = (plan: InitialPlan, delta: number) => {
    const calories = Math.max(1200, plan.macros.calories.active + delta);
    const protein = plan.macros.proteinGrams.active;
    const fat = plan.macros.fatGrams.active;
    const carbs = Math.max(50, roundToNearest((calories - protein * 4 - fat * 9) / 4, 5));
    store.editPlan({
      macros: {
        ...plan.macros,
        calories: { ...plan.macros.calories, active: calories, source: 'user_override' },
        carbsGrams: { ...plan.macros.carbsGrams, active: carbs, source: 'user_override' },
      },
    });
  };

  return (
    <OnboardingShell
      title={currentStep.id === 'goal_affirmation' ? getGoalAffirmationTitle(store.answers.primaryGoal) : currentStep.id === 'plan_preview' ? `You're set${store.answers.firstName ? `, ${store.answers.firstName}` : ''}.` : currentStep.title}
      explanation={currentStep.id === 'goal_affirmation' ? undefined : currentStep.explanation}
      section={progress.section}
      progressCurrent={progress.current}
      progressTotal={progress.total}
      sections={progress.sections}
      canContinue={canContinue}
      continueLabel={currentStep.id === 'plan_preview' ? 'Start coaching' : currentStep.id === 'plan_generation' ? 'Review plan' : 'Continue'}
      showSkip={showSkip}
      onBack={currentStep.id === 'welcome_name' ? undefined : store.back}
      onContinue={continueStep}
      onSkip={skipStep}
    >
      {renderStep({ currentStepId: currentStep.id, store, theme, nameInput, setNameInput, usernameInput, setUsernameInput, bodyInputs, setBodyInputs, manualInputs, setManualInputs, nutritionInputs, setNutritionInputs, cardioInputs, setCardioInputs, recoveryInputs, setRecoveryInputs, generationReady, adjustCalories })}
    </OnboardingShell>
  );
}

function renderStep({ currentStepId, store, theme, nameInput, setNameInput, usernameInput, setUsernameInput, bodyInputs, setBodyInputs, manualInputs, setManualInputs, nutritionInputs, setNutritionInputs, cardioInputs, setCardioInputs, recoveryInputs, setRecoveryInputs, generationReady, adjustCalories }: {
  currentStepId: OnboardingStepId;
  store: OnboardingState;
  theme: ReturnType<typeof useActiveTheme>;
  nameInput: string;
  setNameInput: (value: string) => void;
  usernameInput: string;
  setUsernameInput: (value: string) => void;
  bodyInputs: { age: string; feet: string; inches: string; cm: string; weight: string; bodyFat: string; goalWeight: string };
  setBodyInputs: React.Dispatch<React.SetStateAction<{ age: string; feet: string; inches: string; cm: string; weight: string; bodyFat: string; goalWeight: string }>>;
  manualInputs: Record<string, string>;
  setManualInputs: React.Dispatch<React.SetStateAction<{ calories: string; protein: string; carbs: string; fat: string; workoutDays: string; cardioSessions: string; cardioType: string; cardioDuration: string; mealPlan: string; dietStyle: string; trainingSplit: string; stepGoal: string }>>;
  nutritionInputs: { foodsToAvoid: string; allergies: string; proteins: string; eatingSchedule: string; mealPrep: string };
  setNutritionInputs: React.Dispatch<React.SetStateAction<{ foodsToAvoid: string; allergies: string; proteins: string; eatingSchedule: string; mealPrep: string }>>;
  cardioInputs: { sessions: string; duration: string; type: string; intensity: string };
  setCardioInputs: React.Dispatch<React.SetStateAction<{ sessions: string; duration: string; type: string; intensity: string }>>;
  recoveryInputs: { sleep: string; injury: string };
  setRecoveryInputs: React.Dispatch<React.SetStateAction<{ sleep: string; injury: string }>>;
  generationReady: boolean;
  adjustCalories: (plan: InitialPlan, delta: number) => void;
}) {
  const answers = store.answers;

  switch (currentStepId) {
    case 'welcome_name':
      return (
        <View style={styles.centered}>
          <Image source={theme.mode === 'dark' ? brandAssets.markDark : brandAssets.markLight} resizeMode="contain" style={styles.logo} />
          <Text variant="bodyLarge" color={theme.colors.text.secondary} style={styles.centerText}>Form Theory will use your profile to build a personalized AI coach.</Text>
          <TextInputGroup label="Preferred name" value={nameInput} onChangeText={setNameInput} placeholder="Alex" />
          {store.savedShortcut ? (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => store.restoreFromShortcut()}
              style={[styles.shortcutButton, { borderColor: theme.colors.persona.core, backgroundColor: theme.colors.surface.subtle }]}
            >
              <Text variant="labelMedium" color={theme.colors.persona.core}>Continue as @{store.savedShortcut.username}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      );

    case 'body_profile':
      return (
        <View style={styles.stack}>
          <ChoiceList choices={[{ label: 'Imperial', value: 'imperial' }, { label: 'Metric', value: 'metric' }]} selected={answers.units} onSelect={(value) => store.updateAnswers({ units: value })} />
          <InputGrid inputs={answers.units === 'metric' ? [
            ['Age', bodyInputs.age, (value) => setBodyInputs((s) => ({ ...s, age: value })), true],
            ['Height (cm)', bodyInputs.cm, (value) => setBodyInputs((s) => ({ ...s, cm: value })), true],
            ['Current weight (kg)', bodyInputs.weight, (value) => setBodyInputs((s) => ({ ...s, weight: value })), true],
            ['Body fat % (optional)', bodyInputs.bodyFat, (value) => setBodyInputs((s) => ({ ...s, bodyFat: value })), true],
            ['Goal weight (optional)', bodyInputs.goalWeight, (value) => setBodyInputs((s) => ({ ...s, goalWeight: value })), true],
          ] : [
            ['Age', bodyInputs.age, (value) => setBodyInputs((s) => ({ ...s, age: value })), true],
            ['Feet', bodyInputs.feet, (value) => setBodyInputs((s) => ({ ...s, feet: value })), true],
            ['Inches', bodyInputs.inches, (value) => setBodyInputs((s) => ({ ...s, inches: value })), true],
            ['Current weight (lb)', bodyInputs.weight, (value) => setBodyInputs((s) => ({ ...s, weight: value })), true],
            ['Body fat % (optional)', bodyInputs.bodyFat, (value) => setBodyInputs((s) => ({ ...s, bodyFat: value })), true],
            ['Goal weight (optional)', bodyInputs.goalWeight, (value) => setBodyInputs((s) => ({ ...s, goalWeight: value })), true],
          ]} />
          <Text variant="caption" color={theme.colors.text.secondary}>Sex/gender is only used for the starting calorie estimate. You can override all targets after setup.</Text>
          <Text variant="caption" color={theme.colors.text.secondary} style={{ marginTop: 4 }}>Goal weight is for tracking progress — it does not affect your starting calorie target.</Text>
          <ChoiceList choices={[{ label: 'Female', value: 'female' }, { label: 'Male', value: 'male' }, { label: 'I’m not sure / do not use', value: 'not_used' }]} selected={answers.estimationSex} onSelect={(value) => store.updateAnswers({ estimationSex: value })} />
        </View>
      );

    case 'goals':
      return (
        <View style={styles.stack}>
          <ChoiceList choices={goalChoices} selected={answers.primaryGoal} onSelect={(value) => store.updateAnswers({ primaryGoal: value })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Optional secondary goals</Text>
          <MultiChoiceList values={secondaryGoalChoices} selected={answers.secondaryGoals ?? []} onChange={(values) => store.updateAnswers({ secondaryGoals: values as PrimaryGoal[] })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Pace</Text>
          <ChoiceList choices={[{ label: 'Easy / sustainable', value: 'easy', description: 'Lower friction, easier recovery.' }, { label: 'Balanced', value: 'balanced', description: 'A realistic default for most users.' }, { label: 'Aggressive', value: 'aggressive', description: 'Faster progress with clearer tradeoffs.' }]} selected={answers.planAggressiveness} onSelect={(value) => store.updateAnswers({ planAggressiveness: value })} />
        </View>
      );

    case 'goal_affirmation': {
      const goalLabel = goalChoices.find((g) => g.value === answers.primaryGoal)?.label ?? 'Your goal';
      return (
        <View style={styles.stack}>
          <View style={[styles.affirmationGoalPill, { backgroundColor: theme.colors.persona.core }]}>
            <Text variant="labelLarge" color={theme.colors.text.inverse} style={styles.affirmationPillText}>{goalLabel}</Text>
          </View>
          <Text variant="bodyLarge" color={theme.colors.text.secondary} style={styles.affirmationBody}>
            {getGoalAffirmationBody(answers.primaryGoal)}
          </Text>
          <View style={[styles.affirmationDivider, { backgroundColor: theme.colors.border.subtle }]} />
          <Text variant="bodyMedium" color={theme.colors.text.secondary}>
            Next we\'ll set up your training history, nutrition targets, and coach preferences — then generate your plan.
          </Text>
        </View>
      );
    }

    case 'plan_aggressiveness':
      return <ChoiceList choices={[{ label: 'Easy / sustainable', value: 'easy', description: 'Lower friction, easier recovery.' }, { label: 'Balanced', value: 'balanced', description: 'A realistic default for most users.' }, { label: 'Aggressive', value: 'aggressive', description: 'Faster progress with clearer tradeoffs.' }]} selected={answers.planAggressiveness} onSelect={(value) => store.updateAnswers({ planAggressiveness: value })} />;

    case 'experience_level':
      return <ChoiceList choices={[{ label: 'New to fitness', value: 'new' }, { label: 'Getting back into fitness', value: 'returning' }, { label: 'Consistent but want more structure', value: 'intermediate' }, { label: 'Experienced lifter', value: 'advanced' }, { label: 'Athlete / advanced', value: 'athlete' }]} selected={answers.trainingExperience} onSelect={(value) => store.updateAnswers({ trainingExperience: value })} />;

    case 'structured_plan':
      return <ChoiceList choices={[{ label: 'No, I need Form Theory to build one', value: 'none' }, { label: 'Somewhat, but I want recommendations', value: 'somewhat' }, { label: 'Yes, I already have a plan', value: 'yes' }]} selected={answers.structuredPlanStatus} onSelect={(value) => store.updateAnswers({ structuredPlanStatus: value })} />;

    case 'target_knowledge':
      return <ChoiceList choices={[{ label: 'No, recommend everything for me', value: 'recommend_everything' }, { label: 'I know some of my targets', value: 'know_some' }, { label: 'Yes, I know my targets', value: 'know_targets' }]} selected={answers.targetKnowledge} onSelect={(value) => store.updateAnswers({ targetKnowledge: value, manualTargets: value === 'recommend_everything' ? { status: 'not_used' } : { status: 'in_progress' } })} />;

    case 'manual_targets':
      return (
        <View style={styles.stack}>
          <Text variant="bodyMedium" color={theme.colors.text.secondary}>Use quick ranges here. You can fine-tune exact numbers after the plan is generated.</Text>
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Calories</Text>
          <ChoiceList choices={[1800, 2200, 2600, 3000, 3400].map((value) => ({ label: `${value.toLocaleString()} / day`, value: String(value) }))} selected={String(answers.manualTargets?.calories ?? '')} onSelect={(value) => store.updateAnswers({ manualTargets: { ...answers.manualTargets, status: 'completed', calories: Number(value) } })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Protein</Text>
          <ChoiceList choices={[120, 150, 180, 210, 240].map((value) => ({ label: `${value}g / day`, value: String(value) }))} selected={String(answers.manualTargets?.proteinGrams ?? '')} onSelect={(value) => store.updateAnswers({ manualTargets: { ...answers.manualTargets, status: 'completed', proteinGrams: Number(value) } })} />
        </View>
      );

    case 'activity':
      return (
        <View style={styles.stack}>
          <Text variant="bodyMedium" color={theme.colors.text.secondary}>Your baseline daily movement — not counting gym sessions. We account for workouts separately.</Text>
          <ChoiceList choices={[{ label: 'Mostly seated', value: 'sedentary', description: 'Desk job, driving, minimal walking' }, { label: 'Lightly active', value: 'light', description: 'On your feet for parts of the day' }, { label: 'Active', value: 'active', description: 'Physical activity throughout the day' }, { label: 'Highly active', value: 'highly_active', description: 'Heavy physical labor or constant movement' }]} selected={answers.activityLevel} onSelect={(value) => store.updateAnswers({ activityLevel: value, jobActivityType: value })} />
        </View>
      );

    case 'training_availability':
      return (
        <View style={styles.stack}>
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Days per week</Text>
          <ChoiceList choices={[2, 3, 4, 5, 6].map((day) => ({ label: day === 6 ? '6+ days' : `${day} days`, value: String(day) }))} selected={String(answers.trainingDaysPerWeek ?? '')} onSelect={(value) => store.updateAnswers({ trainingDaysPerWeek: Number(value) })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Training focus</Text>
          <ChoiceList choices={trainingTypes.map((value) => ({ label: formatLabel(value), value }))} selected={answers.preferredTrainingTypes?.[0]} onSelect={(value) => store.updateAnswers({ preferredTrainingTypes: [value] })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Equipment</Text>
          <ChoiceList choices={[{ label: 'Commercial gym', value: 'full_gym' }, { label: 'Home gym', value: 'home_gym' }, { label: 'Minimal equipment', value: 'minimal_equipment' }, { label: 'Bodyweight only', value: 'bodyweight_only' }, { label: 'Mixed', value: 'mixed' }]} selected={answers.equipment?.[0]} onSelect={(value) => store.updateAnswers({ equipment: [value] })} />
        </View>
      );

    case 'training_location':
      return <ChoiceList choices={[{ label: 'Commercial gym', value: 'full_gym' }, { label: 'Home gym', value: 'home_gym' }, { label: 'Minimal equipment', value: 'minimal_equipment' }, { label: 'Bodyweight only', value: 'bodyweight_only' }, { label: 'Mixed', value: 'mixed' }]} selected={answers.equipment?.[0]} onSelect={(value) => store.updateAnswers({ equipment: [value] })} />;

    case 'training_preference':
      return <ChoiceList choices={trainingTypes.map((value) => ({ label: formatLabel(value), value }))} selected={answers.preferredTrainingTypes?.[0]} onSelect={(value) => store.updateAnswers({ preferredTrainingTypes: [value] })} />;

    case 'workout_split':
      return (
        <View style={styles.stack}>
          <ChoiceList choices={[{ label: 'Recommend one for me', value: 'recommend' }, { label: 'Use my current split', value: 'enter' }, { label: 'Start with mine, but adjust it', value: 'open_to_changes' }]} selected={answers.workoutSplitStatus} onSelect={(value) => store.updateAnswers({ workoutSplitStatus: value, structuredPlanStatus: value === 'recommend' ? 'none' : value === 'enter' ? 'yes' : 'somewhat', workoutSplit: value === 'recommend' ? undefined : answers.workoutSplit, customWorkoutSplit: value === 'recommend' ? undefined : answers.customWorkoutSplit })} />
          {answers.workoutSplitStatus && answers.workoutSplitStatus !== 'recommend' ? (
            <>
              <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Split template</Text>
              <ChoiceList choices={[{ label: 'Push / Pull / Legs', value: 'push_pull_legs' }, { label: 'Upper / Lower', value: 'upper_lower' }, { label: 'Full Body', value: 'full_body' }, { label: 'Body-part split', value: 'body_part_split' }, { label: 'Custom builder', value: 'custom' }]} selected={answers.workoutSplit} onSelect={(value) => store.updateAnswers({ workoutSplit: value, customWorkoutSplit: value === 'custom' ? answers.customWorkoutSplit : undefined })} />
            </>
          ) : null}
          {answers.workoutSplit === 'custom' ? (
            <>
              <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Custom focus days</Text>
              <MultiChoiceList values={customSplitFocuses} selected={splitList(answers.customWorkoutSplit ?? '')} onChange={(values) => store.updateAnswers({ customWorkoutSplit: values.join(', ') })} />
            </>
          ) : null}
        </View>
      );

    case 'workout_split_entry':
      return <ChoiceList choices={[{ label: 'Push / Pull / Legs', value: 'push_pull_legs' }, { label: 'Upper / Lower', value: 'upper_lower' }, { label: 'Full Body', value: 'full_body' }, { label: 'Body-part split', value: 'body_part_split' }, { label: 'Custom', value: 'custom' }]} selected={answers.workoutSplit} onSelect={(value) => store.updateAnswers({ workoutSplit: value })} />;

    case 'limitations':
      return <ChoiceList choices={[{ label: 'No limitations', value: 'none' }, { label: 'Injury history', value: 'injury_or_limitation' }, { label: 'Clinician-advised restriction', value: 'clinician_restriction' }, { label: 'Exercise to avoid', value: 'exercise_to_avoid' }, { label: 'Training limitation', value: 'movement_discomfort' }]} selected={answers.limitations?.[0]?.type ?? 'none'} onSelect={(value) => store.updateAnswers({ limitations: value === 'none' ? [] : [{ id: `limitation-${value}`, type: value, description: value.replace(/_/g, ' '), sensitivity: value === 'clinician_restriction' ? 'sensitive' : 'standard' }] })} />;

    case 'nutrition_diet':
      return (
        <View style={styles.stack}>
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Diet pattern</Text>
          <ChoiceList choices={dietPatterns} selected={answers.dietPattern ?? answers.eatingStyles?.[0]} onSelect={(value) => store.updateAnswers({ dietPattern: value, eatingStyles: [value] })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Macro preference</Text>
          <ChoiceList choices={macroPreferenceChoices} selected={answers.macroPreference} onSelect={(value) => store.updateAnswers({ macroPreference: value })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Targets</Text>
          <ChoiceList choices={[{ label: 'Build all targets for me', value: 'recommend_everything' }, { label: 'I know calories only', value: 'recommend_macros' }, { label: 'I know macros only', value: 'recommend_calories' }, { label: 'I know calories and macros', value: 'manual' }]} selected={answers.nutritionTargetPreference} onSelect={(value) => store.updateAnswers({ nutritionTargetPreference: value, targetKnowledge: value === 'recommend_everything' ? 'recommend_everything' : value === 'manual' ? 'know_targets' : 'know_some', manualTargets: value === 'recommend_everything' ? { status: 'not_used' } : { status: 'in_progress' } })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Meals per day</Text>
          <ChoiceList choices={[{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5+', value: '5' }, { label: 'No preference', value: '0' }]} selected={answers.mealsPerDay ? String(answers.mealsPerDay) : '0'} onSelect={(value) => store.updateAnswers(value === '0' ? { mealsPerDay: undefined, mealPlanStructure: undefined } : { mealsPerDay: Number(value), mealPlanStructure: `${value} meals per day` })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Food restrictions</Text>
          <ChoiceList choices={[{ label: 'No restrictions', value: 'none' }, { label: 'Allergies', value: 'allergies' }, { label: 'Intolerances', value: 'intolerances' }, { label: 'Vegetarian / vegan', value: 'ethical' }, { label: 'Clinician-directed restriction', value: 'clinician' }]} selected={answers.restrictionsStatus === 'answered_none' ? 'none' : answers.restrictions?.[0]} onSelect={(value) => store.updateAnswers(value === 'none' ? { restrictionsStatus: 'answered_none', restrictions: [] } : { restrictionsStatus: 'answered_with_restrictions', restrictions: [value] })} />
        </View>
      );

    case 'nutrition_target_preference':
      return <ChoiceList choices={[{ label: 'Yes, recommend everything', value: 'recommend_everything' }, { label: 'Recommend calories only', value: 'recommend_calories' }, { label: 'Recommend macros only', value: 'recommend_macros' }, { label: 'No, I’ll enter my own', value: 'manual' }]} selected={answers.nutritionTargetPreference} onSelect={(value) => store.updateAnswers({ nutritionTargetPreference: value })} />;

    case 'meal_preference':
      return <ChoiceList choices={[{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '5+', value: '5' }, { label: 'No preference', value: '0' }]} selected={answers.mealsPerDay ? String(answers.mealsPerDay) : undefined} onSelect={(value) => store.updateAnswers(value === '0' ? { mealsPerDay: undefined } : { mealsPerDay: Number(value), mealPlanStructure: `${value} meals per day` })} />;

    case 'nutrition_optional':
      return <InputGrid inputs={[
        ['Foods to avoid', nutritionInputs.foodsToAvoid, (value) => setNutritionInputs((s) => ({ ...s, foodsToAvoid: value }))],
        ['Allergies', nutritionInputs.allergies, (value) => setNutritionInputs((s) => ({ ...s, allergies: value }))],
        ['Favorite proteins', nutritionInputs.proteins, (value) => setNutritionInputs((s) => ({ ...s, proteins: value }))],
        ['Eating schedule', nutritionInputs.eatingSchedule, (value) => setNutritionInputs((s) => ({ ...s, eatingSchedule: value }))],
        ['Meal prep preference', nutritionInputs.mealPrep, (value) => setNutritionInputs((s) => ({ ...s, mealPrep: value }))],
      ]} />;

    case 'restrictions':
      return <ChoiceList choices={[{ label: 'No restrictions', value: 'none' }, { label: 'Allergies', value: 'allergies' }, { label: 'Intolerances', value: 'intolerances' }, { label: 'Vegetarian / vegan', value: 'ethical' }, { label: 'Clinician-directed restriction', value: 'clinician' }]} selected={answers.restrictionsStatus === 'answered_none' ? 'none' : answers.restrictions?.[0]} onSelect={(value) => store.updateAnswers(value === 'none' ? { restrictionsStatus: 'answered_none', restrictions: [] } : { restrictionsStatus: 'answered_with_restrictions', restrictions: [value] })} />;

    case 'cardio_current':
      return (
        <View style={styles.stack}>
          <ChoiceList choices={[{ label: 'No cardio right now', value: 'none' }, { label: 'Sometimes', value: 'sometimes' }, { label: 'Weekly', value: 'weekly' }, { label: 'Specific cardio plan', value: 'specific_plan' }]} selected={answers.cardioStatus} onSelect={(value) => store.updateAnswers({ cardioStatus: value })} />
          {answers.cardioStatus === 'weekly' || answers.cardioStatus === 'specific_plan' ? (
            <>
              <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Sessions</Text>
              <ChoiceList choices={[1, 2, 3, 4, 5].map((value) => ({ label: `${value} / week`, value: String(value) }))} selected={String(answers.cardioSessionsPerWeek ?? '')} onSelect={(value) => store.updateAnswers({ cardioSessionsPerWeek: Number(value) })} />
              <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Duration</Text>
              <ChoiceList choices={[15, 25, 35, 45, 60].map((value) => ({ label: `${value} minutes`, value: String(value) }))} selected={String(answers.cardioDurationMinutes ?? '')} onSelect={(value) => store.updateAnswers({ cardioDurationMinutes: Number(value) })} />
              <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Type</Text>
              <ChoiceList choices={['walking', 'cycling', 'running', 'stairs', 'mixed'].map((value) => ({ label: formatLabel(value), value }))} selected={answers.cardioType} onSelect={(value) => store.updateAnswers({ cardioType: value })} />
            </>
          ) : null}
        </View>
      );

    case 'cardio_details':
      return <InputGrid inputs={[
        ['Sessions per week', cardioInputs.sessions, (value) => setCardioInputs((s) => ({ ...s, sessions: value })), true],
        ['Duration', cardioInputs.duration, (value) => setCardioInputs((s) => ({ ...s, duration: value })), true],
        ['Type', cardioInputs.type, (value) => setCardioInputs((s) => ({ ...s, type: value }))],
        ['Intensity', cardioInputs.intensity, (value) => setCardioInputs((s) => ({ ...s, intensity: value }))],
      ]} />;

    case 'steps_tracking':
      return (
        <View style={styles.stack}>
          <ChoiceList choices={[{ label: 'No', value: 'no' }, { label: 'Yes, but no target', value: 'yes_no_target' }, { label: 'Yes, I have a daily step target', value: 'yes_with_target' }]} selected={answers.stepTrackingStatus} onSelect={(value) => store.updateAnswers({ stepTrackingStatus: value })} />
          {answers.stepTrackingStatus === 'yes_with_target' ? <ChoiceList choices={[6000, 8000, 10000, 12000, 15000].map((value) => ({ label: `${value.toLocaleString()} steps`, value: String(value) }))} selected={String(answers.dailyStepGoal ?? '')} onSelect={(value) => store.updateAnswers({ dailyStepGoal: Number(value) })} /> : null}
        </View>
      );

    case 'recovery_lifestyle':
      return (
        <View style={styles.stack}>
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Average sleep</Text>
          <ChoiceList choices={[{ label: 'Under 6 hours', value: '5.5' }, { label: '6-7 hours', value: '6.5' }, { label: '7-8 hours', value: '7.5' }, { label: '8+ hours', value: '8.5' }]} selected={String(answers.averageSleepHours ?? '')} onSelect={(value) => store.updateAnswers({ averageSleepHours: Number(value) })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Stress</Text>
          <ChoiceList choices={[{ label: 'Low stress', value: 'low' }, { label: 'Moderate stress', value: 'moderate' }, { label: 'High stress', value: 'high' }, { label: 'Very high stress', value: 'very_high' }]} selected={answers.stressLevel} onSelect={(value) => store.updateAnswers({ stressLevel: value })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Recovery flags</Text>
          <MultiChoiceList values={recoveryConcerns} selected={answers.recoveryConcerns ?? []} onChange={(values) => store.updateAnswers({ recoveryConcerns: values })} />
        </View>
      );

    case 'coaching_style':
      return (
        <View style={styles.stack}>
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Tone</Text>
          <ChoiceList choices={[{ label: 'Direct', value: 'direct' }, { label: 'Balanced', value: 'balanced' }, { label: 'Encouraging', value: 'encouraging' }]} selected={answers.coachingStyle} onSelect={(value) => store.updateAnswers({ coachingStyle: value })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Answer length</Text>
          <ChoiceList choices={[{ label: 'Quick answers', value: 'quick' }, { label: 'Standard explanations', value: 'standard' }, { label: 'Detailed coaching', value: 'detailed' }]} selected={answers.responseDetail} onSelect={(value) => store.updateAnswers({ responseDetail: value })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Accountability</Text>
          <ChoiceList choices={[{ label: 'Only when I ask', value: 'on_request' }, { label: 'Gentle reminders', value: 'gentle' }, { label: 'Regular check-ins', value: 'regular' }, { label: 'Strong accountability', value: 'strong' }]} selected={answers.accountability} onSelect={(value) => store.updateAnswers({ accountability: value })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Appearance</Text>
          <ChoiceList choices={[{ label: 'Dark', value: 'dark' }, { label: 'Light', value: 'light' }, { label: 'System', value: 'system' }]} selected={answers.appearance} onSelect={(value) => store.updateAnswers({ appearance: value })} />
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.inputLabel}>Memory</Text>
          <ChoiceList choices={[{ label: 'Remember my profile and preferences', value: 'enabled' }, { label: 'Ask before saving new preferences', value: 'ask_first' }, { label: 'Do not save learned preferences', value: 'disabled' }]} selected={answers.memoryPreference} onSelect={(value) => store.updateAnswers({ memoryPreference: value })} />
        </View>
      );

    case 'appearance':
      return <ChoiceList choices={[{ label: 'Dark', value: 'dark' }, { label: 'Light', value: 'light' }, { label: 'System', value: 'system' }]} selected={answers.appearance} onSelect={(value) => store.updateAnswers({ appearance: value })} />;

    case 'response_detail':
      return <ChoiceList choices={[{ label: 'Quick answers', value: 'quick' }, { label: 'Standard explanations', value: 'standard' }, { label: 'Detailed coaching', value: 'detailed' }]} selected={answers.responseDetail} onSelect={(value) => store.updateAnswers({ responseDetail: value })} />;

    case 'accountability':
      return <ChoiceList choices={[{ label: 'Only when I ask', value: 'on_request' }, { label: 'Gentle reminders', value: 'gentle' }, { label: 'Regular check-ins', value: 'regular' }, { label: 'Strong accountability', value: 'strong' }]} selected={answers.accountability} onSelect={(value) => store.updateAnswers({ accountability: value })} />;

    case 'username':
      return (
        <View style={styles.stack}>
          <TextInputGroup label="Handle (e.g. michael_ft)" value={usernameInput} onChangeText={setUsernameInput} placeholder="your_handle" />
          <Text variant="caption" color={theme.colors.text.secondary}>Lowercase letters, numbers, and underscores only. Used to restore your profile quickly during testing.</Text>
        </View>
      );

    case 'memory_consent':
      return <ChoiceList choices={[{ label: 'Remember my profile and preferences', value: 'enabled' }, { label: 'Ask before saving new preferences', value: 'ask_first' }, { label: 'Do not save learned preferences', value: 'disabled' }]} selected={answers.memoryPreference} onSelect={(value) => store.updateAnswers({ memoryPreference: value })} />;

    case 'integrations':
      return <MultiChoiceList values={['apple_health_later', 'apple_watch_later', 'smart_scale_later', 'garmin_later', 'fitbit_later', 'oura_later', 'whoop_later']} selected={answers.integrationInterest ?? []} onChange={(values) => store.updateAnswers({ integrationInterest: values })} suffix="Coming later" />;

    case 'plan_generation':
      return <GenerationChecklist ready={generationReady} />;

    case 'plan_preview': {
      const plan = store.plan ?? generateInitialPlan(answers);
      const calories = plan.macros.calories.active.toLocaleString();
      const goalPhrase = getGoalOutcomePhrase(answers.primaryGoal);
      return (
        <View style={styles.stack}>
          <View style={[styles.calorieBanner, { backgroundColor: theme.colors.surface.default, borderColor: theme.colors.persona.core }]}>
            <Text variant="caption" color={theme.colors.text.secondary} style={styles.calorieBannerLabel}>YOUR DAILY TARGET</Text>
            <Text variant="headingLarge" color={theme.colors.persona.core} style={styles.calorieNumber}>{calories}</Text>
            <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.calorieBannerLabel}>CALORIES PER DAY</Text>
          </View>
          {goalPhrase ? (
            <View style={[styles.outcomeRow, { borderColor: theme.colors.border.subtle }]}>
              <Text variant="bodyMedium" color={theme.colors.text.secondary}>{goalPhrase}</Text>
              <Text variant="caption" color={theme.colors.text.secondary} style={{ marginTop: 4 }}>Expected rate: {plan.expectedRate}</Text>
            </View>
          ) : null}
          <PlanSummary plan={plan} />
          {store.safety?.message ? <Text variant="bodyMedium" color={theme.colors.status.warning}>{store.safety.message}</Text> : null}
          <View style={styles.adjustRow}>
            <SmallButton label="-100 calories" onPress={() => adjustCalories(plan, -100)} />
            <SmallButton label="+100 calories" onPress={() => adjustCalories(plan, 100)} />
          </View>
          <SmallButton label="Adjust plan" onPress={() => store.back()} />
          <Text variant="caption" color={theme.colors.text.secondary}>Confirming saves your profile, biometrics, goals, nutrition targets, training split, and coach preferences.</Text>
        </View>
      );
    }

    default:
      return null;
  }
}

function GenerationChecklist({ ready }: { ready: boolean }) {
  const theme = useActiveTheme();
  const items = ['Analyzing biometric profile', 'Calculating calorie needs', 'Optimizing macro targets', 'Designing your training split', 'Building your recovery strategy', 'Personalizing your AI coach'];
  return (
    <View style={[styles.generationCard, { backgroundColor: theme.colors.surface.default, borderColor: theme.colors.border.default }]}> 
      {items.map((item, index) => (
        <View key={item} style={styles.checkRow}>
          <View style={[styles.checkDot, { backgroundColor: ready || index < 4 ? theme.colors.persona.core : theme.colors.surface.subtle }]} />
          <Text variant="bodyMedium" color={theme.colors.text.primary}>{item}</Text>
        </View>
      ))}
      <Text variant="caption" color={theme.colors.text.secondary}>{ready ? 'Your starting plan is ready to review.' : 'Building recommendations from your answers...'}</Text>
    </View>
  );
}

function ChoiceList<T extends string>({ choices, selected, onSelect }: { choices: ReadonlyArray<Choice<T>>; selected?: T | string; onSelect: (value: T) => void }) {
  return (
    <View style={styles.stack}>
      {choices.map((choice) => (
        <ChoiceCard key={choice.value} label={choice.label} description={choice.description} selected={selected === choice.value} onPress={() => onSelect(choice.value)} />
      ))}
    </View>
  );
}

function MultiChoiceList({ values, selected, onChange, suffix }: { values: string[] | readonly string[]; selected: string[]; onChange: (values: string[]) => void; suffix?: string }) {
  return (
    <View style={styles.stack}>
      {values.map((value) => {
        const isSelected = selected.includes(value);
        return (
          <ChoiceCard key={value} label={formatLabel(value)} description={suffix} selected={isSelected} onPress={() => onChange(isSelected ? selected.filter((item) => item !== value) : [...selected, value])} />
        );
      })}
    </View>
  );
}

function InputGrid({ inputs }: { inputs: Array<[string, string, (value: string) => void, boolean?]> }) {
  return (
    <View style={styles.inputGrid}>
      {inputs.map(([label, value, onChange, numeric]) => <TextInputGroup key={label} label={label} value={value} onChangeText={onChange} numeric={numeric} />)}
    </View>
  );
}

function TextInputGroup({ label, value, onChangeText, placeholder = 'Skip for now', numeric = false }: { label: string; value: string; onChangeText: (value: string) => void; placeholder?: string; numeric?: boolean }) {
  const theme = useActiveTheme();
  return (
    <View style={styles.inputWrap}>
      <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.inputLabel}>{label}</Text>
      <TextInput keyboardType={numeric ? 'numeric' : 'default'} value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={theme.colors.text.disabled} style={[styles.input, { color: theme.colors.text.primary, borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.default }]} />
    </View>
  );
}

function SmallButton({ label, onPress }: { label: string; onPress: () => void }) {
  const theme = useActiveTheme();
  return (
    <TouchableOpacity accessibilityRole="button" onPress={onPress} style={[styles.smallButton, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.translucent }]}> 
      <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.smallButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

function numberOrUndefined(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function splitList(value: string) {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function getGoalAffirmationTitle(goal?: string): string {
  switch (goal) {
    case 'muscle_gain': return 'Good. Let\'s build something.';
    case 'fat_loss': return 'Smart choice. Let\'s be precise about it.';
    case 'recomposition': return 'The hardest goal — and the most rewarding.';
    case 'strength': return 'Strength is the foundation of everything.';
    case 'athletic_performance': return 'Performance is multidimensional.';
    case 'general_health': return 'Health is the long game.';
    case 'maintenance': return 'Maintenance isn\'t passive. Let\'s do it right.';
    default: return 'You\'ve set your focus.';
  }
}

function getGoalOutcomePhrase(goal?: string): string | null {
  switch (goal) {
    case 'muscle_gain': return 'With this plan, you should see measurable muscle and strength gains within 4–6 weeks of consistent training and nutrition.';
    case 'fat_loss': return 'With this plan, you should see steady fat loss while maintaining muscle — progress typically becomes visible within 3–4 weeks.';
    case 'recomposition': return 'With this plan, body composition will shift gradually — the scale may not move much, but your measurements and strength will.';
    case 'strength': return 'With this plan, you should hit meaningful strength PRs within 6–8 weeks of consistent progressive overload.';
    case 'athletic_performance': return 'With this plan, performance metrics should improve within 4–6 weeks of combined training and recovery.';
    case 'general_health': return 'With this plan, you should feel the difference in energy, sleep quality, and daily output within 2–3 weeks.';
    case 'maintenance': return 'With this plan, your weight and body composition should stay stable as activity and nutrition stay dialed in.';
    default: return null;
  }
}

function getGoalAffirmationBody(goal?: string): string {
  switch (goal) {
    case 'muscle_gain': return 'Muscle gain comes down to three things: progressive training, a protein surplus, and consistency. Form Theory will dial in all three and adjust your plan as your body adapts.';
    case 'fat_loss': return 'Sustainable fat loss means protecting muscle while you\'re in a deficit. Form Theory will set a smart starting target and recalibrate when progress stalls.';
    case 'recomposition': return 'Recomposition requires tracking both training output and body composition simultaneously. Form Theory monitors both and shifts your targets when the data tells it to.';
    case 'strength': return 'Progressive overload, managed fatigue, smart recovery — that\'s the formula. Form Theory tracks your lifts week over week and tells you when to push and when to back off.';
    case 'athletic_performance': return 'Performance training touches strength, conditioning, mobility, and recovery. Form Theory builds a plan covering all four and adapts based on your training load.';
    case 'general_health': return 'No single metric tells the whole story. Form Theory tracks nutrition, movement, sleep, and energy together so you always know where you actually stand.';
    case 'maintenance': return 'As your body adapts, your true maintenance calories shift. Form Theory keeps your targets recalibrated over time — so staying the same doesn\'t quietly become falling behind.';
    default: return 'Form Theory will build a personalized plan around what matters most to you right now.';
  }
}

function formatLabel(value: string) {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  centered: { alignItems: 'center', gap: spacing[5] },
  logo: { width: 88, height: 88 },
  centerText: { textAlign: 'center', lineHeight: 25, maxWidth: 520 },
  stack: { gap: spacing[3] },
  inputGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3] },
  inputWrap: { minWidth: 140, flex: 1, gap: spacing[2] },
  inputLabel: { letterSpacing: 0.3 },
  input: { minHeight: 48, borderWidth: 1, borderRadius: radius.md, paddingHorizontal: spacing[4], fontFamily: fontFamilies.sans, fontSize: 15, fontWeight: '400' },
  generationCard: { borderRadius: radius.xl, borderWidth: 1, padding: spacing[5], gap: spacing[4] },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  checkDot: { width: 12, height: 12, borderRadius: 6 },
  adjustRow: { flexDirection: 'row', gap: spacing[3] },
  affirmationGoalPill: { alignSelf: 'flex-start', borderRadius: 8, paddingHorizontal: spacing[5], paddingVertical: spacing[2] },
  affirmationPillText: { letterSpacing: 0.3 },
  affirmationBody: { lineHeight: 27 },
  affirmationDivider: { height: 1, marginVertical: spacing[2] },
  shortcutButton: { marginTop: spacing[2], paddingHorizontal: spacing[5], paddingVertical: spacing[3], borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  calorieBanner: { borderRadius: radius.xl, borderWidth: 2, padding: spacing[6], alignItems: 'center', gap: spacing[1] },
  calorieBannerLabel: { letterSpacing: 0.5 },
  calorieNumber: { fontSize: 48, lineHeight: 56, fontWeight: '700' },
  outcomeRow: { borderWidth: 1, borderRadius: radius.lg, padding: spacing[4], gap: spacing[1] },
  smallButton: { minHeight: 42, borderRadius: 8, borderWidth: 1, paddingHorizontal: spacing[4], alignItems: 'center', justifyContent: 'center' },
  smallButtonText: { letterSpacing: 0.3 },
});
