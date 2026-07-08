# Form Theory — Brand Guidelines

> Back to project: [../../README.md](../../README.md) · [../../docs/APP_ARCHITECTURE.md](../../docs/APP_ARCHITECTURE.md)

These guidelines document the Form Theory brand system for developers and designers working on the application. They are based on the official brand sheet (`Form Theory - Brand Sheet.png`) and the visual token system implemented in `src/branding/visualSystem.ts`.

---

## 1. Brand Name

**Form Theory**

The official product name is **Form Theory** — two words, title case.

It is not:
- Form Fitness
- FitOS _(previous working name — retired)_
- Prime State _(considered but not chosen)_
- FormTheory (one word)
- form theory (lowercase)

---

## 2. Product Category

**AI fitness and nutrition coach**

or

**AI-guided fitness and nutrition platform**

Use these descriptions consistently in app copy, App Store listings, and marketing materials.

---

## 3. Brand Positioning

> A complete fitness system, guided by intelligence.

This is the primary positioning statement. Use it in hero contexts, App Store descriptions, and onboarding.

---

## 4. Brand Philosophy

> Every body has a theory. Progress comes from testing, learning, and adapting.

Use in secondary contexts: onboarding, about screens, marketing. Do not dilute by overusing.

---

## 5. Brand Essence

> Intelligent guidance for a stronger form.

Short-form positioning for constrained spaces.

---

## 6. Brand Attributes

Form Theory should feel:

| Attribute | Expression |
|---|---|
| Intelligent | Responses are specific, contextual, and evidence-aware |
| Precise | Metrics, numbers, and recommendations are exact |
| Adaptive | The system learns and adjusts to each user |
| Athletic | Visual language is performance-oriented, not wellness-spa |
| Premium | Refined surfaces, controlled use of accent colour |
| Modern | Current type, geometry, and layout conventions |
| Calm | Never urgent, never alarming without cause |
| Disciplined | Restrained use of colour, motion, and ornamentation |
| Clear | Every element has a purpose |
| Evidence-aware | The Coach cites reasons, not feelings |

---

## 7. Brand Voice

The Form Theory Coach voice is:

**Calm. Confident. Direct. Supportive. Practical. Specific. Nonjudgmental. Concise.**

### Good copy examples

> Protein is the main gap remaining today. A lean serving at dinner would bring you close to target.

> Your seven-day average is 202.8 lbs, and the weekly trend is in a healthy range. No adjustment is needed.

> Back + Biceps is ready for today. Your current recovery supports the full session.

### Bad copy — avoid excessive enthusiasm

> ❌ You're absolutely crushing it! Amazing work today, keep it up!

### Bad copy — avoid clinical/robotic language

> ❌ Optimization protocol initiated. Macronutrient recalibration in progress.

### Bad copy — avoid vague wellness language

> ❌ Listen to your body and find your balance.

### Bad copy — avoid generic motivation

> ❌ Every rep counts! Believe in yourself!

The Coach is specific, not motivational-poster generic. It speaks to facts, data, and concrete next steps.

---

## 8. Logo System

### Assets

| File | Description | Mode |
|---|---|---|
| `Form Theory Logo - Dark Mode.png` | White/lime mark on transparent background | Dark backgrounds |
| `Form Theory Logo - Light Mode.png` | Dark mark on transparent background | Light backgrounds |
| `Form Theory - Brand Sheet.png` | Reference only — visual brand system overview | Do not use in production UI |

### Mark Description

The Form Theory mark is a stacked angular "F" with two white horizontal blades and one acid-lime lower stroke. The geometry is italic (forward-leaning), rounded at select outside corners, built from generous negative space.

### Logo Sizes (from `src/branding/visualSystem.ts`)

| Token | Size | Use |
|---|---|---|
| `compact` | 20px | Dense or constrained layouts |
| `navigation` | 24px | Tab bar or navigation bar if needed |
| `standard` | 40px | Coach top bar identity |
| `hero` | 72px | Coach empty state, onboarding |

### Approved Uses

