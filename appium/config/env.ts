import 'dotenv/config';

export type AppPlatform = 'android' | 'ios';
export type AppEnvironment = 'local' | 'dev' | 'qa' | 'staging';

const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'local',
  APP_ENV: (process.env.APP_ENV as AppEnvironment) ?? 'local',
  PLATFORM: (process.env.PLATFORM as AppPlatform) ?? 'android',
  DEVICE_NAME: process.env.DEVICE_NAME ?? 'Pixel_5_Emulator',
  APP_PACKAGE: process.env.APP_PACKAGE ?? 'com.example.financeapp',
  APP_ACTIVITY: process.env.APP_ACTIVITY ?? '.MainActivity',
  APP_PATH: process.env.APP_PATH ?? './apps/demo-finance.apk',
  ANDROID_HOME: process.env.ANDROID_HOME ?? '',
  JAVA_HOME: process.env.JAVA_HOME ?? '',
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'info',
};

export const config = env;

export const isAndroid = env.PLATFORM === 'android';
export const isIOS = env.PLATFORM === 'ios';
