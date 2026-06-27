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
import { spacing, radius } from '@/shared/theme/spacing';
import type { MockAIFoodEstimate } from '../mock';

interface FoodLoggerCardProps {
  input: string;
  onInputChange: (text: string) => void;
  onEstimate: () => void;
  estimateVisible: boolean;
  estimate: MockAIFoodEstimate;
  onDismiss: () => void;
}

export function FoodLoggerCard({
  input,
  onInputChange,
  onEstimate,
  estimateVisible,
  estimate,
  onDismiss,
}: FoodLoggerCardProps) {
  return (
    <Card padding={16}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
        AI FOOD LOGGER
      </Text>

      <TextInput
        value={input}
        onChangeText={onInputChange}
        placeholder="Describe what you ate..."
        placeholderTextColor={colors.textTertiary}
        multiline
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.estimateButton}
        onPress={onEstimate}
        activeOpacity={0.8}
      >
        <Text variant="labelLarge" color={colors.background}>
          Estimate Macros
        </Text>
      </TouchableOpacity>

      {estimateVisible && (
        <View style={styles.resultCard}>
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
            <MacroChip value={estimate.calories} unit="kcal" label="Calories" color={colors.calories} />
            <MacroChip value={estimate.proteinGrams} unit="g" label="Protein" color={colors.protein} />
            <MacroChip value={estimate.carbsGrams} unit="g" label="Carbs" color={colors.carbs} />
            <MacroChip value={estimate.fatGrams} unit="g" label="Fat" color={colors.fat} />
          </View>

          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
            <Text variant="labelLarge" color={colors.accent}>
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
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: spacing[3],
    color: colors.textPrimary,
    fontSize: 15,
    minHeight: 72,
    textAlignVertical: 'top',
    marginBottom: spacing[3],
  },
  estimateButton: {
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    paddingVertical: spacing[3],
    alignItems: 'center',
  },
  resultCard: {
    marginTop: spacing[4],
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
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
    borderTopColor: colors.border,
    marginTop: spacing[1],
  },
});
