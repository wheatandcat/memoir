import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Cards from './Cards';

storiesOf('organisms/Cards', module).add('Cards', () => (
  <Cards onItem={mockFn('onItem')} onAddItem={mockFn('onAddItem')} />
));
