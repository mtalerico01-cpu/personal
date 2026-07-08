# Chart Inventory

Date created: 2026-07-02

| Chart/Visualization | Location | User Question | Current Type | Current Issues | Proposed Direction |
|---|---|---|---|---|---|
| Progress monitor weight/strength/waist | `ProgressMonitorCard` | Am I moving in the intended direction? | SVG line/area chart | No formal spec, limited accessibility, no insufficient-data state, one chart shell for different metrics | `ChartCard` with interpretation, range, confidence, accessible summary |
| Weight sparkline | `WeightTrendCard` | How has weight moved recently? | Bar sparkline | No axis, no text alternative, unclear period | Replace with chart spec or remove if redundant |
| Calories ring | `MacroSummaryCard` | How much of today's calorie target is used? | Simulated circular ring | Opacity-based arc is visually imprecise | Use linear progress or true accessible single-ring if justified |
| Macro bars | `MacroProgressBar` | How much protein/carbs/fat remains? | Linear progress bars | Equal priority, color-only differentiation | Shared progress component with priority and labels |
| Cardio minutes/steps bars | `CardioSummaryCard` | Am I on track for cardio/steps? | Linear progress bars | Local styling, no shared state rules | Shared progress component with context labels |
| Dashboard KPI mini progress | `KPICard` | How close am I to target? | Thin progress bar | Same treatment for all KPIs | Priority-aware MetricCard progress |
