import View from "@/components/elements/View";
import theme from "@/config/theme";
import useAutoFocusInput from "@/hooks/useAutoFocusInput";
import type { FC } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  type TextInputProps,
  type TextStyle,
} from "react-native";

type Props = TextInputProps;

const TextInput: FC<Props> = (props) => {
  const autoFocusProps = useAutoFocusInput(props.autoFocus || false);

  const style: TextStyle[] = [styles.text];
  if (props.style) {
    style.push(props.style as TextStyle);
  }

  return (
    <View>
      <RNTextInput
        {...props}
        {...autoFocusProps}
        placeholderTextColor={theme().color.base.main}
        style={style}
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
    fontWeight: "bold",
    paddingBottom: theme().space(1),
  },
  underLine: {
    borderBottomWidth: 1,
    borderColor: theme().color.base.main,
  },
});

export default TextInput;
