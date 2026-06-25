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
requirement. A deterministic, dependency-free engine catches requirement
smells, and an optional AI layer adds the semantic findings rules can't.
