# Conditional Flow Map

## Required Branches

| Trigger | Flow behavior | Plan behavior |
| --- | --- | --- |
| Safety risk: under 18, pregnancy, breastfeeding, eating disorder risk, clinician diet, severe injury | Show safety/clinician guidance and avoid activating aggressive targets | Block or conservative plan depending on risk |
| Primary goal: fat loss | Ask pace, body data, activity, training availability, nutrition preferences | Generate conservative deficit with review date |
| Primary goal: muscle gain | Ask training experience, schedule, equipment, nutrition appetite/preference | Generate modest surplus or maintenance-plus plan |
| Primary goal: endurance/cardio | Ask cardio history, current weekly volume, event/sport, injury constraints | Generate cardio-forward plan and carbs-aware macros |
| Primary goal: mobility/healthy aging | Ask limitations, mobility focus, activity tolerance | Generate conservative strength/cardio/mobility plan |
| User selects custom split | Immediately configure days, focus, rest days, equipment | Validate and build structured schedule |
| User selects manual targets | Ask calories/macros with validation and explanation | Preserve as user override when safe |
| User is not sure | Store uncertainty, use conservative default, lower confidence | Explain assumption and ask for later review |
