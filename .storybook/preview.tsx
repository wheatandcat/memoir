import { MockedProvider } from "@apollo/client/testing";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import type { Preview } from "@storybook/react";
import React from "react";
import Notification from "../containers/Notification";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ActionSheetProvider>
        <MockedProvider>
          <Notification>
            <Story />
          </Notification>
        </MockedProvider>
      </ActionSheetProvider>
    ),
  ],
};

export default preview;
