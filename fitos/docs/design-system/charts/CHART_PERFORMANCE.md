# Chart Performance

Date created: 2026-07-02

## Budgets

- Typical mobile chart series: 7-120 points.
- Initial chart render: under 50ms JS work for typical series.
- No continuous chart animation by default.
- Point/path calculations memoized by data, width, and range.
- Avoid rerendering charts on unrelated store updates.

## Implementation Rules

- Precompute chart domain and points outside render when possible.
- Render only visible chart detail.
- Prefer simple SVG paths or native chart library only after bundle review.
- Avoid gradient-heavy, blur-heavy, or multi-series charts unless needed.
- Use static rendering when animation adds little value.
- Gate any new chart library with Expo Atlas bundle review.
