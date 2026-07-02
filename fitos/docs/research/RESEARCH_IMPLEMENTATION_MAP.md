# Research Implementation Map

This file maps source-backed rules to planned implementation modules. It should be updated whenever rules move into code.

| Rule ID | Summary | Source IDs | Planned module | Status |
| --- | --- | --- | --- | --- |
| ENERGY-001 | Estimate adult resting energy with Mifflin-St Jeor when age, sex, height, and weight are available; mark confidence lower when inputs are missing or user chooses not to use sex. | SRC-ENERGY-MIFFLIN-1990 | `src/domain/nutrition/energy/estimateRestingEnergy.ts` | Planned |
| ENERGY-002 | Calculate maintenance as an estimate range using resting energy plus activity/training assumptions, not a single unquestioned value. | SRC-ENERGY-MIFFLIN-1990 | `src/domain/nutrition/energy/calculateEnergyRequirement.ts` | Planned |
| WEIGHT-001 | Default fat-loss pace should stay within gradual, sustainable ranges; faster requests should lower confidence and may trigger caution. | SRC-CDC-WEIGHT-LOSS-2025 | `src/domain/planning/weightChangeRules.ts` | Planned |
| MACRO-001 | Do not assign universal macro percentages. Use AMDR as a population safety/context range, then personalize grams by goal, body mass, training, diet pattern, and preferences. | SRC-NASEM-DRI-MACROS-2005, SRC-ISSN-PROTEIN-2017 | `src/domain/nutrition/macros/calculateMacroTargets.ts` | Planned |
| MACRO-002 | Protein targets for exercising adults should generally use grams/kg ranges; fat-loss and resistance training may justify higher protein than RDA. | SRC-ISSN-PROTEIN-2017, SRC-NASEM-DRI-RDA-2005 | `src/domain/nutrition/macros/proteinRules.ts` | Planned |
| MACRO-003 | Adult carbohydrate should not be driven only by leftover calories; minimum carbohydrate needs, diet preferences, endurance demands, and AMDR context should be considered. | SRC-NASEM-DRI-RDA-2005, SRC-NASEM-DRI-MACROS-2005 | `src/domain/nutrition/macros/carbohydrateRules.ts` | Planned |
| MACRO-004 | Fat targets should respect essential fat/AMDR context and should not be forced by a single default percentage. | SRC-NASEM-DRI-MACROS-2005 | `src/domain/nutrition/macros/fatRules.ts` | Planned |
| DIET-001 | Diet pattern and macro preference are separate concepts. Higher-protein/lower-carb are nutrient emphasis preferences, not complete diet styles. | SRC-DGA-2020-2025, SRC-NASEM-DRI-MACROS-2005 | `src/domain/nutrition/dietPatterns.ts` | Planned |
| TRAINING-001 | Training frequency should depend on experience, goal, capacity, and schedule; novice 2-3 days/week, intermediate 3-4, advanced 4-5 are reasonable defaults. | SRC-ACSM-RT-2009 | `src/domain/planning/trainingFrequencyRules.ts` | Planned |
| TRAINING-002 | Split labels should be neutral and schedule-based; split choice should serve volume, recovery, availability, and adherence. | SRC-ACSM-RT-2009 | `src/domain/planning/trainingSplitRules.ts` | Planned |
| CARDIO-001 | Adult health baseline should consider 150 min/week moderate or 75 min/week vigorous aerobic activity plus 2 strength days/week. | SRC-CDC-ACTIVITY-ADULTS-2023, SRC-ODPHP-PAG-2018 | `src/domain/planning/cardioRules.ts` | Planned |
| SAFETY-001 | Pregnancy/postpartum users should receive clinician-aware guidance and should not receive aggressive calorie or training prescriptions from onboarding alone. | SRC-CDC-PREGNANCY-ACTIVITY-2025, SRC-NASEM-DRI-RDA-2005 | `src/domain/planning/safetyRules.ts` | Planned |
| PROFILE-001 | Inferred values must carry source, confidence, and updated timestamp separately from user-stated facts. | Product assumption | `src/types/user.ts`, `src/domain/profile/` | Planned |
| FLOW-001 | `not_sure` answers should become explicit uncertainty inputs that lower confidence or request defaults, not silent missing data. | Product assumption | `src/features/onboarding/flow/onboardingValidation.ts` | Planned |
