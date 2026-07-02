# 06 - Layout and Responsiveness

Date created: 2026-07-02

## Layout Principle

Responsive design for Form Theory means changing composition, not scaling everything larger.

## Proposed Breakpoints

| Breakpoint | Width | Pattern |
|---|---:|---|
| Compact | `<600px` | Single column phone layout |
| Medium | `600-839px` | Single column with wider content, optional sticky/support sections |
| Expanded | `840px+` | Two-pane or main/supporting layout where useful |

## Screen Padding

- Compact: `space4` horizontal default.
- Medium: `space6` horizontal default with max content width.
- Expanded: centered content with main/supporting panes and max line length.

## Maximum Content Widths

- Reading-heavy content: 680px.
- Utility forms: 760px.
- Dashboard/metrics: 1040px across panes.
- Coach conversation: 760px for message column.

## Standard Screen Structure

1. Safe area.
2. Screen header or hero only when it answers the user's current context.
3. Daily priority / primary action.
4. Coach insight if relevant.
5. Primary data/controls.
6. Supporting sections.
7. Details and history.

## Tablet/Web Composition

- Dashboard: primary daily status left, supporting KPIs/right rail or lower grid.
- Nutrition: logging and remaining target left, meal list/details right on expanded widths.
- Training: today's workout left, generator/modifications right.
- Progress: interpretation and selected chart left, metric list/details right.
- Coach: conversation center with context/action rail on expanded screens.
- Profile/settings: grouped navigation left, selected detail right.

## Landscape

Landscape should not be blocked. For compact landscape, reduce hero height and keep controls reachable. For active workout, current set and controls should dominate.

## Keyboard Behavior

Forms and Coach composer must avoid keyboard overlap, preserve input context, and keep submit actions reachable.

## Safe Area Behavior

All global shells should account for status bars, tab bars, gesture bars, and web phone frame constraints. Avoid fixed viewport assumptions except demo frame code.
