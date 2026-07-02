import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/shared/components/ui/Screen';
import { PageHero } from '../../src/shared/components/ui/PageHero';
import { Card } from '../../src/shared/components/ui/Card';
import { Text } from '../../src/shared/components/ui/Text';
import { useActiveTheme } from '../../src/shared/theme/useActiveTheme';
import { radius, spacing } from '../../src/shared/theme/spacing';
import { useUserStore, fallbackUserProfile } from '../../src/store/userStore';
import { useNutritionStore } from '../../src/store/nutritionStore';
import { useProgressStore } from '../../src/store/progressStore';
import { useCoachStore } from '../../src/features/coach/store/coachStore';
import { useOnboardingStore } from '../../src/features/onboarding/store/onboardingStore';
import { kgToLbs, lbsToKg, inchesToCm, cmToInches } from '../../src/features/onboarding/services/unitConversion';
import type { AppearancePreference, CoachingStyle } from '../../src/features/coach/styles/coachingStyles';
import type { DailyMacroPlanDay, InitialPlan, WeeklyPlanDay } from '../../src/features/onboarding/types';
import type { MemoryPreference, PrimaryGoal, UserProfile } from '../../src/types';

type ProfileForm = {
  firstName: string;
  primaryGoal: PrimaryGoal;
  currentWeight: string;
  targetWeight: string;
  height: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  trainingDays: string;
  equipment: string;
  restrictions: string;
  coachingStyle: CoachingStyle;
  appearance: AppearancePreference;
  memoryPreference: MemoryPreference;
};

const goalChoices: Array<{ label: string; value: PrimaryGoal }> = [
  { label: 'Fat loss', value: 'fat_loss' },
  { label: 'Muscle gain', value: 'muscle_gain' },
  { label: 'Strength', value: 'strength' },
  { label: 'Recomposition', value: 'recomposition' },
  { label: 'Cardio fitness', value: 'cardiovascular_fitness' },
  { label: 'Endurance', value: 'endurance' },
  { label: 'Mobility', value: 'mobility' },
  { label: 'Athletic performance', value: 'athletic_performance' },
  { label: 'Healthy aging', value: 'healthy_aging' },
  { label: 'Event prep', value: 'event_preparation' },
  { label: 'Health', value: 'general_health' },
  { label: 'Maintain', value: 'maintenance' },
  { label: 'Custom', value: 'custom' },
];

const coachingStyleChoices: Array<{ label: string; value: CoachingStyle }> = [
  { label: 'Direct', value: 'direct' },
  { label: 'Balanced', value: 'balanced' },
  { label: 'Encouraging', value: 'encouraging' },
];

const appearanceChoices: Array<{ label: string; value: AppearancePreference }> = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
  { label: 'System', value: 'system' },
];

const memoryChoices: Array<{ label: string; value: MemoryPreference }> = [
  { label: 'Save', value: 'enabled' },
  { label: 'Ask first', value: 'ask_first' },
  { label: 'Off', value: 'disabled' },
];

