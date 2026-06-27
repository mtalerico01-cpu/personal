import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';

interface StrengthMetricCardProps {
  name: string;
  estimated1RMLbs: number;
  ninetyDayChangeLbs: number;
  relativeStrengthLabel: string;
}

export function StrengthMetricCard({
  name,
  estimated1RMLbs,
  ninetyDayChangeLbs,
  relativeStrengthLabel,
}: StrengthMetricCardProps) {
  const changePositive = ninetyDayChangeLbs >= 0;
  const changeLabel = `${changePositive ? '+' : ''}${ninetyDayChangeLbs} lbs in 90 days`;

  return (
    <Card padding={14} style={styles.card}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.name}>
        {name.toUpperCase()}
      </Text>
      <Text variant="displaySmall" color={colors.textPrimary}>
        {estimated1RMLbs}
        <Text variant="headingSmall" color={colors.textTertiary}> lbs</Text>
      </Text>
      <Text
        variant="labelLarge"
        color={changePositive ? colors.success : colors.error}
        style={styles.change}
      >
        {changeLabel}
      </Text>
      <Text variant="caption" color={colors.textTertiary}>
        {relativeStrengthLabel}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1 },
  name: { marginBottom: spacing[2] },
  change: { marginTop: spacing[1], marginBottom: 2 },
});
