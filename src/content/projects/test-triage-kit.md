---
title: test-triage-kit
tagline: Failure-triage pipeline for Playwright — classifies failures, deduplicates them by root cause, detects flakiness and writes AI-enriched bug reports.
order: 4
repo: https://github.com/GabrieleScano/test-triage-kit
testCount: 40
stack:
  - TypeScript
  - Node.js
  - node:test
  - Anthropic API
  - GitHub Actions
metrics:
  - label: Unit tests across every pipeline stage
    value: 40 tests
  - label: Deterministic classify → fingerprint → verdict
    value: 5 stages
  - label: Wired into ai-augmented-e2e's CI
    value: live
highlights:
  - Fingerprinting normalizes volatile parts (ids, durations, ports) so ten tests broken by one selector become one report.
  - Run history drives flaky detection — "failed 2 of 10 runs, never twice in a row" is not filed as a bug.
  - AI writes the report a developer wants to read; the verdicts stay rule-based and reproducible.
---

Auto-filing a bug for every red test produces noise, not triage. This kit
answers the questions a single failing test can't: **is this one bug or ten?
Is it a bug at all? Is it new?** — deterministically, then uses AI only for
what rules can't do.

## The pipeline

```
ingest → classify → fingerprint/cluster → history → verdict → (AI enrich) → outputs
```

A rule engine classifies each failure (`assertion` / `timeout` / `network` /
`crash` / `setup`); fingerprinting hashes the normalized category + selector +
message so failures with one root cause cluster together; an append-only run
history flags flaky patterns; and every failure gets a stated verdict —
`likely-bug`, `likely-flaky` or `infrastructure` — with reasons. Outputs
include Markdown reports, a static HTML triage page, a GitHub Issues lifecycle
(update, don't duplicate) and a Slack digest.

## AI, additive only

Enrichment adds what rules can't write: a human-readable title, a root-cause
hypothesis, severity proposal and natural-language repro steps, plus a
cross-run synthesis ("12 failures, one systemic cause"). It uses structured
outputs, and the pipeline is fully functional without it.

## A real integration, not a demo

The kit ships as a reusable package with a custom Playwright reporter, and it
runs for real inside **ai-augmented-e2e**: every CI run there loads
`test-triage-kit/reporter`, triages its failures and publishes the verdicts as
a build artifact.