export default function ProfileScreen() {
  const theme = useActiveTheme();
  const profile = useUserStore((state) => state.profile) ?? fallbackUserProfile;
  const setProfile = useUserStore((state) => state.setProfile);
  const setNutritionGoals = useNutritionStore((state) => state.setGoals);
  const updateCurrentWeight = useProgressStore((state) => state.updateCurrentWeight);
  const updateGoalWeight = useProgressStore((state) => state.updateGoalWeight);
  const setCoachingStyle = useCoachStore((state) => state.setCoachingStyle);
  const setAppearance = useCoachStore((state) => state.setAppearance);
  const activePlan = useOnboardingStore((state) => state.plan);
  const resetOnboarding = useOnboardingStore((state) => state.reset);
  const [form, setForm] = useState<ProfileForm>(() => profileToForm(profile));
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [isPlanVisible, setIsPlanVisible] = useState(false);
  const [isMacroPlanVisible, setIsMacroPlanVisible] = useState(false);

  useEffect(() => {
    setForm(profileToForm(profile));
  }, [profile.id]);

  const setField = <Key extends keyof ProfileForm>(key: Key, value: ProfileForm[Key]) => {
    setSavedAt(null);
    setForm((current) => ({ ...current, [key]: value }));
  };

  const saveProfile = () => {
    const currentWeightKg = weightInputToKg(form.currentWeight, profile);
    const targetWeightKg = weightInputToKg(form.targetWeight, profile);
    const heightCm = heightInputToCm(form.height, profile);
    const calories = numberOrFallback(form.calories, profile.goals.calories);
    const proteinGrams = numberOrFallback(form.protein, profile.goals.proteinGrams);
    const carbsGrams = numberOrFallback(form.carbs, profile.goals.carbsGrams);
    const fatGrams = numberOrFallback(form.fat, profile.goals.fatGrams);
    const trainingDays = numberOrFallback(form.trainingDays, profile.training.daysPerWeek === 'varies' ? 3 : profile.training.daysPerWeek);
    const equipment = splitList(form.equipment);
    const restrictions = splitList(form.restrictions);

    const nextProfile: UserProfile = {
      ...profile,
      name: form.firstName || profile.name,
      identity: {
        ...profile.identity,
        firstName: form.firstName || undefined,
      },
      body: {
        ...profile.body,
        currentWeightKg,
        targetWeightKg: targetWeightKg || undefined,
        heightCm,
      },
      planGoals: {
        ...profile.planGoals,
        primaryGoal: form.primaryGoal,
      },
      training: {
        ...profile.training,
        daysPerWeek: trainingDays,
        equipment,
      },
      nutrition: {
        ...profile.nutrition,
        restrictions,
        restrictionsStatus: restrictions.length ? 'answered_with_restrictions' : 'answered_none',
      },
      preferences: {
        ...profile.preferences,
        coachingStyle: form.coachingStyle,
        appearance: form.appearance,
        memoryPreference: form.memoryPreference,
      },
      goals: {
        ...profile.goals,
        calories,
        proteinGrams,
        carbsGrams,
        fatGrams,
        weightGoalKg: targetWeightKg || profile.goals.weightGoalKg,
      },
    };

    setProfile(nextProfile);
    setNutritionGoals({ calories, proteinGrams, carbsGrams, fatGrams });
    updateCurrentWeight(kgToLbs(currentWeightKg));
    if (targetWeightKg) updateGoalWeight(kgToLbs(targetWeightKg));
    setCoachingStyle(form.coachingStyle);
    setAppearance(form.appearance);
    setSavedAt(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
  };

  const weightUnit = profile.weightUnit === 'lbs' ? 'lb' : 'kg';
  const heightUnit = profile.identity.units === 'imperial' ? 'in' : 'cm';
  const startNewPlan = () => {
    resetOnboarding();
    router.replace('/onboarding');
  };

  return (
    <Screen scrollable horizontalPadding={spacing[4]}>
      <View style={styles.header}>
        <PageHero
          eyebrow="Profile"
          title="Starting profile"
          detail="Edit the saved facts Form Theory uses for targets, coaching, and plan context."
        />
      </View>

      <ActivePlanSection
        plan={activePlan}
        visible={isPlanVisible}
        macroPlanVisible={isMacroPlanVisible}
        onToggle={() => setIsPlanVisible((value) => !value)}
        onToggleMacroPlan={() => setIsMacroPlanVisible((value) => !value)}
        onCreateNewPlan={startNewPlan}
      />

      <ProfileSection title="Essentials">
        <Input label="First name" value={form.firstName} onChangeText={(value) => setField('firstName', value)} />
        <SegmentedChoices choices={goalChoices} selected={form.primaryGoal} onSelect={(value) => setField('primaryGoal', value)} />
        <View style={styles.inputRow}>
          <Input label={`Current weight (${weightUnit})`} value={form.currentWeight} onChangeText={(value) => setField('currentWeight', value)} keyboardType="numeric" />
          <Input label={`Target weight (${weightUnit})`} value={form.targetWeight} onChangeText={(value) => setField('targetWeight', value)} keyboardType="numeric" />
        </View>
        <Input label={`Height (${heightUnit})`} value={form.height} onChangeText={(value) => setField('height', value)} keyboardType="numeric" />
      </ProfileSection>

      <ProfileSection title="Nutrition Targets">
        <View style={styles.inputRow}>
          <Input label="Calories" value={form.calories} onChangeText={(value) => setField('calories', value)} keyboardType="numeric" />
          <Input label="Protein" value={form.protein} onChangeText={(value) => setField('protein', value)} keyboardType="numeric" />
        </View>
        <View style={styles.inputRow}>
          <Input label="Carbs" value={form.carbs} onChangeText={(value) => setField('carbs', value)} keyboardType="numeric" />
          <Input label="Fat" value={form.fat} onChangeText={(value) => setField('fat', value)} keyboardType="numeric" />
        </View>
        <Input label="Restrictions" value={form.restrictions} onChangeText={(value) => setField('restrictions', value)} placeholder="None, vegetarian, gluten-free" />
      </ProfileSection>

      <ProfileSection title="Training Preferences">
        <Input label="Training days per week" value={form.trainingDays} onChangeText={(value) => setField('trainingDays', value)} keyboardType="numeric" />
        <Input label="Equipment" value={form.equipment} onChangeText={(value) => setField('equipment', value)} placeholder="Full gym, dumbbells, bands" />
      </ProfileSection>

      <ProfileSection title="Coach Preferences">
        <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.fieldLabel}>Coaching style</Text>
        <SegmentedChoices choices={coachingStyleChoices} selected={form.coachingStyle} onSelect={(value) => setField('coachingStyle', value)} />
        <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.fieldLabel}>Appearance</Text>
        <SegmentedChoices choices={appearanceChoices} selected={form.appearance} onSelect={(value) => setField('appearance', value)} />
        <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.fieldLabel}>Memory</Text>
        <SegmentedChoices choices={memoryChoices} selected={form.memoryPreference} onSelect={(value) => setField('memoryPreference', value)} />
      </ProfileSection>

      <TouchableOpacity accessibilityRole="button" activeOpacity={0.85} onPress={saveProfile} style={[styles.saveButton, { backgroundColor: theme.colors.persona.core }]}> 
        <Text variant="labelLarge" color={theme.colors.text.inverse} style={styles.saveText}>Save profile</Text>
      </TouchableOpacity>
      {savedAt ? (
        <Text variant="caption" color={theme.colors.text.secondary} style={styles.savedText}>Saved at {savedAt}</Text>
      ) : null}
    </Screen>
  );
}

