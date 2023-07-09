import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RecoilRoot } from 'recoil';
import Notification from './Notification';

const Stack = createStackNavigator();

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ActionSheetProvider>
      <Notification>
        <RecoilRoot>
          <NavigationContainer independent={true}>
            <Stack.Navigator>
              <Stack.Screen name="StorybookUIRoot" component={Story} />
            </Stack.Navigator>
          </NavigationContainer>
        </RecoilRoot>
      </Notification>
    </ActionSheetProvider>
  ),
];
