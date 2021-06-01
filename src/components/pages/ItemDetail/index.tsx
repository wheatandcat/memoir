import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from 'config/theme';
import Connected from './Connected';

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
    <Connected date={props.route.params.date} itemID={props.route.params.id} />
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
