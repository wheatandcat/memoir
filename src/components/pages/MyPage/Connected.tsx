import React, { memo, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import TemplateMyPage from 'components/templates/MyPage/Page';
import useFirebaseAuth, { UseFirebaseAuth } from 'hooks/useFirebaseAuth';
import { useRecoilValue } from 'recoil';
import { authUserState } from 'store/atoms';
import {
  useRelationshipRequestsLazyQuery,
  useRelationshipsLazyQuery,
  RelationshipsQuery,
  useDeleteRelationshipMutation,
  useUserQuery,
} from 'queries/api/index';

type Props = {};

type Relationship = NonNullable<EdgesNode<RelationshipsQuery['relationships']>>;

export type ConnectedType = {
  deleting: boolean;
  relationshipRequestCount: number;
  relationships: Relationship[];
  onRelationshipRequests: () => void;
  onUpdateProfile: () => void;
  onLogin: () => void;
  onLogout: UseFirebaseAuth['onLogout'];
  onAddShareUser: () => void;
  onDeleteRelationship: (followedId: string) => void;
};

const Connected: React.FC<Props> = () => {
  const { setup, onLogout } = useFirebaseAuth();
  const authUser = useRecoilValue(authUserState);
  const userQuery = useUserQuery();
  const navigation = useNavigation();
  const [
    getRelationshipRequests,
    relationshipRequestsData,
  ] = useRelationshipRequestsLazyQuery({
    fetchPolicy: 'network-only',
  });
  const [getRelationships, relationshipsData] = useRelationshipsLazyQuery({
    fetchPolicy: 'network-only',
  });
  const [
    deleteRelationshipMutation,
    deleteRelationshipMutationData,
  ] = useDeleteRelationshipMutation({
    onCompleted() {
      relationshipsData.refetch?.();
    },
  });

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
    navigation.navigate('SettingRelationshipRequests', {
      onCallback: () => {
        relationshipRequestsData.refetch?.();
        relationshipsData.refetch?.();
      },
    });
  }, [navigation, relationshipRequestsData, relationshipsData]);

  const onDeleteRelationship = useCallback(
    (followedId: string) => {
      deleteRelationshipMutation({
        variables: {
          followedID: followedId,
        },
      });
    },
    [deleteRelationshipMutation]
  );

  if (!setup || userQuery.loading) {
    return null;
  }

  const relationshipRequests =
    relationshipRequestsData.data?.relationshipRequests?.edges ?? [];
  const relationshipRequestCount = relationshipRequests.length;

  const relationshipEdges = relationshipsData?.data?.relationships?.edges ?? [];
  const relationships = relationshipEdges.map((v) => v.node);

  const user = {
    id: userQuery.data?.user?.id || '',
    userID: userQuery.data?.user?.id || '',
    displayName: userQuery.data?.user?.displayName || '',
    image: userQuery.data?.user?.image || '',
  };

  return (
    <TemplateMyPage
      authenticated={!!authUser.uid}
      user={user}
      relationshipRequestCount={relationshipRequestCount}
      relationships={relationships as Relationship[]}
      deleting={deleteRelationshipMutationData.loading}
      onLogout={onLogout}
      onLogin={onLogin}
      onUpdateProfile={onUpdateProfile}
      onAddShareUser={onAddShareUser}
      onRelationshipRequests={onRelationshipRequests}
      onDeleteRelationship={onDeleteRelationship}
    />
  );
};

export default memo(Connected);
