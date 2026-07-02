# 09 - Accessibility Baseline

Date created: 2026-07-02

## Standard

Form Theory should exceed minimum compliance where practical. It must be comfortable for users with different eyesight, dexterity, cognitive load tolerance, and assistive technology needs.

## Current Risks

- Chart components lack text summaries and selected-value announcements.
- Many custom touch components do not visibly define accessibility role/state/hint.
- Large text behavior is not documented across major screens.
- Some small labels use uppercase and high tracking, which can reduce readability.
- Color is used for trend/status in several places without redundant indicators.
- Focus order for Coach messages/action cards and onboarding choices needs verification.
- Empty/loading/error state accessibility is inconsistent.

## Design Requirements

- Text contrast: WCAG AA minimum 4.5:1 for normal text.
- Non-text contrast: 3:1 for meaningful controls and graphical objects.
- Touch targets: 44x44 minimum for primary controls; 48x48 preferred for active workout and high-frequency actions.
- Charts: provide visible interpretation and screen-reader summary.
- Dynamic type: no critical content disappears or overlaps at large text settings.
- Motion: all nonessential motion respects reduced motion.
- Inputs: visible labels, validation text, correct keyboard type, accessible error state.
- Status changes: use accessible announcements where possible.

## Assistive Technology Scope

- VoiceOver on iOS.
- TalkBack on Android.
- Keyboard/focus on web and hardware keyboard contexts.
- Switch/Voice Control principles for large targets and clear labels.

## Gate Requirements

- Gate 3 representative screen must be reviewed at large text, reduced motion, dark/light, compact phone, large phone, and tablet/web width.
- Gate 4/5 migrations must add accessibility notes per screen to `DESIGN_REVIEW_MATRIX.md`.
