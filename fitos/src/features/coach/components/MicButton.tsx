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
  const barsOpacity = useSharedValue(0.35);

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
    barsOpacity.value = withRepeat(
      withSequence(
        withTiming(0.75, { duration: 2200 }),
        withTiming(0.28, { duration: 2200 })
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
  const barsStyle = useAnimatedStyle(() => ({
    opacity: barsOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Breathing glow behind button */}
      <Animated.View style={[styles.glow, glowStyle]} />

      <View style={styles.micRow}>
        <Animated.View style={[styles.audioLines, styles.audioLinesLeft, barsStyle]}>
          {AUDIO_BARS.map((height, index) => (
            <View key={`left-${index}`} style={[styles.audioBar, { height }]} />
          ))}
        </Animated.View>

        <TouchableOpacity onPress={onPress} activeOpacity={0.85} accessibilityRole="button" accessibilityLabel={`Talk to ${PERSONAS[persona].name}`}>
          <Animated.View style={[styles.outerRing, outerStyle]}>
            <View style={styles.innerCircle}>
              {/* @ts-ignore -- inline SVG mic icon, web-safe */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="2" width="6" height="11" rx="3" stroke={colors.accent} strokeWidth="2"/>
                <path d="M5 11a7 7 0 0 0 14 0" stroke={colors.accent} strokeWidth="2" strokeLinecap="round"/>
                <line x1="12" y1="18" x2="12" y2="22" stroke={colors.accent} strokeWidth="2" strokeLinecap="round"/>
                <line x1="9" y1="22" x2="15" y2="22" stroke={colors.accent} strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </View>
          </Animated.View>
        </TouchableOpacity>

        <Animated.View style={[styles.audioLines, barsStyle]}>
          {AUDIO_BARS.map((height, index) => (
            <View key={`right-${index}`} style={[styles.audioBar, { height }]} />
          ))}
        </Animated.View>
      </View>

      <Text style={styles.label}>
        Tap to talk to {PERSONAS[persona].name}
      </Text>
    </View>
  );
}

const AUDIO_BARS = [2, 5, 3, 8, 4, 11, 3, 6, 2, 8, 3, 5, 2];

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    gap: 7,
  },
  micRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  audioLines: {
    width: 78,
    height: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  audioLinesLeft: {
    transform: [{ scaleX: -1 }],
  },
  audioBar: {
    width: 2,
    borderRadius: 1,
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOpacity: 0.7,
    shadowRadius: 8,
  },
  glow: {
    position: 'absolute',
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: 'rgba(168, 255, 62, 0.18)',
    top: -10,
  },
  outerRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(168, 255, 62, 0.08)',
  },
  innerCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(168, 255, 62, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '300',
    color: colors.textTertiary,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
});
