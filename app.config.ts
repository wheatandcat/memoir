import { ExpoConfig, ConfigContext } from '@expo/config';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

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
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    usesAppleSignIn: true,
    userInterfaceStyle: 'automatic',
    buildNumber: dayjs().unix().toString(),
    bundleIdentifier: 'com.wheatandcat.memoir',
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  android: {
    package: 'com.wheatandcat.memoir',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  description: '',
});
