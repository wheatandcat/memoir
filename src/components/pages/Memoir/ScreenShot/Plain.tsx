import React, { memo } from 'react';
import { ItemsInPeriodQueryHookResult as QueryHookResult } from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import Loading from 'components/atoms/Loading';
import TemplateMemoirScreenShot from 'components/templates/Memoir/ScreenShot/Page';
import { Item } from 'hooks/useItemsInPeriodPaging';
import { ConnectedType } from './Connected';

type QueryProps = Pick<QueryHookResult, 'loading' | 'error' | 'data'>;
export type Props = QueryProps & ConnectedType & {};

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading) return <Loading />;

  const items = (props.data?.itemsInPeriod?.edges || []).map(
    (v) => v.node
  ) as Item[];

  return (
    <TemplateMemoirScreenShot
      startDate={props.startDate}
      endDate={props.endDate}
      items={items}
      users={props.users}
    />
  );
};

export default memo(Plain);
