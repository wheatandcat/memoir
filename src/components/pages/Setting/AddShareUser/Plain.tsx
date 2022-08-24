import React, { memo } from 'react';
import ErrorPage from 'components/organisms/Error/Error';
import Loading from 'components/atoms/Loading';
import TemplateSettingAddShareUser from 'components/templates/Setting/AddShareUser/Page';
import {
  InviteQuery as Query,
  InviteQueryVariables as Variables,
} from 'queries/api/index';
import { QueryResult } from '@apollo/client';
import { ConnectedType, Invite } from './Connected';

type QueryHookResult = QueryResult<Query, Variables>;
type QueryProps = Pick<QueryHookResult, 'loading' | 'error' | 'data'>;
export type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  const invite = props.data?.invite as Invite;

  if (props.loading && invite?.code === undefined) return <Loading />;

  return <TemplateSettingAddShareUser invite={invite} {...props} />;
};

export default memo(Plain);
