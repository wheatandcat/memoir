import React, { memo } from 'react';
import { ItemsByDateQueryHookResult as QueryHookResult } from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import Loading from 'components/organisms/Loading/Loading';
import TemplateHome from 'components/templates/Home/Page';
import { ConnectedType } from './Connected';

export type QueryProps = Pick<QueryHookResult, 'data' | 'loading' | 'error'>;

type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading && (props.data?.itemsByDate?.length || 0) === 0)
    return <Loading loading />;

  const items = props.data?.itemsByDate || [];

  return <TemplateHome {...props} items={items} />;
};

export default memo<Props>(Plain);
