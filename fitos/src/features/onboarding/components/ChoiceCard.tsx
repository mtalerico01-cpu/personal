import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { radius, spacing } from '@/shared/theme/spacing';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';

interface ChoiceCardProps {
  label: string;
  description?: string;
  selected?: boolean;
  onPress: () => void;
}

export function ChoiceCard({ label, description, selected = false, onPress }: ChoiceCardProps) {
  const theme = useActiveTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ selected }}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: selected ? theme.colors.surface.selected : theme.colors.surface.default,
          borderColor: selected ? theme.colors.border.persona : theme.colors.border.default,
        },
      ]}
    >
      <View style={[styles.indicator, { borderColor: selected ? theme.colors.persona.core : theme.colors.border.default }]}> 
        {selected ? <View style={[styles.indicatorDot, { backgroundColor: theme.colors.persona.core }]} /> : null}
      </View>
      <View style={styles.copy}>
        <Text variant="labelLarge" color={theme.colors.text.primary} style={styles.label}>
          {label}
        </Text>
        {description ? (
          <Text variant="caption" color={theme.colors.text.secondary} style={styles.description}>
            {description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 58,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  label: {
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  description: {
    lineHeight: 19,
  },
});
