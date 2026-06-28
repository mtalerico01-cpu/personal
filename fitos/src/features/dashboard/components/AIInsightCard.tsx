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
    backgroundColor: 'rgba(5, 8, 9, 0.68)',
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderColor: 'rgba(243,243,243,0.15)',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 24,
    elevation: 4,
  },
  accentBar: {
    height: 3,
    backgroundColor: colors.accent,
    opacity: 0.72,
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
    backgroundColor: 'rgba(168,255,62,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(168,255,62,0.14)',
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
