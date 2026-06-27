import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { spacing, radius } from '@/shared/theme/spacing';

interface ProgressPhoto {
  id: string;
  label: string;
}

interface ProgressPhotosCardProps {
  photos: ProgressPhoto[];
}

export function ProgressPhotosCard({ photos }: ProgressPhotosCardProps) {
  return (
    <Card padding={16}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
        PROGRESS PHOTOS
      </Text>
      <View style={styles.row}>
        {photos.map((photo) => (
          <TouchableOpacity key={photo.id} style={styles.photoSlot} activeOpacity={0.7}>
            <Text style={styles.icon}>📷</Text>
            <Text variant="labelMedium" color={colors.textTertiary}>
              {photo.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: spacing[3] },
  row: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  photoSlot: {
    flex: 1,
    aspectRatio: 0.75,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },
  icon: { fontSize: 24 },
});
