import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing, radius } from '@/shared/theme/spacing';
import type { MockAIFoodEstimate } from '../mock';

interface FoodLoggerCardProps {
  input: string;
  onInputChange: (text: string) => void;
  onEstimate: () => void;
  estimateVisible: boolean;
  estimate: MockAIFoodEstimate;
  onAdd: () => void;
  onDismiss: () => void;
}

export function FoodLoggerCard({
  input,
  onInputChange,
  onEstimate,
  estimateVisible,
  estimate,
  onAdd,
  onDismiss,
}: FoodLoggerCardProps) {
  const theme = useActiveTheme();

  return (
    <Card padding={16}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
        AI FOOD LOGGER
      </Text>

      <TextInput
        value={input}
        onChangeText={onInputChange}
        placeholder="Describe what you ate..."
        placeholderTextColor={theme.colors.text.muted}
        multiline
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface.raised,
            borderColor: theme.colors.border.default,
            color: theme.colors.text.primary,
          },
        ]}
      />

      <TouchableOpacity
        style={[styles.estimateButton, { backgroundColor: theme.colors.persona.core }]}
        onPress={onEstimate}
        activeOpacity={0.8}
      >
        <Text variant="labelLarge" color={theme.colors.text.inverse}>
          Estimate Macros
        </Text>
      </TouchableOpacity>

      {estimateVisible && (
        <View style={[styles.resultCard, { backgroundColor: theme.colors.surface.raised, borderColor: theme.colors.border.default }]}> 
          <View style={styles.resultHeader}>
            <View style={styles.confidenceBadge}>
              <Text variant="labelMedium" color={colors.warning}>
                {estimate.confidence.toUpperCase()} CONFIDENCE
              </Text>
            </View>
            <TouchableOpacity onPress={onDismiss} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text variant="caption" color={colors.textTertiary}>
                Dismiss
              </Text>
            </TouchableOpacity>
          </View>

          <Text variant="bodyMedium" color={colors.textSecondary} style={styles.resultDescription}>
            {estimate.description}
          </Text>

          <View style={styles.macroChips}>
            <MacroChip value={estimate.calories} unit="kcal" label="Calories" color={theme.colors.persona.core} />
            <MacroChip value={estimate.proteinGrams} unit="g" label="Protein" color={theme.colors.status.info} />
            <MacroChip value={estimate.carbsGrams} unit="g" label="Carbs" color={theme.colors.text.secondary} />
            <MacroChip value={estimate.fatGrams} unit="g" label="Fat" color={theme.colors.status.warning} />
          </View>

          <TouchableOpacity style={[styles.addButton, { borderTopColor: theme.colors.border.default }]} onPress={onAdd} activeOpacity={0.8}>
            <Text variant="labelLarge" color={theme.colors.persona.core}>
              + Add to Log
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );
}

interface MacroChipProps {
  value: number;
  unit: string;
  label: string;
  color: string;
}

function MacroChip({ value, unit, label, color }: MacroChipProps) {
  return (
    <View style={styles.chip}>
      <Text variant="headingSmall" color={color}>
        {value}
        <Text variant="caption" color={colors.textTertiary}>
          {unit}
        </Text>
      </Text>
      <Text variant="caption" color={colors.textTertiary}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing[3],
  },
  input: {
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing[3],
    fontSize: 15,
    minHeight: 72,
    textAlignVertical: 'top',
    marginBottom: spacing[3],
  },
  estimateButton: {
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    alignItems: 'center',
  },
  resultCard: {
    marginTop: spacing[4],
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing[4],
    gap: spacing[3],
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceBadge: {
    backgroundColor: colors.warningMuted,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  resultDescription: {
    lineHeight: 20,
  },
  macroChips: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    alignItems: 'center',
    gap: 2,
  },
  addButton: {
    alignItems: 'center',
    paddingVertical: spacing[2],
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: spacing[1],
  },
});
