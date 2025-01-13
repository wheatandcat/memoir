import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SettingDataManagement'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'SettingDataManagement'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const DataManagement: React.FC<Props> = () => {
  return <Connected />;
};

export default memo(DataManagement);
