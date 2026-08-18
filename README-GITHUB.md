# Mobile Quality Engineering Lab

A senior-level portfolio project that demonstrates how a Quality Engineering / SDET team can design, automate, validate, and govern mobile quality across Android and iOS.

## Why this project exists

This repository models a realistic quality engineering operating model for critical mobile journeys. The emphasis is not on building a production app, but on demonstrating how to structure a robust mobile testing strategy with engineering discipline, evidence, and release confidence.

## What is included

- TypeScript-first automation foundation
- Appium 2 + WebdriverIO architecture
- Screen Object Pattern and reusable abstractions
- API contract and schema validation
- Retry and failure handling patterns
- BDD and behavior-oriented scenarios
- Azure DevOps pipeline design
- cloud device farm strategy
- evidence bundle and release gate concept

## Quality focus areas

- authentication validation
- critical flow protection
- regression confidence
- API contract integrity
- CI artifact publication
- environment-aware release gates

## Project structure

```text
appium/
api/
bdd/
maestro/
robot-framework/
device-farm/
docs/
reports/
scripts/
azure-pipelines.yml
README.md
PROJECT_STATUS.md
```

## Stack

- Node.js + TypeScript
- Appium 2 + WebdriverIO
- Vitest
- Axios
- Maestro
- Robot Framework
- Azure DevOps
- BrowserStack / Firebase / AWS Device Farm strategy

## Verification

This repository has been validated in the current environment with:

- ESLint passed
- TypeScript strict validation passed
- API contract tests passed
- Mobile smoke/regression checks passed
- Quality report generation passed
- Release gate checks passed for CI and release thresholds

## Real Android execution flow on Windows

The end-to-end Android run requires a complete Android SDK and a generated APK. The valid operational sequence is:

```powershell
Set-Location "D:\App Mobile"

$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:Path += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\cmdline-tools\latest\bin"

& "$env:ANDROID_HOME\cmdline-tools\latest\bin\sdkmanager.bat" --install "platform-tools" "platforms;android-34" "build-tools;34.0.0" "system-images;android-34;google_apis;x86_64" "emulator"

& "$env:ANDROID_HOME\emulator\emulator.exe" -create-avd -n Pixel_8 -k "system-images;android-34;google_apis;x86_64" -d pixel_8

Set-Location "D:\App Mobile\android-demo-app"
.\gradlew.bat assembleDebug

Set-Location "D:\App Mobile"
New-Item -ItemType Directory -Force -Path "apps" | Out-Null
Copy-Item ".\android-demo-app\app\build\outputs\apk\debug\app-debug.apk" ".\apps\demo-finance.apk" -Force
```

Then run emulator, Appium and the project workflow:

```powershell
Set-Location "D:\App Mobile"
& "$env:ANDROID_HOME\emulator\emulator.exe" -avd Pixel_8
```

```powershell
Set-Location "D:\App Mobile"
npm run appium:start
```

```powershell
Set-Location "D:\App Mobile"
node scripts/require-appium.js
npm run run:real -- -AppPath "./apps/demo-finance.apk" -DeviceName "Pixel_8"
```

This repository is intentionally documented to reflect the real infrastructure requirements for Android automation, rather than pretending the mobile run works without a proper SDK, emulator, Appium service, and APK artifact.

## Professional maturity pillars

This project is intentionally structured around four core pillars that define a serious Quality Engineering operating model:

- Real evidence: quality decisions are backed by artifacts, execution reports, validation data, and CI evidence.
- Practical execution: the solution demonstrates how to automate critical user journeys, integrate mobile and API checks, and validate release-risk paths.
- Business narrative: the testing strategy connects quality work to customer experience, product value, and the impact of failures in critical journeys.
- Quality governance: environment gates, quality criteria, and release decisions are part of a disciplined operating model rather than informal approval.

These pillars move the repository beyond a technical demo and turn it into a credible portfolio artifact for real-world engineering quality work.

## Repository status

This is a public portfolio project designed to communicate strong mobile QA engineering thinking, evidence-based automation, and quality governance for real-world digital products.

## Key portfolio messages

- risk-based testing
- automation architecture for critical journeys
- CI evidence and release confidence
- cloud device strategy for multi-platform coverage
- practical SDET / Quality Engineer perspective

## Use this repo for

- portfolio presentations
- technical interviews
- QA engineering case studies
- architecture discussion with stakeholders
- demonstrating automation maturity in mobile delivery

## Contact / profile

GitHub: https://github.com/gilsonjoseti

## License

MIT
