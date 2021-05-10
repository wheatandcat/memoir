import React, { memo, useCallback } from 'react';
import TemplateUpdateProfile from 'components/templates/UpdateProfile/Page';

export type Props = {};

export type ConnectedType = {
  onSave: () => Promise<void>;
};

const Connected: React.FC<Props> = () => {
  const onSave = useCallback(async () => {}, []);

  return <TemplateUpdateProfile loading={false} onSave={onSave} />;
};

export default memo(Connected);
