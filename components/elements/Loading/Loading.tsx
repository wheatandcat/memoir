import View from "@/components/elements/View";
import theme from "@/config/theme";
import type { FC } from "react";
import { ActivityIndicator } from "react-native";

type Props = {
  size?: "small" | "large";
};

const Loading: FC<Props> = ({ size = "large" }) => {
  return (
    <View m={4}>
      <ActivityIndicator
        size={size}
        color={theme().color.secondary.light}
        testID="atoms_loading"
      />
    </View>
  );
};

export default Loading;
