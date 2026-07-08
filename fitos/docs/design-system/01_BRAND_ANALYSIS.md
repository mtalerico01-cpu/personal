# 01 - Brand Analysis

Date reviewed: 2026-07-02  
Primary source: `assets/Branding/Form Theory - Brand Sheet.png`  
Supporting sources: `assets/Branding/Form Theory Logo - Dark Mode.png`, `assets/Branding/Form Theory Logo - Light Mode.png`, `assets/Branding/BRAND_GUIDELINES.md`, `src/branding/visualSystem.ts`

## Brand Personality

Precise, athletic, minimal, intelligent, disciplined, premium, calm, evidence-aware.

## Logo Construction

The mark is a stacked angular "F" built from two white horizontal blades and one acid-lime lower stroke. The form leans forward, creating motion and athletic intent without becoming aggressive. The white elements carry most of the mark's mass; the lime element is smaller but more memorable because it interrupts the dark/white system with energy.

### Shape and Geometry

- Forward-leaning italic geometry.
- Rounded outside corners soften the otherwise technical shape.
- Wide negative space separates the three strokes clearly.
- The lower lime stroke aligns with the left diagonal rhythm and gives the mark direction.
- The mark is not symmetrical; its balance depends on motion and counterweight.

### Visual Weight

- White strokes dominate and preserve legibility on dark backgrounds.
- Lime is an accent, not an equal third stripe.
- At small sizes, the lime stroke remains the brand signal, but the top white strokes are needed to read as the Form Theory mark.

### Minimum Practical Display Size

- Keep the mark at 20px or larger.
- Use 24px for navigation if needed.
- Use 40px for Coach identity.
- Use 72px only for hero, onboarding, or empty-state brand moments.

### Dark Background Behavior

Use `Form Theory Logo - Dark Mode.png` on black, near-black, graphite, or image surfaces with enough contrast. Do not add glow. The sheet shows lime glow under the app icon as marketing art, not as a routine UI treatment.

### Light Background Behavior

Use `Form Theory Logo - Light Mode.png` on white or cool-white surfaces. The light-mode asset uses dark strokes with lime. Do not use the white dark-mode asset on light backgrounds.

## Color Language

Representative values from `src/branding/visualSystem.ts`:

| Role | Value | Notes |
|---|---:|---|
| Primary dark | `#0B0D10` | App background and brand field |
| Near black | `#101214` | Secondary dark field |
| Graphite | `#1A1D22` | Panels/cards |
| Raised graphite | `#22262B` | Elevated surfaces |
| Lime | `#A7FF00` | Active state, progress, Coach presence |
| Lime pressed | `#8FE000` | Pressed and light-theme core accent |
| Silver | `#D7D8E0` | Primary dark-theme text |
| White | `#F5F6F8` | High-contrast text |
| Cool white | `#F7F8F8` | Light-theme background |
| Muted gray | `#8D9299` | Secondary labels |

### Color Hierarchy Observed in Brand Sheet

1. Black/near-black field
2. White/off-white typography and mark
3. Graphite panels and dividers
4. Restrained lime emphasis
5. Muted gray labels/supporting text

### Lime Rule

Lime should mark currentness, action, focus, progress, or key intelligence. It should not be the default color for every icon, heading, border, chart line, or success state.

## Typography Language

The brand sheet explicitly shows Montserrat. The style is geometric, uppercase, tracked, strong, and modern. It feels athletic because of structure and spacing, not because of aggressive typography.

### Production Decision

The app currently uses platform-safe system fonts with Montserrat-like rhythm. Gate 2 should decide whether to load Montserrat through Expo fonts. If performance and rendering are acceptable, Montserrat should become the brand font for headings, labels, navigation, and metric numerals. If not, the system stack may remain with stricter letter spacing, weight, and role governance.

### Typography Implications

- Uppercase labels should be used sparingly for navigation, tags, and metric labels.
- Body text should not use heavy tracking.
- Metric values need a numeric hierarchy, not just large font sizes.
- The brand sheet's wordmark uses wide letter spacing, but app UI should not over-track paragraphs.

## Layout Language

The sheet shows compact, disciplined surfaces with clear vertical rhythm. It uses:

- Thin separators.
- Small dark panels.
- Compact metric cards.
- Controlled whitespace.
- Strong alignment.
- No decorative card nesting.
- No multi-color dashboard noise.

## Imagery Language

Brand imagery is athletic, realistic, dark, and high contrast. It shows adult athletes in performance contexts, not influencer-style posing. The framing is serious and directional. Imagery should be used sparingly in product UI and only where it clarifies training context or brand entry.

## What Not To Copy From The Sheet

- Marketing glow under the app icon should not become routine UI glow.
- Hero athlete photography should not appear on dense utility screens.
- The watch readiness ring is inspiration, not permission to create decorative rings everywhere.
- The tagline style should not become app body copy.

## Product Translation

Form Theory should feel branded even without the logo through:

- Dark graphite fields.
- Restrained lime action/focus points.
- Monospaced-feeling precision in metrics without using a coding font.
- Wide, disciplined labels.
- Clean chart interpretation.
- Calm, specific copy.
- Minimal ornament.
