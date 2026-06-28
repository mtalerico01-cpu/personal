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

export function ElaraPortrait({ size = 86 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        {/* ── Background ── */}
        <RadialGradient id="e-bg" cx="50%" cy="35%" r="65%">
          <Stop offset="0%" stopColor="#201C28" />
          <Stop offset="60%" stopColor="#141018" />
          <Stop offset="100%" stopColor="#080610" />
        </RadialGradient>

        {/* ── Skin — warm light ── */}
        <RadialGradient id="e-skin" cx="48%" cy="30%" r="65%">
          <Stop offset="0%" stopColor="#F5DDB8" />
          <Stop offset="30%" stopColor="#E8C89A" />
          <Stop offset="65%" stopColor="#D0A070" />
          <Stop offset="100%" stopColor="#A07040" />
        </RadialGradient>

        {/* ── Hair — golden blonde ── */}
        <RadialGradient id="e-hair" cx="40%" cy="20%" r="65%">
          <Stop offset="0%" stopColor="#E0B840" />
          <Stop offset="40%" stopColor="#C09020" />
          <Stop offset="80%" stopColor="#906808" />
          <Stop offset="100%" stopColor="#604804" />
        </RadialGradient>

        {/* ── Hair shadow ── */}
        <RadialGradient id="e-hair-shadow" cx="50%" cy="50%" r="60%">
          <Stop offset="0%" stopColor="#A07818" stopOpacity="0" />
          <Stop offset="100%" stopColor="#402808" stopOpacity="0.7" />
        </RadialGradient>

        {/* ── Iris — warm blue-grey ── */}
        <RadialGradient id="e-iris" cx="38%" cy="38%" r="65%">
          <Stop offset="0%" stopColor="#7AA0B0" />
          <Stop offset="40%" stopColor="#4E7888" />
          <Stop offset="100%" stopColor="#1E3848" />
        </RadialGradient>

        {/* ── Rim light — cool right-side cinematic ── */}
        <LinearGradient id="e-rim" x1="100%" y1="10%" x2="20%" y2="100%">
          <Stop offset="0%" stopColor="#C0D0E0" stopOpacity="0.25" />
          <Stop offset="35%" stopColor="#A0B8CC" stopOpacity="0.08" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </LinearGradient>

        {/* ── Neck ── */}
        <LinearGradient id="e-neck" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#DFB080" />
          <Stop offset="100%" stopColor="#906040" />
        </LinearGradient>

        {/* ── Jacket ── */}
        <LinearGradient id="e-jacket" x1="0%" y1="0%" x2="40%" y2="100%">
          <Stop offset="0%" stopColor="#1A1A1A" />
          <Stop offset="70%" stopColor="#0A0A0A" />
          <Stop offset="100%" stopColor="#060606" />
        </LinearGradient>

        {/* ── Jacket highlight ── */}
        <LinearGradient id="e-jsheen" x1="100%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#404040" stopOpacity="0.35" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </LinearGradient>

        {/* ── Vignette ── */}
        <RadialGradient id="e-vig" cx="50%" cy="50%" r="50%">
          <Stop offset="45%" stopColor="#000000" stopOpacity="0" />
          <Stop offset="78%" stopColor="#000000" stopOpacity="0.40" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0.82" />
        </RadialGradient>

        {/* ── Skin blush (cheeks) ── */}
        <RadialGradient id="e-blush" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#E89080" stopOpacity="0.22" />
          <Stop offset="100%" stopColor="#E89080" stopOpacity="0" />
        </RadialGradient>

        {/* ── Circle clip ── */}
        <ClipPath id="e-clip">
          <Circle cx="60" cy="60" r="59" />
        </ClipPath>
      </Defs>

      <G clipPath="url(#e-clip)">
        {/* Background */}
        <Rect x="0" y="0" width="120" height="120" fill="url(#e-bg)" />

        {/* ── Jacket & Shoulders ── */}
        <Path
          d="M0,120 L0,90 Q10,78 22,74 Q34,70 44,74 L44,120 Z"
          fill="url(#e-jacket)"
        />
        <Path
          d="M120,120 L120,90 Q110,78 98,74 Q86,70 76,74 L76,120 Z"
          fill="url(#e-jacket)"
        />
        <Path
          d="M44,74 Q60,66 76,74 L78,120 L42,120 Z"
          fill="url(#e-jacket)"
        />
        {/* Right-side jacket sheen */}
        <Path
          d="M120,90 Q108,70 94,66 L88,74 Q100,78 112,96 Z"
          fill="url(#e-jsheen)"
        />
        {/* Collar */}
        <Path
          d="M48,76 Q60,68 72,76 L68,84 Q60,74 52,84 Z"
          fill="#0C0C0C"
        />

        {/* ── Neck ── */}
        <Path
          d="M48,95 Q60,88 72,95 L74,110 Q60,106 46,110 Z"
          fill="url(#e-neck)"
        />
        <Ellipse cx="47" cy="98" rx="5.5" ry="9" fill="#906040" opacity="0.4" />
        <Ellipse cx="73" cy="98" rx="5.5" ry="9" fill="#906040" opacity="0.4" />

        {/* ── Face base ── */}
        <Ellipse cx="60" cy="60" rx="32" ry="39" fill="url(#e-skin)" />

        {/* Face shadow sides (feminine softer jaw) */}
        <Ellipse cx="29" cy="66" rx="7" ry="14" fill="#906040" opacity="0.35" />
        <Ellipse cx="91" cy="66" rx="7" ry="14" fill="#906040" opacity="0.35" />

        {/* Jaw / chin shadow */}
        <Path
          d="M36,82 Q60,93 84,82 Q76,96 60,99 Q44,96 36,82 Z"
          fill="#A07040"
          opacity="0.38"
        />

        {/* ── HAIR ── */}
        {/* Main hair mass */}
        <Path
          d="M28,56 Q28,18 60,14 Q92,18 92,56 Q84,28 60,26 Q36,28 28,56 Z"
          fill="url(#e-hair)"
        />
        {/* Hair flow right side */}
        <Path
          d="M92,56 Q96,68 94,80 Q92,92 88,100 Q96,85 96,68 Q97,58 92,48 Z"
          fill="#C09020"
          opacity="0.75"
        />
        {/* Hair flow left side */}
        <Path
          d="M28,56 Q24,68 26,80 Q28,92 32,100 Q24,85 24,68 Q23,58 28,48 Z"
          fill="#906808"
          opacity="0.65"
        />
        {/* Hair highlight streak */}
        <Path
          d="M50,18 Q60,15 70,18 Q64,16 60,16 Q56,16 50,18 Z"
          fill="#F0D060"
          opacity="0.5"
        />
        {/* Hair shadow at part */}
        <Path
          d="M55,16 Q60,14 65,16 Q64,19 60,20 Q56,19 55,16 Z"
          fill="#704808"
          opacity="0.35"
        />
        {/* Hairline */}
        <Path
          d="M32,42 Q46,30 60,28 Q74,30 88,42"
          stroke="#A07818"
          strokeWidth="2"
          fill="none"
          opacity="0.45"
        />

        {/* ── Ears ── */}
        <Ellipse cx="28" cy="61" rx="5" ry="7.5" fill="#D8A870" />
        <Ellipse cx="29" cy="61" rx="3" ry="5" fill="#C09060" />
        <Ellipse cx="92" cy="61" rx="5" ry="7.5" fill="#D8A870" />
        <Ellipse cx="91" cy="61" rx="3" ry="5" fill="#C09060" />

        {/* ── LEFT EYE ── */}
        <Ellipse cx="44" cy="52" rx="12" ry="8" fill="#C09060" opacity="0.3" />
        <Ellipse cx="44" cy="52" rx="9" ry="6" fill="#F5EEE5" />
        {/* Sclera veins */}
        <Ellipse cx="36.5" cy="53" rx="3" ry="1.5" fill="#F0C8B0" opacity="0.25" />
        {/* Iris */}
        <Circle cx="44" cy="52" r="5.2" fill="url(#e-iris)" />
        <Circle cx="44" cy="52" r="5.2" fill="none" stroke="#152830" strokeWidth="0.7" />
        {/* Pupil */}
        <Circle cx="44" cy="52" r="2.5" fill="#080C10" />
        {/* Specular highlights */}
        <Circle cx="45.6" cy="50.4" r="1.5" fill="white" opacity="0.95" />
        <Circle cx="43" cy="53.5" r="0.7" fill="white" opacity="0.45" />
        {/* Upper eyelid */}
        <Path
          d="M35,49.5 Q39.5,46 44,46 Q48.5,46 53,49.5"
          stroke="#0C0810"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
        />
        {/* Eyelid crease */}
        <Path
          d="M36,48.5 Q44,45 52,48.5"
          stroke="#1A1220"
          strokeWidth="0.8"
          fill="none"
          opacity="0.35"
        />
        {/* Lower lash line */}
        <Path
          d="M36,55.5 Q44,58.5 52,55.5"
          stroke="#8A7060"
          strokeWidth="0.9"
          fill="none"
          opacity="0.45"
        />
        {/* Eyeshadow subtle */}
        <Ellipse cx="44" cy="49" rx="9" ry="3" fill="#907080" opacity="0.12" />
        {/* Left eyebrow — elegant, natural arch */}
        <Path
          d="M33,40.5 Q38,36.5 45,37 Q51,37.5 55,40.5"
          stroke="#8B6830"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M34,41 Q38,37.5 45,38 Q51,38.5 54,41"
          stroke="#6A5020"
          strokeWidth="1"
          fill="none"
          opacity="0.45"
        />

        {/* ── RIGHT EYE ── */}
        <Ellipse cx="76" cy="52" rx="12" ry="8" fill="#C09060" opacity="0.3" />
        <Ellipse cx="76" cy="52" rx="9" ry="6" fill="#F5EEE5" />
        <Ellipse cx="83.5" cy="53" rx="3" ry="1.5" fill="#F0C8B0" opacity="0.25" />
        <Circle cx="76" cy="52" r="5.2" fill="url(#e-iris)" />
        <Circle cx="76" cy="52" r="5.2" fill="none" stroke="#152830" strokeWidth="0.7" />
        <Circle cx="76" cy="52" r="2.5" fill="#080C10" />
        <Circle cx="77.6" cy="50.4" r="1.5" fill="white" opacity="0.95" />
        <Circle cx="75" cy="53.5" r="0.7" fill="white" opacity="0.45" />
        <Path
          d="M67,49.5 Q71.5,46 76,46 Q80.5,46 85,49.5"
          stroke="#0C0810"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M68,48.5 Q76,45 84,48.5"
          stroke="#1A1220"
          strokeWidth="0.8"
          fill="none"
          opacity="0.35"
        />
        <Path
          d="M68,55.5 Q76,58.5 84,55.5"
          stroke="#8A7060"
          strokeWidth="0.9"
          fill="none"
          opacity="0.45"
        />
        <Ellipse cx="76" cy="49" rx="9" ry="3" fill="#907080" opacity="0.12" />
        {/* Right eyebrow */}
        <Path
          d="M65,40.5 Q69,37.5 76,37 Q83,37.5 87,40.5"
          stroke="#8B6830"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M66,41 Q70,38 76,38 Q82,38.5 86,41"
          stroke="#6A5020"
          strokeWidth="1"
          fill="none"
          opacity="0.45"
        />

        {/* ── NOSE ── */}
        <Path d="M58,57 Q59,63 58,69" stroke="#C09060" strokeWidth="1" fill="none" opacity="0.3" />
        <Ellipse cx="60" cy="69" rx="5" ry="3.5" fill="#D0A070" opacity="0.25" />
        <Path d="M53,68 Q55,71 58,70 Q60,71.5 62,70 Q65,71 67,68" stroke="#A07040" strokeWidth="1.2" fill="none" opacity="0.45" />
        <Ellipse cx="55.5" cy="70" rx="3" ry="2.2" fill="#906040" opacity="0.55" />
        <Ellipse cx="64.5" cy="70" rx="3" ry="2.2" fill="#906040" opacity="0.55" />
        <Ellipse cx="61" cy="67" rx="2.5" ry="1.8" fill="#F0D0A0" opacity="0.22" />

        {/* ── MOUTH ── */}
        <Path
          d="M50,77 Q55,73 60,74 Q65,73 70,77"
          stroke="#B07050"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
        <Path d="M57.5,73 Q60,71.5 62.5,73" stroke="#C09070" strokeWidth="0.8" fill="none" opacity="0.45" />
        <Path
          d="M50,77 Q55,74 60,75 Q65,74 70,77 Q66,81.5 60,82.5 Q54,81.5 50,77 Z"
          fill="#C07860"
          opacity="0.88"
        />
        {/* Upper lip cupid's bow */}
        <Path
          d="M50,77 Q55,74.5 60,75.5 Q65,74.5 70,77"
          fill="#A86050"
          opacity="0.55"
        />
        {/* Lip highlight */}
        <Path d="M55,79 Q60,78 65,79" stroke="#E09878" strokeWidth="0.7" fill="none" opacity="0.45" />
        <Circle cx="50" cy="77" r="1" fill="#906050" opacity="0.6" />
        <Circle cx="70" cy="77" r="1" fill="#906050" opacity="0.6" />

        {/* ── CHEEK BLUSH ── */}
        <Ellipse cx="34" cy="64" rx="10" ry="7" fill="url(#e-blush)" />
        <Ellipse cx="86" cy="64" rx="10" ry="7" fill="url(#e-blush)" />

        {/* ── FOREHEAD HIGHLIGHT ── */}
        <Ellipse cx="60" cy="40" rx="18" ry="9" fill="#F5DDB8" opacity="0.10" />

        {/* ── RIM LIGHT (right side cool studio) ── */}
        <Rect x="0" y="0" width="120" height="120" fill="url(#e-rim)" />

        {/* ── AI TINT ── */}
        <Circle cx="60" cy="60" r="59" fill="rgba(168,255,62,0.02)" />

        {/* ── VIGNETTE ── */}
        <Circle cx="60" cy="60" r="59" fill="url(#e-vig)" />
      </G>
    </Svg>
  );
}
