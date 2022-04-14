import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { users } from '__mockData__/user';
import { mockFn } from 'storyBookUtils/index';
import Page, { Props } from './Page';

const props = (userLength: number = 5): Props => ({
  users: users().slice(0, userLength),
  onSearch: mockFn('onSearch'),
});

storiesOf('templates/Search/Page', module)
  .add('1人', () => <Page {...props(1)} />)
  .add('2人', () => <Page {...props(2)} />)
  .add('3人', () => <Page {...props(3)} />)
  .add('4人', () => <Page {...props(4)} />)
  .add('5人', () => <Page {...props(5)} />);
