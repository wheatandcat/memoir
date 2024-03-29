import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MemoirScreenShot'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'MemoirScreenShot'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const MemoirScreenShot: React.FC<Props> = (props) => {
  const { startDate, endDate, selectedUserIDList, categoryID, like, dislike } =
    props.route.params;

  return (
    <Connected
      startDate={startDate}
      endDate={endDate}
      selectedUserIDList={selectedUserIDList}
      categoryID={categoryID}
      like={like}
      dislike={dislike}
    />
  );
};

export default memo(MemoirScreenShot);
