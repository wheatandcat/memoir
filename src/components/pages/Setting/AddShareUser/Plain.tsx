import React, { memo } from 'react';
import ErrorPage from 'components/organisms/Error/Error';
import Loading from 'components/atoms/Loading';
import TemplateSettingAddShareUser from 'components/templates/Setting/AddShareUser/Page';
import { ConnectedType } from './Connected';

type QueryHookResult = any;
export type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;
export type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading) return <Loading />;

  return <TemplateSettingAddShareUser />;
};

export default memo(Plain);
