/**
 * CoachBackground -- Web implementation
 * Uses the dark motion background video as a full-screen looping backdrop.
 */
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCoachStore } from '../store/coachStore';
import { useActiveTheme } from '@/shared/theme/useActiveTheme';

const MOTION_STYLE_ID = 'fitos-coach-background-motion';
const VIDEO_SRC_BY_PERSONA = {
  cedric: '/branding/backgrounds/cedric-intelligence-loop.mp4',
  elara: '/branding/backgrounds/elara-intelligence-loop.mp4',
} as const;
const VIDEO_LOAD_DELAY_MS = 900;
const VIDEO_TIMEOUT_MS = 6500;

export function CoachBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const personaId = useCoachStore((state) => state.personaId);
  const theme = useActiveTheme();
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);
  const videoSrc = VIDEO_SRC_BY_PERSONA[personaId];

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldSkipVideo =
      prefersReducedMotion ||
      connection?.saveData ||
      connection?.effectiveType === 'slow-2g' ||
      connection?.effectiveType === '2g';

    if (shouldSkipVideo) return;

    const loadVideo = () => setShouldLoadVideo(true);
    const idleCallback = 'requestIdleCallback' in window
      ? window.requestIdleCallback(loadVideo, { timeout: 2200 })
      : undefined;
    const delayId = window.setTimeout(loadVideo, VIDEO_LOAD_DELAY_MS);

    return () => {
      window.clearTimeout(delayId);
      if (idleCallback !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallback);
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1.0;
    video.src = videoSrc;

    const play = () => {
      if (!video.paused && video.readyState > 1) return;
      video.play().catch(() => {});
    };

    const resume = () => play();

    video.addEventListener('loadedmetadata', resume);
    video.addEventListener('loadeddata', resume);
    video.addEventListener('canplay', resume);
    video.addEventListener('playing', resume);
    document.addEventListener('pointerdown', play);
    document.addEventListener('keydown', play);
    window.addEventListener('focus', play);
    document.addEventListener('visibilitychange', play);

    video.load();
    resume();

    const intervalId = window.setInterval(resume, 1500);
    const timeoutId = window.setTimeout(() => {
      if (video.readyState < 2 || video.videoWidth === 0) {
        video.pause();
        video.removeAttribute('src');
        video.load();
      }
    }, VIDEO_TIMEOUT_MS);

    return () => {
      video.removeEventListener('loadedmetadata', resume);
      video.removeEventListener('loadeddata', resume);
      video.removeEventListener('canplay', resume);
      video.removeEventListener('playing', resume);
      document.removeEventListener('pointerdown', play);
      document.removeEventListener('keydown', play);
      window.removeEventListener('focus', play);
      document.removeEventListener('visibilitychange', play);
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [shouldLoadVideo, videoSrc]);

  useEffect(() => {
    if (document.getElementById(MOTION_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = MOTION_STYLE_ID;
    style.textContent = `
      @keyframes fitosCoachDrift {
        0% { transform: translate3d(-3%, -2%, 0) scale(1.08); background-position: 0% 40%, 100% 55%, 50% 50%; }
        50% { transform: translate3d(3%, 2%, 0) scale(1.14); background-position: 100% 58%, 0% 40%, 58% 48%; }
        100% { transform: translate3d(-3%, -2%, 0) scale(1.08); background-position: 0% 40%, 100% 55%, 50% 50%; }
      }
      @keyframes fitosCoachPulse {
        0%, 100% { opacity: 0.28; }
        50% { opacity: 0.46; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {/* @ts-ignore -- video element is web-only */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        preload="metadata"
        playsInline
        style={videoStyle}
      />
      {/* @ts-ignore -- web-only animated fallback when the browser pauses background video */}
      <div style={personaId === 'cedric' ? cedricFallbackMotionStyle : elaraFallbackMotionStyle} />
      {/* @ts-ignore -- radial gradient vignette: dark edges, clear center */}
      <div style={personaId === 'cedric' ? cedricVignetteStyle : elaraVignetteStyle} />
      <View style={[styles.baseWash, { backgroundColor: theme.colors.background.primary }]} />
    </View>
  );
}

// @ts-ignore
const cedricFallbackMotionStyle = {
  position: 'absolute',
  inset: '-8%',
  zIndex: 0,
  backgroundImage:
    'radial-gradient(ellipse at 28% 34%, rgba(181,255,73,0.13) 0%, rgba(181,255,73,0.035) 24%, transparent 50%), radial-gradient(ellipse at 70% 68%, rgba(152,217,74,0.10) 0%, rgba(152,217,74,0.035) 28%, transparent 56%), linear-gradient(115deg, rgba(255,255,255,0.025), transparent 44%, rgba(181,255,73,0.025) 74%, transparent 100%)',
  filter: 'blur(18px)',
  mixBlendMode: 'screen',
  pointerEvents: 'none',
  animation: 'fitosCoachDrift 24s ease-in-out infinite, fitosCoachPulse 10s ease-in-out infinite',
};

// @ts-ignore
const elaraFallbackMotionStyle = {
  position: 'absolute',
  inset: '-8%',
  zIndex: 0,
  backgroundImage:
    'radial-gradient(ellipse at 30% 28%, rgba(120,190,235,0.30) 0%, rgba(120,190,235,0.12) 26%, transparent 54%), radial-gradient(ellipse at 72% 68%, rgba(255,255,255,0.95) 0%, rgba(220,238,248,0.54) 30%, transparent 58%), linear-gradient(118deg, rgba(255,255,255,0.62), rgba(238,242,244,0.24) 44%, rgba(120,190,235,0.12) 74%, transparent 100%)',
  filter: 'blur(18px)',
  mixBlendMode: 'normal',
  pointerEvents: 'none',
  animation: 'fitosCoachDrift 26s ease-in-out infinite, fitosCoachPulse 12s ease-in-out infinite',
};

// @ts-ignore
const cedricVignetteStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
  backgroundImage: 'radial-gradient(circle at 50% 38%, rgba(181,255,73,0.045) 0%, rgba(181,255,73,0.018) 24%, transparent 42%), radial-gradient(ellipse at center, rgba(8,10,9,0.02) 0%, rgba(8,10,9,0.24) 30%, rgba(8,10,9,0.62) 66%, rgba(8,10,9,0.94) 100%)',
  pointerEvents: 'none',
};

// @ts-ignore
const elaraVignetteStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
  backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(120,190,235,0.16) 0%, rgba(255,255,255,0.42) 28%, transparent 54%), radial-gradient(ellipse at center, rgba(245,247,248,0.05) 0%, rgba(245,247,248,0.20) 35%, rgba(238,242,244,0.70) 100%)',
  pointerEvents: 'none',
};

// @ts-ignore
const videoStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0.58,
  transition: 'opacity 900ms ease',
  filter: 'brightness(1.08) contrast(1.02) saturate(0.88)',
  mixBlendMode: 'screen',
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
