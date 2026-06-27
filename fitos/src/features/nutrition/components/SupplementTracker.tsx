import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing, radius } from '@/shared/theme/spacing';
import type { Supplement } from '../mock';

interface SupplementTrackerProps {
  supplements: Supplement[];
  onToggle: (id: string) => void;
}

export function SupplementTracker({ supplements, onToggle }: SupplementTrackerProps) {
  const takenCount = supplements.filter((s) => s.taken).length;

  return (
    <Card padding={16}>
      <View style={styles.header}>
        <Text variant="labelMedium" color={colors.textTertiary}>
          SUPPLEMENTS
        </Text>
        <Text variant="labelMedium" color={colors.accent}>
          {takenCount}/{supplements.length} taken
        </Text>
      </View>

      <View style={styles.grid}>
        {supplements.map((supplement) => (
          <SupplementPill
            key={supplement.id}
            supplement={supplement}
            onToggle={() => onToggle(supplement.id)}
          />
        ))}
      </View>
    </Card>
  );
}

interface SupplementPillProps {
  supplement: Supplement;
  onToggle: () => void;
}

function SupplementPill({ supplement, onToggle }: SupplementPillProps) {
  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.75}
      style={[
        styles.pill,
        supplement.taken && styles.pillTaken,
      ]}
    >
      <Text
        variant="labelMedium"
        color={supplement.taken ? colors.success : colors.textTertiary}
      >
        {supplement.taken ? '✓ ' : ''}{supplement.name}
      </Text>
      <Text
        variant="caption"
        color={supplement.taken ? colors.success : colors.textDisabled}
      >
        {supplement.dose}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  pill: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    gap: 2,
  },
  pillTaken: {
    borderColor: colors.successMuted,
    backgroundColor: colors.successMuted,
  },
});
