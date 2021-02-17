import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScrollView } from 'react-native';
import { mockFn } from 'storyBookUtils/index';
import View from 'components/atoms/View';
import setting from 'components/atoms/Category/setting';
import CategoryButton from './CategoryButton';

storiesOf('molecules', module).add('CategoryButton', () => (
  <ScrollView>
    {setting().icon.map((v) => (
      <View m={2} key={v.id}>
        <CategoryButton categoryID={v.id} onPress={mockFn('onPress')} />
      </View>
    ))}
  </ScrollView>
));
