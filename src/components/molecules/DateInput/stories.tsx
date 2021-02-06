import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils/index';
import Years from './Years';
import Months from './Months';
import Days from './Days';

storiesOf('molecules/DateInput', module)
  .add('Years', () => (
    <Years date="2020-01-01" years={[2020, 2021]} onPress={mockFn('onPress')} />
  ))
  .add('Months', () => (
    <Months
      date="2020-01-01"
      months={[
        {
          label: '1/Jun',
          value: 1,
        },
        {
          label: '2/Feb',
          value: 2,
        },
        {
          label: '3/Mar',
          value: 3,
        },
        {
          label: '4/Apr',
          value: 4,
        },
        {
          label: '5/May',
          value: 5,
        },
        {
          label: '6/May',
          value: 6,
        },
      ]}
      onPress={mockFn('onPress')}
    />
  ))
  .add('Days', () => (
    <Days
      date="2020-01-01"
      days={[
        '2020-01-01',
        '2020-01-02',
        '2020-01-03',
        '2020-01-04',
        '2020-01-05',
        '2020-01-06',
        '2020-01-07',
        '2020-01-08',
      ]}
      onPress={mockFn('onPress')}
    />
  ));
