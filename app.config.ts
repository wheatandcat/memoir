import type { ConfigContext, ExpoConfig } from "@expo/config";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import "dotenv/config";

const version: string = "1.8.0";
const unix = dayjs().unix().toString();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  newArchEnabled: true,
  extra: {
    API_HOST: process.env.API_HOST,
    FIRE_BASE_API_KEY: process.env.FIRE_BASE_API_KEY,
    FIRE_BASE_AUTH_DOMAIN: process.env.FIRE_BASE_AUTH_DOMAIN,
    FIRE_BASE_PROJECT_ID: process.env.FIRE_BASE_PROJECT_ID,
    FIRE_BASE_STORAGE_BUCKET: process.env.FIRE_BASE_STORAGE_BUCKET,
    FIRE_BASE_MESSAGING_SENDER_ID: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
    FIRE_BASE_APP_ID: process.env.FIRE_BASE_APP_ID,
    FIRE_BASE_MEASUREMENT_ID: process.env.FIRE_BASE_MEASUREMENT_ID,
    WEB_GOOGLE_CLIENT_ID: process.env.WEB_GOOGLE_CLIENT_ID,
    SENTRY_DSN: process.env.SENTRY_DSN,
    STORAGE_URL: process.env.STORAGE_URL,
    IMAGE_MERGE_API: process.env.IMAGE_MERGE_API,
    INQUIRY_API: process.env.INQUIRY_API,
    APP_ENV: process.env.APP_ENV,
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    eas: {
      projectId: "bfea9b28-88f3-4e5a-a351-d8ea456c0830",
    },
  },
  name: "memoir",
  scheme: "com.wheatandcat.memoir",
  slug: "memoir",
  version,
  orientation: "portrait",
  icon: "./assets/ios-icon.png",
  jsEngine: "hermes",
  updates: {
    enabled: false,
    checkAutomatically: "ON_LOAD",
    fallbackToCacheTimeout: 30000,
  },
  notification: {
    icon: "./assets/notification.png",
    color: "#E3C95D",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false,
    usesAppleSignIn: true,
    userInterfaceStyle: "automatic",
    buildNumber: unix,
    bundleIdentifier: "com.wheatandcat.memoir",
    googleServicesFile: "./GoogleService-Info.plist",
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      NSPhotoLibraryUsageDescription: "ユーザーの画像設定に使用します",
      NSCameraUsageDescription:
        "ユーザーの画像設定のためにカメラを使用します。",
      NSMicrophoneUsageDescription:
        "ユーザーの画像設定のためにカメラを使用します。",
      CFBundleDevelopmentRegion: "ja_JP",
    },
  },
  android: {
    package: "com.wheatandcat.memoir",
    googleServicesFile: "./google-services.json",
    permissions: [
      "CAMERA",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
      "RECEIVE_BOOT_COMPLETED",
    ],
    versionCode: Number(unix.substring(0, unix.length - 3)),
    adaptiveIcon: {
      backgroundColor: "#E3C95D",
      foregroundImage: "./assets/android-icon.png",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    "expo-apple-authentication",
    "@react-native-google-signin/google-signin",
    "expo-asset",
    [
      "expo-font",
      {
        fonts: [
          "node_modules/@expo-google-fonts/roboto-condensed/RobotoCondensed_700Bold.ttf",
          "node_modules/@expo-google-fonts/noto-sans-jp/NotoSansJP_700Bold.ttf",
        ],
      },
    ],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#E3C95D",
        image: "./assets/splash.png",
        dark: {
          image: "./assets/splash.png",
          backgroundColor: "#E3C95D",
        },
        resizeMode: "contain",
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        organization: process.env.SENTRY_ORGANIZATION,
        project: process.env.SENTRY_PROJECT,
      },
    ],
  ],
  description: "",
});
