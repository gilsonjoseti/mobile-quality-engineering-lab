# Interview Questions and Answers

## Question 1: Why Appium instead of only one platform-specific tool?
Answer: Appium provides a cross-platform approach for Android and iOS with a consistent automation model, which reduces tool sprawl and improves maintainability.

## Question 2: Why use risk-based testing?
Answer: Because not all flows have the same impact. Authentication and financial operations deserve higher automation priority and more aggressive release confidence checks.

## Question 3: How do you handle flaky tests?
Answer: By identifying retries, root causes, isolation issues, and applying quarantine with documented remediation and evidence.

## Question 4: Why device farms?
Answer: Because device fragmentation makes local-only testing insufficient for broad confidence in Android and iOS ecosystems.

## Question 5: When do you choose Appium vs Maestro?
Answer: Appium is preferred for deeper UI automation and custom flows; Maestro is ideal for fast smoke validation and business flow readability.
