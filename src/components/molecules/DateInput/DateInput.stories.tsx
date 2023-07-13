import React from 'react';
import { mockFn } from 'storyBookUtils/index';
import Years from './Years';
import Months from './Months';
import Days from './Days';

export default {
  title: 'molecules/DateInput',
};

export const _Years = () => (
  <Years year="2020" years={[2020, 2021]} onPress={mockFn('onPress')} />
);

export const _Months = () => (
  <Months
    month="1"
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
      {
        label: '7/Jul',
        value: 7,
      },
      {
        label: '8/Aug',
        value: 8,
      },
      {
        label: '9/Sep',
        value: 9,
      },
      {
        label: '10/Oct',
        value: 10,
      },
      {
        label: '11/Nov',
        value: 11,
      },
      {
        label: '12/Dec',
        value: 12,
      },
    ]}
    onPress={mockFn('onPress')}
  />
);

_Months.story = {
  parameters: { loki: { skip: true } },
};

export const _Days = () => (
  <Days
    day="1"
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
);
