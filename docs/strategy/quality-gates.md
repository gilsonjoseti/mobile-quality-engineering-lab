# Quality Gates

## Gate Rules
- Smoke Tests = 100%
- Critical Tests >= 98%
- Regression >= 95%
- No blocker defects
- No critical defects

## Enforcement
The pipeline should fail when a gate is not met. Evidence must be captured as part of the build artifact set.

## Example policy
- `smoke_pass_rate >= 100`
- `critical_pass_rate >= 98`
- `regression_pass_rate >= 95`
- `blocker_defects == 0`
- `critical_defects == 0`

## Environment-specific gates

### Local developer validation
- Fast feedback loop for static validation and smoke checks
- Required: lint, typecheck, API smoke, and local environment sanity check
- Failure outcome: prevent merge or block the feature branch locally

### PR validation (CI)
- Required for every PR and merge to main
- Required: static analysis, API contract tests, mobile smoke tests, regression subset, artifact publication
- Artifacts: quality-summary.json, logs, screenshots, execution metadata
- Gate target: `ci`

### Nightly validation (Cloud Device Farm)
- Required for nightly runs and quality trend monitoring
- Required: representative Android and iOS matrix, critical flow coverage, regression signal across OS/device slices
- Failure outcome: raise triage and block release candidate if critical defects are open
- Gate target: `nightly`

### Release validation
- Required for final release approval
- Required: evidence bundle present, all gates green, critical journey coverage complete, cloud execution trace attached
- Failure outcome: block production release and require defect triage
- Gate target: `release`

### Environment gate summary
- `local` => pass/fail for developer confidence
- `ci` => required for merge eligibility
- `nightly` => required for ongoing cloud validation and regression trend analysis
- `release` => required for deployment promotion
