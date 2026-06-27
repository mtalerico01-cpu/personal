# FitOS — Phase 1 Implementation Plan

## Goal
Deliver a working app shell with premium feel, complete navigation, a fully designed Dashboard using mock data, and a locked-in design system.

At the end of Phase 1, the app should look like it could ship — it just won't have real data yet.

---

## Deliverables

### 1. Project Initialization
- [ ] `npx create-expo-app fitos --template blank-typescript`
- [ ] Configure Expo SDK (latest stable)
- [ ] Install and configure all Phase 1 dependencies
- [ ] Set up TypeScript strict mode (`tsconfig.json`)
- [ ] Set up absolute imports (`@/` alias)
- [ ] Configure NativeWind + Tailwind
- [ ] Configure Expo Router
- [ ] Set up ESLint + Prettier

### 2. Design System (`src/shared/components/ui/`)
- [ ] **Color tokens** — dark palette, accent color, semantic colors (success, warning, error)
- [ ] **Typography scale** — display, heading, body, caption, mono
- [ ] **Card** — elevated glass-style surface with subtle border
- [ ] **Button** — primary, secondary, ghost variants; haptic feedback
- [ ] **Badge** — status indicator
- [ ] **Skeleton** — loading placeholder
- [ ] **Screen** — SafeAreaView wrapper with consistent padding
- [ ] **Divider**, **Spacer**

### 3. Navigation Shell (`app/`)
- [ ] Root `_layout.tsx` — dark theme, gesture handler, reanimated setup
- [ ] Tab bar layout — 4 tabs: Dashboard, Nutrition, Training, Progress
- [ ] Tab icons — SF Symbols via `expo-symbols` or custom SVG
- [ ] Smooth tab transitions
- [ ] Placeholder screens for Nutrition, Training, Progress

### 4. Dashboard Screen (`src/features/dashboard/`)

#### KPI Cards
Each card shows a metric, a mini chart or indicator, and a trend arrow.

| Card | Metric | Visualization |
|---|---|---|
| Calories | Today's intake vs goal | Mini bar + percentage |
| Macros | P / C / F grams | Three-segment ring |
| Weight | Today vs 7-day avg | Sparkline |
| Workout | Today's training status | Activity ring or checkmark |
| AI Brief | One-line coach insight | Text with icon |

#### Dashboard Layout
- [ ] Scrollable screen with sticky header (greeting + date)
- [ ] User-reorderable KPI cards (long press to rearrange)
- [ ] Card visibility toggles (settings modal)
- [ ] All data from mock service (`src/features/dashboard/mock.ts`)

### 5. AI Daily Brief Card (mock)
- [ ] Surface area for the AI — not functional yet
- [ ] Shows a hardcoded "daily brief" message in the correct UI style
- [ ] Tap → expands to full-screen AI detail view (placeholder)
- [ ] This establishes the visual language for all future AI surfaces

### 6. Mock Data Layer (`src/features/*/mock.ts`)
- [ ] `mockUser` — profile, goals, preferences
- [ ] `mockNutritionLog` — today's meals, macros
- [ ] `mockWeightLog` — 30-day history
- [ ] `mockWorkoutLog` — recent sessions
- [ ] `mockAIBrief` — sample daily brief object
- [ ] All mock data typed against `src/types/`

### 7. Zustand Stores (Phase 1 scope)
- [ ] `userStore` — mock user loaded on app launch
- [ ] `dashboardStore` — KPI card order and visibility (persisted via `zustand/middleware/persist` + AsyncStorage)

---

## Dependencies to Install

```bash
# Core
expo install expo-router expo-constants expo-linking expo-status-bar

# UI & Styling
npm install nativewind
npm install --save-dev tailwindcss

# Animation & Gestures
expo install react-native-reanimated react-native-gesture-handler

# State
npm install zustand
npm install @tanstack/react-query

# Async Storage (for zustand persist)
expo install @react-native-async-storage/async-storage

# Charts (Phase 1 - basic sparklines only)
npm install victory-native

# SVG (required by Victory)
expo install react-native-svg

# Dev Tools
npm install --save-dev eslint prettier eslint-config-expo
```

---

## File Creation Order

1. `tsconfig.json` + `babel.config.js` + `tailwind.config.js`
2. `src/types/` — all domain types
3. `src/shared/components/ui/` — design system
4. `app/_layout.tsx` + `app/(tabs)/_layout.tsx`
5. `src/store/` — Zustand stores
6. `src/features/dashboard/mock.ts`
7. `src/features/dashboard/components/` — KPI cards
8. `app/(tabs)/index.tsx` — Dashboard screen
9. Placeholder tab screens

---

## Definition of Done for Phase 1

- App launches on iOS Simulator without errors
- Tab navigation works with smooth transitions
- Dashboard renders all KPI cards with mock data
- Dark mode looks premium — not just "dark"
- KPI card order can be rearranged and persists across restarts
- AI Brief card is visible and tappable (placeholder detail screen)
- Zero TypeScript errors in strict mode
- Zero lint errors

---

## ⏳ Awaiting Approval

Before any code is generated, please review:

1. [ARCHITECTURE.md](./ARCHITECTURE.md) — folder structure + architectural decisions
2. This Phase 1 plan

**Questions for you before proceeding:**

1. Do you want the accent color to be a specific brand color, or should I propose a palette?
2. Tab bar: bottom tabs (standard iOS) or a custom floating tab bar?
3. Should the AI Brief card on the dashboard be collapsible, or always full height?
4. Any features you want to add or remove from Phase 1 scope?
