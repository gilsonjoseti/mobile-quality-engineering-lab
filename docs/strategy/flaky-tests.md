# Flaky Test Management

## Definition
A flaky test is one that produces inconsistent results for the same code and data without a corresponding product change.

## Identification
- Repeat failing test runs
- Capture counts by platform and device
- Measure pass rate over time
- Correlate failures with environmental issues

## Quarantine
- Move unstable tests to a quarantine list
- Keep evidence and root cause notes
- Avoid hiding failures without traceability

## Root Cause
- Timing issues and improper waits
- Shared state or test data leakage
- Device instability or app lifecycle changes
- External dependency variability

## SLA
- Investigate high-priority flaky tests within 24 hours
- Root cause documentation within 48 hours
- Quarantine only with explicit review

## Metrics
- Flaky rate
- Reproduction rate
- Repair SLA compliance
- Impact on CI stability
