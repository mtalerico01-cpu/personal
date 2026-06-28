import React from 'react';
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  ClipPath,
  Circle,
  Ellipse,
  Rect,
  Path,
  G,
} from 'react-native-svg';

export function CedricPortrait({ size = 86 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        {/* ── Background ── */}
        <RadialGradient id="c-bg" cx="50%" cy="35%" r="65%">
          <Stop offset="0%" stopColor="#1C1410" />
          <Stop offset="60%" stopColor="#0E0A08" />
          <Stop offset="100%" stopColor="#050302" />
        </RadialGradient>

        {/* ── Skin — warm deep brown ── */}
        <RadialGradient id="c-skin" cx="48%" cy="32%" r="62%">
          <Stop offset="0%" stopColor="#8A5C3C" />
          <Stop offset="35%" stopColor="#6A4028" />
          <Stop offset="70%" stopColor="#4E2E18" />
          <Stop offset="100%" stopColor="#2A1808" />
        </RadialGradient>

        {/* ── Hair — deep dark brown-black ── */}
        <RadialGradient id="c-hair" cx="50%" cy="25%" r="55%">
          <Stop offset="0%" stopColor="#1C1008" />
          <Stop offset="100%" stopColor="#060402" />
        </RadialGradient>

        {/* ── Iris — dark intelligent brown ── */}
        <RadialGradient id="c-iris" cx="38%" cy="38%" r="65%">
          <Stop offset="0%" stopColor="#6A4220" />
          <Stop offset="50%" stopColor="#3A2010" />
          <Stop offset="100%" stopColor="#100808" />
        </RadialGradient>

        {/* ── Rim light — cinematic left-side ── */}
        <LinearGradient id="c-rim" x1="0%" y1="20%" x2="80%" y2="100%">
          <Stop offset="0%" stopColor="#B08060" stopOpacity="0.28" />
          <Stop offset="40%" stopColor="#806040" stopOpacity="0.08" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </LinearGradient>

        {/* ── Neck gradient ── */}
        <LinearGradient id="c-neck" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#5A3C24" />
          <Stop offset="100%" stopColor="#1E1008" />
        </LinearGradient>

        {/* ── Jacket ── */}
        <LinearGradient id="c-jacket" x1="0%" y1="0%" x2="20%" y2="100%">
          <Stop offset="0%" stopColor="#1E1E1E" />
          <Stop offset="60%" stopColor="#0C0C0C" />
          <Stop offset="100%" stopColor="#060606" />
        </LinearGradient>

        {/* ── Jacket sheen ── */}
        <LinearGradient id="c-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#3A3A3A" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </LinearGradient>

        {/* ── Vignette ── */}
        <RadialGradient id="c-vig" cx="50%" cy="50%" r="50%">
          <Stop offset="45%" stopColor="#000000" stopOpacity="0" />
          <Stop offset="80%" stopColor="#000000" stopOpacity="0.45" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
        </RadialGradient>

        {/* ── Forehead bloom ── */}
        <RadialGradient id="c-bloom" cx="50%" cy="30%" r="40%">
          <Stop offset="0%" stopColor="#A86840" stopOpacity="0.18" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </RadialGradient>

        {/* ── Circle clip ── */}
        <ClipPath id="c-clip">
          <Circle cx="60" cy="60" r="59" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#c-clip)">
        {/* Background */}
        <Rect x="0" y="0" width="120" height="120" fill="url(#c-bg)" />

        {/* ── Jacket & Shoulders ── */}
        <Path
          d="M0,120 L0,92 Q8,82 20,78 Q32,74 42,78 L42,120 Z"
          fill="url(#c-jacket)"
        />
        <Path
          d="M120,120 L120,92 Q112,82 100,78 Q88,74 78,78 L78,120 Z"
          fill="url(#c-jacket)"
        />
        <Path
          d="M42,78 Q60,70 78,78 L80,120 L40,120 Z"
          fill="url(#c-jacket)"
        />
        {/* Jacket sheen top-left */}
        <Path
          d="M0,92 Q12,72 28,68 L34,76 Q18,80 8,96 Z"
          fill="url(#c-sheen)"
        />
        {/* Collar / V-neck */}
        <Path
          d="M46,80 Q60,72 74,80 L70,88 Q60,78 50,88 Z"
          fill="#0A0A0A"
        />
        <Path
          d="M48,82 Q60,76 72,82"
          stroke="#282828"
          strokeWidth="0.5"
          fill="none"
        />

        {/* ── Neck ── */}
        <Path
          d="M47,97 Q60,90 73,97 L75,110 Q60,106 45,110 Z"
          fill="url(#c-neck)"
        />
        {/* Neck shadow sides */}
        <Ellipse cx="46" cy="100" rx="6" ry="10" fill="#1A0C06" opacity="0.5" />
        <Ellipse cx="74" cy="100" rx="6" ry="10" fill="#1A0C06" opacity="0.5" />

        {/* ── Face base ── */}
        <Ellipse cx="60" cy="61" rx="34" ry="41" fill="url(#c-skin)" />

        {/* Face shadow sides (sculpted jaw) */}
        <Ellipse cx="28" cy="67" rx="8" ry="16" fill="#1A0C06" opacity="0.45" />
        <Ellipse cx="92" cy="67" rx="8" ry="16" fill="#1A0C06" opacity="0.45" />

        {/* Jaw line shadow */}
        <Path
          d="M34,85 Q60,96 86,85 Q78,100 60,103 Q42,100 34,85 Z"
          fill="#1A0A06"
          opacity="0.5"
        />

        {/* ── Hair (close-cropped natural) ── */}
        {/* Main hair mass */}
        <Path
          d="M26,57 Q27,22 60,18 Q93,22 94,57 Q88,36 60,33 Q32,36 26,57 Z"
          fill="url(#c-hair)"
        />
        {/* Fade sides — barber fade effect */}
        <Path
          d="M26,57 Q24,46 27,38 Q30,30 36,25 Q28,36 30,54 Z"
          fill="#080402"
          opacity="0.9"
        />
        <Path
          d="M94,57 Q96,46 93,38 Q90,30 84,25 Q92,36 90,54 Z"
          fill="#080402"
          opacity="0.9"
        />
        {/* Hairline edge */}
        <Path
          d="M34,38 Q48,30 60,29 Q72,30 86,38"
          stroke="#0A0604"
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
        />
        {/* Hair texture sheen */}
        <Path
          d="M42,24 Q60,19 78,24 Q68,21 60,21 Q52,21 42,24 Z"
          fill="#2A1A10"
          opacity="0.4"
        />

        {/* ── Ears ── */}
        <Ellipse cx="26" cy="63" rx="5" ry="8" fill="#5A3A22" />
        <Ellipse cx="27" cy="63" rx="3" ry="5.5" fill="#3E2814" />
        <Ellipse cx="92" cy="63" rx="5" ry="8" fill="#5A3A22" />
        <Ellipse cx="91" cy="63" rx="3" ry="5.5" fill="#3E2814" />

        {/* ── LEFT EYE ── */}
        {/* Socket depth */}
        <Ellipse cx="44" cy="54" rx="13" ry="9" fill="#1A0A06" opacity="0.5" />
        {/* Sclera */}
        <Ellipse cx="44" cy="54" rx="9.5" ry="6.5" fill="#EAE0D2" />
        {/* Sclera redness / realism */}
        <Ellipse cx="36" cy="55" rx="3" ry="2" fill="#E8C8B0" opacity="0.3" />
        {/* Iris */}
        <Circle cx="44" cy="54" r="5.5" fill="url(#c-iris)" />
        {/* Limbal ring */}
        <Circle cx="44" cy="54" r="5.5" fill="none" stroke="#0A0606" strokeWidth="0.8" />
        {/* Pupil */}
        <Circle cx="44" cy="54" r="2.8" fill="#060402" />
        {/* Specular highlight */}
        <Circle cx="45.8" cy="52.2" r="1.4" fill="white" opacity="0.92" />
        <Circle cx="43.2" cy="55.5" r="0.7" fill="white" opacity="0.4" />
        {/* Upper eyelid */}
        <Path
          d="M34.5,51.5 Q39,48 44,48 Q49,48 53.5,51.5"
          stroke="#100806"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Eyelid crease */}
        <Path
          d="M35,50 Q44,46.5 53,50"
          stroke="#0A0604"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        {/* Lower lash line */}
        <Path
          d="M35.5,57.5 Q44,61 52.5,57.5"
          stroke="#2A1810"
          strokeWidth="0.9"
          fill="none"
          opacity="0.55"
        />
        {/* Left eyebrow — strong, defined, slightly arched */}
        <Path
          d="M31,43 Q36,38.5 45,39.5 Q52,40 56,43"
          stroke="#0C0806"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M32,43 Q37,39.5 45,40.5 Q51,41 55,43"
          stroke="#1E1008"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* ── RIGHT EYE ── */}
        {/* Socket depth */}
        <Ellipse cx="76" cy="54" rx="13" ry="9" fill="#1A0A06" opacity="0.5" />
        {/* Sclera */}
        <Ellipse cx="76" cy="54" rx="9.5" ry="6.5" fill="#EAE0D2" />
        <Ellipse cx="84" cy="55" rx="3" ry="2" fill="#E8C8B0" opacity="0.3" />
        {/* Iris */}
        <Circle cx="76" cy="54" r="5.5" fill="url(#c-iris)" />
        <Circle cx="76" cy="54" r="5.5" fill="none" stroke="#0A0606" strokeWidth="0.8" />
        {/* Pupil */}
        <Circle cx="76" cy="54" r="2.8" fill="#060402" />
        {/* Specular */}
        <Circle cx="77.8" cy="52.2" r="1.4" fill="white" opacity="0.92" />
        <Circle cx="75.2" cy="55.5" r="0.7" fill="white" opacity="0.4" />
        {/* Upper eyelid */}
        <Path
          d="M66.5,51.5 Q71,48 76,48 Q81,48 85.5,51.5"
          stroke="#100806"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M67,50 Q76,46.5 85,50"
          stroke="#0A0604"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        <Path
          d="M67.5,57.5 Q76,61 84.5,57.5"
          stroke="#2A1810"
          strokeWidth="0.9"
          fill="none"
          opacity="0.55"
        />
        {/* Right eyebrow */}
        <Path
          d="M64,43 Q68,40 76,39.5 Q84,40 89,43"
          stroke="#0C0806"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M65,43 Q69,40.5 76,40.5 Q83,41 88,43"
          stroke="#1E1008"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* ── NOSE ── */}
        {/* Bridge shadow */}
        <Path d="M56,58 Q57,64 56,70" stroke="#2A1608" strokeWidth="1.2" fill="none" opacity="0.35" />
        {/* Nose tip */}
        <Ellipse cx="60" cy="71" rx="6" ry="4.5" fill="#5A3820" opacity="0.35" />
        {/* Alar wings */}
        <Path d="M51,70 Q53,73 56,72 Q58,74 60,73 Q62,74 64,72 Q67,73 69,70" stroke="#2A1408" strokeWidth="1.5" fill="none" opacity="0.5" />
        {/* Nostrils */}
        <Ellipse cx="54.5" cy="71.5" rx="3.5" ry="2.5" fill="#1E1008" opacity="0.75" />
        <Ellipse cx="65.5" cy="71.5" rx="3.5" ry="2.5" fill="#1E1008" opacity="0.75" />
        {/* Nose highlight */}
        <Ellipse cx="61" cy="68" rx="3" ry="2" fill="#9A6A40" opacity="0.25" />

        {/* ── MOUTH ── */}
        {/* Upper lip */}
        <Path
          d="M49,79 Q54,75.5 60,76.5 Q66,75.5 71,79"
          stroke="#2A1408"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
        {/* Philtrum */}
        <Path d="M57.5,75 Q60,73 62.5,75" stroke="#2A1608" strokeWidth="0.8" fill="none" opacity="0.5" />
        {/* Lip shape */}
        <Path
          d="M49,79 Q54,76 60,77 Q66,76 71,79 Q67,83 60,84 Q53,83 49,79 Z"
          fill="#3A1E10"
          opacity="0.85"
        />
        {/* Lip shine */}
        <Path d="M55,78 Q60,77 65,78" stroke="#5A3020" strokeWidth="0.6" fill="none" opacity="0.4" />
        {/* Mouth corner */}
        <Circle cx="49" cy="79" r="1" fill="#1A0A06" opacity="0.6" />
        <Circle cx="71" cy="79" r="1" fill="#1A0A06" opacity="0.6" />

        {/* ── CHEEKBONE HIGHLIGHTS ── */}
        <Ellipse cx="34" cy="65" rx="9" ry="6" fill="#9A6A40" opacity="0.12" />
        <Ellipse cx="86" cy="65" rx="9" ry="6" fill="#9A6A40" opacity="0.12" />

        {/* ── FOREHEAD BLOOM ── */}
        <Ellipse cx="60" cy="43" rx="20" ry="10" fill="#A06838" opacity="0.10" />

        {/* ── RIM LIGHT (cinematic left studio light) ── */}
        <Rect x="0" y="0" width="120" height="120" fill="url(#c-rim)" />

        {/* ── SUBTLE GREEN AI TINT ── */}
        <Circle cx="60" cy="60" r="59" fill="rgba(168,255,62,0.025)" />

        {/* ── VIGNETTE ── */}
        <Circle cx="60" cy="60" r="59" fill="url(#c-vig)" />
      </G>
    </Svg>
  );
}
