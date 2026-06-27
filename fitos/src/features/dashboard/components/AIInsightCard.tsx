import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing, radius } from '@/shared/theme/spacing';
import type { AIDailyBrief } from '../../../types';

interface AIInsightCardProps {
  brief: AIDailyBrief;
}

export function AIInsightCard({ brief }: AIInsightCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded((prev) => !prev)}
      activeOpacity={0.85}
    >
      <View style={styles.container}>
        {/* Top accent bar */}
        <View style={styles.accentBar} />

        <View style={styles.content}>
          {/* AI label */}
          <View style={styles.labelRow}>
            <View style={styles.aiBadge}>
              <Text variant="labelMedium" color={colors.accent}>
                AI COACH
              </Text>
            </View>
            <Text variant="caption" color={colors.textTertiary}>
              Daily Brief
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
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.accentDim,
    overflow: 'hidden',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  accentBar: {
    height: 2,
    backgroundColor: colors.accent,
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
    backgroundColor: colors.accentMuted,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.full,
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
