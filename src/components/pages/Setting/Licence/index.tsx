import React, { memo } from 'react';
import TemplateHome from 'components/templates/Setting/Licence/Page';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useSentryBreadcrumb from 'hooks/useSentryBreadcrumb';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SettingLicence'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'SettingLicence'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const SettingLicence: React.FC<Props> = () => {
  useSentryBreadcrumb();

  return <TemplateHome />;
};

export default memo(SettingLicence);
