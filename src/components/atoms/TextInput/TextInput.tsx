import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';
import View from 'components/atoms/View';
import theme from 'config/theme';

type Props = TextInputProps;

const TextInput: React.FC<Props> = (props) => {
  return (
    <View>
      <RNTextInput
        {...props}
        placeholderTextColor={theme().color.base.main}
        style={styles.text}
        autoCapitalize="none"
      />
      <View style={styles.underLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme().color.secondary.main,
    fontSize: theme().fontSizes.lg,
    fontWeight: 'bold',
    paddingBottom: theme().space(1),
  },
  underLine: {
    borderBottomWidth: 1,
    borderColor: theme().color.base.main,
  },
});

export default TextInput;
