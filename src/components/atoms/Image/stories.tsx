import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import Image from './';

storiesOf('atoms', module).add('Image', () => (
  <View>
    <Image
      source={require('../../../img/categories/category_book.png')}
      width={50}
      height={50}
    />
    <Image
      source={require('../../../img/categories/category_book.png')}
      width={100}
      height={100}
    />
    <Image
      source={require('../../../img/categories/category_book.png')}
      width={150}
      height={150}
    />
  </View>
));
