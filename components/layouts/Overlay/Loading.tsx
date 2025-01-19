import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import { type FC, memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

export type Props = {
  text: string;
};

const Loading: FC<Props> = (props) => {
  const [count, setCount] = useState(0);
  const width = useWindowDimensions().width;

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 200);
    return () => clearInterval(interval);
  }, [count]);

  const style = { paddingLeft: width / 2 - (props.text?.length || 0) * 14 };

  return (
    <View style={styles.root} testID="overlay-loading">
      <View style={[styles.loading, style]}>
        <View mt={1}>
          <ActivityIndicator color={theme().color.base.light} />
        </View>
        <View ml={2}>
          <Text
            color="baseLight"
            fontFamily="NotoSansJP-Bold"
            textAlign="center"
          >
            {props.text} {(() => {
              if (count % 3 === 0) {
                return ".";
              }
              if (count % 3 === 1) {
                return "..";
              }
              if (count % 3 === 2) {
                return "...";
              }

              return "";
            })()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: `${theme().color.secondary.dark}99`,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default memo(Loading);
