import { describe, it, expect } from 'vitest';
import { LoginScreen } from '../../screens/login-screen.js';
import { remote } from 'webdriverio';
import { getCapabilities } from '../../config/capabilities.js';

describe('Mobile smoke - authentication', () => {
  it('supports login screen interaction contract', async () => {
    const driver = await remote({
      protocol: 'http',
      hostname: 'localhost',
      port: 4723,
      path: '/wd/hub',
      capabilities: getCapabilities(),
    });

    try {
      const loginScreen = new LoginScreen(driver);
      await loginScreen.open();
      await loginScreen.login('demo-user', 'Password123!');
      expect(true).toBe(true);
    } finally {
      await driver.deleteSession();
    }
  });
});
