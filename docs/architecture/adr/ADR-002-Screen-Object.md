# ADR-002: Screen Object Pattern

## Status
Accepted

## Context
Mobile UI flows are complex and evolve frequently. Repetition and locator fragility create maintenance cost.

## Decision
Each mobile screen or reusable component will encapsulate its own locators and actions using a BaseScreen abstraction.

## Consequences
- Improved readability and reuse
- Reduced duplication and better maintenance
- Clear separation between tests and UI internals
- Requires disciplined locator design and explicit waits
