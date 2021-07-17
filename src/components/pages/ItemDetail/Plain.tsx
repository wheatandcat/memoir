import React, { memo } from 'react';
import { ItemQueryHookResult as QueryHookResult } from 'queries/api/index';
import ErrorPage from 'components/organisms/Error/Error';
import TemplateItemDetail from 'components/templates/ItemDetail/Page';
import { ConnectedType } from './Connected';

type QueryProps = Pick<QueryHookResult, 'data' | 'loading' | 'error'>;

export type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (props.error) return <ErrorPage error={props.error} />;

  const item = props.data?.item;

  return (
    <TemplateItemDetail
      {...props}
      title={item?.title || ''}
      categoryID={item?.categoryID || 0}
      like={item?.like || false}
      dislike={item?.dislike || false}
    />
  );
};

export default memo<Props>(Plain);
