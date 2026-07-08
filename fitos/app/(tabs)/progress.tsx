import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../src/shared/components/ui/Screen';
import { SectionHeader } from '../../src/shared/components/ui/SectionHeader';
import { AIInsightBanner } from '../../src/shared/components/ui/AIInsightBanner';
import { PageHero } from '../../src/shared/components/ui/PageHero';
import { CoachInsightHeader } from '../../src/features/coach/components/CoachInsightHeader';
import { ProgressMonitorCard } from '../../src/features/progress/components/ProgressMonitorCard';
import { StrengthMetricCard } from '../../src/features/progress/components/StrengthMetricCard';
import { StrengthScoreCard } from '../../src/features/progress/components/StrengthScoreCard';
import { BodyMeasurementsCard } from '../../src/features/progress/components/BodyMeasurementsCard';
import { ProgressPhotosCard } from '../../src/features/progress/components/ProgressPhotosCard';
import { useProgress } from '../../src/features/progress/hooks/useProgress';
import { spacing } from '../../src/shared/theme/spacing';

export default function ProgressScreen() {
  const { weight, aiWeightInsight, strength, bodyMeasurements, bodyMeasurementHistory, progressPhotos } = useProgress();
  const loggedMeasurements = bodyMeasurements.filter((measurement) => measurement.value !== null).length;

  return (
    <Screen scrollable horizontalPadding={spacing[4]}>
      <View style={styles.header}>
        <PageHero
          eyebrow="Progress"
          title="Trend review"
          detail="Weight, strength, measurements, and photos tuned for long-term signal."
        />
      </View>

      <CoachInsightHeader screen="progress" />

      <View style={styles.gap} />

      <ProgressMonitorCard
        weightSeries={weight.history}
        weightCurrentLbs={weight.currentLbs}
        weightGoalLbs={weight.goalLbs}
        strengthScore={strength.score}
        strengthChange={strength.scoreChangeThisMonth}
        strengthSeries={strength.history}
        bodySeries={bodyMeasurementHistory}
        bodyLoggedCount={loggedMeasurements}
        bodyTotalCount={bodyMeasurements.length}
      />
      <View style={styles.gap} />
      <AIInsightBanner text={aiWeightInsight} label="WEIGHT INSIGHT" />

      {/* Strength */}
      <View style={styles.sectionGap} />
      <SectionHeader title="Strength" />
      <View style={styles.smallGap} />
      <StrengthScoreCard
        score={strength.score}
        changeThisMonth={strength.scoreChangeThisMonth}
        aiInsight={strength.aiInsight}
      />
      <View style={styles.gap} />
      <View style={styles.liftGrid}>
        {strength.lifts.map((lift) => (
          <View key={lift.id} style={styles.liftGridItem}>
            <StrengthMetricCard
              name={lift.name}
              estimated1RMLbs={lift.estimated1RMLbs}
              ninetyDayChangeLbs={lift.ninetyDayChangeLbs}
              relativeStrengthLabel={lift.relativeStrengthLabel}
            />
          </View>
        ))}
      </View>

      {/* Body */}
      <View style={styles.sectionGap} />
      <SectionHeader title="Body" />
      <View style={styles.smallGap} />
      <BodyMeasurementsCard measurements={bodyMeasurements} />
      <View style={styles.gap} />
      <ProgressPhotosCard photos={progressPhotos} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: spacing[4], paddingBottom: spacing[2] },
  gap: { height: spacing[4] },
  smallGap: { height: spacing[3] },
  sectionGap: { height: spacing[6] },
  liftGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  liftGridItem: {
    // Two columns: each item takes half the container minus half the gap
    flexBasis: '47%',
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 140,
  },
});
