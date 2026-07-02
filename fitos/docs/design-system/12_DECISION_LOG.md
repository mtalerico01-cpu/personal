# 12 - Decision Log

## 2026-07-02 - Gate 1 Discovery Before Implementation

Decision: Perform documentation-first discovery before broad UI changes.

Context: The request explicitly forbids random color/card/font changes and requires Gate 1 discovery first.

Alternatives considered: Begin token implementation immediately; migrate Dashboard immediately.

Reason: Current system has brand seeds but lacks governance; broad implementation before audit would risk visual churn.

Impact: Gate 1 creates design docs only. Gate 2 will implement foundations after review.

Status: Accepted.

## 2026-07-02 - Restrained Lime Usage

Decision: Lime is reserved for primary action, active navigation, selected state, current progress, key insight, and focus.

Context: Brand sheet uses lime sparingly against black/graphite and white.

Alternatives considered: Use lime as general success color; use lime on all metrics/icons.

Reason: Overuse weakens the brand and reduces hierarchy.

Impact: Tokens and components must separate brand accent from success/status colors.

Status: Proposed for Gate 2.

## 2026-07-02 - Dark Theme Is Primary Brand Expression, Light Theme Is First-Class

Decision: Dark theme carries strongest brand expression; light theme must remain fully designed and not feel like a fallback.

Context: Brand sheet is dark-first, but app supports light/system appearance.

Alternatives considered: Dark-only brand; separate light visual language.

Reason: Broad adult audience and platform expectations require both.

Impact: Every token/component must define dark and light states.

Status: Proposed.

## 2026-07-02 - No Universal Card Treatment

Decision: Not every group becomes the same rounded card.

Context: Current `Card` defaults to large radius and shadow; many screens use cards as default structure.

Alternatives considered: Standardize all groups as cards.

Reason: Too many cards flatten hierarchy and diverge from brand-sheet discipline.

Impact: Surface system will include open sections, bordered sections, inset groups, data panels, cards, and modals.

Status: Proposed.

## 2026-07-02 - Charts Require Interpretation

Decision: Every major chart must include a concise interpretation before or with the chart.

Context: Current charts are custom and under-specified.

Alternatives considered: Restyle charts visually only.

Reason: Charts are for comprehension and decisions, not decoration.

Impact: Chart components need specs, accessibility summaries, empty/insufficient states, and performance budgets.

Status: Proposed.

## 2026-07-02 - One Unified Coach Identity

Decision: Coach should be integrated into Form Theory, not themed as a separate chat product or fictional persona system.

Context: Coach is central intelligence, but separate background/message patterns risk product fragmentation.

Alternatives considered: Persona-specific visual themes.

Reason: The brand should remain Form Theory across styles.

Impact: Coach components should share action cards, insight headers, tokens, and motion with the rest of the app.

Status: Proposed.
