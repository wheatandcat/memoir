import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import View from 'components/atoms/View';
import Text from 'components/atoms/Text';
import theme from 'config/theme';

type Props = {
  onPress: () => void;
};

const Card: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.root}>
        <Text>本を読んだ</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Card);

const styles = StyleSheet.create({
  root: {
    borderLeftWidth: 5,
    borderColor: theme().category.color.category1,
  },
});
