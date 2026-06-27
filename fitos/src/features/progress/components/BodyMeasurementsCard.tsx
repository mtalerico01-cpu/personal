import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing, radius } from '@/shared/theme/spacing';

interface Measurement {
  id: string;
  name: string;
  value: number | null;
  unit: string;
}

interface BodyMeasurementsCardProps {
  measurements: Measurement[];
}

export function BodyMeasurementsCard({ measurements }: BodyMeasurementsCardProps) {
  return (
    <Card padding={16}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
        BODY MEASUREMENTS
      </Text>
      <View style={styles.grid}>
        {measurements.map((m) => (
          <TouchableOpacity key={m.id} style={styles.cell} activeOpacity={0.7}>
            <Text variant="caption" color={colors.textTertiary}>{m.name.toUpperCase()}</Text>
            {m.value !== null ? (
              <Text variant="headingSmall" color={colors.textPrimary}>
                {m.value}{m.unit}
              </Text>
            ) : (
              <View style={styles.emptySlot}>
                <Text variant="caption" color={colors.textDisabled}>+ Log</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: spacing[3] },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  cell: {
    width: '28%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: spacing[3],
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    gap: spacing[1],
  },
  emptySlot: {
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.sm,
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
  },
});
