import type { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  stories: ["../(components|features)/**/*.stories.?(ts|tsx|js|jsx)"],
  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
  ],
  reactNative: {
    playFn: false,
  },
};

export default main;
