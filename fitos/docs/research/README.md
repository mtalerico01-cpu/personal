# Research Documentation

This folder is the evidence registry for Form Theory recommendation logic. Code that claims to be evidence-based should reference source IDs and rule IDs from these documents.

## Folder Map

- `SOURCES.md` - source registry with stable IDs.
- `RESEARCH_IMPLEMENTATION_MAP.md` - maps documented rules to intended code modules.
- `nutrition/` - energy, macro, diet-pattern, protein, carbohydrate, fat, and weight-change rationale.
- `training/` - resistance training, split, frequency, volume, experience, and cardio rationale.
- `onboarding/` - audit, decision logic, profile rationale, conditional flow, and validation matrix.
- `safety/` - safety boundaries and escalation rules.

## Evidence Rules

- Prefer government, national academy, professional society, consensus statement, systematic review, or peer-reviewed sources.
- Do not use influencers, supplement-company articles, forums, or generic SEO articles as primary support.
- If a product decision is not directly evidence-based, mark it as a product assumption and keep it separate from source-backed rules.
- Every implemented recommendation should return source references, assumptions, warnings, confidence, and a human-readable rationale.
