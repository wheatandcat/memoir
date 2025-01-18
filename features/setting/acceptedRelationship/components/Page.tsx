import Button from "@/components/elements/Button";
import Image from "@/components/elements/Image";
import Text from "@/components/elements/Text";
import View from "@/components/elements/View";
import UserImage from "@/components/layouts/User/Image";
import theme from "config/theme";
import { useRouter } from "expo-router";
import type React from "react";
import { memo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import type { User } from "store/atoms";

export type Props = {
  user: User;
  displayName: string;
  image: string;
};

const Page: React.FC<Props> = (props) => {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.inner}>
          <View style={styles.imageWrap}>
            <View>
              <UserImage image={props.user.image || ""} size={100} />
            </View>
            <View mx={3}>
              <Text textAlign="center" size="xl2">
                ＋
              </Text>
            </View>
            <View>
              <UserImage image={props.image || ""} size={100} />
            </View>
          </View>
          <View m={4}>
            <Image
              source={require("@/src/img/icon/icon_cracker.png")}
              width={100}
              height={100}
            />
          </View>
          <View>
            <Text textAlign="center" size="lg">
              共有メンバーに{"\n"}なりました！
            </Text>
          </View>
          <View mt={5}>
            <Button
              title="一覧に戻る"
              width={200}
              onPress={() => {
                router.back();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme().color.background.main,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrap: {
    paddingTop: theme().space(4),
    flexDirection: "row",
    alignItems: "center",
  },
});

export default memo(Page);
