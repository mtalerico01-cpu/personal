import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing } from '@/shared/theme/spacing';

interface DashboardHeaderProps {
  name: string;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <View style={styles.container}>
      <Text variant="caption" color={colors.textTertiary} style={styles.date}>
        {getFormattedDate().toUpperCase()}
      </Text>
      <Text variant="headingLarge" color={colors.textPrimary}>
        {getGreeting()}, {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[4],
    paddingBottom: spacing[3],
  },
  date: {
    marginBottom: spacing[1],
    letterSpacing: 0.8,
  },
});
