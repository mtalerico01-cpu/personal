# Form Theory Onboarding System Audit

Date: 2026-07-02  
Status: Stage 1 audit before major implementation changes

## Scope

This audit covers the current pre-auth routing, sign-in shell, onboarding flow, answer schema, profile generation, initial plan generation, persistence, and post-onboarding integrations across Dashboard, Nutrition, Training, Cardio, Progress, Profile, and Coach.

The audit was performed before the evidence-based recommendation overhaul. It is intentionally diagnostic: it records what exists, what is unsafe or brittle, and what must change before the system can be called evidence-based.

## Executive Findings

1. The app does not have a central active plan source of truth. Onboarding confirms a generated draft plan, then fans pieces into user, nutrition, training, progress, and coach stores. Later screens read different slices plus mock data, so the app can drift immediately after onboarding.
2. Recommendation logic is feature-local and scattered. Energy, macros, training, cardio, safety, profile building, and coach tools each contain separate rules, some of which conflict.
3. Macro logic still treats fixed percentages as defaults in AI tools, while onboarding uses grams-per-kg protein plus percentage-driven fat. This fails the requirement to avoid universal macro splits.
4. Diet style and macro preference are conflated. `high_protein` and `low_carb` appear as diet styles even though they are nutrient emphasis choices, not complete dietary patterns.
5. Custom options exist but are not fully functional. Custom workout split currently stores a comma-separated focus string and plan generation returns generic "Custom split" rather than building a validated schedule.
6. Weak terminology remains. `bro_split`, "Bro Split", and "Bro split" still appear in onboarding types/UI and training generation.
7. The current fixed onboarding list is shorter than before, but it is still not a rule-driven flow engine. Branching and validation live partly in `app/onboarding.tsx`, partly in `steps.ts`, and partly in services.
8. Safety checks are incomplete. The system checks under-18, underweight BMI, aggressive fat-loss pace, extreme calories, and sensitive limitations, but not pregnancy, breastfeeding, eating disorder risk, clinician-directed diets, severe injuries, or medical escalation flows.
9. Generated explanations are not source-traceable. `generateInitialPlan` returns a single generic explanation string without source IDs, rule IDs, confidence, or per-domain rationale.
10. Coach and AI contexts do not inherit the generated plan. `buildAIContext` hardcodes a plan name and dates, while AI macro tools can overwrite targets using their own formulas.

## Current Routing and Account Flow

### Current Behavior

- `app/_layout.tsx` routes incomplete unauthenticated users to `/welcome`.
- `/welcome`, `/login`, and `/onboarding` are allowed before completed onboarding.
- `app/welcome.tsx` provides a pre-auth welcome page with sign-up, login, and shortcut restore.
- `app/login.tsx` is a branded login shell with email/password fields and social buttons.
- There is no real account creation service, authentication persistence, credential validation, or user identity boundary beyond local onboarding/profile persistence.

### Risks

- "Sign Up For Free" currently means local onboarding, not account creation.
- "Log In" is a UI-only shell.
- Shortcut restore is a local profile shortcut, not authenticated sign-in.
- Future real auth must define how an account, profile, onboarding draft, and active plan relate.

### Required Changes

- Introduce explicit local-vs-authenticated account states.
- Keep the current UI shell, but prevent code/docs from implying secure sign-in exists before auth is implemented.
- Define persistence migration from anonymous onboarding to authenticated profile.

## Current Onboarding Flow

### Files Audited

- `app/onboarding.tsx`
- `src/features/onboarding/steps.ts`
- `src/features/onboarding/types.ts`
- `src/features/onboarding/store/onboardingStore.ts`

### Current Behavior

- The canonical flow has 17 steps after the previous shortening pass.
- `steps.ts` owns a fixed ordered list and some `shouldIncludeStep` logic.
- `app/onboarding.tsx` owns the main renderer, many option lists, local input state, answer commits, step completion checks, and several branch-like behaviors.
- `onboardingStore.ts` owns draft persistence, step navigation, plan generation, confirmation, and cross-store fan-out.

### Problems

- No central step registry with per-step `shouldShow`, `validate`, and `nextStep` rules.
- Dead/legacy step IDs remain in `OnboardingStepId` even when not in the canonical flow.
- Renderer-level branching makes the flow hard to test independently.
- Completion checks are screen-specific and not reusable by tests/domain services.
- The fixed list cannot naturally adapt to goals such as endurance, mobility, healthy aging, custom goals, or medically constrained users.

