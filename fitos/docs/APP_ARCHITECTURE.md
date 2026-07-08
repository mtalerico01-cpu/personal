# Form Theory — Application Architecture

> See also: [BUILD_ROADMAP.md](BUILD_ROADMAP.md) · [PROJECT_MILESTONES.md](PROJECT_MILESTONES.md) · [../assets/Branding/BRAND_GUIDELINES.md](../assets/Branding/BRAND_GUIDELINES.md)

---

## 1. Architecture Overview

Form Theory is a mobile-first application built in React Native with Expo. All current application logic runs on the client. There is no live backend, no real AI provider, and no cloud persistence at this time.

### Target Architecture (Planned)

```
Mobile application
  → secure backend (auth, profile, event store)
  → shared fitness context builder
  → hosted third-party LLM
  → structured response or tool proposal
  → validation and safety layer
  → user confirmation (UI)
  → shared application state update
  → persistent memory and feedback update
```

### Current Architecture (Implemented)

```
Mobile application
  → Zustand stores (in-memory mock data)
  → buildAIContext() — assembles fitness context from stores
  → mockAIService — deterministic response engine
  → parseMockIntent — classifies user input
  → structured AIMessage + optional AIActionProposal
  → CoachStore — user reviews and confirms
  → toolDispatcher — executes confirmed action
  → Zustand store update (in-memory)
```

The two architectures are structurally similar by design. The mock service is intended to be replaced by a real LLM gateway without changing the surrounding application logic.

---

## 2. Frontend Architecture

### Entry Point

`app/_layout.tsx` — Root layout. Wraps the app in gesture handler, safe-area context, and Reanimated. The active theme is derived from the Coach store's appearance preference.

### Routing and Navigation

- **Routing:** Expo Router 56 (file-based). No `app/(auth)/` route exists yet; onboarding is planned.
- **Tab navigation:** `app/(tabs)/_layout.tsx` — five tabs: Coach, Dashboard, Nutrition, Training, Progress.
- **Tab files:** `coach.tsx`, `index.tsx` (Dashboard), `nutrition.tsx`, `training.tsx`, `progress.tsx`.

### Feature Modules

Each feature is self-contained under `src/features/`:

| Module | Path | Contents |
|---|---|---|
| AI | `src/features/ai/` | Types, context builder, mock service, intent parser, tools, suggestions |
| Coach | `src/features/coach/` | Store, components, hooks, styles, insights |
| Dashboard | `src/features/dashboard/` | Components, hooks, mock data |
| Nutrition | `src/features/nutrition/` | Components, hooks, mock data |
| Training | `src/features/training/` | Components (includes Cardio), hooks, mock data |
| Progress | `src/features/progress/` | Components, hooks, mock data |

### Shared Components

`src/shared/components/ui/` — reusable primitives:

- `Card.tsx` — surface container
- `Text.tsx` — typography-aware text
- `Screen.tsx` — safe-area scroll wrapper
- `PageHero.tsx` — screen title/subtitle block
- `SectionHeader.tsx` — section label
- `AIInsightBanner.tsx` — Coach insight strip
- `Badge.tsx`, `MacroProgressBar.tsx`, `NavIcon.tsx`

### Design System

`src/shared/theme/`:

- `colors.ts` — dark and light theme objects built from brand palette
- `typography.ts` — font scale and weight definitions
- `spacing.ts` — spacing, radius, shadow, logo size, and motion tokens
- `useActiveTheme.ts` — derives active theme from appearance preference and system color scheme
- `index.ts` — public re-exports

Brand sources:

- `src/branding/brand.ts` — product name, Coach name, positioning, philosophy
- `src/branding/assets.ts` — local image asset registry
- `src/branding/visualSystem.ts` — canonical palette, radii, motion, logo sizes, brand analysis

### State Management

Zustand 5. Six stores:

| Store | Path | Responsibility |
|---|---|---|
| `useCoachStore` | `src/features/coach/store/coachStore.ts` | Conversation, coaching style, appearance, action flow |
| `useUserStore` | `src/store/userStore.ts` | User profile |
| `useNutritionStore` | `src/store/nutritionStore.ts` | Nutrition goals, log, remaining |
| `useTrainingStore` | `src/store/trainingStore.ts` | Workout plan, cardio goals |
| `useProgressStore` | `src/store/progressStore.ts` | Weight and progress data |
| `useDashboardStore` | `src/store/dashboardStore.ts` | Dashboard card order and visibility |

