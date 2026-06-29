import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Card } from '../../../shared/components/ui/Card';
import { Text } from '../../../shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import { spacing, radius } from '@/shared/theme/spacing';

interface ProgressPhoto {
  id: string;
  label: string;
}

interface ProgressPhotosCardProps {
  photos: ProgressPhoto[];
}

export function ProgressPhotosCard({ photos }: ProgressPhotosCardProps) {
  const theme = useActiveTheme();

  return (
    <Card padding={16}>
      <Text variant="labelMedium" color={colors.textTertiary} style={styles.label}>
        PROGRESS PHOTOS
      </Text>
      <View style={styles.row}>
        {photos.map((photo) => (
          <View
            key={photo.id}
            style={[
              styles.photoSlot,
              { backgroundColor: theme.colors.surface.raised, borderColor: theme.colors.border.default },
            ]}
          >
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: theme.colors.surface.subtle, borderColor: theme.colors.border.subtle },
              ]}
            >
              <CameraIcon color={theme.colors.text.secondary} />
            </View>
            <Text variant="labelMedium" color={colors.textTertiary}>
              {photo.label}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

function CameraIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 8.5C4 7.12 5.12 6 6.5 6h1.9l1.25-1.55A1.2 1.2 0 0 1 10.58 4h2.84c.36 0 .7.16.93.45L15.6 6h1.9C18.88 6 20 7.12 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-8Z"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15.25a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5Z"
        stroke={color}
        strokeWidth={1.7}
      />
    </Svg>
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
    borderRadius: radius['2xl'],
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },
  iconBubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
