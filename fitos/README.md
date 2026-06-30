# Form Theory

> A complete fitness system, guided by intelligence.

Form Theory is an AI-guided fitness and nutrition platform that connects coaching, training, nutrition, cardio, recovery, and progress into one adaptive system. The product centers on a single unified Coach experience rather than separate features working in isolation.

Every body has a theory. Progress comes from testing, learning, and adapting.

---

## Current Status

**Phase:** Post-rebrand stabilization — deterministic prototype intelligence complete, brand refinement complete. Onboarding, backend, and real AI integration are next.

| Area | Status |
|---|---|
| Core screens (Coach, Dashboard, Nutrition, Training, Cardio, Progress) | Implemented — mock data |
| Coach conversation and action flow | Implemented — mock AI service |
| Coaching styles (Direct, Balanced, Encouraging) | Implemented |
| Appearance preference (Dark, Light, System) | Implemented |
| Action proposal and confirmation | Implemented |
| Shared fitness context builder | Implemented |
| Design system and brand tokens | Implemented |
| Form Theory brand (name, assets, guidelines) | Implemented |
| User onboarding | Planned |
| Real backend (auth, profile, persistence) | Planned |
| Real hosted LLM integration | Planned |
| Apple Health integration | Planned |
| Subscriptions | Planned |

The app does **not** currently use a real backend, a real paid LLM, or any live integrations. All AI responses come from a deterministic mock service. All data is mocked in-memory.

---

## Product Areas

| Area | Description |
|---|---|
| **Coach** | Central AI-guided conversation. Proposes actions, provides daily briefs, context-aware suggestions, and coaching across all domains. |
| **Dashboard** | Daily summary view. Calories, macros, training status, Coach insight, and key priorities. |
| **Nutrition** | Macro targets, meal logging, calorie tracking, supplement tracker, Coach guidance. |
| **Training** | Strength plan, workout generator, today's workout, muscle group targeting, session logging. |
| **Cardio** | Cardio session planning, duration and intensity targets, history view. Shares screen with Training. |
| **Progress** | Weight trend, strength score, body measurements, progress photos, Coach perspective. |
| **Onboarding** | Planned. Progressive one-question-at-a-time profile creation with initial plan generation. |
| **Profile and preferences** | Coaching style, appearance preference, user profile. |

---

## Technology Stack

| Layer | Technology | Status |
|---|---|---|
| Framework | React Native + Expo SDK 56 | Implemented |
| Language | TypeScript 6 (strict) | Implemented |
| Navigation | Expo Router 56 (file-based) | Implemented |
| State management | Zustand 5 | Implemented |
| Persistence | AsyncStorage | Implemented (preferences only) |
| Server state | TanStack React Query 5 | Dependency present — not yet actively used |
| Animation | React Native Reanimated 4 | Implemented |
| Gestures | React Native Gesture Handler | Implemented |
| Graphics | React Native Skia, React Native SVG | Implemented |
| Testing | Jest + jest-expo | Implemented |
| Database | Supabase (planned) | Planned |
| AI | Hosted LLM via secure gateway (planned) | Planned |
| Payments | RevenueCat (planned) | Planned |
| Health | Apple HealthKit (planned) | Planned |

---

## Project Structure

```
fitos/
├── app/
│   ├── _layout.tsx                  # Root layout — providers, theme
│   └── (tabs)/
│       ├── _layout.tsx              # Tab bar configuration
│       ├── coach.tsx                # Coach screen
│       ├── index.tsx                # Dashboard
│       ├── nutrition.tsx
│       ├── training.tsx             # Training + Cardio
│       └── progress.tsx
├── src/
│   ├── branding/                    # Brand metadata, asset registry, visual tokens
│   ├── features/
│   │   ├── ai/                      # AI types, context builder, mock service, tools, suggestions
│   │   ├── coach/                   # Coach store, components, hooks, styles, insights
│   │   ├── dashboard/               # Dashboard components, hooks, mock
│   │   ├── nutrition/               # Nutrition components, hooks, mock
│   │   ├── training/                # Training + cardio components, hooks, mock
│   │   └── progress/                # Progress components, hooks, mock
│   ├── shared/
│   │   ├── components/ui/           # Shared UI primitives
│   │   └── theme/                   # Colors, typography, spacing, active theme hook
│   ├── store/                       # Zustand stores: user, nutrition, training, progress, dashboard
│   └── types/                       # Shared domain types
├── assets/
│   └── Branding/                    # Logo assets, brand sheet
│       └── BRAND_GUIDELINES.md
└── docs/
    ├── APP_ARCHITECTURE.md
    ├── BUILD_ROADMAP.md
    └── PROJECT_MILESTONES.md
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Start on iOS simulator
npm run ios

# Start on Android emulator
npm run android

# Start on web
npm run web

# Type check
npx tsc --noEmit

# Run tests
npx jest --runInBand
```

There are no required environment variables for local development. All data is mocked. Environment variables for Supabase, OpenAI, and RevenueCat will be documented when those integrations are added.

---

## Important Product Rules

- Form Theory uses **one unified Coach**. There are no named primary personas.
- **Appearance** (Dark / Light / System) and **coaching style** (Direct / Balanced / Encouraging) are independent preferences.
- **User-confirmed actions** are required for all meaningful plan or profile changes. The Coach proposes; the user confirms.
- **Deterministic application logic** owns calculations. The LLM explains and proposes; it does not directly calculate or mutate state.
- **Current and planned architecture must not be confused.** If a feature is mocked or planned, it is documented as such.

---

## Documentation

- [docs/APP_ARCHITECTURE.md](docs/APP_ARCHITECTURE.md) — Full frontend and target architecture reference
- [docs/BUILD_ROADMAP.md](docs/BUILD_ROADMAP.md) — Phased build plan with current status
- [docs/PROJECT_MILESTONES.md](docs/PROJECT_MILESTONES.md) — Historical milestone record
- [assets/Branding/BRAND_GUIDELINES.md](assets/Branding/BRAND_GUIDELINES.md) — Brand system and usage rules

---

_Last updated: 2026-06-29_
