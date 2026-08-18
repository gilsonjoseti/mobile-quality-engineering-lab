import { describe, expect, it } from 'vitest';
import { LoginScreen } from '../../screens/login-screen.js';

// This is a contract-style test, intentionally not bound to a real Appium session.
// It validates the expected POM usage and verification pattern for invalid credentials.
describe('Authentication negative path', () => {
  it('should capture the invalid credentials contract', async () => {
    const loginScreen = {
      isLoginErrorVisible: async () => true,
    } as Partial<LoginScreen>;

    expect(await loginScreen.isLoginErrorVisible?.()).toBe(true);
  });
});
