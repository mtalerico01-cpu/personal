import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '@/shared/theme/colors';

interface WaveformProps {
  isThinking: boolean;
}

const BAR_COUNT = 9;
const BAR_WIDTH = 2.5;
const BAR_GAP = 5;
const IDLE_HEIGHTS = [4, 7, 12, 18, 22, 18, 12, 7, 4];
const THINK_HEIGHTS = [8, 18, 28, 36, 42, 36, 28, 18, 8];

function Bar({ index, isThinking }: { index: number; isThinking: boolean }) {
  const height = useSharedValue(IDLE_HEIGHTS[index]);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    const idleH = IDLE_HEIGHTS[index];
    const thinkH = THINK_HEIGHTS[index];
    const baseDur = isThinking ? 280 : 2200;
    const stagger = index * (isThinking ? 60 : 200);

    height.value = withRepeat(
      withSequence(
        withTiming(isThinking ? thinkH : idleH, { duration: baseDur + stagger }),
        withTiming(isThinking ? idleH : idleH * 0.5, { duration: baseDur + stagger })
      ),
      -1,
      true
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(isThinking ? 1 : 0.6, { duration: baseDur + stagger }),
        withTiming(isThinking ? 0.5 : 0.25, { duration: baseDur + stagger })
      ),
      -1,
      true
    );
  }, [isThinking]);

  const barStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: BAR_WIDTH,
          borderRadius: BAR_WIDTH / 2,
          backgroundColor: colors.accent,
        },
        barStyle,
      ]}
    />
  );
}

export function Waveform({ isThinking }: WaveformProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <Bar key={i} index={i} isThinking={isThinking} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: BAR_GAP,
    height: 48,
    paddingVertical: 8,
  },
});
