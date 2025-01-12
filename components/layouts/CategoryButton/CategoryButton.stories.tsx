import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { mockFn } from 'storyBookUtils/index';
import View from 'components/atoms/View';
import setting from 'components/atoms/Category/setting';
import CategoryButton from './CategoryButton';

export default {
  title: 'molecules',
};

export const _CategoryButton = () => (
  <ScrollView>
    <View style={styles.root}>
      {setting().icon.map((v) => (
        <View m={2} key={v.id}>
          <CategoryButton categoryID={v.id} onPress={mockFn('onPress')} />
        </View>
      ))}
    </View>
  </ScrollView>
);

_CategoryButton.story = {
  name: 'CategoryButton',
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
