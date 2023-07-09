import React from 'react';
import Image, { Props } from './Image';

const props = (): Props => ({ image: null });

export default {
  title: 'molecules/User',
};

export const _Image = () => <Image {...props()} />;
