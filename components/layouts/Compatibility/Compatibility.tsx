import Image from "@/components/elements/Image";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { FC } from "react";
import { memo } from "react";
import { StyleSheet, TouchableWithoutFeedback, type ViewStyle } from "react-native";

type Props = {
  like: boolean;
  dislike: boolean;
  size?: number;
  opacity?: boolean;
  onLike: () => void;
  onDislike: () => void;
};

const Compatibility: FC<Props> = ({ size = 64, opacity = false, ...props }) => {
  const likeStyle: ViewStyle[] = [styles.image];
  const dislikeStyle: ViewStyle[] = [styles.image];
  if (props.like && !opacity) {
    likeStyle.push(styles.selected);
  }
  if (props.dislike && !opacity) {
    dislikeStyle.push(styles.selected);
  }

  if (opacity && !props.like) {
    likeStyle.push(styles.opacity);
  }

  if (opacity && !props.dislike) {
    dislikeStyle.push(styles.opacity);
  }

  return (
    <View style={styles.root}>
      <View style={likeStyle}>
        <TouchableWithoutFeedback onPress={props.onLike} testID="input_like">
          <Image
            source={require("@/assets/img/icon/icon_like.png")}
            width={size}
            height={size}
            contentFit="contain"
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={dislikeStyle}>
        <TouchableWithoutFeedback
          onPress={props.onDislike}
          testID="input_dislike"
        >
          <Image
            source={require("@/assets/img/icon/icon_dislike.png")}
            width={size}
            height={size}
            contentFit="contain"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default memo(Compatibility);

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 95,
  },
  image: {
    marginHorizontal: theme().space(2),
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: theme().color.primary.light,
    borderRadius: 45,
  },
  opacity: {
    opacity: 0.3,
  },
});
