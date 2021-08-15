import React from 'react';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import Loading from './';

storiesOf('atoms', module).add(
  'Loading',
  () => (
    <View>
      <View p={3}>
        <Loading size="small" />
      </View>
      <View p={3}>
        <Loading />
      </View>
      <View p={3}>
        <Loading size="large" />
      </View>
    </View>
  ),
  { loki: { skip: true } }
);
