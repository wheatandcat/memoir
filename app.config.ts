import { ExpoConfig, ConfigContext } from '@expo/config';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { appConfig } from './scripts/appConfig';

const version: string = '1.0.0';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'memoir',
  scheme: 'memoir',
  slug: 'memoir',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#E3C95D',
  },
  updates: {
    enabled: true,
    checkAutomatically: 'ON_LOAD',
    fallbackToCacheTimeout: 30000,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    googleServicesFile: './ios/GoogleService-Info.plist',
    supportsTablet: true,
    usesAppleSignIn: true,
    userInterfaceStyle: 'automatic',
    buildNumber: dayjs().unix().toString(),
    bundleIdentifier: 'com.wheatandcat.memoir',
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      NSPhotoLibraryUsageDescription: 'ユーザーの画像設定に使用します',
      NSCameraUsageDescription:
        'ユーザーの画像設定のためにカメラを使用します。',
      CFBundleDevelopmentRegion: 'ja_JP',
    },
  },
  android: {
    package: 'com.wheatandcat.memoir',
    googleServicesFile: './android/google-services.json',
    versionCode: Number(version.replace('.', '')),
    adaptiveIcon: {
      backgroundColor: '#E3C95D',
      foregroundImage: './assets/adaptive-icon.png',
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
