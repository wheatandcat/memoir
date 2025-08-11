import Button from "@/components/elements/Button";
import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import theme from "@/config/theme";
import { useScreenStore } from "@/store/screenStore";
import { StatusBar } from "expo-status-bar";
import type { FC } from "react";
import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SeeYouAgain: FC = () => {
  const setScreenState = useScreenStore((state) => state.setSeeYouAgain);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView>
        <View>
          <ScrollView>
            <View style={styles.inner}>
              <View pt={4} pb={5}>
                <Image
                  source={require("@/assets/img/icon/trust.png")}
                  width={100}
                  height={100}
                  contentFit="contain"
                />
              </View>
              <Text size="base">
                アカウント削除が完了しました。{"\n\n"}
                ご利用ありがとうございました。{"\n\n"}また、会いましょう。
              </Text>
              <View py={5}>
                <Button
                  title="TOPに戻る"
                  onPress={() => {
                    setScreenState(false);
                  }}
                  width={200}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.light,
    height: "100%",
  },
  inner: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: theme().space(2),
    marginBottom: theme().space(6),
  },
});

export default memo(SeeYouAgain);
