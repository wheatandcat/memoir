import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Input, { Props as InputProps } from './Input';
import Notification, { Props as NotificationProps } from './Notification';

const inputProps = (): InputProps => ({
  dayOfWeek: 0,
  time: new Date('0000-01-01T00:00:00'),
  onChangeDayOfWeek: mockFn('onChangeDayOfWeek'),
  onChangeTime: mockFn('onChangeTime'),
});

const notificationProps = (): NotificationProps => ({
  push: 0,
  setPush: mockFn('setPush'),
});

storiesOf('organisms/Setting/Memoir', module)
  .add('Input', () => <Input {...inputProps()} />)
  .add('Notification', () => <Notification {...notificationProps()} />);
