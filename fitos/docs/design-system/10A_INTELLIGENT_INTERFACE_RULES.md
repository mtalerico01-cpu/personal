# 10A - Intelligent Interface Rules

Date created: 2026-07-02

These rules define how the interface prioritizes information. They should become reusable selectors/helpers, not one-off screen logic.

## Priority Inputs

Interface priority may depend on:

- Primary goal.
- Training experience.
- Current time of day.
- Current nutrition progress.
- Planned workout/cardio status.
- Recovery or safety state.
- Incomplete data.
- Behind/ahead of plan.
- Active workout state.
- User density preference.

## Priority Rules

### Daily Dashboard

- If there is an active workout, show current set/session controls above general KPIs.
- If no workout is planned, show the next useful action instead of an empty training card.
- If protein remaining is high and calories remain, elevate protein above carbs/fat.
- If calories are nearly exhausted but protein remains high, show a low-fat protein recommendation pattern.
- If safety level is restricted/caution, show safety context before aggressive targets.
- If data is missing, show the smallest next data action rather than blank metrics.

### Nutrition

- Beginner: explain macros in plain language and default to essential/standard density.
- Advanced: allow detailed macro distribution, meal timing, and historical adherence.
- If one macro is the dominant gap, sort it first and visually emphasize it.
- If all targets are close, show reassurance and avoid pushing unnecessary action.
- If manual targets are active, label them as user-provided.

### Training

- Beginner: show plain-language exercise patterns and fewer simultaneous progression metrics.
- Experienced/athlete: show volume, RIR/RPE, progression, and split context.
- During active workout: current exercise, current set, rest, and completion controls dominate.
- If equipment is limited, show substitutions directly in context.

### Cardio

- Endurance/cardio goals: cardio plan can outrank strength support metrics.
- Fat-loss/general-health goals: show cardio as supportive unless it is today's planned action.
- If user is behind on steps late in the day, show realistic remaining action, not guilt.

### Progress

- Do not show strong trend interpretation with insufficient data.
- Prefer rolling averages or confidence language for noisy metrics.
- Show trend and confidence before raw chart detail.
- Review periods should match goal type: short for adherence, longer for weight/body composition.

### Coach

- Coach insight should reference current plan state, not generic motivation.
- Proposed actions must preview what will change before confirmation.
- Avoid claiming certainty when data is sparse.

## Density Levels

| Density | Default Audience | Content |
|---|---|---|
| Essential | New, low cognitive load, large text | Current value, direction, simple explanation |
| Standard | Default | Current value, comparison, short trend, chart/target when relevant |
| Detailed | Advanced/data-driven | Full history, ranges, contributing factors, advanced metrics, export/deeper analysis |

## Implementation Direction

Create reusable selectors in a future Gate 2/3 slice:

- `getDailyPriority(context)`
- `getMetricPriority(metric, context)`
- `getNutritionPriority(context)`
- `getTrainingPriority(context)`
- `getChartDensity(context)`
- `getSafetyPriority(context)`

Feature screens should consume these helpers instead of duplicating priority logic.
