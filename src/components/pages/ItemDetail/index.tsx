import React, { memo, useCallback } from 'react';
import TemplateItemDetail from 'components/templates/ItemDetail/Page';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from 'config/theme';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

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

const ItemDetail: React.FC<Props> = () => {
  const onChangeDate = useCallback(() => {}, []);

  return (
    <TemplateItemDetail
      date={dayjs().format('YYYY-MM-DD')}
      onChangeDate={onChangeDate}
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
