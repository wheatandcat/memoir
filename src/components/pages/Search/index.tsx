import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Connected from './Connected';

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Search: React.FC<Props> = () => {
  return <Connected />;
};

export default memo(Search);
