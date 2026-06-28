import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { PersonaId } from '../mock';

interface PersonaToggleProps {
  active: PersonaId;
  onChange: (id: PersonaId) => void;
}

export function PersonaToggle({ active, onChange }: PersonaToggleProps) {
  return (
    <View style={styles.container}>
      <Pill id="cedric" label="Cedric" active={active} onPress={onChange} />
      <View style={styles.divider} />
      <Pill id="elara" label="Elara" active={active} onPress={onChange} />
    </View>
  );
}

function Pill({
  id,
  label,
  active,
  onPress,
}: {
  id: PersonaId;
  label: string;
  active: PersonaId;
  onPress: (id: PersonaId) => void;
}) {
  const isActive = active === id;
  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      style={[styles.pill, isActive && styles.pillActive]}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.pillText,
          { color: isActive ? colors.accent : colors.textTertiary },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  divider: {
    width: 1,
    height: 14,
    backgroundColor: colors.border,
    marginHorizontal: 2,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pillActive: {
    backgroundColor: colors.accentMuted,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
