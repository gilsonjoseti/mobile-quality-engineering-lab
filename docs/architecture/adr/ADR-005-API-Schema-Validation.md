# ADR-005: API Schema Validation

## Status
Accepted

## Context
The repository includes both UI and API automation, but the API layer needed a more explicit contract strategy beyond smoke requests. A schema validation layer helps detect malformed payloads early and creates a stronger foundation for negative testing.

## Decision
Add a lightweight schema validation utility for user payloads and keep the rule set close to the test layer. This allows positive and negative API contract checks without introducing a heavy dependency such as Ajv in the initial portfolio version.

## Consequences
- Stronger contract checks for API payloads
- Better negative test coverage at low cost
- Easy extension for additional schema rules and endpoints
- Maintained simplicity for a portfolio repository
