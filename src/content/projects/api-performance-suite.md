---
title: api-performance-suite
tagline: Functional API tests (Playwright) and staged load tests (K6) with threshold-based pass/fail gates.
order: 3
repo: https://github.com/GabrieleScano/api-performance-suite
reportUrl: https://gabrielescano.github.io/api-performance-suite/
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

The two disciplines that complement UI automation: validating contracts at the
service layer — where tests are faster and more stable than through the UI — and
observing how latency and error rates hold up under load. Tests target
restful-booker, a public REST API built for test practice.

## API testing (Playwright)

- Full CRUD lifecycle: create → read → update → delete, with a post-delete 404
  check.
- Partial update (PATCH) that verifies untouched fields are preserved.
- Token-based authentication: token issued for valid credentials, rejected for
  invalid ones.
- **Contract checks** — the response *shape* is validated against the documented
  schema with dependency-free validators, not just status codes.
- Negative cases: 404 for missing resources, 403 on writes without a valid token.

## Performance testing (K6)

Three scripts with pass/fail thresholds that fail the run when breached:

- **smoke** — single-user sanity check.
- **load** — staged ramp-up → steady state → peak → ramp-down with custom metrics.
- **spike** — an abrupt traffic burst and recovery, with looser-but-bounded
  thresholds.

`restful-booker` is a shared public sandbox, so some latency under concurrency
is expected — which makes it a realistic target for demonstrating
threshold-based performance gates.
