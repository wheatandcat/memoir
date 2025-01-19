import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import AddButton from "@/components/layouts/Home/AddButton";
import theme from "@/config/theme";
import type { ConnectedType } from "@/features/top/intro/components/Connected";
import { StatusBar } from "expo-status-bar";
import { type FC, memo } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type Props = Pick<ConnectedType, "onFinish"> & {};

const Task: FC<Props> = (props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={theme().color.primary.main} style="dark" />
      <View style={styles.header}>
        <Text textAlign="center">初期設定</Text>
      </View>
      <View style={styles.root}>
        <View style={styles.inner}>
          <View py={5}>
            <Image
              source={require("@/assets/img/common/intro_06.png")}
              width={95}
              height={95}
              contentFit="contain"
            />
          </View>
          <View mt={2}>
            <Text
              textAlign="center"
              variants="middle"
              lineHeight={35}
              fontFamily="NotoSansJP-Bold"
            >
              準備ができました{"\n"}さっそくタスクを{"\n"}追加してみましょう
            </Text>
          </View>
        </View>
        <View style={styles.addButton}>
          <AddButton onPress={props.onFinish} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme().color.primary.main,
  },
  root: {
    backgroundColor: theme().color.background.main,
    height: "100%",
    alignItems: "center",
  },
  header: {
    backgroundColor: theme().color.primary.main,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    paddingVertical: theme().space(3),
    alignItems: "center",
    height: "45%",
  },
  addButton: {
    paddingTop: theme().space(4),
    width: "100%",
  },
});

export default memo(Task);
