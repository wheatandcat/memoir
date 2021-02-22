import React, { memo, useState, useCallback } from 'react';
import TemplateHome from 'components/templates/Home/Page.tsx';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import IconButton from 'components/molecules/IconButton';
import View from 'components/atoms/View';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

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

const Home: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  const onItem = useCallback(() => {
    props.navigation.navigate('ItemDetail');
  }, [props.navigation]);

  const onMemoir = useCallback(() => {
    props.navigation.navigate('Memoir');
  }, [props.navigation]);

  const onChangeDate = useCallback(() => {}, []);

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
    <TemplateHome
      date={dayjs().format('YYYY-MM-DD')}
      onItem={onItem}
      onMemoir={onMemoir}
      openSettingModal={state.openSettingModal}
      onCloseSettingModal={() =>
        setState((v) => ({ ...v, openSettingModal: false }))
      }
      onChangeDate={onChangeDate}
    />
  );
};

export const HomeScreenOption = () => {
  return {
    title: '',
    headerStyle: {
      backgroundColor: theme().color.primary.main,
      color: theme().color.secondary.main,
    },
    headerBackTitleVisible: false,
    headerTintColor: theme().color.secondary.main,
  };
};

export default memo(Home);
