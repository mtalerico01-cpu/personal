import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '../../../shared/theme/colors';
import { spacing, radius } from '../../../shared/theme/spacing';
import type { AIMessage } from '../types';

interface Props {
  message: AIMessage;
  personaName: string;
}

export function AIMessageCard({ message, personaName }: Props) {
  return (
    <View style={styles.container}>
      {message.title ? (
        <Text variant="labelLarge" color={colors.accent} style={styles.title}>
          {message.title}
        </Text>
      ) : null}

      <Text variant="bodyLarge" color={colors.textPrimary} style={styles.summary}>
        {message.summary}
      </Text>

      {message.details && message.details.length > 0 ? (
        <View style={styles.details}>
          {message.details.map((d, i) => (
            <View key={i} style={styles.detailRow}>
              <View style={styles.dot} />
              <Text variant="bodyMedium" color={colors.textSecondary} style={styles.detailText}>
                {d}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {message.recommendation ? (
        <View style={styles.recommendation}>
          <Text variant="labelMedium" color={colors.accent} style={styles.recLabel}>
            RECOMMENDATION
          </Text>
          <Text variant="bodyMedium" color={colors.textPrimary}>
            {message.recommendation}
          </Text>
        </View>
      ) : null}

      {message.confidence && message.confidence !== 'high' ? (
        <Text variant="caption" color={colors.textTertiary} style={styles.confidence}>
          Confidence: {message.confidence}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing[2],
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing[1],
  },
  summary: {
    lineHeight: 22,
  },
  details: {
    gap: spacing[1],
    marginTop: spacing[1],
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[2],
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accentDim,
    marginTop: 8,
  },
  detailText: {
    flex: 1,
    lineHeight: 20,
  },
  recommendation: {
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
    paddingLeft: spacing[3],
    marginTop: spacing[2],
    gap: spacing[1],
  },
  recLabel: {
    fontSize: 10,
    letterSpacing: 1,
  },
  confidence: {
    marginTop: spacing[1],
    textTransform: 'capitalize',
  },
});
