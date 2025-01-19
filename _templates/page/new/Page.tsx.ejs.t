---
to: <%= templatePath %>/Page.tsx
---
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { ConnectedType } from 'components/pages/<%= componentName %>/Connected';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from '@/config/theme';

export type Props = ConnectedType & {};

const Page: React.FC<Props> = () => {
  return (
    <View style={styles.root}>
      <Text>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: '100%',
    alignItems: 'center',
  },
});

export default memo(Page);
