import React, { memo } from 'react';
import ErrorPage from 'components/organisms/Error/Error';
import TemplateDataManagement from 'components/templates/Setting/DataManagement/Page';
import { ApolloError } from '@apollo/client';
import { ConnectedType } from './Connected';

type Props = ConnectedType & {
  loading: boolean;
  error?: ApolloError;
};

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
