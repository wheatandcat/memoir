const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { mergeConfig } = require("@react-native/metro-config");
const withStorybook = require("@storybook/react-native/metro/withStorybook");

const STORYBOOK_ENABLED = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";

const baseConfig = getSentryExpoConfig(__dirname);

const customConfig = {
  resolver: {
    // Storybook v8 以降で必須
    unstable_enablePackageExports: true,
  },
};

// Storybook をバンドルに含めるか切り離すかをここで制御
module.exports = withStorybook(mergeConfig(baseConfig, customConfig), {
  enabled: STORYBOOK_ENABLED,
  onDisabledRemoveStorybook: !STORYBOOK_ENABLED,
});