### Persistence

**Implemented:** `AsyncStorage` is used only for Coach experience preferences (coaching style + appearance). Key: `form-theory-experience-preferences`.

**Planned:** Full profile, plans, conversation history, and memory will require a backend.

### Testing

`src/features/ai/__tests__/` and `src/features/coach/__tests__/`:

- `mockAIService.test.ts` — response consistency across coaching styles
- `coachStore.test.ts` — store state transitions
- `toolDispatcher.test.ts` — confirmed action dispatch
- `parseMockIntent.test.ts` — intent classification
- `getDayPart.test.ts` — time-of-day logic
- `generateSuggestedPrompts.test.ts` — prompt generation
- `coachingStyles.test.ts` — legacy persona migration

---

## 3. Feature Architecture

### Coach

**Current (Implemented)**

The Coach screen (`app/(tabs)/coach.tsx`) is a ChatGPT-style conversation interface.

**Message flow:**

1. User opens Coach — `useCoach` hook calls `initBrief()` on first mount.
2. `initBrief()` calls `buildAIContext(coachingStyle)` and `generateProactiveBrief(context)`.
3. Brief is rendered in `EmptyConversationState` with `SuggestedPromptsRail`.
4. User sends message — `sendMessage(text)` is dispatched to the Coach store.
5. Store calls `parseMockIntent(text)` to classify intent.
6. Store calls `answerCoachPrompt(context, text, intent)` to generate an `AIMessage`.
7. If the response includes `proposedActions`, an `ActionPreview` card is rendered inline.
8. User taps Confirm — `confirmAction(actionId, messageId)` dispatches to `executeAction(type, payload)`.
9. `executeAction` routes to the correct tool function via `toolDispatcher.ts`.
10. Tool updates the relevant Zustand store.

**Components:** `CoachTopBar`, `ConversationList`, `CoachMessage`, `UserMessage`, `ActionPreview`, `EmptyConversationState`, `CoachComposer`, `SuggestedPromptsRail`, `CoachBackground`.

**Coaching styles:** Direct, Balanced, Encouraging. Style affects tone only; facts and calculations are unchanged.

**Target (Planned)**

- Replace `mockAIService` with real LLM gateway call (context → structured response).
- Add conversation history and memory retrieval to context.
- Maintain all other application logic unchanged.

---

### Dashboard

**Current (Implemented)**

Summary screen. Pulls data from `useDashboard()` hook which reads `useNutritionStore`, `useTrainingStore`, `useProgressStore`, and `useUserStore`.

Components: `DashboardHeader`, `KPICard` (calories, macros, training status, weight), `TrainingCard`, `AIInsightCard` (Coach insight via `buildCoachInsight()`).

All data is mocked.

---

### Nutrition

**Current (Implemented)**

Macro targets, meal logging, calorie tracking, supplement tracker. Data from `useNutritionStore` seeded with mock values.

Components: `MacroSummaryCard`, `RemainingMacrosCard`, `FoodLoggerCard`, `MealCard`, `SupplementTracker`.

Shared `CoachInsightHeader` pulls `buildCoachInsight()` for the nutrition domain.

---

### Training

**Current (Implemented)**

Strength workout plan and generator. Shares screen with Cardio (tabbed via `CardioSummaryCard`).

Components: `TodayWorkoutCard`, `WorkoutGeneratorCard`, `ExerciseLoggerPreview`, `CardioSummaryCard`.

---

### Cardio

**Current (Implemented — stable)**

Cardio is displayed inside the Training screen via `CardioSummaryCard`. Duration and intensity targets are mocked. A previous crash bug was resolved; the feature is considered stable.

---

### Progress

**Current (Implemented)**

Weight trend chart, strength score, body measurements, progress photos. All data from `useProgressStore` seeded with mock values.

Components: `ProgressMonitorCard`, `WeightTrendCard`, `StrengthScoreCard`, `StrengthMetricCard`, `BodyMeasurementsCard`, `ProgressPhotosCard`.

---

### Onboarding

**Current status: Planned — not yet implemented.**

Target design:
- Progressive, one-question-at-a-time flow (MyFitnessPal-inspired but expanded).
- Short mandatory section: goal, current weight, target weight, activity level.
- Progressive enrichment: training preferences, nutrition approach, lifestyle, coaching preference, memory consent.
- Initial plan generation on completion (deterministic calculation, confirmed by user).
- Resume behavior: incomplete onboarding resumes from last answered question.
- Route: `app/(auth)/onboarding.tsx` (file not yet created).

