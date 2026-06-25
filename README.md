# Portfolio — Gabriele Scano

QA Engineer portfolio. The site is itself a QA artifact: accessible,
fast, and tested in CI.

Built with **Astro + TypeScript + Tailwind v4**, deployed to **GitHub Pages**.

## What's inside

- **Static home** with a hero, featured-project cards, approach and contact.
- **Per-project detail pages** generated from a type-safe content collection.
- **Live in-browser demo** of the `requirements-analyzer` rule engine — the same
  deterministic engine that powers the CLI, running entirely client-side.

## Quality gates (run on every push)

| Gate | Tool |
|------|------|
| Smoke navigation + demo behaviour | Playwright |
| Accessibility (WCAG 2 A/AA) | axe-core |
| Performance / a11y / best-practices / SEO budgets | Lighthouse CI |
| Type safety | `astro check` |

Budgets: performance ≥ 95, **accessibility = 100**, best-practices ≥ 95, SEO ≥ 95.

## Local development

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # static build to dist/
npm run check      # type-check
npm test           # Playwright smoke + a11y (builds + previews automatically)
npm run lhci       # Lighthouse budgets against dist/
```

## License

MIT
