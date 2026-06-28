import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { ActionCardData } from '../mock';

interface ActionCardProps {
  messageId: string;
  card: ActionCardData;
  onAction: (messageId: string, actionId: string) => void;
}

export function ActionCard({ messageId, card, onAction }: ActionCardProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{card.title}</Text>
        <Text style={styles.summary}>{card.summary}</Text>
      </View>

      {/* Details grid */}
      {card.details && (
        <View style={styles.details}>
          {Object.entries(card.details).map(([key, value]) => (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.detailKey}>{key}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        {card.actions.map(action => (
          <TouchableOpacity
            key={action.id}
            style={[styles.btn, styles[`btn_${action.variant}`]]}
            onPress={() => onAction(messageId, action.id)}
            activeOpacity={0.75}
          >
            <Text style={[styles.btnText, styles[`btnText_${action.variant}`]]}>
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 6,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accentDim,
    backgroundColor: 'rgba(0, 212, 170, 0.04)',
    overflow: 'hidden',
  },
  header: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.accent,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  summary: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  details: {
    padding: 14,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailKey: {
    fontSize: 13,
    color: colors.textTertiary,
    fontWeight: '400',
  },
  detailValue: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  actions: {
    padding: 12,
    gap: 8,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btn_primary: {
    backgroundColor: colors.accent,
  },
  btn_secondary: {
    backgroundColor: colors.accentMuted,
    borderWidth: 1,
    borderColor: colors.accentDim,
  },
  btn_ghost: {
    backgroundColor: 'transparent',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '500',
  },
  btnText_primary: {
    color: '#080808',
  },
  btnText_secondary: {
    color: colors.accent,
  },
  btnText_ghost: {
    color: colors.textTertiary,
  },
} as any);
