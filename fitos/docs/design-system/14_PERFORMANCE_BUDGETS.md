# 14 - Performance Budgets

Date created: 2026-07-02

Performance is part of the design system. These are Gate 2+ targets and should be validated on realistic devices, not only a modern desktop browser.

## Budgets

| Area | Target | Measurement |
|---|---:|---|
| App startup | No meaningful regression after design-system bundle | Expo production export and device startup check |
| Screen transition response | Interaction acknowledged within 100ms | Manual device profiling |
| Button/press feedback | Visual feedback in same frame where possible | RN perf monitor/manual testing |
| Input response | No perceptible delay while typing | Manual test on mid-range Android/iPhone |
| List scrolling | 55-60 FPS on standard lists | RN perf monitor/device testing |
| Chart render | Initial chart under 50ms JS work for typical series | Profiler/manual instrumentation |
| Animation stability | 60 FPS target; no JS-driven heavy transitions | RN perf monitor |
| Image loading | No layout jumps; cached or sized assets | Visual review and network/device test |
| Design-system bundle impact | No unreviewed large chart/font/motion library | Expo Atlas |
| Memory for large lists/charts | No unbounded arrays rendered in ScrollView | Code review/profiling |
| Initial render complexity | First viewport avoids unnecessary hidden expensive charts | Code review/profiling |

## Avoid

- Excessive blur.
- Large transparent layers.
- Uncontrolled shadows.
- Continuous background animation.
- Oversized SVGs.
- Expensive chart animation.
- Multiple simultaneous gradients.
- Deeply nested wrappers.
- Animation on every metric.
- Large unoptimized images.

## Prefer

- Native-driver or UI-thread animation where supported.
- Memoized chart data.
- Virtualized lists.
- Cached/sized assets.
- Reduced motion support.
- Conditional rendering.
- Static rendering when animation adds little value.
- Progressive loading.
- Preserved content during refresh.

## Validation Plan

- Gate 3: measure representative Dashboard prototype.
- Gate 4: record render behavior per migrated core screen.
- Gate 5: record form/auth/onboarding keyboard and loading performance.
- Gate 6: run final performance audit and document optimizations.
