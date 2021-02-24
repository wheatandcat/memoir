import React, { memo } from 'react';
import TemplateHome from 'components/templates/Setting/Licence/Page.tsx';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SettingLicence'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'SettingLicence'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const SettingLicence: React.FC<Props> = () => {
  return <TemplateHome />;
};

export default memo(SettingLicence);
