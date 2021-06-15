import React, { memo } from 'react';
import ErrorPage from 'components/organisms/Error/Error';
import { RelationshipRequestsQueryHookResult as QueryHookResult } from 'queries/api/index';
import Loading from 'components/atoms/Loading';
import {
  RelationshipRequest,
  RelationshipRequestsPageInfo,
} from 'hooks/useRelationshipRequestsPaging';
import TemplateSettingRelationshipRequests from 'components/templates/Setting/RelationshipRequests/Page';
import { ConnectedType } from './Connected';

export type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;
export type Props = QueryProps &
  ConnectedType & {
    items: RelationshipRequest[];
    pageInfo: RelationshipRequestsPageInfo;
  };

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading && props.items.length === 0) {
    return <Loading />;
  }

  return (
    <TemplateSettingRelationshipRequests
      items={props.items}
      onLoadMore={props.onLoadMore}
      pageInfo={props.pageInfo}
      loading={props.loading}
      acceptRequesting={props.acceptRequesting}
      ngRequesting={props.ngRequesting}
      onOK={props.onOK}
      onNG={props.onNG}
    />
  );
};

export default memo(Plain);