### Required Changes

- Create `src/features/onboarding/flow/onboardingFlowEngine.ts`.
- Create a step registry that owns step metadata, visibility, validation, next-step rules, and answer requirements.
- Keep UI rendering separate from flow decisions.
- Add scenario tests for each major route through the flow.

## Current Answer and Profile Schema

### Files Audited

- `src/features/onboarding/types.ts`
- `src/types/user.ts`
- `src/features/onboarding/services/buildUserProfileFromOnboarding.ts`
- `src/store/userStore.ts`

### Problems

- `PrimaryGoal` is too limited. It lacks explicit cardiovascular fitness, endurance, mobility, healthy aging, event preparation, and user-defined custom goal support.
- `UserProfile` mixes user-stated facts, inferred assumptions, and generated recommendations.
- There is no `ProfileValue<T>` wrapper with `value`, `source`, `confidence`, and `updatedAt`.
- Custom split is persisted as a string instead of a structured schedule.
- Body, schedule, diet, safety, and preference information are not normalized enough for deterministic re-planning.
- Profile edits in `app/(tabs)/profile.tsx` update multiple stores directly instead of proposing a regenerated plan through one planner.

### Required Changes

- Add explicit domains for user facts, preferences, constraints, assumptions, recommendations, and active plan.
- Add source/confidence metadata for inferred or recommended values.
- Store custom split, cardio, meal structure, and macro preferences as structured objects.
- Make profile edits route through a plan proposal/rebuild workflow.

## Current Energy Logic

### File Audited

- `src/features/onboarding/services/calculateEnergyNeeds.ts`

### Current Behavior

- Uses a Mifflin-St Jeor-style resting energy estimate.
- Applies broad activity multipliers from one activity label.
- Applies deficit/surplus rules based on goal and pace.
- Preserves manual calorie overrides.
- Restricts unsafe plans to maintenance.

### Problems

- Energy logic is feature-local, not a central domain service.
- Activity estimation does not combine occupation, steps, training load, cardio load, and confidence.
- Manual targets bypass explanatory validation except broad calorie bounds.
- No rule IDs, source references, confidence scoring, or structured rationale.
- Safety and energy are tightly coupled without a reusable clinical escalation model.

### Required Changes

- Create `src/domain/nutrition/energy/` with one energy requirement service.
- Return estimates, ranges, assumptions, confidence, warnings, and source references.
- Treat low-confidence estimates as estimates requiring review, not precise prescriptions.

## Current Macro Logic

### Files Audited

- `src/features/onboarding/services/calculateMacroTargets.ts`
- `src/features/ai/tools/createFitnessPlanTool.ts`
- `src/features/ai/tools/updateMacroGoalsTool.ts`
- `src/features/ai/services/mockAIService.ts`

### Current Behavior

- Onboarding estimates protein by g/kg and goal.
- Fat is partly percentage-based, especially for keto/lower-carb choices.
- Carbs receive remaining calories.
- AI `createFitnessPlanTool` derives macros from `30% protein / 45% carbs / 25% fat`.
- AI diet preview uses fixed carbohydrate and fat percentages.
- AI macro adjustment distributes calorie changes by fixed percentages.

### Problems

- Fixed macro percentages conflict with the requested evidence-based model.
- Protein, diet pattern, carbohydrate preference, and fat minimums are not modeled separately.
- Manual macro overrides are not checked for internal calorie consistency.
- Confidence and source references are absent.
- AI tools can overwrite onboarding targets using different logic than onboarding.

### Required Changes

- Create `src/domain/nutrition/macros/` with one macro engine.
- Base protein primarily on body mass, goal, energy status, training status, and dietary pattern constraints.
- Treat carbohydrate and fat as ranges and preferences after protein and energy constraints are set.
- Route all AI macro changes through the same macro engine.

## Current Diet Pattern Logic

### Current Findings

- `high_protein` and `low_carb` are stored as `eatingStyles`/diet choices.
- Diet style options are limited and do not represent common sustainable patterns well.
- Restrictions, preferences, and adherence factors are not normalized.

### Required Changes

- Separate diet pattern from macro preference:
  - Diet pattern examples: balanced, Mediterranean-style, vegetarian, vegan, pescatarian, halal, kosher, dairy-free, gluten-free, low-FODMAP-aware, culturally flexible, custom.
  - Macro preference examples: higher protein, moderate carb, lower carb, higher carb for endurance, lower fat preference, custom targets.