function ActivePlanSection({ plan, visible, macroPlanVisible, onToggle, onToggleMacroPlan, onCreateNewPlan }: { plan: InitialPlan | null; visible: boolean; macroPlanVisible: boolean; onToggle: () => void; onToggleMacroPlan: () => void; onCreateNewPlan: () => void }) {
  const theme = useActiveTheme();
  return (
    <Card style={styles.section}>
      <View style={styles.planHeaderRow}>
        <View style={styles.planHeaderCopy}>
          <Text variant="headingSmall" color={theme.colors.text.primary}>Active Fitness Plan</Text>
          <Text variant="caption" color={theme.colors.text.secondary} style={styles.planCaption}>
            {plan ? `${plan.goalLabel} · ${plan.training.daysPerWeek} training days · ${plan.macros.calories.active.toLocaleString()} calories` : 'Complete onboarding to generate your detailed coaching plan.'}
          </Text>
        </View>
        <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={onToggle} disabled={!plan} style={[styles.secondaryButton, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.subtle, opacity: plan ? 1 : 0.45 }]}> 
          <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.secondaryButtonText}>{visible ? 'Hide plan' : 'Show plan'}</Text>
        </TouchableOpacity>
      </View>

      {plan && visible ? <PlanDetails plan={plan} macroPlanVisible={macroPlanVisible} onToggleMacroPlan={onToggleMacroPlan} /> : null}

      <TouchableOpacity accessibilityRole="button" activeOpacity={0.85} onPress={onCreateNewPlan} style={[styles.createPlanButton, { borderColor: theme.colors.border.persona, backgroundColor: theme.colors.surface.selected }]}> 
        <Text variant="labelLarge" color={theme.colors.persona.core} style={styles.saveText}>Create new plan</Text>
      </TouchableOpacity>
    </Card>
  );
}