- **Coach top bar header** — 40px, positioned in the identity row alongside the Coach name
- **Coach empty/welcome state** — 72px, centred above the greeting
- These are the only approved in-app placements currently

### Clear Space

Maintain clear space around the mark equivalent to approximately half the mark's height. Do not crowd it with text, borders, or other icons.

### Minimum Size

Do not use the mark below 20px. At that size it becomes illegible.

### Background Use

| Background | Asset to use |
|---|---|
| Dark (black, graphite) | `Form Theory Logo - Dark Mode.png` |
| Light (white, cool white) | `Form Theory Logo - Light Mode.png` |

Do not use the dark-mode asset on light backgrounds or vice versa.

### Aspect Ratio

Always preserve the mark's aspect ratio. Use `resizeMode="contain"` in React Native Image components.

---

## 9. Logo Misuse

Do not:
- Stretch or squash the mark
- Rotate the mark
- Recolor individual elements of the mark
- Add glow, drop shadow, or gradient effects to the mark
- Place the mark inside arbitrary shapes (circles, squares, frames)
- Modify or redraw the geometry
- Distort proportions at any scale
- Use on very low-contrast backgrounds
- Pair the Form Theory mark with another competing logo at the same visual weight
- Use the brand sheet image in production UI

---

## 10. Color Palette

Defined in `src/branding/visualSystem.ts` as `formTheoryPalette`.

### Core Palette

| Token | Hex | Role |
|---|---|---|
| `black` | `#0B0D10` | Primary app background (dark) |
| `nearBlack` | `#101214` | Slightly elevated background |
| `graphite` | `#1A1D22` | Card surfaces, panels |
| `graphiteRaised` | `#22262B` | Elevated cards, modals |
| `lime` | `#A7FF00` | Brand accent — active states, progress, Coach presence |
| `limePressed` | `#8FE000` | Lime pressed/active state, also used as `core` on light theme |
| `silver` | `#D7D8E0` | Primary text on dark backgrounds |
| `white` | `#F5F6F8` | High-contrast text, light backgrounds |
| `coolWhite` | `#F7F8F8` | Light mode app background |
| `coolGray` | `#E5E7EA` | Light mode surface |
| `mutedGray` | `#8D9299` | Muted text, secondary labels |
| `darkText` | `#15181D` | Primary text on light backgrounds |
| `warning` | `#D8A84F` | Warning states |
| `error` | `#E06464` | Error states |
| `information` | `#AEB6C1` | Informational |

### Semantic Colours

| Use | Dark Theme | Light Theme |
|---|---|---|
| Background primary | `#0B0D10` | `#F7F8F8` |
| Surface default | graphite | coolGray |
| Surface elevated | graphiteRaised | white |
| Text primary | silver → white | darkText |
| Text secondary | mutedGray | mutedGray |
| Brand accent (Coach) | lime `#A7FF00` | limePressed `#8FE000` |
| Border default | ~`#2A2D32` | ~`#D4D6D9` |

For exact values, see `src/shared/theme/colors.ts`.

---

## 11. Accent Usage (Lime)

Lime is a precious accent colour. Its power comes from restraint.

### Use lime for:

- Active or selected states (selected tab, selected option, active metric)
- Progress bars and trend indicators
- Primary action buttons ("Confirm", "Start")
- Coach-presence elements (Coach insight left border, thin rules)
- Key data points that signal success or achievement
- Active Coach components

### Do not use lime for:

- Every icon
- Every card border
- Every number or metric
- Every success state (use semantic green where appropriate)
- Large decorative background fills
- Text at small sizes (contrast concern on dark surfaces at small scale)

---

## 12. Typography

### Font Family

The brand sheet uses a **Montserrat-like geometric sans-serif** — specifically, bold uppercase with extended tracking and squared rhythm. The exact brand-sheet typeface is not bundled in the current app.

**Current implementation:** Platform-safe system fonts with Montserrat-style styling applied through the typography scale. This means San Francisco on iOS, Roboto on Android, and the system sans-serif on web.

When a web font is added, use **Montserrat** (Google Fonts) as the closest match to the brand sheet.

### Typography Scale (from `src/shared/theme/typography.ts`)

