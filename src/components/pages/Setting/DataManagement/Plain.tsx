import React, { memo } from 'react';
import ErrorPage from 'components/organisms/Error/Error';
import TemplateDataManagement from 'components/templates/Setting/DataManagement/Page';
import { ConnectedType } from './Connected';

type QueryHookResult = any;
type QueryProps = Pick<QueryHookResult, 'loading' | 'error'>;
export type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  return (
    <TemplateDataManagement
      loading={props.loading}
      onDelete={props.onDelete}
      disabledDeleteButton={props.disabledDeleteButton}
    />
  );
};

export default memo(Plain);
