/**
 * CoachBackground -- Web implementation
 * Uses the dark motion background video as a full-screen looping backdrop.
 */
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

const MOTION_STYLE_ID = 'fitos-coach-background-motion';
const VIDEO_SRC = '/videos/coach-background.mp4';
const VIDEO_LOAD_DELAY_MS = 900;
const VIDEO_TIMEOUT_MS = 6500;

export function CoachBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = React.useState(false);

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
    video.src = VIDEO_SRC;

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
  }, [shouldLoadVideo]);

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
      <div style={fallbackMotionStyle} />
      {/* @ts-ignore -- radial gradient vignette: dark edges, clear center */}
      <div style={vignetteStyle} />
    </View>
  );
}

// @ts-ignore
const fallbackMotionStyle = {
  position: 'absolute',
  inset: '-8%',
  zIndex: 0,
  background:
    'radial-gradient(ellipse at 28% 34%, rgba(168,255,62,0.26) 0%, rgba(168,255,62,0.08) 22%, transparent 48%), radial-gradient(ellipse at 70% 68%, rgba(124,175,92,0.20) 0%, rgba(124,175,92,0.07) 26%, transparent 54%), linear-gradient(115deg, rgba(255,255,255,0.03), transparent 42%, rgba(168,255,62,0.05) 72%, transparent 100%)',
  backgroundSize: '140% 140%, 150% 150%, 180% 180%',
  filter: 'blur(18px)',
  mixBlendMode: 'screen',
  pointerEvents: 'none',
  animation: 'fitosCoachDrift 18s ease-in-out infinite, fitosCoachPulse 7s ease-in-out infinite',
};

// @ts-ignore
const vignetteStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
  background: 'radial-gradient(circle at 50% 38%, rgba(168,255,62,0.08) 0%, rgba(168,255,62,0.03) 22%, transparent 38%), radial-gradient(ellipse at center, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.20) 28%, rgba(0,0,0,0.58) 64%, rgba(0,0,0,0.90) 100%)',
  pointerEvents: 'none',
};

// @ts-ignore
const videoStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0.72,
  transition: 'opacity 900ms ease',
  filter: 'brightness(1.18) contrast(1.05) saturate(1.08)',
  mixBlendMode: 'screen',
  pointerEvents: 'none',
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#050505',
  },
});
