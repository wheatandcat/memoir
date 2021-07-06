// if you use expo remove this line
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { RecoilRoot } from 'recoil';
import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Notification from './Notification';
import { loadStories } from './storyLoader';

import './rn-addons';

const Stack = createStackNavigator();

// enables knobs for all stories
addDecorator(withKnobs);

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

class StorybookUIHMRRoot extends Component {
  render() {
    return (
      <ActionSheetProvider>
        <Notification>
          <RecoilRoot>
            <NavigationContainer independent={true}>
              <Stack.Navigator>
                <Stack.Screen
                  name="StorybookUIRoot"
                  component={StorybookUIRoot}
                  options={{ header: () => null }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </RecoilRoot>
        </Notification>
      </ActionSheetProvider>
    );
  }
}

export default StorybookUIHMRRoot;
