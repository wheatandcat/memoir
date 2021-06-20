import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Input, { Props as InputProps } from './Input';
import Sent, { Props as SentProps } from './Sent';
import Confirm, { Props as ConfirmProps } from './Confirm';

const inputProps = (): InputProps => ({
  code: '',
  onChange: mockFn('onChange'),
});

const sentProps = (): SentProps => ({
  displayName: 'スズキ',
});

const confirmProps = (): ConfirmProps => ({
  displayName: 'スズキ',
  image: '',
  onNG: mockFn('onNG'),
  onOK: mockFn('onOK'),
  requesting: false,
});

storiesOf('organisms/AddShareUser/InputModal', module)
  .add('Input', () => <Input {...inputProps()} />)
  .add('Confirm', () => <Confirm {...confirmProps()} />)
  .add('Sent', () => <Sent {...sentProps()} />);
