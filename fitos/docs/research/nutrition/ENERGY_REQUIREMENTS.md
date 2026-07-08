# Energy Requirements

## Implementation Rules

- Use Mifflin-St Jeor for adult resting energy estimation when age, sex, height, and weight are available (`ENERGY-001`, `SRC-ENERGY-MIFFLIN-1990`).
- Treat total daily energy expenditure as an estimate range, not a precise fact (`ENERGY-002`).
- Lower confidence when the user skips sex, age, height, weight, activity, training frequency, or step information.
- Manual calorie targets must be validated against safety boundaries and explained as user overrides.
- Do not generate aggressive deficits for safety-restricted profiles.

## Required Output Shape

Energy calculation should return:

- resting energy estimate
- maintenance estimate and range
- calorie target and range
- assumptions
- warnings
- confidence
- source references

## Notes

The current implementation in `src/features/onboarding/services/calculateEnergyNeeds.ts` should be replaced by a domain service under `src/domain/nutrition/energy/`.
