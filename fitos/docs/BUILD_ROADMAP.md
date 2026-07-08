# Form Theory — Build Roadmap

> See also: [APP_ARCHITECTURE.md](APP_ARCHITECTURE.md) · [PROJECT_MILESTONES.md](PROJECT_MILESTONES.md)

This document defines the phased build approach for Form Theory. Each phase has a stated objective, exit criteria, and accurate status based on the actual repository.

**Status labels used:** ✅ Completed · 🔄 In progress · ⬜ Not started

---

## Phase 0 — Product Definition and Architecture

**Objective:** Establish the product vision, architecture pattern, Coach-centricity, and intended build approach before any code is written.

**Status:** ✅ Completed

### Completed

- [x] Product vision defined: AI-guided fitness and nutrition platform
- [x] Feature structure defined: Coach, Dashboard, Nutrition, Training, Cardio, Progress, Onboarding
- [x] AI-first architecture designed: hosted LLM, app-owned context, structured tool calls
- [x] Coach centrality established as core product principle
- [x] Action confirmation model defined: propose → review → confirm → persist
- [x] Memory strategy outlined: explicit storage, no automatic retraining
- [x] App sections and navigation pattern defined
- [x] Brand direction identified

### Exit Criteria

Product vision, architecture, and build plan documented. ✅

---

## Phase 1 — Application Foundation

**Objective:** Working app shell with routing, design system, shared components, and state architecture.

**Status:** ✅ Completed

### Completed

- [x] Expo SDK setup with TypeScript strict mode
- [x] Expo Router file-based navigation
- [x] Tab navigation: Coach, Dashboard, Nutrition, Training, Progress
- [x] Design system: color tokens, typography scale, spacing, radius
- [x] Shared UI primitives: Card, Text, Screen, PageHero, SectionHeader, Badge, MacroProgressBar, NavIcon
- [x] Zustand stores created: user, nutrition, training, progress, dashboard, coach
- [x] AsyncStorage persistence for Coach preferences
- [x] `@/` path alias configured
- [x] Feature-based module structure in place
- [x] Jest + jest-expo testing configuration

### Remaining

- [ ] ESLint and Prettier configuration (not confirmed present in repository)

### Exit Criteria

App builds and runs. Navigation works. Design system is in place. ✅

---

## Phase 2 — Core Product Screens

**Objective:** All primary screens implemented with mock data.

**Status:** ✅ Completed

### Completed

- [x] **Coach** — Conversation interface, Coach top bar, empty state, message list, composer, suggested prompts
- [x] **Dashboard** — Daily summary, KPI cards, training card, Coach insight card
- [x] **Nutrition** — Macro summary, remaining macros, meal log, food logger, supplement tracker
- [x] **Training** — Today's workout card, workout generator, exercise logger preview
- [x] **Cardio** — Cardio summary card within Training screen
- [x] **Progress** — Weight trend chart, strength score, strength metrics, body measurements, progress photos
- [x] Tab navigation connecting all screens

### Exit Criteria

All primary screens render with mock data. Navigation between screens works. ✅

---

## Phase 2.5 — AI-First Product Refactor

**Objective:** Replace static screens with a Coach-aware architecture. Coach insights appear on all primary screens. Actions are proposed and confirmed, not applied silently.

**Status:** ✅ Completed

### Completed

- [x] Coach as central intelligence — all screens reference the Coach store and AI context
- [x] `CoachInsightHeader` on Dashboard, Nutrition, Training, Progress
- [x] Action-proposal architecture: `AIMessage`, `AIActionProposal`, `ActionPreview`
- [x] Shared fitness context builder: `buildAIContext(coachingStyle)`
- [x] `buildCoachInsight()` for per-domain Coach insight generation
- [x] Contextual suggested prompts tied to current screen and data state
- [x] Cross-feature interactions: Coach can propose nutrition, training, and cardio actions
- [x] Mock intelligence: responses vary by intent, coaching style, and time of day

### Exit Criteria

Coach presence is visible on every primary screen. Actions can be proposed and confirmed. ✅

---

## Phase 3 — Stabilization and Deterministic Prototype Intelligence

**Objective:** Stable, consistent, and testable prototype that behaves predictably before real AI is introduced.

**Status:** ✅ Completed

### Completed

- [x] Cardio stability — crash resolved, feature is stable
- [x] Button and interaction audit — confirmed actions, cancel actions, navigation actions all functioning
- [x] Deterministic mock response engine — `parseMockIntent`, `mockAIService`, topic-aware responses
- [x] Topic-aware follow-up prompts — `generateFollowUpPromptsForTopic`
- [x] Shared-state updates from confirmed actions — toolDispatcher routes to correct store
- [x] Coaching style applied to response tone — Direct, Balanced, Encouraging produce different language
- [x] Legacy persona migration — `mapLegacyPersonaToStyle` handles old `cedric`/`elara` values
- [x] Test suite: 7 suites, 67 tests, all passing
- [x] TypeScript strict — `npx tsc --noEmit` passes with no errors

