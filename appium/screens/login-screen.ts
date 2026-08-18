import type { Browser } from 'webdriverio';
import { BaseScreen, type Locator } from '../base/base-screen.js';

export class LoginScreen extends BaseScreen {
  private readonly usernameInput: Locator = { strategy: 'accessibility id', value: 'usernameInput' };
  private readonly passwordInput: Locator = { strategy: 'accessibility id', value: 'passwordInput' };
  private readonly loginButton: Locator = { strategy: 'accessibility id', value: 'loginButton' };
  private readonly invalidCredentialsMessage: Locator = {
    strategy: 'accessibility id',
    value: 'invalidCredentialsMessage',
  };

  constructor(driver: Browser) {
    super(driver);
  }

  async open() {
    await this.waitForVisible(this.usernameInput, 15000);
  }

  async login(username: string, password: string) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.tap(this.loginButton);
  }

  async loginWithValidCredentials() {
    await this.login('demo-user', 'Password123!');
  }

  async isLoginErrorVisible() {
    return this.isDisplayed(this.invalidCredentialsMessage);
  }
}
