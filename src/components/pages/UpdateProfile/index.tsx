import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UpdateProfile'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'UpdateProfile'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const UpdateProfile: React.FC<Props> = () => {
  return <Connected />;
};

export default memo(UpdateProfile);
