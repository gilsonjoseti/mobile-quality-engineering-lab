#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const reportsDir = path.join(root, 'reports');
const artifactsDir = path.join(reportsDir, 'artifacts');
const screenshotsDir = path.join(reportsDir, 'screenshots');
const logsDir = path.join(reportsDir, 'logs');

for (const dir of [reportsDir, artifactsDir, screenshotsDir, logsDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const appPath = process.env.APP_PATH ?? './apps/demo-finance.apk';
const platform = process.env.PLATFORM ?? 'android';
const appiumUrl = 'http://localhost:4723/wd/hub';

const issues = [];

if (!fs.existsSync(path.join(root, appPath))) {
  issues.push(`Real app artifact not found: ${appPath}`);
}

if (platform !== 'android' && platform !== 'ios') {
  issues.push(`Unsupported platform: ${platform}`);
}

const checkPort = () => {
  try {
    const http = require('node:http');
    return new Promise((resolve) => {
      const req = http.get(appiumUrl, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 500 ? 'available' : 'unexpected');
      });
      req.on('error', () => resolve('unavailable'));
      req.setTimeout(2000, () => {
        req.destroy();
        resolve('unavailable');
      });
    });
  } catch {
    return Promise.resolve('unavailable');
  }
};

const main = async () => {
  const portStatus = await checkPort();

  if (portStatus !== 'available') {
    issues.push(`Appium server not responding at ${appiumUrl}. Start Appium before running the real mobile suite.`);
  }

  const summary = {
    project: 'Mobile Quality Engineering Lab',
    generatedAt: new Date().toISOString(),
    environment: {
      platform,
      appPath,
      appiumUrl,
      target: process.env.TARGET_ENVIRONMENT ?? 'ci',
    },
    readiness: {
      appArtifact: fs.existsSync(path.join(root, appPath)) ? 'ready' : 'missing',
      appium: portStatus === 'available' ? 'ready' : 'missing',
    },
    qualityGate: issues.length === 0 ? 'ready' : 'blocked',
    blockers: issues,
  };

  fs.writeFileSync(path.join(reportsDir, 'quality-runner-summary.json'), JSON.stringify(summary, null, 2));

  if (issues.length > 0) {
    console.log('Real mobile execution is blocked by the following prerequisites:');
    for (const issue of issues) {
      console.log(`- ${issue}`);
    }
    process.exit(1);
  }

  console.log('Real mobile execution environment is ready.');
  console.log(`App artifact: ${appPath}`);
  console.log(`Appium endpoint: ${appiumUrl}`);
  console.log(`Artifacts written to: ${reportsDir}`);
};

main().catch((error) => {
  console.error('Quality runner error:', error.message);
  process.exit(1);
});
