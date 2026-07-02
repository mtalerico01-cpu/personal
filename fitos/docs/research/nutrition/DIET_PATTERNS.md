# Diet Patterns

## Implementation Rules

- Separate diet pattern from macro preference (`DIET-001`).
- Do not store `high_protein` or `low_carb` as diet styles.
- Diet patterns should describe food-pattern constraints or preferences, such as balanced, Mediterranean-style, vegetarian, vegan, pescatarian, halal, kosher, dairy-free, gluten-free, low-FODMAP-aware, culturally flexible, or custom.
- Macro preferences should describe nutrient emphasis, such as higher protein, lower carb, higher carb for endurance, lower fat preference, or custom macro targets.
- Custom diet pattern must collect structured notes and affected foods, not just a string label.

## Source Context

- `SRC-DGA-2020-2025` supports food-pattern framing and nutrient-dense diet quality.
- `SRC-NASEM-DRI-MACROS-2005` supports macro range context.