---

## 4. State Architecture

### Coach Store — `src/features/coach/store/coachStore.ts`

**Source of truth:** Coaching style, appearance preference, conversation messages, proactive brief, suggested prompts, active action.

**Persistence:** `AsyncStorage` — key `form-theory-experience-preferences`. Stores `{ coachingStyle, appearance }` only.

**Migration:** Reads legacy key `fitos-coach-preferences` on first load. Maps `cedric → direct`, `elara → encouraging`.

**Consumers:** `useCoach` hook, `coach.tsx` route.

---

### User Store — `src/store/userStore.ts`

**Source of truth:** `UserProfile` (id, name, weight unit, energy unit, goals).

**Current state:** Pre-loaded with `mockUser` from `src/features/dashboard/mock.ts`. No persistence.

**Planned:** Replace with authenticated user from backend.

---

### Nutrition Store — `src/store/nutritionStore.ts`

**Source of truth:** Daily nutrition goals, food log, macro remaining calculation.

**Current state:** Seeded with mock data. No persistence.

---

### Training Store — `src/store/trainingStore.ts`

**Source of truth:** Today's workout, cardio goals, training plan.

**Current state:** Seeded with mock data. No persistence.

---

### Progress Store — `src/store/progressStore.ts`

**Source of truth:** Current weight, goal weight, weight history, strength scores, body measurements.

**Current state:** Seeded with mock data. No persistence.

---

### Dashboard Store — `src/store/dashboardStore.ts`

**Source of truth:** KPI card visibility and order.

**Current state:** Defaults only. No persistence.

---

### Known Duplicate / Cleanup Items

- `UserProfile.goals` in `userStore` duplicates nutrition goals that also live in `nutritionStore`. These need to be reconciled when onboarding and backend are added.
- `buildAIContext()` hard-codes some user facts (age, height, timezone) that should come from the profile.

---

## 5. User Profile Architecture

### Current — Partially Implemented

`UserProfile` type (`src/types/user.ts`):
- id, name, avatarUrl
- weightUnit, energyUnit
- goals (calories, protein, carbs, fat, weightGoal, dailySteps)
- createdAt

Profile is pre-loaded from mock data. No real onboarding or backend persistence exists.

### Target Profile Categories

| Category | Examples | Status |
|---|---|---|
| Identity | name, email | Partially mocked |
| Body data | weight, height, age | Partially mocked |
| Goals | weight goal, calorie target | Partially mocked |
| Lifestyle | sleep, activity level, schedule | Planned |
| Training | experience, split, equipment | Planned |
| Nutrition | diet style, restrictions | Planned |
| Preferences | coaching style, appearance, units | Implemented |
| Onboarding status | completion, last step | Planned |

### Profile Data Distinctions (Planned)

- **Explicit profile facts** — user-entered during onboarding or settings.
- **Learned memory** — patterns observed across conversations, stored explicitly with user consent.
- **Derived insights** — calculated from profile + progress data (e.g., TDEE estimate).
- **Active targets** — current calorie, macro, weight, cardio goals.
- **Historical changes** — event log of plan modifications.

---

## 6. Memory Architecture

**Current status: Planned — not yet implemented.**

Form Theory will not retrain a paid LLM after every conversation. Instead, relevant context will be retrieved and included in each prompt.

### Intended Model

```
User action or repeated behaviour
  → feedback signal
  → stored preference or memory record
  → retrieved at prompt time
  → improved future response
```

### Memory Categories (Planned)

| Category | Examples |
|---|---|
| Stable preferences | preferred workout days, disliked exercises, diet constraints |
| Schedule | training days, meal timing |
| Accepted changes | confirmed plan modifications |
| Rejected recommendations | exercises or foods consistently declined |
| Repeated behaviour | consistent meal patterns, skipped rest days |
| Conversation summaries | key outcomes of past sessions |
| Constraints | injuries, medical notes, dietary restrictions |

Each memory record will carry: **confidence**, **source** (user-confirmed or inferred), **timestamp**, **expiration**, **user editability**, **user consent flag**.

---

## 7. AI Integration Architecture

**Current status: Mock service implemented. Real integration is planned.**

