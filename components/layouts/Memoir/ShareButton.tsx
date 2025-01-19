import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import type React from "react";
import { type FC, memo } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";

type Props = {
  disabled?: boolean;
  onPress: () => void;
};

const ShareButton: FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const style = { width: windowWidth };

  if (props.disabled) {
    return (
      <View>
        <View style={[styles.memoirButton, styles.disabledButton, style]}>
          <View>
            <Text color="baseLight">共有する</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
        <View style={[styles.memoirButton, style]}>
          <View>
            <Text>共有する</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(ShareButton);

const styles = StyleSheet.create({
  memoirButton: {
    backgroundColor: theme().color.primary.main,
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  disabledButton: {
    backgroundColor: theme().color.base.dark,
  },
});
