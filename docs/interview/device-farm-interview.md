# Device Farm Interview Guide

## Why Device Farm
Device farms provide real-device and emulator coverage at scale, reducing local infrastructure cost and enabling wider platform verification.

## Device fragmentation
Mobile testing must cover OS versions, manufacturers, screen sizes, and hardware differences that cannot be reproduced in a single local environment.

## Real devices vs emulators
Real devices best represent production behavior, while emulators offer quick and cost-effective early validation. A combined strategy provides better coverage.

## Device Matrix
Prioritize coverage by business risk, usage popularity, and execution cost.

## Parallel execution
Cloud device farms allow parallel execution, which accelerates feedback and supports nightly or release validation workflows.

## Cost optimization
Use Tier 1 on PRs, Tier 2 nightly, and Tier 3 for candidate or release gates to manage cost effectively.
