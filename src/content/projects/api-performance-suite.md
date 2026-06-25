---
title: api-performance-suite
tagline: Functional API tests (Playwright) and staged load tests (K6) with threshold-based pass/fail gates.
order: 3
repo: https://github.com/GabrieleScano/api-performance-suite
testCount: 11
stack:
  - Playwright
  - TypeScript
  - K6
  - GitHub Actions
metrics:
  - label: API CRUD, contract, auth & negative cases
    value: 11 tests
  - label: K6 smoke · load · spike scripts
    value: 3 scenarios
  - label: p95 latency / error-rate gates
    value: thresholds
highlights:
  - Response shape validated against the contract, not just status codes.
  - Full CRUD lifecycle with token auth, partial updates and negative paths.
  - Staged K6 ramp-up → peak → recovery with pass/fail thresholds.
---

The disciplines that complement UI automation: validating contracts at the
service layer where tests are fast and stable, and observing how latency and
error rates hold up under sustained and peak load.
