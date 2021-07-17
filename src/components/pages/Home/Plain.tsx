import React, { memo } from 'react';
import { ItemsByDateQueryHookResult as QueryHookResult } from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import TemplateHome from 'components/templates/Home/Page';
import { ConnectedType } from './Connected';

type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;

export type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  return <TemplateHome {...props} />;
};

export default memo<Props>(Plain);