### Exit Criteria

App is stable. Tests pass. TypeScript passes. Coach responds consistently. ✅

---

## Phase 4 — Form Theory Rebrand

**Objective:** Replace FitOS and all associated persona/naming with the Form Theory brand system.

**Status:** ✅ Completed

### Completed

- [x] Product renamed from FitOS to Form Theory
- [x] Cedric and Elara removed from the primary product experience
- [x] Unified Form Theory Coach identity
- [x] Coaching styles (Direct, Balanced, Encouraging) replace persona selection
- [x] Appearance preference (Dark, Light, System) decoupled from coaching style
- [x] Official Form Theory logo assets added to `assets/Branding/`
- [x] Brand sheet analyzed and visual tokens extracted
- [x] Centralized brand system: `src/branding/brand.ts`, `assets.ts`, `visualSystem.ts`
- [x] Color system aligned to brand palette (black, graphite, lime, silver, white)
- [x] Typography system aligned to geometric uppercase/tracked style
- [x] Logo mark used selectively: Coach header and Coach empty state
- [x] All primary screens updated to Form Theory visual language
- [x] Copy updated: Coach labels, insight labels, placeholder text, page descriptors

### Remaining Known Items

- [ ] `app.json` bundle identifiers (`slug`, `scheme`, `bundleIdentifier`, `package`) still use `fitos` — intentional until production bundle identity is confirmed
- [ ] Old Cedric/Elara portrait images still present in `assets/Branding/` — not used by the app
- [ ] `ARCHITECTURE.md` and `PHASE1_PLAN.md` in repo root are outdated (FitOS era) — replaced by `docs/` in this documentation pass

### Exit Criteria

FitOS name removed from the UI. Named primary personas removed from the experience. Form Theory visual language applied throughout. ✅

---

## Phase 5 — Onboarding and User Profile

**Objective:** Progressive onboarding that builds a complete user profile and generates an initial personalized plan.

**Status:** ⬜ Not started

### Target Scope

- [ ] Onboarding route: `app/(auth)/onboarding.tsx`
- [ ] One-question-at-a-time progressive flow
- [ ] Mandatory section: goal, current weight, target weight, activity level
- [ ] Optional enrichment: training preference, nutrition approach, lifestyle, schedule, coaching preference
- [ ] Memory consent screen
- [ ] Initial plan generation (deterministic calculation) — calorie target, macro split, training days
- [ ] Plan preview and user confirmation
- [ ] Profile written to user store on completion
- [ ] Resume behavior: restart from last answered question if onboarding is incomplete
- [ ] Onboarding completion state persisted

### Dependencies

- User profile data model expanded beyond current `UserProfile` type
- Deterministic calculation functions (TDEE, macro split)

### Exit Criteria

A new user can complete onboarding, review a generated plan, confirm it, and arrive at a fully populated Dashboard.

---

## Phase 6 — Backend and Authentication

**Objective:** Replace mock data and in-memory state with a real backend, authenticated user accounts, and cloud persistence.

**Status:** ⬜ Not started

### Target Scope

- [ ] Backend provider selection (Supabase is the leading candidate — not finalized)
- [ ] User authentication: email/password, OAuth
- [ ] User profile stored in backend database
- [ ] Event store: meals logged, workouts completed, weight entries, plan changes
- [ ] Active plan storage
- [ ] Secure environment variable management (`EXPO_PUBLIC_` or server-only)
- [ ] Database schema design
- [ ] Migration support
- [ ] Mock data replaced progressively with real API calls

### Dependencies

- Phase 5 (onboarding) defines the full profile data model

### Exit Criteria

User can create an account, complete onboarding, and return to find their data persisted across app restarts.

---

## Phase 7 — Real AI Integration

**Objective:** Replace the mock AI service with a real hosted LLM via a secure application gateway.

**Status:** ⬜ Not started

### Target Scope

- [ ] Select hosted LLM provider (not permanently decided)
- [ ] Implement secure AI gateway (backend Edge Function or server — never expose API keys in client bundle)
- [ ] Context builder (`buildAIContext`) sends real payload to gateway
- [ ] Gateway forwards context to LLM and returns structured `CoachResponse`
- [ ] Response validation layer before rendering or executing
- [ ] Tool calling: structured `proposedActions` from LLM
- [ ] Fallback handling for LLM timeout or error
- [ ] Rate limiting and cost controls
- [ ] Prompt versioning
- [ ] Response evaluation loop (offline)

