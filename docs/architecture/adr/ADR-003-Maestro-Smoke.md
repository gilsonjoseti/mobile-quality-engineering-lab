# ADR-003: Maestro for Smoke Coverage

## Status
Accepted

## Context
The project needs fast, readable smoke checks with minimal setup overhead and strong business-flow validation.

## Decision
Use Maestro for smoke flows and lightweight critical journey checks, while using Appium for deeper UI automation and device/platform flexibility.

## Consequences
- Faster feedback for smoke suites
- Clear flow-driven testing syntax
- Better complement to Appium for critical journeys
- Not a full replacement for more sophisticated UI automation