### Role of the Hosted LLM (Planned)

The LLM may:
- Interpret user intent from natural language
- Explain recommendations in the user's coaching style
- Summarize progress data in plain language
- Generate natural-language coaching
- Propose structured actions (typed payloads, not free text mutations)

### The Application Must Own

| Responsibility | Notes |
|---|---|
| Calculations | Calorie targets, macro splits, training volume, goal progress |
| User profile | Stored in backend, not inside the LLM |
| Memory | Explicitly stored, not inferred from conversation alone |
| Permissions | User confirmation required for all meaningful changes |
| Safety | Medical and injury boundary enforcement in application code |
| Tool registry | Application defines what actions are available |
| State changes | Only applied after user confirmation |
| Persistence | Backend or AsyncStorage, never LLM-owned |

### Structured Output Pattern (Planned)

```typescript
type CoachResponse = {
  message: string;
  insights?: Insight[];
  proposedActions?: ProposedAction[];
  followUpPrompts?: string[];
};
```

The application validates this structure before rendering or executing any part of the response.

The LLM provider is not permanently decided. The gateway layer should be replaceable.

---

## 8. Action Architecture

**Current status: Fully implemented with mock service.**

### Flow

```
Coach proposes action (AIActionProposal in AIMessage)
  → ActionPreview card rendered in conversation
  → User taps Confirm or Cancel
  → confirmAction(actionId, messageId) dispatched
  → executeAction(type, payload) called
  → tool function validates and applies payload
  → Zustand store updated
  → Confirmation summary appended to conversation
```

### Implemented Action Types (`AIActionType`)

| Type | Tool | Effect |
|---|---|---|
| `log_meal` | `logMealTool` | Adds meal to nutrition log |
| `update_macros` | `updateMacroGoalsTool` | Updates macro targets |
| `save_workout` | `saveWorkoutTool` | Saves workout to training store |
| `update_cardio_goal` | `updateCardioGoalTool` | Updates cardio targets |
| `update_weight_goal` | `updateWeightGoalTool` | Updates weight goal |
| `create_plan` | `createFitnessPlanTool` | Creates initial fitness plan |
| `navigate` / `review_day` | UI layer | Handled without a tool function |

No meaningful action executes silently.

---

## 9. Calculation Architecture

All calculations are deterministic application logic. The LLM may explain them; it must not be the sole calculator.

**Implemented (mock values, deterministic):**
- Remaining calories and macros from daily log
- Strength score from lift history
- Weight trend from history array

**Planned (real deterministic implementations):**
- TDEE estimation (Harris-Benedict or Mifflin-St Jeor)
- Macro split from goal and body data
- Training volume load
- Rate of weight change vs goal rate
- Cardio energy expenditure estimate
- Goal timeline projection

---

## 10. Safety Architecture

**Current status: No safety layer is implemented. This is a known gap.**

### Planned Boundaries

The application must refuse or escalate for:
- Medical diagnosis requests
- Injury treatment guidance
- Pregnancy or breastfeeding contexts
- Requests from users flagged as minors
- Eating disorder risk indicators (extreme calorie targets, purging language)
- PED or drug questions
- Extreme or medically dangerous diet recommendations

These boundaries must be enforced in application code, not relied on from the LLM.

---

## 11. Persistence and Migration

### Current

| Item | Implementation |
|---|---|
| Coach experience preferences | `AsyncStorage` — `form-theory-experience-preferences` |
| All other state | In-memory, reset on app restart |

### Legacy Migration (Implemented)

On app start, the Coach store reads the legacy key `fitos-coach-preferences`. If found, it maps `persona: 'cedric'` → `coachingStyle: 'direct'` and `persona: 'elara'` → `coachingStyle: 'encouraging'`, then writes to the new key.

### Planned

- Backend-driven profile persistence with versioned schema
- AsyncStorage version keys for local migration support
- Onboarding completion state
- Conversation summaries

---

## 12. Backend Target Architecture

**Current status: Planned — not yet implemented.**

Preferred option: Supabase (Postgres, Auth, Realtime, Edge Functions). Not decided as final.

### Planned Backend Responsibilities

- Authentication (email, OAuth)
- User profile storage and versioning
- Event store (meals logged, workouts completed, weight entries, plan changes)
- Active plan storage
- Coach conversation history
- Memory record storage
- Analytics and usage data
- AI gateway (forwards context to hosted LLM, holds API keys)
- Secret protection (API keys never in client bundle)
- Rate limiting and cost controls
- Subscription status (RevenueCat or similar)
- Audit trail for confirmed actions

