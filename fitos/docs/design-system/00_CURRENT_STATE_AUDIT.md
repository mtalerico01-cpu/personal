# 00 - Current-State Design Audit

Date reviewed: 2026-07-02  
Scope: authentication, welcome, onboarding, Coach, Dashboard, Nutrition, Training, Progress, Profile, shared UI primitives, charts, navigation, theme tokens.

## Executive Summary

Form Theory already has a strong brand foundation and a usable app structure, but the current UI is not yet governed by a complete design system. The product contains shared seeds (`src/shared/theme`, `src/shared/components/ui`, `src/branding/visualSystem.ts`) and clear brand guidance, while feature screens still define many visual decisions locally.

The main issue is not visual quality alone. The issue is system coherence: typography, KPI importance, chart interpretation, surface depth, layout rhythm, and accessibility behavior are not yet enforced by reusable rules.

## Evidence Reviewed

- Brand sheet: `assets/Branding/Form Theory - Brand Sheet.png`
- Logo assets: `assets/Branding/Form Theory Logo - Dark Mode.png`, `assets/Branding/Form Theory Logo - Light Mode.png`
- Existing brand docs: `assets/Branding/BRAND_GUIDELINES.md`
- Existing palette and brand constants: `src/branding/visualSystem.ts`
- Existing theme: `src/shared/theme/colors.ts`, `typography.ts`, `spacing.ts`
- Shared primitives: `Text`, `Card`, `Screen`, `PageHero`, `SectionHeader`, `MacroProgressBar`, `AIInsightBanner`, `NavIcon`
- Major routes: `app/welcome.tsx`, `app/login.tsx`, `app/onboarding.tsx`, `app/(tabs)/*`
- Major KPI/chart components: `KPICard`, `MacroSummaryCard`, `RemainingMacrosCard`, `ProgressMonitorCard`, `WeightTrendCard`

## Screenshot Capture Status

A clean browser screenshot was captured for `http://localhost:8093/welcome`. It showed the current welcome composition with strong brand mark usage, lime primary action, and large marketing-style feature art. A shared-tab screenshot was contaminated by an unrelated browser overlay and was rejected as unreliable evidence. Login capture failed with a browser visualization error.

Before Gate 3 implementation, capture a clean baseline set for:

- Welcome
- Login
- Onboarding welcome/name
- Onboarding selection
- Plan preview
- Coach empty state
- Coach conversation with action card
- Dashboard
- Nutrition
- Training strength tab
- Training cardio tab
- Active workout state if available
- Progress
- Profile/settings
- Loading, empty, error states

Store references only if the repo can handle image artifacts intentionally. Do not add large screenshot files casually.

## Strengths

- Brand direction is unusually clear and already documented.
- Dark theme palette aligns with the brand sheet: near-black, graphite, restrained lime, off-white text.
- Current typography tokens are a useful start and avoid total freeform text styling in some components.
- Core screens share a recurring `Screen` + `PageHero` + `CoachInsightHeader` structure.
- Onboarding and recommendation logic are becoming more traceable and evidence-aware.
- Tests currently protect major onboarding, AI, Coach, planning, and nutrition behavior.

## System-Level Problems

### 1. Theme Exists, But Governance Is Loose

`src/shared/theme/colors.ts` includes semantic dark/light themes, but also exports many compatibility aliases like `colors.neonGreen`, `colors.calories`, and dark defaults. Feature files can still pass raw colors or old aliases directly.

Impact: new screens can visually drift while still using "theme" imports.

### 2. Typography Roles Are Incomplete

Current roles include `displayLarge`, `displayMedium`, `displaySmall`, `headingLarge`, `headingMedium`, `headingSmall`, `bodyLarge`, `bodyMedium`, `labelLarge`, `labelMedium`, and `caption`. There are no explicit roles for screen title, card title, metric hero, metric medium, metric label, chart label, navigation label, button, or input.

Impact: important numeric values are chosen by component convention, not semantic priority.

### 3. KPI Importance Is Not Governed

Dashboard `KPICard` uses the same `displaySmall` size for calories, protein, carbs, fat, weight, and steps. Nutrition gives calories a stronger hero treatment, while Progress uses separate metric treatment. No role defines when a KPI is hero, primary, supporting, or contextual.

Impact: all numbers compete, even when one should dominate based on user state.

### 4. Charts Are Custom and Under-Specified

`ProgressMonitorCard` builds a custom SVG line chart with limited accessibility semantics, no explicit insufficient-data state, and no chart spec. `WeightTrendCard` uses a sparkline bar sequence with no axis or accessible summary. Nutrition uses a simplified circular progress ring where opacity approximates completion instead of a true arc.

