---
to: <%= absPath %>/Plain.tsx
---
import React, { memo } from 'react';
import { ItemsByDateQueryHookResult as QueryHookResult } from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import Loading from 'components/atoms/Loading';
import Template<%= navigationName %> from '<%= templatePath %>/Page';
import { ConnectedType } from './Connected';

type QueryHookResult = ItemsByDateQueryHookResult;
export type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;
export type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading) return <Loading />

  return <Template<%= navigationName %>  {...props} />
};

export default memo(Plain);


