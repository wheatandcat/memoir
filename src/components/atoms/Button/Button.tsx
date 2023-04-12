import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  Platform,
} from 'react-native';
import theme from 'config/theme';
import View from 'components/atoms/View';
import Text, { FontFamily } from 'components/atoms/Text';

export type Props = {
  size?: 'sm' | 'base' | 'lg';
  width?: number | string;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  fontFamily?: FontFamily;
  radius?: number;
  onPress: () => void;
};

const Button: React.FC<Props> = (props) => {
  let configSize = theme().button.size[props.size || 'base'];

  if (!configSize) {
    configSize = theme().button.size.base;
  }

  const buttonStyle: ViewStyle = {
    paddingHorizontal: configSize.padding,
    borderRadius: props.radius ? props.radius : configSize.borderRadius,
    height: configSize.height,
  };

  if (props.width) {
    buttonStyle.width = props.width;
  }

  if (props.loading) {
    return (
      <View style={[styles.disabledButton, buttonStyle]}>
        <ActivityIndicator
          size={configSize.loadingSize}
          color={theme().color.base.light}
          testID="button-loading"
        />
      </View>
    );
  }

  if (props.disabled) {
    return (
      <View style={[styles.disabledButton, buttonStyle]}>
        <Text
          textAlign="center"
          size={configSize.fontSize}
          lineHeight={
            Platform.OS === 'android' && props.size === 'lg' ? 30 : undefined
          }
          fontWeight="bold"
          color="baseDark"
          fontFamily={props.fontFamily}
        >
          {props.title}
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, buttonStyle]}>
        <Text
          textAlign="center"
          lineHeight={
            Platform.OS === 'android' && props.size === 'lg' ? 30 : undefined
          }
          size={configSize.fontSize}
          fontWeight="bold"
          color="secondary"
          fontFamily={props.fontFamily}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme().color.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: theme().color.base.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Button.defaultProps = {
  size: 'base',
  fontFamily: 'NotoSansJP-Bold',
};

export default Button;
