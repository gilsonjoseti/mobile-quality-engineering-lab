# Mobile-Specific Testing Strategy

## Permissions
- Validate app requests and user consent flows
- Confirm denied permission behavior

## Notifications
- Verify push and local notification handling
- Validate permission request states

## Deep links
- Confirm navigation from external sources to expected in-app screens

## Background and foreground
- Validate resume behavior and state persistence
- Confirm session continuity after app switching

## Network interruption
- Validate offline/online mode transitions
- Confirm user experience and error handling

## Session timeout
- Verify re-authentication flows
- Validate the expiry handling and state transitions

## Screen rotation
- Confirm layout stability and state preservation
- Validate content reflow

## Keyboard
- Validate input handling and hidden keyboard states

## Biometrics
- Confirm secure authentication flow and fallback behavior

## App lifecycle
- Validate startup, background, resume, and termination states
