import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { mockFn } from 'storyBookUtils/index';
import View from 'components/atoms/View';
import setting from 'components/atoms/Category/setting';
import CategoryButton from './CategoryButton';

storiesOf('molecules', module).add('CategoryButton', () => (
  <ScrollView>
    <View style={styles.root}>
      {setting().icon.map((v) => (
        <View m={2} key={v.id}>
          <CategoryButton categoryID={v.id} onPress={mockFn('onPress')} />
        </View>
      ))}
    </View>
  </ScrollView>
));

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
