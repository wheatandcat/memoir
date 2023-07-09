import React from 'react';
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

export default {
  title: 'organisms/AddShareUser/InputModal',
};

export const _Input = () => <Input {...inputProps()} />;
export const _Confirm = () => <Confirm {...confirmProps()} />;
export const _Sent = () => <Sent {...sentProps()} />;
