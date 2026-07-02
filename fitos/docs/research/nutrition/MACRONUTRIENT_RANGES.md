# Macronutrient Ranges

## Implementation Rules

- Do not use one fixed macro split for every user (`MACRO-001`).
- Use National Academies AMDR values as context, not as a mandatory prescription:
  - carbohydrate: 45-65% of energy for adults
  - fat: 20-35% of energy for adults
  - protein: 10-35% of energy for adults
- Calculate protein, fat, and carbohydrate in grams using body size, goal, training, dietary pattern, and preferences.
- Return macro ranges where precision is not justified.
- Manual macro targets must validate that macro calories roughly match target calories.

## Current Code Conflict

- `src/features/ai/tools/createFitnessPlanTool.ts` uses `30% protein / 45% carbohydrate / 25% fat`.
- `src/features/ai/services/mockAIService.ts` uses fixed percentages for macro proposals and diet previews.
- These paths must route through the same macro engine used by onboarding.
