// if you use expo remove this line
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { RecoilRoot } from 'recoil';
import { getStorybookUI, configure } from '@storybook/react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'loki/configure-react-native';
import Notification from './Notification';
import Config from 'containers/Config';
import { loadStories } from './storyLoader';

const Stack = createStackNavigator();

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  onDeviceUI: false,
});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

class StorybookUIHMRRoot extends Component {
  render() {
    return (
      <ActionSheetProvider>
        <Config>
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
        </Config>
      </ActionSheetProvider>
    );
  }
}

export default StorybookUIHMRRoot;
