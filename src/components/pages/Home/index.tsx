import React, { memo, useState } from 'react';
import TemplateHome from 'components/templates/Home/Page.tsx';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import IconButton from 'components/molecules/IconButton';
import View from 'components/atoms/View';
import theme from 'config/theme';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
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

const Home: React.FC<Props> = ({ navigation }) => {
  const [state, setState] = useState<State>(initialState());

  const onItem = () => {};
  const onAddItem = () => {};
  const onMemoir = () => {};

  React.useLayoutEffect(() => {
    navigation.setOptions({
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
  }, [navigation]);

  return (
    <TemplateHome
      onItem={onItem}
      onAddItem={onAddItem}
      onMemoir={onMemoir}
      openSettingModal={state.openSettingModal}
      onCloseSettingModal={() =>
        setState((v) => ({ ...v, openSettingModal: false }))
      }
    />
  );
};

export const HomeScreenOption = () => {
  return {
    title: '',
    headerStyle: {
      backgroundColor: theme().color.primary.main,
    },
  };
};

export default memo(Home);
