import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Divider from './';

storiesOf('atoms', module).add('Divider', () => (
  <View>
    <Divider mt={4} mx={3} />
  </View>
));