- Custom diet options must collect enough structured details to affect plan generation.

## Current Training Logic

### File Audited

- `src/features/onboarding/services/generateTrainingPlan.ts`

### Current Behavior

- Chooses split from days, experience, selected split, and preferred training type.
- Builds simple workouts from hardcoded exercise templates.
- Preserves some manual current-plan fields.

### Problems

- `bro_split` and "Bro split" labels remain.
- Custom split returns only generic "Custom split".
- `preferredTypes.includes('bodybuilding')` appears inconsistent with current onboarding choices, which use `hypertrophy`.
- Training days, session duration, equipment, limitations, recovery, and goals are not used deeply enough.
- No volume/frequency rationale, confidence, or source references.

### Required Changes

- Replace `bro_split` with neutral `body_part_split` naming.
- Model training split as structured schedule, not only a label.
- Create a central training planner under `src/domain/planning/`.
- Add rules for beginner/intermediate/advanced frequency, goal-specific emphasis, equipment constraints, and custom schedules.

## Current Cardio Logic

### Files Audited

- `src/features/onboarding/services/generateCardioPlan.ts`
- `src/store/trainingStore.ts`
- `app/(tabs)/training.tsx`

### Current Behavior

- Generates simple cardio recommendations by goal, activity level, training days, and manual user inputs.
- Training screen's cardio edit path hardcodes a 30-minute outdoor Zone 2 walk.

### Problems

- Cardiovascular fitness and endurance are not explicit primary goals.
- Cardio plan is not a structured schedule with mode, intensity, progression, constraints, and rationale.
- Current training UI updates cardio independently from the generated plan.
- No guideline traceability.

### Required Changes

- Add cardio/endurance goals.
- Generate cardio schedules through the same derived plan builder.
- Replace hardcoded cardio edits with planner-backed proposals.

## Current Safety Logic

### File Audited

- `src/features/onboarding/services/evaluateOnboardingSafety.ts`

### Current Behavior

- Flags under-18 users, underweight BMI, faster fat-loss preference, extreme manual calories, and sensitive limitations.
- Blocks activation for restricted safety levels.

### Problems

- Missing required safety cases: pregnancy, breastfeeding, eating disorder risk, medically prescribed diet, clinician-directed nutrition limits, severe injury, chest pain/cardiac symptoms, and other medical escalation needs.
- Safety results are not source-referenced.
- Safety constraints are not carried as first-class plan constraints across profile, planner, coach, and edits.

### Required Changes

- Create safety boundary documentation before implementing rules.
- Add structured safety answers and medical escalation outcomes.
- Block calorie/macro/training recommendations where the app should defer to a clinician.

## Current Plan Generation and Persistence

### Files Audited

- `src/features/onboarding/services/generateInitialPlan.ts`
- `src/features/onboarding/store/onboardingStore.ts`
- `src/store/nutritionStore.ts`
- `src/store/trainingStore.ts`
- `src/store/progressStore.ts`

### Current Behavior

- `generateInitialPlan` orchestrates local energy, macro, training, cardio, step, meal, schedule, and daily macro logic.
- `confirmPlan` activates the plan by writing pieces into multiple stores.
- Nutrition, training, progress, and coach stores then own their own independent state.

### Problems

- The active plan lives in onboarding store rather than a dedicated plan store.
- Store fan-out can create divergence immediately.
- Dashboard and feature hooks use a mixture of active store values and mock defaults.
- Plan explanations are not structured or source-traceable.
- Generated daily macro plan uses simplistic carb adjustments without source-linked rationale.

### Required Changes

- Create one centralized derived-plan builder under `src/domain/planning/`.
- Create one active plan store or equivalent source of truth.
- Downstream stores/screens should either read from the active plan or receive derived selectors from it.
- Every generated plan should include rationale, confidence, assumptions, warnings, and source references.

## Current Dashboard/Nutrition/Training/Progress Integration

### Files Audited

- `src/features/dashboard/hooks/useDashboard.ts`
- `src/features/nutrition/hooks/useNutrition.ts`
- `src/features/training/hooks/useTraining.ts`
- `src/features/progress/hooks/useProgress.ts`
- `app/(tabs)/nutrition.tsx`
- `app/(tabs)/training.tsx`
- `app/(tabs)/progress.tsx`
- `app/(tabs)/profile.tsx`

### Problems

