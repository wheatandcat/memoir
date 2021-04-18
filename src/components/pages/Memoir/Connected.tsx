import React, { memo, useCallback, useState } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { useItemsInPeriodQuery } from 'queries/api/index';
import useItemsInPeriodPaging from 'hooks/useItemsInPeriodPaging';
import Plain from './Plain';

dayjs.locale('ja');
dayjs.extend(advancedFormat);

type Props = {
  startDate: string;
  endDate: string;
};

export type State = {
  after: string | null;
};

export type ConnectedType = {
  startDate: string;
  endDate: string;
  onItem: () => void;
  onLoadMore: (after: string | null) => void;
};

const initialState = () => ({
  after: '',
});

const Connected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  const queryResult = useItemsInPeriodQuery({
    variables: {
      input: {
        startDate: props.startDate,
        endDate: props.endDate,
        first: 8,
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
      startDate={props.startDate}
      endDate={props.endDate}
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
