# 06A - Platform Behavior Rules

Date created: 2026-07-02

## Principle

Form Theory should share one visual identity across iOS and Android while respecting platform behavior expectations.

## Platform-Specific Exceptions

| Area | Shared Product Intention | iOS Behavior | Android Behavior | Reason | Implementation Path |
|---|---|---|---|---|---|
| Back navigation | Preserve context and avoid accidental data loss | Use visible back affordance where stack depth is not obvious; gestures should work naturally | Support system back and predictive-back expectations; back dismisses transient surfaces before navigation | Platform users expect different back mechanics | Centralize in navigation helpers and sheet/modal wrappers |
| Bottom navigation | Major domains remain easy to reach | Safe-area-aware tab bar with comfortable bottom inset | Shorter bar with Android gesture area respected | Ergonomics and system UI differ | Tokenize tab height/insets per platform |
| Sheets | Contextual tasks preserve screen context | Use rounded bottom/modal sheets with grab affordance where appropriate | Back dismisses sheet; sheet behavior should match Material expectations | Android back is system-level behavior | Build shared `BottomSheet` API with platform handlers |
| Modals | Interrupt only when necessary | Use modal for focused tasks; avoid full-screen unless needed | Use modal/sheet based on task gravity and back behavior | Modal meaning differs by platform | Document per component |
| Date/time pickers | Native input confidence | Prefer native iOS picker/sheet behavior | Prefer Android native picker behavior | Native controls reduce cognitive load | Wrap picker selection behind shared API |
| Keyboard | Inputs remain visible and actions reachable | Keyboard avoiding should preserve field and sticky action | Respect resize/pan behavior and back-to-dismiss keyboard | Keyboard behavior differs by OS | Central form shell handles keyboard |
| Haptics | Confirm meaningful actions subtly | Light haptic on selection/confirmation if enabled | Android haptic only where expected and supported | Haptics can feel platform-specific | Tokenize haptic intents; respect settings |
| Switches | Binary state is unmistakable | Native-like iOS switch behavior | Native-like Android switch behavior | Users recognize platform controls | Use shared wrapper, platform visuals where needed |
| Menus | Option sets are discoverable | iOS action menu/sheet pattern | Android menu/sheet pattern | Platform expectations differ | Shared menu API, platform presentation |
| Safe areas | Content never conflicts with system UI | Respect notch/home indicator/status bar | Respect status/navigation/gesture bars | Device chrome differs | App shell tokens |
| Text scaling | Content remains usable | Test Dynamic Type | Test Android font scale | Broad adult audience needs scaling | Gate tests at large text |
| Focus | Keyboard/screen-reader order is logical | VoiceOver order follows visual meaning | TalkBack order follows visual meaning | Accessibility semantics differ but goal same | Component accessibility contracts |
| Permissions | Requests are contextual and explain why | Pre-permission explanation when helpful | Pre-permission explanation when helpful | Trust and privacy | Shared permission pattern |
| Destructive actions | Prevent accidental loss | Confirmation sheet/dialog, clear language | Confirmation sheet/dialog, back-safe | Data loss is high risk | Shared confirmation component |
| Loading/progress | Preserve context | Skeletons and inline refresh | Skeletons and inline refresh | Same product intention | Shared loading states |
| Edge-to-edge | Brand field feels native | Use safe areas; avoid hidden content | Support edge-to-edge and gesture bars | Android modern layout expectation | App shell testing |

## Required Verification

- iOS simulator/device: back, sheets, keyboard, safe areas, VoiceOver, large text.
- Android emulator/device: system back, predictive-back where available, keyboard, gesture nav, TalkBack, font scale, foldable/tablet width.
