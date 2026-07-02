/**
 * CoachBackground -- Web implementation
 * Uses a static ambient brand background behind the Coach experience.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';

export function CoachBackground() {
  const theme = useActiveTheme();

  return (
    <View style={styles.container} pointerEvents="none">
      {/* @ts-ignore -- web-only static ambient layer */}
      <div style={theme.mode === 'dark' ? darkAmbientStyle : lightAmbientStyle} />
      {/* @ts-ignore -- radial gradient vignette: dark edges, clear center */}
      <div style={theme.mode === 'dark' ? darkVignetteStyle : lightVignetteStyle} />
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
const lightAmbientStyle = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  backgroundImage:
    'radial-gradient(ellipse at 30% 28%, rgba(120,190,235,0.30) 0%, rgba(120,190,235,0.12) 26%, transparent 54%), radial-gradient(ellipse at 72% 68%, rgba(255,255,255,0.95) 0%, rgba(220,238,248,0.54) 30%, transparent 58%), linear-gradient(118deg, rgba(255,255,255,0.62), rgba(238,242,244,0.24) 44%, rgba(120,190,235,0.12) 74%, transparent 100%)',
  mixBlendMode: 'normal',
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

// @ts-ignore
const lightVignetteStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
  backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(120,190,235,0.16) 0%, rgba(255,255,255,0.42) 28%, transparent 54%), radial-gradient(ellipse at center, rgba(245,247,248,0.05) 0%, rgba(245,247,248,0.20) 35%, rgba(238,242,244,0.70) 100%)',
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
