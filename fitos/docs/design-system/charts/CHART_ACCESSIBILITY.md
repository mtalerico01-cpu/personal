# Chart Accessibility

Date created: 2026-07-02

## Requirements

- Every chart has a visible text interpretation.
- Every chart has an accessibility label/summary.
- Important values are available outside the chart.
- Color is not the only signal.
- Selected point changes are announced when possible.
- Time range controls are reachable and labeled.
- Insufficient data states are explicit.
- Chart labels remain legible at large text or are replaced by summaries.

## Summary Template

`{Metric}. Current value {value}. {Trend} over {period}. {Comparison}. {Confidence}. {Next action if relevant}.`

Example:

`Body weight. Current value 203.4 lb. Down 1.2 lb over 14 days. Current pace remains within the planned range. Confidence medium because 8 entries are available.`

## Screen Reader Behavior

- Chart container role: image or adjustable only if interaction is supported accessibly.
- Selected point: expose date, value, and comparison.
- Range controls: standard buttons/segmented controls.
- Decorative grid lines: hidden from accessibility tree.