function PlanDetails({ plan, macroPlanVisible, onToggleMacroPlan }: { plan: InitialPlan; macroPlanVisible: boolean; onToggleMacroPlan: () => void }) {
  const theme = useActiveTheme();
  const weeklySchedule = getWeeklySchedule(plan);
  const dailyMacroPlan = getDailyMacroPlan(plan, weeklySchedule);
  return (
    <View style={styles.planDetails}>
      <View style={styles.planMetricGrid}>
        <PlanMetric label="Calories" value={`${plan.macros.calories.active.toLocaleString()}`} />
        <PlanMetric label="Protein" value={`${plan.macros.proteinGrams.active}g`} />
        <PlanMetric label="Carbs" value={`${plan.macros.carbsGrams.active}g`} />
        <PlanMetric label="Fat" value={`${plan.macros.fatGrams.active}g`} />
        <PlanMetric label="Training" value={`${plan.training.daysPerWeek} days`} />
        <PlanMetric label="Cardio" value={`${plan.cardio.sessionsPerWeek} x ${plan.cardio.minutesPerSession}m`} />
        <PlanMetric label="Steps" value={plan.dailyStepGoal.active.toLocaleString()} />
        <PlanMetric label="Review" value={plan.firstReviewDate} />
      </View>

      <View style={[styles.planBlock, { borderColor: theme.colors.border.subtle }]}> 
        <View style={styles.planSectionHeader}>
          <View style={styles.planHeaderCopy}>
            <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.fieldLabel}>Weekly calendar</Text>
            <Text variant="bodyMedium" color={theme.colors.text.primary}>{plan.training.split}</Text>
          </View>
          <TouchableOpacity accessibilityRole="button" activeOpacity={0.8} onPress={onToggleMacroPlan} style={[styles.secondaryButton, { borderColor: theme.colors.border.default, backgroundColor: theme.colors.surface.subtle }]}> 
            <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.secondaryButtonText}>{macroPlanVisible ? 'Hide macros' : 'View macros'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarGrid}>
          {weeklySchedule.map((day) => <CalendarDay key={day.day} day={day} />)}
        </View>
      </View>

      {macroPlanVisible ? (
        <View style={[styles.planBlock, { borderColor: theme.colors.border.subtle }]}> 
          <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.fieldLabel}>Personalized macro plan</Text>
          <View style={styles.macroDayList}>
            {dailyMacroPlan.map((day) => <MacroDayRow key={day.day} day={day} />)}
          </View>
        </View>
      ) : null}

      <View style={[styles.planBlock, { borderColor: theme.colors.border.subtle }]}> 
        <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.fieldLabel}>Nutrition and cardio</Text>
        <Text variant="bodyMedium" color={theme.colors.text.primary}>{plan.mealStructure}</Text>
        <Text variant="caption" color={theme.colors.text.secondary}>{plan.cardio.activity} · {plan.cardio.intensity}</Text>
      </View>

      <Text variant="caption" color={theme.colors.text.secondary} style={styles.planCaption}>{plan.explanation}</Text>
    </View>
  );
}

function CalendarDay({ day }: { day: WeeklyPlanDay }) {
  const theme = useActiveTheme();
  const isRecovery = day.focus === 'recovery';
  return (
    <View style={[styles.calendarDay, { backgroundColor: isRecovery ? theme.colors.surface.subtle : theme.colors.surface.selected, borderColor: isRecovery ? theme.colors.border.subtle : theme.colors.border.persona }]}> 
      <Text variant="labelMedium" color={isRecovery ? theme.colors.text.secondary : theme.colors.persona.core} style={styles.dayLabel}>{day.day.slice(0, 3)}</Text>
      <Text variant="labelMedium" color={theme.colors.text.primary} style={styles.calendarTitle}>{day.workoutName ?? (day.cardioActivity ? 'Cardio' : 'Recovery')}</Text>
      {day.cardioActivity && day.workoutName ? <Text variant="caption" color={theme.colors.text.secondary}>{day.cardioMinutes} min {day.cardioActivity}</Text> : null}
      <Text variant="caption" color={theme.colors.text.secondary} numberOfLines={3}>{day.notes}</Text>
    </View>
  );
}

function MacroDayRow({ day }: { day: DailyMacroPlanDay }) {
  const theme = useActiveTheme();
  return (
    <View style={[styles.macroDayRow, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.subtle }]}> 
      <View style={styles.macroDayCopy}>
        <Text variant="labelMedium" color={theme.colors.text.primary} style={styles.workoutName}>{day.day}</Text>
        <Text variant="caption" color={theme.colors.text.secondary}>{formatLabel(day.dayType)} · {day.mealStructure}</Text>
      </View>
      <Text variant="caption" color={theme.colors.text.secondary} style={styles.macroDayTargets}>
        {day.calories.toLocaleString()} kcal · {day.proteinGrams}P / {day.carbsGrams}C / {day.fatGrams}F
      </Text>
    </View>
  );
}

