import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Header, { Props } from './Header';

const props = (): Props => ({
  startDate: '2020-01-01',
  endDate: '2020-01-07',
});

storiesOf('molecules/Memoir', module).add('Header', () => (
  <Header {...props()} />
));
