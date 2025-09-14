import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  type TextInputProps,
  type TextStyle,
} from "react-native";

type Props = TextInputProps;

const TextInput: FC<Props> = (props) => {
  const style: TextStyle[] = [styles.text];
  const textInputRef = useRef<RNTextInput>(null);

  const { autoFocus, ...rest } = props;

  if (props.style) {
    style.push(props.style as TextStyle);
  }

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => textInputRef.current?.focus(), 100);
    }
  }, [autoFocus]);

  return (
    <View>
      <RNTextInput
        {...rest}
        placeholderTextColor={theme().color.base.main}
        style={style}
        autoCapitalize="none"
        ref={textInputRef}
      />
      <View style={styles.underLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme().color.secondary.main,
    fontSize: theme().fontSizes.lg,
    fontWeight: "bold",
    paddingBottom: theme().space(1),
  },
  underLine: {
    borderBottomWidth: 1,
    borderColor: theme().color.base.main,
  },
});

export default TextInput;
