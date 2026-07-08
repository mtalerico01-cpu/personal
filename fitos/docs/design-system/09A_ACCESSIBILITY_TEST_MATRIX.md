# 09A - Accessibility Test Matrix

Date created: 2026-07-02

| Area | Test | Status | Notes |
|---|---|---|---|
| Text contrast | Check dark/light primary, secondary, muted, disabled text | Not started | Use token contrast tests in Gate 2 |
| Non-text contrast | Borders, progress fills, focus rings, chart lines | Not started | WCAG 1.4.11 target 3:1 |
| Large text | Welcome, onboarding, dashboard, nutrition, training, progress, coach | Not started | Test at iOS Larger Text and Android font scale |
| VoiceOver | Navigation, Coach, Dashboard, Nutrition, Progress charts | Not started | Verify reading order and labels |
| TalkBack | Navigation, Coach, Dashboard, Nutrition, Progress charts | Not started | Verify Android traversal and state |
| Focus order | Web/keyboard tabs and forms | Not started | Particularly login/onboarding/Coach composer |
| Touch targets | Buttons, nav tabs, chips, chart points, workout controls | Not started | 44x44 minimum |
| Reduced motion | Selection, charts, plan generation, Coach thinking | Not started | Replace spatial movement with instant/opacity |
| Color vision | Trends, macro colors, success/error/warning states | Not started | Add non-color indicators |
| Chart alternatives | Weight, strength, body, macros, cardio | Not started | Text summary required before chart |
| Error recovery | Login, meal logging, plan activation, workout save | Not started | Error text plus recovery action |
| One-handed use | Primary actions and active workout controls | Not started | Test compact phone reachability |
| Landscape | Active workout, Coach, onboarding forms | Not started | Do not block unless essential |
| Screen reader status | Loading, optimistic updates, action confirmation | Not started | Use polite announcements where possible |
