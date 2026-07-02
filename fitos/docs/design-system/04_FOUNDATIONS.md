# 04 - Foundations Proposal

Date created: 2026-07-02  
Status: Proposed for Gate 2 implementation

## Proposed Implementation Structure

```text
src/design-system/
  foundations/
  tokens/
    colors.ts
    typography.ts
    spacing.ts
    radius.ts
    borders.ts
    shadows.ts
    icons.ts
    controls.ts
    charts.ts
    motion.ts
    layout.ts
    index.ts
  themes/
  typography/
  components/
  charts/
  motion/
  accessibility/
  utilities/
  index.ts
```

Gate 2 should migrate or wrap the existing `src/shared/theme` rather than creating two competing systems. Until migration, existing theme files remain the active implementation.

## Token Requirements

### Color

Use semantic tokens only in feature screens. Raw palette values should live only in token files.

Required semantic groups:

- `backgroundPrimary`
- `backgroundSecondary`
- `surfacePrimary`
- `surfaceSecondary`
- `surfaceElevated`
- `surfaceInteractive`
- `surfaceSelected`
- `textPrimary`
- `textSecondary`
- `textMuted`
- `textDisabled`
- `textInverse`
- `borderSubtle`
- `borderDefault`
- `borderStrong`
- `borderFocus`
- `borderError`
- `brandPrimary`
- `brandPressed`
- `brandMuted`
- `success`
- `warning`
- `error`
- `information`
- `chartPrimary`
- `chartSecondary`
- `chartMuted`
- `chartReference`

### Typography

Required roles:

- `displayLarge`
- `displayMedium`
- `screenTitle`
- `sectionTitle`
- `subsectionTitle`
- `cardTitle`
- `bodyLarge`
- `body`
- `bodySmall`
- `labelLarge`
- `label`
- `caption`
- `button`
- `metricHero`
- `metricLarge`
- `metricMedium`
- `metricSmall`
- `metricLabel`
- `chartLabel`
- `navigationLabel`

Each role must define family, size, weight, line height, letter spacing, transform, and usage.

### Spacing

Keep the current 4px base but rename to semantic aliases:

- `space0: 0`
- `space1: 4`
- `space2: 8`
- `space3: 12`
- `space4: 16`
- `space5: 20`
- `space6: 24`
- `space8: 32`
- `space10: 40`
- `space12: 48`
- `space16: 64`

Feature files should not use arbitrary spacing except inside chart math or carefully documented platform fixes.

### Radius

Proposed scale:

- `radiusXs: 4`
- `radiusSm: 6`
- `radiusMd: 10`
- `radiusLg: 14`
- `radiusXl: 18`
- `radiusPanel: 24`
- `radiusPill: 9999`

Rules:

- Cards default to `radiusLg` or `radiusXl`, not always panel radius.
- Pill shapes only for chips, filters, compact selectors, segmented controls, and status badges.
- Avoid card-in-card nesting.

### Surface System

Required surfaces:

- Open section
- Bordered section
- Elevated card
- Interactive card
- Selected card
- Inset group
- Data panel
- Modal surface

Cards should group related content, not serve as the default wrapper for every row.

### Motion

Proposed tokens:

- `instant: 80ms`
- `fast: 140ms`
- `standard: 220ms`
- `deliberate: 360ms`
- `ambient: 5000ms`

All motion must define trigger, response, timing, accessibility behavior, reduced-motion behavior, and failure behavior.

### Layout

Proposed breakpoints:

- Compact: `< 600px`
- Medium: `600-839px`
- Expanded: `840px+`

Phone remains one column. Tablet/web should use main/supporting panes where useful.

## Gate 2 Tasks

1. Create token files under `src/design-system/tokens`.
2. Map current `src/shared/theme` tokens to new semantic tokens.
3. Add type-safe exports and deprecate compatibility aliases.
4. Add token resolution tests for dark/light modes.
5. Document migration exceptions in `12_DECISION_LOG.md`.
