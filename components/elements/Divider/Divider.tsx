import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import theme from 'config/theme';
import { SpaceProps, styleSpace } from 'lib/styledSystem/styleSpace';

type Props = {} & SpaceProps;

const Divider: React.FC<Props> = (props) => {
  const style = {
    ...styleSpace(props),
  } as ViewStyle;

  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    backgroundColor: theme().color.base.dark,
    height: StyleSheet.hairlineWidth,
  },
});

export default Divider;
