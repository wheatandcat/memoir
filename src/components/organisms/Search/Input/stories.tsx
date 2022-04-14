import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
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
    {
      id: 'test5',
      image: 'https://placehold.jp/150x150.png',
    },
  ],
  userIDList: [],
  onAdd: mockFn('onAdd'),
  onRemove: mockFn('onRemove'),
});
const inputCategoryProps = (): InputCategoryProps => ({
  categoryID: 1,
  onPress: mockFn('onPress'),
});

storiesOf('organisms/Search/Input', module)
  .add('InputDate', () => <InputDate {...inputDateProps()} />)

  .add('InputCategory', () => <InputCategory {...inputCategoryProps()} />);

storiesOf('organisms/Search/Input/InputUsers', module)
  .add('1人', () => (
    <View style={styles.center}>
      <InputUsers {...inputUsers()} users={inputUsers().users.slice(0, 1)} />
    </View>
  ))
  .add('2人', () => (
    <View style={styles.center}>
      <InputUsers {...inputUsers()} users={inputUsers().users.slice(0, 2)} />
    </View>
  ))
  .add('3人', () => (
    <View style={styles.center}>
      <InputUsers {...inputUsers()} users={inputUsers().users.slice(0, 3)} />
    </View>
  ))
  .add('4人', () => (
    <View style={styles.center}>
      <InputUsers {...inputUsers()} users={inputUsers().users.slice(0, 4)} />
    </View>
  ))
  .add('5人', () => (
    <View style={styles.center}>
      <InputUsers {...inputUsers()} />
    </View>
  ));

const styles = StyleSheet.create({
  center: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