---

## 13. Data Flow Examples

### Ask the Coach

```
User types message
  → useCoachStore.sendMessage(text)
  → buildAIContext(coachingStyle) — snapshot from all stores
  → parseMockIntent(text) — classifies topic
  → answerCoachPrompt(context, text, intent) — generates AIMessage
  → message appended to conversation
  → if proposedActions present, ActionPreview rendered
```

### Update a Target

```
User asks to change calorie goal
  → Coach proposes AIActionProposal { type: 'update_macros', payload: { calories: 2800 } }
  → ActionPreview rendered — user reviews new value
  → User taps Confirm
  → confirmAction() → executeAction('update_macros', payload)
  → updateMacroGoalsTool updates nutritionStore
  → Confirmation summary rendered in conversation
  → Dependent screens (Dashboard, Nutrition) reflect new value
```

### Generate a Workout

```
User asks for a workout
  → parseMockIntent detects 'workout' intent
  → mockAIService generates WorkoutProposal using training context
  → AIMessage with proposedActions: [{ type: 'save_workout', payload: workout }]
  → User reviews workout in ActionPreview
  → User confirms
  → saveWorkoutTool updates trainingStore.todayWorkout
```

### Learn a Preference (Planned)

```
User repeatedly replaces a specific exercise
  → system detects pattern across sessions
  → Coach surfaces: "You often swap Romanian deadlifts. Should I stop including them?"
  → User confirms
  → Memory record stored: { type: 'exercise_preference', exercise: 'rdl', preference: 'exclude' }
  → Future workout generation queries memory before building plan
```

---

## 14. Current Technical Debt

| Item | Notes |
|---|---|
| All AI responses are mocked | `mockAIService.ts` — must be replaced with real LLM gateway |
| All feature data is mocked | Each feature has a `mock.ts` — requires backend |
| User profile is not persisted | `userStore` — reset on restart |
| No onboarding | Route and flow not yet created |
| Duplicate goals state | `userStore.profile.goals` and `nutritionStore.goals` overlap |
| No safety layer | Medical/injury/dietary boundary enforcement is not implemented |
| No real authentication | No `app/(auth)/` route |
| Hard-coded context values | `buildAIContext` hard-codes age, height, timezone |
| No error boundaries | UI error containment not implemented |
| No accessibility audit | ARIA roles and screen reader support not verified |
| RN Web deprecation warnings | `shadow*` style props and `pointerEvents` prop warnings in console |
| `app.json` bundle IDs still use `fitos` | `slug`, `scheme`, `bundleIdentifier`, `package` remain `fitos` — intentional until brand change is confirmed for production |
| Old Cedric/Elara image assets | `assets/Branding/Cedric.png`, `Elara.png` etc. — not used by the app, not yet removed |

---

## 15. Architecture Decisions

| Decision | Reason | Consequence |
|---|---|---|
| One unified Form Theory Coach | A scalable intelligence identity is more maintainable and product-focused than fictional named personas | Persona state replaced with coaching-style preference; all Coach components use a single identity model |
| No named primary personas | Cedric and Elara created unnecessary UX complexity and persona-management overhead | Legacy migration required; persona references remain only in migration code |
| Appearance independent from coaching style | They are genuinely separate preferences; tying them together created confusing UX | `coachingStyle` and `appearance` are separate fields in the Coach store |
| Deterministic calculations | The LLM should not be the sole calculator; numerical outputs must be auditable and reproducible | Application owns all formula implementations; LLM only explains |
| Explicit confirmation before state changes | Users must understand and agree to any plan modification | All action-type proposals go through `ActionPreview` before `executeAction` is called |
| App-owned memory | Memory is not inferred from conversation context alone; it is explicitly stored and user-editable | Memory architecture is planned but not yet built |
| Replaceable LLM provider | Avoid lock-in to a single AI provider | Gateway layer must be abstracted; no provider-specific logic in application code |
| Progressive onboarding | Reduce initial friction; collect profile data over time | Short mandatory flow with progressive enrichment; profile completeness tracked |
| Feature-based module structure | Independent development and testing per domain | Each feature owns its components, hooks, and types; shared primitives in `src/shared/` |

---

_Last updated: 2026-06-29_
