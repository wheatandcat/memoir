import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home, { HomeScreenOption } from 'components/pages/Home';
import ItemDetail from 'components/pages/ItemDetail';
import Memoir from 'components/pages/Memoir';
import SettingLicence from 'components/pages/Setting/Licence';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={HomeScreenOption()}
        />
        <Stack.Screen
          name="ItemDetail"
          component={ItemDetail}
          options={HomeScreenOption()}
        />
        <Stack.Screen
          name="Memoir"
          component={Memoir}
          options={HomeScreenOption()}
        />
        <Stack.Screen
          name="SettingLicence"
          component={SettingLicence}
          options={HomeScreenOption()}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
