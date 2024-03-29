import React from 'react';
import { StyleSheet } from 'react-native';
import { mockFn } from 'storyBookUtils/index';
import View from 'components/atoms/View';
import Categories from './Categories';

export default {
  title: 'organisms',
};

export const _Categories = () => (
  <View style={styles.root}>
    <View style={styles.inner}>
      <Categories categoryID={null} onPress={mockFn('onPress')} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
});
