import React, { memo, useCallback, useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { useItemsInPeriodQuery } from 'queries/api/index';
import useItemsInPeriodPaging from 'hooks/useItemsInPeriodPaging';
import Plain from './Plain';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {};

export type State = {
  after: string | null;
};

export type ConnectedType = {
  onItem: () => void;
  onLoadMore: (after: string | null) => void;
};

const initialState = () => ({
  after: '',
});

const Connected: React.FC<Props> = () => {
  const [state, setState] = useState<State>(initialState());

  const queryResult = useItemsInPeriodQuery({
    variables: {
      input: {
        startDate: '2021-04-05T00:00:00+09:00',
        endDate: '2021-04-20T00:00:00+09:00',
        first: 10,
        after: state.after,
      },
    },
  });

  const { items, pageInfo } = useItemsInPeriodPaging(queryResult, {
    merge: true,
  });

  const onLoadMore = useCallback((after: string | null) => {
    setState((s) => ({
      ...s,
      after,
    }));
  }, []);

  const onItem = useCallback(() => {}, []);

  return (
    <Plain
      items={items}
      pageInfo={pageInfo}
      onLoadMore={onLoadMore}
      loading={queryResult.loading}
      error={queryResult.error}
      onItem={onItem}
    />
  );
};

export default memo(Connected);
