import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Screen } from '../../src/shared/components/ui/Screen';
import { PageHero } from '../../src/shared/components/ui/PageHero';
import { Text } from '../../src/shared/components/ui/Text';
import { TodayWorkoutCard } from '../../src/features/training/components/TodayWorkoutCard';
import { WorkoutGeneratorCard } from '../../src/features/training/components/WorkoutGeneratorCard';
import { ExerciseLoggerPreview } from '../../src/features/training/components/ExerciseLoggerPreview';
import { CardioSummaryCard } from '../../src/features/training/components/CardioSummaryCard';
import { useTraining } from '../../src/features/training/hooks/useTraining';
import { colors } from '../../src/shared/theme/colors';
import { spacing } from '../../src/shared/theme/spacing';

export default function TrainingScreen() {
  const {
    activeTab,
    setActiveTab,
    todayWorkout,
    estimatedCalories,
    selectedDuration,
    setSelectedDuration,
    generatedWorkout,
    cardioData,
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

      {/* Strength / Cardio tab toggle */}
      <View style={styles.tabRow}>
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
        <CardioSummaryCard
          steps={cardioData.steps}
          stepsGoal={cardioData.stepsGoal}
          activeCalories={cardioData.activeCalories}
          distanceMiles={cardioData.distanceMiles}
          sessions={cardioData.sessions}
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
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.tab, active && styles.tabActive]}
    >
      <Text
        variant="labelLarge"
        color={active ? colors.accent : colors.textTertiary}
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
    backgroundColor: 'rgba(5, 8, 9, 0.58)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(243,243,243,0.14)',
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
    backgroundColor: 'rgba(168,255,62,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(168,255,62,0.18)',
  },
  tabText: {
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  gap: { height: spacing[4] },
});
