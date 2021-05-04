---
to: <%= absPath %>/Connected.tsx
---
import React, { memo } from 'react';
import { Props as IndexProps } from './';
import Plain from './Plain';

export type Props = IndexProps & {};

export type ConnectedType = {};

const Connected: React.FC<Props> = () => {
  return (
    <Plain
      loading={false}
      error={null}
    />
  );
};

export default memo(Connected);