### Dependencies

- Phase 6 (backend) for the gateway and key management
- Phase 5 (onboarding) for complete user context

### Exit Criteria

Coach responds with real AI-generated content. Proposed actions come from the LLM. Mock service is disabled.

---

## Phase 8 — Continuous Learning and Memory

**Objective:** Form Theory learns from each user's behaviour over time with explicit consent.

**Status:** ⬜ Not started

### Target Scope

- [ ] Explicit memory storage: accepted changes, rejected recommendations, constraint declarations
- [ ] Inferred memory: detected patterns surfaced to user for confirmation
- [ ] Memory review screen: user can view, edit, and delete stored memory
- [ ] Memory retrieval at prompt time: relevant records included in LLM context
- [ ] Feedback loops: confirmation and cancellation data feeds memory
- [ ] Confidence scores and expiration on memory records
- [ ] User control and privacy: clear consent model
- [ ] Cross-session context: conversation summaries retained

### Dependencies

- Phase 7 (real AI) for preference detection from real conversations
- Phase 6 (backend) for memory persistence

### Exit Criteria

Repeated user preferences are stored and influence future Coach recommendations. User can view and control all stored memory.

---

## Phase 9 — Health and Device Integrations

**Objective:** Sync real biometric and activity data from Apple Health.

**Status:** ⬜ Not started

### Target Scope

- [ ] Apple HealthKit integration (iOS only)
  - [ ] Steps
  - [ ] Workouts
  - [ ] Weight entries
  - [ ] Sleep
  - [ ] Heart rate
  - [ ] Recovery indicators
- [ ] Apple Watch companion consideration (future)

Other platform health APIs (Google Fit, Garmin, etc.) are future considerations, not planned.

### Dependencies

- Phase 6 (backend) to store synced health events
- iOS-specific implementation only initially

### Exit Criteria

Weight entries from Apple Health appear in the Progress screen. Step data feeds the Dashboard activity card.

---

## Phase 10 — Deeper Training and Nutrition Systems

**Objective:** Replace mock training and nutrition data with real, persistent, and intelligent systems.

**Status:** ⬜ Not started

### Target Scope

**Training:**
- [ ] Exercise database (name, muscle group, equipment, instructions)
- [ ] Progressive overload tracking per exercise
- [ ] Workout history with volume analysis
- [ ] Exercise substitution (allergy/preference/equipment-aware)
- [ ] Training split and rest day management

**Nutrition:**
- [ ] Food database with nutritional data
- [ ] Meal recommendations from goal and preferences
- [ ] Meal planning (weekly)
- [ ] Recipe support
- [ ] Nutrition pattern analysis (protein distribution, meal timing)

---

## Phase 11 — Payments and Subscriptions

**Objective:** Monetization layer with subscription management.

**Status:** ⬜ Not started

### Target Scope

- [ ] RevenueCat integration (leading candidate — not finalized)
- [ ] Subscription plan tiers (free vs. paid features TBD)
- [ ] Feature gating
- [ ] Trial period
- [ ] Billing management in-app
- [ ] Usage limits for AI features (cost controls)

---

## Phase 12 — Quality and Beta

**Objective:** Production quality, accessibility, analytics, and internal beta.

**Status:** ⬜ Not started

### Target Scope

- [ ] Expand test coverage significantly beyond current 67 tests
- [ ] Accessibility audit: VoiceOver, Dynamic Type, color contrast
- [ ] Analytics integration (provider TBD)
- [ ] Crash reporting (Sentry or similar)
- [ ] Performance profiling (render time, JS bundle size)
- [ ] Privacy review
- [ ] Security review (OWASP, data handling)
- [ ] Internal beta via TestFlight
- [ ] Feedback collection process

---

## Phase 13 — Launch

**Objective:** Ship to the App Store.

**Status:** ⬜ Not started

### Target Scope

- [ ] App Store screenshots and description
- [ ] Onboarding polish pass
- [ ] Subscription and paywall setup
- [ ] Support channel
- [ ] Privacy policy and terms of service
- [ ] Production monitoring and alerting
- [ ] Launch analytics setup
- [ ] App Store review submission

---

## Roadmap Rules

1. A phase is **complete** only when its stated exit criteria are met — not when screens exist.
2. Do not mark a phase complete based on UI alone if the underlying logic is mocked.
3. Phases can overlap when dependencies allow, but do not skip exit criteria.
4. Document scope changes when they occur — do not rewrite history.

---

_Last updated: 2026-06-29_
