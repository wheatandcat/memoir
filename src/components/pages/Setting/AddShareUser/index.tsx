import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useSentryBreadcrumb from 'hooks/useSentryBreadcrumb';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SettingAddShareUser'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'SettingAddShareUser'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const SettingAddShareUser: React.FC<Props> = () => {
  useSentryBreadcrumb();

  return <Connected />;
};

export default memo(SettingAddShareUser);
