import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { MacroProgressBar } from '../../../shared/components/ui/MacroProgressBar';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing } from '@/shared/theme/spacing';

interface MacroSummaryCardProps {
  calories: number;
  calorieGoal: number;
  protein: number;
  proteinGoal: number;
  carbs: number;
  carbsGoal: number;
  fat: number;
  fatGoal: number;
}

export function MacroSummaryCard({
  calories,
  calorieGoal,
  protein,
  proteinGoal,
  carbs,
  carbsGoal,
  fat,
  fatGoal,
}: MacroSummaryCardProps) {
  const theme = useActiveTheme();
  const calPercent = Math.round((calories / calorieGoal) * 100);
  const macroColors = getMacroThemeColors(theme);

  return (
    <Card padding={20}>
      {/* Calories hero */}
      <View style={styles.calorieRow}>
        <View>
          <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
            CALORIES TODAY
          </Text>
          <View style={styles.calorieValue}>
            <Text variant="displayMedium" color={colors.textPrimary}>
              {calories.toLocaleString()}
            </Text>
            <Text variant="headingSmall" color={colors.textTertiary} style={styles.calorieGoal}>
              / {calorieGoal.toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.ringContainer}>
          <CircleProgress percent={calPercent} color={theme.colors.persona.core} size={64} />
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.colors.border.subtle }]} />

      {/* Macro bars */}
      <View style={styles.macrosContainer}>
        <MacroProgressBar
          label="Protein"
          current={protein}
          goal={proteinGoal}
          color={macroColors.protein}
          colorMuted={macroColors.proteinMuted}
        />
        <MacroProgressBar
          label="Carbs"
          current={carbs}
          goal={carbsGoal}
          color={macroColors.carbs}
          colorMuted={macroColors.carbsMuted}
        />
        <MacroProgressBar
          label="Fat"
          current={fat}
          goal={fatGoal}
          color={macroColors.fat}
          colorMuted={macroColors.fatMuted}
        />
      </View>
    </Card>
  );
}

/** Simple circular progress ring using border technique */
interface CircleProgressProps {
  percent: number;
  color: string;
  size: number;
}

function CircleProgress({ percent, color, size }: CircleProgressProps) {
  const theme = useActiveTheme();
  const clampedPercent = Math.min(percent, 100);
  const strokeWidth = 6;
  const innerSize = size - strokeWidth * 2;

  return (
    <View style={[styles.ring, { width: size, height: size, borderColor: theme.colors.border.default }]}>
      <View
        style={[
          styles.ringFill,
          {
            width: innerSize,
            height: innerSize,
            backgroundColor: theme.colors.surface.default,
          },
        ]}
      >
        <Text variant="labelMedium" color={color} style={styles.ringText}>
          {clampedPercent}%
        </Text>
      </View>
      {/* Colored arc overlay — simplified visual */}
      <View
        style={[
          styles.ringArc,
          {
            borderColor: color,
            width: size,
            height: size,
            opacity: clampedPercent / 100,
          },
        ]}
      />
    </View>
  );
}

function getMacroThemeColors(theme: ReturnType<typeof useActiveTheme>) {
  if (theme.mode === 'dark') {
    return {
      protein: colors.protein,
      proteinMuted: colors.proteinMuted,
      carbs: colors.carbs,
      carbsMuted: colors.carbsMuted,
      fat: colors.fat,
      fatMuted: colors.fatMuted,
    };
  }

  return {
    protein: theme.colors.status.success,
    proteinMuted: 'rgba(94,158,53,0.14)',
    carbs: theme.colors.persona.core,
    carbsMuted: theme.colors.persona.soft,
    fat: theme.colors.status.warning,
    fatMuted: 'rgba(180,132,73,0.16)',
  };
}

const styles = StyleSheet.create({
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    marginBottom: spacing[1],
  },
  calorieValue: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  calorieGoal: {
    marginBottom: 4,
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    borderRadius: 999,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ringFill: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringArc: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 6,
  },
  ringText: {
    fontSize: 11,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: spacing[4],
  },
  macrosContainer: {
    gap: spacing[4],
  },
});
