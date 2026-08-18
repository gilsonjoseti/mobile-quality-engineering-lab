import type { Browser, ChainablePromiseElement } from 'webdriverio';

export type Locator = {
  strategy: 'accessibility id' | 'id' | 'xpath' | 'name';
  value: string;
};

export abstract class BaseScreen {
  protected driver: Browser;

  constructor(driver: Browser) {
    this.driver = driver;
  }

  protected async waitForVisible(locator: Locator, timeout = 20000): Promise<void> {
    await this.driver.waitUntil(
      async () => {
        const element = await this.find(locator);
        return await element.isDisplayed();
      },
      {
        timeout,
        timeoutMsg: `Element not visible: ${locator.value}`,
      },
    );
  }

  protected async waitForEnabled(locator: Locator, timeout = 20000): Promise<void> {
    await this.driver.waitUntil(
      async () => {
        const element = await this.find(locator);
        return await element.isEnabled();
      },
      {
        timeout,
        timeoutMsg: `Element not enabled: ${locator.value}`,
      },
    );
  }

  protected async find(locator: Locator): Promise<ChainablePromiseElement> {
    const selector = (() => {
      switch (locator.strategy) {
        case 'accessibility id':
          return `~${locator.value}`;
        case 'id':
          return `id=${locator.value}`;
        case 'name':
          return `name=${locator.value}`;
        case 'xpath':
          return locator.value;
        default:
          return locator.value;
      }
    })();

    return this.driver.$(selector);
  }

  protected async tap(locator: Locator): Promise<void> {
    const element = await this.find(locator);
    await element.waitForDisplayed({ timeout: 20000 });
    await element.click();
  }

  protected async type(locator: Locator, value: string): Promise<void> {
    const element = await this.find(locator);
    await element.waitForDisplayed({ timeout: 20000 });
    await element.clearValue();
    await element.setValue(value);
  }

  protected async isDisplayed(locator: Locator): Promise<boolean> {
    try {
      const element = await this.find(locator);
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  protected async getText(locator: Locator): Promise<string> {
    const element = await this.find(locator);
    await this.waitForVisible(locator);
    return (await element.getText()) || '';
  }

  protected async hideKeyboard(): Promise<void> {
    try {
      await this.driver.hideKeyboard();
    } catch {
      // Intentionally ignored for platforms without keyboard.
    }
  }

  protected async scroll(direction: 'up' | 'down' | 'left' | 'right', percent = 0.5): Promise<void> {
    await this.driver.execute('mobile: scroll', { direction, percent });
  }

  protected async swipe(startX: number, startY: number, endX: number, endY: number): Promise<void> {
    await this.driver.touchAction({
      action: 'press',
      x: startX,
      y: startY,
    });
    await this.driver.touchAction({
      action: 'moveTo',
      x: endX,
      y: endY,
    });
    await this.driver.touchAction({ action: 'release' });
  }

  protected async takeScreenshot(name: string): Promise<void> {
    const screenshotDir = './reports/screenshots';
    const fileName = `${name}-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
    const data = await this.driver.takeScreenshot();

    await import('node:fs/promises').then(async (fs) => {
      await fs.mkdir(screenshotDir, { recursive: true });
      await fs.writeFile(`${screenshotDir}/${fileName}`, data, 'base64');
    });
  }
}
