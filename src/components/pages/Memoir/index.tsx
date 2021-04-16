import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import theme from 'config/theme';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import Connected from './Connected';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Memoir'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Memoir'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Memoir: React.FC<Props> = (props) => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: '2021.12.01 - 2021.12.07',
      headerTitleStyle: {
        fontSize: theme().fontSizes.lg,
        fontWeight: theme().fontWeights.bold,
        fontFamily: 'RobotoCondensed-Bold',
      },
    });
  }, [props.navigation]);

  return <Connected />;
};

export default memo(Memoir);
