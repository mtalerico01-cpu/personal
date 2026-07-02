# 11 - Implementation Map

Date created: 2026-07-02

## Existing Sources

| Area | Current Source | Status | Migration Note |
|---|---|---|---|
| Brand palette | `src/branding/visualSystem.ts` | Keep | Map into design-system tokens |
| Brand copy | `src/branding/brand.ts` | Keep | Continue as product-copy source |
| Theme colors | `src/shared/theme/colors.ts` | Migrate/wrap | Replace compatibility aliases over time |
| Typography | `src/shared/theme/typography.ts` | Migrate/wrap | Add semantic text and metric roles |
| Spacing/radius/motion | `src/shared/theme/spacing.ts` | Migrate/wrap | Split into dedicated token files |
| Text | `src/shared/components/ui/Text.tsx` | Evolve | Point to new typography tokens |
| Card | `src/shared/components/ui/Card.tsx` | Evolve | Add surface variants and stricter defaults |
| Screen | `src/shared/components/ui/Screen.tsx` | Evolve | Become `AppScreen`/layout shell |
| PageHero | `src/shared/components/ui/PageHero.tsx` | Review | Use only where hierarchy justifies hero treatment |
| KPICard | `src/features/dashboard/components/KPICard.tsx` | Replace | New shared `MetricCard` |
| MacroProgressBar | `src/shared/components/ui/MacroProgressBar.tsx` | Replace/evolve | New `ProgressBar` with semantics |
| Progress chart | `src/features/progress/components/ProgressMonitorCard.tsx` | Replace/evolve | New chart system/spec |
| Coach action cards | `src/features/ai`, `src/features/coach` | Unify | New `ActionPreview`/confirmation pattern |

## Proposed Gate Sequence

### Gate 2 - Foundations

- Create `src/design-system/tokens`.
- Add token tests.
- Keep existing components working via compatibility wrappers.

### Gate 3 - Foundation Prototype

- Build tokens, typography, core layout, buttons, inputs, metrics, one chart pattern.
- Prototype Dashboard as representative screen.
- Validate before migrating all screens.

### Gate 4 - Core Product Migration

- Migrate Coach, Dashboard, Nutrition, Training, Cardio, Progress.

### Gate 5 - Supporting Experience Migration

- Migrate auth, onboarding, profile, settings, modals, sheets, loading, empty, error.

### Gate 6 - Final Quality Review

- Adversarial critique, screenshots, accessibility, performance, platform audit, consistency audit, docs audit, refinement pass.
