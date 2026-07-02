# Onboarding Decision Logic

## Required Architecture

Onboarding should use a flow engine where every step declares:

- `id`
- `section`
- `required`
- `shouldShow(answers, context)`
- `validate(answers, context)`
- `nextStep(answers, context)` when branching is needed
- `produces` fields

## Decision Rules

- Ask only for data needed to estimate, personalize, or safely avoid a recommendation.
- Use `not_sure` as an explicit answer that lowers confidence or selects a conservative default.
- `custom` should immediately open structured configuration and validation.
- Safety escalation should interrupt plan generation before calorie/macro/training targets are activated.
- Manual targets should be possible, but must be validated and labeled as user overrides.
