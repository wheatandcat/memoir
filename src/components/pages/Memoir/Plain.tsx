import React, { memo } from 'react';
import { ItemsInPeriodQueryHookResult as QueryHookResult } from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import { ConnectedType } from './Connected';
import TemplateMemoir from 'components/templates/Memoir/Page';
import { Item, ItemsInPeriodPageInfo } from 'hooks/useItemsInPeriodPaging';

export type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;

export type Props = QueryProps &
  ConnectedType & {
    items: Item[];
    pageInfo: ItemsInPeriodPageInfo;
  };

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading && props.items.length === 0) {
    return null;
  }

  return (
    <TemplateMemoir
      loading={props.loading}
      onItem={props.onItem}
      items={props.items}
      onLoadMore={props.onLoadMore}
      pageInfo={props.pageInfo}
    />
  );
};

export default memo<Props>(Plain);
