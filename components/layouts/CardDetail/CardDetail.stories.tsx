import React from 'react';
import { StyleSheet } from 'react-native';
import View from '@/components/elements/View';
import theme from 'config/theme';
import { mockFn } from 'storyBookUtils/index';
import CardDetail from './CardDetail';

export default {
  title: 'organisms/CardDetail',
};

export const Default = () => (
  <View p={3} style={styles.root}>
    <CardDetail
      date="2021-02-21"
      categoryID={1}
      like={false}
      dislike={false}
      title="とても長いタイトルの本を読んだことがあって次もまた長いタイトルの本を読む"
      onOpenUpdateItem={mockFn('onOpenUpdateItem')}
      onDeleteItem={mockFn('onDeleteItem')}
    />
  </View>
);

export const Like = () => (
  <View p={3} style={styles.root}>
    <CardDetail
      date="2021-02-21"
      categoryID={1}
      like={true}
      dislike={false}
      title="とても長いタイトルの本を読んだことがあって次もまた長いタイトルの本を読む"
      onOpenUpdateItem={mockFn('onOpenUpdateItem')}
      onDeleteItem={mockFn('onDeleteItem')}
    />
  </View>
);

export const Dislike = () => (
  <View p={3} style={styles.root}>
    <CardDetail
      date="2021-02-21"
      categoryID={1}
      like={false}
      dislike={true}
      title="とても長いタイトルの本を読んだことがあって次もまた長いタイトルの本を読む"
      onOpenUpdateItem={mockFn('onOpenUpdateItem')}
      onDeleteItem={mockFn('onDeleteItem')}
    />
  </View>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
  },
});
