import React, { memo } from 'react';
import {
  ItemsByDateQuery as Query,
  ItemQueryVariables as Variables,
} from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import TemplateHome from 'components/templates/Home/Page';
import { QueryResult } from '@apollo/client';
import { ConnectedType } from './Connected';

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;

type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  return <TemplateHome {...props} />;
};

export default memo<Props>(Plain);
