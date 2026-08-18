# Device Farm Strategy

## BrowserStack
- Appium remote execution
- Use environment variables for username and access key
- Suitable for broad device coverage and release validation
- Recommended for PR smoke and nightly matrix on Android devices

## Firebase Test Lab
- Android-focused execution
- Use GCloud and emulator or device runners with proper project setup
- Best used for Android matrix expansion and pre-release validation

## AWS Device Farm
- Android and iOS device farm integration
- Use AWS access keys via environment variables only
- Prefer for enterprise-style orchestration and parallel runs
- Good fit for regulated release gates and large-scale matrix validation

## Recommended execution model
- PR validation: local static checks + API contract suite + lightweight smoke suite
- Nightly execution: BrowserStack/Firebase/AWS matrix across a representative device set
- Release candidate: cloud execution on the most critical devices and OS versions

## Device matrix example
- Android: Pixel 6/7, Samsung Galaxy S21/S23, API 30/33/34
- iOS: iPhone 12/13/14 on current stable OS versions
- Coverage should prioritize business-critical flows such as login and transaction validation

## Security
- Never commit secrets
- Load credentials from local environment or CI variable groups
- Keep cloud runner values outside source control and rotate them on schedule
