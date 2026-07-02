import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen } from '../../src/shared/components/ui/Screen';
import { Text as UIText } from '../../src/shared/components/ui/Text';
import { AIInsightCard } from '../../src/features/dashboard/components/AIInsightCard';
import { KPICard } from '../../src/features/dashboard/components/KPICard';
import { TrainingCard } from '../../src/features/dashboard/components/TrainingCard';
import { PageHero } from '../../src/shared/components/ui/PageHero';
import { CoachInsightHeader } from '../../src/features/coach/components/CoachInsightHeader';
import { useDashboard } from '../../src/features/dashboard/hooks/useDashboard';
import { spacing } from '../../src/shared/theme/spacing';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardScreen() {
  const { user, kpiCards, workout, aiDailyBrief } = useDashboard();

  return (
    <Screen scrollable horizontalPadding={spacing[4]}>
      <View style={styles.header}>
        <PageHero
          eyebrow="Today"
          title={`${getGreeting()}, ${user.name}`}
          detail="Your training, nutrition, and progress signals are synced."
        />
      </View>

      <View style={styles.sectionSpacer} />

      <CoachInsightHeader screen="dashboard" />

      <View style={styles.sectionSpacer} />

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

      {/* KPI status legend */}
      <View style={styles.kpiLegend}>
        {([['#6B7280', 'No data'], ['#D8A84F', 'In progress'], ['#A7FF00', 'Complete']] as const).map(([color, label]) => (
          <View key={label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: color }]} />
            <UIText variant="caption" color={color}>{label}</UIText>
          </View>
        ))}
      </View>

      <View style={styles.sectionSpacer} />

      {/* Today's Training */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: spacing[4],
  },
  sectionSpacer: {
    height: spacing[4],
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  kpiCell: {
    flexBasis: '47.5%',
    flexGrow: 1,
  },
  kpiLegend: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing[4],
    marginTop: spacing[2],
    paddingHorizontal: 2,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
