# 05 - Component Proposal

Date created: 2026-07-02  
Status: Proposed for Gates 2 and 3

## Component Library Goals

The component system should make correct design easier than incorrect design. Feature files should not need to decide raw color, arbitrary font size, spacing, card radius, chart frame, button state, or loading treatment.

## Core Components

| Component | Purpose | Required Variants/States | Implementation Path |
|---|---|---|---|
| `AppScreen` | Safe-area-aware screen shell | scroll/static, sticky action, compact/expanded | Replace/extend `Screen` |
| `ScreenHeader` | Screen title and optional summary/action | default, compact, detail | New shared component |
| `Section` | Semantic content group | open, bordered, inset | New shared component |
| `SectionHeader` | Section title/action | default, action, description | Extend current component |
| `Stack` / `Inline` | Layout primitives | spacing tokens only | New layout primitives |
| `ResponsiveColumns` | Tablet/web layout | one/two-pane | New layout primitive |
| `PrimaryButton` | Main action | default, pressed, loading, disabled | New button component |
| `SecondaryButton` | Secondary action | default, pressed, disabled | New button component |
| `TertiaryButton` | Low emphasis action | default, pressed, disabled | New button component |
| `IconButton` | Icon-only action | compact/default, selected, disabled | New button component |
| `TextField` | Text entry | focus, error, disabled, helper | New form primitive |
| `NumericField` | Numeric entry | unit, stepper, validation | New form primitive |
| `SelectionCard` | Large choice | selected, disabled, error | Replace local choice patterns |
| `ChoiceRow` | Compact option | selected, multiselect | New shared component |
| `SegmentedControl` | Peer mode switch | selected, disabled | Replace local tabs |
| `FilterChip` | Compact filter | selected, removable | New shared component |
| `Metric` | Semantic numeric value | hero, primary, supporting, secondary | New KPI primitive |
| `MetricCard` | Metric group | priority-aware | Replace `KPICard` after prototype |
| `ProgressBar` | Linear progress | target, over-target, partial | Replace macro/cardio progress bars |
| `StatusBadge` | State label | success, warning, error, info, neutral | Extend `Badge` |
| `CoachInsight` | Product-wide guidance | compact, expanded, action | Replace fragmented insight cards |
| `ActionPreview` | Confirmable action | proposed, confirmed, failed | Unify AI/Coach action cards |
| `ChartCard` | Chart + interpretation | loading, empty, insufficient, selected | New chart shell |
| `ChartTooltip` | Selected point details | tap/drag, screen-reader update | New chart utility |
| `EmptyState` | Missing data state | action/no action | New state component |
| `ErrorState` | Recoverable error | retry, continue editing | New state component |
| `LoadingState` | Skeleton/loading | shaped skeleton, inline loading | New state component |
| `BottomSheet` | Contextual surface | platform-specific behavior | New wrapper around RN/modal strategy |
| `ConfirmationSheet` | Destructive/confirm actions | confirm/cancel/destructive | New shared pattern |
| `ListRow` | Settings and data rows | icon, value, navigation, toggle | New shared component |

## Anti-Patterns

- Feature-local buttons with raw padding/color.
- Arbitrary metric text using `display*` without semantic role.
- Cards inside cards.
- Pill shapes for large panels.
- Placeholder-only form labels.
- Chart without interpretation and accessibility summary.
- Lime used on every icon or metric.
- Loading spinner as default for whole-screen refresh.

## Accessibility Defaults

Every interactive component must define:

- `accessibilityRole`
- `accessibilityLabel`
- `accessibilityHint` when outcome is not obvious
- `accessibilityState` for selected, disabled, expanded, busy
- Minimum 44x44 touch target
- Focus-visible style on web/keyboard contexts
