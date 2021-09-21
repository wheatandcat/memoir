import React, { useState } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import useSentryBreadcrumb from 'hooks/useSentryBreadcrumb';
import IconButton from 'components/molecules/IconButton';
import View from 'components/atoms/View';
import theme from 'config/theme';
import ItemDetail from 'components/pages/ItemDetail';
import Connected from './Connected';

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

type State = {
  openSettingModal: boolean;
};

const initialState = (): State => ({
  openSettingModal: false,
});

export const Home: React.FC<Props> = (props) => {
  useSentryBreadcrumb();
  const [state, setState] = useState<State>(initialState());

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View pr={2} pb={1}>
          <IconButton
            name="more-vert"
            size="base"
            onPress={() => setState((v) => ({ ...v, openSettingModal: true }))}
          />
        </View>
      ),
    });
  }, [props.navigation]);

  return (
    <Connected
      {...props}
      openSettingModal={state.openSettingModal}
      onCloseSettingModal={() =>
        setState((v) => ({ ...v, openSettingModal: false }))
      }
    />
  );
};

export const HomeScreenOption = (title: string = '') => {
  return {
    title,
    headerStyle: {
      backgroundColor: theme().color.primary.main,
    },
    headerBackTitleVisible: false,
    headerTintColor: theme().color.secondary.main,
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={HomeScreenOption()} />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetail}
        options={HomeScreenOption()}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
