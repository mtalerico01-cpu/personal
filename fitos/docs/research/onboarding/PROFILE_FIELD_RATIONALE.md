# Profile Field Rationale

## Field Categories

- User-stated facts: values directly provided by the user.
- User preferences: preferred style, schedule, diet pattern, coaching tone, units.
- Constraints: allergies, restrictions, injuries, equipment, time, medical/safety limits.
- Inferred assumptions: estimated activity, maintenance, training tolerance, confidence.
- Recommendations: calorie target, macro targets, training plan, cardio plan, step target.

## Required Metadata

Inferred assumptions and recommendations should carry:

- `value`
- `source` (`user_stated`, `calculated`, `recommended`, `assumed`, `user_override`)
- `confidence`
- `updatedAt`
- `sourceReferences`
- `rationale`

## Product Rule

User-stated facts should not be overwritten by planner assumptions. Planner assumptions should be replaceable when the user provides better data.
