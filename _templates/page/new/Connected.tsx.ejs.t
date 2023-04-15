---
to: <%= absPath %>/Connected.tsx
---
import React, { memo } from 'react';
import Plain from './Plain';

type Props = {};

export type ConnectedType = {};

const Connected: React.FC<Props> = () => {
  return <Plain loading={false} error={null} />;
};

export default memo(Connected);
