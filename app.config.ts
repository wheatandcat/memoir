import { ExpoConfig, ConfigContext } from '@expo/config';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
require('dotenv').config();

const version: string = '1.2.0';
const unix = dayjs().unix().toString();

const appConfig = () => {
  const ios: any = {};
  const android: any = {};
  if (process.env.IOS_GOOGLE_SERVICES_FILE) {
    ios.googleServicesFile = process.env.IOS_GOOGLE_SERVICES_FILE;
  }
  if (process.env.ANDROID_GOOGLE_SERVICES_FILE) {
    android.googleServicesFile = process.env.ANDROID_GOOGLE_SERVICES_FILE;
  }

  return { ios, android };
};

console.log('process.env.API_HOST:', process.env.API_HOST);

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    API_HOST: process.env.API_HOST,
    FIRE_BASE_API_KEY: process.env.FIRE_BASE_API_KEY,
    FIRE_BASE_AUTH_DOMAIN: process.env.FIRE_BASE_AUTH_DOMAIN,
    FIRE_BASE_PROJECT_ID: process.env.FIRE_BASE_PROJECT_ID,
    FIRE_BASE_STORAGE_BUCKET: process.env.FIRE_BASE_STORAGE_BUCKET,
    FIRE_BASE_MESSAGING_SENDER_ID: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
    FIRE_BASE_APP_ID: process.env.FIRE_BASE_APP_ID,
    FIRE_BASE_MEASUREMENT_ID: process.env.FIRE_BASE_MEASUREMENT_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    EXPO_GOOGLE_CLIENT_ID: process.env.EXPO_GOOGLE_CLIENT_ID,
    ANDROID_GOOGLE_CLIENT_ID: process.env.ANDROID_GOOGLE_CLIENT_ID,
    SENTRY_DSN: process.env.SENTRY_DSN,
    STORAGE_URL: process.env.STORAGE_URL,
    IMAGE_MERGE_API: process.env.IMAGE_MERGE_API,
    INQUIRY_API: process.env.INQUIRY_API,
    ENV: process.env.NODE_ENV,
  },
  name: 'memoir',
  scheme: 'com.wheatandcat.memoir',
  slug: 'memoir',
  version,
  orientation: 'portrait',
  icon: './assets/ios-icon.png',
  jsEngine: 'hermes',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#E3C95D',
  },
  updates: {
    enabled: false,
    checkAutomatically: 'ON_LOAD',
    fallbackToCacheTimeout: 30000,
  },
  notification: {
    icon: './assets/notification.png',
    color: '#E3C95D',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    ...appConfig().ios,
    supportsTablet: false,
    usesAppleSignIn: true,
    userInterfaceStyle: 'automatic',
    buildNumber: unix,
    bundleIdentifier: 'com.wheatandcat.memoir',
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      NSPhotoLibraryUsageDescription: 'ユーザーの画像設定に使用します',
      NSCameraUsageDescription:
        'ユーザーの画像設定のためにカメラを使用します。',
      NSMicrophoneUsageDescription:
        'ユーザーの画像設定のためにカメラを使用します。',
      CFBundleDevelopmentRegion: 'ja_JP',
    },
  },
  android: {
    ...appConfig().android,
    package: 'com.wheatandcat.memoir',
    permissions: [
      'CAMERA',
      'READ_EXTERNAL_STORAGE',
      'WRITE_EXTERNAL_STORAGE',
      'RECEIVE_BOOT_COMPLETED',
    ],
    versionCode: Number(unix.substring(0, unix.length - 3)),
    adaptiveIcon: {
      backgroundColor: '#E3C95D',
      foregroundImage: './assets/android-icon.png',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  description: '',
  hooks: {
    postPublish: [
      {
        file: 'sentry-expo/upload-sourcemaps',
        config: {
          organization: process.env.SENTRY_ORGANIZATION,
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
});
