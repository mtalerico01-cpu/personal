import type { GeneratedTrainingPlan, OnboardingAnswers } from '../types';

export function generateTrainingPlan(answers: OnboardingAnswers): GeneratedTrainingPlan {
  const days = normalizeDays(answers.manualTargets?.weeklyWorkoutDays ?? answers.trainingDaysPerWeek);
  const sessionLengthMinutes = answers.sessionLengthMinutes ?? (days <= 3 ? 45 : 60);
  const equipment = answers.equipment?.length ? answers.equipment : ['full_gym'];
  const experience = answers.trainingExperience ?? 'beginner';
  const preferredTypes = answers.preferredTrainingTypes ?? ['strength'];
  const customFocuses = parseCustomSplit(answers.customWorkoutSplit);
  const split = answers.manualTargets?.currentTrainingSplit ?? chooseSplit(days, experience, preferredTypes, answers.workoutSplit, customFocuses);
  const workouts = buildWorkouts(split, equipment, customFocuses);

  return {
    daysPerWeek: days,
    split,
    sessionLengthMinutes,
    focus: preferredTypes,
    equipment,
    workouts,
  };
}

function normalizeDays(days: number | 'varies' | undefined) {
  if (!days || days === 'varies') return 3;
  return Math.min(6, Math.max(1, days));
}

function chooseSplit(days: number, experience: string, preferredTypes: string[], selectedSplit?: OnboardingAnswers['workoutSplit'], customFocuses: string[] = []) {
  if (selectedSplit === 'push_pull_legs') return 'Push / pull / legs';
  if (selectedSplit === 'upper_lower') return 'Upper / lower';
  if (selectedSplit === 'full_body') return 'Full body';
  if (selectedSplit === 'body_part_split') return 'Body-part split';
  if (selectedSplit === 'custom') return customFocuses.length ? `Custom: ${customFocuses.map(formatFocus).join(' / ')}` : 'Custom split';
  if (days <= 2) return 'Full body';
  if (days === 3) return experience === 'new' || experience === 'beginner' || experience === 'returning' ? 'Full body' : 'Upper / lower / full body';
  if (days === 4) return 'Upper / lower';
  if (days >= 5 && preferredTypes.some((type) => type === 'hypertrophy' || type === 'strength_training')) return 'Push / pull / legs / upper / lower';
  return 'Upper / lower plus accessories';
}

function buildWorkouts(split: string, equipment: string[], customFocuses: string[]) {
  const hasGym = equipment.includes('full_gym') || equipment.includes('basic_gym') || equipment.includes('mixed');
  const mainPush = hasGym ? ['Bench press', 'Overhead press', 'Cable row', 'Lateral raise'] : ['Push-up', 'Pike push-up', 'Band row', 'Lateral raise'];
  const mainLower = hasGym ? ['Squat', 'Romanian deadlift', 'Leg press', 'Calf raise'] : ['Goblet squat', 'Dumbbell Romanian deadlift', 'Split squat', 'Calf raise'];

  if (split.startsWith('Custom:') && customFocuses.length) {
    return customFocuses.map((focus) => ({
      name: `${formatFocus(focus)} Day`,
      exercises: buildCustomFocusExercises(focus, hasGym),
    }));
  }

  if (split === 'Full body') {
    return [
      { name: 'Full Body A', exercises: ['Squat pattern', 'Press pattern', 'Row pattern', 'Core'] },
      { name: 'Full Body B', exercises: ['Hinge pattern', 'Incline press', 'Pulldown or row', 'Carry'] },
      { name: 'Full Body C', exercises: ['Single-leg pattern', 'Overhead press', 'Pull pattern', 'Conditioning finisher'] },
    ];
  }

  if (split === 'Upper / lower') {
    return [
      { name: 'Upper A', exercises: mainPush },
      { name: 'Lower A', exercises: mainLower },
      { name: 'Upper B', exercises: ['Incline press', 'Pulldown', 'Dumbbell row', 'Arm superset'] },
      { name: 'Lower B', exercises: ['Deadlift pattern', 'Front squat pattern', 'Hamstring curl', 'Core'] },
    ];
  }

  return [
    { name: 'Push', exercises: ['Press pattern', 'Incline press', 'Shoulder raise', 'Triceps'] },
    { name: 'Pull', exercises: ['Pull-up or pulldown', 'Row pattern', 'Rear delts', 'Biceps'] },
    { name: 'Legs', exercises: mainLower },
    { name: 'Upper', exercises: mainPush },
    { name: 'Lower', exercises: ['Hinge pattern', 'Single-leg pattern', 'Hamstrings', 'Core'] },
  ];
}

function parseCustomSplit(value: string | undefined) {
  return value?.split(',').map((item) => item.trim()).filter(Boolean) ?? [];
}

function formatFocus(value: string) {
  return value.split('_').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function buildCustomFocusExercises(focus: string, hasGym: boolean) {
  const map: Record<string, string[]> = {
    chest: hasGym ? ['Bench press', 'Incline press', 'Cable fly', 'Push-up'] : ['Push-up', 'Dumbbell floor press', 'Incline push-up', 'Band fly'],
    back: hasGym ? ['Pulldown', 'Cable row', 'Chest-supported row', 'Back extension'] : ['Band row', 'Dumbbell row', 'Reverse fly', 'Hip hinge'],
    shoulders: ['Overhead press', 'Lateral raise', 'Rear delt raise', 'Carry'],
    arms: ['Curl variation', 'Triceps extension', 'Hammer curl', 'Close-grip push-up'],
    quads: ['Squat pattern', 'Split squat', 'Leg press or step-up', 'Leg extension'],
    hamstrings_glutes: ['Romanian deadlift', 'Hip thrust', 'Hamstring curl', 'Glute bridge'],
    full_body: ['Squat pattern', 'Press pattern', 'Row pattern', 'Core'],
    cardio_conditioning: ['Zone 2 cardio', 'Intervals', 'Carry', 'Mobility cooldown'],
    mobility: ['Hip mobility', 'T-spine rotation', 'Shoulder control', 'Easy aerobic cooldown'],
  };
  return map[focus] ?? ['Primary movement', 'Secondary movement', 'Accessory movement', 'Core or mobility'];
}
