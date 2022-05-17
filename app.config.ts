import { ExpoConfig, ConfigContext } from '@expo/config';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { appConfig } from './appConfig';

const version: string = '1.2.0';
const unix = dayjs().unix().toString();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'memoir',
  scheme: 'com.wheatandcat.memoir',
  slug: 'memoir',
  version,
  orientation: 'portrait',
  icon: './assets/ios-icon.png',
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
          organization: appConfig().SENTRY_ORGANIZATION,
          project: appConfig().SENTRY_PROJECT,
          authToken: appConfig().SENTRY_AUTH_TOKEN,
        },
      },
    ],
  },
});
