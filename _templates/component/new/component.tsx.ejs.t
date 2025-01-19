---
to: <%= absPath %>/<%= component_name %>.tsx
---
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from '@/config/theme';

export type Props = {};

const <%= navigationName %>: React.FC<Props> = () => {
  return (
    <View style={styles.root}>
      <Text>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
  },
});

export default memo(<%= navigationName %>);
