import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { FC } from "react";
import { memo } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onPress: () => void;
};

const MemoirButton: FC<Props> = (props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root]}>
      <View
        style={{
          paddingBottom: Platform.OS === "ios" ? 0 : insets.bottom - 20,
        }}
      >
        <TouchableOpacity onPress={props.onPress}>
          <View style={[styles.memoirButton]}>
            <View>
              <Image
                source={require("@/assets/img/icon/main.png")}
                width={30}
                height={30}
              />
            </View>
            <View>
              <Text>今週のmemoirを確認する</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(MemoirButton);

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: theme().color.primary.main,
  },
  memoirButton: {
    backgroundColor: theme().color.primary.main,
    width: "100%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
