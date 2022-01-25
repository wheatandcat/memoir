import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { users } from '__mockData__/user';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (): Props => ({
  users: users(),
  onSearch: mockFn('onSearch'),
});

storiesOf('templates/Search', module).add('Page', () => <Page {...props()} />);
