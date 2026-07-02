# Chart Specifications

Date created: 2026-07-02

## Weight Trend Chart

- User question: Is my body weight moving in the planned direction over a meaningful period?
- Type: Line chart with optional rolling average.
- Data source: Progress store/history.
- Time range: 14 days, 30 days, 90 days; default depends on data availability.
- Unit: lb or kg based on user preference.
- Primary value: current scale weight or 7-day average.
- Comparison: prior period and goal range.
- Target: goal weight or planned rate range when available.
- Annotation: plan review dates, manual target changes.
- Interaction: tap/drag selected point; no hover-only behavior.
- Empty state: prompt to log first weight.
- Insufficient-data state: show current value; explain trend needs more entries.
- Accessibility summary: current value, change, period, confidence, next action.
- Performance: memoize points; no continuous animation.

## Strength Trend Chart

- User question: Is training performance improving over time?
- Type: Line chart or bar comparison depending metric.
- Data source: training history and estimated strength score.
- Time range: 4 weeks, 12 weeks, 6 months.
- Unit: score, estimated 1RM, volume, or completed sessions.
- Primary value: selected lift/score.
- Comparison: previous period.
- Target: progression target when available.
- Empty state: complete workouts to build a trend.
- Accessibility summary: selected metric, change, period, interpretation.

## Nutrition Consistency Chart

- User question: How consistently am I hitting calorie/protein targets?
- Type: Bar chart or dot/target band.
- Data source: nutrition logs.
- Time range: 7 days, 14 days, 30 days.
- Unit: calories, grams, percent of target.
- Primary value: adherence rate or average remaining gap.
- Comparison: target band.
- Empty state: log meals to see consistency.
- Accessibility summary: days in range, average gap, main target remaining.

## Cardio Trend Chart

- User question: Is cardio volume/pace/zone work progressing as planned?
- Type: Line chart for pace/fitness, bar chart for weekly minutes.
- Data source: cardio sessions and integrations.
- Time range: 4 weeks, 12 weeks.
- Unit: minutes, miles/km, pace, zone minutes.
- Primary value: weekly minutes or selected performance metric.
- Comparison: prior period and plan target.
- Empty state: complete cardio sessions to build trend.
- Accessibility summary: current week, comparison, recommendation.
