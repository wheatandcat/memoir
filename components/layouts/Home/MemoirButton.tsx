import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { FC } from "react";
import { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
};

const MemoirButton: FC<Props> = (props) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={props.onPress}>
        <View style={styles.memoirButton}>
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
  );
};

export default memo(MemoirButton);

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    bottom: 0,
    width: "100%",
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
