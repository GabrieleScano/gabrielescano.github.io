---
title: ai-augmented-e2e
tagline: E2E framework with Playwright + TypeScript, POM and an AI module that derives test cases from acceptance criteria.
order: 1
repo: https://github.com/GabrieleScano/ai-augmented-e2e
testCount: 22
stack:
  - Playwright
  - TypeScript
  - Page Object Model
  - GitHub Actions
  - Anthropic API
metrics:
  - label: E2E across Chromium · Firefox · WebKit
    value: 16 specs
  - label: AI-parser unit tests (browser-less project)
    value: 6 specs
  - label: Cross-browser CI on every push
    value: 3 browsers
highlights:
  - Page Object Model with private locators and intent-revealing actions only.
  - Semantic, web-first locators (getByRole / getByPlaceholder / getByTestId) — no fixed waits.
  - AI output is validated (shape + enums), never trusted blindly, and covered by unit tests.
---

End-to-end test automation built to be inspectable end to end: maintainable
design, cross-browser CI, and an AI layer that turns acceptance criteria into
structured test cases plus shift-left observations.
