# ADR-004: Cloud Device Farm Strategy

## Status
Accepted

## Context
The project targets multiple device classes, OS versions, and operating conditions. Local-only execution is insufficient for broad confidence.

## Decision
Document and prepare for BrowserStack, Firebase Test Lab, and AWS Device Farm support via environment-driven configurations and run instructions.

## Consequences
- Better cross-device coverage
- Reduced local environment friction
- Cloud integration readiness for PR and nightly pipelines
- Requires credentials and provider-specific configuration
