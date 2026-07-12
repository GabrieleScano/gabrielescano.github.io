---
title: test-triage-kit
tagline: Failure-triage pipeline for Playwright — classifies failures, deduplicates them by root cause, detects flakiness and writes AI-enriched bug reports to GitHub Issues or Jira.
order: 4
repo: https://github.com/GabrieleScano/test-triage-kit
reportUrl: https://gabrielescano.github.io/test-triage-kit/
testCount: 52
stack:
  - TypeScript
  - Node.js
  - node:test
  - Anthropic API
  - Jira REST API
  - GitHub Actions
metrics:
  - label: Unit tests across every pipeline stage
    value: 52 tests
  - label: Deterministic classify → fingerprint → verdict
    value: 5 stages
  - label: Files to GitHub Issues or Jira Cloud
    value: 2 sinks
highlights:
  - Fingerprinting normalizes volatile parts (ids, durations, ports) so ten tests broken by one selector become one report.
  - Run history drives flaky detection — "failed 2 of 10 runs, never twice in a row" is not filed as a bug.
  - AI writes the report a developer wants to read; the verdicts stay rule-based and reproducible.
  - Same dedupe-by-fingerprint lifecycle ships to Jira Cloud (free tier, Atlassian Document Format) alongside GitHub Issues.
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
include Markdown reports, a static HTML triage page, a GitHub Issues / Jira
lifecycle (update, don't duplicate) and a Slack digest.

## Two issue trackers, one lifecycle

`--github` and `--jira` share the same contract: match open, labeled issues by
the fingerprint embedded in their body, comment on a known failure instead of
duplicating it, and propose (never force) a close once a fingerprint has been
green for long enough. The Jira sink builds its issue body as **Atlassian
Document Format** rather than Markdown, and runs against the free tier of
Jira Cloud — no paid plan required to exercise it end to end. Since that free
tier has no public anonymous issue view, the [live Jira
preview](https://gabrielescano.github.io/test-triage-kit/jira-preview.html)
renders the real ADF payload as issue cards instead.

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
