import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import Category from './Category';
import setting from './setting';

storiesOf('atoms', module).add('Category', () => (
  <View m={2}>
    {setting().icon.map((v) => (
      <Category key={v.id} categoryID={v.id} />
    ))}
  </View>
));
