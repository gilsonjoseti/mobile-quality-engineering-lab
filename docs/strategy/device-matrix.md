# Device Matrix

## Tier 1
- Executed in PR
- Small set of common devices and OS versions
- Focus on critical user journeys

## Tier 2
- Nightly execution
- Broader manufacturer and OS coverage
- Medium-risk workflows and compatibility checks

## Tier 3
- Release candidate validation
- High-cost or less common devices
- Exploratory validation and release confidence checks

## Considerations
- Android versions
- iOS versions
- Manufacturer diversity
- Screen size and resolution
- Popularity and market share
- Business criticality
- Risk level
- Execution cost

## Example

| Tier | Platform | Example Devices | Schedule | Goal |
|---|---|---|---|---|
| Tier 1 | Android | Pixel 7, Samsung S23 | PR | Core smoke and critical flows |
| Tier 1 | iOS | iPhone 14 | PR | Core smoke and critical flows |
| Tier 2 | Android | Pixel 6, OnePlus, Motorola | Nightly | Regression |
| Tier 2 | iOS | iPhone 12, 13 | Nightly | Regression |
| Tier 3 | Android/iOS | Older OS combinations | RC | Release confidence |
