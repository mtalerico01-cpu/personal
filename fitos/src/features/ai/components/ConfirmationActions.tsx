import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '../../../shared/theme/colors';
import { spacing, radius } from '../../../shared/theme/spacing';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function ConfirmationActions({
  onConfirm,
  onCancel,
  confirmLabel = 'Apply',
  cancelLabel = 'Cancel',
}: Props) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.confirm} onPress={onConfirm} activeOpacity={0.75}>
        <Text variant="labelMedium" color={colors.background}>
          {confirmLabel}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancel} onPress={onCancel} activeOpacity={0.75}>
        <Text variant="labelMedium" color={colors.textSecondary}>
          {cancelLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing[2],
    marginTop: spacing[2],
  },
  confirm: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing[3],
    alignItems: 'center',
  },
  cancel: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing[3],
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
