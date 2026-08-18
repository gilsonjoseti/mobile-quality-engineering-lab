import { config, isAndroid, isIOS } from './env.js';

export type AppiumCapabilitySet = {
  platformName: string;
  automationName: string;
  deviceName: string;
  app?: string;
  appPackage?: string;
  appActivity?: string;
  noReset?: boolean;
  fullReset?: boolean;
  newCommandTimeout?: number;
};

export const getCapabilities = (): AppiumCapabilitySet => {
  if (isAndroid) {
    return {
      platformName: 'Android',
      automationName: 'UiAutomator2',
      deviceName: config.DEVICE_NAME,
      app: config.APP_PATH,
      appPackage: config.APP_PACKAGE,
      appActivity: config.APP_ACTIVITY,
      noReset: false,
      fullReset: false,
      newCommandTimeout: 180,
    };
  }

  if (isIOS) {
    return {
      platformName: 'iOS',
      automationName: 'XCUITest',
      deviceName: 'iPhone Simulator',
      app: config.APP_PATH,
      noReset: false,
      fullReset: false,
      newCommandTimeout: 180,
    };
  }

  throw new Error('Unsupported platform configuration. Set PLATFORM=android or PLATFORM=ios');
};

export const getDeviceFarmCapabilities = (provider: 'browserstack' | 'firebase' | 'aws') => {
  switch (provider) {
    case 'browserstack':
      return {
        platformName: 'Android',
        automationName: 'UiAutomator2',
        deviceName: 'Samsung Galaxy S21',
        project: 'mobile-quality-engineering-lab',
        build: 'qa-build',
        'browserstack.user': process.env.BROWSERSTACK_USERNAME ?? '',
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY ?? '',
      };
    case 'firebase':
      return {
        platformName: 'Android',
        automationName: 'UiAutomator2',
        deviceName: 'android-google-apis-arm64',
        project: 'firebase-test-lab-demo',
      };
    case 'aws':
      return {
        platformName: 'Android',
        automationName: 'UiAutomator2',
        deviceName: 'Pixel_6',
        appiumVersion: '2.5.3',
      };
    default:
      throw new Error(`Unsupported device farm provider: ${provider}`);
  }
};
