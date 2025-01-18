import Blinking from "@/components/elements/Animated/Blinking";
import Text from "@/components/elements/Text";
import { useFocusEffect } from "@react-navigation/native";
import theme from "config/theme";
import type React from "react";
import { memo, useCallback, useRef, useState } from "react";
import {
  type NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  type TextInputKeyPressEventData,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export type Props = {
  value: string;
  onChange: (code: string) => void;
};

const placeholder = ["A", "A", "B", "B", "C", "C", "D", "D"];

const CODE_LENGTH = new Array(8).fill(0);
const boxWidth = 32;

const InputCode: React.FC<Props> = (props) => {
  const { value } = props;
  const [focused, setFocused] = useState<boolean>(false);
  const values = value.split("");

  const textInputRef = useRef<TextInput>(null);
  const timeout = useRef<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      timeout.current = Number(
        setTimeout(() => textInputRef.current?.focus(), 300)
      );

      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      };
    }, [])
  );

  const handlePress = useCallback(() => {
    textInputRef?.current?.focus();
  }, []);

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const handleChange = useCallback(
    (text: string) => {
      if (value.length >= CODE_LENGTH.length) return null;

      props.onChange(text.toUpperCase());
    },
    [value, props]
  );

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (e.nativeEvent.key === "Backspace") {
        const r = value.slice(0, value.length - 1);

        props.onChange(r);
      }
    },
    [props, value]
  );

  return (
    <View style={styles.container} testID="input-code">
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.wrap}>
          {CODE_LENGTH.map((_, index) => {
            const selected = values.length === index;
            const filled =
              values.length === CODE_LENGTH.length &&
              index === CODE_LENGTH.length - 1;

            return (
              <View style={styles.display} key={index}>
                {values[index] ? (
                  <Text variants="middle" color="secondary">
                    {values[index]}
                  </Text>
                ) : (
                  <Text variants="middle" color="base">
                    {placeholder[index]}
                  </Text>
                )}

                {(selected || filled) && focused && (
                  <View style={styles.shadows} />
                )}
                {selected && focused && (
                  <View style={styles.cursor}>
                    <Blinking>
                      <Text variants="middle" color="secondaryLight">
                        |
                      </Text>
                    </Blinking>
                  </View>
                )}
              </View>
            );
          })}
          <TextInput
            returnKeyType="done"
            keyboardType={
              Platform.OS === "ios" ? "ascii-capable" : "visible-password"
            }
            blurOnSubmit
            ref={textInputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={styles.input}
            onChangeText={handleChange}
            onKeyPress={handleKeyPress}
            selectionColor={theme().color.transparent}
            maxLength={8}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    position: "relative",
    flexDirection: "row",
  },
  display: {
    position: "relative",
    borderWidth: StyleSheet.hairlineWidth,
    width: boxWidth,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    marginHorizontal: theme().space(1),
    borderRadius: 5,
    backgroundColor: theme().color.background.light,
  },

  input: {
    position: "absolute",
    textAlign: "center",
    backgroundColor: theme().color.transparent,
    color: theme().color.transparent,
    width: boxWidth,
    top: 0,
    bottom: 0,
  },
  shadows: {
    position: "absolute",
    left: -3,
    top: -3,
    bottom: -3,
    right: -3,
    borderColor: theme().color.primary.main,
    borderWidth: 4,
    borderRadius: 5,
  },
  cursor: {
    left: 2,
    position: "absolute",
  },
});

export default memo(InputCode);
