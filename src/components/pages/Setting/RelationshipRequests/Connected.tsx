import React, { memo, useState, useCallback } from 'react';
import {
  useRelationshipRequestsQuery,
  useAcceptRelationshipRequestMutation,
  useNgRelationshipRequestMutation,
  RelationshipRequestsQueryVariables as Variables,
} from 'queries/api/index';
import { v4 as uuidv4 } from 'uuid';
import useRelationshipRequestsPaging from 'hooks/useRelationshipRequestsPaging';
import Plain from './Plain';

export type Props = {};

export type ConnectedType = {
  acceptRequesting: boolean;
  ngRequesting: boolean;
  onLoadMore: (after: string | null) => void;
  onOK: (followedId: string) => void;
  onNG: (followedId: string) => void;
};

const Connected: React.FC<Props> = () => {
  const [endCursor, setEndCursor] = useState('');
  const [reloadKey, setReloadKey] = useState('');

  const queryResult = useRelationshipRequestsQuery({
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
  ] = useAcceptRelationshipRequestMutation({
    onCompleted() {
      reset();
      setEndCursor('');
      setReloadKey(uuidv4());
    },
  });
  const [
    ngRelationshipRequestMutation,
    ngRelationshipRequestMutationData,
  ] = useNgRelationshipRequestMutation({
    onCompleted() {
      reset();
      setEndCursor('');
      setReloadKey(uuidv4());
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
