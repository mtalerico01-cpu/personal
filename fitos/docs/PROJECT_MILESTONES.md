# Form Theory — Project Milestones

> See also: [APP_ARCHITECTURE.md](APP_ARCHITECTURE.md) · [BUILD_ROADMAP.md](BUILD_ROADMAP.md)

This document is the historical project record. It preserves major decisions, architectural shifts, and product changes in the order they occurred. Historical names (FitOS, Cedric, Elara, Prime State) are used accurately where they reflect real past states.

---

## Product Concept Established

**Status:** Completed  
**Date:** Date not recorded

### What was established

- A complete AI-guided fitness and nutrition system with Coach at the center.
- The product would connect training, nutrition, recovery, and progress into one adaptive experience.
- The AI Coach would have the ability to propose and take confirmed actions — not just answer questions.
- App sections defined: Coach, Dashboard, Nutrition, Training, Cardio, Progress.
- Architecture principle: the application owns calculations, safety, and state. The LLM is a reasoning layer.

### Why it mattered

Established the product as distinct from a simple calorie tracker or chatbot wrapper. The action-confirmation model and app-owned intelligence principle have remained consistent across all subsequent phases.

### Architectural impact

- Feature-based module structure planned from the start.
- AI context builder (`buildAIContext`) designed as the single source of truth for all AI operations.
- Confirmation flow (`propose → review → confirm → persist`) established as a product-level rule.

---

## Initial FitOS Prototype

**Status:** Completed  
**Date:** Date not recorded (earliest Git commits reference "FitOS Phase 1")

### What was built

- Working app under the name **FitOS** (Fitness Operating System).
- Expo Router navigation, tab shell, dark visual direction.
- Dashboard with KPI cards (calories, macros, training, weight, AI brief).
- Nutrition screen, Training screen, Progress screen.
- Mock data for all screens.
- Early AI Coach screen with conversation interface.
- Early Coach personas: Cedric and Elara (see next milestone).

### Repository evidence

Git commits:
- `feat: add FitOS project scaffold with architecture and Phase 1 plan`
- `feat: FitOS Phase 1 + Phase 2 — app shell, design system, dashboard, nutrition, training, progress`
- `feat: AI Coach screen + Untitled UI nav icons`
- `Polish FitOS coach and progress experience`
- `Overhaul FitOS coach experience`

### Architectural impact

- Feature-based module structure established.
- Zustand stores created for all domains.
- Design system tokens set up.

---

## Cedric and Elara Persona Phase

**Status:** Completed — personas later removed  
**Date:** Date not recorded

### What existed

- Two named AI Coach personas: **Cedric** (direct, analytical) and **Elara** (warm, encouraging).
- Personas had distinct tone profiles, names, and visual identities.
- Persona selection was linked to the coaching experience and partially to appearance/theme.

### Why it was introduced

Named personas were intended to make the AI feel more personable and approachable than a generic chatbot.

### Why it was changed

- Named fictional personas added UX complexity without adding product value.
- Maintaining separate visual identities (portraits, dot avatars) created inconsistency.
- Persona-linked theming made appearance and coaching tone unnecessarily coupled.
- A single scalable intelligence identity ("Form Theory Coach") is more aligned with the product direction.

### Architectural impact

- Persona state was replaced by `coachingStyle: 'direct' | 'balanced' | 'encouraging'`.
- Appearance preference (`dark | light | system`) was decoupled from coaching identity.
- Legacy migration code added: `mapLegacyPersonaToStyle('cedric') → 'direct'`, `mapLegacyPersonaToStyle('elara') → 'encouraging'`.
- Persistence key changed from `fitos-coach-preferences` to `form-theory-experience-preferences`.
- Deleted: `CoachAvatar.tsx`, `CoachPortrait.tsx`, `PersonaToggle.tsx`, `CedricPortrait.tsx`, `ElaraPortrait.tsx`, `CoachIdentityMark.tsx`, `personas.ts`.

---

## AI-First Architecture Decision

**Status:** Completed  
**Date:** Date not recorded

### Decision made

- The application uses a hosted third-party LLM, not a locally fine-tuned model.
- Application code owns: user profile, memory, calculations, permissions, safety, tool definitions, state changes, persistence.
- The LLM is a reasoning and language layer only.
- All proposed state changes require explicit user confirmation.

