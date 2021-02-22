import React, { memo, useCallback } from 'react';
import TemplateHome from 'components/templates/Memoir/Page.tsx';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'dayjs';
import theme from 'config/theme';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Memoir'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Memoir'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Memoir: React.FC<Props> = (props) => {
  const onItem = useCallback(() => {}, []);

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

  return <TemplateHome onItem={onItem} />;
};

export default memo(Memoir);
