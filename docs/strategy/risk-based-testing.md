# Risk-Based Testing

Risk is calculated as:

$$
Risk = Impact \times Probability
$$

## Classification
- Low
- Medium
- High
- Critical

## Examples
- Authentication flows: Critical
- Transaction confirmation: Critical
- Onboarding validation: High
- Secondary navigation: Medium

## Strategy
- Prioritize risk-heavy journeys in smoke and PR pipelines
- Use regression suites to cover medium-risk scenarios nightly
- Reserve broad device coverage for release validation and selected risk clusters
