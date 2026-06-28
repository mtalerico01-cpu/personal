/**
 * CoachBackground — Web implementation
 *
 * Matches the AI Coach Landing Prototype reference images:
 * soft radial glow volumes at very low opacity, drifting imperceptibly slow.
 * The effect is NOT texture/noise — it is subtle luminance variation from
 * large semi-transparent gradient circles layered on a near-black base.
 * This is exactly how premium AI product landing pages achieve atmospheric depth.
 */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

// Use a fixed mobile-like canvas size so blobs are always on-screen
// regardless of the browser window width.
const W = 500;
const H = 850;

// ── Glow blob config ───────────────────────────────────────────────────────
// Each blob is a large circle with a LinearGradient fill fading to transparent.
// Keep inner opacity visible but not gaudy — subtle atmospheric depth.

const BLOBS = [
  // Upper-left warm fog — center visible at (25%, 20%)
  { id: 'f1', size: 600, cx: W * 0.25,  cy: H * 0.20, inner: 'rgba(42,38,30,0.70)', outer: 'rgba(5,5,5,0.0)',    dx: 55,  dy: -25, dur: 52000 },
  // Upper-right warm fog — center visible at (78%, 10%)
  { id: 'f2', size: 560, cx: W * 0.78,  cy: H * 0.10, inner: 'rgba(38,35,26,0.65)', outer: 'rgba(5,5,5,0.0)',    dx: -60, dy: 45,  dur: 44000 },
  // Mid-left depth — center at (20%, 55%)
  { id: 'f3', size: 520, cx: W * 0.20,  cy: H * 0.55, inner: 'rgba(36,33,26,0.60)', outer: 'rgba(5,5,5,0.0)',    dx: 50,  dy: -55, dur: 38000 },
  // Lower-right pool — center at (80%, 78%)
  { id: 'f4', size: 580, cx: W * 0.80,  cy: H * 0.78, inner: 'rgba(34,31,24,0.65)', outer: 'rgba(5,5,5,0.0)',    dx: -40, dy: -35, dur: 60000 },
  // Center-top AI green bloom — center at (50%, 15%)
  { id: 'g1', size: 500, cx: W * 0.50,  cy: H * 0.15, inner: 'rgba(20,52,12,0.60)', outer: 'rgba(5,5,5,0.0)',    dx: 28,  dy: 22,  dur: 46000 },
  // Secondary green wisp — center at (30%, 42%)
  { id: 'g2', size: 360, cx: W * 0.30,  cy: H * 0.42, inner: 'rgba(16,40,10,0.50)', outer: 'rgba(5,5,5,0.0)',    dx: -30, dy: -28, dur: 34000 },
  // Large background haze — center at (60%, 65%)
  { id: 'f5', size: 640, cx: W * 0.60,  cy: H * 0.65, inner: 'rgba(38,35,28,0.60)', outer: 'rgba(5,5,5,0.0)',    dx: -22, dy: -45, dur: 70000 },
] as const;

type BlobConfig = (typeof BLOBS)[number];

function GlowBlob({ blob }: { blob: BlobConfig }) {
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);

  useEffect(() => {
    tx.value = withRepeat(
      withSequence(
        withTiming(blob.dx, { duration: blob.dur, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: blob.dur, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    );
    ty.value = withRepeat(
      withSequence(
        withTiming(blob.dy, { duration: blob.dur * 1.3, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: blob.dur * 1.3, easing: Easing.inOut(Easing.sin) })
      ),
      -1,
      false
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }));

  const left = blob.cx - blob.size / 2;
  const top  = blob.cy - blob.size / 2;

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          width: blob.size,
          height: blob.size,
          borderRadius: blob.size / 2,
          left,
          top,
          // @ts-ignore — web-only CSS: transforms the blob into real soft smoke volume
          filter: `blur(${Math.round(blob.size * 0.14)}px)`,
        },
        animStyle,
      ]}
    >
      <LinearGradient
        colors={[blob.inner, blob.outer]}
        style={{ width: blob.size, height: blob.size, borderRadius: blob.size / 2 }}
      />
    </Animated.View>
  );
}

export function CoachBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Base */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#050505' }]} />

      {/* Atmospheric glow blobs */}
      {BLOBS.map(b => <GlowBlob key={b.id} blob={b} />)}

      {/* Top vignette — deepens the sense of looking into a portal */}
      <LinearGradient
        colors={['rgba(5,5,5,0.85)', 'rgba(5,5,5,0.0)']}
        style={styles.vigTop}
        pointerEvents="none"
      />

      {/* Bottom vignette */}
      <LinearGradient
        colors={['rgba(5,5,5,0.0)', 'rgba(5,5,5,0.92)']}
        style={styles.vigBottom}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  vigTop: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 240,
  },
  vigBottom: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 240,
  },
});