| Token | Use |
|---|---|
| `displayLarge` | Hero numbers, large metrics |
| `displayMedium` | Featured stats |
| `headingLarge` | Screen titles, Coach greeting |
| `headingMedium` | Card headings |
| `headingSmall` | Section labels, badge text |
| `bodyLarge` | Primary reading text |
| `bodyMedium` | Standard UI copy |
| `bodySmall` | Supporting text |
| `labelLarge` | Uppercase button labels, Coach name |
| `labelMedium` | Uppercase UI labels, preference tags |
| `caption` | Metadata, timestamps, secondary descriptors |
| `metric` | Numeric data display |
| `metricLarge` | Featured numeric data |

### Conventions

- **Uppercase with tracking:** Use for section labels, button text, tab labels, KPI labels, Coach name.
- **Sentence case:** Use for body copy, Coach messages, insight text, descriptors.
- **No negative letter-spacing:** Tracking is either 0 or positive.
- **Bold display weights:** `headingLarge` and `displayLarge` use weight 700+.

---

## 13. Visual Language

### Themes

| Preference | Background | Surfaces | Text | Accent |
|---|---|---|---|---|
| Dark | Near-black | Graphite/raised graphite | Silver/white | Lime `#A7FF00` |
| Light | Cool white | Cool gray/white | Dark text | Lime pressed `#8FE000` |
| System | Follows device setting | — | — | — |

### Surface Hierarchy

Dark mode layers from bottom to top:
1. Background: `#0B0D10`
2. Default surface (cards): graphite `#1A1D22`
3. Elevated surface (modals, floating panels): graphiteRaised `#22262B`

### Spacing

Defined in `src/shared/theme/spacing.ts` and `formTheoryRadii`:

| Token | Value |
|---|---|
| `sm` radius | 6px |
| `md` radius | 10px |
| `lg` radius | 14px |
| `xl` radius | 18px |
| `panel` radius | 24px |
| `pill` radius | 9999px |

### Borders

Use thin 1px borders in muted tones. Borders define edges without adding visual weight.

### Shadows

Keep shadows minimal and subtle. Do not use large glowing shadows. The surface hierarchy does the separation work.

### Iconography

Use consistent icon sizing via `formTheoryIconSizes`:

| Token | Value |
|---|---|
| `tab` | 22px |
| `action` | 20px |
| `mark` | 24px |
| `hero` | 72px |

### Charts

- Use lime for selected or active data series.
- Use muted tones for inactive series.
- Keep chart backgrounds flush with card surface colour.
- Gridlines should be barely visible — they guide the eye, not dominate it.

---

## 14. Coach Identity

- **Form Theory is the intelligence.** The Coach is not a fictional character.
- **There are no named primary personas.** Cedric and Elara are retired historical personas — do not reintroduce them.
- **"Coach"** is the short interface label (e.g., "Coach insight", "Ask Coach").
- **"Form Theory Coach"** is the full identity displayed in the Coach top bar.
- **Coaching styles affect tone only.** The underlying facts, calculations, and safety boundaries are unchanged regardless of style.

---

## 15. Coaching Styles

Three coaching styles are available. They change the Coach's language, not its conclusions.

### Direct

> Concise, analytical, and action-focused.

**Example response:**
> 46g protein remaining. A lean protein source at dinner closes it. No meal timing adjustment needed.

### Balanced

> Clear, practical, and supportive.

**Example response:**
> You have 46g of protein left to reach your target today. A protein-forward dinner would bring you close — chicken, fish, or eggs would work well.

### Encouraging

> Warm, reassuring, and habit-focused.

**Example response:**
> You're really close on protein — just 46g to go. A satisfying dinner with a good protein source will get you there. You've been consistent this week, so this is an easy finish.

All three responses contain the same fact: 46g protein remaining. The style affects warmth, length, and framing — not the number.

---

## 16. Appearance

Three appearance options:

| Option | Behaviour |
|---|---|
| Dark | Always use dark theme |
| Light | Always use light theme |
| System | Follow the device's system setting |

Appearance preference is stored independently from coaching style. A user choosing "Encouraging" style and "Light" appearance is fully valid.

