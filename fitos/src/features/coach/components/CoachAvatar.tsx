import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/shared/components/ui/Text';
import { colors } from '@/shared/theme/colors';
import { PersonaId, PERSONAS } from '../mock';

interface CoachAvatarProps {
  persona: PersonaId;
}

export function CoachAvatar({ persona }: CoachAvatarProps) {
  const p = PERSONAS[persona];

  return (
    <View style={styles.container}>
      {/* Outer glow ring */}
      <View style={styles.glowOuter} />
      {/* Ring border */}
      <View style={styles.ring}>
        {/* Avatar circle */}
        <View style={styles.avatar}>
          <Text style={styles.initials}>{p.initials}</Text>
        </View>
      </View>
    </View>
  );
}

const AVATAR_SIZE = 80;
const RING_SIZE = AVATAR_SIZE + 10;
const GLOW_SIZE = RING_SIZE + 28;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: GLOW_SIZE,
    height: GLOW_SIZE,
  },
  glowOuter: {
    position: 'absolute',
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    borderRadius: GLOW_SIZE / 2,
    backgroundColor: 'rgba(0, 212, 170, 0.10)',
  },
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1.5,
    borderColor: colors.coachRing,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: 'rgba(0, 212, 170, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 28,
    fontWeight: '300',
    color: colors.accent,
    letterSpacing: 1,
  },
});
