import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';

export type Props = {};

const Page: React.FC<Props> = () => {
  return (
    <View style={styles.root}>
      <Text>テスト</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Page);
