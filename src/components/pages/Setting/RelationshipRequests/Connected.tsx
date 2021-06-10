import React, { memo, useState, useCallback } from 'react';
import { useRelationshipRequestsQuery } from 'queries/api/index';
import useRelationshipRequestsPaging from 'hooks/useRelationshipRequestsPaging';
import Plain from './Plain';

export type Props = {};

export type State = {
  after: string | null;
};

const initialState = () => ({
  after: '',
});

export type ConnectedType = {
  onLoadMore: (after: string | null) => void;
  onOK: (id: string) => void;
  onNG: (id: string) => void;
};

const Connected: React.FC<Props> = () => {
  const [state, setState] = useState<State>(initialState());

  const queryResult = useRelationshipRequestsQuery({
    variables: {
      input: {
        first: 5,
        after: state.after,
      },
      skip: false,
    },
  });

  const { items, pageInfo } = useRelationshipRequestsPaging(queryResult, {
    merge: true,
  });

  const onLoadMore = useCallback((after: string | null) => {
    setState((s) => ({
      ...s,
      after,
    }));
  }, []);

  const onOK = useCallback((id: string) => {
    console.log(id);
  }, []);
  const onNG = useCallback((id: string) => {
    console.log(id);
  }, []);

  return (
    <Plain
      loading={queryResult.loading}
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
