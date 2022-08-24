import React, { memo } from 'react';
import Loading from 'components/atoms/Loading';
import TemplateSearch from 'components/templates/Search/Page';
import { ConnectedType } from './Connected';

export type Props = ConnectedType & {
  loading: boolean;
};

const Plain: React.FC<Props> = (props) => {
  if (props.loading) return <Loading />;

  return <TemplateSearch users={props.users} onSearch={props.onSearch} />;
};

export default memo(Plain);
