# App Style Playbook

Use this file as a copy-ready guide for future Quasar apps.

## 1) Core Principles

1. Use tokens for all spacing, color, radius, and shadows.
2. Prefer semantic classes (app-page-title, app-feedback-error) over page-specific names.
3. Keep component files focused on markup and behavior. Put visuals in global SCSS partials.
4. Build with a few reusable patterns and compose them.

## 2) Files and Responsibilities

- src/css/tokens/: design tokens only
- src/css/base/: reset, typography, layout foundations
- src/css/components/\_patterns.scss: reusable app primitives
- src/css/components/\*.scss: specialized component styling
- src/css/app.scss: import order and central wiring

## 3) Reusable Pattern Classes

- app-stack + app-stack--sm|md|lg: vertical rhythm wrappers
- app-page-section: centered page content width
- app-page-title, app-page-subtitle: page heading pair
- app-card, app-card--interactive, app-card\_\_content: card container pattern
- app-list-row: row spacing and responsive wrap behavior
- app-media-thumb: media thumbnail container
- app-content-grow: growable text column
- app-item-title, app-item-meta: standard item text
- app-item-tail: right-aligned meta action/count
- app-feedback-error: consistent error message style

## 4) Typical Composition

1. Wrap page content with app-page-section and app-stack.
2. Use app-page-title and app-page-subtitle at the top.
3. Render list items with app-card and app-list-row.
4. Use app-feedback-error for user-visible errors.

## 5) Migration Checklist For New Projects

1. Copy src/css/tokens, src/css/base, and src/css/components/\_patterns.scss.
2. Keep class names unchanged where possible for portability.
3. Adapt only token values for brand/theme differences.
4. Add new classes to \_patterns.scss only when they are reusable across at least two pages.
