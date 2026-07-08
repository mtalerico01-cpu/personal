# Medical Escalation Rules

## Block Plan Activation

Block calorie/macro/training activation when a user indicates:

- under 18
- active eating disorder risk or unsafe weight-control behavior
- pregnancy/breastfeeding without clinician-guided targets
- medically prescribed diet that conflicts with app-generated targets
- symptoms or conditions that make exercise prescription unsafe without medical clearance
- extreme manual calorie targets outside safety bounds

## Conservative Plan With Warning

Allow a conservative plan only when the risk is non-urgent and the app can avoid medical prescription, such as:

- mild limitation with user-selected safe movements
- lower-confidence activity estimate
- faster requested pace reduced to a safer default
- not-sure answers where conservative assumptions are acceptable

## Required Output

Safety evaluation should return:

- level: `standard`, `caution`, or `restricted`
- reasons
- blocked actions
- warnings
- escalation message
- source references
- confidence
