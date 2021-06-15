import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SettingRelationshipRequests'
>;
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  'SettingRelationshipRequests'
>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const SettingRelationshipRequests: React.FC<Props> = (props) => {
  return <Connected onCallback={props.route.params.onCallback} />;
};

export default memo(SettingRelationshipRequests);
