---
title: requirements-analyzer
tagline: A CLI that reviews user stories for ambiguities and missing edge cases — deterministic rules plus an optional AI layer.
order: 2
repo: https://github.com/GabrieleScano/requirements-analyzer
testCount: 26
stack:
  - TypeScript
  - Node.js
  - node:test
  - Anthropic API
metrics:
  - label: Unit + CLI + AI-layer tests
    value: 26 tests
  - label: Deterministic rule engine, zero deps
    value: offline
  - label: Non-zero exit on high-severity issues
    value: CI gate
highlights:
  - Rule engine is the source of truth; the AI layer is additive and best-effort.
  - Flags vague language, unmeasured thresholds, weak modals and missing negative paths.
  - Produces a clarity score and fails a pipeline on poorly specified requirements.
---

Shift-left, made concrete: the cheapest defect to fix is an ambiguous
requirement. This CLI turns that practice into something repeatable — the kind
of review a QA engineer or functional analyst runs during backlog refinement.

## Two layers

- **Deterministic rule engine** — no dependencies, fully offline. Flags vague
  language, unmeasured thresholds, weak modal verbs, duplicate criteria,
  missing negative paths and criteria that aren't in Given/When/Then form.
  Produces a clarity score.
- **Optional AI layer** — when an API key is present, adds the semantic findings
  rules can't catch: logical contradictions, implicit assumptions, undefined
  business terms, missing flows.

The rule engine is the **source of truth**; AI is additive and best-effort — a
network error never breaks the analysis.

## Usable as a CI gate

The CLI exits non-zero when high-severity issues are found, so it can fail a
pipeline on poorly specified requirements before a single line of code is
written. The rule engine, the AI layer (with a stubbed client) and the CLI exit
codes are all covered by tests.

> This same engine powers the **live in-browser demo** — paste a user story and
> see the findings and clarity score in real time.
