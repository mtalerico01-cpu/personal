import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { SkillsPreview } from "@/components/sections/SkillsPreview";
import { CtaBanner } from "@/components/sections/CtaBanner";

/**
 * Homepage — introduces Michael's professional identity and featured work.
 *
 * Section order:
 * 1. Hero          — Identity, headline, CTAs
 * 2. StatsBar      — At-a-glance scope (years, orgs, impact)
 * 3. FeaturedWork  — 4 highlighted case studies
 * 4. SkillsPreview — 4 capability pillars
 * 5. CtaBanner     — Connect CTA
 */
export function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedWork />
      <SkillsPreview />
      <CtaBanner />
    </>
  );
}