Impact: charts can look polished without reliably answering a user question.

### 5. Surface System Is Too Card-Heavy

`Card` defaults to `radius['2xl']` and shadow. Many feature components use rounded cards by default. The brand sheet shows disciplined panels and compact dark surfaces, not a product made only of floating cards.

Impact: hierarchy can flatten because every group receives similar visual enclosure.

### 6. Local Style Decisions Are Widespread

Search found hundreds of hardcoded style decisions across app and feature files: font sizes, line heights, radii, padding, fixed dimensions, color hexes, rgba values, and shadow props.

Impact: maintainability and consistency degrade as screens are extended.

### 7. Navigation Is Branded But Not Fully Platform-Native

Bottom tabs use custom active pills and uppercase labels. iOS and Android height differences exist, but there is no documented rule for predictive back, modal presentation, sheets, keyboard behavior, haptics, or tablet navigation rail.

Impact: one visual identity exists, but platform expectations are not systematically addressed.

### 8. Accessibility Is Not Yet a System Feature

Some touch targets are large enough, but chart alternatives, dynamic type behavior, focus order, VoiceOver/TalkBack labels, reduced motion, and large-text layout are not documented or broadly tested.

Impact: the product may be usable for default settings but not comfortably accessible for a broad adult audience.

### 9. Performance Risks Are Visual-System Risks

Coach backgrounds include layered gradients. Cards include shadows. Charts use SVG paths. Expo web logs deprecation warnings for shadow props. There is no performance budget for design-system choices.

Impact: a premium design could become slow if the system adds blur, gradients, shadows, or chart animation without budgets.

### 10. App Icon Asset Mismatch

`assets/icon.png` appears to be a default Expo-style blue icon, not the Form Theory mark. This conflicts with the official brand assets.

Impact: distribution assets may undermine brand coherence outside the app.

## Screen Findings

### Welcome

- Strongest brand expression among visible screens.
- Uses large marketing feature cards and lime CTA effectively, but composition risks feeling like a landing page rather than a fast entry point.
- Needs clean baseline review across compact phone and large text.

### Login

- Uses hardcoded light/dark values in places.
- Needs platform keyboard behavior, password visibility, error recovery, and accessibility labels defined.

### Onboarding

- Recently improved logic and shortened flow.
- Choice cards are clear, but validation, custom entry, safety explanations, and plan preview need design-system states.
- Uses local input styles and fixed sizes.

### Coach

- Strong product differentiator.
- Risks looking like a separate chat app because Coach components have their own background, cards, message treatment, and prompt rails.
- Needs unified action previews, confirmation cards, loading/thinking states, and message hierarchy.

### Dashboard

- Uses shared hero and Coach insight, but first viewport can over-prioritize general greeting and equal KPI cards instead of a daily priority.
- KPI grid treats many metrics similarly.

### Nutrition

- Calories are visually primary, which is reasonable, but protein should be able to outrank calories when it is the actionable gap.
- Macro colors should be governed and not become a rainbow system.
- Meal logging needs input, loading, estimate, confirmation, and error states standardized.

### Training/Cardio

- Strength/cardio segmented control is useful but locally styled.
- Active workout state needs much larger control priority than passive planning states.
- Cardio is nested inside Training route; product taxonomy should decide whether Cardio is a full destination or a mode.

### Progress

- Strongest chart candidate, but chart interpretation and confidence are incomplete.
- Weight, strength, and body metrics share one chart shell despite different user questions and uncertainty rules.

### Profile/Settings

- Recently added and functional.
- Contains many local grouped panels and metric/calendar rows.
- Needs clear section taxonomy and a reusable settings row/group system.

## Current Component Inventory

Reusable seeds:

- `Screen`
- `Text`
- `Card`
- `PageHero`
- `SectionHeader`
- `Badge`
- `MacroProgressBar`
- `AIInsightBanner`
- `NavIcon`

Feature-local patterns that should become shared:

- KPI card
- Metric value row
- Segmented control
- Selection card/choice row
- Text input/numeric input
- Action preview/confirmation card
- Coach insight card
- Chart card/header/tooltip
- Empty/loading/error state
- Settings row/group
- Sticky action bar

## Gate 1 Conclusion

The product should not jump directly to screen migration. Gate 2 should define foundations and typed primitives first, then Gate 3 should prove the system on one representative screen, preferably Dashboard because it includes navigation, KPI hierarchy, Coach insight, chart opportunity, cards, and actions.
