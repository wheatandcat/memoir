import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';
import { MaterialIcons } from '@expo/vector-icons';

type Name =
  | 'more-vert'
  | 'more-horiz'
  | 'close'
  | 'favorite'
  | 'favorite-border'
  | 'highlight-off'
  | 'refresh';

type Props = {
  name: Name;
  size?: 'sm' | 'base' | 'lg';
  testID?: string;
  color?: string;
  outline?: boolean;
  onPress: () => void;
};

const IconButton: React.FC<Props> = (props) => {
  const size = theme().icon.size[props.size || 'base'];

  const button: ViewStyle[] = [];

  if (props.outline) {
    button.push(styles.button);
  }

  return (
    <TouchableOpacity onPress={props.onPress} testID={props.testID}>
      <View style={button}>
        <MaterialIcons
          name={props.name}
          size={size}
          color={props.color || theme().color.secondary.main}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme().color.base.dark,
    borderRadius: 25,
    padding: theme().space(0),
  },
});

IconButton.defaultProps = {
  size: 'base',
};

export default memo(IconButton);
