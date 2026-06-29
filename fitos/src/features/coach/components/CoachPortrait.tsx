import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { colors } from '@/shared/theme/colors';
import { PersonaId, PERSONAS } from '../mock';

const PORTRAITS = {
  cedric: require('../../../../assets/Branding/Cedric 2.png'),
  elara: require('../../../../assets/Branding/Elara 2.png'),
} as const;

interface CoachPortraitProps {
  persona: PersonaId;
  active: boolean;
  onPress: () => void;
}

const RING_SIZE = 108;
const AVATAR_SIZE = 92;
const GLOW_SIZE = RING_SIZE + 32;

export function CoachPortrait({ persona, active, onPress }: CoachPortraitProps) {
  const ringOpacity = useSharedValue(active ? 1 : 0.15);
  const ringScale = useSharedValue(active ? 1 : 0.96);
  const avatarOpacity = useSharedValue(active ? 1 : 0.55);
  const glowOpacity = useSharedValue(active ? 0.22 : 0);

  useEffect(() => {
    ringOpacity.value = withTiming(active ? 1 : 0.15, { duration: 500 });
    avatarOpacity.value = withTiming(active ? 1 : 0.55, { duration: 500 });
    glowOpacity.value = withTiming(active ? 0.22 : 0, { duration: 500 });

    if (active) {
      ringScale.value = withRepeat(
        withSequence(
          withTiming(1.04, { duration: 3000 }),
          withTiming(1.0, { duration: 3000 })
        ),
        -1,
        false
      );
    } else {
      ringScale.value = withTiming(0.96, { duration: 500 });
    }
  }, [active]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value,
    transform: [{ scale: ringScale.value }],
  }));
  const avatarStyle = useAnimatedStyle(() => ({
    opacity: avatarOpacity.value,
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const p = PERSONAS[persona];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.container}>
      {/* Breathing outer glow */}
      <Animated.View style={[styles.glow, glowStyle]} />

      {/* Active ring + portrait */}
      <Animated.View style={[styles.ring, ringStyle]}>
        <Animated.View style={[styles.imageWrapper, avatarStyle]}>
          <Image
            source={PORTRAITS[persona]}
            style={styles.portrait}
            resizeMode="cover"
          />
        </Animated.View>
      </Animated.View>

      {/* Coach name */}
      <Text style={[styles.name, { color: active ? colors.textPrimary : colors.textTertiary }]}>
        {p.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  glow: {
    position: 'absolute',
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    borderRadius: GLOW_SIZE / 2,
    backgroundColor: colors.semantic.accent.glow,
    top: -(GLOW_SIZE - RING_SIZE) / 2,
  },
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1.5,
    borderColor: colors.semantic.border.strong,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.semantic.surface.raised,
  },
  imageWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
  },
  portrait: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  name: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
});

