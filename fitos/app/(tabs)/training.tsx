import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Screen } from '../../src/shared/components/ui/Screen';
import { PageHero } from '../../src/shared/components/ui/PageHero';
import { Text } from '../../src/shared/components/ui/Text';
import { CoachInsightHeader } from '../../src/features/coach/components/CoachInsightHeader';
import { TodayWorkoutCard } from '../../src/features/training/components/TodayWorkoutCard';
import { WorkoutGeneratorCard } from '../../src/features/training/components/WorkoutGeneratorCard';
import { ExerciseLoggerPreview } from '../../src/features/training/components/ExerciseLoggerPreview';
import { CardioSummaryCard } from '../../src/features/training/components/CardioSummaryCard';
import { useTraining } from '../../src/features/training/hooks/useTraining';
import { colors } from '../../src/shared/theme/colors';
import { useActiveTheme } from '../../src/shared/theme/useActiveTheme';
import { spacing } from '../../src/shared/theme/spacing';

export default function TrainingScreen() {
  const theme = useActiveTheme();
  const {
    activeTab,
    setActiveTab,
    todayWorkout,
    estimatedCalories,
    selectedDuration,
    setSelectedDuration,
    generatedWorkout,
    cardioData,
    markCardioComplete,
    updateCardioPlan,
  } = useTraining();

  return (
    <Screen scrollable horizontalPadding={spacing[4]}>
      <View style={styles.header}>
        <PageHero
          eyebrow="Training"
          title="Session control"
          detail="Plan strength work, generate sessions, and keep cardio targets visible."
        />
      </View>

      <CoachInsightHeader screen={activeTab === 'cardio' ? 'cardio' : 'training'} />

      <View style={styles.gap} />

      {/* Strength / Cardio tab toggle */}
      <View style={[styles.tabRow, { backgroundColor: theme.colors.surface.default, borderColor: theme.colors.border.subtle }]}> 
        <TabButton
          label="Strength"
          active={activeTab === 'strength'}
          onPress={() => setActiveTab('strength')}
        />
        <TabButton
          label="Cardio"
          active={activeTab === 'cardio'}
          onPress={() => setActiveTab('cardio')}
        />
      </View>

      <View style={styles.gap} />

      {activeTab === 'strength' ? (
        todayWorkout ? (
          <>
            <TodayWorkoutCard
              workout={todayWorkout}
              estimatedCalories={estimatedCalories}
            />
            <View style={styles.gap} />
            <WorkoutGeneratorCard
              selected={selectedDuration}
              onSelect={setSelectedDuration}
              generated={generatedWorkout}
            />
            <View style={styles.gap} />
            <ExerciseLoggerPreview exercises={todayWorkout.exercises} />
          </>
        ) : (
          <WorkoutGeneratorCard
            selected={selectedDuration}
            onSelect={setSelectedDuration}
            generated={generatedWorkout}
          />
        )
      ) : (
        <CardioSummaryCard
          steps={cardioData.steps}
          stepsGoal={cardioData.stepsGoal}
          activeCalories={cardioData.activeCalories}
          distanceMiles={cardioData.distanceMiles}
          cardioMinutesCompleted={cardioData.cardioMinutesCompleted}
          cardioMinutesGoal={cardioData.cardioMinutesGoal}
          activity={cardioData.activity}
          intensity={cardioData.intensity}
          recommendation={cardioData.recommendation}
          sessions={cardioData.sessions}
          onMarkComplete={markCardioComplete}
          onEditPlan={() => updateCardioPlan({ cardioMinutesGoal: 30, activity: 'Outdoor Zone 2 walk', intensity: 'Easy to moderate' })}
        />
      )}
    </Screen>
  );
}

interface TabButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

function TabButton({ label, active, onPress }: TabButtonProps) {
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.tab,
        active && styles.tabActive,
        active && { backgroundColor: theme.colors.persona.soft, borderColor: theme.colors.border.persona },
      ]}
    >
      <Text
        variant="labelLarge"
        color={active ? theme.colors.persona.core : theme.colors.text.muted}
        style={styles.tabText}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing[4], paddingBottom: spacing[2] },
  tabRow: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    padding: 3,
    gap: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing[2],
    alignItems: 'center',
    borderRadius: 18,
  },
  tabActive: {
    borderWidth: 1,
  },
  tabText: {
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  gap: { height: spacing[4] },
});
