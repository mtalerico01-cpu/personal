import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../src/shared/components/ui/Screen';
import { SectionHeader } from '../../src/shared/components/ui/SectionHeader';
import { PageHero } from '../../src/shared/components/ui/PageHero';
import { MacroSummaryCard } from '../../src/features/nutrition/components/MacroSummaryCard';
import { RemainingMacrosCard } from '../../src/features/nutrition/components/RemainingMacrosCard';
import { FoodLoggerCard } from '../../src/features/nutrition/components/FoodLoggerCard';
import { MealCard } from '../../src/features/nutrition/components/MealCard';
import { SupplementTracker } from '../../src/features/nutrition/components/SupplementTracker';
import { useNutrition } from '../../src/features/nutrition/hooks/useNutrition';
import { spacing } from '../../src/shared/theme/spacing';

export default function NutritionScreen() {
  const {
    log,
    goals,
    remaining,
    supplements,
    toggleSupplement,
    foodInput,
    setFoodInput,
    aiEstimateVisible,
    estimateMacros,
    dismissAIEstimate,
    aiEstimate,
  } = useNutrition();

  return (
    <Screen scrollable horizontalPadding={spacing[4]}>
      <View style={styles.header}>
        <PageHero
          eyebrow="Nutrition"
          title="Fuel status"
          detail="Macro targets, meal logging, and supplement consistency in one place."
        />
      </View>

      <MacroSummaryCard
        calories={log.totalMacros.calories}
        calorieGoal={goals.calories}
        protein={log.totalMacros.proteinGrams}
        proteinGoal={goals.proteinGrams}
        carbs={log.totalMacros.carbsGrams}
        carbsGoal={goals.carbsGrams}
        fat={log.totalMacros.fatGrams}
        fatGoal={goals.fatGrams}
      />

      <View style={styles.gap} />
      <RemainingMacrosCard calorieGoal={goals.calories} remaining={remaining} />

      <View style={styles.gap} />
      <FoodLoggerCard
        input={foodInput}
        onInputChange={setFoodInput}
        onEstimate={estimateMacros}
        estimateVisible={aiEstimateVisible}
        estimate={aiEstimate}
        onDismiss={dismissAIEstimate}
      />

      <View style={styles.gap} />
      <SectionHeader title="Meals" actionLabel="+ Meal" />
      <View style={styles.mealGap} />
      {log.meals.map((meal, i) => (
        <React.Fragment key={meal.id}>
          <MealCard meal={meal} mealNumber={i + 1} />
          <View style={styles.mealGap} />
        </React.Fragment>
      ))}

      <View style={styles.gap} />
      <SupplementTracker supplements={supplements} onToggle={toggleSupplement} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing[4], paddingBottom: spacing[2] },
  gap: { height: spacing[4] },
  mealGap: { height: spacing[3] },
});
