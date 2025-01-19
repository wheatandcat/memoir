---
to: <%= absPath %>/index.tsx
---
import React, { memo } from 'react';
import { RootStackParamList } from '@/lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  '<%= navigationName %>'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, '<%= navigationName %>'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const <%= navigationName %>: React.FC<Props> = (props) => {
  return <Connected />;
};

export default memo(<%= navigationName %>);
