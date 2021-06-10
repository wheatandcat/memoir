import { useState, useEffect, useCallback } from 'react';
import {
  RelationshipRequestsQuery as Query,
  RelationshipRequestsQueryHookResult as QueryHookResult,
} from 'queries/api/index';

export type RelationshipRequest = NonNullable<
  EdgesNode<Query['relationshipRequests']>
>;
export type RelationshipRequestsPageInfo = PageInfo<
  Query['relationshipRequests']
>;

type Props = QueryHookResult;
type Option = {
  merge?: boolean;
};

const useRelationshipRequestsPaging = (
  props: Props,
  option: Option = { merge: false }
) => {
  const { data, loading } = props;
  const [nodes, setNodes] = useState<RelationshipRequest[]>([]);
  const pageInfo = getPageInfo(data);

  useEffect(() => {
    if (!data?.relationshipRequests?.edges) return;
    if (loading) return;

    if (option.merge) {
      const tmp = new Set();
      setNodes((s) =>
        [...s, ...getNodes(data)].filter((n) => !tmp.has(n.id) && tmp.add(n.id))
      );
    } else {
      setNodes(getNodes(data));
    }
  }, [data, loading, option.merge]);

  const reset = useCallback(() => {
    setNodes([]);
  }, []);

  return {
    items: nodes,
    pageInfo: pageInfo,
    reset,
  };
};

export default useRelationshipRequestsPaging;

const getPageInfo = (data: Query | undefined) =>
  data?.relationshipRequests?.pageInfo ||
  ({
    endCursor: '',
    hasNextPage: false,
  } as RelationshipRequestsPageInfo);

const getNodes = (data: Query | undefined) =>
  (data?.relationshipRequests?.edges || []).map(
    (w) => w?.node
  ) as RelationshipRequest[];
