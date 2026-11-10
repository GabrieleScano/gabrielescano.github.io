---
title: api-performance-suite
tagline: API and contract tests (Playwright + OpenAPI) and K6 load tests against a containerised API, with threshold gates and a published performance trend.
order: 3
repo: https://github.com/GabrieleScano/api-performance-suite
reportUrl: https://gabrielescano.github.io/api-performance-suite/
trendsUrl: https://gabrielescano.github.io/api-performance-suite/trends/
testCount: 29
stack:
  - Playwright
  - TypeScript
  - OpenAPI
  - ajv
  - K6
  - Docker
  - GitHub Actions
metrics:
  - label: Live API checks + offline contract suite
    value: 29 tests
  - label: Breaking changes the contract must reject
    value: 13 cases
  - label: K6 runs tracked (p95 · error rate · throughput)
    value: trend
highlights:
  - Every response validated against an OpenAPI contract with ajv (status, content type and body), not just status codes.
  - A dedicated suite proves the contract catches breaking changes, such as renamed fields, type changes and altered status codes.
  - CI runs against a pinned Docker container of the API, so results are deterministic and comparable run to run.
  - K6 thresholds gate CI, and every run is recorded and charted on a public trend page.
---

The two disciplines that complement UI automation: validating contracts at the
service layer, where tests are faster and more stable than through the UI, and
watching how latency, error rate and throughput hold up under load. Tests target
restful-booker, an open-source REST API built for test practice.

## A deterministic target

CI does not test the shared public sandbox. Each job starts the API's official
Docker image as a **service container**, pinned by digest and health-checked
before the run, so every run starts from the same clean, seeded data. The same
suite runs locally against the public instance by changing a single `BASE_URL`.

## Contract testing (OpenAPI + ajv)

restful-booker has no official OpenAPI document, so I **wrote one** from its
documentation and corrected it against the service's real behaviour. The
documentation is wrong in a few places: `DELETE` returns 201, not 200; prices
are integers; one field is optional.

- Every live response is checked with `expectContract(response, operationId)`.
  The status code must be documented, the content type must be documented, and
  the body must match the schema (ajv, strict mode).
- An offline suite feeds the contract **13 realistic breaking changes**, such as
  a removed or renamed field, a number sent as a string, a reformatted date or a
  changed status code. Each one must be rejected. Additive fields are tolerated.
- A coverage check fails if an operation in the contract has no live test, and
  the document itself is linted with Redocly in CI.

## API testing (Playwright)

- Full CRUD lifecycle: create → read → update → delete, then a 404 check after
  the delete.
- Partial update (PATCH) that verifies untouched fields are preserved.
- Token auth: a token for valid credentials, a rejection for invalid ones.
- Negative cases: 404 for missing resources, 403 for writes without a valid
  token.

## Performance testing (K6)

- **smoke**: single-user sanity check.
- **load**: staged ramp-up → steady state → peak → ramp-down, with custom
  metrics.
- **spike**: an abrupt traffic burst and its recovery.

Thresholds on p95 latency and error rate **fail the build** when breached.
Latency limits are set per environment, because the container answers in
milliseconds and the public sandbox in hundreds of milliseconds.

Every CI run (on push and on a daily schedule) exports its K6 summary. The
results are appended to a history kept on a dedicated `data` branch and
published as a **[performance trend page](https://gabrielescano.github.io/api-performance-suite/trends/)**
with p95, error rate and throughput across the last N runs. Regressions show
up as a line moving, not just as a red build.
