import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import Connected from './Connected';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ItemDetail'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const ItemDetail: React.FC<Props> = (props) => {
  return (
    <Connected
      date={props.route.params.date}
      itemID={props.route.params.id}
      onChangeDate={props.route.params.onChangeDate}
    />
  );
};

export const ItemDetailScreenOption = () => {
  return {
    title: '',
    headerStyle: {
      backgroundColor: theme().color.primary.main,
    },
  };
};

export default memo(ItemDetail);
