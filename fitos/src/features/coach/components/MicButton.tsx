import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/shared/theme/colors';
import { PersonaId, PERSONAS } from '../mock';

interface MicButtonProps {
  persona: PersonaId;
  onPress: () => void;
  isListening?: boolean;
}

export function MicButton({ persona, onPress, isListening = false }: MicButtonProps) {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 2600 }),
        withTiming(1.0, { duration: 2600 })
      ),
      -1,
      false
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.55, { duration: 2600 }),
        withTiming(0.20, { duration: 2600 })
      ),
      -1,
      false
    );
  }, []);

  const outerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Breathing glow behind button */}
      <Animated.View style={[styles.glow, glowStyle]} />

      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <Animated.View style={[styles.outerRing, outerStyle]}>
          <View style={styles.innerCircle}>
            {/* Mic symbol */}
            <Text style={styles.micIcon}>◉</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>

      <Text style={styles.label}>
        Tap to talk to {PERSONAS[persona].name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 14,
  },
  glow: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(168, 255, 62, 0.18)',
    top: -20,
  },
  outerRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: 'rgba(168, 255, 62, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(168, 255, 62, 0.06)',
  },
  innerCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(168, 255, 62, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micIcon: {
    fontSize: 22,
    color: colors.accent,
    lineHeight: 26,
  },
  label: {
    fontSize: 12,
    fontWeight: '300',
    color: colors.textTertiary,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
});
