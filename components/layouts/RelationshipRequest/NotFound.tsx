import Button from "@/components/elements/Button";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "config/theme";
import { useRouter } from "expo-router";
import type React from "react";
import { memo } from "react";
import { StyleSheet } from "react-native";

export type Props = {
  loading: boolean;
};

const NotFound: React.FC<Props> = (props) => {
  const router = useRouter();

  if (props.loading) {
    return null;
  }

  return (
    <View style={styles.root}>
      <View p={3}>
        <Text textAlign="center">申請はありません</Text>
      </View>
      <View p={3}>
        <Button
          title="戻る"
          onPress={() => {
            router.back();
          }}
          width={200}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    height: 320,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(NotFound);
