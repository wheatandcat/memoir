import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { users } from '__mockData__/user';
import { mockFn } from 'storyBookUtils/index';
import Dialog, { Props } from './Dialog';

const props = (): Props => ({
  users: users(),
  onSearch: mockFn('onSearch'),
});

storiesOf('organisms/Search', module).add('Dialog', () => (
  <Dialog {...props()} />
));
