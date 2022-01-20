import React from 'react';
import { storiesOf } from '@storybook/react-native';
import InputDate, { Props as InputDateProps } from './InputDate';
import InputUsers, { Props as InputUsersProps } from './InputUsers';
import InputCategory, { Props as InputCategoryProps } from './InputCategory';

const inputDateProps = (): InputDateProps => ({});
const inputUsers = (): InputUsersProps => ({
  users: [
    {
      id: 'test1',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
    {
      id: 'test2',
      displayName: 'suzuki',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
});
const inputCategoryProps = (): InputCategoryProps => ({});

storiesOf('organisms/Search/Input', module)
  .add('InputDate', () => <InputDate {...inputDateProps()} />)
  .add('InputUsers', () => <InputUsers {...inputUsers()} />)
  .add('InputCategory', () => <InputCategory {...inputCategoryProps()} />);
