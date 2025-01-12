import React from 'react';
import Image, { type Props } from './Image';

const props = (): Props => ({ image: null });

export default {
  title: 'molecules/User',
};

export const _Image = () => <Image {...props()} />;
