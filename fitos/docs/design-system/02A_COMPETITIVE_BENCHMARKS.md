# 02A - Competitive Benchmarks

Date reviewed: 2026-07-02

This benchmark studies patterns across fitness, nutrition, health, wearable companion, finance, and productivity products. It does not treat screenshots as proof of effectiveness. Observations are based on public product pages, support documentation, and accessible task-flow descriptions.

## Benchmark Table

| Reference | Platform | Source | What It Does Well | What Not To Copy | Form Theory Implication |
|---|---|---|---|---|---|
| MyFitnessPal | iOS, Android, Web | https://www.myfitnesspal.com/ | Communicates food logging, calories, macros, steps, exercise, and meal planning as one daily system. Strong emphasis on fast logging and a huge food database. | Do not copy marketing-heavy claims, quiz redundancy, or generic calorie-counter framing. | Keep food logging fast and daily. Dashboard must prioritize the user's current actionable gap, not all metrics equally. |
| Cronometer | iOS, Android, Web | https://cronometer.com/ | Strong credibility around verified nutrition data, micronutrients, biometrics, and professional trust. Handles dense nutrition data as a strength. | Do not overwhelm broad users with 95 nutrients by default. Avoid clinical density as the default product feel. | Use progressive disclosure: macros and primary gaps first, micros/details behind an advanced layer. |
| MacroFactor | iOS, Android | https://macrofactor.com/ | Strong evidence-aware positioning and adaptive nutrition coaching. Presents nutrition and workouts as smarter systems, not isolated trackers. | Do not copy brand tone, illustrations, or app-specific coaching claims without matching implementation. | Form Theory should explain why a target changed and expose confidence/source context. |
| Apple Fitness / Activity | iOS, watchOS | https://support.apple.com/guide/watch/track-daily-activity-apd3bf6d85a6/watchos | Three-ring model makes daily progress instantly understandable. Trends compare recent 90 days to longer 365-day behavior and provide coaching when a metric declines. | Do not overuse rings for every metric or imply certainty without enough data. | Major progress views should combine current value, trend, comparison period, interpretation, and next action. |
| Apple Health / Medical ID | iOS | https://support.apple.com/guide/iphone/intro-to-health-iph08022b192/ios | Sensitive data is structured, practical, and surfaced only where relevant. Emergency/safety context has clear consequences. | Do not make sensitive health data feel like casual profile decoration. | Safety flags and medical constraints need calm, high-trust presentation and clear activation effects. |
| Fitbit Daily Readiness | iOS, Android, Wearables | https://store.google.com/us/magazine/fitbit_daily_readiness_score?hl=en-US | Converts sleep, activity, HRV, and recovery into simple readiness guidance and suggested intensity. Explains high vs low scores. | Do not create opaque scores without showing inputs and uncertainty. | Form Theory can use readiness-style hierarchy only if inputs, confidence, and next action are visible. |
| Strava | iOS, Android, Web | https://www.strava.com/features | Strong performance/progress framing: goals, comparisons, predictions, segments, routes, and AI insights. | Do not copy social competition or leaderboard emphasis; it may conflict with broad adult inclusivity. | Performance users need deeper trends and comparisons, but social pressure should not dominate the base product. |
| YNAB | iOS, Android, Web | https://www.ynab.com/features | Excellent financial data hierarchy: current budget state, goals, targets, reports, and progress all connect to decisions. | Do not copy playful voice or decorative illustrations. | Fitness data should behave like decision-support: what changed, what it means, what to do next. |
| Apple Stocks | iOS | https://support.apple.com/guide/iphone/check-stocks-iph1ac0b1bc/ios | Dense market data is layered: watchlist row, chart, time range controls, hold-to-inspect, details, and news. | Do not copy finance visual language directly. Avoid showing raw volatility without interpretation. | Progress charts need range selectors, tap/press detail, and contextual detail below the chart. |
| Todoist | iOS, Android, Web, Wearables | https://todoist.com/features | Balances simplicity and power through quick capture, Today view, filters, projects, and productivity trends. Features do not get in the way until needed. | Do not copy productivity metaphors or gamified Karma directly. | Progressive disclosure should let beginners use defaults while advanced users reveal filters, detail, and custom views. |

## Patterns Across Categories

### Hierarchy

Best-in-class products do not show all data equally. They select a current focus, then support it with detail.

Form Theory rule: each screen needs one primary user question and one dominant answer.

### Navigation

Successful products use predictable navigation and reserve deeper controls for detail views, filters, sheets, or tabbed subviews.

Form Theory rule: bottom navigation should represent major domains; filters/segments should not compete with global navigation.

### Dense Data

Cronometer and Apple Stocks show dense data only after the user opts into detail. Apple Fitness summarizes trends before showing history.

Form Theory rule: default density is standard. Essential and detailed modes should be contextual, not separate products.

### Charts

Strong chart products pair visualization with human-readable interpretation and range controls. Weak chart products rely on decoration.

Form Theory rule: every chart begins with a user question and an interpretation statement.

### Personalization

Fitbit and MacroFactor show the value of personalized guidance, but only when users understand what influenced the recommendation.

Form Theory rule: personalization must expose inputs, confidence, and source/rationale where relevant.

### Progress

Apple Fitness compares recent vs long-term behavior. YNAB ties progress to targets. Strava ties progress to performance goals.

Form Theory rule: progress should show direction, period, confidence, and next review, not just raw deltas.

### Empty States

Best empty states point to the next useful action. They do not simply say nothing exists.

Form Theory rule: empty states must answer what is missing, why it matters, and what action is available.

### Motion

Motion is mostly functional: preserving context, confirming actions, and making transitions legible.

Form Theory rule: no motion without a documented uncertainty-reduction or feedback reason.

## Product-Specific Lessons

### MyFitnessPal

- Learn: low-friction food logging and simple daily nutrition framing.
- Avoid: generic calorie-counter identity and broad marketing density.
- Implementation: Nutrition should put logging and remaining targets within immediate reach.

### Cronometer

- Learn: credibility comes from data provenance and detail depth.
- Avoid: micronutrient density by default.
- Implementation: add advanced nutrition detail as progressive disclosure after macro comprehension.

### MacroFactor

- Learn: adaptive coaching needs explanation and confidence.
- Avoid: adopting claims without matching engine traceability.
- Implementation: plan changes should include rules/source references where appropriate.

### Apple Fitness / Fitbit

- Learn: simple scores/rings work when tied to a clear action.
- Avoid: opaque scoring and decorative ring proliferation.
- Implementation: readiness/recovery UI must show inputs and uncertainty.

### Apple Stocks / YNAB

- Learn: data visualization is strongest when tied to decisions, ranges, and details on demand.
- Avoid: finance-style density on fitness screens.
- Implementation: charts need time range controls and interpretation hierarchy.

### Todoist

- Learn: simple default, powerful expansion.
- Avoid: productivity gamification as fitness motivation.
- Implementation: Form Theory should expose advanced training/nutrition detail without forcing it into the first viewport.
