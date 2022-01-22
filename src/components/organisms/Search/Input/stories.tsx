import React from 'react';
import { storiesOf } from '@storybook/react-native';
import InputDate, { Props as InputDateProps } from './InputDate';
import InputUsers, { Props as InputUsersProps } from './InputUsers';
import InputCategory, { Props as InputCategoryProps } from './InputCategory';
import { mockFn } from 'storyBookUtils/index';

const inputDateProps = (): InputDateProps => ({
  startDate: new Date('2021-01-01T00:00:00+09:00'),
  endDate: new Date('2021-01-18T00:00:00+09:00'),
  onChangeStartDate: mockFn('onChangeStartDate'),
  onChangeEndDate: mockFn('onChangeStartDate'),
});
const inputUsers = (): InputUsersProps => ({
  users: [
    {
      id: 'test1',
      image: 'https://placehold.jp/150x150.png',
    },
    {
      id: 'test2',
      image: 'https://placehold.jp/150x150.png',
    },
    {
      id: 'test3',
      image: 'https://placehold.jp/150x150.png',
    },
    {
      id: 'test4',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
  userIDList: [],
  onAdd: mockFn('onAdd'),
  onRemove: mockFn('onRemove'),
});
const inputCategoryProps = (): InputCategoryProps => ({});

storiesOf('organisms/Search/Input', module)
  .add('InputDate', () => <InputDate {...inputDateProps()} />)
  .add('InputUsers', () => <InputUsers {...inputUsers()} />)
  .add('InputCategory', () => <InputCategory {...inputCategoryProps()} />);
