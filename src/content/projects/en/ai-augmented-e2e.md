---
title: ai-augmented-e2e
tagline: Multi-SUT E2E framework (Playwright + TypeScript) with functional, visual-regression and accessibility tests, safe enough to run against a production app.
order: 1
repo: https://github.com/GabrieleScano/ai-augmented-e2e
reportUrl: https://gabrielescano.github.io/ai-augmented-e2e/
testCount: 55
stack:
  - Playwright
  - TypeScript
  - Page Object Model
  - axe-core
  - Docker
  - GitHub Actions
  - Anthropic API
metrics:
  - label: Functional · visual · a11y · unit, each with a stable traceability ID
    value: 55 tests
  - label: A demo shop and a production PWA used by real families
    value: 2 SUTs
  - label: Real WCAG issues found in production and fixed the same day
    value: 4 bugs
highlights:
  - One Playwright project per system under test, with its own page objects, fixtures and specs. Adding a SUT means adding a folder.
  - Production-safe by construction. Any write request is aborted and fails the test, trackers are blocked, and the suite runs with one worker and no load tests.
  - Deterministic visual regression with a frozen clock, mocked data and masks only where content really varies. Baselines are generated in the official Playwright Docker image.
  - Accessibility gate (axe, WCAG 2 A/AA) with an explicit allowlist that fails on new violations and on fixes that shipped.
---

An E2E framework built to be inspectable end to end, now testing two very
different systems. The first is SauceDemo, a public demo shop. The second is
[Menú Escolar](https://menu-escolar-poble-sec-i62w.vercel.app/), my own
school-canteen menu app, a mobile PWA in production used every day by families
at the school.

## Two systems under test

| SUT | Environment | Coverage |
|---|---|---|
| SauceDemo | Desktop: Chromium, Firefox, WebKit | 16 functional · 2 visual · 2 a11y |
| Menú Escolar | Mobile: Pixel 7 (Chromium), iPhone 13 (WebKit) | 14 functional · 6 visual · 6 a11y |

Each SUT has its own Playwright projects, page objects, fixtures and specs,
kept apart by folder. Every test title starts with a stable ID
(`MENU-E2E-007`, `SAUCE-VIS-002`, ...), and a unit test fails on any missing or
duplicate ID, so the suite can feed a traceability matrix.

## Testing production without touching it

Menú Escolar has real users, so the safety rules live in a fixture rather than
in each test. Any request other than GET is aborted and **fails the test**. The
only write endpoint, push-notification tags, is unreachable. Analytics and push
services are blocked, so runs don't skew real statistics. The service worker is
off, the SUT gets **one worker**, and there are no load tests.

## Deterministic visual regression

The menu changes every day, which would make naive screenshots useless. So the
clock is frozen with `page.clock`, the monthly menu files are replaced with
fixed data through `page.route` while the app code stays live, and fonts are
awaited. The only randomness left is a weekend greeting picked at random, and
only that gets masked.

Baselines are generated in the **official Playwright Docker image**, the same
one CI runs in, through a manual workflow that commits them back. A unit test
fails if the image tag and the Playwright version ever drift apart.

## Accessibility that finds real bugs

axe (WCAG 2 A/AA) runs on every screen of both apps. Known violations go into
an explicit allowlist with a reason and a fix, never silently ignored. The
checker also fails when an allowlisted violation *stops* reproducing, so the
list shrinks as fixes ship.

The first run found contrast and ARIA issues in Menú Escolar. They were fixed
and deployed the same day, and the suite itself flagged the stale allowlist
entries. Exploratory testing then found a keyboard-focus escape from modal
sheets, which is now fixed and has a regression test.

## AI, with judgement (and optional)

The AI module turns a user story and its acceptance criteria into structured
test cases plus shift-left observations. Its output is **never trusted
blindly**: a parser validates shape and enum values, and that parser is
covered by browser-less unit tests. The module is optional: CI never calls it,
and without an API key it explains how to enable itself and exits cleanly.

## Failure triage

Every CI job feeds
[test-triage-kit](https://github.com/GabrieleScano/test-triage-kit), which
classifies failures (bug / flaky / infrastructure), deduplicates them by root
cause and publishes the verdicts. The per-job reports are merged into a single
live HTML report.
