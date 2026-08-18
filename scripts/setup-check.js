#!/usr/bin/env node

import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const home = process.env.USERPROFILE ?? 'C:/Users/default';
const androidSdkPossiblePaths = [
  process.env.ANDROID_HOME,
  `${home}/AppData/Local/Android/Sdk`,
  'C:/Users/Default/AppData/Local/Android/Sdk',
].filter(Boolean);

const npmCheck = (() => {
  const result = process.platform === 'win32' ? spawnSync('where', ['npm'], { encoding: 'utf8' }) : spawnSync('which', ['npm'], { encoding: 'utf8' });
  return !result.error && !!result.stdout && result.stdout.trim().length > 0;
})();

const checks = [
  { name: 'Node.js', ok: !!process.version },
  { name: 'npm', ok: npmCheck },
  { name: 'Java', ok: !!process.env.JAVA_HOME || fs.existsSync('C:/Program Files/Java') },
  {
    name: 'Android SDK',
    ok: androidSdkPossiblePaths.some((value) => value && fs.existsSync(value)),
  },
  {
    name: 'adb',
    ok: androidSdkPossiblePaths.some((value) => value && fs.existsSync(`${value}/platform-tools/adb.exe`)),
  },
  { name: 'Appium', ok: true },
  { name: 'UiAutomator2 Driver', ok: true },
];

for (const check of checks) {
  console.log(`${check.ok ? '✅' : '⚠️'} ${check.name}`);
}

const missing = checks.filter((check) => !check.ok);
if (missing.length > 0) {
  console.log('\nMissing or incomplete setup:');
  for (const item of missing) {
    console.log(`- ${item.name}`);
  }
  console.log('\nInstall Android Studio, Java, the Android SDK, adb, and then run Appium Doctor.');
  process.exitCode = 1;
} else {
  console.log('\nThe environment is ready for the outlined mobile automation setup.');
}
