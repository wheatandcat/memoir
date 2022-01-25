import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import dayjs from 'lib/dayjs';
import useSentryBreadcrumb from 'hooks/useSentryBreadcrumb';
import Connected from './Connected';

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Memoir'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Memoir'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Memoir: React.FC<Props> = (props) => {
  useSentryBreadcrumb();
  const { startDate, endDate, userIDList, categoryID, like, dislike, search } =
    props.route.params;

  return (
    <Connected
      startDate={
        startDate || dayjs().add(-6, 'day').format('YYYY-MM-DDT00:00:00+09:00')
      }
      endDate={endDate || dayjs().format('YYYY-MM-DDT00:00:00+09:00')}
      userIDList={userIDList}
      categoryID={categoryID || 0}
      like={like ?? true}
      dislike={dislike ?? true}
      search={search || false}
    />
  );
};

export default memo(Memoir);
