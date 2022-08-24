import React, { memo } from 'react';
import {
  ItemsInPeriodQuery as Query,
  ItemsInPeriodQueryVariables as Variables,
} from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import { ConnectedType } from './Connected';
import TemplateMemoir from 'components/templates/Memoir/Page';
import { Item, ItemsInPeriodPageInfo } from 'hooks/useItemsInPeriodPaging';
import { QueryResult } from '@apollo/client';

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;

export type Props = QueryProps &
  ConnectedType & {
    items: Item[];
    pageInfo: ItemsInPeriodPageInfo;
  };

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading && props.items.length === 0 && !props.isFilter) {
    return null;
  }

  return (
    <TemplateMemoir
      startDate={props.startDate}
      endDate={props.endDate}
      loading={props.loading}
      search={props.search}
      items={props.items}
      users={props.users}
      selectedUserIDList={props.selectedUserIDList}
      onLoadMore={props.onLoadMore}
      pageInfo={props.pageInfo}
      onScreenShot={props.onScreenShot}
      onChangeUserID={props.onChangeUserID}
    />
  );
};

export default memo<Props>(Plain);
