import React, { memo, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import TemplateMyPage from 'components/templates/MyPage/Page';
import useFirebaseAuth, { UseFirebaseAuth } from 'hooks/useFirebaseAuth';
import { useRecoilValue } from 'recoil';
import { authUserState } from 'store/atoms';
import { userState } from 'store/atoms';
import {
  useRelationshipRequestsLazyQuery,
  useRelationshipsLazyQuery,
  RelationshipsQuery,
} from 'queries/api/index';

type Props = {};

export type Relationship = NonNullable<
  EdgesNode<RelationshipsQuery['relationships']>
>;

export type ConnectedType = {
  relationshipRequestCount: number;
  relationships: Relationship[];
  onRelationshipRequests: () => void;
  onUpdateProfile: () => void;
  onLogin: () => void;
  onLogout: UseFirebaseAuth['onLogout'];
  onAddShareUser: () => void;
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
  const [getRelationships, relationshipsData] = useRelationshipsLazyQuery();

  useEffect(() => {
    if (authUser.uid) {
      getRelationshipRequests({
        variables: {
          input: {
            after: '',
            first: 5,
          },
          skip: true,
        },
      });
      getRelationships({
        variables: {
          input: {
            after: '',
            first: 5,
          },
          skip: false,
        },
      });
    }
  }, [authUser.uid, getRelationshipRequests, getRelationships]);

  const onLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const onUpdateProfile = useCallback(() => {
    navigation.navigate('UpdateProfile');
  }, [navigation]);

  const onAddShareUser = useCallback(() => {
    navigation.navigate('SettingAddShareUser');
  }, [navigation]);

  const onRelationshipRequests = useCallback(() => {
    navigation.navigate('SettingRelationshipRequests');
  }, [navigation]);

  if (!setup) {
    return null;
  }

  const relationshipRequests =
    relationshipRequestsData.data?.relationshipRequests?.edges ?? [];
  const relationshipRequestCount = relationshipRequests.length;

  const relationshipEdges = relationshipsData?.data?.relationships?.edges ?? [];
  const relationships = relationshipEdges.map((v) => v.node);

  console.log(relationships);

  return (
    <TemplateMyPage
      authenticated={!!authUser.uid}
      user={user}
      relationshipRequestCount={relationshipRequestCount}
      relationships={relationships as Relationship[]}
      onLogout={onLogout}
      onLogin={onLogin}
      onUpdateProfile={onUpdateProfile}
      onAddShareUser={onAddShareUser}
      onRelationshipRequests={onRelationshipRequests}
    />
  );
};

export default memo(Connected);
