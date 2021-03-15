import React, { memo } from 'react';
import { ItemQueryHookResult as QueryHookResult } from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import TemplateItemDetail from 'components/templates/ItemDetail/Page';
import { ConnectedType } from './Connected';

export type QueryProps = Pick<QueryHookResult, 'data' | 'loading' | 'error'>;

type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  const item = props.data?.item;

  return (
    <TemplateItemDetail
      loading
      date={props.date}
      onChangeDate={props.onChangeDate}
      title={item?.title || ''}
      categoryID={item?.categoryID || 0}
    />
  );
};

export default memo<Props>(Plain);
