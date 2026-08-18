import type { Browser } from 'webdriverio';
import { BaseScreen, type Locator } from '../base/base-screen.js';

export class TransactionScreen extends BaseScreen {
  private readonly transferButton: Locator = { strategy: 'accessibility id', value: 'transferButton' };
  private readonly amountInput: Locator = { strategy: 'accessibility id', value: 'amountInput' };
  private readonly reviewTransferButton: Locator = { strategy: 'accessibility id', value: 'reviewTransfer' };
  private readonly confirmTransferButton: Locator = { strategy: 'accessibility id', value: 'confirmTransfer' };
  private readonly operationStatus: Locator = { strategy: 'accessibility id', value: 'operationSuccess' };

  constructor(driver: Browser) {
    super(driver);
  }

  async startTransfer() {
    await this.tap(this.transferButton);
  }

  async enterAmount(amount: string) {
    await this.type(this.amountInput, amount);
  }

  async reviewTransfer() {
    await this.tap(this.reviewTransferButton);
  }

  async confirmTransfer() {
    await this.tap(this.confirmTransferButton);
  }

  async isOperationSuccessful() {
    return this.isDisplayed(this.operationStatus);
  }
}
