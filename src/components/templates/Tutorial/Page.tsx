import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Button from 'components/atoms/Button';

type Props = {
  onPress: () => void;
};

const Page: React.FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <Button title="次へ" width={200} onPress={props.onPress} />
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
