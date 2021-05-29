import React, { memo } from 'react';
import ErrorPage from 'components/organisms/Error/Error';
import Loading from 'components/atoms/Loading';
import TemplateSettingAddShareUser from 'components/templates/Setting/AddShareUser/Page';
import { InviteQueryHookResult } from 'queries/api/index';
import { ConnectedType, Invite } from './Connected';

type QueryHookResult = InviteQueryHookResult;
export type QueryProps = Pick<QueryHookResult, 'loading' | 'error' | 'data'>;
export type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading) return <Loading />;

  const invite = props.data?.invite as Invite;

  return <TemplateSettingAddShareUser invite={invite} {...props} />;
};

export default memo(Plain);
