import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing, radius } from '@/shared/theme/spacing';
import type { AIDailyBrief } from '../../../types';

interface AIInsightCardProps {
  brief: AIDailyBrief;
}

export function AIInsightCard({ brief }: AIInsightCardProps) {
  const [expanded, setExpanded] = useState(false);
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      onPress={() => setExpanded((prev) => !prev)}
      activeOpacity={0.85}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.surface.default,
            borderColor: theme.colors.border.subtle,
            shadowOpacity: theme.mode === 'dark' ? 0.12 : 0.04,
          },
        ]}
      >
        <View style={[styles.accentBar, { backgroundColor: theme.colors.persona.core }]} />

        <View style={styles.content}>
          <View style={styles.labelRow}>
            <View style={[styles.aiBadge, { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.default }]}> 
              <Text variant="labelMedium" color={theme.colors.persona.core}>
                COACH
              </Text>
            </View>
            <Text variant="caption" color={colors.textTertiary}>
              Daily brief
            </Text>
          </View>

          {/* Headline */}
          <Text variant="headingMedium" color={colors.textPrimary} style={styles.headline}>
            {brief.headline}
          </Text>

          {/* Body — shown when expanded */}
          {expanded && (
            <Text variant="bodyLarge" color={colors.textSecondary} style={styles.body}>
              {brief.body}
            </Text>
          )}

          {/* Expand hint */}
          <Text variant="caption" color={colors.textTertiary} style={styles.expandHint}>
            {expanded ? 'Tap to collapse' : 'Tap to read more'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius['2xl'],
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 1,
  },
  accentBar: {
    height: 2,
    opacity: 0.82,
  },
  content: {
    padding: spacing[4],
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  aiBadge: {
    borderWidth: 1,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  headline: {
    marginBottom: spacing[2],
    lineHeight: 26,
  },
  body: {
    marginBottom: spacing[3],
  },
  expandHint: {
    marginTop: spacing[1],
  },
});
