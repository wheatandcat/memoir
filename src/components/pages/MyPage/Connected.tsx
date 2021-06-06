import React, { memo, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import TemplateMyPage from 'components/templates/MyPage/Page';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { useRecoilValue } from 'recoil';
import { authUserState } from 'store/atoms';
import { userState } from 'store/atoms';
import {
  useRelationshipRequestsLazyQuery,
  RelationshipRequestsQueryVariables,
} from 'queries/api/index';

type Props = {};

export type ConnectedType = {
  relationshipRequestCount: number;
};

const Connected: React.FC<Props> = () => {
  const { setup, onLogout } = useFirebaseAuth();
  const authUser = useRecoilValue(authUserState);
  const user = useRecoilValue(userState);
  const navigation = useNavigation();
  const [
    getRelationshipRequests,
    relationshipRequestsData,
  ] = useRelationshipRequestsLazyQuery();

  useEffect(() => {
    if (authUser.uid) {
      const variables: RelationshipRequestsQueryVariables = {
        input: {
          first: 5,
        },
        skip: true,
      };
      getRelationshipRequests({ variables });
    }
  }, [authUser.uid, getRelationshipRequests]);

  const onLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const onUpdateProfile = useCallback(() => {
    navigation.navigate('UpdateProfile');
  }, [navigation]);

  const onAddShareUser = useCallback(() => {
    navigation.navigate('SettingAddShareUser');
  }, [navigation]);

  if (!setup) {
    return null;
  }

  const relationshipRequests =
    relationshipRequestsData.data?.relationshipRequests?.edges ?? [];
  const relationshipRequestCount = relationshipRequests.length;

  return (
    <TemplateMyPage
      authenticated={!!authUser.uid}
      user={user}
      relationshipRequestCount={relationshipRequestCount}
      onLogout={onLogout}
      onLogin={onLogin}
      onUpdateProfile={onUpdateProfile}
      onAddShareUser={onAddShareUser}
    />
  );
};

export default memo(Connected);
