# 07 - Data Visualization

Date created: 2026-07-02

## Principle

Charts are decision support, not decoration. Before adding or keeping a chart, answer: what should the user understand or decide after viewing this?

## Current Findings

- `ProgressMonitorCard` has a custom SVG line chart, but lacks a formal spec, accessibility summary, insufficient-data handling, and confidence rules.
- `WeightTrendCard` uses spark bars without axis/context or screen-reader summary.
- `MacroSummaryCard` uses a simplified ring that visually implies circular progress without a true arc.
- Macro bars and cardio bars are useful but need shared progress rules and non-color cues.

## Required Chart Hierarchy

1. Current value.
2. Trend.
3. Comparison period.
4. Interpretation.
5. Next action when relevant.
6. Chart.
7. Optional detail exploration.

## Chart Type Rules

- Line chart: weight trends, strength trends, running pace, long-term progress.
- Bar chart: workouts by week, volume comparison, calories by day, macro consistency.
- Area chart: cumulative or volume emphasis only.
- Donut/ring: one simple completion relationship only; avoid multiple rings for complex comparison.
- Progress bar: calories, macros, daily goals, completion.
- Heat map: consistency calendar only when pattern recognition is the user question.
- Avoid radar charts and pie charts unless a documented user question proves value.

## Chart Color Rules

- Lime: current/selected/primary target only.
- Neutral tones: historical/reference/previous periods.
- Semantic colors: warning/error only when state demands it.
- Color can never be the only indicator.

## Chart States

- Loading: skeleton shaped like final chart and interpretation.
- Empty: explain missing data and action.
- Insufficient data: show current value and explain that trend needs more history.
- Partial period: label clearly.
- Selected point: show value, date, comparison, and screen-reader announcement.
- Error: preserve previous chart if available and show recovery action.

See `charts/` for inventory, specifications, accessibility, and performance.
