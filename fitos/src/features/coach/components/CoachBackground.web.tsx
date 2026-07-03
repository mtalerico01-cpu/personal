/**
 * CoachBackground -- Web implementation
 * Uses a static ambient brand background behind the Coach experience.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';

export function CoachBackground() {
  const theme = useActiveTheme();

  if (theme.mode === 'light') return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {/* @ts-ignore -- web-only static ambient layer */}
      <div style={darkAmbientStyle} />
      {/* @ts-ignore -- radial gradient vignette: dark edges, clear center */}
      <div style={darkVignetteStyle} />
      <View style={[styles.baseWash, { backgroundColor: theme.colors.background.primary }]} />
    </View>
  );
}

// @ts-ignore
const darkAmbientStyle = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  backgroundImage:
    'radial-gradient(circle at 30% 24%, rgba(245,246,248,0.055) 0%, rgba(245,246,248,0.02) 26%, transparent 55%), radial-gradient(circle at 74% 70%, rgba(245,246,248,0.04) 0%, rgba(245,246,248,0.014) 30%, transparent 60%), linear-gradient(118deg, rgba(245,246,248,0.028), rgba(16,18,20,0.22) 44%, rgba(245,246,248,0.018) 74%, transparent 100%)',
  mixBlendMode: 'screen',
  pointerEvents: 'none',
};

// @ts-ignore
const darkVignetteStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
  backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(245,246,248,0.035) 0%, rgba(245,246,248,0.012) 28%, transparent 54%), radial-gradient(ellipse at center, rgba(11,13,16,0.04) 0%, rgba(11,13,16,0.24) 35%, rgba(11,13,16,0.82) 100%)',
  pointerEvents: 'none',
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  baseWash: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
});
