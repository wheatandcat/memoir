import React, { memo } from 'react';
import ErrorPage from 'components/organisms/Error/Error';
import Loading from 'components/atoms/Loading';
import TemplateSettingMemoir from 'components/templates/Setting/Memoir/Page';
import { ConnectedType } from './Connected';

type QueryHookResult = any;
export type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;
export type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;
  if (props.loading) return <Loading />;

  return <TemplateSettingMemoir />;
};

export default memo(Plain);