---

## 17. Photography and Imagery

Based on the brand sheet:

- **Athletic and human** — real movement, real bodies, controlled performance contexts.
- **High contrast** — dark backgrounds preferred, strong directional light.
- **Realistic** — not glamorised stock photography, not wellness-spa softness.
- **Performance-oriented** — weightlifting, running, deliberate effort. Not leisure or passive relaxation.

Avoid:
- Overly saturated or filtered imagery
- Generic wellness stock (white backgrounds, yoga poses for unrelated contexts)
- Imagery that feels clinical or medical

---

## 18. Motion

Defined in `formTheoryMotion`:

| Token | Value | Use |
|---|---|---|
| `fast` | 140ms | Button state changes, micro-interactions |
| `standard` | 220ms | Screen transitions, panel reveal |
| `deliberate` | 360ms | Larger layout changes, onboarding steps |
| `ambient` | 5000ms | Background ambient animation |

### Motion Principles

- **Subtle.** Motion should support, not distract.
- **Deliberate.** Every animation has a reason.
- **Controlled.** Timing is consistent and predictable.
- **Responsive.** Interactions feel immediate even if transitions are staged.
- **Low distraction.** The user's attention should remain on the content.

Avoid:
- Chaotic particle systems or confetti
- Excessive spring/bounce on standard UI elements
- Constant ambient glow or pulse on non-ambient elements
- Gaming-style visual effects (explosions, trails)
- Motion that cannot be disabled for accessibility

---

## 19. UI Component Examples

### Primary Button

- Background: lime `#A7FF00`
- Text: dark text `#15181D`, uppercase, tracked
- Radius: `pill` (9999px) or `lg` (14px) depending on context
- No glow or shadow

### Secondary Button / Outlined

- Background: transparent or translucent surface
- Border: muted default border
- Text: secondary text colour, uppercase, tracked
- Same radius as primary

### Selected State

- Use lime as background tint or left/bottom border accent
- Text: brand lime or high-contrast on lime fill
- Do not use full lime fill on large containers

### Cards

- Background: graphite `#1A1D22`
- Radius: `md` (10px) to `panel` (24px) depending on context
- Border: 1px muted border
- No heavy drop shadow

### Metrics / Numbers

- Font: `metricLarge` or `metric` token
- Colour: text primary (silver/white on dark)
- Unit labels: `caption` size, muted colour

### Coach Insight Strip

- Left border: 2px solid lime
- Background: slightly raised surface
- Label: "COACH INSIGHT" uppercase tracked, muted colour

### Empty States

- Centred layout
- Mark logo at `hero` size (72px)
- Greeting or explanation at `headingLarge`
- Supporting text at `bodyLarge`, centred, max-width capped

### Loading States

- Use subtle skeleton or loading indicator consistent with card surface
- Do not use full-screen blocking overlays for routine data loads

---

## 20. Asset Inventory

All assets in `assets/Branding/`:

| File | Purpose | Use |
|---|---|---|
| `Form Theory - Brand Sheet.png` | Reference overview of the Form Theory brand system | Reference only — do not use in production UI |
| `Form Theory Logo - Dark Mode.png` | Official mark — white/lime on transparent | Dark theme: Coach top bar (40px), Coach empty state (72px) |
| `Form Theory Logo - Light Mode.png` | Official mark — dark on transparent | Light theme: Coach top bar (40px), Coach empty state (72px) |
| `Cedric.png` | Historical — Cedric persona portrait | Not in use — retained as historical record |
| `Cedric 2.png` | Historical — Cedric persona portrait variant | Not in use — retained as historical record |
| `Elara.png` | Historical — Elara persona portrait | Not in use — retained as historical record |
| `Elara 2.png` | Historical — Elara persona portrait variant | Not in use — retained as historical record |

The Cedric and Elara image files are not referenced anywhere in the current application code. They may be removed in a future cleanup pass.

The brand sheet is registered in `src/branding/assets.ts` as `brandAssets.brandSheet` for developer reference, but is not rendered in the production UI.

---

_Last updated: 2026-06-29_
