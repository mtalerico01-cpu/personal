# 08 - Motion and Feedback

Date created: 2026-07-02

## Motion Principle

Motion exists to reduce uncertainty, preserve context, confirm action, or clarify change. It is not decoration.

## Proposed Motion Tokens

| Token | Duration | Use |
|---|---:|---|
| `instant` | 80ms | pressed feedback, tiny opacity changes |
| `fast` | 140ms | selection transitions, chips, tabs |
| `standard` | 220ms | card expansion, sheet content, simple progress |
| `deliberate` | 360ms | screen-level state transition, plan generation reveal |
| `ambient` | 5000ms | rare subtle background only, disabled by reduced motion |

## Required Interaction Spec Fields

Every nuanced interaction must define:

- Trigger
- Visual response
- Timing
- Easing/spring token
- Haptic response if any
- Accessibility behavior
- Reduced-motion behavior
- Failure behavior
- Performance cost

## Approved Uses

- Immediate pressed-state feedback.
- Restrained haptics on meaningful selection/confirmation.
- Context-preserving expansion.
- Animated number changes only for important values and only when it aids comprehension.
- Progress transitions that make changed state legible.
- Chart point selection.
- Optimistic updates where rollback is clear.
- Skeleton states matching final content.

## Avoid

- Continuous background animation.
- Glowing pulses everywhere.
- Motion on every metric.
- Large image size animation.
- Decorative particles or AI-themed effects.
- Bounce that conflicts with the disciplined brand.

## Reduced Motion

Reduced motion should disable spatial movement and use instant state changes or short opacity transitions. The interface must remain fully functional if animation fails.
