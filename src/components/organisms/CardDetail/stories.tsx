import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet } from 'react-native';
//import { mockFn } from 'storyBookUtils/index';
import View from 'components/atoms/View';
import theme from 'config/theme';
import CardDetail from './CardDetail';

storiesOf('organisms/CardDetail', module).add('CardDetail', () => (
  <View p={3} style={styles.root}>
    <CardDetail
      date="2021-02-21"
      categoryID={1}
      title="とても長いタイトルの本を読んだことがあって次もまた長いタイトルの本を読む"
    />
  </View>
));

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
  },
});
