import React from 'react';
import Loading, { Props } from './Loading';

const props = (): Props => ({});

export default {
  title: 'templates/App',
};

export const _Loading = () => <Loading {...props()} />;
