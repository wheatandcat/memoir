import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import View from 'components/atoms/View';
import { mockFn } from 'storyBookUtils/index';
import Button from './';

storiesOf('atoms', module).add('Button', () => (
  <View>
    <View style={styles.inner}>
      <View p={2}>
        <Button
          title="size:sm"
          size="sm"
          width={150}
          onPress={mockFn('onPress')}
        />
      </View>
      <View p={2}>
        <Button
          title="loading & sm"
          size="sm"
          loading
          width={150}
          onPress={mockFn('onPress')}
        />
      </View>
    </View>
    <View style={styles.inner}>
      <View p={2}>
        <Button
          title="size:base"
          size="base"
          onPress={mockFn('onPress')}
          width={150}
        />
      </View>
      <View p={2}>
        <Button
          title="loading & base"
          size="base"
          loading
          onPress={mockFn('onPress')}
          width={150}
        />
      </View>
    </View>
    <View style={styles.inner}>
      <View p={2}>
        <Button
          title="size:lg"
          size="lg"
          onPress={mockFn('onPress')}
          width={150}
        />
      </View>
      <View p={2}>
        <Button
          title="loading & lg"
          size="lg"
          loading
          onPress={mockFn('onPress')}
          width={150}
        />
      </View>
    </View>

    <View p={2}>
      <Button title="disabled" disabled onPress={mockFn('onPress')} />
    </View>
  </View>
));

const styles = StyleSheet.create({
  inner: {
    flexDirection: 'row',
  },
});
