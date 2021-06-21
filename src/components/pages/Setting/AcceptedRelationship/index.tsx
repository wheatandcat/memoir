import React, { memo } from 'react';
import { RootStackParamList } from 'lib/navigation';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRecoilValue } from 'recoil';
import { userState } from 'store/atoms';
import TemplateSettingAcceptedRelationship from 'components/templates/Setting/AcceptedRelationship/Page';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SettingAcceptedRelationship'
>;
type ScreenRouteProp = RouteProp<
  RootStackParamList,
  'SettingAcceptedRelationship'
>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const SettingAcceptedRelationship: React.FC<Props> = (props) => {
  const user = useRecoilValue(userState);

  return (
    <TemplateSettingAcceptedRelationship
      user={user}
      displayName={props.route.params.displayName}
      image={props.route.params.image}
    />
  );
};

export default memo(SettingAcceptedRelationship);
