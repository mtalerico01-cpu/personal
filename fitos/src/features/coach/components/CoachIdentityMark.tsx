import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';
import type { PersonaId } from '../store/coachStore';

interface CoachIdentityMarkProps {
  persona: PersonaId;
  size?: number;
  active?: boolean;
}

export function CoachIdentityMark({ persona, size = 34, active = true }: CoachIdentityMarkProps) {
  const theme = useActiveTheme();
  const isCurrentPersona = theme.mode === (persona === 'cedric' ? 'dark' : 'light');
  const usePersonaColor = active && isCurrentPersona;
  const coreColor = usePersonaColor ? theme.colors.persona.core : theme.colors.text.muted;
  const softColor = usePersonaColor ? theme.colors.persona.soft : theme.colors.surface.subtle;

  return (
    <View
      style={[
        styles.mark,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: usePersonaColor ? theme.colors.border.persona : theme.colors.border.default,
          backgroundColor: softColor,
        },
      ]}
    >
      <View
        style={[
          styles.core,
          {
            width: Math.max(8, size * 0.28),
            height: Math.max(8, size * 0.28),
            borderRadius: Math.max(4, size * 0.14),
            backgroundColor: coreColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mark: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 10,
  },
  core: {
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
});