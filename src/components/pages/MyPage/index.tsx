import React from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from 'config/theme';
import useSentryBreadcrumb from 'hooks/useSentryBreadcrumb';
import Connected from './Connected';

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyPage'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'MyPage'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const MyPage: React.FC<Props> = () => {
  useSentryBreadcrumb();

  return <Connected />;
};

export const MyPageScreenOption = (title: string) => {
  return {
    title,
    headerStyle: {
      backgroundColor: theme().color.primary.main,
    },
    headerBackTitleVisible: false,
    headerTintColor: theme().color.secondary.main,
  };
};

export default MyPage;
