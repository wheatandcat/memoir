import React, { memo } from 'react';
import { ItemsByDateQueryHookResult as QueryHookResult } from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import TemplateHome from 'components/templates/Home/Page';
import { ConnectedType } from './Connected';

export type QueryProps = Pick<QueryHookResult, 'data' | 'loading' | 'error'>;

type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  const items = props.data?.itemsByDate || [];

  return <TemplateHome {...props} items={items} />;
};

export default memo<Props>(Plain);
