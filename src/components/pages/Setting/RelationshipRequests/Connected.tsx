import React, { memo, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  RelationshipRequestsDocument,
  AcceptRelationshipRequestDocument,
  NgRelationshipRequestDocument,
  RelationshipRequestsQueryVariables as Variables,
} from 'queries/api/index';
import { v4 as uuidv4 } from 'uuid';
import useRelationshipRequestsPaging from 'hooks/useRelationshipRequestsPaging';
import { useQuery, useMutation } from '@apollo/client';
import Plain from './Plain';
import { ScreenNavigationProp as RelationshipRequestsScreenNavigationProp } from './';

type Props = {
  onCallback: () => void;
};

export type ConnectedType = {
  acceptRequesting: boolean;
  ngRequesting: boolean;
  onLoadMore: (after: string | null) => void;
  onOK: (followedId: string) => void;
  onNG: (followedId: string) => void;
};

const Connected: React.FC<Props> = (props) => {
  const [endCursor, setEndCursor] = useState('');
  const [reloadKey, setReloadKey] = useState('');
  const navigation = useNavigation<RelationshipRequestsScreenNavigationProp>();

  const queryResult = useQuery(RelationshipRequestsDocument, {
    variables: {
      input: {
        first: 5,
        after: endCursor,
      },
      skip: false,
      reloadKey,
    } as Variables & { reloadKey: string },
    nextFetchPolicy: 'network-only',
  });

  const { items, pageInfo, reset } = useRelationshipRequestsPaging(
    queryResult,
    {
      merge: true,
    }
  );

  const [
    acceptRelationshipRequestMutation,
    acceptRelationshipRequestMutationData,
  ] = useMutation(AcceptRelationshipRequestDocument, {
    onCompleted(data) {
      reset();
      setEndCursor('');
      setReloadKey(uuidv4());
      props.onCallback();

      const followerId = data.acceptRelationshipRequest.followerId;
      const user = items.find((v) => v.followerId === followerId);

      navigation.navigate('SettingAcceptedRelationship', {
        displayName: user?.user?.displayName || '',
        image: user?.user?.image || '',
      });
    },
  });
  const [ngRelationshipRequestMutation, ngRelationshipRequestMutationData] =
    useMutation(NgRelationshipRequestDocument, {
      onCompleted() {
        reset();
        setEndCursor('');
        setReloadKey(uuidv4());
        props.onCallback();
      },
    });

  const onLoadMore = useCallback((after: string | null) => {
    setEndCursor(after || '');
  }, []);

  const onOK = useCallback(
    (followedId: string) => {
      if (
        acceptRelationshipRequestMutationData.loading ||
        ngRelationshipRequestMutationData.loading
      ) {
        return;
      }

      acceptRelationshipRequestMutation({
        variables: {
          followedID: followedId,
        },
      });
    },
    [
      acceptRelationshipRequestMutation,
      acceptRelationshipRequestMutationData.loading,
      ngRelationshipRequestMutationData.loading,
    ]
  );
  const onNG = useCallback(
    (followedId: string) => {
      if (
        acceptRelationshipRequestMutationData.loading ||
        ngRelationshipRequestMutationData.loading
      ) {
        return;
      }

      ngRelationshipRequestMutation({
        variables: {
          followedID: followedId,
        },
      });
    },
    [
      ngRelationshipRequestMutation,
      acceptRelationshipRequestMutationData.loading,
      ngRelationshipRequestMutationData.loading,
    ]
  );

  return (
    <Plain
      loading={queryResult.loading}
      acceptRequesting={acceptRelationshipRequestMutationData.loading}
      ngRequesting={ngRelationshipRequestMutationData.loading}
      error={queryResult.error}
      onLoadMore={onLoadMore}
      items={items}
      pageInfo={pageInfo}
      onOK={onOK}
      onNG={onNG}
    />
  );
};

export default memo(Connected);
