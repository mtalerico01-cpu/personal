# FitOS — Architecture Proposal

## 1. Architecture Review

### Recommended: Feature-Based Modular Architecture

Rather than a flat layer-based split (components/, hooks/, utils/), I recommend **feature-based modules with shared infrastructure**. Each feature owns its own components, hooks, types, and services — shared primitives live in a top-level `shared/` directory.

This is the same pattern used by Linear, Vercel, and most senior-maintained React Native codebases.

**Why feature-based over layer-based:**
- Features can be developed, tested, and shipped independently
- Reduces cross-feature coupling
- New engineers understand the codebase by reading one feature folder
- AI services remain clearly separated from UI concerns
- Easier to extract features into separate packages later

---

## 2. Proposed Folder Structure

```
fitos/
├── app/                        # Expo Router file-based navigation
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── onboarding.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx         # Tab bar configuration
│   │   ├── index.tsx           # Dashboard
│   │   ├── nutrition.tsx
│   │   ├── training.tsx
│   │   └── progress.tsx
│   ├── ai-coach.tsx            # Full-screen AI conversation
│   └── _layout.tsx             # Root layout (theme, providers)
│
├── src/
│   ├── features/               # Feature modules (co-located logic)
│   │   ├── dashboard/
│   │   │   ├── components/     # KPI cards, widgets
│   │   │   ├── hooks/          # useDashboardData, useKPIOrder
│   │   │   ├── types.ts
│   │   │   └── index.ts        # Public API for this feature
│   │   ├── nutrition/
│   │   │   ├── components/     # MacroRing, MealCard, FoodSearch
│   │   │   ├── hooks/          # useNutritionLog, useMacros
│   │   │   ├── services/       # nutritionApi.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── training/
│   │   │   ├── components/     # WorkoutCard, ExerciseRow, VolumeChart
│   │   │   ├── hooks/          # useWorkoutLog, useStrengthTrends
│   │   │   ├── services/       # trainingApi.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── weight/
│   │   │   ├── components/     # WeightChart, TrendIndicator
│   │   │   ├── hooks/          # useWeightHistory, useWeightTrend
│   │   │   ├── services/       # weightApi.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── ai/
│   │       ├── components/     # DailyBrief, InsightCard, AIChatBubble
│   │       ├── hooks/          # useAICoach, useDailyBrief
│   │       ├── services/
│   │       │   ├── openai.ts   # Raw OpenAI client
│   │       │   ├── context.ts  # Builds AI context payload
│   │       │   └── prompts.ts  # System prompt templates
│   │       ├── types.ts
│   │       └── index.ts
│   │
│   ├── shared/                 # Cross-feature primitives
│   │   ├── components/
│   │   │   ├── ui/             # Button, Card, Badge, Sheet, etc.
│   │   │   ├── charts/         # Wrappers around Victory Native XL
│   │   │   └── layout/         # Screen, SafeArea, Spacer
│   │   ├── hooks/
│   │   │   ├── useTheme.ts
│   │   │   ├── useHaptics.ts
│   │   │   └── useLocalTime.ts
│   │   ├── lib/
│   │   │   ├── supabase.ts     # Supabase client singleton
│   │   │   ├── queryClient.ts  # TanStack Query config
│   │   │   └── revenuecat.ts   # RevenueCat init
│   │   └── utils/
│   │       ├── date.ts
│   │       ├── format.ts       # Macro formatting, unit conversion
│   │       └── math.ts         # Moving averages, trend math
│   │
│   ├── store/                  # Zustand global state
│   │   ├── userStore.ts        # Profile, goals, preferences
│   │   ├── settingsStore.ts    # Units, theme, notifications
│   │   └── dashboardStore.ts   # KPI card order/visibility
│   │
│   └── types/                  # Shared domain types
│       ├── user.ts
│       ├── nutrition.ts
│       ├── training.ts
│       ├── weight.ts
│       └── ai.ts
│
├── assets/                     # Static assets
│   ├── fonts/
│   └── images/
│
├── app.json
├── babel.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 3. Key Architectural Decisions

### A. Expo Router over React Navigation
Expo Router gives us file-based routing (like Next.js), which means navigation structure is immediately readable and co-located with screens. Deep linking and universal links come nearly for free.

### B. Zustand for global state (not Redux, not Context)
Redux is overkill. Context causes unnecessary re-renders at scale. Zustand is minimal, fast, TypeScript-native, and supports devtools. Only truly global state lives here — user profile, settings, dashboard layout prefs.

### C. TanStack Query for all async data
Every piece of server data (meals, workouts, weight logs) goes through TanStack Query. This gives us caching, background refetching, optimistic updates, and loading/error states for free — without writing reducers.

### D. AI context engine as a dedicated feature
The AI is the product. It gets its own feature module (`src/features/ai/`) with a `context.ts` service responsible for assembling the full payload sent to OpenAI. This payload includes: user profile, current time, recent nutrition, weight trend, training history, and goals. The prompt system is versioned and easily tunable.

### E. NativeWind for styling
Tailwind utility classes work directly in JSX. No StyleSheet.create boilerplate. Dark mode is trivially handled via `dark:` prefixes. This is the fastest way to achieve a consistent design system in React Native.

---

## 4. Identified Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Victory Native XL breaking on new Expo SDK | Medium | Wrap all chart components — swap the library without touching feature code |
| OpenAI latency degrading AI feel | High | Stream responses; show skeleton states; cache daily briefs aggressively |
| HealthKit permissions rejected by users | High | Make HealthKit optional; never gate core features behind it |
| Supabase RLS complexity at scale | Medium | Define RLS policies from Day 1 with schema migrations, not post-hoc |
| RevenueCat sandbox testing friction | Low | Mock paywall in Phase 1-4; integrate RevenueCat fully in Phase 5 |
| NativeWind + Expo Router version conflicts | Medium | Pin versions; use a tested Expo SDK baseline |
