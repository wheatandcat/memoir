import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Memoir'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Memoir'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Memoir: React.FC<Props> = (props) => {
  const { startDate, endDate } = props.route.params;

  return <Connected startDate={startDate} endDate={endDate} />;
};

export default memo(Memoir);