### Why

- Cost and maintenance of a self-hosted or fine-tuned model are not justified for a consumer fitness app.
- Hosted LLMs (GPT-4, Claude, etc.) are sufficiently capable for fitness coaching use cases.
- App-owned calculations are auditable, testable, and not subject to LLM hallucination.

### Consequence

- The mock service (`mockAIService.ts`) was designed to be structurally compatible with the target real-LLM flow.
- `buildAIContext()` assembles all relevant data before any AI call — this pattern works for both mock and real.
- Action types are typed (`AIActionType`) and dispatched through `toolDispatcher.ts`, not executed by the LLM directly.

---

## Core Screens Created

**Status:** Completed  
**Date:** Date not recorded

### What was built

| Screen | Status at creation |
|---|---|
| Coach | Conversation interface, empty state, suggested prompts, action preview |
| Dashboard | KPI summary, Coach insight, training card |
| Nutrition | Macro summary, meal log, remaining macros, supplement tracker |
| Training | Today's workout, workout generator, exercise logger |
| Cardio | Integrated into Training screen via CardioSummaryCard |
| Progress | Weight trend, strength score, body measurements, progress photos |

All screens use mock data. Navigation between screens functional.

---

## Stabilization Work

**Status:** Completed  
**Date:** Date not recorded

### What was done

- Cardio screen crash resolved. Feature is now stable.
- Button and interaction audit completed across all screens.
- Deterministic mock response engine built: `parseMockIntent`, topic classification, follow-up prompt generation.
- Shared-state updates from confirmed actions wired through `toolDispatcher`.
- Coaching style tone applied across response generator — Direct, Balanced, and Encouraging produce distinct language for the same facts.
- Test suite established: 7 suites, 67 tests passing.
- TypeScript strict mode passing with `npx tsc --noEmit`.

---

## Form Theory Naming Decision

**Status:** Completed  
**Date:** Date not recorded

### Decision

**Form Theory** was selected as the official product name.

### Context

- **Prime State** was considered during naming exploration but not chosen.
- **FitOS** was the original working name — functional but not product-level.
- **Form Theory** was chosen for its alignment with the product's core philosophy: testing and adapting form, both physical and methodological.
- Domain acquisition followed the name decision.

### Name rationale

"Form" in fitness means body mechanics, technique, and physical shape. "Theory" implies a tested framework, not a rigid doctrine. Together, "Form Theory" positions the product as an intelligent, adaptable system — not a rigid plan.

### Consequence

- All user-facing text updated to Form Theory.
- `app.json` name updated to "Form Theory".
- Bundle identifiers (`slug`, `scheme`, `bundleIdentifier`) retained as `fitos` for continuity pending production identity decision.
- Brand metadata created in `src/branding/brand.ts`.

---

## Form Theory Rebrand

**Status:** Completed  
**Date:** Date not recorded

### What changed

- FitOS removed from all user-facing surfaces.
- Named primary personas (Cedric, Elara) removed from the experience.
- Unified Form Theory Coach introduced as the single AI identity.
- Coaching styles (Direct, Balanced, Encouraging) replace persona selection in the UI.
- Appearance preference (Dark, Light, System) separated from coaching identity.
- Official Form Theory logo assets added to `assets/Branding/`.

### Why it changed

The product needed one scalable intelligence identity rather than separate fictional personalities. A unified Coach is more aligned with a premium AI product direction.

### Architectural impact

- `CoachingStyle` type replaces persona id in all Coach logic.
- `AppearancePreference` is an independent field in the Coach store.
- Legacy `fitos-coach-preferences` AsyncStorage key is read and migrated on first app launch.
- All deleted persona components (listed above) are confirmed removed from the codebase.

### Follow-up work

- Complete brand refinement (next milestone).
- Validate all old references are removed from user-facing code.

---

## Form Theory Brand Refinement

**Status:** Completed  
**Date:** 2026-06-29 (current session)

### What was done