- Dashboard uses nutrition/training/progress stores plus mock AI brief and mock weight trend.
- Training hook uses generated workout mocks independent of active plan.
- Progress hook overlays store weight values on mock progress objects.
- Profile screen reads active plan from onboarding store, not from a durable plan domain.
- Profile save updates multiple stores directly and does not regenerate a plan proposal.

### Required Changes

- Replace mock fallbacks where onboarding-derived values exist.
- Route all plan-affecting edits through the central planner.
- Make plan review date, expected rate, cardio/training schedule, and nutrition targets visible to all relevant screens through shared selectors.

## Current Coach and AI Integration

### Files Audited

- `src/features/ai/context/buildAIContext.ts`
- `src/features/coach/store/coachStore.ts`
- `src/features/coach/insights/buildCoachInsight.ts`
- `src/features/ai/services/mockAIService.ts`
- `src/features/ai/tools/createFitnessPlanTool.ts`
- `src/features/ai/tools/updateMacroGoalsTool.ts`
- `src/features/ai/tools/toolDispatcher.ts`

### Problems

- `buildAIContext` hardcodes plan name and dates.
- Coach handoff accepts generic summary/details without full recommendation rationale.
- Coach insights use current store slices, not the active plan rationale/confidence.
- AI macro tools write directly to nutrition store.
- AI diet strategy responses use confident language without documented source mapping.

### Required Changes

- Add active plan/rationale/confidence/source refs to AI context.
- Change AI tools to propose planner-backed changes rather than directly calculating macros.
- Preserve user confirmation, but execute confirmed actions through the central plan/proposal system.

## Current Test Coverage

### Files Audited

- `src/features/onboarding/__tests__/generateInitialPlan.test.ts`
- `src/features/onboarding/__tests__/onboardingStore.test.ts`
- `src/features/ai/__tests__/toolDispatcher.test.ts`
- Coach and AI tests discovered under `src/features/**/__tests__`.

### Current Coverage

- Basic plan generation scenarios.
- Manual calorie/macro override preservation.
- Unsafe manual calories blocked.
- Store fan-out after onboarding confirmation.
- AI tool dispatcher direct mutations.

### Required Coverage

- Flow engine branching for fat loss, muscle gain, maintenance, endurance, mobility, custom goals, and safety escalation.
- Energy engine confidence and source refs.
- Macro engine protein/fat/carbohydrate ranges and manual-target validation.
- Training split engine with custom split validation.
- Cardio planner for health, fat loss, endurance, and low-activity users.
- Cross-app active plan consistency after onboarding and after profile edits.
- Coach/AI tools must use the central planner.

## Known Weak Terms and Replacement Targets

| Current term | Location | Issue | Replacement direction |
| --- | --- | --- | --- |
| `bro_split` | `src/features/onboarding/types.ts`, training generator | Informal/bro-science label | `body_part_split` |
| "Bro Split" / "Bro split" | onboarding UI and training plan | Same | "Body-part split" |
| `high_protein` as diet style | onboarding UI/types/tests | Macro preference, not diet pattern | `proteinPreference: higher` or similar |
| `low_carb` as diet style | onboarding UI/types | Macro preference, not diet pattern | `carbPreference: lower` or similar |
| "Custom split" generic | training generator | Does not build custom plan | Structured custom schedule |
| "I am not sure" answers | onboarding UI | Fine only if they create assumptions/confidence | Store explicit uncertainty and lower confidence |

## Implementation Order Recommended

1. Create research docs and source registry.
2. Define shared recommendation output types: rationale, confidence, assumption, warning, source reference.
3. Build central energy and macro domain engines.
4. Build safety boundary model.
5. Build central derived plan builder and active plan store.
6. Build rule-driven onboarding flow engine.
7. Normalize profile schema and migration compatibility.
8. Replace onboarding services with domain engines.
9. Replace AI macro/create-plan tools with planner-backed proposals.
10. Update Dashboard, Nutrition, Training, Cardio, Progress, Profile, and Coach to read shared plan outputs.
11. Expand tests and create manual validation matrix.

## Completion Gate

The overhaul should not be called complete until all of the following are true:

- Research docs exist and cite credible sources.
- Each recommendation rule has source IDs or a documented product assumption.
- Energy, macros, training, cardio, and safety use centralized engines.
- Onboarding uses a rule-driven flow engine.
- Custom options produce structured, validated outputs.
- Weak terms are removed.
- Active plan is a durable source of truth.
- Coach and AI tools consume the same plan/rationale as the rest of the app.
- Required automated tests and manual validation matrix are present.
