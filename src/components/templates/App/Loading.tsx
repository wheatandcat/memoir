import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import ALoading from 'components/atoms/Loading';

export type Props = {};

const Loading: React.FC<Props> = () => {
  return (
    <View style={styles.root}>
      <ALoading />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default memo(Loading);
