#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const targetEnvironment = process.env.TARGET_ENVIRONMENT ?? 'ci';
const reportPath = path.join(process.cwd(), 'reports', 'quality-summary.json');

const thresholds = {
  local: {
    passRate: 80,
    smoke: 80,
    critical: 80,
  },
  ci: {
    passRate: 95,
    smoke: 100,
    critical: 98,
  },
  nightly: {
    passRate: 95,
    smoke: 100,
    critical: 98,
  },
  release: {
    passRate: 100,
    smoke: 100,
    critical: 100,
  },
};

if (!fs.existsSync(reportPath)) {
  console.error(`Evidence report not found at ${reportPath}. Run the report step before gating.`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const config = thresholds[targetEnvironment] ?? thresholds.ci;
const actual = {
  passRate: Number(report.summary?.passRate ?? 0),
  smoke: Number(report.qualityGates?.smoke?.actual ?? 0),
  critical: Number(report.qualityGates?.critical?.actual ?? 0),
};

const failures = [];

if (actual.passRate < config.passRate) failures.push(`passRate ${actual.passRate}% is below ${config.passRate}%`);
if (actual.smoke < config.smoke) failures.push(`smoke gate ${actual.smoke}% is below ${config.smoke}%`);
if (actual.critical < config.critical) failures.push(`critical gate ${actual.critical}% is below ${config.critical}%`);

const evidencePath = path.join(process.cwd(), 'reports', 'artifacts', 'evidence-bundle.json');
if (!fs.existsSync(evidencePath)) {
  failures.push(`Evidence bundle missing: ${evidencePath}`);
}

if (failures.length > 0) {
  console.error(`Environment gate failed for ${targetEnvironment}.`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Environment gate passed for ${targetEnvironment}.`);
console.log(JSON.stringify({ targetEnvironment, actual, required: config }, null, 2));
