import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { AIInsightBanner } from '../../../shared/components/ui/AIInsightBanner';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';

interface StrengthScoreCardProps {
  score: number;
  changeThisMonth: number;
  aiInsight: string;
}

export function StrengthScoreCard({ score, changeThisMonth, aiInsight }: StrengthScoreCardProps) {
  return (
    <View style={styles.container}>
      <Card padding={20}>
        <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
          STRENGTH SCORE
        </Text>
        <View style={styles.scoreRow}>
          <Text variant="displayLarge" color={colors.textPrimary}>
            {score}
          </Text>
          <View style={styles.changeBadge}>
            <Text variant="headingSmall" color={colors.success}>
              +{changeThisMonth}
            </Text>
            <Text variant="caption" color={colors.textTertiary}>
              this month
            </Text>
          </View>
        </View>
      </Card>
      <AIInsightBanner text={aiInsight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing[3] },
  label: { marginBottom: spacing[2] },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  changeBadge: {
    alignItems: 'flex-end',
    gap: 2,
    paddingBottom: spacing[1],
  },
});
