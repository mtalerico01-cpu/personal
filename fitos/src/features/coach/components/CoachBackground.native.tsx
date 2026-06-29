import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Canvas, Fill, Shader, Skia, useClock } from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';
import { useCoachStore } from '../store/coachStore';

const { width: W, height: H } = Dimensions.get('window');

// -----------------------------------------------------------------------------
// SKSL Shader � Multi-layer FBM (Fractional Brownian Motion) atmospheric smoke
//
// Same technique as After Effects "Turbulent Noise" and Unity VFX Graph fog.
// FBM sums noise octaves at increasing frequencies. Domain warping (feeding
// one FBM output into the next layer's coordinates) creates organic curling
// without any texture assets. All computation runs on the GPU.
// -----------------------------------------------------------------------------
const SMOKE_SKSL = `
uniform float2 iResolution;
uniform float  iTime;
uniform float  iMode;

float hash(float2 p) {
  p = fract(p * float2(127.1, 311.7));
  p += dot(p, p + 19.31);
  return fract(p.x * p.y);
}

float noise(float2 p) {
  float2 i = floor(p);
  float2 f = fract(p);
  float2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),               hash(i + float2(1,0)), u.x),
    mix(hash(i + float2(0,1)), hash(i + float2(1,1)), u.x),
    u.y
  );
}

float fbm(float2 p) {
  float v = 0.0;
  float a = 0.5;
  float2 shift = float2(100.0, 100.0);
  float ca = cos(0.5); float sa = sin(0.5);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = float2(ca*p.x - sa*p.y, sa*p.x + ca*p.y) * 2.1 + shift;
    a *= 0.48;
  }
  return v;
}

half4 main(float2 fragCoord) {
  float2 uv = fragCoord / iResolution;
  float  t  = iTime * 0.000048;

  float2 pA = uv * 1.6 + float2(t * 0.09, -t * 0.03);
  float  fA = fbm(pA);

  float2 pB = uv * 2.8 + float2(-t * 0.11, t * 0.07) + float2(fA * 0.55, fA * 0.28);
  float  fB = fbm(pB);

  float2 pC = uv * 5.2 + float2(t * 0.05, t * 0.16) + float2(fB * 0.38, fA * 0.22);
  float  fC = fbm(pC);

  float2 center = uv - float2(0.5, 0.5);
  float  angle  = t * 0.012;
  float  ca2 = cos(angle); float sa2 = sin(angle);
  float2 pD = float2(ca2*center.x - sa2*center.y, sa2*center.x + ca2*center.y) * 2.2 + float2(0.5, 0.5);
  float  fD = fbm(pD + float2(47.0, 23.0));

  float smoke = fA * 0.40 + fB * 0.28 + fC * 0.18 + fD * 0.14;
  smoke = clamp(smoke, 0.0, 1.0);

  float dense = pow(smoke, 1.8);
  float wispy = pow(smoke, 0.6) * 0.5;
  float vol   = dense * 0.65 + wispy * 0.35;

  float3 darkBase = float3(0.020, 0.020, 0.020);
  float3 darkBody = float3(0.058, 0.054, 0.048);
  float3 darkGlow = float3(0.030, 0.072, 0.018);
  float3 lightBase = float3(0.945, 0.958, 0.965);
  float3 lightBody = float3(0.840, 0.894, 0.925);
  float3 lightGlow = float3(0.280, 0.620, 0.820);

  float3 base = mix(darkBase, lightBase, iMode);
  float3 body = mix(darkBody, lightBody, iMode);
  float3 glow = mix(darkGlow, lightGlow, iMode);

  float3 col = mix(base, body, vol * 0.78);

  float greenMask = pow(fA * fB, 2.2);
  col = mix(col, glow, greenMask * mix(0.18, 0.10, iMode));

  float2 vUV = uv * 2.0 - 1.0;
  float  vig  = 1.0 - dot(vUV * float2(0.38, 0.48), vUV * float2(0.38, 0.48));
  vig = clamp(vig, 0.0, 1.0);
  col *= mix(0.25, 1.0, vig);

  return half4(col, 1.0);
}
`;

// Lazy — created on first render after Skia WASM is loaded on web
let _effect: ReturnType<typeof Skia.RuntimeEffect.Make> | null | undefined;
function getEffect() {
  if (_effect === undefined) {
    _effect = Skia.RuntimeEffect?.Make(SMOKE_SKSL) ?? null;
  }
  return _effect;
}

export function CoachBackground() {
  const personaId = useCoachStore((state) => state.personaId);
  const effect = getEffect();
  const clock = useClock();

  const uniforms = useDerivedValue(() => ({
    iResolution: [W, H],
    iTime: clock.value,
    iMode: personaId === 'elara' ? 1 : 0,
  }), [personaId]);

  if (!effect) return null;

  return (
    <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
      <Fill>
        <Shader source={effect} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
}