function PlanMetric({ label, value }: { label: string; value: string }) {
  const theme = useActiveTheme();
  return (
    <View style={[styles.planMetric, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.subtle }]}> 
      <Text variant="labelMedium" color={theme.colors.text.muted} style={styles.fieldLabel}>{label}</Text>
      <Text variant="headingSmall" color={theme.colors.text.primary}>{value}</Text>
    </View>
  );
}

function ProfileSection({ title, children }: { title: string; children: React.ReactNode }) {
  const theme = useActiveTheme();
  return (
    <Card style={styles.section}>
      <Text variant="headingSmall" color={theme.colors.text.primary}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </Card>
  );
}

function Input({ label, value, onChangeText, placeholder, keyboardType = 'default' }: { label: string; value: string; onChangeText: (value: string) => void; placeholder?: string; keyboardType?: 'default' | 'numeric' }) {
  const theme = useActiveTheme();
  return (
    <View style={styles.inputGroup}>
      <Text variant="labelMedium" color={theme.colors.text.secondary} style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.disabled}
        keyboardType={keyboardType}
        style={[styles.input, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.default, color: theme.colors.text.primary }]}
      />
    </View>
  );
}

function SegmentedChoices<Value extends string>({ choices, selected, onSelect }: { choices: Array<{ label: string; value: Value }>; selected: Value; onSelect: (value: Value) => void }) {
  const theme = useActiveTheme();
  return (
    <View style={styles.segmentWrap}>
      {choices.map((choice) => {
        const isSelected = choice.value === selected;
        return (
          <TouchableOpacity
            key={choice.value}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            activeOpacity={0.8}
            onPress={() => onSelect(choice.value)}
            style={[styles.segment, { backgroundColor: isSelected ? theme.colors.surface.selected : theme.colors.surface.subtle, borderColor: isSelected ? theme.colors.border.persona : theme.colors.border.default }]}
          >
            <Text variant="labelMedium" color={isSelected ? theme.colors.persona.core : theme.colors.text.secondary} style={styles.segmentText}>{choice.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function profileToForm(profile: UserProfile): ProfileForm {
  const useImperial = profile.identity.units === 'imperial';
  const currentWeight = useImperial ? kgToLbs(profile.body.currentWeightKg) : profile.body.currentWeightKg;
  const targetWeight = profile.body.targetWeightKg ? (useImperial ? kgToLbs(profile.body.targetWeightKg) : profile.body.targetWeightKg) : '';
  const height = useImperial ? cmToInches(profile.body.heightCm) : profile.body.heightCm;

  return {
    firstName: profile.identity.firstName ?? profile.name,
    primaryGoal: profile.planGoals.primaryGoal,
    currentWeight: String(Math.round(currentWeight)),
    targetWeight: targetWeight === '' ? '' : String(Math.round(targetWeight)),
    height: String(Math.round(height)),
    calories: String(profile.goals.calories),
    protein: String(profile.goals.proteinGrams),
    carbs: String(profile.goals.carbsGrams),
    fat: String(profile.goals.fatGrams),
    trainingDays: String(profile.training.daysPerWeek === 'varies' ? '' : profile.training.daysPerWeek),
    equipment: profile.training.equipment.join(', '),
    restrictions: profile.nutrition.restrictions.join(', '),
    coachingStyle: profile.preferences.coachingStyle,
    appearance: profile.preferences.appearance,
    memoryPreference: profile.preferences.memoryPreference,
  };
}

function weightInputToKg(value: string, profile: UserProfile) {
  const parsed = numberOrFallback(value, profile.identity.units === 'imperial' ? kgToLbs(profile.body.currentWeightKg) : profile.body.currentWeightKg);
  return profile.identity.units === 'imperial' ? lbsToKg(parsed) : parsed;
}

function heightInputToCm(value: string, profile: UserProfile) {
  const parsed = numberOrFallback(value, profile.identity.units === 'imperial' ? cmToInches(profile.body.heightCm) : profile.body.heightCm);
  return profile.identity.units === 'imperial' ? inchesToCm(parsed) : parsed;
}

function numberOrFallback(value: string, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function splitList(value: string) {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function getWeeklySchedule(plan: InitialPlan): WeeklyPlanDay[] {
  const existing = (plan as InitialPlan & { weeklySchedule?: WeeklyPlanDay[] }).weeklySchedule;
  if (existing?.length) return existing;
  const days: WeeklyPlanDay['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.map((day, index) => {
    const workout = plan.training.workouts[index % plan.training.workouts.length];
    if (index < plan.training.daysPerWeek && workout) {
      return { day, focus: 'strength', workoutName: workout.name, workoutFocus: workout.exercises, notes: `${plan.training.sessionLengthMinutes} min strength session` };
    }
    if (index - plan.training.daysPerWeek < plan.cardio.sessionsPerWeek) {
      return { day, focus: 'cardio', cardioActivity: plan.cardio.activity, cardioMinutes: plan.cardio.minutesPerSession, notes: `${plan.cardio.minutesPerSession} min ${plan.cardio.activity}` };
    }
    return { day, focus: 'recovery', notes: 'Recovery, mobility, or easy steps' };
  });
}

function getDailyMacroPlan(plan: InitialPlan, weeklySchedule: WeeklyPlanDay[]): DailyMacroPlanDay[] {
  const existing = (plan as InitialPlan & { dailyMacroPlan?: DailyMacroPlanDay[] }).dailyMacroPlan;
  if (existing?.length) return existing;
  return weeklySchedule.map((day) => ({
    day: day.day,
    dayType: day.focus === 'strength_cardio' ? 'training_cardio' : day.focus === 'strength' ? 'training' : day.focus === 'cardio' ? 'cardio' : 'recovery',
    calories: plan.macros.calories.active,
    proteinGrams: plan.macros.proteinGrams.active,
    carbsGrams: plan.macros.carbsGrams.active,
    fatGrams: plan.macros.fatGrams.active,
    mealStructure: plan.mealStructure,
  }));
}

function formatLabel(value: string) {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing[4], paddingBottom: spacing[2] },
  section: { marginTop: spacing[4] },
  sectionBody: { gap: spacing[3], marginTop: spacing[3] },
  planHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing[3] },
  planHeaderCopy: { flex: 1, gap: spacing[1] },
  planCaption: { lineHeight: 18 },
  planDetails: { gap: spacing[4], marginTop: spacing[4] },
  planMetricGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  planMetric: { minWidth: 118, flex: 1, borderWidth: 1, borderRadius: radius.lg, padding: spacing[3], gap: spacing[1] },
  planBlock: { borderTopWidth: 1, paddingTop: spacing[3], gap: spacing[2] },
  planSectionHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing[3] },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginTop: spacing[2] },
  calendarDay: { minWidth: 126, flex: 1, borderWidth: 1, borderRadius: radius.lg, padding: spacing[3], gap: spacing[1] },
  dayLabel: { textTransform: 'uppercase' },
  calendarTitle: { textTransform: 'uppercase' },
  macroDayList: { gap: spacing[2], marginTop: spacing[2] },
  macroDayRow: { borderWidth: 1, borderRadius: radius.lg, padding: spacing[3], gap: spacing[2] },
  macroDayCopy: { gap: 2 },
  macroDayTargets: { lineHeight: 18 },
  workoutList: { gap: spacing[2], marginTop: spacing[1] },
  workoutItem: { gap: 2 },
  workoutName: { textTransform: 'uppercase' },
  inputRow: { flexDirection: 'row', gap: spacing[3] },
  inputGroup: { flex: 1, gap: spacing[2] },
  fieldLabel: { textTransform: 'uppercase' },
  input: {
    minHeight: 48,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    fontSize: 15,
  },
  segmentWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  segment: {
    minHeight: 40,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  segmentText: { textTransform: 'uppercase' },
  secondaryButton: {
    minHeight: 40,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
  },
  secondaryButtonText: { textTransform: 'uppercase' },
  createPlanButton: {
    minHeight: 46,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[4],
  },
  saveButton: {
    minHeight: 50,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[5],
  },
  saveText: { textTransform: 'uppercase' },
  savedText: { textAlign: 'center', marginTop: spacing[2] },
});