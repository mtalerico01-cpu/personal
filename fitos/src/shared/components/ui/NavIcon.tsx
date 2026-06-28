import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface NavIconProps {
  color: string;
  size?: number;
}

/** Untitled UI hexagon-01 — AI command center feel for Coach tab */
export function CoachIcon({ color, size = 24 }: NavIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m11.223 2.43177c.2836-.15756.4254-.23634.5755-.26723.133-.02733.27-.02733.403 0 .1501.03089.2919.10967.5755.26723l7.4 4.11111c.2996.1664.4493.2496.5584.36794.0964.10469.1695.22877.2141.36395.0505.15279.0505.32412.0505.66676v8.11707c0 .3427 0 .514-.0505.6668-.0446.1352-.1177.2593-.2141.3639-.1091.1184-.2588.2016-.5584.368l-7.4 4.1111c-.2836.1576-.4254.2363-.5755.2672-.133.0274-.27.0274-.403 0-.1501-.0309-.2919-.1096-.5755-.2672l-7.40003-4.1111c-.29952-.1664-.44928-.2496-.55834-.368-.09647-.1046-.16948-.2287-.21415-.3639-.05048-.1528-.05048-.3241-.05048-.6668v-8.11707c0-.34264 0-.51397.05048-.66676.04467-.13518.11768-.25926.21415-.36395.10906-.11834.25882-.20154.55834-.36794z"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m11.565 7.298c.159-.088.238-.132.322-.149.074-.015.152-.015.226 0 .084.017.163.061.322.149l3.9 2.167c.168.093.252.14.313.206.054.059.095.128.12.204.028.086.028.182.028.374v3.502c0 .192 0 .288-.028.374-.025.076-.066.145-.12.204-.061.066-.145.113-.313.206l-3.9 2.167c-.159.088-.238.132-.322.149-.074.015-.152.015-.226 0-.084-.017-.163-.061-.322-.149l-3.9-2.167c-.168-.093-.252-.14-.313-.206-.054-.059-.095-.128-.12-.204-.028-.086-.028-.182-.028-.374v-3.502c0-.192 0-.288.028-.374.025-.076.066-.145.12-.204.061-.066.145-.113.313-.206z"
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Untitled UI bar-chart-01 — 3 rising bars for Dashboard tab */
export function DashboardIcon({ color, size = 24 }: NavIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 20V10M12 20V4M6 20V14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Plate (circle) with fork on the left and knife on the right — Nutrition tab */
export function NutritionIcon({ color, size = 24 }: NavIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 3v4M4 3v4M2 7h2M3 7v14M6.5 12a5.5 5.5 0 1 0 11 0 5.5 5.5 0 0 0-11 0M21 3v18M21 3c1 1 2 3 2 5h-2"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Dumbbell — Training tab */
export function TrainingIcon({ color, size = 24 }: NavIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.5 15.5 15.5 8.5M5.5 18.5l-2-2 3-3 4 4-3 3-2-2ZM18.5 5.5l2 2-3 3-4-4 3-3 2 2ZM7 12l5 5M12 7l5 5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Untitled UI line-chart-up-01 — upward line chart for Progress tab */
export function ProgressIcon({ color, size = 24 }: NavIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="m21 21h-16.4c-.56005 0-.84008 0-1.05399-.109-.18816-.0959-.34114-.2488-.43702-.437-.10899-.2139-.10899-.4939-.10899-1.054v-16.4m17 5-3.9189 4.1827c-.1485.1585-.2227.2377-.3123.2787-.0791.0362-.1662.0511-.2528.0433-.0981-.0089-.1945-.0589-.3873-.159l-3.2574-1.6914c-.1928-.1001-.2892-.1501-.3873-.159-.0866-.0078-.1737.0071-.2528.0433-.0896.041-.1638.1202-.3123.2787l-3.9189 4.1827"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
