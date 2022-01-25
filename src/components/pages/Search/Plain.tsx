import React, { memo } from 'react';
import ErrorPage from 'components/organisms/Error/Error';
import Loading from 'components/atoms/Loading';
import TemplateSearch from 'components/templates/Search/Page';
import { ConnectedType } from './Connected';

type QueryHookResult = any;
type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;
export type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading) return <Loading />;

  return <TemplateSearch users={props.users} onSearch={props.onSearch} />;
};

export default memo(Plain);
