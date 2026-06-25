---
title: ai-augmented-e2e
tagline: E2E framework with Playwright + TypeScript, POM and an AI module that derives test cases from acceptance criteria.
order: 1
repo: https://github.com/GabrieleScano/ai-augmented-e2e
reportUrl: https://gabrielescano.github.io/ai-augmented-e2e/
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

A complete E2E automation workflow built to be inspectable end to end:
maintainable design, cross-browser CI, and an AI layer that turns acceptance
criteria into structured test cases plus shift-left observations. Tests run
against SauceDemo, a stable public demo application.

## What it demonstrates

- **Functional coverage** — authentication (valid, locked-out, data-driven
  invalid logins, auth-guard redirects), cart, sorting and a full checkout
  flow with validation.
- **Maintainable design** — Page Object Model, custom fixtures, centralized
  test data, semantic locators and web-first assertions.
- **Cross-browser CI** — Chromium, Firefox and WebKit on every push, with
  HTML and Allure reports as artifacts.

## Design decisions

Page Objects expose intent-revealing actions only and keep their locators
private, so specs read like behaviour, not selectors. Locators are semantic
(`getByRole`, `getByPlaceholder`, `getByTestId`) and assertions are auto-waiting
— there is no `waitForTimeout` anywhere. Each test is isolated and independent:
no shared state, no implicit ordering.

## AI, with judgement

The AI module takes a user story and acceptance criteria and returns structured
test cases plus observations (ambiguities, missing edge cases). Its output is
**never trusted blindly**: a dedicated parser strips markdown fences and
validates the response shape and enum values, and that parser is covered by a
browser-less unit-test project — so a malformed model response fails loudly
instead of corrupting downstream tooling.
