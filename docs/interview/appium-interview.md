# Appium Interview Guide

## Appium architecture
Appium is a client-server architecture where test code communicates with the Appium server, which then delegates to platform-specific drivers such as UiAutomator2 for Android and XCUITest for iOS.

## Appium server
The Appium server exposes WebDriver-compatible endpoints and interprets requests from test clients.

## Drivers
- UiAutomator2: Android driver
- XCUITest: iOS driver
- Native driver behavior differs by platform and app type

## Capabilities
Capabilities define platform, device, automation engine, app path, and session configuration.

## Locators
Prefer accessibility IDs, stable IDs, and semantic selectors. Avoid excessive XPath because it is brittle and slower.

## Waits
Use explicit waits and element state checks rather than fixed sleeps.

## Gestures
Tap, swipe, scroll, and multi-touch sequences are handled through Appium actions and mobile commands.

## Contexts
Hybrid applications may require context switching between native and web views.

## Native vs hybrid
Native apps use platform APIs. Hybrid apps combine native app shells with embedded web content, so context management becomes critical.
