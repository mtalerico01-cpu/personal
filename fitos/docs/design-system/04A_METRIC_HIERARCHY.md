# 04A - Metric Hierarchy and KPI Governance

Date created: 2026-07-02

## Core Rule

Numbers do not become important because they are numbers. Every metric must have a semantic role based on the screen's user question.

## Metric Roles

| Role | Purpose | Frequency | Example |
|---|---|---:|---|
| Hero | Single dominant screen value | Usually 0-1 per screen | Calories remaining, active workout timer, readiness score |
| Primary | Main supporting value | 1-3 per screen | Protein remaining, today's workout volume, current body weight |
| Supporting | Card-level data | Several | Steps, workout duration, cardio sessions |
| Secondary | Row-level or list metadata | Many | Sets, reps, meal calories, supplement count |
| Contextual | Comparison/explanation value | Near parent metric only | vs last week, to goal, trend period |
| Inline | Values inside sentences | As needed | 42g protein remaining |

## Existing KPI Inventory

| Screen/Component | Current KPI | Current Treatment | Proposed Role | Finding |
|---|---|---|---|---|
| Dashboard `KPICard` | Calories | Same card size as other KPIs | Hero or Primary depending state | Needs daily priority logic |
| Dashboard `KPICard` | Protein | Same as calories | Primary when below target | Should outrank carbs/fat when remaining gap is high |
| Dashboard `KPICard` | Carbs/Fat | Same as calories | Supporting | Currently over-equalized |
| Dashboard `KPICard` | Weight | Same as nutrition KPIs | Supporting or Primary on Progress-oriented days | Needs trend context |
| Dashboard `KPICard` | Steps | Same as nutrition KPIs | Supporting | Useful but rarely hero unless activity goal is primary |
| Nutrition `MacroSummaryCard` | Calories today | `displayMedium` hero | Hero | Reasonable default, but may yield to protein gap |
| Nutrition `MacroSummaryCard` | Macro bars | Equal bars | Primary/supporting by gap | Needs intelligent ordering |
| Nutrition `RemainingMacrosCard` | Remaining grams | Inline colored text | Primary explanatory | Good direction; needs non-color cues |
| Training `TodayWorkoutCard` | Workout duration/exercises | Card metrics | Primary/supporting | Active workout needs larger controls |
| Training `CardioSummaryCard` | Cardio minutes/steps | Progress bars | Primary/supporting | Should adapt to cardio goal users |
| Progress `ProgressMonitorCard` | Weight/strength/waist | Toggle with chart | Hero/primary per selected tab | Needs interpretation and confidence |
| Progress `WeightTrendCard` | Current weight | `displayMedium` | Hero on weight detail only | Needs chart accessibility and trend confidence |
| Profile plan preview | Calories/macros/training days | Local plan metric cards | Supporting | Should reuse Metric component |

## Metric Context Rule

Every important metric must answer at least one of:

- Compared with what?
- Is this on target?
- What period does it represent?
- What changed?
- What should the user do?
- How confident is the interpretation?

## Typography Mapping Proposal

| Metric Role | Proposed Type Role | Unit Treatment | Label Treatment |
|---|---|---|---|
| Hero | `metricHero` | Smaller, aligned baseline | Above or below, never competing |
| Primary | `metricLarge` | Smaller, muted | Clear, readable label |
| Supporting | `metricMedium` | Inline or trailing | Compact label |
| Secondary | `metricSmall` | Inline | Row label or caption |
| Contextual | `bodySmall` or `caption` | Same as sentence | Plain-language context |
| Inline | `body` | Same size as text unless emphasized | Sentence context |

## Governance Rules

- One screen should usually have no more than one hero KPI.
- A card should not contain multiple competing large values.
- Units never overpower values.
- Percentages require comparison context.
- Color cannot be the only signal of good/bad/current/selected.
- Decimal precision must match the decision: body weight may use 0.1 lb, calories usually no decimals, percentages rounded unless precise analysis is needed.
- Reorder metric emphasis based on user goal and current state.
