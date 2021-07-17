import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Login: React.FC<Props> = () => {
  return <Connected />;
};

export default memo(Login);
