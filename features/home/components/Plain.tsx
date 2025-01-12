import  { memo, type FC } from 'react';
import type {
  ItemsByDateQuery as Query,
  ItemQueryVariables as Variables,
} from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import type { QueryResult } from '@apollo/client';
import type { ConnectedType } from "./type";
import Page from './Page';

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;

type Props = QueryProps & ConnectedType;

const Plain: FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  return <Page {...props} />;
};

export default memo<Props>(Plain);
