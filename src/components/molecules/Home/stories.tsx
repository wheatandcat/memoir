import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import AddButton from './AddButton';
import MemoirButton from './MemoirButton';

storiesOf('molecules/Home', module)
  .add('AddButton', () => <AddButton onPress={mockFn('onPress')} />)
  .add('MemoirButton', () => <MemoirButton onPress={mockFn('onPress')} />);
