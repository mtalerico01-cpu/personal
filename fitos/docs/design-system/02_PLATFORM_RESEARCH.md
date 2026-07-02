# 02 - Platform Research

Date reviewed: 2026-07-02

This document summarizes current official guidance that should govern the Form Theory design system. It does not copy platform UI wholesale; it extracts constraints and implementation implications for a React Native / Expo product.

## Sources Reviewed

| Source | Organization | Topic | Practical Conclusion | Form Theory Impact | URL |
|---|---|---|---|---|---|
| Human Interface Guidelines | Apple | iOS design foundations, layout, color, typography, components | iOS should feel clear, direct, and respectful of system conventions | Use native-feeling navigation, sheets, text scaling, safe areas, and predictable gestures | https://developer.apple.com/design/human-interface-guidelines |
| Accessibility | Apple | VoiceOver, Voice Control, Switch Control, larger text, accessibility testing | Accessibility should be designed and tested as a primary experience | Add VoiceOver labels, focus order, large-text checks, and assistive-tech testing to gates | https://developer.apple.com/accessibility/ |
| Material Design 3 | Google | Design system foundations, components, tokens | Material is an adaptable system, not a visual trend kit | Use Android-native behavior and adaptive layout patterns without adopting Material's visual identity | https://m3.material.io/ |
| Android Adaptive Apps | Android Developers | Window size classes, panes, foldables, large screens | Adaptive apps should change composition, not merely scale UI | Define compact, medium, expanded layouts for phones/tablets/web | https://developer.android.com/develop/ui/compose/layouts/adaptive |
| Android Compose Accessibility | Android Developers | Semantics, scalable content, traversal order, testing | Meaning and state must be available to assistive technologies | Custom RN components need accessibility role, state, label, and hint rules | https://developer.android.com/develop/ui/compose/accessibility |
| Material Gestures | Material Design | Tap, scroll, swipe, predictive back, drag | Gestures must respond in real time and remain predictable | Avoid hidden gestures; support Android predictive-back expectations where possible | https://m3.material.io/foundations/interaction/gestures |
| Material Motion | Material Design | Motion schemes, spring tokens, spatial/effects motion | Motion should be tokenized and consistent | Define subtle Form Theory motion tokens; avoid ornamental animation | https://m3.material.io/styles/motion/overview |
| WCAG 2.2 Quick Reference | W3C | Contrast, reflow, target size, focus, labels, status messages | Important info cannot depend on color alone; focus and text alternatives are required | Enforce chart summaries, 4.5:1 text contrast, 3:1 non-text contrast, target-size checks | https://www.w3.org/WAI/WCAG22/quickref/ |
| React Native Performance | Meta | JS/UI frames, lists, animations, touch responsiveness | 60 FPS requires <=16.67ms frame work; JS thread can block touches | Performance budget must limit expensive charts, gradients, shadows, rerenders | https://reactnative.dev/docs/performance |
| Expo Bundle Analysis | Expo | Atlas, production bundle analysis, Lighthouse | Bundle size affects startup and web performance | Gate 3+ should measure bundle impact before adding chart/font/motion libraries | https://docs.expo.dev/guides/analyzing-bundles/ |

## Platform Conclusions

### Navigation

- iOS: preserve expected back affordances, safe-area spacing, and modal/sheet conventions.
- Android: respect system back and predictive-back expectations; avoid custom gestures that conflict with platform navigation.
- Form Theory: keep one brand navigation style, but allow platform-specific behavior under a shared component API.

### Modals and Sheets

- iOS users expect sheets and modals to preserve context and dismiss predictably.
- Android users expect back to dismiss transient surfaces before leaving a screen.
- Form Theory sheets must define dismiss behavior, focus management, reduced motion, and state restoration.

### Touch Targets

- WCAG 2.2 minimum target: 24x24 CSS px with spacing exceptions.
- WCAG enhanced target: 44x44.
- Practical Form Theory target: 44x44 minimum for primary touch controls; 48x48 preferred for high-frequency controls and active workout buttons.

### Typography and Dynamic Type

- Text must scale without hiding critical information.
- Charts and cards need fallbacks when labels no longer fit.
- App typography roles should describe meaning, not only size.

### Adaptive Layout

- Android guidance explicitly warns against merely stretching/shrinking UI.
- Form Theory should use composition changes:
  - Compact: one column.
  - Medium: one column with wider content and sticky actions where useful.
  - Expanded/tablet/web: two-pane or main/supporting layouts for Dashboard, Progress, Profile, and Coach.

### Motion

- Motion should be tokenized and purposeful.
- Prefer standard, restrained motion for Form Theory; reserve expressive motion for confirmation or state-preserving transitions.
- Reduced motion must convert transitions to opacity/instant state changes.

### Performance

- React Native documents JS and UI frame budgets clearly: 60 FPS gives about 16.67ms per frame.
- Heavy rerenders can delay touch feedback.
- App design must avoid continuous background animation, excessive alpha compositing, heavy SVG chart animation, and uncontrolled shadows.

## Gate Implications

- Gate 2 must define platform behavior tokens and component APIs.
- Gate 3 prototype must be tested in dark/light, compact/large phone, tablet/web width, reduced motion, and large text.
- Gate 4/5 screen migrations must record platform-specific exceptions in `06A_PLATFORM_BEHAVIOR.md`.
