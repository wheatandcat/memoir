import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import Card from './Card';

export default {
  title: 'organisms/Card',
};

export const _Card = () => (
  <Card title="本を読んだ" categoryID={1} onPress={mockFn('onPress')} />
);
