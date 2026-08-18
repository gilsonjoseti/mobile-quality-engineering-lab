import type { Browser } from 'webdriverio';
import { BaseScreen, type Locator } from '../base/base-screen.js';

export class HomeScreen extends BaseScreen {
  private readonly homeScreen: Locator = { strategy: 'accessibility id', value: 'homeScreen' };
  private readonly balanceLabel: Locator = { strategy: 'accessibility id', value: 'balanceLabel' };
  private readonly logoutButton: Locator = { strategy: 'accessibility id', value: 'logoutButton' };

  constructor(driver: Browser) {
    super(driver);
  }

  async open() {
    await this.waitForVisible(this.homeScreen, 20000);
  }

  async getBalanceText() {
    return this.getText(this.balanceLabel);
  }

  async logout() {
    await this.tap(this.logoutButton);
  }
}