- Brand sheet (`assets/Branding/Form Theory - Brand Sheet.png`) analyzed visually.
- Visual characteristics extracted and documented in `src/branding/visualSystem.ts`.
- Centralized brand token layer created: `formTheoryPalette`, `formTheoryRadii`, `formTheoryMotion`, `formTheoryLogoSizes`.
- Color system aligned: `colors.ts` updated to use brand palette. Blue drift removed from light theme. Lime locked to `#A7FF00`.
- Typography system aligned: geometric uppercase, extended tracking, heavier display weights.
- Logo usage rules established: mark used in Coach header and Coach empty state only. Dot/avatar motif removed.
- Lime restrained: used only for active states, progress signal, primary Coach actions, selected states.
- All primary screens refined: surfaces flatter, shadows reduced, typography more technical.
- Coach components updated: `CoachTopBar`, `CoachMessage`, `EmptyConversationState`, `CoachComposer`, `CoachInsightHeader`, `ActionPreview`, `SuggestedPromptsRail`.
- Dashboard, Nutrition, Training, Progress components updated.
- Shared UI primitives updated: `Card`, `PageHero`, `SectionHeader`, `AIInsightBanner`, `Screen`.

### What was validated

- `npx tsc --noEmit`: passed.
- `npx jest --runInBand`: 7 suites, 67 tests, all passing.
- Browser route smoke test: all five primary routes free of `FitOS | Cedric | Elara | Prime State | AI COACH | AI INSIGHT`.
- Dark and light theme screenshots captured in `.brand-review/`.
- Logo images confirmed loading in browser: 40×40 in header, 72×72 in empty state.

### Remaining known items

- `app.json` bundle IDs still `fitos` — intentional.
- Old Cedric/Elara portrait images in `assets/Branding/` — not in use but not yet removed.
- RN Web `shadow*` and `pointerEvents` deprecation warnings remain in console.

---

## Continuous-Learning Architecture Decision

**Status:** Decided — implementation planned  
**Date:** Date not recorded

### Decision

Form Theory will build an explicit memory layer. The app will not automatically retrain a paid LLM after conversations.

### Model

```
User action or pattern
  → feedback or preference signal
  → stored memory record (with user consent)
  → retrieved at prompt time
  → included in LLM context
  → improved future response
```

### Memory record fields planned

- type, value, source (user-confirmed vs. inferred)
- confidence, timestamp, expiration
- user-editable, user-consent flag

### Consequence

- Memory is a backend concern — requires Phase 6 (backend) before Phase 8 (memory) can be built.
- The LLM is replaceable; memory stays in the application's data store, not the LLM's context.

---

## Onboarding Architecture Decision

**Status:** Decided — implementation planned  
**Date:** Date not recorded

### Decision

Onboarding will use a progressive, one-question-at-a-time approach inspired by MyFitnessPal but expanded to cover training, lifestyle, coaching preferences, and memory consent — areas MyFitnessPal does not address.

### Planned flow

1. Short mandatory section: goal, current weight, target weight, activity level.
2. Optional enrichment: training experience, preferred split, equipment, diet style, restrictions, schedule, coaching style.
3. Memory consent.
4. Deterministic initial plan generation (shown to user before confirmation).
5. User confirms plan.
6. Profile and plan written to state.

### Why

Collecting profile information progressively reduces initial friction. Separating mandatory from optional allows the app to be immediately useful before full setup is complete.

### Consequence

- `app/(auth)/onboarding.tsx` route to be created.
- `UserProfile` type needs expansion.
- Deterministic calculation functions (TDEE, macro split) needed before this phase can complete.

---

## Documentation Alignment Checkpoint

**Status:** Completed  
**Date:** 2026-06-29

### What was done

- Repository audited: all source files, stores, types, components, branding assets, existing Markdown files.
- `README.md` rewritten to reflect the current Form Theory product.
- `docs/APP_ARCHITECTURE.md` created: current and target architecture documented with clear status labels.
- `docs/BUILD_ROADMAP.md` created: phased build plan with accurate status per phase.
- `docs/PROJECT_MILESTONES.md` created: this document.
- `assets/Branding/BRAND_GUIDELINES.md` created: brand system reference for developers and designers.
- `ARCHITECTURE.md` and `PHASE1_PLAN.md` in the repository root are outdated FitOS-era documents — preserved as historical artifacts. They are superseded by `docs/APP_ARCHITECTURE.md` and `docs/BUILD_ROADMAP.md`.

### What the next phase is

Phase 5 — Onboarding and User Profile.

---

_Last updated: 2026-06-29_
