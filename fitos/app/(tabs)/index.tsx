import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../src/shared/components/ui/Screen';
import { AIInsightCard } from '../../src/features/dashboard/components/AIInsightCard';
import { KPICard } from '../../src/features/dashboard/components/KPICard';
import { TrainingCard } from '../../src/features/dashboard/components/TrainingCard';
import { DashboardHeader } from '../../src/features/dashboard/components/DashboardHeader';
import { useDashboard } from '../../src/features/dashboard/hooks/useDashboard';
import { spacing } from '../../src/shared/theme/spacing';

export default function DashboardScreen() {
  const { user, kpiCards, workout, aiDailyBrief } = useDashboard();

  return (
    <Screen scrollable horizontalPadding={spacing[4]}>
      {/* Greeting header */}
      <DashboardHeader name={user.name} />

      {/* AI Daily Brief */}
      <AIInsightCard brief={aiDailyBrief} />

      <View style={styles.sectionSpacer} />

      {/* KPI Grid — 2 columns */}
      <View style={styles.kpiGrid}>
        {kpiCards.map((card, index) => (
          <View key={card.id} style={styles.kpiCell}>
            <KPICard data={card} />
          </View>
        ))}
      </View>

      <View style={styles.sectionSpacer} />

      {/* Today's Training */}
      <TrainingCard workout={workout} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionSpacer: {
    height: spacing[4],
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  kpiCell: {
    // Each cell takes exactly half the grid width minus half the gap
    flexBasis: '47.5%',
    flexGrow: 1,
  },
});
