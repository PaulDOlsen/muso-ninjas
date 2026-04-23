# Starter Style Playbook

## Use this in templates

- app-stack + app-stack--sm|md|lg
- app-page-section
- app-page-title, app-page-subtitle
- app-form-heading, app-form-subheading
- app-card, app-card--interactive, app-card\_\_content
- app-list-row, app-media-thumb, app-content-grow
- app-item-title, app-item-meta, app-item-tail
- app-form-actions
- app-feedback-error

## Rules

1. Use token variables for spacing/color/radius/shadow values.
2. Add new classes only if they are reused in at least two places.
3. Keep page files mostly class composition and behavior.
4. Keep visual rules in SCSS partials, not scoped blocks.
