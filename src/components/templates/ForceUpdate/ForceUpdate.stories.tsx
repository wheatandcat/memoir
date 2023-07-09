import React from 'react';
import Page, { Props } from './Page';

const props = (): Props => ({});

export default {
  title: 'templates/ForceUpdate',
};

export const _Page = () => <Page {...props()} />;
