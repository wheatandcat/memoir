import { useState, useEffect, useCallback } from 'react';
import {
  ItemsInPeriodQuery as Query,
  ItemsInPeriodQueryHookResult as QueryHookResult,
} from 'queries/api/index';

export type Item = NonNullable<EdgesNode<Query['itemsInPeriod']>>;
export type ItemsInPeriodPageInfo = PageInfo<Query['itemsInPeriod']>;

type Props = QueryHookResult;
type Option = {
  merge?: boolean;
};

const useItemsInPeriodPaging = (
  props: Props,
  option: Option = { merge: false }
) => {
  const { data, loading } = props;
  const [nodes, setNodes] = useState<Item[]>([]);
  const pageInfo = getPageInfo(data);

  useEffect(() => {
    if (!data?.itemsInPeriod?.edges) return;
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

export default useItemsInPeriodPaging;

const getPageInfo = (data: Query | undefined) =>
  data?.itemsInPeriod?.pageInfo ||
  ({
    endCursor: '',
    hasNextPage: false,
  } as ItemsInPeriodPageInfo);

const getNodes = (data: Query | undefined) =>
  (data?.itemsInPeriod?.edges || []).map((w) => w?.node) as Item[];
